import React from 'react';
import {
  Package,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Truck,
  Heart
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { IshemaLogo } from './IshemaLogo';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsBookingModalOpen } = useStore();

  const handleNav = (view: any) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      {/* Upper Footer: Newsletter & Urgent Hotline */}
      <div className="border-b border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <IshemaLogo variant="mark" size="lg" />
            <div>
              <h3 className="font-heading font-extrabold text-xl text-white">
                Need urgent parcel dispatch in Kigali?
              </h3>
              <p className="text-xs text-slate-400 font-body">
                Our motorcycle courier fleet delivers in 30–45 minutes across all sectors.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-interface font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              Order Instant Delivery
            </button>
            <a
              href="tel:+250780837936"
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-interface font-semibold text-xs sm:text-sm flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+250 780 837 936</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Description (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <IshemaLogo variant="horizontal" theme="dark" size="lg" />
            <p className="text-xs sm:text-sm text-slate-400 font-body leading-relaxed max-w-sm">
              Rwanda’s premier on-demand delivery logistics and marketplace platform. Empowering local merchants and providing customers with rapid, tracked, and insured deliveries across Kigali and beyond.
            </p>

            {/* Operating Sectors Badges */}
            <div className="pt-2">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Coverage Sectors:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300 font-interface">
                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">Kimihurura</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">Kiyovu</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">Kacyiru</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">Remera</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">Kanombe</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">Musanze</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">Rubavu</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-interface">
              <li>
                <button type="button" onClick={() => handleNav('home')} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('about')} className="hover:text-amber-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('services')} className="hover:text-amber-400 transition-colors">
                  Our Services
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('how-it-works')} className="hover:text-amber-400 transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('pricing')} className="hover:text-amber-400 transition-colors">
                  Delivery Pricing
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('track')} className="hover:text-amber-400 transition-colors">
                  Track Your Package
                </button>
              </li>
            </ul>
          </div>

          {/* Operations & Portals */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Partners & Fleets
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-interface">
              <li>
                <button type="button" onClick={() => handleNav('driver-apply')} className="hover:text-amber-400 transition-colors">
                  Become an Ishema Driver
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('driver')} className="hover:text-amber-400 transition-colors text-amber-300 font-semibold">
                  Driver Dispatch Portal
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('admin')} className="hover:text-amber-400 transition-colors text-amber-400 font-semibold">
                  Operations Admin Suite
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('contact')} className="hover:text-amber-400 transition-colors">
                  Merchant Partnership
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('contact')} className="hover:text-amber-400 transition-colors">
                  Help & Support Center
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Payment Badges */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Kigali Office
            </h4>
            <div className="space-y-2 text-xs text-slate-400 font-body">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>KG 7 Ave, Kimihurura, Gasabo District, Kigali, Rwanda</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+250780837936" className="hover:text-amber-400 transition-colors">
                  +250 780 837 936
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@ishemaexpress.rw</span>
              </div>
            </div>

            {/* Payment Methods Badges */}
            <div className="pt-2">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Accepted Rwandan Payments:
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold font-interface">
                <span className="px-2 py-1 rounded-md bg-amber-500 text-slate-950">MTN MoMo</span>
                <span className="px-2 py-1 rounded-md bg-rose-600 text-white">Airtel Money</span>
                <span className="px-2 py-1 rounded-md bg-blue-600 text-white">Visa/Mastercard</span>
                <span className="px-2 py-1 rounded-md bg-slate-800 text-slate-200">Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-body">
          <p>© {new Date().getFullYear()} Ishema Express Rwanda Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Fast, Reliable, & Safe Deliveries Across Rwanda</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
