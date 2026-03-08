import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Clock, ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export default function QuizAttempt() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const questions = [
    {
      id: 1,
      type: 'mcq',
      question: 'What is the correct syntax for a React functional component?',
      options: [
        'function Component() { return <div>Hello</div> }',
        'const Component = () => { return <div>Hello</div> }',
        'class Component extends React.Component { }',
        'Both A and B',
      ],
      marks: 5,
    },
    {
      id: 2,
      type: 'multiple',
      question: 'Which of the following are React hooks? (Select all that apply)',
      options: ['useState', 'useEffect', 'useContext', 'useComponent'],
      marks: 5,
    },
    {
      id: 3,
      type: 'truefalse',
      question: 'React is a JavaScript library for building user interfaces.',
      marks: 5,
    },
    {
      id: 4,
      type: 'short',
      question: 'What does JSX stand for?',
      marks: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: string | string[]) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleSubmit = () => {
    // Handle quiz submission
    navigate('/student/results');
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8E3FF] via-[#F0ECFF] to-[#E8E3FF] -m-8 p-8">
      {/* Top Bar */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Web Development Quiz 1</h1>
            <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
          </div>

          <div className="flex items-center gap-6">
            {/* Timer */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white px-6 py-3 rounded-xl">
              <Clock className="w-6 h-6" />
              <span className="text-xl font-bold">{formatTime(timeLeft)}</span>
            </div>

            {/* Submit Button */}
            <Button variant="secondary" onClick={() => setShowSubmitModal(true)}>
              Submit Quiz
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
              {questions.map((_, index) => (
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
                    {currentQ.type.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">{currentQ.marks} marks</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{currentQ.question}</h2>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Flag className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.type === 'mcq' && currentQ.options?.map((option, index) => (
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
                  <span className="font-medium text-gray-700">{option}</span>
                </label>
              ))}

              {currentQ.type === 'multiple' && currentQ.options?.map((option, index) => (
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
                    checked={(answers[currentQuestion] as string[])?.includes(option)}
                    onChange={(e) => {
                      const current = (answers[currentQuestion] as string[]) || [];
                      const newAnswers = e.target.checked
                        ? [...current, option]
                        : current.filter(a => a !== option);
                      handleAnswer(newAnswers);
                    }}
                    className="mr-3"
                  />
                  <span className="font-medium text-gray-700">{option}</span>
                </label>
              ))}

              {currentQ.type === 'truefalse' && (
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

              {currentQ.type === 'short' && (
                <input
                  type="text"
                  value={(answers[currentQuestion] as string) || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#6C4EFF] focus:outline-none"
                  placeholder="Type your answer here..."
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

            {currentQuestion < questions.length - 1 ? (
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
              <span className="font-bold">{questions.length}</span> questions.
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
              >
                Submit Quiz
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
