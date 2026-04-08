import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import SectionHeader from "../../components/ui/SectionHeader";
import { useDashboard } from "../../context/DashboardContext";

function AdminPatients() {
  const { adminPatients } = useDashboard();

  return (
    <Card>
      <SectionHeader eyebrow="Patient Directory" title="Registered patient list" description="A simpler patient roster for the admin role." />
      <div className="grid gap-4">
        {adminPatients.length ? (
          adminPatients.map((patient) => (
            <div key={patient.id || patient.email || patient.phone} className="rounded-xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">{patient.name || "Unnamed patient"}</p>
              <p className="mt-1 text-sm text-slate-500">
                {patient.email || "No email"} • {patient.phone || "No phone"}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {patient.gender || "Gender -"} • {patient.bloodGroup || "Blood group -"} • {patient.address || "Address -"}
              </p>
            </div>
          ))
        ) : (
          <EmptyState title="No patients found" text="Patient accounts will appear here once loaded from the backend." />
        )}
      </div>
    </Card>
  );
}

export default AdminPatients;
