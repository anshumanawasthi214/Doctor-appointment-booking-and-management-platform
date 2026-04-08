import { BriefcaseMedical, IndianRupee, MapPin, Star } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { formatCurrency } from "../../utils/format";

function getDoctorPresence(status) {
  const normalized = String(status || "").toUpperCase();
  const isOnline = normalized === "AVAILABLE" || normalized === "ACTIVE" || normalized === "YES";

  return {
    isOnline,
    label: isOnline ? "Online now" : "Offline",
    className: isOnline ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700",
    dotClassName: isOnline ? "bg-emerald-500" : "bg-rose-500"
  };
}

function DoctorCard({ doctor, onBook, actionLabel = "Book consultation" }) {
  const presence = getDoctorPresence(doctor.availabilityStatus);

  return (
    <Card className="flex h-full flex-col gap-4 border border-slate-100">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Dr. {doctor.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{doctor.specialization || "General Practice"}</p>
        </div>
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${presence.className}`}>
          <span className={`h-2.5 w-2.5 rounded-full ${presence.dotClassName}`} />
          {presence.label}
        </span>
      </div>

      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-cyan-600" />
          <span>{doctor.location || "Location not shared yet"}</span>
        </div>
        <div className="flex items-center gap-2">
          <BriefcaseMedical className="h-4 w-4 text-cyan-600" />
          <span>{doctor.yearsOfExperience || 0} years experience</span>
        </div>
        <div className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4 text-cyan-600" />
          <span>{formatCurrency(doctor.consultationFee || 0)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-cyan-600" />
          <span>{doctor.ratings || 0} patient rating</span>
        </div>
      </div>

      <Button className="mt-auto w-full" type="button" onClick={() => onBook(doctor)}>
        {actionLabel}
      </Button>
    </Card>
  );
}

export default DoctorCard;
