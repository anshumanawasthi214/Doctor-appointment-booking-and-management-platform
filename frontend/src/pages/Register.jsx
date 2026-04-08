import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function Register() {
  const navigate = useNavigate();
  const { register, initialAuthForm, roleOptions } = useAuth();
  const { loading, runRequest } = useApi();
  const [form, setForm] = useState(initialAuthForm);
  const [status, setStatus] = useState({ tone: "info", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await runRequest(() => register(form));
      navigate("/login", {
        replace: true,
        state: { role: form.role }
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
            eyebrow="Create Account"
            title="Register your Doctor At Home access"
            description="Keep the existing role-based registration endpoints while moving into a cleaner account setup flow."
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
            <Button className="w-full" loading={loading} type="submit">
              Create Account
            </Button>
          </form>
          <p className="mt-6 text-sm text-slate-500">
            Already have an account?{" "}
            <Link className="font-semibold text-cyan-700 hover:text-cyan-800" to="/login">
              Login here
            </Link>
          </p>
        </Card>
      </div>
    </AuthLayout>
  );
}

export default Register;
