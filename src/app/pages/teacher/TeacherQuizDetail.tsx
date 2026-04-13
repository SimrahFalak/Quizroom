import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import ProgressBar from '../../components/ui/ProgressBar';
import { fetchQuizById, publishQuiz, clearSuccess, clearError } from '../../store/quizSlice';
import type { AppDispatch, RootState } from '../../store/store';

export default function TeacherQuizDetail() {
  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<'details' | 'submissions' | 'results'>('details');

  const { currentQuiz, loading, error, success, message } = useSelector(
    (state: RootState) => state.quiz
  );
  const { user } = useSelector((state: RootState) => state.auth);

  // Fetch quiz on component mount
  useEffect(() => {
    if (user?.id && quizId) {
      dispatch(fetchQuizById({ teacherId: user.id, quizId }));
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
                <div className="text-3xl font-bold text-[#6C4EFF] mb-2">0</div>
                <div className="text-sm text-gray-600">Total Submissions</div>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">0</div>
                <div className="text-sm text-gray-600">Pending Grading</div>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">0%</div>
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
              <div className="text-center py-12">
                <p className="text-gray-500">No submissions yet</p>
              </div>
            </Card>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <Card>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Quiz Results</h2>
              <div className="text-center py-12">
                <p className="text-gray-500">No results available yet</p>
              </div>
            </Card>
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
