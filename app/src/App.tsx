import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import SolarCalculator from './sections/SolarCalculator';
import WhyChooseUsSection from './sections/WhyChooseUsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

// ==========================================
// ⚡ مكون حاسبة الأحمال السريعة بالأمبير
// ==========================================
function SolarFastCalculator() {
  const [dayAmperes, setDayAmperes] = useState<number>(5);
  const [nightAmperes, setNightAmperes] = useState<number>(2);
  const [panelWatts, setPanelWatts] = useState<number>(550);

  const calculateResults = () => {
    const dayWatts = Math.round(dayAmperes * 220);
    const nightWatts = Math.round(nightAmperes * 220);
    const maxInstantWatts = Math.max(dayWatts, nightWatts);
    const requiredInverterKw = (maxInstantWatts * 1.25) / 1000;
    
    const availableInverters = [1.6, 3.2, 4, 6, 8, 11];
    let matchedInverter = availableInverters.find(kw => kw >= requiredInverterKw) || 11;
    
    const systemVoltage = matchedInverter >= 4 ? 48 : 24;
    const effectivePanelWatts = panelWatts > 0 ? panelWatts : 550;

    const getSuggestedBattery = (watts: number, type: 'eco' | 'pro') => {
      if (watts <= 0) {
        return systemVoltage === 24 
          ? { label: '24V - 200Ah (4.8 kWh)', wh: 4800 } 
          : { label: '48V - 100Ah (4.8 kWh)', wh: 4800 };
      }

      const factor = type === 'eco' ? 4 : 8; 
      const targetWh = watts * factor;
      const requiredAh = targetWh / systemVoltage;

      if (systemVoltage === 24) {
        if (requiredAh <= 200) return { label: '24V - 200Ah (4.8 kWh)', wh: 4800 };
        return { label: '24V - 300Ah (7.2 kWh)', wh: 7200 };
      } else {
        if (requiredAh <= 100) return { label: '48V - 100Ah (4.8 kWh)', wh: 4800 };
        if (requiredAh <= 200) return { label: '48V - 200Ah (9.6 kWh)', wh: 9600 };
        return { label: '48V - 300Ah (14.4 kWh)', wh: 14400 };
      }
    };

    const ecoBattery = getSuggestedBattery(nightWatts, 'eco');
    const proBattery = getSuggestedBattery(nightWatts, 'pro');

    const minPanels = Math.ceil(((dayWatts * 4.5 + ecoBattery.wh * 0.6) / 4.5) / effectivePanelWatts) || 0;
    let idealPanels = Math.ceil(((dayWatts * 4.5 + proBattery.wh * 0.9) / 4.5) / effectivePanelWatts) || 0;
    
    if (idealPanels <= minPanels) {
      idealPanels = minPanels + 2;
    }

    return { dayWatts, nightWatts, inverterKw: matchedInverter, systemVoltage, ecoBattery: ecoBattery.label, proBattery: proBattery.label, minPanels, idealPanels };
  };

  const results = calculateResults();

  return (
    <div className="space-y-6 bg-slate-900/95 p-6 md:p-8 rounded-2xl border border-red-600/30 max-w-4xl mx-auto shadow-2xl text-right my-2" dir="rtl">
      <div className="border-b border-slate-800 pb-3 text-center">
        <h2 className="text-lg font-black text-white">🧮 حاسبة الأحمال السريعة بالأمبير (نهاري / ليلي)</h2>
        <p className="text-xs text-slate-400 mt-1">أدخل الأمبير المطلوب تشغيله مباشرة للحصول على المواصفات الهندسية الفورية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col bg-slate-950 p-4 rounded-xl border border-slate-800">
          <label className="block text-xs font-bold text-slate-300 mb-2">☀️ الأحمال النهارية المطلوبة:</label>
          <div className="relative flex items-center">
            <input
              type="number" step="0.1" min="0" value={dayAmperes}
              onChange={(e) => setDayAmperes(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-900 text-white text-sm p-2 rounded-lg border border-slate-700 outline-none focus:border-red-500 text-center font-bold"
            />
            <span className="absolute left-3 text-[11px] text-slate-500">Amp</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-2 text-center">تعادل: <strong className="text-white">{results.dayWatts} واط</strong></span>
        </div>

        <div className="flex flex-col bg-slate-950 p-4 rounded-xl border border-slate-800">
          <label className="block text-xs font-bold text-yellow-500 mb-2">🌙 الأحمال الليلية المطلوبة:</label>
          <div className="relative flex items-center">
            <input
              type="number" step="0.1" min="0" value={nightAmperes}
              onChange={(e) => setNightAmperes(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-900 text-white text-sm p-2 rounded-lg border border-slate-700 outline-none focus:border-red-500 text-center font-bold"
            />
            <span className="absolute left-3 text-[11px] text-slate-500">Amp</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-2 text-center">تعادل: <strong className="text-yellow-500">{results.nightWatts} واط</strong></span>
        </div>

        <div className="flex flex-col bg-slate-950 p-4 rounded-xl border border-slate-800 justify-center">
          <label className="block text-xs font-bold text-slate-300 mb-2">☀️ استطاعة اللوح الشمسي:</label>
          <div className="relative flex items-center">
            <input
              type="number" min="100" value={panelWatts}
              onChange={(e) => setPanelWatts(Math.max(100, Number(e.target.value)))}
              className="w-full bg-slate-900 text-white text-sm p-2 rounded-lg border border-slate-700 outline-none focus:border-red-500 text-center font-bold"
            />
            <span className="absolute left-3 text-[11px] text-slate-500">Watt</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-b from-slate-950 to-slate-900 p-4 rounded-xl border border-yellow-600/30">
          <h3 className="text-xs font-black text-yellow-500 border-b border-slate-800 pb-2 mb-2">📉 المنظومة الاقتصادية</h3>
          <ul className="space-y-2 text-[11px] text-slate-300">
            <li>🔌 العاكس: <span className="text-white font-black">SOROTECH {results.inverterKw} kW</span></li>
            <li>🔋 البطارية: <span className="text-yellow-400 font-bold">{results.ecoBattery}</span></li>
            <li>☀️ الألواح: <span className="text-white font-bold">{results.minPanels} ألواح</span></li>
          </ul>
        </div>
        <div className="bg-gradient-to-b from-slate-950 to-red-950/10 p-4 rounded-xl border border-emerald-600/30">
          <h3 className="text-xs font-black text-emerald-400 border-b border-slate-800 pb-2 mb-2">⭐ المنظومة الاحترافية</h3>
          <ul className="space-y-2 text-[11px] text-slate-300">
            <li>🔌 العاكس: <span className="text-white font-black">SOROTECH {results.inverterKw} kW</span></li>
            <li>🔋 البطارية: <span className="text-emerald-400 font-bold">{results.proBattery}</span></li>
            <li>☀️ الألواح: <span className="text-white font-bold">{results.idealPanels} ألواح</span></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-1">
        <button 
          type="button"
          onClick={() => {
            const message = `مرحباً سوروتك، قمت بحساب أحمالي المباشرة بالأمبير:\n- الأحمال النهارية: ${dayAmperes}A.\n- الأحمال الليلية: ${nightAmperes}A.\n\nالمنظومة المقترحة:\nعاكس ${results.inverterKw}kW، بطارية ${results.proBattery}.`;
            window.open(`https://wa.me/963935265490?text=${encodeURIComponent(message)}`, '_blank');
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all text-xs active:scale-[0.98]"
        >
          إرسال تقرير الأحمال السريعة عبر WhatsApp 💬
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 🚀 المكون الرئيسي المرتب عمودياً مع ميزة التوجيه التلقائي
// ==========================================
export default function App() {
  const [showFastCalc, setShowFastCalc] = useState(false);
  const [showDetailedCalc, setShowDetailedCalc] = useState(false);

  // مراقبة التغيير في رابط الصفحة (Hash) لفتح الحاسبة تلقائياً وتحريك الشاشة إليها
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#fast-calc') {
        setShowFastCalc(true);
        setTimeout(() => {
          document.getElementById('fast-calc')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else if (hash === '#detailed-calc') {
        setShowDetailedCalc(true);
        setTimeout(() => {
          document.getElementById('detailed-calc')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    };

    // التشغيل عند تحميل الصفحة وعند تغيير الـ Hash
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); 

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans" dir="rtl">
      {/* شريط التنقل العلوي */}
      <Navigation />

      <main>
        {/* الواجهة الرئيسية الترحيبية */}
        <HeroSection />

        <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
          
          {/* 1️⃣ القسم الأول: الحاسبة السريعة بالأمبير (تمت إضافة الـ id المربوط بالقائمة العلوبة) */}
          <div id="fast-calc" className="bg-slate-900/10 p-6 rounded-2xl border border-slate-900/60 shadow-md scroll-mt-20">
            <div className="text-center mb-4">
              <h2 className="text-lg font-black text-red-500">⚡ حاسبة الأحمال السريعة بالأمبير</h2>
              <p className="text-xs text-slate-400 mt-1">اضغط بالأسفل لفتح حساب فوري للمنظومة بناءً على أمبير التشغيل المباشر</p>
            </div>
            
            {/* زر فتح وإغلاق الحاسبة السريعة */}
            <div className="max-w-md mx-auto mb-4">
              <button
                onClick={() => setShowFastCalc(!showFastCalc)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2 text-xs md:text-sm"
              >
                <span>{showFastCalc ? '❌ إغلاق حاسبة الأمبير السريعة' : '🔌 فتح حاسبة الأمبير السريعة'}</span>
              </button>
            </div>

            {/* تظهر الحاسبة السريعة عند الكبس */}
            {showFastCalc && (
              <div className="animate-fadeIn mt-6">
                <SolarFastCalculator />
              </div>
            )}
          </div>

          {/* 🔗 خط فاصل هندسي */}
          <hr className="border-slate-900 max-w-xl mx-auto" />

          {/* 2️⃣ القسم الثاني: الحاسبة التفصيلية بالأجهزة (تمت إضافة الـ id المربوط بالقائمة العلوية) */}
          <div id="detailed-calc" className="bg-slate-900/10 p-6 rounded-2xl border border-slate-900/60 shadow-md scroll-mt-20">
            <div className="text-center mb-4">
              <h2 className="text-lg font-black text-white">⚡ حاسبة الأجهزة المنزلية التفصيلية</h2>
              <p className="text-xs text-slate-400 mt-1">اضغط بالأسفل لفتح جدول الأجهزة الكهربائية واختيار محتويات منزلك بالتفصيل</p>
            </div>

            {/* زر فتح وإغلاق الحاسبة التفصيلية */}
            <div className="max-w-md mx-auto mb-4">
              <button
                onClick={() => setShowDetailedCalc(!showDetailedCalc)}
                className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all transform active:scale-95 border border-slate-700 flex items-center justify-center gap-2 text-xs md:text-sm"
              >
                <span>{showDetailedCalc ? '❌ إغلاق حاسبة الأجهزة التفصيلية' : '📋 فتح حاسبة الأجهزة التفصيلية (جدول الأجهزة)'}</span>
              </button>
            </div>

            {/* تظهر الحاسبة التفصيلية عند الكبس */}
            {showDetailedCalc && (
              <div className="animate-fadeIn mt-6">
                <SolarCalculator />
              </div>
            )}
          </div>

        </div>

        {/* بقية أقسام الصفحة الثابتة بالأسفل */}
        <WhyChooseUsSection />
        <ContactSection />
      </main>

      {/* ذيل الصفحة الفوتر */}
      <Footer />
    </div>
  );
}