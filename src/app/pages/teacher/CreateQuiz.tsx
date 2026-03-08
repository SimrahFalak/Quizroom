import { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export default function CreateQuiz() {
  const [step, setStep] = useState(1);
  const [quizDetails, setQuizDetails] = useState({
    title: '',
    course: '',
    description: '',
    duration: '',
    totalMarks: '',
    deadline: '',
  });

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 5,
  });

  const questionTypes = [
    { value: 'mcq', label: 'Multiple Choice (Single)' },
    { value: 'multiple', label: 'Multiple Choice (Multiple)' },
    { value: 'truefalse', label: 'True / False' },
    { value: 'short', label: 'Short Answer' },
    { value: 'long', label: 'Long Answer' },
    { value: 'file', label: 'File Upload' },
    { value: 'numeric', label: 'Numeric' },
  ];

  const addQuestion = () => {
    setQuestions([...questions, { ...currentQuestion, id: Date.now() }]);
    setCurrentQuestion({
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: 5,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Quiz</h1>
        <p className="text-gray-600">Build a comprehensive quiz for your students</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <button
              onClick={() => setStep(s)}
              className={`w-12 h-12 rounded-full font-bold text-lg transition-all ${
                step >= s
                  ? 'bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] text-white shadow-lg'
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
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Quiz Title"
                placeholder="e.g., Web Development Mid-term"
                value={quizDetails.title}
                onChange={(e) => setQuizDetails({ ...quizDetails, title: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                  value={quizDetails.course}
                  onChange={(e) => setQuizDetails({ ...quizDetails, course: e.target.value })}
                >
                  <option value="">Select Course</option>
                  <option value="web">Web Development</option>
                  <option value="data">Data Science</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="design">Graphic Design</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                rows={4}
                placeholder="Describe what this quiz covers..."
                value={quizDetails.description}
                onChange={(e) => setQuizDetails({ ...quizDetails, description: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Input
                label="Duration (minutes)"
                type="number"
                placeholder="30"
                value={quizDetails.duration}
                onChange={(e) => setQuizDetails({ ...quizDetails, duration: e.target.value })}
              />
              <Input
                label="Total Marks"
                type="number"
                placeholder="100"
                value={quizDetails.totalMarks}
                onChange={(e) => setQuizDetails({ ...quizDetails, totalMarks: e.target.value })}
              />
              <Input
                label="Deadline"
                type="date"
                value={quizDetails.deadline}
                onChange={(e) => setQuizDetails({ ...quizDetails, deadline: e.target.value })}
              />
            </div>

            {/* Options */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quiz Options</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">Enable negative marking</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">Randomize questions</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                  <span className="text-gray-700">Allow multiple attempts</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button size="lg" onClick={() => setStep(2)}>
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
                <p className="text-sm text-gray-500 text-center py-8">No questions added yet</p>
              ) : (
                <div className="space-y-2">
                  {questions.map((q, index) => (
                    <div
                      key={q.id}
                      className="p-3 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-800">Q{index + 1}</div>
                        <div className="text-xs text-gray-500">{q.type}</div>
                      </div>
                      <button
                        onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
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
                    <span className="font-bold">{questions.reduce((sum, q) => sum + q.marks, 0)}</span>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                      value={currentQuestion.type}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value })}
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
                    value={currentQuestion.marks}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, marks: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                    rows={3}
                    placeholder="Enter your question..."
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                  />
                </div>

                {/* Options for MCQ */}
                {(currentQuestion.type === 'mcq' || currentQuestion.type === 'multiple') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Answer Options</label>
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input
                            type={currentQuestion.type === 'mcq' ? 'radio' : 'checkbox'}
                            name="correct-answer"
                            className="w-5 h-5"
                          />
                          <input
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6C4EFF] focus:outline-none"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...currentQuestion.options];
                              newOptions[index] = e.target.value;
                              setCurrentQuestion({ ...currentQuestion, options: newOptions });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentQuestion({
                        ...currentQuestion,
                        options: [...currentQuestion.options, '']
                      })}
                      className="mt-3 text-[#6C4EFF] font-semibold flex items-center gap-2 hover:underline"
                    >
                      <Plus className="w-4 h-4" />
                      Add Option
                    </button>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={addQuestion}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Question
                  </Button>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                ← Back
              </Button>
              <Button variant="secondary" className="flex-1 flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                Save Draft
              </Button>
              <Button className="flex-1">
                Publish Quiz
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
