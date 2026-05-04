
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, Flag, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { fetchQuizForAttempt, submitQuizAttempt, clearSuccess } from '../../store/quizSlice';
import { questionTypeMap } from '../../services/quizService';
import type { AppDispatch, RootState } from '../../store/store';

export default function QuizAttempt() {
  const navigate = useNavigate();
  const { id: quizId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentQuiz: quiz, loading, error, success, message } = useSelector(
    (state: RootState) => state.quiz
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch quiz on mount
  useEffect(() => {
    if (quizId) {
      dispatch(fetchQuizForAttempt(quizId));
    }
  }, [dispatch, quizId]);

  // Initialize time based on quiz duration
  useEffect(() => {
    if (quiz?.durationMinutes && timeLeft === null) {
      setTimeLeft(quiz.durationMinutes * 60);
    }
  }, [quiz?.durationMinutes, timeLeft]);

  // Timer effect
  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev && prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: string | string[]) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleSubmit = async () => {
    if (!user?.id || !quizId || !quiz?.questions) return;

    setIsSubmitting(true);
    try {
      const timeSpent = (quiz?.durationMinutes || 30) * 60 - (timeLeft || 0);
      
      // Transform answers object to array format expected by backend
      const responses = quiz.questions.map((question: any, index: number) => ({
        questionId: question._id,
        answer: answers[index] || null,
      }));

      await dispatch(
        submitQuizAttempt({
          studentId: user.id,
          quizId,
          answers: responses,
          timeSpent,
        })
      ).unwrap();

      // Show success toast
      toast.success('Quiz submitted successfully!', {
        description: 'Your answers have been saved.',
      });

      // Navigate back to course detail after brief delay
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      toast.error('Failed to submit quiz', {
        description: 'Please try again.',
      });
    } finally {
      setIsSubmitting(false);
      setShowSubmitModal(false);
    }
  };

  const currentQ = quiz?.questions?.[currentQuestion];
  const progress = quiz?.questions ? ((currentQuestion + 1) / quiz.questions.length) * 100 : 0;

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8E3FF] via-[#F0ECFF] to-[#E8E3FF] -m-8 p-8 flex items-center justify-center">
        <Card className="p-12 text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C4EFF]"></div>
          </div>
          <p className="text-gray-600">Loading quiz...</p>
        </Card>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8E3FF] via-[#F0ECFF] to-[#E8E3FF] -m-8 p-8 flex items-center justify-center">
        <Card className="p-12 text-center border-red-200 bg-red-50 max-w-md">
          <p className="text-red-700 font-semibold mb-4">{error}</p>
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  // Handle quiz not found
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8E3FF] via-[#F0ECFF] to-[#E8E3FF] -m-8 p-8 flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <p className="text-gray-600 mb-4">Quiz not found or has no questions</p>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <p className="text-gray-500 text-xs mb-4">
            Quiz ID: {quizId} {'\n'}
            Quiz data: {quiz ? 'Loaded' : 'Not loaded'}
          </p>
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  // Handle success message after submission
  if (success) {
    return null; // Toast will handle the notification
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8E3FF] via-[#F0ECFF] to-[#E8E3FF] -m-8 p-8">
      {/* Top Bar */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
            <p className="text-gray-600">Question {currentQuestion + 1} of {quiz.questions?.length || 0}</p>
          </div>

          <div className="flex items-center gap-6">
            {/* Timer */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white px-6 py-3 rounded-xl">
              <Clock className="w-6 h-6" />
              <span className="text-xl font-bold">{timeLeft !== null ? formatTime(timeLeft) : '00:00'}</span>
            </div>

            {/* Submit Button */}
            <Button variant="secondary" onClick={() => setShowSubmitModal(true)} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Question Navigation Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="font-bold text-lg mb-4">Questions</h3>
            <div className="grid grid-cols-4 lg:grid-cols-4 gap-2">
              {quiz.questions?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                    index === currentQuestion
                      ? 'bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] text-white shadow-lg'
                      : answers[index]
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] rounded"></div>
                <span className="text-gray-600">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 rounded"></div>
                <span className="text-gray-600">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <span className="text-gray-600">Not Answered</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Question Area */}
        <div className="lg:col-span-3">
          <Card className="mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {currentQ?.type ? (questionTypeMap[currentQ.type] || currentQ.type) : 'Question'}
                  </span>
                  <span className="text-sm text-gray-500">{currentQ?.points || currentQ?.marks || 0} marks</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{currentQ?.question || currentQ?.prompt}</h2>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Flag className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ?.type?.includes('MCQ_SINGLE') && currentQ?.options?.map((option: string, index: number) => (
                <label
                  key={index}
                  className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    answers[currentQuestion] === option
                      ? 'border-[#6C4EFF] bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={answers[currentQuestion] === option}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="mr-3"
                  />
                  <span className="font-medium text-gray-700">{String.fromCharCode(65 + index)}. {option}</span>
                </label>
              ))}

              {currentQ?.type?.includes('MCQ_MULTIPLE') && currentQ?.options?.map((option: string, index: number) => (
                <label
                  key={index}
                  className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    (answers[currentQuestion] as string[])?.includes(option)
                      ? 'border-[#6C4EFF] bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={(answers[currentQuestion] as string[])?.includes(option) || false}
                    onChange={(e) => {
                      const current = (answers[currentQuestion] as string[]) || [];
                      const newAnswers = e.target.checked
                        ? [...current, option]
                        : current.filter(a => a !== option);
                      handleAnswer(newAnswers);
                    }}
                    className="mr-3"
                  />
                  <span className="font-medium text-gray-700">{String.fromCharCode(65 + index)}. {option}</span>
                </label>
              ))}

              {currentQ?.type === 'TRUE_FALSE' && (
                <div className="grid grid-cols-2 gap-4">
                  {['True', 'False'].map((option) => (
                    <label
                      key={option}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all text-center ${
                        answers[currentQuestion] === option
                          ? 'border-[#6C4EFF] bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        value={option}
                        checked={answers[currentQuestion] === option}
                        onChange={(e) => handleAnswer(e.target.value)}
                        className="sr-only"
                      />
                      <span className="text-xl font-bold text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {(currentQ?.type === 'SHORT_ANSWER' || currentQ?.type === 'LONG_ANSWER') && (
                <textarea
                  value={(answers[currentQuestion] as string) || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#6C4EFF] focus:outline-none min-h-32"
                  placeholder={`Type your ${currentQ?.type === 'SHORT_ANSWER' ? 'short' : 'long'} answer here...`}
                />
              )}

              {currentQ?.type === 'NUMERIC' && (
                <input
                  type="number"
                  value={(answers[currentQuestion] as string) || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#6C4EFF] focus:outline-none"
                  placeholder="Enter numeric answer..."
                />
              )}
            </div>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </Button>

            {currentQuestion < (quiz?.questions?.length || 0) - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                onClick={() => setShowSubmitModal(true)}
                className="flex items-center gap-2"
              >
                Submit Quiz
                <ChevronRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <Card className="max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Quiz?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit your quiz? You have answered{' '}
              <span className="font-bold">{Object.keys(answers).length}</span> out of{' '}
              <span className="font-bold">{quiz?.questions?.length || 0}</span> questions.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
