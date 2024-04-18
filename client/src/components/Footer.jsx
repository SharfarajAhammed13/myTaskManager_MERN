import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

export default function FooterCom() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
        <div className='mt-5'>
            <Link
                to='/'
                className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold'
            >
            <span className='px-2 py-1 bg-gradient-to-r from-red-500 via-blue-600 to-blue-400 rounded-lg text-white'>
                My Task Manager
            </span>
            </Link>
          </div>
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Sharfaraj" year={2024} />
      </div>
    </Footer>
  );
}
