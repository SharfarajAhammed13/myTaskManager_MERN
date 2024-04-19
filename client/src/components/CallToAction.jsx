import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to know more about this project?
            </h2>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://github.com/SharfarajAhammed13/myTaskManager_MERN" target='_blank' rel='noopener noreferrer'>
                    Check Out my GitHub Repository
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://media.istockphoto.com/id/1336546162/vector/planning-and-time-management-concept.jpg?s=612x612&w=0&k=20&c=RHewqwh3o9axwvUw8ubHTYO4wifcXfzJSTJVO1Al9YI=" />
        </div>
    </div>
  )
}