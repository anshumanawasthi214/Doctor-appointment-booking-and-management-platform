import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/format";

function SelectField({ label, error, className = "", children, ...props }) {
  return (
    <label className={cn("flex w-full flex-col gap-2", className)}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="relative">
        <select
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}

export default SelectField;
