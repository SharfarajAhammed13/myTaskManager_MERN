/* eslint-disable react/jsx-key */
import { Modal, Button, Table} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashTasks() {
  const { currentUser } = useSelector((state) => state.user);
  const [userTasks, setUserTasks] = useState([]);
  const [showMore, setShowMore] = useState(true);
  console.log(userTasks);
  const [showModal, setShowModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState('');

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


  const handleDeleteTask = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/task/deletetask/${taskIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserTasks((prev) =>
          prev.filter((task) => task._id !== taskIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className='table-auto w-full overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userTasks.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell className="p-4">
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
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white'>
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
                    <span 
                      onClick={() => {
                        setShowModal(true);
                        setTaskIdToDelete(task._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'>
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
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this task?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteTask}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
