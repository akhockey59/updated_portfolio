const metrics = [
  ['45', 'MySQL servers supported', 'Database operations across the server estate'],
  ['07', 'Production environments', 'Five with MySQL clustering'],
  ['05', 'Clustered production environments', 'One runs two independent MySQL clusters'],
  ['5–6', 'UAT clusters supported', 'Backups · recovery · maintenance'],
  ['04', 'Countries supported', 'India · Kenya · Tanzania · Uganda'],
  ['100M+', 'Records in large tables', 'High-volume production datasets'],
];
const stack = ['MySQL 8.x', 'InnoDB Cluster', 'Group Replication', 'MySQL Router', 'MySQL Shell', 'Percona Toolkit', 'Python', 'Bash', 'Docker', 'Prometheus', 'Grafana', 'MongoDB', 'Linux'];

export default function ProductionScale() {
  return <section className="production-scale shell" id="production-scale" aria-labelledby="production-scale-title">
    <div className="scale-heading reveal"><div><p className="eyebrow section-label"><span>01 /</span> PRODUCTION SCALE</p><h2 id="production-scale-title">Responsibility you can <span className="serif-word">measure.</span></h2></div><p>Production scope across the environments I support.</p></div>
    <dl className="scale-grid">{metrics.map(([value, label, detail]) => <div key={label} data-depth><dt>{label}</dt><dd className={value.length > 6 ? 'scale-value scale-value-text' : 'scale-value'}>{value}</dd><dd className="scale-detail">{detail}</dd></div>)}</dl>
    <div className="production-stack"><p className="eyebrow">WHAT I WORK WITH</p><ul>{stack.map(tool => <li key={tool}>{tool}</li>)}</ul></div>
  </section>;
}
