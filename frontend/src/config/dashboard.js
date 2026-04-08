import {
  CalendarCheck2,
  ClipboardPlus,
  FileText,
  LayoutDashboard,
  Search,
  ShieldCheck,
  SquareUserRound,
  Stethoscope,
  UserPlus,
  Users
} from "lucide-react";

export const roleOptions = [
  { key: "PATIENT", label: "Patient", loginLabel: "Patient Login" },
  { key: "DOCTOR", label: "Doctor", loginLabel: "Doctor Login" },
  { key: "ADMIN", label: "Admin", loginLabel: "Admin Login" }
];

export const registerEndpoints = {
  PATIENT: "/user/register/patient",
  DOCTOR: "/user/register/doctor",
  ADMIN: "/user/register/admin"
};

export const dashboardMenus = {
  PATIENT: [
    { key: "overview", label: "Overview", path: "/dashboard/patient/overview", icon: LayoutDashboard },
    { key: "profile", label: "Profile", path: "/dashboard/patient/profile", icon: SquareUserRound },
    { key: "doctors", label: "Find Doctors", path: "/dashboard/patient/doctors", icon: Search },
    { key: "book", label: "Book Appointment", path: "/dashboard/patient/book-appointment", icon: ClipboardPlus },
    { key: "appointments", label: "Appointments", path: "/dashboard/patient/appointments", icon: CalendarCheck2 },
    { key: "documents", label: "Documents", path: "/dashboard/patient/documents", icon: FileText }
  ],
  DOCTOR: [
    { key: "overview", label: "Overview", path: "/dashboard/doctor/overview", icon: LayoutDashboard },
    { key: "profile", label: "Profile", path: "/dashboard/doctor/profile", icon: SquareUserRound },
    { key: "pending", label: "Pending Requests", path: "/dashboard/doctor/pending", icon: ClipboardPlus },
    { key: "documents", label: "Documents", path: "/dashboard/doctor/documents", icon: FileText }
  ],
  ADMIN: [
    { key: "overview", label: "Overview", path: "/dashboard/admin/overview", icon: LayoutDashboard },
    { key: "doctors", label: "Doctors", path: "/dashboard/admin/doctors", icon: Stethoscope },
    { key: "patients", label: "Patients", path: "/dashboard/admin/patients", icon: Users },
    { key: "create-admin", label: "Create Admin", path: "/dashboard/admin/create-admin", icon: UserPlus },
    { key: "profile", label: "Profile", path: "/dashboard/admin/profile", icon: ShieldCheck }
  ]
};

export const initialAuthForm = { username: "", password: "", role: "PATIENT" };

export const initialPatientForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  dateOfBirth: "",
  gender: "",
  emergencyContact: "",
  medicalHistory: "",
  bloodGroup: "",
  allergies: ""
};

export const initialDoctorForm = {
  name: "",
  email: "",
  phone: "",
  specialization: "",
  location: "",
  availability: "",
  qualification: "",
  yearsOfExperience: "",
  consultationFee: "",
  about: "",
  specialties: ""
};

export const initialAdminForm = { name: "", emailId: "", phoneNumber: "" };
export const initialAppointmentForm = { doctorId: "", scheduledDateTime: "", type: "ONLINE" };

export const initialDoctorSearch = {
  name: "",
  specialization: "",
  location: "",
  minFee: "",
  maxFee: "",
  minRatings: "",
  experience: "",
  availability: ""
};

export const publicDoctorSearchInitial = {
  name: "",
  specialization: "",
  location: "",
  minFee: "",
  maxFee: "",
  experience: ""
};

export const featureCards = [
  {
    title: "Smart doctor discovery",
    text: "Search experienced specialists, compare profiles, and move directly into the right consultation flow."
  },
  {
    title: "Trusted care coordination",
    text: "Patients, doctors, and admins can manage appointments and approvals inside one healthcare workspace."
  },
  {
    title: "Continuous health records",
    text: "Keep prescriptions, reports, and visit documents organized across every stage of treatment."
  }
];

export function getDashboardHome(role) {
  if (role === "DOCTOR") return "/dashboard/doctor/overview";
  if (role === "ADMIN") return "/dashboard/admin/overview";
  return "/dashboard/patient/overview";
}
