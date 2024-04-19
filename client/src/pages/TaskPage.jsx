import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import TaskCard from '../components/TaskCard';

export default function TaskPage() {
  const { taskSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [task, setTask] = useState(null);
  const [recentTasks, setRecentTasks] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/task/gettasks?slug=${taskSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setTask(data.tasks[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskSlug]);

  useEffect(() => {
    try {
      const fetchRecentTasks = async () => {
        const res = await fetch(`/api/task/gettasks?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentTasks(data.Tasks);
        }
      };
      fetchRecentTasks();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
  <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
    {task && task.title}
  </h1>
  <Link
    to={`/search?category=${task && task.category}`}
    className='self-center mt-5'
  >
    <Button color='gray' pill size='xs'>
      {task && task.priority}
    </Button>
  </Link>
  <img
    src={task && task.image}
    alt={task && task.title}
    className='mt-10 p-3 max-h-[600px] w-full object-cover'
  />
  <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{task && new Date(task.createdAt).toLocaleDateString()}</span>
        {/* <span className='italic'>{task && (task.content.length /1000).toFixed(0)} mins read</span> */}
    </div>
    <div className='p-3 max-w-2xl mx-auto w-full task-content' dangerouslySetInnerHTML={{__html: task && task.content}}>

    </div>
    <div className='max-w-4xl mx-auto w-full'>
      <CallToAction/>
    </div>
      <CommentSection taskId={task._id} />
      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentTasks &&
            recentTasks.map((task) => <TaskCard key={task._id} task={task} />)}
        </div>
      </div>
    </main>
}