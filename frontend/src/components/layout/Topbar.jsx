import { ArrowLeft, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../ui/BrandLogo";
import { getInitials } from "../../utils/format";

function Topbar({ title, description, userName, onMenuOpen }) {
  const navigate = useNavigate();

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  return (
    <header className="mb-6 flex items-center justify-between gap-4 rounded-xl bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" onClick={onMenuOpen} type="button">
          <Menu className="h-5 w-5" />
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          onClick={handleBack}
          type="button"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <BrandLogo className="hidden lg:inline-flex [&>div:first-child]:h-10 [&>div:first-child]:w-10 [&>div:last-child>p:first-child]:text-base [&>div:last-child>p:last-child]:text-[11px]" tone="dark" />
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900">{userName}</p>
          <p className="text-xs text-slate-500">Healthcare workspace</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          {getInitials(userName)}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
