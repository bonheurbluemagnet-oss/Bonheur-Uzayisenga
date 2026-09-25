import React, { useState } from 'react';
import { useStore, formatRWF } from '../../context/StoreContext';
import {
  Briefcase,
  FileText,
  Coffee,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Building,
  Phone,
  Send,
  Clock
} from 'lucide-react';

export const BusinessDeliveryView: React.FC = () => {
  const [inquirySent, setInquirySent] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [serviceType, setServiceType] = useState('Office Daily Lunch');
  const [headcount, setHeadcount] = useState('20-50 employees');

  const BUSINESS_SERVICES = [
    {
      title: 'Corporate Office Lunches & Catering',
      desc: 'Hot, punctual daily lunches delivered simultaneously for entire departments from Kigali’s top catering partners with zero spill guarantee.',
      icon: Coffee,
      highlight: 'Individual packaging & dietary tags'
    },
    {
      title: 'Confidential Legal & Document Courier',
      desc: 'Rapid tamper-evident delivery of contracts, land titles, and cheques between Nyarugenge, Kacyiru ministries, and embassies with OTP sign-off.',
      icon: FileText,
      highlight: 'Encrypted GPS & OTP handover'
    },
    {
      title: 'Pantry, Milk & Coffee Bean Restocking',
      desc: 'Automated weekly delivery of Rwandan Arabica beans, Inyange milk crates, tea, fruits, and snacks directly into your office kitchen.',
      icon: Briefcase,
      highlight: 'Scheduled recurring replenishment'
    }
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setCompanyName('');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-500/30">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/40 rounded-full px-4 py-1 mb-3 text-xs font-semibold text-indigo-300">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>Feature 15 • Ishema Business Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Reliable Corporate Logistics <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-amber-200">
              for Kigali Enterprises & NGOs.
            </span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2">
            Consolidate all company lunches, pantry supplies, and inter-office documents under one monthly RRA EBM-compliant invoice.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {BUSINESS_SERVICES.map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-500/50 transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{srv.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enterprise Account Setup Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="max-w-xl">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Request Corporate Account & Monthly Invoicing
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dedicated account manager, priority moto dispatch, and unified monthly billing for businesses in Kigali.
          </p>

          <form onSubmit={handleInquirySubmit} className="mt-5 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Company / Organization Name
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Bank of Kigali / Norrsken House Kigali"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Service Needed
                </label>
                <select
                  value={serviceType}
                  onChange={e => setServiceType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Office Daily Lunch">Office Daily Lunch & Catering</option>
                  <option value="Confidential Courier">Document & Contract Courier</option>
                  <option value="Pantry Restocking">Weekly Pantry & Coffee Supply</option>
                  <option value="Full Logistics">All-in-One Enterprise Logistics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Office Headcount
                </label>
                <select
                  value={headcount}
                  onChange={e => setHeadcount(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="10-20">10-20 Employees</option>
                  <option value="20-50 employees">20-50 Employees</option>
                  <option value="50-200">50-200 Employees</option>
                  <option value="200+">200+ Enterprise Campus</option>
                </select>
              </div>
            </div>

            {inquirySent ? (
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Corporate request received! Our B2B accounts lead will call you within 30 minutes.
              </div>
            ) : (
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition-all"
              >
                Submit Enterprise Inquiry
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
