import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import InputField from "../../components/ui/InputField";
import SectionHeader from "../../components/ui/SectionHeader";
import { useDashboard } from "../../context/DashboardContext";

function PatientProfile() {
  const { patientForm, setPatientForm, savePatientProfile, loading } = useDashboard();

  return (
    <Card>
      <SectionHeader eyebrow="Patient Form" title="Complete your patient profile" description="A cleaner two-column medical form with the same save flow you already have." />
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          savePatientProfile();
        }}
      >
        <InputField label="Patient Name" value={patientForm.name} onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })} />
        <InputField label="Email" value={patientForm.email} onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })} />
        <InputField label="Phone" value={patientForm.phone} onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })} />
        <InputField label="Emergency Contact" value={patientForm.emergencyContact} onChange={(e) => setPatientForm({ ...patientForm, emergencyContact: e.target.value })} />
        <InputField label="Date of Birth" type="date" value={patientForm.dateOfBirth} onChange={(e) => setPatientForm({ ...patientForm, dateOfBirth: e.target.value })} />
        <InputField label="Gender" value={patientForm.gender} onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })} />
        <InputField label="Blood Group" value={patientForm.bloodGroup} onChange={(e) => setPatientForm({ ...patientForm, bloodGroup: e.target.value })} />
        <InputField label="Allergies" value={patientForm.allergies} onChange={(e) => setPatientForm({ ...patientForm, allergies: e.target.value })} />
        <InputField className="md:col-span-2" label="Address" value={patientForm.address} onChange={(e) => setPatientForm({ ...patientForm, address: e.target.value })} />
        <InputField as="textarea" className="md:col-span-2" label="Medical History" rows="5" value={patientForm.medicalHistory} onChange={(e) => setPatientForm({ ...patientForm, medicalHistory: e.target.value })} />
        <div className="md:col-span-2">
          <Button loading={loading} type="submit">
            Save Patient Profile
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default PatientProfile;
