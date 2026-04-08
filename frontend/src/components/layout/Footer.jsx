function Footer({ light = false }) {
  const year = new Date().getFullYear();
  const textClass = light ? "text-slate-500" : "text-slate-400";
  const linkClass = light
    ? "text-slate-600 transition hover:text-cyan-700"
    : "text-slate-300 transition hover:text-white";
  const headingClass = light ? "text-slate-900" : "text-white";

  return (
    <footer className={`mt-10 border-t ${light ? "border-slate-200 pt-6" : "border-white/10 pt-6"}`}>
      <div className="grid gap-8 text-sm lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <p className={`text-base font-semibold ${headingClass}`}>Doctor At Home</p>
          <p className={`mt-3 leading-6 ${textClass}`}>
            Copyright {year} Doctor At Home. All rights reserved. Healthcare information on this platform is provided for operational use and does not replace emergency medical care.
          </p>
        </div>
        <div>
          <p className={`text-sm font-semibold ${headingClass}`}>Company</p>
          <div className="mt-3 grid gap-2">
            <a href="#" className={linkClass}>
              About Us
            </a>
            <a href="#" className={linkClass}>
              Contact
            </a>
            <a href="#" className={linkClass}>
              Support
            </a>
          </div>
        </div>
        <div>
          <p className={`text-sm font-semibold ${headingClass}`}>Legal</p>
          <div className="mt-3 grid gap-2">
            <a href="#" className={linkClass}>
              Privacy Policy
            </a>
            <a href="#" className={linkClass}>
              Terms of Service
            </a>
            <a href="#" className={linkClass}>
              Cookie Policy
            </a>
          </div>
        </div>
        <div>
          <p className={`text-sm font-semibold ${headingClass}`}>Compliance</p>
          <div className={`mt-3 grid gap-2 ${textClass}`}>
            <p>Secure healthcare workflows</p>
            <p>Protected patient records</p>
            <p>Operational use only</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
