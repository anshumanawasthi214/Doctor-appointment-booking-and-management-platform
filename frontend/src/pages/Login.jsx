import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import InputField from "../components/ui/InputField";
import SectionHeader from "../components/ui/SectionHeader";
import SelectField from "../components/ui/SelectField";
import StatusBanner from "../components/ui/StatusBanner";
import { useAuth } from "../hooks/useAuth";
import { useApi } from "../hooks/useApi";
import { getFriendlyErrorMessage } from "../utils/format";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, login, initialAuthForm, roleOptions, getDashboardHome } = useAuth();
  const { loading, runRequest } = useApi();
  const [form, setForm] = useState(() => ({ ...initialAuthForm, role: location.state?.role || "PATIENT" }));
  const [status, setStatus] = useState({ tone: "info", message: "" });

  if (session?.user?.role) {
    return <Navigate to={getDashboardHome(session.user.role)} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = await runRequest(() => login(form));
      const nextPath =
        data?.user?.role === "PATIENT" && location.state?.doctorId ? "/dashboard/patient/book-appointment" : getDashboardHome(data?.user?.role);

      navigate(nextPath, {
        replace: true,
        state: location.state?.doctorId ? { doctorId: location.state.doctorId } : undefined
      });
    } catch (error) {
      setStatus({ tone: "error", message: getFriendlyErrorMessage(error) });
    }
  }

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-xl">
        <button
          className="mb-4 inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-800"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <Card className="rounded-[28px] border border-slate-200">
          <SectionHeader 
            eyebrow="Secure Login" 
            title="Login to your healthcare workspace" 
            description="Continue as a patient, doctor, or admin using the same authentication endpoint."
          />
          <StatusBanner tone={status.tone} message={status.message} />
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <SelectField label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {roleOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </SelectField>
            <InputField label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <InputField label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <div className="-mt-1 text-right">
              <Link className="text-sm font-medium text-cyan-700 hover:text-cyan-800" to="/forgot-password">
                Forgot password?
              </Link>
            </div>
            <Button className="w-full" loading={loading} type="submit">
              Continue
            </Button>
          </form>
          <p className="mt-6 text-sm text-slate-500">
            Need an account?{" "}
            <Link className="font-semibold text-cyan-700 hover:text-cyan-800" to="/register">
              Register here
            </Link>
          </p>
        </Card>
      </div>
    </AuthLayout>
  );
}

export default Login;
