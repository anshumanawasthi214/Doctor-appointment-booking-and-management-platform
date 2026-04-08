import { ArrowRight, CalendarHeart, HeartPulse, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";
import DoctorCard from "../components/doctor/DoctorCard";
import AuthLayout from "../components/layout/AuthLayout";
import BrandLogo from "../components/ui/BrandLogo";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import InputField from "../components/ui/InputField";
import SectionHeader from "../components/ui/SectionHeader";
import { featureCards, publicDoctorSearchInitial } from "../config/dashboard";
import { useApi } from "../hooks/useApi";
import { getFriendlyErrorMessage } from "../utils/format";

const medicalSlides = [
  {
    image: "https://images.pexels.com/photos/6010873/pexels-photo-6010873.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Compassionate doctor consultations",
    text: "Browse verified specialists and move from discovery to booking in one calm care experience."
  },
  {
    image: "https://images.pexels.com/photos/7089619/pexels-photo-7089619.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Clear treatment coordination",
    text: "Appointments, documents, and approvals stay organized across patients, doctors, and admins."
  },
  {
    image: "https://images.pexels.com/photos/6129655/pexels-photo-6129655.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Trusted care from anywhere",
    text: "Support home care, online consultations, and clinic visits through one modern healthcare platform."
  },
  {
    image: "https://images.pexels.com/photos/8376230/pexels-photo-8376230.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Specialist teams working together",
    text: "Coordinate treatment decisions through one connected care system built for modern healthcare teams."
  },
  {
    image: "https://images.pexels.com/photos/7580251/pexels-photo-7580251.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Patient-first digital support",
    text: "Give patients a smoother experience from registration and doctor discovery to records and follow-up care."
  },
  {
    image: "https://images.pexels.com/photos/4266943/pexels-photo-4266943.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Smarter digital consultations",
    text: "Connect clinical guidance, patient discussion, and digital records through one modern healthcare journey."
  }
];

const careHighlights = [
  { label: "Verified Specialists", value: "Search with confidence", icon: Stethoscope },
  { label: "Fast Booking", value: "Move from search to visit", icon: CalendarHeart },
  { label: "Care Continuity", value: "Records that stay connected", icon: HeartPulse }
];

function Home() {
  const navigate = useNavigate();
  const { loading, runRequest } = useApi();
  const [searchForm, setSearchForm] = useState(publicDoctorSearchInitial);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % medicalSlides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  async function handleSearch(event) {
    event.preventDefault();

    try {
      const data = await runRequest(() => apiRequest("/api/doctors/search", { query: searchForm }));
      setResults(data || []);
      setMessage(data?.length ? "Doctors matching your search are now visible below." : "");
    } catch (error) {
      setMessage(getFriendlyErrorMessage(error));
    }
  }

  return (
    <AuthLayout>
      <div className="grid gap-10 xl:gap-12">
        <section className="relative overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_30%),linear-gradient(135deg,#082f49_0%,#0f172a_45%,#052e2b_100%)] px-6 py-10 text-white shadow-2xl lg:px-12 xl:px-14">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_60%)] lg:block" />
          <div className="relative grid gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:items-center">
            <div>
              <BrandLogo className="mb-6" size="xl" />
              <p className="mb-5 max-w-2xl text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                Digital Care That Feels Human
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl xl:text-6xl">
                Search trusted doctors and manage care through one professional healthcare dashboard.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200">
                Discover specialists, compare experience and fees, then move into secure patient, doctor, or admin workflows without changing the backend integration.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={() => document.getElementById("doctor-search")?.scrollIntoView({ behavior: "smooth" })}>
                  Search Doctors
                </Button>
                <Button variant="secondary" onClick={() => navigate("/register")}>
                  Create Account
                </Button>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {careHighlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
                      <Icon className="h-5 w-5 text-cyan-300" />
                      <p className="mt-4 text-sm font-semibold text-white">{item.label}</p>
                      <p className="mt-2 text-sm text-slate-300">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/30 p-3 shadow-2xl backdrop-blur">
                <div className="relative h-[320px] overflow-hidden rounded-[22px] sm:h-[420px] xl:h-[500px]">
                  {medicalSlides.map((slide, index) => (
                    <div
                      key={slide.image}
                      className={`absolute inset-0 transition-all duration-700 ${
                        index === activeSlide ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                      }`}
                    >
                      <img className="h-full w-full object-cover" src={slide.image} alt={slide.title} />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-6">
                        <p className="text-xl font-semibold text-white">{slide.title}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-200">{slide.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="flex gap-2">
                    {medicalSlides.map((slide, index) => (
                      <button
                        key={slide.title}
                        type="button"
                        aria-label={`Show slide ${index + 1}`}
                        onClick={() => setActiveSlide(index)}
                        className={`h-2.5 rounded-full transition-all ${index === activeSlide ? "w-8 bg-cyan-400" : "w-2.5 bg-white/35"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300">
                    {activeSlide + 1} / {medicalSlides.length}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border border-emerald-200/60 bg-emerald-50/95 shadow-lg">
                  <Users className="h-6 w-6 text-emerald-600" />
                  <p className="mt-4 text-lg font-semibold text-slate-900">Unified Roles</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Patients, doctors, and admins move through one consistent healthcare system.</p>
                </Card>
                <Card className="border border-cyan-200/60 bg-cyan-50/95 shadow-lg">
                  <ShieldCheck className="h-6 w-6 text-cyan-700" />
                  <p className="mt-4 text-lg font-semibold text-slate-900">Document Ready</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Appointments and medical records stay connected across every stage of care.</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <Card key={feature.title} className="border border-slate-100 bg-white/95 shadow-lg">
              <h2 className="text-lg font-semibold text-slate-900">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">{feature.text}</p>
            </Card>
          ))}
        </section>

        <section id="doctor-search">
          <Card>
            <SectionHeader
              eyebrow="Search Doctors"
              title="Find the right doctor before you sign in"
              description="Use the existing search API with cleaner filters and responsive doctor cards."
              action={
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Login <ArrowRight className="h-4 w-4" />
                </Button>
              }
            />

            <form className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" onSubmit={handleSearch}>
              <InputField label="Doctor Name" value={searchForm.name} onChange={(e) => setSearchForm({ ...searchForm, name: e.target.value })} />
              <InputField label="Specialization" value={searchForm.specialization} onChange={(e) => setSearchForm({ ...searchForm, specialization: e.target.value })} />
              <InputField label="Location" value={searchForm.location} onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })} />
              <InputField label="Minimum Fee" type="number" value={searchForm.minFee} onChange={(e) => setSearchForm({ ...searchForm, minFee: e.target.value })} />
              <InputField label="Maximum Fee" type="number" value={searchForm.maxFee} onChange={(e) => setSearchForm({ ...searchForm, maxFee: e.target.value })} />
              <InputField label="Minimum Experience" type="number" value={searchForm.experience} onChange={(e) => setSearchForm({ ...searchForm, experience: e.target.value })} />
              <div className="md:col-span-2 xl:col-span-3">
                <Button className="w-full sm:w-auto" loading={loading} type="submit">
                  Search available doctors
                </Button>
              </div>
            </form>

            {message ? <p className="mt-4 text-sm text-slate-500">{message}</p> : null}

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.length ? (
                results.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    actionLabel="Book after sign in"
                    onBook={() => navigate("/login", { state: { doctorId: doctor.id, role: "PATIENT" } })}
                  />
                ))
              ) : (
                <div className="md:col-span-2 xl:col-span-3">
                  <EmptyState
                    title="Search doctors by your healthcare needs"
                    text="Use the filters above to explore specialists before signing in. Booking becomes available once you log in as a patient."
                  />
                </div>
              )}
            </div>
          </Card>
        </section>
      </div>
    </AuthLayout>
  );
}

export default Home;
