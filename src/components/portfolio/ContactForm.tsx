import { useId, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

import { freelanceServices } from './data';

export default function ContactForm({ freelance = false, service = freelanceServices[0] }: { freelance?: boolean; service?: string }) {
  const formId = useId();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const params = {
      from_name: data.get('name'), email: data.get('email'),
      subject: freelance ? `Freelance enquiry — ${data.get('service')}` : data.get('subject'),
      message: freelance ? `Service: ${data.get('service')}\nBudget: ${data.get('budget') || 'To discuss'}\nTimeline: ${data.get('timeline')}\n\n${data.get('message')}` : data.get('message'),
    };
    setStatus('sending');
    try {
      await emailjs.send('service_endw5er', 'template_pdh45yl', params, 'u4bfEdTAtQuR2XEXY');
      setStatus('sent'); form.reset();
      // A failed acknowledgement must not report an already delivered message as failed.
      void emailjs.send('service_endw5er', 'template_t6tp3z8', params, 'u4bfEdTAtQuR2XEXY').catch(() => {});
    } catch {setStatus('error');}
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-pair">
      <label>Your name<input name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={120} /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} /></label>
    </div>
    {freelance ? <>
      <div className="form-field"><label htmlFor={`${formId}-service`}>What do you need?</label><select id={`${formId}-service`} name="service" defaultValue={service} required>{freelanceServices.map(item => <option key={item}>{item}</option>)}</select></div>
      <div className="form-pair">
        <label>Budget range (optional)<input name="budget" placeholder="Your budget and currency" maxLength={120}/></label>
        <div className="form-field"><label htmlFor={`${formId}-timeline`}>Ideal timeline</label><select id={`${formId}-timeline`} name="timeline" defaultValue="Flexible"><option>Flexible</option><option>Within 2 weeks</option><option>Within a month</option><option>Planning ahead</option></select></div>
      </div>
    </> : <label>What's on your mind?<input name="subject" placeholder="Database design, performance, a DBA role…" required maxLength={200} /></label>}
    <label>{freelance ? 'Tell me about your project' : 'A little more detail'}<textarea name="message" placeholder={freelance ? 'Your database, current challenge, and the outcome you need. Please leave out passwords and production data.' : 'Tell me about your database environment or opportunity.'} required rows={4} maxLength={5000} /></label>
    <div className="form-bottom"><span>{freelance ? 'I’ll review the scope and get back to you.' : 'Good things start with a conversation.'}</span><button className="button button-primary" disabled={status==='sending'} type="submit">{status==='sending' ? <>Sending <LoaderCircle className="spin" size={17}/></> : <>{freelance ? 'Send project enquiry' : 'Send message'} <ArrowUpRight size={18}/></>}</button></div>
    <p className={`form-status ${status}`} role="status" aria-live="polite">{status==='sent' ? <><Check size={16}/> Message sent. Thanks for reaching out!</> : status==='error' ? <>Couldn't send your message. Please try again or email <a href="mailto:akhockey59@gmail.com">akhockey59@gmail.com</a>.</> : null}</p>
  </form>;
}
