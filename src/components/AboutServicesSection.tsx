import React, { useState } from 'react';
import {
  Truck,
  Bike,
  Package,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Users,
  Award,
  Smartphone
} from 'lucide-react';
import { useStore, formatRWF } from '../context/StoreContext';
import { RWANDA_LOCATIONS } from '../data/mockData';
import { IshemaLogo } from './IshemaLogo';

export const AboutServicesSection: React.FC<{ activeSection?: string }> = ({ activeSection = 'all' }) => {
  const { setIsBookingModalOpen, setCurrentView } = useStore();

  // Driver Application Form State
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('+250 78');
  const [driverVehicle, setDriverVehicle] = useState('Motorcycle (Moto)');
  const [driverPlate, setDriverPlate] = useState('RAD 123');
  const [driverLocation, setDriverLocation] = useState('Gasabo - Kimihurura');
  const [driverAppSubmitted, setDriverAppSubmitted] = useState(false);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDriverAppSubmitted(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  return (
    <div className="w-full space-y-16 py-12">
      {/* 1. ABOUT US */}
      {(activeSection === 'all' || activeSection === 'about') && (
        <section id="about-us-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/20 mb-3">
                <Award className="w-3.5 h-3.5" />
                About Ishema Express Rwanda
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-950 mb-4 leading-tight">
                Pioneering Rwandan E-Commerce & Rapid Doorstep Logistics
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-body mb-4 leading-relaxed">
                Founded with a mission to empower local businesses and delight customers, <strong>Ishema Express</strong> connects merchants, restaurants, and consumers across Rwanda with rapid, reliable, and technology-driven delivery services.
              </p>
              <p className="text-slate-600 text-sm font-body mb-6 leading-relaxed">
                Whether you are ordering fresh gourmet food from Kigali restaurants, purchasing electronics, or sending important business contracts across town, our certified fleet of motorcycle riders and cargo drivers guarantees fast, tracked, and insured arrival.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <span className="font-heading font-bold text-2xl text-amber-700 block">30 Mins</span>
                  <span className="text-xs text-slate-600 font-interface">Average Delivery in Kigali</span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <span className="font-heading font-bold text-2xl text-emerald-700 block">30+</span>
                  <span className="text-xs text-slate-600 font-interface">Rwandan Districts Covered</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 text-white col-span-2 sm:col-span-1">
                  <span className="font-heading font-bold text-2xl text-amber-400 block">10,000+</span>
                  <span className="text-xs text-slate-300 font-interface">Deliveries Completed</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1000&auto=format&fit=crop&q=80"
                  alt="Delivery Courier in Rwanda"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Official Brand Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <IshemaLogo variant="mark" size="sm" />
                <div className="pr-1">
                  <div className="font-heading font-black text-xs text-[#0047AB] italic">ISHEMA EXPRESS</div>
                  <span className="text-[10px] text-slate-500 font-interface">Registered Fleet Rwanda</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-interface font-bold text-xs text-slate-900">100% Insured & Tracked</h4>
                    <p className="text-[11px] text-slate-500 font-body">Every item safe from dispatch to handover</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. OUR SERVICES */}
      {(activeSection === 'all' || activeSection === 'services') && (
        <section id="our-services-section" className="bg-slate-50 py-16 border-y border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-600">
                What We Offer
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-950 mt-1 mb-3">
                Tailored Logistics for Rwanda
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-body">
                From urgent single-envelope courier dispatches to bulk commercial fleet freight, we provide end-to-end delivery solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Bike,
                  title: 'Express Moto Courier',
                  desc: 'Rapid point-to-point motorcycle delivery across Kigali. Perfect for urgent documents, electronics, medication, and everyday parcels in under 45 minutes.',
                  badge: 'Starting from 1,200 RWF'
                },
                {
                  icon: Package,
                  title: 'E-Commerce Marketplace',
                  desc: 'Browse hundreds of verified Rwandan merchants selling food, drinks, electronics, and fashion with instant cart checkout and mobile money payments.',
                  badge: 'Integrated Shop'
                },
                {
                  icon: Truck,
                  title: 'Inter-District Province Cargo',
                  desc: 'Scheduled daily cargo transport connecting Kigali to Musanze, Rubavu, Huye, Rusizi, and Nyagatare with door-to-door tracking and secure handling.',
                  badge: 'Daily Departures'
                }
              ].map((svc, idx) => {
                const Icon = svc.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">
                        {svc.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed mb-4">
                        {svc.desc}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-700">{svc.badge}</span>
                      <button
                        type="button"
                        onClick={() => setIsBookingModalOpen(true)}
                        className="text-xs font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1"
                      >
                        Order Now <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 3. HOW IT WORKS */}
      {(activeSection === 'all' || activeSection === 'how-it-works') && (
        <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-600">
              Simple 4-Step Process
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-950 mt-1 mb-3">
              How Ishema Express Works
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-body">
              Whether you are sending a parcel or ordering from the store, enjoy a transparent and hassle-free experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Book or Shop',
                desc: 'Fill out the courier booking form or add your favorite store products to the cart.'
              },
              {
                step: '02',
                title: 'Instant Driver Dispatch',
                desc: 'A nearby verified driver in your sector is automatically assigned to pick up the goods.'
              },
              {
                step: '03',
                title: 'Live GPS Tracking',
                desc: 'Follow your driver in real-time on our interactive map with live status updates.'
              },
              {
                step: '04',
                title: 'Doorstep Handover',
                desc: 'Receive your parcel safely and pay via MTN MoMo, Airtel Money, or Cash on Delivery.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs relative overflow-hidden"
              >
                <div className="font-heading font-extrabold text-4xl text-amber-500/20 mb-3">
                  {item.step}
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 font-body leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. PRICING SECTION */}
      {(activeSection === 'all' || activeSection === 'pricing') && (
        <section id="pricing-section" className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-400">
                Transparent Rates
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white mt-1 mb-3">
                Affordable Delivery Across Rwanda
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-body">
                No hidden fees. Check our standard rates for Kigali sectors and provincial deliveries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Plan 1 */}
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Kigali Central</span>
                  <h3 className="font-heading font-bold text-xl text-white mt-1 mb-2">Kigali Express Moto</h3>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-4">
                    1,200 – 1,800 <span className="text-xs text-slate-400 font-normal">RWF / trip</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300 font-body mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Kimihurura, Kiyovu, Kacyiru, Nyarugenge
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Delivery time: 20–40 mins
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      SMS & WhatsApp tracking link
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-interface font-bold text-xs"
                >
                  Book Moto Courier
                </button>
              </div>

              {/* Plan 2 - Featured */}
              <div className="p-6 rounded-3xl bg-amber-500 text-slate-950 border-2 border-amber-400 shadow-xl flex flex-col justify-between relative">
                <span className="absolute -top-3 right-6 bg-slate-950 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
                <div>
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Greater Kigali</span>
                  <h3 className="font-heading font-bold text-xl text-slate-950 mt-1 mb-2">Car & Van Express</h3>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-950 mb-4">
                    2,500 – 4,000 <span className="text-xs text-slate-800 font-normal">RWF / trip</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-900 font-body font-medium mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      All Kigali sectors + Kanombe, Gisozi, Nyamirambo
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      Boxes, electronics, fragile packages
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      Live GPS driver map tracking
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-400 font-interface font-bold text-xs"
                >
                  Book Vehicle Delivery
                </button>
              </div>

              {/* Plan 3 */}
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Cross-Country</span>
                  <h3 className="font-heading font-bold text-xl text-white mt-1 mb-2">Inter-District Cargo</h3>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-4">
                    4,500 – 8,000 <span className="text-xs text-slate-400 font-normal">RWF / trip</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-300 font-body mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Musanze, Rubavu, Huye, Nyagatare
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Same-day & Next-day departures
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Commercial invoice & warehouse drop
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-interface font-bold text-xs"
                >
                  Contact for Cargo
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. BECOME A DRIVER SECTION */}
      {(activeSection === 'all' || activeSection === 'driver') && (
        <section id="become-driver-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 rounded-3xl border border-amber-200/60 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 mb-2">
                  <Bike className="w-4 h-4" />
                  Join Our Kigali & Rwanda Fleet
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-950 mb-4">
                  Become an Ishema Delivery Driver
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm font-body mb-6 leading-relaxed">
                  Earn competitive daily income delivering packages and food across Kigali and surrounding districts. Choose your hours, receive direct MTN MoMo payouts, and get full safety gear support.
                </p>

                <div className="space-y-3 text-xs text-slate-700 font-interface mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Daily earnings up to <strong>35,000 RWF</strong> with instant MoMo withdrawals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Free Ishema branded helmet, uniform, and thermal delivery bag</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Comprehensive medical and accident insurance coverage</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                {driverAppSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">
                      Application Received!
                    </h3>
                    <p className="text-xs text-slate-600 font-body">
                      Murakoze {driverName}! Our operations team in Kimihurura will contact you at {driverPhone} within 24 hours for induction.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDriverSubmit} className="space-y-3 text-xs">
                    <h3 className="font-heading font-bold text-slate-900 text-sm mb-3">
                      Driver Registration Form
                    </h3>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                      <input
                        type="text"
                        required
                        value={driverName}
                        onChange={e => setDriverName(e.target.value)}
                        placeholder="e.g. Eric Ndahiro"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Phone Number (MTN / Airtel) *</label>
                      <input
                        type="tel"
                        required
                        value={driverPhone}
                        onChange={e => setDriverPhone(e.target.value)}
                        placeholder="+250 788 000 000"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Vehicle Type</label>
                        <select
                          value={driverVehicle}
                          onChange={e => setDriverVehicle(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        >
                          <option value="Motorcycle (Moto)">Motorcycle (Moto)</option>
                          <option value="Car / Sedan">Car / Sedan</option>
                          <option value="Pickup / Van">Pickup / Van</option>
                          <option value="Bicycle">Bicycle (City Center)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">License Plate No</label>
                        <input
                          type="text"
                          required
                          value={driverPlate}
                          onChange={e => setDriverPlate(e.target.value)}
                          placeholder="e.g. RAD 456X"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Current Sector in Rwanda</label>
                      <input
                        type="text"
                        value={driverLocation}
                        onChange={e => setDriverLocation(e.target.value)}
                        placeholder="e.g. Gasabo - Kimironko"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-interface font-bold text-xs mt-2 transition-colors"
                    >
                      Submit Driver Application
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. CONTACT US */}
      {(activeSection === 'all' || activeSection === 'contact') && (
        <section id="contact-us-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-amber-600">
              Get in Touch
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-950 mt-1 mb-3">
              We are Here to Help
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-body">
              Visit our headquarters in Kigali or contact our 24/7 customer support team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-interface font-bold text-slate-900 text-sm">Kigali Headquarters</h4>
                  <p className="text-xs text-slate-600 font-body mt-0.5">
                    KG 7 Ave, Kimihurura Sector, Gasabo District, Kigali, Rwanda
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-interface font-bold text-slate-900 text-sm">Customer Hotline & WhatsApp</h4>
                  <a
                    href="https://wa.me/250780837936"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-bold font-body mt-0.5 block hover:underline"
                  >
                    +250 780 837 936 (Call or WhatsApp)
                  </a>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
                    Available 7 days a week (7:00 AM – 10:00 PM)
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-interface font-bold text-slate-900 text-sm">Official Email</h4>
                  <p className="text-xs text-slate-600 font-body mt-0.5">
                    support@ishemaexpress.rw / dispatch@ishemaexpress.rw
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              {contactSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-slate-600 font-body">
                    Murakoze cyane! An Ishema customer care specialist will respond to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={e => setContactName(e.target.value)}
                        placeholder="e.g. Diane Mukamana"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email or Phone *</label>
                      <input
                        type="text"
                        required
                        value={contactEmail}
                        onChange={e => setContactEmail(e.target.value)}
                        placeholder="diane@example.rw or +250 78..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Partnership inquiry, delivery question..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={contactMsg}
                      onChange={e => setContactMsg(e.target.value)}
                      placeholder="Write your inquiry or feedback here..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none font-body"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-interface font-bold text-xs transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
