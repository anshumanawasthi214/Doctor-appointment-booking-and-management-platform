import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest, DEFAULT_BASE_URL } from "../api/api";
import { useAuth } from "../hooks/useAuth";
import { useApi } from "../hooks/useApi";
import {
  dashboardMenus,
  initialAdminForm,
  initialAppointmentForm,
  initialDoctorForm,
  initialDoctorSearch,
  initialPatientForm,
  roleOptions
} from "../config/dashboard";
import { getFriendlyErrorMessage } from "../utils/format";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const { session, role } = useAuth();
  const { loading, runRequest } = useApi();
  const [status, setStatus] = useState({ tone: "info", message: "" });
  const [profile, setProfile] = useState(null);
  const [patientForm, setPatientForm] = useState(initialPatientForm);
  const [doctorForm, setDoctorForm] = useState(initialDoctorForm);
  const [adminForm, setAdminForm] = useState(initialAdminForm);
  const [appointmentForm, setAppointmentForm] = useState(initialAppointmentForm);
  const [doctorSearchForm, setDoctorSearchForm] = useState(initialDoctorSearch);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [documentFiles, setDocumentFiles] = useState({});
  const [doctorResults, setDoctorResults] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [doctorPending, setDoctorPending] = useState([]);
  const [doctorAcceptedCases, setDoctorAcceptedCases] = useState([]);
  const [doctorReviews, setDoctorReviews] = useState([]);
  const [adminDoctors, setAdminDoctors] = useState([]);
  const [adminPatients, setAdminPatients] = useState([]);

  async function runAction(task, successMessage) {
    try {
      const result = await runRequest(task);
      if (successMessage) setStatus({ tone: "success", message: successMessage });
      return result;
    } catch (error) {
      setStatus({ tone: "error", message: getFriendlyErrorMessage(error) });
      return null;
    }
  }

  async function fetchPatientProfile(token = session?.token) {
    const data = await runAction(() => apiRequest("/api/patients/get", { token }));
    if (data) {
      const { profilePicture, ...patientData } = data;
      setProfile(data);
      setPatientForm((current) => ({ ...current, ...patientData, dateOfBirth: data.dateOfBirth || "" }));
    }
  }

  async function fetchDoctorProfile(token = session?.token) {
    const data = await runAction(() => apiRequest("/api/doctors/me", { token }));
    if (data) {
      setProfile(data);
      setDoctorForm((current) => ({
        ...current,
        ...data,
        yearsOfExperience: data.yearsOfExperience || "",
        consultationFee: data.consultationFee || ""
      }));
    }
  }

  async function fetchAdminProfile(token = session?.token) {
    const data = await runAction(() => apiRequest("/api/admin/me", { token }));
    if (data) {
      setProfile(data);
      setAdminForm({
        name: data.name || "",
        emailId: data.emailId || "",
        phoneNumber: data.mobileNumber || ""
      });
    }
  }

  async function fetchAppointments(token = session?.token) {
    const data = await runAction(() => apiRequest("/api/patient/appointments/all", { token }));
    if (data) setAppointments(data);
  }

  async function fetchHistory(token = session?.token) {
    const data = await runAction(() => apiRequest("/api/patients/history/appointments", { token }));
    if (data) setHistory(data);
  }

  async function fetchDocuments(token = session?.token) {
    const data = await runAction(() => apiRequest("/api/documents/my-documents", { token }));
    if (data) setDocuments(data);
  }

  async function fetchDoctorPending(token = session?.token) {
    const data = await runAction(() => apiRequest("/api/doctors/appointments/pending", { token }));
    if (data) setDoctorPending(data);
  }

  async function fetchDoctorAcceptedCases(token = session?.token) {
    const data = await runAction(() => apiRequest("/api/doctors/appointments/accepted", { token }));
    if (data) setDoctorAcceptedCases(data);
  }

  async function fetchDoctorReviews(token = session?.token) {
    const data = await runAction(() => apiRequest("/api/doctors/reviews", { token }));
    if (data) setDoctorReviews(data);
  }

  async function fetchAdminDoctors(token = session?.token) {
    const data = await runAction(() => apiRequest("/api/admin/doctors", { token }));
    if (data) setAdminDoctors(data);
  }

  async function fetchAdminPatients(token = session?.token) {
    const data = await runAction(() => apiRequest("/api/admin/patients", { token }));
    if (data) setAdminPatients(data);
  }

  useEffect(() => {
    if (!session?.token || !role) return;

    if (role === "PATIENT") {
      Promise.all([fetchPatientProfile(), fetchAppointments(), fetchHistory(), fetchDocuments()]);
    }
    if (role === "DOCTOR") {
      Promise.all([fetchDoctorProfile(), fetchDoctorPending(), fetchDoctorAcceptedCases(), fetchDoctorReviews()]);
    }
    if (role === "ADMIN") {
      Promise.all([fetchAdminProfile(), fetchAdminDoctors(), fetchAdminPatients()]);
    }
  }, [session?.token, role]);

  const roleMeta = roleOptions.find((item) => item.key === role) || roleOptions[0];

  const appointmentStatusCounts = useMemo(
    () =>
      appointments.reduce(
        (acc, appointment) => {
          acc.total += 1;
          const key = (appointment.status || "PENDING").toUpperCase();
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        },
        { total: 0 }
      ),
    [appointments]
  );

  const adminOverviewStats = useMemo(() => {
    const approvedDoctors = adminDoctors.filter((doctor) => (doctor.status || "").toUpperCase() === "APPROVED").length;
    const pendingDoctors = adminDoctors.filter((doctor) => (doctor.status || "").toUpperCase() === "PENDING").length;
    return { patients: adminPatients.length, doctors: adminDoctors.length, approvedDoctors, pendingDoctors };
  }, [adminDoctors, adminPatients]);

  const value = {
    session,
    role,
    roleMeta,
    profile,
    hasPatientProfile: Boolean(profile?.id),
    menuItems: dashboardMenus[role] || [],
    loading,
    status,
    patientForm,
    setPatientForm,
    doctorForm,
    setDoctorForm,
    adminForm,
    setAdminForm,
    appointmentForm,
    setAppointmentForm,
    doctorSearchForm,
    setDoctorSearchForm,
    selectedAppointmentId,
    setSelectedAppointmentId,
    documentFiles,
    setDocumentFiles,
    doctorResults,
    appointments,
    history,
    documents,
    doctorPending,
    doctorAcceptedCases,
    doctorReviews,
    adminDoctors,
    adminPatients,
    appointmentStatusCounts,
    adminOverviewStats,
    async savePatientProfile() {
      const hasExistingProfile = Boolean(profile?.id);
      const path = hasExistingProfile ? "/api/patients/update" : "/api/patients/register";
      const method = hasExistingProfile ? "PUT" : "POST";
      const { profilePicture, ...patientPayload } = patientForm;
      const data = await runAction(
        () => apiRequest(path, { method, token: session?.token, body: patientPayload }),
        hasExistingProfile ? "Your patient profile has been updated." : "Your patient profile has been created."
      );
      if (data) fetchPatientProfile();
    },
    async saveDoctorProfile() {
      const hasExistingProfile = Boolean(profile?.id);
      const path = hasExistingProfile ? "/api/doctors/update" : "/api/doctors/register-doctor";
      const method = hasExistingProfile ? "PUT" : "POST";
      const payload = {
        ...doctorForm,
        yearsOfExperience: Number(doctorForm.yearsOfExperience || 0),
        consultationFee: Number(doctorForm.consultationFee || 0)
      };
      const data = await runAction(
        () => apiRequest(path, { method, token: session?.token, body: payload }),
        hasExistingProfile ? "Your doctor profile has been updated." : "Your doctor profile has been submitted for approval."
      );
      if (data) fetchDoctorProfile();
    },
    async setDoctorAvailabilityStatus(statusValue) {
      const data = await runAction(
        () =>
          apiRequest("/api/doctors/update", {
            method: "PUT",
            token: session?.token,
            body: { availabilityStatus: statusValue }
          }),
        statusValue === "AVAILABLE" ? "Your status is now visible as online." : "Your status is now visible as offline."
      );
      if (data) fetchDoctorProfile();
    },
    async saveAdminProfile() {
      const hasExistingProfile = Boolean(profile?.id);
      const path = hasExistingProfile ? "/api/admin/update" : "/api/admin/create";
      const method = hasExistingProfile ? "PUT" : "POST";
      const data = await runAction(
        () => apiRequest(path, { method, token: session?.token, body: adminForm }),
        hasExistingProfile ? "The admin profile has been updated." : "The admin profile has been created."
      );
      if (data) fetchAdminProfile();
    },
    async createManagedAdmin(adminPayload) {
      const data = await runAction(
        () => apiRequest("/api/admin/create", { method: "POST", token: session?.token, body: adminPayload }),
        "A new admin account has been created successfully."
      );
      return data;
    },
    async searchDoctors() {
      const data = await runAction(
        () => apiRequest("/api/doctors/search", { token: session?.token, query: doctorSearchForm }),
        "Doctors matching your search have been loaded."
      );
      if (data) setDoctorResults(data);
    },
    async bookAppointment() {
      const data = await runAction(
        () =>
          apiRequest("/api/patient/appointments/book", {
            method: "POST",
            token: session?.token,
            body: { ...appointmentForm, doctorId: Number(appointmentForm.doctorId) }
          }),
        "Your appointment request has been booked successfully."
      );
      if (data) {
        fetchAppointments();
        fetchHistory();
      }
    },
    async updateAppointment() {
      if (!selectedAppointmentId) {
        setStatus({ tone: "error", message: "Please choose an appointment before trying to update it." });
        return;
      }

      const data = await runAction(
        () =>
          apiRequest(`/api/patient/appointments/update/${selectedAppointmentId}`, {
            method: "PUT",
            token: session?.token,
            body: { ...appointmentForm, doctorId: Number(appointmentForm.doctorId) }
          }),
        "Your appointment has been updated successfully."
      );
      if (data) fetchAppointments();
    },
    async deleteAppointment(appointmentId) {
      const data = await runAction(
        () => apiRequest(`/api/patient/appointments/delete/${appointmentId}`, { method: "DELETE", token: session?.token }),
        "Your appointment has been cancelled."
      );
      if (data !== null) {
        fetchAppointments();
        fetchHistory();
      }
    },
    async submitAppointmentReview(appointmentId, reviewPayload) {
      const data = await runAction(
        () =>
          apiRequest(`/api/patient/appointments/${appointmentId}/review`, {
            method: "POST",
            token: session?.token,
            body: reviewPayload
          }),
        "Thank you. Your review has been shared and the doctor's rating has been updated."
      );
      if (data) {
        fetchHistory();
      }
      return data;
    },
    async uploadDocument(file, resetForm) {
      if (!file) {
        setStatus({ tone: "error", message: "Please choose a medical report before uploading." });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      const data = await runAction(
        () => apiRequest("/api/documents/upload", { method: "POST", token: session?.token, body: formData }),
        "Your medical record has been uploaded."
      );
      if (data !== null) {
        fetchDocuments();
        resetForm?.();
      }
    },
    async updateDocument(documentId, file) {
      if (!file) {
        setStatus({ tone: "error", message: "Please choose a replacement report before updating this file." });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      const data = await runAction(
        () => apiRequest(`/api/documents/update/${documentId}`, { method: "PUT", token: session?.token, body: formData }),
        "Your medical record has been updated."
      );
      if (data !== null) {
        fetchDocuments();
        setDocumentFiles((current) => ({ ...current, [documentId]: null }));
      }
    },
    async deleteDocument(documentId) {
      const data = await runAction(
        () => apiRequest(`/api/documents/delete/${documentId}`, { method: "DELETE", token: session?.token }),
        "The medical record has been removed."
      );
      if (data !== null) fetchDocuments();
    },
    async respondToAppointment(appointmentId, response) {
      const data = await runAction(
        () =>
          apiRequest(`/api/doctors/appointments/${appointmentId}/response`, {
            method: "POST",
            token: session?.token,
            query: { response }
          }),
        response === "ACCEPTED" ? "The appointment request has been approved." : "The appointment request has been declined."
      );
      if (data !== null) {
        fetchDoctorPending();
        fetchDoctorAcceptedCases();
        fetchDoctorReviews();
      }
    },
    async updateDoctorStatus(id, statusValue) {
      const data = await runAction(
        () =>
          apiRequest(`/api/admin/doctors/${id}/status`, {
            method: "PUT",
            token: session?.token,
            query: { status: statusValue }
          }),
        statusValue === "APPROVED" ? "The doctor profile has been approved." : "The doctor profile has been rejected."
      );
      if (data !== null) fetchAdminDoctors();
    },
    async downloadDoctorDocument(appointmentId, documentId, fileName) {
      try {
        const response = await runRequest(() =>
          fetch(`${DEFAULT_BASE_URL}/api/doctors/appointments/${appointmentId}/documents/${documentId}/download`, {
            headers: {
              Authorization: `Bearer ${session?.token}`
            }
          })
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const blob = await response.blob();
        const objectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = fileName || "medical-document";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(objectUrl);
        setStatus({ tone: "success", message: "The patient document download has started." });
      } catch (error) {
        setStatus({ tone: "error", message: getFriendlyErrorMessage(error) });
      }
    }
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider.");
  }

  return context;
}
