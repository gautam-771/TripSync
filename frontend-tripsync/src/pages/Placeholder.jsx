export default function Placeholder({title,description}) {
  return <div className="page-stack">
    <div><span className="eyebrow blue-eyebrow">TRIPSYNC WORKSPACE</span><h1>{title}</h1><p className="muted">{description}</p></div>
    <div className="empty-card"><div className="empty-icon">✦</div><h3>{title} is next</h3><p>This screen is part of the planned frontend build. We'll connect it to your existing Spring Boot APIs in the next implementation stage.</p></div>
  </div>;
}
