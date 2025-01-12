import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
// import UserManagement from './pages/UserManagement';
import ExamManagement from "./pages/ExamPanel";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Authpage from "./pages/Authpage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useRecoilValue } from "recoil";
import userState from "./atom/useratom";
import Questions from "./pages/Questions";
import ExamPanel from "./pages/ExamPanel";
import Footer from "./components/Footer";

function App() {
  const user = useRecoilValue(userState);

  const RoleBasedRoute = ({ role, Component }) => {
    if (!user) return <Navigate to="/auth" replace />;
    return user?.role === role ? <Component /> : <Navigate to="/" replace />;
  };

  // console.log(user);
  return (
    <>
      <div className="content p-0 m-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/auth"
            element={!user ? <Authpage /> : <Navigate to="/" replace />}
          />

          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/auth" replace />}
          />
          <Route
            path="/user-dashboard"
            element={<RoleBasedRoute role="user" Component={UserDashboard} />}
          />
          <Route
            path={`/user-dashboard/:examId/questions`}
            element={<RoleBasedRoute role="user" Component={ExamPanel} />}
          />
          <Route
            path="/admin-dashboard"
            element={<RoleBasedRoute role="admin" Component={AdminDashboard} />}
          />

          {/* <Route path="/users" element={<RoleBasedRoute role="admin" Component={UserManagement} />} /> */}
          <Route
            path="/exams"
            element={<RoleBasedRoute role="admin" Component={ExamManagement} />}
          />
          <Route
            path={`/admin-dashboard/:examId/questions`}
            element={<RoleBasedRoute role="admin" Component={Questions} />}
          />

          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/auth" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
