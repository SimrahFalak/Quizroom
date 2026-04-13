import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, FileQuestion, Calendar } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { fetchStudentQuizzes } from '../../store/quizSlice';
import type { AppDispatch, RootState } from '../../store/store';

export default function StudentQuizzes() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'missed'>('all');

  const { quizzes, loading } = useSelector((state: RootState) => state.quiz);
  const { user } = useSelector((state: RootState) => state.auth);

  // Fetch quizzes on component mount
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchStudentQuizzes({ studentId: user.id }));
    }
  }, [dispatch, user?.id]);

  // Transform quizzes to include status info (this would come from API in real scenario)
  const transformedQuizzes = quizzes.map((quiz) => {
    const deadline = quiz.deadline ? new Date(quiz.deadline) : null;
    const now = new Date();
    let status: 'upcoming' | 'completed' | 'missed' = 'upcoming';
    
    if (deadline && now > deadline) {
      status = 'missed';
    }
    
    return {
      ...quiz,
      id: quiz._id,
      duration: `${quiz.durationMinutes} min`,
      questions: 0, // Would need attempt data to determine if completed
      status,
      course: 'Course', // This would need course data from API
    };
  });

  const filteredQuizzes = filter === 'all' 
    ? transformedQuizzes
    : transformedQuizzes.filter(q => q.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'missed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quizzes</h1>
        <p className="text-gray-600">View and attempt your quizzes</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm">
        {(['all', 'upcoming', 'completed', 'missed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex-1 py-3 px-6 cursor-pointer rounded-lg font-medium transition-all capitalize ${
              filter === tab
                ? 'bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Quiz List */}
      <div className="grid gap-6">
        {loading ? (
          <Card className="text-center py-12">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C4EFF]"></div>
            </div>
            <p className="text-gray-600 mt-4">Loading quizzes...</p>
          </Card>
        ) : filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-xl transition-all">
              <div className="flex items-center gap-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileQuestion className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{quiz.title}</h3>
                      <p className="text-sm text-gray-500">{quiz.course}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(quiz.status)}`}>
                      {quiz.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{quiz.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FileQuestion className="w-4 h-4" />
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{quiz.deadline ? new Date(quiz.deadline).toLocaleDateString() : 'No deadline'}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">{quiz.totalMarks}</span> total marks
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                  {quiz.status === 'upcoming' && (
                    <Button onClick={() => navigate(`/student/quiz/${quiz.id}`)}>
                      Start Quiz
                    </Button>
                  )}
                  {quiz.status === 'missed' && (
                    <Button variant="ghost" disabled>
                      Missed
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12">
            <FileQuestion className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No quizzes found</h3>
            <p className="text-gray-500">There are no {filter !== 'all' ? filter : ''} quizzes at the moment.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
