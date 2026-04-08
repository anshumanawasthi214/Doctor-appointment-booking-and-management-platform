import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import InputField from "../components/ui/InputField";
import SectionHeader from "../components/ui/SectionHeader";
import StatusBanner from "../components/ui/StatusBanner";
import { useAuth } from "../hooks/useAuth";
import { useApi } from "../hooks/useApi";
import { getFriendlyErrorMessage } from "../utils/format";

function ForgotPassword() {
  const navigate = useNavigate();
  const { session, getDashboardHome } = useAuth();
  const { loading, runRequest } = useApi();
  const [form, setForm] = useState({ username: "", newPassword: "", confirmPassword: "" });
  const [status, setStatus] = useState({ tone: "info", message: "" });

  if (session?.user?.role) {
    return <Navigate to={getDashboardHome(session.user.role)} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setStatus({ tone: "error", message: "The new password and confirm password fields do not match." });
      return;
    }

    try {
      const message = await runRequest(() =>
        apiRequest("/user/forgot-password", {
          method: "POST",
          body: { username: form.username, newPassword: form.newPassword }
        })
      );

      setStatus({ tone: "success", message: String(message || "Your password has been reset successfully.") });
      setForm({ username: "", newPassword: "", confirmPassword: "" });
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
            eyebrow="Forgot Password"
            title="Reset your account password"
            description="Enter your username and choose a new password to regain access."
          />
          <StatusBanner tone={status.tone} message={status.message} />
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <InputField label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <InputField label="New Password" type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
            <InputField
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            />
            <Button className="w-full" loading={loading} type="submit">
              Reset Password
            </Button>
          </form>
          <p className="mt-6 text-sm text-slate-500">
            Remembered it?{" "}
            <Link className="font-semibold text-cyan-700 hover:text-cyan-800" to="/login">
              Back to login
            </Link>
          </p>
        </Card>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
