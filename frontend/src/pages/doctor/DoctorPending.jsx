import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import SectionHeader from "../../components/ui/SectionHeader";
import { useDashboard } from "../../context/DashboardContext";
import { formatDate, toTitleCase } from "../../utils/format";

function DoctorPending() {
  const { doctorPending, respondToAppointment } = useDashboard();

  return (
    <Card>
      <SectionHeader eyebrow="Approval Queue" title="Incoming appointment approvals" description="Approve or reject patient requests in a clearer review list." />
      <div className="grid gap-4">
        {doctorPending.length ? (
          doctorPending.map((appointment) => (
            <div key={appointment.appointmentId} className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center">
              <div>
                <p className="font-semibold text-slate-900">{appointment.patientName || "Patient"}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {formatDate(appointment.scheduledDateTime)} • {toTitleCase(appointment.type)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">{appointment.status || "PENDING"}</span>
                <Button variant="secondary" type="button" onClick={() => respondToAppointment(appointment.appointmentId, "ACCEPTED")}>
                  Approve
                </Button>
                <Button variant="danger" type="button" onClick={() => respondToAppointment(appointment.appointmentId, "REJECTED")}>
                  Reject
                </Button>
              </div>
            </div>
          ))
        ) : (
          <EmptyState title="No pending approvals" text="New appointment requests will be listed here." />
        )}
      </div>
    </Card>
  );
}

export default DoctorPending;
