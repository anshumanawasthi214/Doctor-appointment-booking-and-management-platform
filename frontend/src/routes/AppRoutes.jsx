import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { DashboardProvider } from "../context/DashboardContext";
import { useAuth } from "../hooks/useAuth";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDoctors from "../pages/admin/AdminDoctors";
import AdminCreate from "../pages/admin/AdminCreate";
import AdminOverview from "../pages/admin/AdminOverview";
import AdminPatients from "../pages/admin/AdminPatients";
import AdminProfile from "../pages/admin/AdminProfile";
import DoctorDocuments from "../pages/doctor/DoctorDocuments";
import DoctorOverview from "../pages/doctor/DoctorOverview";
import DoctorPending from "../pages/doctor/DoctorPending";
import DoctorProfile from "../pages/doctor/DoctorProfile";
import BookAppointment from "../pages/patient/BookAppointment";
import DoctorSearch from "../pages/patient/DoctorSearch";
import Documents from "../pages/patient/Documents";
import PatientAppointments from "../pages/patient/PatientAppointments";
import PatientOverview from "../pages/patient/PatientOverview";
import PatientProfile from "../pages/patient/PatientProfile";

function PublicOnlyRoute({ children }) {
  const { session, getDashboardHome } = useAuth();

  if (session?.user?.role) {
    return <Navigate to={getDashboardHome(session.user.role)} replace />;
  }

  return children;
}

function ProtectedRoleRoute({ allowedRole }) {
  const { session, getDashboardHome } = useAuth();

  if (!session?.user?.role) {
    return <Navigate to="/" replace />;
  }

  if (session.user.role !== allowedRole) {
    return <Navigate to={getDashboardHome(session.user.role)} replace />;
  }

  return (
    <DashboardProvider>
      <DashboardLayout />
    </DashboardProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicOnlyRoute>
            <Home />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicOnlyRoute>
            <ForgotPassword />
          </PublicOnlyRoute>
        }
      />

      <Route path="/dashboard/patient" element={<ProtectedRoleRoute allowedRole="PATIENT" />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<PatientOverview />} />
        <Route path="profile" element={<PatientProfile />} />
        <Route path="doctors" element={<DoctorSearch />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="documents" element={<Documents />} />
      </Route>

      <Route path="/dashboard/doctor" element={<ProtectedRoleRoute allowedRole="DOCTOR" />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<DoctorOverview />} />
        <Route path="profile" element={<DoctorProfile />} />
        <Route path="pending" element={<DoctorPending />} />
        <Route path="documents" element={<DoctorDocuments />} />
      </Route>

      <Route path="/dashboard/admin" element={<ProtectedRoleRoute allowedRole="ADMIN" />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<AdminOverview />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="patients" element={<AdminPatients />} />
        <Route path="create-admin" element={<AdminCreate />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
