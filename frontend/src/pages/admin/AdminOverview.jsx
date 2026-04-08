import Card from "../../components/ui/Card";
import SectionHeader from "../../components/ui/SectionHeader";
import StatCard from "../../components/ui/StatCard";
import { useDashboard } from "../../context/DashboardContext";

function AdminOverview() {
  const { adminOverviewStats } = useDashboard();

  return (
    <Card>
      <SectionHeader eyebrow="Admin Overview" title="Platform health at a glance" description="Track doctor approvals and patient volume with clearer summary cards." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Patients" value={adminOverviewStats.patients} detail="Registered patients" />
        <StatCard label="Total Doctors" value={adminOverviewStats.doctors} detail="Doctor accounts" />
        <StatCard label="Pending Approval" value={adminOverviewStats.pendingDoctors} detail="Needs review" />
        <StatCard label="Approved Doctors" value={adminOverviewStats.approvedDoctors} detail="Live on platform" />
      </div>
    </Card>
  );
}

export default AdminOverview;
