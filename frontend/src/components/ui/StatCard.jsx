import Card from "./Card";

function StatCard({ label, value, detail }) {
  return (
    <Card className="border border-slate-100">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{detail}</p>
    </Card>
  );
}

export default StatCard;
