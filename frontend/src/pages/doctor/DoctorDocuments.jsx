import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import SectionHeader from "../../components/ui/SectionHeader";
import { useDashboard } from "../../context/DashboardContext";
import { formatDate, toTitleCase } from "../../utils/format";
import Button from "../../components/ui/Button";

function DoctorDocuments() {
  const { doctorAcceptedCases, downloadDoctorDocument, loading } = useDashboard();

  return (
    <div className="grid gap-6">
      <Card>
        <SectionHeader
          eyebrow="Accepted Patients"
          title="Review patient details and documents"
          description="Once an appointment is accepted, the patient information and uploaded records appear here for the doctor."
        />

        <div className="grid gap-4">
          {doctorAcceptedCases.length ? (
            doctorAcceptedCases.map((caseItem) => (
              <div key={caseItem.appointmentId} className="rounded-xl border border-slate-200 p-5">
                <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{caseItem.patientName || "Patient"}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Appointment #{caseItem.appointmentId} • {formatDate(caseItem.scheduledDateTime)} • {toTitleCase(caseItem.type)}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{caseItem.status || "ACCEPTED"}</span>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-xl bg-slate-50 p-4">Email: {caseItem.patientEmail || "-"}</div>
                  <div className="rounded-xl bg-slate-50 p-4">Phone: {caseItem.patientPhone || "-"}</div>
                  <div className="rounded-xl bg-slate-50 p-4">Blood Group: {caseItem.bloodGroup || "-"}</div>
                  <div className="rounded-xl bg-slate-50 p-4">Gender: {caseItem.gender || "-"}</div>
                  <div className="rounded-xl bg-slate-50 p-4">Emergency Contact: {caseItem.emergencyContact || "-"}</div>
                  <div className="rounded-xl bg-slate-50 p-4">Address: {caseItem.patientAddress || "-"}</div>
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="font-medium text-slate-900">Medical History</p>
                  <p className="mt-2">{caseItem.medicalHistory || "No medical history shared yet."}</p>
                  {caseItem.allergies ? <p className="mt-3">Allergies: {caseItem.allergies}</p> : null}
                  {caseItem.notes ? <p className="mt-3">Appointment Notes: {caseItem.notes}</p> : null}
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-slate-900">Patient Documents</p>
                  <div className="mt-3 grid gap-3">
                    {caseItem.documents?.length ? (
                      caseItem.documents.map((document) => (
                        <div key={document.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="font-medium text-slate-900">{document.fileName}</p>
                            <p className="mt-1 text-sm text-slate-500">
                              {document.fileType} • Uploaded {formatDate(document.uploadDate)}
                            </p>
                          </div>
                          <Button
                            variant="secondary"
                            type="button"
                            loading={loading}
                            onClick={() => downloadDoctorDocument(caseItem.appointmentId, document.id, document.fileName)}
                          >
                            Download
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                        This patient has not uploaded any documents yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyState title="No accepted patient requests yet" text="Accepted appointments will appear here with patient details and uploaded documents." />
          )}
        </div>
      </Card>
    </div>
  );
}

export default DoctorDocuments;
