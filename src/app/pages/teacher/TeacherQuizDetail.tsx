import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Trophy, ChevronDown, ChevronUp, Eye, Download } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import ProgressBar from '../../components/ui/ProgressBar';
import { generateTablePDF } from '../../utils/pdfUtils';
import { fetchQuizById, fetchQuizAttempts, publishQuiz, saveQuizAttemptReview, clearSuccess, clearError } from '../../store/quizSlice';
import { questionTypeMap } from '../../services/quizService';
import type { AppDispatch, RootState } from '../../store/store';

export default function TeacherQuizDetail() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<'details' | 'submissions' | 'results'>('details');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [reviewingAttempt, setReviewingAttempt] = useState<any>(null);
  const [editedScores, setEditedScores] = useState<Record<string, number>>({});
  const [editedRemarks, setEditedRemarks] = useState<Record<string, string>>({});

  const { currentQuiz, attempts, loading, error, success, message } = useSelector(
    (state: RootState) => state.quiz
  );
  const { user } = useSelector((state: RootState) => state.auth);

  // Fetch quiz and attempts on component mount
  useEffect(() => {
    if (user?.id && quizId) {
      dispatch(fetchQuizById({ teacherId: user.id, quizId }));
      dispatch(fetchQuizAttempts({ teacherId: user.id, quizId }));
    }
  }, [dispatch, user?.id, quizId]);

  const handlePublishQuiz = async () => {
    if (!user?.id || !quizId) {
      alert('Missing teacher or quiz information');
      return;
    }

    try {
      await dispatch(
        publishQuiz({
          teacherId: user.id,
          quizId,
        })
      ).unwrap();
    } catch (err) {
      console.error('Failed to publish quiz:', err);
    }
  };

  const toggleQuestionExpanded = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const renderCorrectAnswer = (answer: any, questionType: string) => {
    if (answer === null || answer === undefined) {
      return <p className="text-gray-500">Not set</p>;
    }

    if (Array.isArray(answer)) {
      return (
        <div className="flex flex-wrap gap-2">
          {answer.map((ans, idx) => (
            <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {ans}
            </span>
          ))}
        </div>
      );
    }

    return (
      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
        {String(answer)}
      </span>
    );
  };

  const openAttemptReview = (attempt: any) => {
    const nextEditedScores: Record<string, number> = {};
    const nextEditedRemarks: Record<string, string> = {};

    attempt.responses?.forEach((response: any) => {
      const questionId = String(response.questionId);
      nextEditedScores[questionId] = Number(response.obtainedPoints || 0);
      nextEditedRemarks[questionId] = response.remarks || '';
    });

    setActiveTab('results');
    setReviewingAttempt(attempt);
    setEditedScores(nextEditedScores);
    setEditedRemarks(nextEditedRemarks);
  };

  const handleSaveReview = async () => {
    if (!user?.id || !quizId || !reviewingAttempt?._id) {
      return;
    }

    const questions = currentQuiz?.questions ?? [];
    const payload = questions.map((question: any) => {
      const questionId = String(question._id);
      return {
        questionId,
        obtainedPoints: editedScores[questionId] ?? 0,
        remarks: editedRemarks[questionId] ?? '',
      };
    }) || [];

    try {
      await dispatch(
        saveQuizAttemptReview({
          teacherId: user.id,
          quizId,
          attemptId: reviewingAttempt._id,
          responses: payload,
        })
      ).unwrap();

      await dispatch(fetchQuizAttempts({ teacherId: user.id, quizId }));
      setReviewingAttempt(null);
      setActiveTab('results');
    } catch (err) {
      console.error('Failed to save graded attempt:', err);
    }
  };

  const handleDownloadQuizResultsPDF = () => {
    if (!currentQuiz || !reviewedAttempts.length) return;

    const headers = ['Student Name', 'Email', 'Score', 'Percentage'];
    const rows = reviewedAttempts.map((attempt: any) => [
      attempt.student?.name || 'Unknown',
      attempt.student?.email || 'Unknown',
      `${attempt.score}/${attempt.maxScore}`,
      `${attempt.percentage.toFixed(2)}%`,
    ]);

    generateTablePDF(
      'Quiz Results',
      headers,
      rows,
      `${currentQuiz.title}-results.pdf`,
      {
        quizName: currentQuiz.title,
        instructorName: user?.name || 'Instructor',
      }
    );
  };

  // Calculate stats based on attempts
  const unreviewedAttempts = attempts?.filter((a: any) => !a.reviewedAt) || [];
  const reviewedAttempts = attempts?.filter((a: any) => a.reviewedAt) || [];
  const pendingCount = unreviewedAttempts.length;
  const avgScoreReviewed = reviewedAttempts.length > 0
    ? (reviewedAttempts.reduce((sum: number, a: any) => sum + (a.percentage || 0), 0) / reviewedAttempts.length).toFixed(2)
    : 0;

  return (
    <div className="space-y-8">
      {loading ? (
        <Card className="text-center py-12">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C4EFF]"></div>
          </div>
          <p className="text-gray-600 mt-4">Loading quiz...</p>
        </Card>
      ) : currentQuiz ? (
        <>
          {reviewingAttempt && activeTab === 'results' ? (
            // Review Page View
            <div className="space-y-8">
              {/* Header with Back Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setReviewingAttempt(null);
                    setActiveTab('results');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {reviewingAttempt.student?.name}'s Submission
                  </h1>
                  <p className="text-gray-600 mt-1">{reviewingAttempt.student?.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Total Score</p>
                  <p className="text-3xl font-bold text-[#6C4EFF]">
                    {reviewingAttempt.score}/{reviewingAttempt.maxScore}
                  </p>
                </div>
              </div>

              {/* All Answers with Editable Fields */}
              <div className="space-y-6">
                {currentQuiz.questions?.map((question: any, qIdx: number) => {
                  const response = reviewingAttempt.responses?.find(
                    (r: any) => String(r.questionId) === String(question._id)
                  );
                  const questionId = String(question._id);
                  const isAutoGradable = question.type === 'MCQ_SINGLE' || question.type === 'MCQ_MULTIPLE' || question.type === 'TRUE_FALSE' || question.type === 'NUMERIC';
                  const editedScore = editedScores[questionId];
                  const currentScore = editedScore !== undefined ? editedScore : (response?.obtainedPoints || 0);
                  const maxMarks = question.points || question.marks || 0;

                  return (
                    <Card key={qIdx} className="p-6">
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-bold text-[#6C4EFF] bg-purple-100 px-3 py-1 rounded-full text-sm">
                            Q{qIdx + 1}
                          </span>
                          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
                            {question.type}
                          </span>
                          {isAutoGradable && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                              Auto-graded
                            </span>
                          )}
                          <span className="ml-auto font-bold text-gray-800">
                            Marks: {currentScore}/{maxMarks}
                          </span>
                        </div>
                        <p className="text-gray-800 font-semibold text-lg">{question.prompt || question.question}</p>
                      </div>

                      {/* Student Answer */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <p className="text-sm font-semibold text-blue-900 mb-2">Student's Answer:</p>
                        <p className="text-gray-800 text-base">
                          {response?.answer
                            ? Array.isArray(response.answer)
                              ? response.answer.join(', ')
                              : String(response.answer)
                            : 'No answer provided'}
                        </p>
                      </div>

                      {/* Correct Answer */}
                      {question.correctAnswer && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <p className="text-sm font-semibold text-green-900 mb-2">Correct Answer:</p>
                          <p className="text-gray-800 text-base">
                            {Array.isArray(question.correctAnswer)
                              ? question.correctAnswer.join(', ')
                              : String(question.correctAnswer)}
                          </p>
                        </div>
                      )}

                      {/* Marks Input (for non-auto-gradable questions) */}
                      {!isAutoGradable && (
                        <div className="mb-4">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Assign Marks (out of {maxMarks})
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={maxMarks}
                            value={currentScore}
                            onChange={(e) => {
                              const val = Math.min(Math.max(0, parseInt(e.target.value) || 0), maxMarks);
                              setEditedScores(prev => ({ ...prev, [questionId]: val }));
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6C4EFF] focus:border-transparent"
                          />
                        </div>
                      )}

                      {/* Remarks */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Feedback/Remarks
                        </label>
                        <textarea
                          value={editedRemarks[questionId] || ''}
                          onChange={(e) => {
                            setEditedRemarks(prev => ({ ...prev, [questionId]: e.target.value }));
                          }}
                          placeholder="Add feedback for this answer..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6C4EFF] focus:border-transparent resize-none h-20"
                        />
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 sticky bottom-0 bg-white p-6 border-t border-gray-200">
                <Button
                  onClick={() => setReviewingAttempt(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveReview}
                  className="flex-1 bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]"
                >
                  Save Grades
                </Button>
              </div>
            </div>
          ) : (
            // Tabs View
            <>
              {/* Header with Back Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentQuiz.title}</h1>
                  <p className="text-gray-600">{currentQuiz.totalMarks} marks • {currentQuiz.durationMinutes} minutes</p>
                </div>
              </div>

              {/* Error and Success Messages */}
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => dispatch(clearError())}
                className="text-red-700 hover:text-red-900"
              >
                ✕
              </button>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-100 text-green-700 rounded-lg flex items-center justify-between">
              <span>{message}</span>
              <button
                onClick={() => dispatch(clearSuccess())}
                className="text-green-700 hover:text-green-900"
              >
                ✕
              </button>
            </div>
          )}

          {/* Quiz Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#6C4EFF] mb-2">{attempts?.length || 0}</div>
                <div className="text-sm text-gray-600">Total Submissions</div>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{pendingCount}</div>
                <div className="text-sm text-gray-600">Pending Grading</div>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{avgScoreReviewed}%</div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm overflow-x-auto">
            {(['details', 'submissions', 'results'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-6 cursor-pointer rounded-lg font-medium transition-all capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <Card>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quiz Information</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Marks</p>
                    <p className="text-gray-800">{currentQuiz.totalMarks}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Deadline</p>
                    <p className="text-gray-800">
                      {currentQuiz.deadline 
                        ? new Date(currentQuiz.deadline).toLocaleDateString()
                        : 'No deadline'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Duration</p>
                    <p className="text-gray-800">{currentQuiz.durationMinutes} minutes</p>
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
                <p className="text-gray-600">{currentQuiz.description || 'No description provided'}</p>
              </Card>

              {/* Questions Section */}
              {currentQuiz.questions && currentQuiz.questions.length > 0 && (
                <Card>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Questions ({currentQuiz.questions.length})</h2>
                  <div className="space-y-4">
                    {currentQuiz.questions.map((question, index) => {
                      const hasAnswer = question.correctAnswer !== null && question.correctAnswer !== undefined;

                      return hasAnswer ? (
                        // Questions with answers - expandable
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleQuestionExpanded(index)}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <div className="text-left flex-1">
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-[#6C4EFF] bg-purple-100 px-3 py-1 rounded-full text-sm">
                                  Q{index + 1}
                                </span>
                                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
                                  {questionTypeMap[question.type] || question.type}
                                </span>
                                <span className="text-xs text-gray-600 ml-auto">
                                  {question.marks || question.points || 0} marks
                                </span>
                              </div>
                              <p className="text-gray-800 font-medium mt-2">
                                {question.question || question.prompt}
                              </p>
                            </div>
                            <div className="ml-4">
                              {expandedQuestions.has(index) ? (
                                <ChevronUp className="w-5 h-5 text-gray-600" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-600" />
                              )}
                            </div>
                          </button>

                          {/* Expanded Content */}
                          {expandedQuestions.has(index) && (
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 space-y-4">
                              {question.options && question.options.length > 0 && (
                                <div>
                                  <p className="text-sm font-semibold text-gray-700 mb-2">Options:</p>
                                  <div className="space-y-2">
                                    {question.options.map((option, optIdx) => (
                                      <div
                                        key={optIdx}
                                        className={`p-3 rounded border ${
                                          question.correctAnswer === option ||
                                          question.correctAnswer === optIdx ||
                                          (Array.isArray(question.correctAnswer) &&
                                            question.correctAnswer.includes(option))
                                            ? 'bg-green-50 border-green-300'
                                            : 'bg-white border-gray-200'
                                        }`}
                                      >
                                        <span className="text-sm">
                                          {String.fromCharCode(65 + optIdx)}.{' '}
                                          <span className="text-gray-800">{option}</span>
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {question.numericTolerance !== undefined && question.numericTolerance > 0 && (
                                <div>
                                  <p className="text-sm font-semibold text-gray-700 mb-2">Numeric Tolerance:</p>
                                  <p className="text-gray-800">±{question.numericTolerance}</p>
                                </div>
                              )}

                              {question.allowedFileTypes && question.allowedFileTypes.length > 0 && (
                                <div>
                                  <p className="text-sm font-semibold text-gray-700 mb-2">Allowed File Types:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {question.allowedFileTypes.map((fileType, ftIdx) => (
                                      <span key={ftIdx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                        {fileType}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        // Questions without answers - static display
                        <div key={index} className="border border-gray-200 rounded-lg px-6 py-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="font-bold text-[#6C4EFF] bg-purple-100 px-3 py-1 rounded-full text-sm">
                                  Q{index + 1}
                                </span>
                                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
                                  {questionTypeMap[question.type] || question.type}
                                </span>
                              </div>
                              <p className="text-gray-800 font-medium">
                                {question.question || question.prompt}
                              </p>
                            </div>
                            <span className="text-xs text-gray-600 ml-4 whitespace-nowrap">
                              {question.marks || question.points || 0} marks
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}

              {(!currentQuiz.questions || currentQuiz.questions.length === 0) && (
                <Card>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Questions</h2>
                  <p className="text-gray-500 text-center py-8">No questions added yet</p>
                </Card>
              )}

              <Card>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Status</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      {currentQuiz.isPublished ? '✓ Quiz is Published' : 'Quiz is in Draft'}
                    </p>
                  </div>
                  {!currentQuiz.isPublished && (
                    <Button
                      onClick={handlePublishQuiz}
                      disabled={loading}
                      className="bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]"
                    >
                      {loading ? 'Publishing...' : 'Publish Quiz'}
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* Submissions Tab */}
          {activeTab === 'submissions' && (
            <Card>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Quiz Submissions</h2>
              {unreviewedAttempts && unreviewedAttempts.length > 0 ? (
                <div className="space-y-4">
                  {unreviewedAttempts.map((attempt: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-[#6C4EFF] text-white flex items-center justify-center font-bold">
                              {attempt.student?.name?.charAt(0) || 'S'}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{attempt.student?.name || 'Student'}</p>
                              <p className="text-sm text-gray-600">{attempt.student?.email || 'N/A'}</p>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Score</p>
                              <p className="font-bold text-gray-800">{attempt.score} / {attempt.maxScore}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Percentage</p>
                              <p className="font-bold text-gray-800">{attempt.percentage}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Submitted</p>
                              <p className="font-bold text-gray-800">
                                {new Date(attempt.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            openAttemptReview(attempt);
                          }}
                          className="ml-4 bg-[#6C4EFF] text-white hover:bg-[#5a3fe0] flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No submissions yet</p>
                </div>
              )}
            </Card>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <div className="space-y-6">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Quiz Results</h2>
                  {reviewedAttempts && reviewedAttempts.length > 0 && (
                    <button
                      onClick={handleDownloadQuizResultsPDF}
                      className="flex items-center gap-2 px-4 py-2 bg-[#6C4EFF] text-white rounded-lg hover:bg-[#5a3fe0] transition-colors font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  )}
                </div>
                {reviewedAttempts && reviewedAttempts.length > 0 ? (
                  <div className="space-y-4">
                    {reviewedAttempts.map((attempt: any, idx: number) => (
                      <Card key={idx} className="p-5 border border-gray-200 shadow-sm">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3 flex-wrap">
                              <p className="text-lg font-medium text-gray-800">{attempt.student?.name || 'Student'}</p>
                              <p className="text-sm text-gray-600">{attempt.student?.email || 'N/A'}</p>
                            </div>
                            <span className="text-sm  text-gray-600 px-3 py-1 rounded-full whitespace-nowrap">
                              {new Date(attempt.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="grid md:grid-cols-2 gap-5 items-start">
                            <div>
                              <div className="flex items-end justify-between gap-4 mb-3">
                                <div>
                                  <p className="text-sm text-gray-600 mb-2">Student Score</p>
                                  <p className="text-2xl font-bold text-gray-900">
                                    {attempt.score} / {attempt.maxScore}
                                  </p>
                                </div>
                                <p className="text-sm font-semibold text-[#6C4EFF] whitespace-nowrap">
                                  {attempt.percentage || 0}%
                                </p>
                              </div>
                              <ProgressBar percentage={attempt.percentage || 0} showLabel={false} />
                            </div>

                            <div className="bg-[#ebe5ff] rounded-xl p-4 border border-[#d2d3ff]">
                              <p className="text-sm font-semibold text-gray-700 mb-2">Teacher Feedback</p>
                              <p className="text-sm text-gray-600 leading-6 whitespace-pre-line">
                                {attempt.responses?.map((response: any) => response.remarks).filter(Boolean).join('\n\n') || 'No feedback added yet.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No graded results available yet</p>
                  </div>
                )}
              </Card>
            </div>
          )}
            </>
          )}
        </>
      ) : (
        <Card className="text-center py-12">
          <p className="text-gray-600">Quiz not found</p>
        </Card>
      )}
    </div>
  );
}
