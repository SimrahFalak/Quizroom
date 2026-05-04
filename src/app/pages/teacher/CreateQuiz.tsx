import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { createQuiz, clearSuccess, clearError } from '../../store/quizSlice';
import { getTeacherCourses } from '../../store/courseSlice';
import { questionTypeMap } from '../../services/quizService';
import type { AppDispatch, RootState } from '../../store/store';

const questionTypeApiMap: Record<string, string> = {
  mcq: 'MCQ_SINGLE',
  multiple: 'MCQ_MULTIPLE',
  truefalse: 'TRUE_FALSE',
  short: 'SHORT_ANSWER',
  long: 'LONG_ANSWER',
<<<<<<< HEAD
  file: 'FILE_UPLOAD',
=======
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
  numeric: 'NUMERIC',
};

interface Question {
  id: number;
  type: string;
  question: string;
  options: string[];
  correctAnswer: string | string[] | number | null;
  marks: number;
}

interface CurrentQuestion {
  type: string;
  question: string;
  options: string[];
  correctAnswer: string | string[] | number | null;
  marks: number;
}

export default function CreateQuiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success, message } = useSelector(
    (state: RootState) => state.quiz
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { courses } = useSelector((state: RootState) => state.course);

  const [step, setStep] = useState(1);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courseId || '');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 5,
  });
  const [quizDetails, setQuizDetails] = useState({
    title: '',
    description: '',
    duration: '30',
    totalMarks: '100',
    deadline: '',
<<<<<<< HEAD
=======
    negativeMarking: false,
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
  });

  // Fetch teacher courses on mount
  useEffect(() => {
    if (user?.id) {
      dispatch(getTeacherCourses(user.id));
    }
  }, [dispatch, user?.id]);

  const questionTypes = [
    { value: 'mcq', label: 'Multiple Choice (Single)' },
    { value: 'multiple', label: 'Multiple Choice (Multiple)' },
    { value: 'truefalse', label: 'True / False' },
    { value: 'short', label: 'Short Answer' },
    { value: 'long', label: 'Long Answer' },
    { value: 'numeric', label: 'Numeric' },
  ];

  const resetQuestion = () => {
    setCurrentQuestion({
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: 5,
    });
  };

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) {
      alert('Please enter a question');
      return;
    }

    if (currentQuestion.marks <= 0) {
      alert('Please enter valid marks');
      return;
    }

    const newQuestion: Question = {
      ...currentQuestion,
      id: Date.now(),
    };

    setQuestions([...questions, newQuestion]);
    resetQuestion();
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSaveDraft = async () => {
    if (!quizDetails.title.trim()) {
      alert('Please enter quiz title');
      return;
    }

    if (!selectedCourseId) {
      alert('Please select a course');
      return;
    }

    if (!user?.id) {
      alert('You must be logged in');
      return;
    }

    // Transform questions to match backend format
    const transformedQuestions = questions.map((q) => ({
      type: questionTypeApiMap[q.type] || q.type,
      prompt: q.question,
      options: q.options.filter((o) => o.trim()),
      correctAnswer: q.correctAnswer,
      points: q.marks,
    }));

    const payload = {
      title: quizDetails.title,
      description: quizDetails.description,
      durationMinutes: parseInt(quizDetails.duration) || 30,
      totalMarks: parseInt(quizDetails.totalMarks) || 100,
      deadline: quizDetails.deadline || undefined,
<<<<<<< HEAD
=======
      negativeMarking: quizDetails.negativeMarking,
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
      questions: transformedQuestions,
      isPublished: false,
    };

    try {
      await dispatch(
        createQuiz({
          teacherId: user.id,
          courseId: selectedCourseId,
          quizData: payload,
        })
      ).unwrap();

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (err) {
      console.error('Failed to save quiz:', err);
    }
  };

  const handlePublishQuiz = async () => {
    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    if (!quizDetails.title.trim()) {
      alert('Please enter quiz title');
      return;
    }

    if (!selectedCourseId) {
      alert('Please select a course');
      return;
    }

    if (!user?.id) {
      alert('You must be logged in');
      return;
    }

    // Transform questions to match backend format
    const transformedQuestions = questions.map((q) => ({
      type: questionTypeApiMap[q.type] || q.type,
      prompt: q.question,
      options: q.options.filter((o) => o.trim()),
      correctAnswer: q.correctAnswer,
      points: q.marks,
    }));

    const payload = {
      title: quizDetails.title,
      description: quizDetails.description,
      durationMinutes: parseInt(quizDetails.duration) || 30,
      totalMarks: parseInt(quizDetails.totalMarks) || 100,
      deadline: quizDetails.deadline || undefined,
<<<<<<< HEAD
=======
      negativeMarking: quizDetails.negativeMarking,
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
      questions: transformedQuestions,
      isPublished: true,
    };

    try {
      await dispatch(
        createQuiz({
          teacherId: user.id,
          courseId: selectedCourseId,
          quizData: payload,
        })
      ).unwrap();

      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (err) {
      console.error('Failed to publish quiz:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Create Quiz</h1>
          <p className="text-gray-600">Build a comprehensive quiz for your students</p>
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

      {/* Step Indicator */}
      <div className="flex items-center gap-4">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <button
              onClick={() => setStep(s)}
              disabled={s === 2 && questions.length === 0}
              className={`w-12 h-12 rounded-full font-bold text-lg transition-all ${
                step >= s
                  ? 'bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] text-white shadow-lg'
                  : s === 2 && questions.length === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s}
            </button>
            <span className={`font-medium ${step >= s ? 'text-gray-800' : 'text-gray-400'}`}>
              {s === 1 ? 'Quiz Details' : 'Add Questions'}
            </span>
            {s < 2 && <div className="w-16 h-1 bg-gray-200 rounded"></div>}
          </div>
        ))}
      </div>

      {/* Step 1: Quiz Details */}
      {step === 1 && (
        <Card>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quiz Information</h2>

          <div className="space-y-6">
            {/* Quiz Title and Course Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Quiz Title *"
                placeholder="e.g., Web Development Mid-term"
                value={quizDetails.title}
                onChange={(e) => setQuizDetails({ ...quizDetails, title: e.target.value })}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Course *
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none text-sm text-gray-800 bg-white hover:border-gray-300 transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    paddingRight: '32px',
                  }}
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                >
                  <option value="">Select a Course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                rows={4}
                placeholder="Describe what this quiz covers..."
                value={quizDetails.description}
                onChange={(e) =>
                  setQuizDetails({ ...quizDetails, description: e.target.value })
                }
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Input
                label="Duration (minutes)"
                type="number"
                placeholder="30"
                value={quizDetails.duration}
                onChange={(e) =>
                  setQuizDetails({ ...quizDetails, duration: e.target.value })
                }
              />
              <Input
                label="Total Marks"
                type="number"
                placeholder="100"
                value={quizDetails.totalMarks}
                onChange={(e) =>
                  setQuizDetails({ ...quizDetails, totalMarks: e.target.value })
                }
              />
              <Input
                label="Deadline"
                type="date"
                value={quizDetails.deadline}
                onChange={(e) =>
                  setQuizDetails({ ...quizDetails, deadline: e.target.value })
                }
              />
            </div>

<<<<<<< HEAD
=======
            <div className="flex items-center gap-3 p-4 ">
              <input
                type="checkbox"
                id="negativeMarking"
                checked={quizDetails.negativeMarking}
                onChange={(e) =>
                  setQuizDetails({ ...quizDetails, negativeMarking: e.target.checked })
                }
                className="w-5 h-5 rounded border-gray-300 text-[#6C4EFF] focus:ring-2 focus:ring-[#6C4EFF] cursor-pointer"
              />
              <label htmlFor="negativeMarking" className="flex-1 cursor-pointer">
                <div className="font-medium text-gray-800">Enable Negative Marking</div>
                <div className="text-sm text-gray-600">Wrong answers will deduct 25% of question marks</div>
              </label>
            </div>

>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                className="bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]"
              >
                Next: Add Questions →
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Step 2: Add Questions */}
      {step === 2 && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Question List */}
          <div className="lg:col-span-1">
            <Card>
              <h3 className="font-bold text-lg mb-4">Questions ({questions.length})</h3>

              {questions.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  No questions added yet
                </p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {questions.map((q, index) => (
                    <div
                      key={q.id}
                      className="p-3 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-800">Q{index + 1}</div>
                        <div className="text-xs text-gray-500">
                          {questionTypes.find((t) => t.value === q.type)?.label}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteQuestion(q.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Total Questions:</span>
                    <span className="font-bold">{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Marks:</span>
                    <span className="font-bold">
                      {questions.reduce((sum, q) => sum + q.marks, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Question Builder */}
          <div className="lg:col-span-2">
            <Card>
              <h3 className="font-bold text-xl mb-6">Add New Question</h3>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Type
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                      value={currentQuestion.type}
                      onChange={(e) =>
                        setCurrentQuestion({ ...currentQuestion, type: e.target.value })
                      }
                    >
                      {questionTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Marks"
                    type="number"
                    min="1"
                    value={currentQuestion.marks}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        marks: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question *
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                    rows={3}
                    placeholder="Enter your question..."
                    value={currentQuestion.question}
                    onChange={(e) =>
                      setCurrentQuestion({ ...currentQuestion, question: e.target.value })
                    }
                  />
                </div>

                {/* Options for MCQ and Multiple */}
                {(currentQuestion.type === 'mcq' || currentQuestion.type === 'multiple') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Answer Options
                    </label>
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type={currentQuestion.type === 'mcq' ? 'radio' : 'checkbox'}
                            name="correct-answer"
                            className="w-5 h-5 cursor-pointer"
                            checked={
                              currentQuestion.type === 'mcq'
                                ? currentQuestion.correctAnswer === option
                                : Array.isArray(currentQuestion.correctAnswer) &&
                                  currentQuestion.correctAnswer.includes(option)
                            }
                            onChange={(e) => {
                              if (currentQuestion.type === 'mcq') {
                                if (e.target.checked) {
                                  setCurrentQuestion({
                                    ...currentQuestion,
                                    correctAnswer: option,
                                  });
                                }
                              } else {
                                const current = Array.isArray(currentQuestion.correctAnswer)
                                  ? currentQuestion.correctAnswer
                                  : [];
                                if (e.target.checked) {
                                  setCurrentQuestion({
                                    ...currentQuestion,
                                    correctAnswer: [...current, option],
                                  });
                                } else {
                                  setCurrentQuestion({
                                    ...currentQuestion,
                                    correctAnswer: current.filter((o) => o !== option),
                                  });
                                }
                              }
                            }}
                          />
                          <input
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...currentQuestion.options];
                              newOptions[index] = e.target.value;
                              setCurrentQuestion({
                                ...currentQuestion,
                                options: newOptions,
                              });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          options: [...currentQuestion.options, ''],
                        })
                      }
                      className="mt-3 text-[#6C4EFF] font-semibold flex items-center gap-2 hover:underline"
                    >
                      <Plus className="w-4 h-4" />
                      Add Option
                    </button>
                  </div>
                )}

                {/* True/False */}
                {currentQuestion.type === 'truefalse' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Correct Answer
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tf-answer"
                          value="true"
                          checked={currentQuestion.correctAnswer === 'true'}
                          onChange={(e) =>
                            setCurrentQuestion({
                              ...currentQuestion,
                              correctAnswer: e.target.value,
                            })
                          }
                          className="w-5 h-5"
                        />
                        <span>True</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="tf-answer"
                          value="false"
                          checked={currentQuestion.correctAnswer === 'false'}
                          onChange={(e) =>
                            setCurrentQuestion({
                              ...currentQuestion,
                              correctAnswer: e.target.value,
                            })
                          }
                          className="w-5 h-5"
                        />
                        <span>False</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Numeric */}
                {currentQuestion.type === 'numeric' && (
                  <Input
                    label="Correct Answer (Number)"
                    type="number"
                    placeholder="Enter numeric answer"
                    value={String(currentQuestion.correctAnswer || '') || ''}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        correctAnswer: e.target.value ? parseInt(e.target.value) : '',
                      })
                    }
                  />
                )}

                {/* Short/Long Answer */}
                {(currentQuestion.type === 'short' || currentQuestion.type === 'long') && (
                  <Input
                    label={`${currentQuestion.type === 'short' ? 'Short' : 'Long'} Answer (Optional)`}
                    placeholder="Enter expected answer..."
                    value={String(currentQuestion.correctAnswer || '') || ''}
                    onChange={(e) =>
                      setCurrentQuestion({
                        ...currentQuestion,
                        correctAnswer: e.target.value,
                      })
                    }
                  />
                )}

                {/* Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <Button
                    onClick={addQuestion}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]"
                  >
                    <Plus className="w-5 h-5" />
                    Add Question
                  </Button>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                ← Back
              </Button>
              <Button
                onClick={handleSaveDraft}
                disabled={loading}
                className="flex-1 bg-gray-500 text-white hover:bg-gray-600"
              >
                {loading ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                onClick={handlePublishQuiz}
                disabled={loading || questions.length === 0}
                className="flex-1 bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]"
              >
                {loading ? 'Publishing...' : 'Publish Quiz'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
