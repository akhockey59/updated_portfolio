import { ArrowUpRight, Download } from 'lucide-react';
import { useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function ResumePreview({label = 'View résumé'}: {label?: string}) {
  const heading = useRef<HTMLHeadingElement>(null);
  return <Dialog>
    <DialogTrigger asChild><button className="text-link resume-trigger">{label} <ArrowUpRight size={18}/></button></DialogTrigger>
    <DialogContent className="resume-dialog" onOpenAutoFocus={event => {event.preventDefault(); heading.current?.focus();}}>
      <div className="floating-heading"><span className="eyebrow">DATABASE ENGINEER / MYSQL DBA</span><DialogTitle ref={heading} tabIndex={-1}>Aakash’s résumé</DialogTitle><DialogDescription>Read the résumé here, or download a copy.</DialogDescription></div>
      <iframe src="/CV.pdf#view=FitH" title="Aakash’s résumé PDF" className="resume-frame"/>
      <div className="resume-footer"><span>If your browser cannot display the PDF, download it below.</span><a href="/CV.pdf" download="Aakash-Database-Engineer-CV.pdf" className="text-link">Download CV <Download size={17}/></a></div>
    </DialogContent>
  </Dialog>;
}
