import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import InputField from "../../components/ui/InputField";
import SectionHeader from "../../components/ui/SectionHeader";
import SelectField from "../../components/ui/SelectField";
import { useDashboard } from "../../context/DashboardContext";
import { formatDate, toTitleCase } from "../../utils/format";

const initialReviewDraft = { rating: "5", review: "" };

function PatientAppointments() {
  const { appointments, history, deleteAppointment, submitAppointmentReview, loading } = useDashboard();
  const [reviewDrafts, setReviewDrafts] = useState({});

  function getReviewDraft(appointmentId) {
    return reviewDrafts[appointmentId] || initialReviewDraft;
  }

  function updateReviewDraft(appointmentId, nextValues) {
    setReviewDrafts((current) => ({
      ...current,
      [appointmentId]: {
        ...getReviewDraft(appointmentId),
        ...nextValues
      }
    }));
  }

  async function handleReviewSubmit(appointmentId) {
    const draft = getReviewDraft(appointmentId);
    const data = await submitAppointmentReview(appointmentId, {
      rating: Number(draft.rating),
      review: draft.review
    });

    if (data) {
      setReviewDrafts((current) => {
        const nextDrafts = { ...current };
        delete nextDrafts[appointmentId];
        return nextDrafts;
      });
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <SectionHeader eyebrow="Live Appointments" title="Manage upcoming visits" description="See current bookings in a card-based list that reads better on desktop and mobile." />
        <div className="grid gap-4">
          {appointments.length ? (
            appointments.map((appointment) => (
              <div key={appointment.appointmentId} className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center">
                <div>
                  <p className="font-semibold text-slate-900">
                    #{appointment.appointmentId} • {appointment.patientName || "Patient"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatDate(appointment.scheduledDateTime)} • {toTitleCase(appointment.type)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{appointment.status || "PENDING"}</span>
                  <Button variant="ghost" type="button" onClick={() => deleteAppointment(appointment.appointmentId)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState title="No active appointments" text="Book an appointment to see it appear here." />
          )}
        </div>
      </Card>

      <Card>
        <SectionHeader eyebrow="History" title="Previous appointment activity" description="A compact timeline-style history panel for past consultations." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {history.length ? (
            history.map((appointment) => (
              <div key={appointment.appointmentId} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{toTitleCase(appointment.type)}</p>
                    <p className="mt-2 text-sm text-slate-500">{formatDate(appointment.scheduledDateTime)}</p>
                  </div>
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{appointment.status || "PENDING"}</span>
                </div>

                {appointment.patientRating ? (
                  <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <p className="text-sm font-semibold text-emerald-900">Your review</p>
                    <p className="mt-2 text-sm text-emerald-800">Rating: {appointment.patientRating}/5</p>
                    <p className="mt-2 text-sm text-emerald-700">
                      {appointment.patientReview?.trim() || "You submitted a rating without a written review."}
                    </p>
                  </div>
                ) : appointment.status === "COMPLETED" ? (
                  <div className="mt-4 rounded-xl border border-cyan-100 bg-cyan-50 p-4">
                    <p className="text-sm font-semibold text-cyan-900">Rate this consultation</p>
                    <div className="mt-4 grid gap-4">
                      <SelectField
                        label="Rating"
                        value={getReviewDraft(appointment.appointmentId).rating}
                        onChange={(event) => updateReviewDraft(appointment.appointmentId, { rating: event.target.value })}
                      >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="1">1 - Poor</option>
                      </SelectField>
                      <InputField
                        as="textarea"
                        rows={4}
                        label="Review"
                        placeholder="Share how the consultation went and how the doctor helped you."
                        value={getReviewDraft(appointment.appointmentId).review}
                        onChange={(event) => updateReviewDraft(appointment.appointmentId, { review: event.target.value })}
                      />
                      <Button loading={loading} type="button" onClick={() => handleReviewSubmit(appointment.appointmentId)}>
                        Submit Review
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className="md:col-span-2 xl:col-span-3">
              <EmptyState title="History is empty" text="Your completed or previous appointments will be listed here." />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default PatientAppointments;
