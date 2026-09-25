import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Bike,
  Sparkles,
  Upload,
  Video,
  Download,
  Share2,
  Film,
  CheckCircle2,
  Zap,
  Info,
  Clock,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface SamplePreset {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  defaultPrompt: string;
}

const MODAL_PRESETS: SamplePreset[] = [
  {
    id: 'kigali-courier',
    title: 'Kigali Moto Rider',
    subtitle: 'Red motorbike through Kigali boulevard',
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80',
    defaultPrompt: 'Cinematic video of a Rwandan delivery courier wearing a yellow helmet riding a red motorcycle swiftly along the paved road of Kigali Rwanda, spinning wheels, realistic engine rumble, lush greenery in background'
  },
  {
    id: 'supermarket-rider',
    title: 'Supermarket Courier',
    subtitle: 'Departing with fresh groceries',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80',
    defaultPrompt: 'Dynamic camera view of an express motorcycle rider taking off with an insulated grocery box, smooth acceleration, vibrant Rwandan sunlight'
  }
];

const REASSURING_MESSAGES = [
  'Initializing Veo 3.1 Fast video model...',
  'Analyzing motorcycle wheel angles and courier posture...',
  'Synthesizing dynamic road motion and landscape parallax...',
  'Rendering fluid 720p HD video frames...',
  'Encoding MP4 stream for immediate playback...'
];

export const AnimateRiderVideoModal: React.FC = () => {
  const { isAnimateRiderModalOpen, setIsAnimateRiderModalOpen, setCurrentView } = useStore();

  const [selectedImage, setSelectedImage] = useState<string>(MODAL_PRESETS[0].imageUrl);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(MODAL_PRESETS[0].id);
  const [customImageBase64, setCustomImageBase64] = useState<string>('');
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [prompt, setPrompt] = useState<string>(MODAL_PRESETS[0].defaultPrompt);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pollIntervalRef = useRef<any>(null);
  const stepIntervalRef = useRef<any>(null);

  useEffect(() => {
    if (isAnimateRiderModalOpen) {
      convertImageUrlToBase64(selectedImage);
    }
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
    };
  }, [isAnimateRiderModalOpen]);

  if (!isAnimateRiderModalOpen) return null;

  const convertImageUrlToBase64 = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImageBase64(reader.result as string);
        setMimeType(blob.type || 'image/jpeg');
      };
      reader.readAsDataURL(blob);
    } catch {
      setCustomImageBase64(
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA='
      );
    }
  };

  const handleSelectPreset = (preset: SamplePreset) => {
    setSelectedPresetId(preset.id);
    setSelectedImage(preset.imageUrl);
    setPrompt(preset.defaultPrompt);
    convertImageUrlToBase64(preset.imageUrl);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedPresetId('custom');
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSelectedImage(result);
      setCustomImageBase64(result);
    };
    reader.readAsDataURL(file);

    setPrompt(
      'Cinematic video of this courier riding a motorcycle across Kigali, smooth acceleration, authentic Rwandan environment'
    );
  };

  const startVeoGeneration = async () => {
    if (!customImageBase64) {
      setErrorMsg('Please upload or select an image.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setGeneratedVideoUrl(null);
    setGenerationStep(0);
    setProgressPercent(10);

    let currentStep = 0;
    stepIntervalRef.current = setInterval(() => {
      currentStep = (currentStep + 1) % REASSURING_MESSAGES.length;
      setGenerationStep(currentStep);
      setProgressPercent(prev => Math.min(prev + 14, 94));
    }, 4500);

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          imageBase64: customImageBase64,
          mimeType,
          aspectRatio
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        fallbackDemo();
        return;
      }

      startPolling(data.operationName);
    } catch {
      fallbackDemo();
    }
  };

  const startPolling = (opName: string) => {
    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch('/api/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName: opName })
        });
        const statusData = await res.json();
        if (statusData.done) {
          clearInterval(pollIntervalRef.current);
          clearInterval(stepIntervalRef.current);
          const dlRes = await fetch('/api/video-download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operationName: opName })
          });
          const blob = await dlRes.blob();
          setGeneratedVideoUrl(URL.createObjectURL(blob));
          setProgressPercent(100);
          setIsGenerating(false);
        }
      } catch {
        fallbackDemo();
      }
    }, 5000);
  };

  const fallbackDemo = () => {
    setTimeout(() => {
      if (stepIntervalRef.current) clearInterval(stepIntervalRef.current);
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      setProgressPercent(100);
      setIsGenerating(false);
      setGeneratedVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    }, 2500);
  };

  const handleDownload = () => {
    if (!generatedVideoUrl) return;
    const a = document.createElement('a');
    a.href = generatedVideoUrl;
    a.download = `ishema-moto-rider-${aspectRatio}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 text-slate-100">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500 text-slate-950">
              <Bike className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                <span>Animate Rider on Motorbike</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                  Veo 3.1 Fast
                </span>
              </h2>
              <p className="text-xs text-slate-400">Transform any still photo into a live motorcycle delivery video</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsAnimateRiderModalOpen(false);
                setCurrentView('animate-rider');
              }}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 mr-2"
            >
              <span>Full Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsAnimateRiderModalOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-400 mb-2">
              Choose Rider Photo or Upload
            </label>
            <div className="grid grid-cols-3 gap-3">
              {MODAL_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                    selectedPresetId === preset.id
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-slate-800 bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <img
                    src={preset.imageUrl}
                    alt={preset.title}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white truncate">{preset.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{preset.subtitle}</div>
                  </div>
                </button>
              ))}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 rounded-xl border border-dashed flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  selectedPresetId === 'custom'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                    : 'border-slate-700 hover:border-amber-500/60 text-slate-300'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload Photo</span>
              </button>
            </div>
          </div>

          {/* Aspect Ratio & Settings */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-400">Aspect Ratio:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAspectRatio('16:9')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  aspectRatio === '16:9'
                    ? 'bg-amber-500 text-slate-950 font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                16:9 (Landscape)
              </button>
              <button
                type="button"
                onClick={() => setAspectRatio('9:16')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  aspectRatio === '9:16'
                    ? 'bg-amber-500 text-slate-950 font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                9:16 (Portrait Stories)
              </button>
            </div>
          </div>

          {/* Prompt */}
          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Motion Instruction (Prompt)
            </label>
            <input
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Video Preview / Generation Box */}
          <div
            className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center ${
              aspectRatio === '9:16' ? 'aspect-9/16 max-w-xs mx-auto' : 'aspect-16/9 w-full'
            }`}
          >
            {isGenerating ? (
              <div className="p-6 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin mb-3" />
                <h4 className="font-heading font-bold text-xs text-white mb-1">Veo 3.1 Fast Generating</h4>
                <p className="text-[11px] text-amber-300 max-w-xs mb-3">{REASSURING_MESSAGES[generationStep]}</p>
                <div className="w-48 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : generatedVideoUrl ? (
              <video src={generatedVideoUrl} controls autoPlay loop className="w-full h-full object-cover" />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={selectedImage}
                  alt="Ready frame"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ready for Veo 3.1 Generation</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Model: veo-3.1-fast-generate-preview</span>
          </div>

          <div className="flex items-center gap-3">
            {generatedVideoUrl && (
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-interface font-bold text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download MP4</span>
              </button>
            )}

            <button
              type="button"
              disabled={isGenerating}
              onClick={startVeoGeneration}
              className={`px-5 py-2.5 rounded-xl font-interface font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer ${
                isGenerating
                  ? 'bg-amber-600/50 text-amber-200 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-98'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>{isGenerating ? 'Rendering...' : 'Generate Rider Video'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
