import React, { useState } from 'react';
import {
  Gift,
  ShieldCheck,
  EyeOff,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  Languages,
  HelpCircle,
  FileText
} from 'lucide-react';
import { useStore, formatRWF } from '../context/StoreContext';
import {
  SURPRISE_OCCASIONS,
  GIFT_WRAPPING_OPTIONS,
  SURPRISE_ADDONS,
  PRESET_MESSAGES
} from '../data/surpriseGiftData';
import { RWANDA_LOCATIONS } from '../data/mockData';

interface SurpriseGiftOptionsProps {
  compact?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

export const SurpriseGiftOptions: React.FC<SurpriseGiftOptionsProps> = ({
  compact = false
}) => {
  const {
    isSurpriseGiftMode,
    setIsSurpriseGiftMode,
    surpriseConfig,
    updateSurpriseConfig
  } = useStore();

  const [activeLanguage, setActiveLanguage] = useState<'en' | 'rw' | 'fr'>(surpriseConfig.secretLanguage || 'en');
  const [showPresets, setShowPresets] = useState<boolean>(false);
  const [showWrappingDetails, setShowWrappingDetails] = useState<boolean>(!compact);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState<boolean>(false);

  const handleToggleMode = (enabled: boolean) => {
    setIsSurpriseGiftMode(enabled);
    updateSurpriseConfig({ isSurprise: enabled });
  };

  const handleAddOnToggle = (addonId: string) => {
    const current = surpriseConfig.selectedAddOns || [];
    if (current.includes(addonId)) {
      updateSurpriseConfig({
        selectedAddOns: current.filter(id => id !== addonId)
      });
    } else {
      updateSurpriseConfig({
        selectedAddOns: [...current, addonId]
      });
    }
  };

  const handleApplyPreset = (text: string) => {
    updateSurpriseConfig({ secretMessage: text, secretLanguage: activeLanguage });
    setShowPresets(false);
  };

  return (
    <div id="surprise-gift-options-container" className="rounded-2xl border border-rose-200 bg-linear-to-b from-rose-50/70 via-amber-50/30 to-white p-4 sm:p-6 shadow-xs transition-all">
      {/* Master Toggle Banner */}
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-rose-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Send as a Secret Surprise Gift
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-700 border border-rose-200">
                100% Secret
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 max-w-md">
              The recipient won't know who sent it. Our driver delivers with strict secret protocol and delivers your sealed card!
            </p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
          <input
            id="toggle-surprise-gift-switch"
            type="checkbox"
            checked={isSurpriseGiftMode}
            onChange={(e) => handleToggleMode(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-12 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500 shadow-inner"></div>
        </label>
      </div>

      {isSurpriseGiftMode && (
        <div className="mt-5 space-y-6 animate-fadeIn">
          {/* Secret Delivery Guarantee Badge */}
          <div className="p-3.5 rounded-xl bg-linear-to-r from-emerald-500/10 via-amber-500/10 to-rose-500/10 border border-emerald-300/60 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-800 leading-relaxed">
              <span className="font-bold text-emerald-900 block mb-0.5">
                Ishema Secret Delivery Protocol Active
              </span>
              Recipient receives package labeled <strong>“A Surprise Gift from Ishema Express”</strong>. Driver is strictly instructed: <em>“You have a surprise delivery from Ishema Express!”</em> Your personal contact & account details are never revealed on the receipt.
              <button
                type="button"
                onClick={() => setShowPrivacyNotice(!showPrivacyNotice)}
                className="ml-1.5 text-rose-700 font-semibold underline hover:text-rose-800"
              >
                {showPrivacyNotice ? 'Hide protocol' : 'View safety protocol'}
              </button>
            </div>
          </div>

          {showPrivacyNotice && (
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs space-y-2">
              <p className="font-bold text-amber-400 flex items-center gap-1.5">
                <EyeOff className="w-4 h-4" />
                Zero-Leak Confidentiality Rules:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li>Sender name, phone, billing address, and payment cards are completely excluded from delivery notes.</li>
                <li>Driver can only contact recipient to coordinate arrival landmark.</li>
                <li>The delivery package includes an anonymous QR code leading to the interactive unboxing experience.</li>
                <li>Recipients have access to report unwanted deliveries or reply with an anonymous thank-you note.</li>
              </ul>
            </div>
          )}

          {/* Section 1: Recipient Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
              <User className="w-4 h-4 text-rose-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Recipient Details (Who gets the surprise?)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recipient's Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="surprise-recipient-name-input"
                    type="text"
                    required
                    placeholder="e.g. Keza Umulisa"
                    value={surpriseConfig.recipientName}
                    onChange={(e) => updateSurpriseConfig({ recipientName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recipient's Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="surprise-recipient-phone-input"
                    type="tel"
                    required
                    placeholder="+250 788 000 000"
                    value={surpriseConfig.recipientPhone}
                    onChange={(e) => updateSurpriseConfig({ recipientPhone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden bg-white"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Driver only calls upon arrival: <em>"You have a surprise delivery"</em>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery District & Sector *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    id="surprise-recipient-district-select"
                    value={surpriseConfig.deliveryDistrict}
                    onChange={(e) => updateSurpriseConfig({ deliveryDistrict: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden bg-white"
                  >
                    {RWANDA_LOCATIONS.map((loc, idx) => (
                      <option key={`${loc.district}-${loc.sector}-${idx}`} value={`${loc.district} - ${loc.sector}`}>
                        {loc.district} — {loc.sector} ({loc.fee === 0 ? 'Free' : formatRWF(loc.fee)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Exact Street Address / Building *
                </label>
                <input
                  id="surprise-recipient-address-input"
                  type="text"
                  required
                  placeholder="e.g. KG 9 Ave, House #45, Near Lemigo Hotel"
                  value={surpriseConfig.deliveryAddress}
                  onChange={(e) => updateSurpriseConfig({ deliveryAddress: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Landmark or Special Secret Instructions
              </label>
              <input
                id="surprise-recipient-landmark-input"
                type="text"
                placeholder="e.g. White gate with black flowers, knock quietly, ask for Keza"
                value={surpriseConfig.landmarkInstructions}
                onChange={(e) => updateSurpriseConfig({ landmarkInstructions: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden bg-white"
              />
            </div>
          </div>

          {/* Section 2: Preferred Delivery Timing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
              <Clock className="w-4 h-4 text-rose-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Preferred Delivery Schedule
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="surprise-schedule-date-input"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={surpriseConfig.scheduledDate}
                    onChange={(e) => updateSurpriseConfig({ scheduledDate: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Surprise Delivery Window
                </label>
                <select
                  id="surprise-schedule-window-select"
                  value={surpriseConfig.scheduledTimeWindow}
                  onChange={(e) => updateSurpriseConfig({ scheduledTimeWindow: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden bg-white"
                >
                  <option value="Morning Express (08:00 - 12:00)">Morning Express (08:00 - 12:00)</option>
                  <option value="Afternoon (12:00 - 17:00)">Afternoon (12:00 - 17:00)</option>
                  <option value="Evening Surprise (17:00 - 20:00)">Evening Surprise (17:00 - 20:00)</option>
                  <option value="Exact Hour Special (Call 30m prior)">Exact Hour Special (Call 30m prior)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Celebration Occasion */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  3. Select Special Occasion
                </h4>
              </div>
              <span className="text-xs text-rose-600 font-semibold">
                {surpriseConfig.occasion}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {SURPRISE_OCCASIONS.map(occ => {
                const isSelected = surpriseConfig.occasion === occ.id;
                return (
                  <button
                    key={occ.id}
                    id={`occasion-pill-${occ.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    type="button"
                    onClick={() => updateSurpriseConfig({ occasion: occ.id })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-rose-500 text-white shadow-xs scale-102 ring-2 ring-rose-300'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50 hover:border-rose-200'
                    }`}
                  >
                    <span>{occ.icon}</span>
                    <span>{occ.label}</span>
                  </button>
                );
              })}
            </div>

            {surpriseConfig.occasion === 'Custom occasion' && (
              <div className="mt-2">
                <input
                  id="surprise-custom-occasion-input"
                  type="text"
                  placeholder="Type your custom celebration occasion..."
                  value={surpriseConfig.customOccasion || ''}
                  onChange={(e) => updateSurpriseConfig({ customOccasion: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-rose-300 text-sm focus:ring-2 focus:ring-rose-200 outline-hidden bg-white"
                />
              </div>
            )}
          </div>

          {/* Section 4: Personal Secret Message */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  4. Secret Gift Card Message
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{showPresets ? 'Close inspirations' : 'Choose ready message'}</span>
              </button>
            </div>

            {showPresets && (
              <div className="p-3.5 rounded-xl bg-white border border-rose-200 shadow-xs space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    Quick message inspirations:
                  </span>
                  <div className="flex rounded-lg bg-slate-100 p-0.5 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setActiveLanguage('rw')}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        activeLanguage === 'rw' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Kinyarwanda
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLanguage('en')}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        activeLanguage === 'en' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveLanguage('fr')}
                      className={`px-2 py-0.5 rounded-md transition-colors ${
                        activeLanguage === 'fr' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Français
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {PRESET_MESSAGES[activeLanguage].map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleApplyPreset(preset.text)}
                      className="p-2.5 rounded-lg border border-slate-100 hover:border-rose-300 hover:bg-rose-50/50 cursor-pointer transition-all text-xs text-slate-700"
                    >
                      <div className="font-semibold text-rose-700 mb-0.5">{preset.label}</div>
                      <p className="text-slate-600 italic">"{preset.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="relative">
              <textarea
                id="surprise-secret-message-textarea"
                rows={3}
                placeholder="Write your secret heart-to-heart message here. It will be printed in our wax-sealed calligraphy card..."
                value={surpriseConfig.secretMessage}
                onChange={(e) => updateSurpriseConfig({ secretMessage: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-hidden bg-white resize-none"
              />
              <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                <span>Handwritten or printed on heavy parchment card</span>
                <span>{surpriseConfig.secretMessage.length} characters</span>
              </div>
            </div>
          </div>

          {/* Section 5: Reveal Identity Option */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
              <Eye className="w-4 h-4 text-rose-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                5. Reveal Options (Will they ever know who sent it?)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  surpriseConfig.revealOption === 'keep_anonymous'
                    ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-200'
                    : 'border-slate-200 bg-white hover:border-rose-200'
                }`}
              >
                <input
                  type="radio"
                  name="revealOption"
                  className="sr-only"
                  checked={surpriseConfig.revealOption === 'keep_anonymous'}
                  onChange={() => updateSurpriseConfig({ revealOption: 'keep_anonymous' })}
                />
                <div className="flex items-center gap-2 mb-1 text-slate-900 font-bold text-xs">
                  <EyeOff className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Stay 100% Anonymous</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Never reveal your identity. Appears as a secret admirer or anonymous friend.
                </p>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  surpriseConfig.revealOption === 'reveal_after_delivery'
                    ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-200'
                    : 'border-slate-200 bg-white hover:border-rose-200'
                }`}
              >
                <input
                  type="radio"
                  name="revealOption"
                  className="sr-only"
                  checked={surpriseConfig.revealOption === 'reveal_after_delivery'}
                  onChange={() => updateSurpriseConfig({ revealOption: 'reveal_after_delivery' })}
                />
                <div className="flex items-center gap-2 mb-1 text-slate-900 font-bold text-xs">
                  <Eye className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Reveal After Delivery</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Identity remains hidden until the package is handed over and unwrapped online.
                </p>
              </label>

              <label
                className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  surpriseConfig.revealOption === 'reveal_scheduled'
                    ? 'border-rose-500 bg-rose-50/50 ring-2 ring-rose-200'
                    : 'border-slate-200 bg-white hover:border-rose-200'
                }`}
              >
                <input
                  type="radio"
                  name="revealOption"
                  className="sr-only"
                  checked={surpriseConfig.revealOption === 'reveal_scheduled'}
                  onChange={() => updateSurpriseConfig({ revealOption: 'reveal_scheduled' })}
                />
                <div className="flex items-center gap-2 mb-1 text-slate-900 font-bold text-xs">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Reveal on Specific Time</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Keep them guessing until a planned countdown time (e.g. 8:00 PM birthday toast).
                </p>
              </label>
            </div>

            {surpriseConfig.revealOption !== 'keep_anonymous' && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Your Real Name (To reveal at unboxing)
                    </label>
                    <input
                      id="surprise-sender-realname-input"
                      type="text"
                      placeholder="e.g. David Nshimiyimana"
                      value={surpriseConfig.senderRealName || ''}
                      onChange={(e) => updateSurpriseConfig({ senderRealName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-amber-300 text-sm focus:ring-2 focus:ring-amber-200 outline-hidden bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Your Contact (Optional, for recipient reply)
                    </label>
                    <input
                      id="surprise-sender-realphone-input"
                      type="tel"
                      placeholder="+250 788 123 456"
                      value={surpriseConfig.senderRealPhone || ''}
                      onChange={(e) => updateSurpriseConfig({ senderRealPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-amber-300 text-sm focus:ring-2 focus:ring-amber-200 outline-hidden bg-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 6: Luxury Gift Wrapping Style */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-rose-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  6. Luxury Gift Packaging & Ribbon
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowWrappingDetails(!showWrappingDetails)}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <span>{showWrappingDetails ? 'Collapse styles' : 'View styles'}</span>
                {showWrappingDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showWrappingDetails && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GIFT_WRAPPING_OPTIONS.map(wrap => {
                  const isSelected = surpriseConfig.giftWrappingStyle === wrap.id;
                  return (
                    <div
                      key={wrap.id}
                      id={`wrapping-option-${wrap.id}`}
                      onClick={() => updateSurpriseConfig({ giftWrappingStyle: wrap.id })}
                      className={`p-3 rounded-xl border cursor-pointer flex gap-3 transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-200 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={wrap.image}
                        alt={wrap.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-xs text-slate-900 truncate">
                            {wrap.name}
                          </span>
                          <span className="font-bold text-xs text-rose-600 shrink-0">
                            +{formatRWF(wrap.price)}
                          </span>
                        </div>
                        <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 mt-0.5">
                          {wrap.badge}
                        </span>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {wrap.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 self-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 7: Celebration Add-Ons */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                7. Make it Extra Special (Optional Add-ons)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SURPRISE_ADDONS.map(addon => {
                const isSelected = (surpriseConfig.selectedAddOns || []).includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    id={`addon-item-${addon.id}`}
                    onClick={() => handleAddOnToggle(addon.id)}
                    className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between gap-2 transition-all ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/50 ring-1 ring-rose-300'
                        : 'border-slate-200 bg-white hover:border-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        isSelected ? 'bg-rose-500 border-rose-500 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-800 truncate">
                          {addon.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {addon.description}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-rose-600 shrink-0">
                      +{formatRWF(addon.price)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
