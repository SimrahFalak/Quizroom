import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, FileQuestion, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import ProgressBar from '../../components/ui/ProgressBar';
import { getStudentCourses } from '../../store/courseSlice';
import { fetchStudentAttempts } from '../../store/quizSlice';
import type { AppDispatch, RootState } from '../../store/store';

export default function StudentResultDetail() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { attempts, loading } = useSelector((state: RootState) => state.quiz);
  const { courses: enrolledCourses } = useSelector((state: RootState) => state.course);
  const { user } = useSelector((state: RootState) => state.auth);

  const locationState = location.state as
    | {
        attempt?: any;
        quiz?: any;
      }
    | undefined;

  useEffect(() => {
    if (user?.id && attempts.length === 0) {
      dispatch(fetchStudentAttempts(user.id));
    }
  }, [dispatch, user?.id, attempts.length]);

  useEffect(() => {
    if (user?.id && enrolledCourses.length === 0) {
      dispatch(getStudentCourses(user.id));
    }
  }, [dispatch, user?.id, enrolledCourses.length]);

  const attempt = useMemo(() => {
    const fromState = locationState?.attempt;
    if (fromState && String(fromState._id) === String(attemptId)) {
      return fromState;
    }

    return attempts.find((item: any) => String(item._id) === String(attemptId)) || fromState || null;
  }, [attempts, attemptId, locationState?.attempt]);

  const quizFromAttempt = attempt?.quiz || null;
  const quizFromState = locationState?.quiz || null;
  const quiz = quizFromAttempt?.questions?.length
    ? quizFromAttempt
    : quizFromState?.questions?.length
      ? quizFromState
      : quizFromAttempt || quizFromState || null;
  const resolvedCourseId =
    quiz?.course?._id ||
    quiz?.course ||
    quizFromState?.course?._id ||
    quizFromState?.course ||
    null;
  const resolvedCourse = enrolledCourses.find((course: any) => String(course._id) === String(resolvedCourseId));
  const questions = quiz?.questions || [];
  const responses = attempt?.responses || [];

  const responseMap = useMemo(() => {
    const map = new Map<string, any>();
    responses.forEach((response: any) => {
      map.set(String(response.questionId), response);
    });
    return map;
  }, [responses]);

  const summary = {
    score: attempt?.score ?? 0,
    maxScore: attempt?.maxScore ?? quiz?.totalMarks ?? 0,
    percentage: Math.round(attempt?.percentage ?? 0),
    reviewedAt: attempt?.reviewedAt || attempt?.gradedAt || attempt?.createdAt,
    passFail: (attempt?.percentage ?? 0) >= 50 ? 'Pass' : 'Fail',
  };

  if (loading && !attempt) {
    return (
      <Card className="text-center py-12">
        <p className="text-gray-600">Loading results...</p>
      </Card>
    );
  }

  if (!attempt) {
    return (
      <Card className="text-center py-12 space-y-4">
        <p className="text-gray-600">Result not found</p>
        <Button onClick={() => navigate(-1)} variant="outline">
          Go Back
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Result</h1>
          <p className="text-gray-600">
            {quiz?.title || 'Quiz'} • {resolvedCourse?.title || quiz?.course?.title || 'Course'}
          </p>
        </div>
        <span className={`px-4 py-2 rounded-full font-semibold ${summary.passFail === 'Pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {summary.passFail}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#6C4EFF] mb-2">{summary.score}/{summary.maxScore}</div>
            <div className="text-sm text-gray-600">Your Score</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{summary.percentage}%</div>
            <div className="text-sm text-gray-600">Percentage</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{questions.length}</div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <p className="font-semibold text-gray-700 mb-1">Quiz Title</p>
            <p>{quiz?.title || 'Quiz'}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Submitted On</p>
            <p>{attempt?.createdAt ? new Date(attempt.createdAt).toLocaleString() : 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-1">Time</p>
            <p>{quiz?.durationMinutes ? `${quiz.durationMinutes} minutes` : 'N/A'}</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <FileQuestion className="w-5 h-5 text-[#6C4EFF]" />
          <h2 className="text-xl font-bold text-gray-800">Questions & Answers</h2>
        </div>

        <div className="space-y-6">
          {questions.map((question: any, index: number) => {
            const questionId = String(question._id);
            const response = responseMap.get(questionId);
            const correctAnswer = question.correctAnswer;
            const maxMarks = question.points || question.marks || 0;
            const obtainedMarks = response?.obtainedPoints ?? 0;
            const isCorrect = obtainedMarks >= maxMarks && maxMarks > 0;
            const questionType = String(question.type || '').toUpperCase();
            const isMcq = questionType.includes('MCQ') || questionType.includes('MULTIPLE') || questionType.includes('TRUE_FALSE') || questionType.includes('TRUEFALSE');

            return (
              <Card key={questionId || index} className="p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="font-bold text-[#6C4EFF] bg-purple-100 px-3 py-1 rounded-full text-sm">
                        Q{index + 1}
                      </span>
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
                        {question.type || 'Question'}
                      </span>
                      
                    </div>
                    <p className="text-gray-800 font-semibold text-lg">
                      {question.prompt || question.question}
                    </p>
                  </div>

                 
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm font-semibold text-blue-900 mb-2">Your Answer</p>
                    <p className="text-gray-800 text-sm whitespace-pre-line">
                      {response?.answer
                        ? Array.isArray(response.answer)
                          ? response.answer.join(', ')
                          : String(response.answer)
                        : 'No answer provided'}
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-sm font-semibold text-green-900 mb-2">Correct Answer</p>
                    <p className="text-gray-800 text-sm whitespace-pre-line">
                      {correctAnswer === null || correctAnswer === undefined
                        ? isMcq
                          ? 'Not available'
                          : 'Not set'
                        : Array.isArray(correctAnswer)
                          ? correctAnswer.join(', ')
                          : String(correctAnswer)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Teacher Marks</p>
                    <p className="text-gray-800 font-semibold">{obtainedMarks} / {maxMarks}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Teacher Feedback</p>
                    <p className="text-gray-700 whitespace-pre-line">
                      {response?.remarks || 'No feedback added yet.'}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

     
    </div>
  );
}
