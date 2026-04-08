import { cn } from "../../utils/format";

function InputField({ label, error, className = "", as = "input", ...props }) {
  const Component = as;

  return (
    <label className={cn("flex w-full flex-col gap-2", className)}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <Component
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100",
          as === "textarea" && "min-h-32 resize-y"
        )}
        {...props}
      />
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}

export default InputField;
