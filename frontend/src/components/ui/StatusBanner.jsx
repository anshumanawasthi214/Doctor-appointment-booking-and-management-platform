import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "../../utils/format";

const tones = {
  info: { icon: Info, className: "border-cyan-200 bg-cyan-50 text-cyan-800" },
  success: { icon: CheckCircle2, className: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  error: { icon: AlertCircle, className: "border-rose-200 bg-rose-50 text-rose-800" }
};

function StatusBanner({ tone = "info", message }) {
  if (!message) return null;

  const config = tones[tone] || tones.info;
  const Icon = config.icon;

  return (
    <div className={cn("mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-sm", config.className)}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}

export default StatusBanner;
