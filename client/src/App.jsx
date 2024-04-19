import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreateTask from "./pages/CreateTask";
import UpdateTask from "./pages/UpdateTask";
import TaskPage from "./pages/TaskPage";
import ScrollToTop from "./components/ScrollTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* <Route path="/task" element={<Task />} /> */}
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/update-task/:taskId" element={<UpdateTask />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/task/:taskSlug" element={<TaskPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
