import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import InputField from "../../components/ui/InputField";
import SectionHeader from "../../components/ui/SectionHeader";
import SelectField from "../../components/ui/SelectField";
import { useDashboard } from "../../context/DashboardContext";

function BookAppointment() {
  const location = useLocation();
  const { appointmentForm, setAppointmentForm, appointments, selectedAppointmentId, setSelectedAppointmentId, bookAppointment, updateAppointment, loading } =
    useDashboard();

  useEffect(() => {
    if (location.state?.doctorId) {
      setAppointmentForm((current) => ({ ...current, doctorId: String(location.state.doctorId) }));
    }
  }, [location.state?.doctorId]);

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card>
        <SectionHeader eyebrow="Booking Form" title="Schedule your appointment" description="Pick a doctor, time, and consultation type from a cleaner booking panel." />
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            bookAppointment();
          }}
        >
          <InputField label="Doctor ID" type="number" value={appointmentForm.doctorId} onChange={(e) => setAppointmentForm({ ...appointmentForm, doctorId: e.target.value })} />
          <InputField label="Schedule Date & Time" type="datetime-local" value={appointmentForm.scheduledDateTime} onChange={(e) => setAppointmentForm({ ...appointmentForm, scheduledDateTime: e.target.value })} />
          <SelectField label="Consultation Type" value={appointmentForm.type} onChange={(e) => setAppointmentForm({ ...appointmentForm, type: e.target.value })}>
            <option value="ONLINE">Online Consultation</option>
            <option value="HOME_VISIT">Home Visit</option>
            <option value="CLINIC">Clinic Visit</option>
          </SelectField>
          <Button className="w-full sm:w-auto" loading={loading} type="submit">
            Book Appointment
          </Button>
        </form>
      </Card>

      <Card>
        <SectionHeader eyebrow="Appointment Update" title="Reuse an existing booking" description="Select a saved appointment and push an update with the values from the form." />
        <div className="grid gap-4">
          <SelectField label="Appointment" value={selectedAppointmentId} onChange={(e) => setSelectedAppointmentId(e.target.value)}>
            <option value="">Select appointment</option>
            {appointments.map((appointment) => (
              <option key={appointment.appointmentId} value={appointment.appointmentId}>
                #{appointment.appointmentId} - {appointment.type}
              </option>
            ))}
          </SelectField>
          <Button variant="secondary" loading={loading} type="button" onClick={updateAppointment}>
            Update Selected Appointment
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default BookAppointment;
