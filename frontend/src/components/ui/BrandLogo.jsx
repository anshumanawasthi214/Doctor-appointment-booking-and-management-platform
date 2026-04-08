import { HeartPulse } from "lucide-react";
import { cn } from "../../utils/format";

function BrandLogo({ className = "", size = "md", tone = "light" }) {
  const isLarge = size === "lg";
  const isXLarge = size === "xl";
  const isDark = tone === "dark";

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl shadow-lg",
          isXLarge ? "h-20 w-20" : isLarge ? "h-16 w-16" : "h-11 w-11",
          isDark ? "bg-gradient-to-br from-cyan-600 to-emerald-500 text-white" : "bg-white/12 text-cyan-200 ring-1 ring-white/15 backdrop-blur"
        )}
      >
        <HeartPulse className={isXLarge ? "h-10 w-10" : isLarge ? "h-8 w-8" : "h-5 w-5"} />
      </div>
      <div>
        <p className={cn("font-semibold tracking-tight", isXLarge ? "text-4xl" : isLarge ? "text-3xl" : "text-lg", isDark ? "text-slate-900" : "text-white")}>
          Doctor At Home
        </p>
        <p className={cn("font-medium", isXLarge ? "text-base" : isLarge ? "text-sm" : "text-xs", isDark ? "text-slate-500" : "text-cyan-100/80")}>
          Trusted digital healthcare platform
        </p>
      </div>
    </div>
  );
}

export default BrandLogo;
