import { useNavigate } from "react-router-dom";
import DoctorCard from "../../components/doctor/DoctorCard";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import InputField from "../../components/ui/InputField";
import SectionHeader from "../../components/ui/SectionHeader";
import { useDashboard } from "../../context/DashboardContext";

function DoctorSearch() {
  const navigate = useNavigate();
  const { doctorSearchForm, setDoctorSearchForm, doctorResults, searchDoctors, setAppointmentForm, loading } = useDashboard();

  return (
    <Card>
      <SectionHeader eyebrow="Discover Doctors" title="Search with better visual hierarchy" description="Filter by specialization, city, fee, rating, and availability, then jump straight into booking." />
      <form
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        onSubmit={(event) => {
          event.preventDefault();
          searchDoctors();
        }}
      >
        <InputField label="Name" value={doctorSearchForm.name} onChange={(e) => setDoctorSearchForm({ ...doctorSearchForm, name: e.target.value })} />
        <InputField label="Specialization" value={doctorSearchForm.specialization} onChange={(e) => setDoctorSearchForm({ ...doctorSearchForm, specialization: e.target.value })} />
        <InputField label="Location" value={doctorSearchForm.location} onChange={(e) => setDoctorSearchForm({ ...doctorSearchForm, location: e.target.value })} />
        <InputField label="Min Fee" type="number" value={doctorSearchForm.minFee} onChange={(e) => setDoctorSearchForm({ ...doctorSearchForm, minFee: e.target.value })} />
        <InputField label="Max Fee" type="number" value={doctorSearchForm.maxFee} onChange={(e) => setDoctorSearchForm({ ...doctorSearchForm, maxFee: e.target.value })} />
        <InputField label="Min Ratings" type="number" step="0.1" value={doctorSearchForm.minRatings} onChange={(e) => setDoctorSearchForm({ ...doctorSearchForm, minRatings: e.target.value })} />
        <InputField label="Experience" type="number" value={doctorSearchForm.experience} onChange={(e) => setDoctorSearchForm({ ...doctorSearchForm, experience: e.target.value })} />
        <InputField label="Availability" value={doctorSearchForm.availability} onChange={(e) => setDoctorSearchForm({ ...doctorSearchForm, availability: e.target.value })} />
        <div className="flex items-end">
          <Button className="w-full" loading={loading} type="submit">
            Search Doctors
          </Button>
        </div>
      </form>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {doctorResults.length ? (
          doctorResults.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              actionLabel="Book this doctor"
              onBook={() => {
                setAppointmentForm((current) => ({ ...current, doctorId: String(doctor.id) }));
                navigate("/dashboard/patient/book-appointment");
              }}
            />
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3">
            <EmptyState title="No doctors loaded yet" text="Run a search to see doctor cards here." />
          </div>
        )}
      </div>
    </Card>
  );
}

export default DoctorSearch;
