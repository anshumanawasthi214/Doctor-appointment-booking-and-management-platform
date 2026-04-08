import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import InputField from "../../components/ui/InputField";
import SectionHeader from "../../components/ui/SectionHeader";
import { useDashboard } from "../../context/DashboardContext";

function DoctorProfile() {
  const { doctorForm, setDoctorForm, saveDoctorProfile, loading } = useDashboard();

  return (
    <Card>
      <SectionHeader eyebrow="Doctor Form" title="Doctor registration and profile" description="A cleaner profile editor for availability, fees, specialties, and professional details." />
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          saveDoctorProfile();
        }}
      >
        <InputField label="Doctor Name" value={doctorForm.name} onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })} />
        <InputField label="Email" value={doctorForm.email} onChange={(e) => setDoctorForm({ ...doctorForm, email: e.target.value })} />
        <InputField label="Phone" value={doctorForm.phone} onChange={(e) => setDoctorForm({ ...doctorForm, phone: e.target.value })} />
        <InputField label="Specialization" value={doctorForm.specialization} onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })} />
        <InputField label="Experience (Years)" type="number" value={doctorForm.yearsOfExperience} onChange={(e) => setDoctorForm({ ...doctorForm, yearsOfExperience: e.target.value })} />
        <InputField label="Consultation Fee" type="number" value={doctorForm.consultationFee} onChange={(e) => setDoctorForm({ ...doctorForm, consultationFee: e.target.value })} />
        <InputField label="Location / City" value={doctorForm.location} onChange={(e) => setDoctorForm({ ...doctorForm, location: e.target.value })} />
        <InputField label="Availability" value={doctorForm.availability} onChange={(e) => setDoctorForm({ ...doctorForm, availability: e.target.value })} />
        <InputField label="Qualification" value={doctorForm.qualification} onChange={(e) => setDoctorForm({ ...doctorForm, qualification: e.target.value })} />
        <InputField label="Specialties" value={doctorForm.specialties} onChange={(e) => setDoctorForm({ ...doctorForm, specialties: e.target.value })} />
        <InputField as="textarea" className="md:col-span-2" label="About Doctor" rows="5" value={doctorForm.about} onChange={(e) => setDoctorForm({ ...doctorForm, about: e.target.value })} />
        <div className="md:col-span-2">
          <Button loading={loading} type="submit">
            Save Doctor Profile
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default DoctorProfile;
