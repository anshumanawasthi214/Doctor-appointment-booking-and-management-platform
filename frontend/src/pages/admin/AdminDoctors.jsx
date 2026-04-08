import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import SectionHeader from "../../components/ui/SectionHeader";
import { useDashboard } from "../../context/DashboardContext";

function AdminDoctors() {
  const { adminDoctors, updateDoctorStatus } = useDashboard();

  return (
    <Card>
      <SectionHeader eyebrow="Doctor Moderation" title="Doctor registration approvals" description="Review doctor submissions in a more readable approval layout." />
      <div className="grid gap-4">
        {adminDoctors.length ? (
          adminDoctors.map((doctor) => (
            <div key={doctor.id} className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center">
              <div>
                <p className="font-semibold text-slate-900">{doctor.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {doctor.email} • {doctor.specialization || "Specialization -"}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {doctor.yearsOfExperience || 0} yrs • {doctor.location || "-"} • Fee: {doctor.consultationFee || 0}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {doctor.status || doctor.availabilityStatus || "PENDING"}
                </span>
                <Button variant="secondary" type="button" onClick={() => updateDoctorStatus(doctor.id, "APPROVED")}>
                  Approve
                </Button>
                <Button variant="danger" type="button" onClick={() => updateDoctorStatus(doctor.id, "REJECTED")}>
                  Reject
                </Button>
              </div>
            </div>
          ))
        ) : (
          <EmptyState title="No doctor submissions" text="Doctor registrations waiting for review will appear here." />
        )}
      </div>
    </Card>
  );
}

export default AdminDoctors;
