import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import InputField from "../../components/ui/InputField";
import SectionHeader from "../../components/ui/SectionHeader";
import { useDashboard } from "../../context/DashboardContext";

function AdminCreate() {
  const { createManagedAdmin, loading } = useDashboard();
  const [newAdminForm, setNewAdminForm] = useState({
    name: "",
    emailId: "",
    phoneNumber: "",
    username: "",
    password: ""
  });

  return (
    <Card>
      <SectionHeader
        eyebrow="Create Admin"
        title="Add a new admin account"
        description="Create separate admin users directly from the admin workspace."
      />
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={async (event) => {
          event.preventDefault();
          const created = await createManagedAdmin(newAdminForm);
          if (created) {
            setNewAdminForm({
              name: "",
              emailId: "",
              phoneNumber: "",
              username: "",
              password: ""
            });
          }
        }}
      >
        <InputField label="Name" value={newAdminForm.name} onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })} />
        <InputField label="Email" value={newAdminForm.emailId} onChange={(e) => setNewAdminForm({ ...newAdminForm, emailId: e.target.value })} />
        <InputField label="Phone Number" value={newAdminForm.phoneNumber} onChange={(e) => setNewAdminForm({ ...newAdminForm, phoneNumber: e.target.value })} />
        <InputField label="Username" value={newAdminForm.username} onChange={(e) => setNewAdminForm({ ...newAdminForm, username: e.target.value })} />
        <InputField
          className="md:col-span-2"
          label="Password"
          type="password"
          value={newAdminForm.password}
          onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
        />
        <div className="md:col-span-2">
          <Button loading={loading} type="submit">
            Create New Admin
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default AdminCreate;
