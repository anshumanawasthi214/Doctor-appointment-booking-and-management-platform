import { Inbox } from "lucide-react";
import Card from "./Card";

function EmptyState({ title, text }) {
  return (
    <Card className="flex flex-col items-center justify-center border border-dashed border-slate-200 text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-3">
        <Inbox className="h-5 w-5 text-slate-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500">{text}</p>
    </Card>
  );
}

export default EmptyState;
