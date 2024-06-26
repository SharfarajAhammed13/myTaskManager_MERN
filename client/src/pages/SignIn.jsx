import { Alert, Spinner, Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-red-500 via-blue-600 to-blue-400 rounded-lg text-white">
              My Task Manager
            </span>
          </Link>
          <p className="mt-3 text-2xl font-semibold">
            Keep your Tasks Running!
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput 
                type="text" 
                placeholder="Username" 
                id="username" 
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput 
                type="password" 
                placeholder="Password" 
                id="password" 
                onChange={handleChange}
              />
            </div>
            <Button outline 
              gradientDuoTone="purpleToBlue" 
              type="submit"
              disabled={loading}  
            >
             { loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className="pl-3">Loading...</span>
                </>

             ):(
              'Sign In'

             )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex flex-row gap-2 text-sm mt-5 ">
            <span className="text-xl">Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              <Button outline size="xs" className="text-xl">
                Sign Up
              </Button>
              
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color='failure'>
                {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}