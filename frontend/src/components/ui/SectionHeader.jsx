function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
      <div>
        {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">{eyebrow}</p> : null}
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm text-slate-500">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export default SectionHeader;
