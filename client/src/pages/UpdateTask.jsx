import { Alert, Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


export default function UpdateTask() {
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchTask = async () => {
        const res = await fetch(`/api/task/gettasks?taskId=${taskId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.tasks[0]);
        }
      };

      fetchTask();
    } catch (error) {
      console.log(error.message);
    }
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/task/updatetask/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/task/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update a Task</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-row gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            value={formData.priority}
          >
            <option value='uncategorized'>Priority</option>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </Select>
        </div>
        <ReactQuill
          theme='snow'
          value={formData.content}
          placeholder='List Your Task....'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Edit Task
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}