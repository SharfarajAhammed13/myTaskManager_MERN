/* eslint-disable react/jsx-key */

import { Table, Checkbox } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashTasks() {
  const { currentUser } = useSelector((state) => state.user);
  const [userTasks, setUserTasks] = useState([]);
  const [showMore, setShowMore] = useState(true);
  console.log(userTasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`/api/task/gettasks?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserTasks(data.tasks);
          if (data.tasks.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchTasks();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userTasks.length;
    try {
      const res = await fetch(
        `/api/task/gettasks?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserTasks((prev) => [...prev, ...data.tasks]);
        if (data.tasks.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleCheckboxChange = (taskId) => {
    const updatedTasks = userTasks.map((task) => {
      if (userTasks.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setUserTasks(updatedTasks);
  };

  const handleSelectAllChange = () => {
    const allTasksCompleted = userTasks.every((task) => task.completed);
    const updatedTasks = userTasks.map((task) => ({
      ...task,
      completed: !allTasksCompleted,
    }));
    setUserTasks(updatedTasks);
  };


  return (
    <div className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userTasks.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell className="p-4">
                <Checkbox 
                  checked={userTasks.every((task) => task.completed)}
                  onChange={handleSelectAllChange}
                />
              </Table.HeadCell>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Task Title</Table.HeadCell>
              <Table.HeadCell>Task Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userTasks.map((task) => (
              <Table.Body key={userTasks._id}className='divide-y'>
                <Table.Row className='bg-white'>
                  <Table.Cell className="p-4">
                    <Checkbox 
                      checked={userTasks.completed}
                      onChange={()=> handleCheckboxChange(userTasks._id)}
                    />
                  </Table.Cell>
                  <Table.Cell> 
                    {new Date(task.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/task/${task.slug}`}
                    >
                      {task.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{task.priority}</Table.Cell>
                  <Table.Cell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-task/${task._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='outline w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no Tasks yet!</p>
      )}
    </div>
  );
}
