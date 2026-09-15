import { ArrowDown, ArrowDownRight, ArrowRight, Database, ShieldCheck } from 'lucide-react';
import { caseStudies, type CaseStudy } from './case-study-data';

function CaseDiagram({ study }: { study: CaseStudy }) {
  return <figure className="case-diagram">
    <div className="case-diagram-heading"><Database size={17}/><span>{study.diagram === 'flow' ? 'WORKFLOW' : 'CLUSTER TOPOLOGY'}</span></div>
    {study.diagram === 'dual-cluster' ? <div className="dual-cluster-diagram" role="img" aria-label="Three servers each run two MySQL containers. The A containers form cluster A for one database workload; the B containers form cluster B for a different workload. Each cluster has three members.">
      <div className="dual-cluster-hosts">{[1, 2, 3].map(server => <div className="dual-cluster-host" key={server}><strong>Server {server}</strong><div className="dual-cluster-member"><Database size={20}/><span>MySQL A{server}</span><small>Cluster A</small></div><div className="dual-cluster-member dual-cluster-member-b"><Database size={20}/><span>MySQL B{server}</span><small>Cluster B</small></div></div>)}</div>
      <div className="cluster-replication"><span/>A1 ↔ A2 ↔ A3<span/></div><p className="dual-cluster-label">Cluster A · Workload A</p>
      <div className="cluster-replication"><span/>B1 ↔ B2 ↔ B3<span/></div><p className="dual-cluster-label">Cluster B · Workload B</p>
    </div> : study.diagram === 'cluster' ? <div className="cluster-diagram" role="img" aria-label="Application traffic flows through MySQL Router to a primary and two secondary MySQL members connected by Group Replication.">
      <div className="cluster-node cluster-app">Application</div><ArrowDown className="cluster-arrow" size={20} aria-hidden="true"/>
      <div className="cluster-node cluster-router">MySQL Router<span>Database traffic routing</span></div>
      <div className="cluster-branches" aria-hidden="true"><span/><span/><span/></div>
      <div className="cluster-members">{['Primary', 'Secondary', 'Secondary'].map((role, i) => <div className="cluster-node" key={i}><Database size={21} strokeWidth={1.3}/><strong>MySQL {i + 1}</strong><span>{role}</span></div>)}</div>
      <div className="cluster-replication"><span/>Group Replication<span/></div>
      <p className="cluster-recovery">Inspect state <ArrowRight size={12}/> Recover / rejoin <ArrowRight size={12}/> Validate</p>
    </div> : <ol className="case-workflow">{study.steps.map(([label, detail], index) => <li key={label}><span className="workflow-index">{String(index + 1).padStart(2, '0')}</span><div><strong>{label}</strong><span>{detail}</span></div>{index < study.steps.length - 1 && <ArrowDown size={14} className="workflow-arrow" aria-hidden="true"/>}</li>)}</ol>}
    <figcaption>{study.diagramCaption}</figcaption>
  </figure>;
}

export default function CaseStudies() {
  return <section className="case-studies-section section-space" id="case-studies" aria-labelledby="case-studies-title"><div className="shell">
    <div className="section-heading reveal"><div><p className="eyebrow section-label"><span>02 /</span> SELECTED PRODUCTION WORK</p><h2 id="case-studies-title">The problem.<br/>The work.<br/><span className="serif-word">The outcome.</span></h2></div><div className="case-section-intro"><p>How I investigate, operate, and improve production databases. Seven case studies from my DBA work.</p><span>Public summaries · Customer data and infrastructure identifiers omitted</span></div></div>
    <div className="case-study-grid">{caseStudies.map((study, index) => <details className="case-study" id={study.id} key={study.id} data-depth>
      <summary>
        <div className="case-card-top"><span className="eyebrow">{study.category}</span><span className="case-number">0{index + 1}</span></div>
        <h3>{study.title}</h3><p className="case-card-summary">{study.summary}</p>
        <span className="case-scope">{study.scope}</span>
        <div className="case-card-bottom"><span><span className="case-open-label">Read case study</span><span className="case-close-label">Close case study</span></span><ArrowDownRight size={22}/></div>
      </summary>
      <div className="case-expanded">
        <div className="case-tools" aria-label="Tools used">{study.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
        <div className="case-evidence-layout"><div className="case-evidence">
          <div><h4><span>01</span> Problem</h4><p>{study.problem}</p></div>
          <div><h4><span>02</span> Investigation</h4><ul>{study.investigation.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h4><span>03</span> Action</h4><ul>{study.action.map(item => <li key={item}>{item}</li>)}</ul></div>
        </div><CaseDiagram study={study}/></div>
        <div className="case-outcome"><ShieldCheck size={23}/><div><h4>Outcome</h4><p>{study.outcome}</p><p className="case-validation"><strong>Validation:</strong> {study.validation}</p></div></div>
      </div>
    </details>)}</div>
    <a className="case-project-link" href="#projects">See the products behind my database work <ArrowRight size={19}/></a>
  </div></section>;
}
