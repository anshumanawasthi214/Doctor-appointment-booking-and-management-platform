import { Star } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import SectionHeader from "../../components/ui/SectionHeader";
import StatCard from "../../components/ui/StatCard";
import { useDashboard } from "../../context/DashboardContext";
import { formatDate } from "../../utils/format";

function DoctorOverview() {
  const { doctorPending, doctorForm, doctorReviews, setDoctorAvailabilityStatus, loading } = useDashboard();
  const normalizedStatus = String(doctorForm.availabilityStatus || "").toUpperCase();
  const isOnline = normalizedStatus === "AVAILABLE" || normalizedStatus === "ACTIVE" || normalizedStatus === "YES";
  const statusLabel = isOnline ? "Online" : "Offline";
  const averageRating = Number(doctorForm.ratings || 0).toFixed(1);

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <SectionHeader eyebrow="Doctor Overview" title="Practice dashboard" description="See approvals, fee, experience, availability, and patient feedback in one command center." />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Pending Requests" value={doctorPending.length} detail="Awaiting response" />
            <StatCard label="Availability" value={statusLabel} detail="Current status" />
            <StatCard label="Experience" value={doctorForm.yearsOfExperience || 0} detail="Years in practice" />
            <StatCard label="Average Rating" value={`${averageRating}/5`} detail={`${doctorReviews.length} patient reviews`} />
          </div>
        </Card>

        <Card>
          <SectionHeader
            eyebrow="Doctor Spotlight"
            title={doctorForm.name ? `Dr. ${doctorForm.name}` : "Doctor profile pending"}
            description="Switch your live status so patients can see whether you are currently online or offline."
          />
          <div className="grid gap-3 text-sm text-slate-600">
            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-3 text-base font-semibold text-slate-900">
                <span className={`h-3.5 w-3.5 rounded-full ${isOnline ? "bg-emerald-500" : "bg-rose-500"}`} />
                Doctor is currently {statusLabel.toLowerCase()}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button loading={loading} type="button" onClick={() => setDoctorAvailabilityStatus("AVAILABLE")}>
                  Go Online
                </Button>
                <Button variant="danger" loading={loading} type="button" onClick={() => setDoctorAvailabilityStatus("UNAVAILABLE")}>
                  Go Offline
                </Button>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4">{doctorForm.specialization || "Specialization -"}</div>
              <div className="rounded-xl bg-slate-50 p-4">{doctorForm.location || "Location -"}</div>
              <div className="rounded-xl bg-slate-50 p-4">{doctorForm.qualification || "Qualification -"}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">{doctorForm.about || "Add your professional summary to improve your profile preview."}</div>
          </div>
        </Card>
      </div>

      <Card>
        <SectionHeader eyebrow="Patient Reviews" title="See what patients are saying" description="Ratings and reviews appear here after a completed consultation has been reviewed by the patient." />
        <div className="grid gap-4">
          {doctorReviews.length ? (
            doctorReviews.map((review) => (
              <div key={review.appointmentId} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{review.patientName || "Patient"}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Appointment #{review.appointmentId} • {formatDate(review.reviewedAt)}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                    <Star className="h-4 w-4 fill-current" />
                    {review.rating}/5
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{review.review?.trim() || "This patient left a rating without a written review."}</p>
              </div>
            ))
          ) : (
            <EmptyState title="No reviews yet" text="Once patients complete consultations and submit feedback, their reviews will appear here." />
          )}
        </div>
      </Card>
    </div>
  );
}

export default DoctorOverview;
