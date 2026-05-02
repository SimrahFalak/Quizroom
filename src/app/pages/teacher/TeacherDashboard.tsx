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
  const totalStudents = courses.reduce((sum: number, c: any) => sum + (c.students?.length || 0), 0);

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
    { title: 'Total Students', value: String(totalStudents), icon: Users, color: '#6C4EFF' },
    { title: 'Quizzes Created', value: String(quizzesCreated), icon: FileQuestion, color: '#FFA500' },
    { title: 'Average Score', value: `${averageScore}%`, icon: Award, color: '#00D084' },
    { title: 'Pending Grading', value: String(pendingGrading), icon: Clock, color: '#FF6B9D' },
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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="course" stroke="#888" />
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

    </div>
  );
}
