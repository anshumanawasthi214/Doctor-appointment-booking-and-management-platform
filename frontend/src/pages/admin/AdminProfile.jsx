import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import InputField from "../../components/ui/InputField";
import SectionHeader from "../../components/ui/SectionHeader";
import { useDashboard } from "../../context/DashboardContext";

function AdminProfile() {
  const { adminForm, setAdminForm, saveAdminProfile, loading } = useDashboard();

  return (
    <Card>
      <SectionHeader eyebrow="Admin Form" title="Admin profile details" description="Update the platform admin profile without changing your backend integration." />
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          saveAdminProfile();
        }}
      >
        <InputField label="Name" value={adminForm.name} onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })} />
        <InputField label="Email" value={adminForm.emailId} onChange={(e) => setAdminForm({ ...adminForm, emailId: e.target.value })} />
        <InputField className="md:col-span-2" label="Phone Number" value={adminForm.phoneNumber} onChange={(e) => setAdminForm({ ...adminForm, phoneNumber: e.target.value })} />
        <div className="md:col-span-2">
          <Button loading={loading} type="submit">
            Save Admin Profile
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default AdminProfile;
