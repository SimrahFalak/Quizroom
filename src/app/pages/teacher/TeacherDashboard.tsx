import { useEffect, useState } from 'react';
import { Users, FileQuestion, Award, Clock } from 'lucide-react';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import StatCard from '../../components/dashboard/StatCard';
import { Card } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getTeacherCourses } from '../../store/courseSlice';
import { fetchTeacherQuizzes, fetchQuizAttempts } from '../../store/quizSlice';

export default function TeacherDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { courses } = useSelector((state: RootState) => state.course);
  const { quizzes } = useSelector((state: RootState) => state.quiz);

  const [allAttempts, setAllAttempts] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    // Fetch teacher courses and quizzes
    dispatch(getTeacherCourses(user.id));

    dispatch(fetchTeacherQuizzes(user.id)).then((action: any) => {
      const fetchedQuizzes = action.payload || [];

      // For each quiz, fetch attempts and attach quiz/course metadata
      Promise.all(
        fetchedQuizzes.map((q: any) =>
          dispatch(fetchQuizAttempts({ teacherId: user.id, quizId: q._id })).then((a: any) => {
            const attemptsForQuiz = a.payload || [];
            return attemptsForQuiz.map((att: any) => ({ ...att, quizId: q._id, courseId: q.course?._id || q.course }));
          })
        )
      ).then((results) => {
        // flatten
        const flattened = results.flat();
        setAllAttempts(flattened);
      });
    });
  }, [dispatch, user?.id]);

  // Total students across all courses
  const totalCourses = courses.length;

  // Quizzes created
  const quizzesCreated = quizzes.length;

  // Average score across all reviewed attempts
  const reviewedAttempts = allAttempts.filter((a) => a.reviewedAt);
  const averageScore = reviewedAttempts.length
    ? Math.round(reviewedAttempts.reduce((s, a) => s + Number(a.percentage || 0), 0) / reviewedAttempts.length)
    : 0;

  // Pending grading = attempts without reviewedAt
  const pendingGrading = allAttempts.filter((a) => !a.reviewedAt).length;

  const stats = [
<<<<<<< HEAD
    { title: 'Total Students', value: '245', icon: Users, color: '#6C4EFF' },
    { title: 'Quizzes Created', value: '42', icon: FileQuestion, color: '#FFA500' },
    { title: 'Average Score', value: '78%', icon: Award, color: '#00D084' },
    { title: 'Pending Grading', value: '12', icon: Clock, color: '#FF6B9D' },
=======
    { title: 'Total Courses', value: String(totalCourses), icon: Users, color: '#6C4EFF' },
    { title: 'Quizzes Created', value: String(quizzesCreated), icon: FileQuestion, color: '#FFA500' },
    { title: 'Average Score', value: `${averageScore}%`, icon: Award, color: '#00D084' },
    { title: 'Pending Grading', value: String(pendingGrading), icon: Clock, color: '#FF6B9D' },
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
  ];

  // Compute per-course average percentage from accumulated attempts
  const courseAttemptMap: Record<string, any[]> = {};
  allAttempts.forEach((a) => {
    const cid = String(a.courseId || a.course || 'unknown');
    if (!courseAttemptMap[cid]) courseAttemptMap[cid] = [];
    if (typeof a.percentage === 'number') courseAttemptMap[cid].push(a);
  });

  const classPerformance = courses.map((c: any) => {
    const cid = String(c._id);
    const attemptsForCourse = courseAttemptMap[cid] || [];
    const avg = attemptsForCourse.length
      ? Math.round(attemptsForCourse.reduce((s: number, it: any) => s + Number(it.percentage || 0), 0) / attemptsForCourse.length)
      : Math.round(c.averageScore || 0);
    return { course: c.title, average: avg };
  });

  // Build score distribution buckets from attempts
  const distributionBuckets = [
    { range: 'A (90-100)', count: 0, color: '#00D084' },
    { range: 'B (80-89)', count: 0, color: '#6C4EFF' },
    { range: 'C (70-79)', count: 0, color: '#FFA500' },
    { range: 'D (60-69)', count: 0, color: '#FF9B9B' },
    { range: 'F (<60)', count: 0, color: '#FF6B6B' },
  ];

  allAttempts.forEach((a) => {
    const p = Number(a.percentage ?? 0);
    if (p >= 90) distributionBuckets[0].count++;
    else if (p >= 80) distributionBuckets[1].count++;
    else if (p >= 70) distributionBuckets[2].count++;
    else if (p >= 60) distributionBuckets[3].count++;
    else distributionBuckets[4].count++;
  });

  const scoreDistribution = distributionBuckets;

  const recentQuizzes = quizzes.slice(0, 3).map((q: any) => ({
    title: q.title,
    course: q.course?.title || '',
    participants: q.attemptsCount || 0,
    avgScore: q.avgScore || 0,
    date: q.createdAt ? new Date(q.createdAt).toLocaleDateString() : '',
  }));

  return (
    <div className="space-y-8">
      <WelcomeBanner userName={user?.name || 'Instructor'} role="teacher" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Class Performance Chart */}
        <Card>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Class Performance</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={classPerformance} margin={{ bottom: 60, left: 0, right: 20, top: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="course" 
                stroke="#888"
                angle={-45}
                textAnchor="end"
                height={100}
                label={{ value: 'Courses', position: 'insideBottomRight', offset: -10 }}
              />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="average" fill="#6C4EFF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Score Distribution */}
        <Card>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Score Distribution</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ range, count }) => `${range}: ${count}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

<<<<<<< HEAD
      {/* Recent Quizzes */}
      {/* <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Quizzes</h2>
          <button className="text-[#6C4EFF] font-semibold hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentQuizzes.map((quiz, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{quiz.title}</h3>
                  <p className="text-sm text-gray-500">{quiz.course} • {quiz.date}</p>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{quiz.participants}</div>
                    <div className="text-xs text-gray-500">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#6C4EFF]">{quiz.avgScore}%</div>
                    <div className="text-xs text-gray-500">Avg Score</div>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-[#6C4EFF] to-[#9A7BFF] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    View Results
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card> */}

      {/* Quick Actions */}
      {/* <div className="grid md:grid-cols-3 gap-6">
        <Card hover className="text-center cursor-pointer">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6C4EFF] to-[#9A7BFF] rounded-xl flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Create New Quiz</h3>
          <p className="text-sm text-gray-600">Build a new assessment for your students</p>
        </Card>

        <Card hover className="text-center cursor-pointer">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Manage Students</h3>
          <p className="text-sm text-gray-600">View and track student progress</p>
        </Card>

        <Card hover className="text-center cursor-pointer">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Grade Submissions</h3>
          <p className="text-sm text-gray-600">Review and grade pending submissions</p>
        </Card>
      </div> */}
=======
>>>>>>> badd9b9c90de8df894cb70491e56df90f4d61d6a
    </div>
  );
}
