import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export default function TeacherGradeAttempt() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const submission = (location.state as { submission?: { student?: string } } | undefined)?.submission;

  const studentName = submission?.student || decodeURIComponent(studentId || 'Student');
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
      studentAnswer: 'Both A and B',
      maxMarks: 5,
    },
    {
      id: 2,
      type: 'multiple',
      question: 'Which of the following are React hooks? (Select all that apply)',
      options: ['useState', 'useEffect', 'useContext', 'useComponent'],
      studentAnswer: ['useState', 'useEffect', 'useContext'],
      maxMarks: 5,
    },
    {
      id: 3,
      type: 'truefalse',
      question: 'React is a JavaScript library for building user interfaces.',
      studentAnswer: 'True',
      maxMarks: 5,
    },
    {
      id: 4,
      type: 'short',
      question: 'What does JSX stand for?',
      studentAnswer: 'JavaScript XML',
      maxMarks: 5,
    },
  ];

  const [awardedMarks, setAwardedMarks] = useState<Record<number, number>>(
    questions.reduce((acc, q) => {
      acc[q.id] = 0;
      return acc;
    }, {} as Record<number, number>),
  );

  const totalMarks = useMemo(
    () => questions.reduce((sum, q) => sum + (awardedMarks[q.id] || 0), 0),
    [questions, awardedMarks],
  );

  const maxTotal = useMemo(() => questions.reduce((sum, q) => sum + q.maxMarks, 0), [questions]);
  const currentQ = questions[currentQuestion];

  const setQuestionMarks = (questionId: number, value: string, maxMarks: number) => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      setAwardedMarks((prev) => ({ ...prev, [questionId]: 0 }));
      return;
    }

    const clamped = Math.max(0, Math.min(maxMarks, parsed));
    setAwardedMarks((prev) => ({ ...prev, [questionId]: clamped }));
  };

  const isSelected = (answer: string) => {
    if (Array.isArray(currentQ.studentAnswer)) {
      return currentQ.studentAnswer.includes(answer);
    }
    return currentQ.studentAnswer === answer;
  };

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Grade Attempt</h1>
          <p className="text-gray-600">{studentName} • Question {currentQuestion + 1} of {questions.length}</p>
        </div>
        <Card className="py-3 px-4">
          <div className="text-sm text-gray-600">Total Awarded</div>
          <div className="text-2xl font-bold text-[#6C4EFF]">{totalMarks}/{maxTotal}</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <h3 className="font-bold text-lg mb-4">Questions</h3>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                    index === currentQuestion
                      ? 'bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <div className="flex items-start justify-between mb-6 gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold uppercase">
                    {currentQ.type}
                  </span>
                  <span className="text-sm text-gray-500">Max {currentQ.maxMarks} marks</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{currentQ.question}</h2>
              </div>

              <div className="w-32">
                <label className="text-sm font-semibold text-gray-700">Marks</label>
                <input
                  type="number"
                  min={0}
                  max={currentQ.maxMarks}
                  value={awardedMarks[currentQ.id]}
                  onChange={(e) => setQuestionMarks(currentQ.id, e.target.value, currentQ.maxMarks)}
                  className="w-full mt-2 px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              {(currentQ.type === 'mcq' || currentQ.type === 'multiple') &&
                currentQ.options?.map((option) => (
                  <div
                    key={option}
                    className={`block p-4 border-2 rounded-xl ${
                      isSelected(option)
                        ? 'border-[#6C4EFF] bg-purple-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-gray-700">{option}</span>
                  </div>
                ))}

              {currentQ.type === 'truefalse' && (
                <div className="grid grid-cols-2 gap-4">
                  {['True', 'False'].map((option) => (
                    <div
                      key={option}
                      className={`p-6 border-2 rounded-xl text-center ${
                        isSelected(option)
                          ? 'border-[#6C4EFF] bg-purple-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <span className="text-xl font-bold text-gray-700">{option}</span>
                    </div>
                  ))}
                </div>
              )}

              {currentQ.type === 'short' && (
                <div className="w-full p-4 border-2 border-[#6C4EFF] bg-purple-50 rounded-xl text-gray-700">
                  {String(currentQ.studentAnswer)}
                </div>
              )}
            </div>
          </Card>

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

            <div className="flex gap-3">
              <Button variant="outline">Save Marks</Button>
              {currentQuestion < questions.length - 1 ? (
                <Button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="flex items-center gap-2 bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  onClick={() => navigate(-1)}
                  className="bg-[#6C4EFF] text-white hover:bg-[#5a3fe0]"
                >
                  Submit Grade
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
