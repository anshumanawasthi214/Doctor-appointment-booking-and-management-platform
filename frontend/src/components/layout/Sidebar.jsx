import { Home, LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import BrandLogo from "../ui/BrandLogo";
import { getInitials } from "../../utils/format";

function Sidebar({ menuItems, userName, roleLabel, open, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/50 transition md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-900 text-white transition-transform md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div className="grid gap-2">
            <BrandLogo className="[&>div:last-child>p:first-child]:text-base [&>div:last-child>p:last-child]:text-[11px]" />
            <p className="text-sm text-slate-400">{roleLabel} workspace</p>
          </div>
          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 md:hidden" onClick={onClose} type="button">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-slate-800 px-6 py-5">
          <div className="flex items-center gap-3 rounded-xl bg-slate-800/70 p-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-600 font-semibold">
              {getInitials(userName)}
            </div>
            <div>
              <p className="font-medium">{userName}</p>
              <p className="text-sm text-slate-400">{roleLabel}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive ? "bg-cyan-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </NavLink>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? "bg-cyan-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            type="button"
            onClick={async () => { await logout(); navigate('/'); }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
