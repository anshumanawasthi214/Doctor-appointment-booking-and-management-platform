import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import SectionHeader from "../../components/ui/SectionHeader";
import { useDashboard } from "../../context/DashboardContext";
import { formatDate } from "../../utils/format";

function Documents() {
  const { documents, documentFiles, setDocumentFiles, uploadDocument, updateDocument, deleteDocument, loading, hasPatientProfile } = useDashboard();

  return (
    <div className="grid gap-6">
      <Card>
        <SectionHeader eyebrow="Upload Records" title="Maintain patient documents" description="Upload and replace reports in a cleaner records workspace." />
        {!hasPatientProfile ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Complete your patient profile first. Document uploads are linked to your saved patient record.
          </div>
        ) : null}
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const file = formData.get("file");
            uploadDocument(file instanceof File ? file : null, () => event.currentTarget.reset());
          }}
        >
          <input className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm" name="file" type="file" disabled={!hasPatientProfile} />
          <Button className="w-full sm:w-auto" loading={loading} type="submit" disabled={!hasPatientProfile}>
            Upload Record
          </Button>
        </form>
      </Card>

      <Card>
        <SectionHeader eyebrow="Saved Files" title="Medical records list" description="Update or remove uploaded files without leaving the dashboard." />
        <div className="grid gap-4">
          {documents.length ? (
            documents.map((document) => (
              <div key={document.id} className="grid gap-4 rounded-xl border border-slate-200 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="font-semibold text-slate-900">{document.fileName}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {document.fileType} • {formatDate(document.uploadDate)}
                  </p>
                </div>
                <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
                  <input className="rounded-xl border border-slate-200 p-3 text-sm" type="file" onChange={(event) => setDocumentFiles((current) => ({ ...current, [document.id]: event.target.files?.[0] || null }))} />
                  <Button variant="secondary" type="button" onClick={() => updateDocument(document.id, documentFiles[document.id])}>
                    Update
                  </Button>
                  <Button variant="danger" type="button" onClick={() => deleteDocument(document.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState title="No records yet" text="Uploaded reports will appear here." />
          )}
        </div>
      </Card>
    </div>
  );
}

export default Documents;
