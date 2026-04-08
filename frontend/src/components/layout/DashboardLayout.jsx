import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatusBanner from "../ui/StatusBanner";
import { useDashboard } from "../../context/DashboardContext";

function DashboardLayout() {
  const location = useLocation();
  const { menuItems, roleMeta, session, status } = useDashboard();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentItem = useMemo(
    () => menuItems.find((item) => location.pathname.startsWith(item.path)) || menuItems[0],
    [location.pathname, menuItems]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        <Sidebar
          menuItems={menuItems}
          userName={session?.user?.username || "Care Portal"}
          roleLabel={roleMeta.label}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex flex-1 flex-col p-4 md:p-6 xl:px-8">
          <div className="flex-1">
            <Topbar
              title={currentItem?.label || "Dashboard"}
              description={`Manage your ${roleMeta.label.toLowerCase()} workflows from one professional healthcare dashboard.`}
              userName={session?.user?.username || "Care Portal"}
              onMenuOpen={() => setSidebarOpen(true)}
            />
            <StatusBanner tone={status.tone} message={status.message} />
            <Outlet />
          </div>
          <Footer light />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
