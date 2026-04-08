import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import BrandLogo from "../ui/BrandLogo";
import Footer from "./Footer";

function AuthLayout({ children }) {
  const location = useLocation();
  const showHomeButton = location.pathname !== "/";

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[96rem] flex-col px-4 py-10 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <BrandLogo />
          {showHomeButton ? (
            <Link
              to="/"
              aria-label="Go to Home"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/25 bg-white/10 text-cyan-100 shadow-lg backdrop-blur transition hover:border-cyan-200/40 hover:bg-white/16"
            >
              <Home className="h-5 w-5" />
            </Link>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col justify-center">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AuthLayout;
