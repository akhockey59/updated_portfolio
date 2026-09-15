import { ArrowUpRight, Database, Gauge, GitBranch, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ContactForm from './ContactForm';
import { freelanceServices } from './data';

const services = [
  { icon: Database, description: 'Starting a product or rethinking your data model? Let’s build a database around how your business actually works.', deliverables: 'Schema design · Data modeling · Architecture review' },
  { icon: Gauge, description: 'Find out why a workload is slow, which queries matter most, and where indexes or query changes can help.', deliverables: 'Query analysis · Index review · Optimization plan' },
  { icon: GitBranch, description: 'Move between database systems, validate the results, or get growing historical data back under control.', deliverables: 'Migration planning · Validation · Retention strategy' },
  { icon: ShieldCheck, description: 'Build a practical backup and recovery workflow, review availability, and document how to respond when things fail.', deliverables: 'Backup automation · Restore validation · DC / DR review' },
];

function Enquiry({ service, children, className }: {service?: string; children: React.ReactNode; className: string}) {
  return <Dialog>
    <DialogTrigger asChild><button className={className}>{children}</button></DialogTrigger>
    <DialogContent className="enquiry-dialog">
      <div className="floating-heading"><span className="eyebrow">FREELANCE DATABASE SERVICES</span><DialogTitle>Let’s scope your project.</DialogTitle><DialogDescription>Tell me what you need. I’ll review it and reply to discuss scope, timing, and next steps.</DialogDescription></div>
      <ContactForm freelance service={service}/>
    </DialogContent>
  </Dialog>;
}

export default function Freelance() {
  return <section className="freelance-section section-space" id="freelance"><div className="shell">
    <div className="section-heading reveal"><div><p className="eyebrow section-label"><span>05 /</span> WORK WITH ME · FREELANCE</p><h2>Your database.<br/><span className="serif-word">My next challenge.</span></h2></div><p>Independent database help for your next project.<br/>A focused review, a new design, or a planned migration.</p></div>
    <div className="service-grid">{services.map((service, index) => <article className="service-card reveal" key={freelanceServices[index]}>
      <div className="service-top"><service.icon size={26} strokeWidth={1.4}/><span>0{index + 1}</span></div>
      <h3>{freelanceServices[index]}</h3><p>{service.description}</p><span className="service-deliverables">{service.deliverables}</span>
      <Enquiry service={freelanceServices[index]} className="service-cta">Discuss this service <ArrowUpRight size={18}/></Enquiry>
    </article>)}</div>
    <div className="freelance-process"><div><span className="eyebrow">HOW WE START</span><p>Share the challenge → Agree on scope → Plan the work</p></div><Enquiry className="button button-primary">Start a project <ArrowUpRight size={20}/></Enquiry></div>
    <p className="freelance-note">MySQL & PostgreSQL · Remote collaboration · Scope and pricing agreed before work begins</p>
  </div></section>;
}
