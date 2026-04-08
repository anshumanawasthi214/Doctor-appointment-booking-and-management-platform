import Card from "../../components/ui/Card";
import SectionHeader from "../../components/ui/SectionHeader";
import StatCard from "../../components/ui/StatCard";
import { useDashboard } from "../../context/DashboardContext";

function PatientOverview() {
  const { appointments, documents, history, doctorResults, patientForm, appointmentStatusCounts } = useDashboard();

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card>
        <SectionHeader eyebrow="Patient Command Center" title="Your care overview" description="Track bookings, records, and recent activity from one polished patient dashboard." />
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard label="Appointments" value={appointments.length} detail="Active bookings" />
          <StatCard label="Records" value={documents.length} detail="Uploaded files" />
          <StatCard label="History" value={history.length} detail="Past visits" />
          <StatCard label="Doctors" value={doctorResults.length} detail="Search results" />
        </div>
      </Card>

      <Card>
        <SectionHeader eyebrow="Patient Snapshot" title={patientForm.name || "Profile not completed"} description="Quick details stay visible while you search and book appointments." />
        <div className="grid gap-4 text-sm text-slate-600">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">Blood Group: {patientForm.bloodGroup || "-"}</div>
            <div className="rounded-xl bg-slate-50 p-4">Gender: {patientForm.gender || "-"}</div>
            <div className="rounded-xl bg-slate-50 p-4">Phone: {patientForm.phone || "-"}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">Email: {patientForm.email || "No email saved yet."}</div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">Accepted: {appointmentStatusCounts.ACCEPTED || 0}</div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">Pending: {appointmentStatusCounts.PENDING || 0}</div>
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-4">Cancelled: {appointmentStatusCounts.CANCELLED || 0}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PatientOverview;
