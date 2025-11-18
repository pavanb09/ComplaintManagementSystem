
import StudentRegister from './Pages/StudentRegistraction'
import AdminRegister from './Pages/AdminRegistraction'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import StudentHome from './Pages/StudentHome';
import AdminDashboard from './Pages/AdminDashboard';
import StudentComplaintForm from './Pages/StudentComplaintFrom';
import MyComplaints from './Pages/MyComplaints';
import AdminComplaints from './Pages/AdminComplaints';
import LandingPage from './Pages/LandingPage';

function App() {

  return (
    <BrowserRouter>

      <Routes>

          <Route path="/" element={<LandingPage/>} />

        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/admin" element={<AdminRegister />} />

        <Route path="/login" element={<Login />} />

        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/complaint-form" element={<StudentComplaintForm />} />
        <Route path="/student/my-complaints" element={<MyComplaints />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default App
