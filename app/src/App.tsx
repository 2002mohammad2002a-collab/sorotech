import { useState, useEffect } from 'react';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ProductsSection from './sections/ProductsSection'; 
import WhyChooseUsSection from './sections/WhyChooseUsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

// ==========================================
// ⚡ مكون حاسبة الأحمال المخصصة بالأمبير (ساعات وجهد يدوي)
// ==========================================
function SolarFastCalculator() {
  // استخدام النصوص للحالات لتجنب مشاكل الفاصلة العشرية أثناء الكتابة
  const [dayAmperes, setDayAmperes] = useState<string>('5');
  const [nightAmperes, setNightAmperes] = useState<string>('2');
  
  // ساعات تشغيل يدوية بالكامل
  const [dayHours, setDayHours] = useState<string>('8'); 
  const [nightHours, setNightHours] = useState<string>('6');

  const [peakSunHours, setPeakSunHours] = useState<string>('4.5');
  const [panelWatts, setPanelWatts] = useState<string>('550');
  
  // جهد النظام يحدده المستخدم يدوياً بالضغط على الأزرار
  const [systemVoltage, setSystemVoltage] = useState<number>(24); 

  const calculateResults = () => {
    const dAmperes = parseFloat(dayAmperes) || 0;
    const nAmperes = parseFloat(nightAmperes) || 0;
    const dHours = parseFloat(dayHours) || 0;
    const nHours = parseFloat(nightHours) || 0;
    const pSunHours = parseFloat(peakSunHours) || 0;
    const effectivePanelWatts = panelWatts === '' || Number(panelWatts) <= 0 ? 550 : Number(panelWatts);

    // تحويل الأمبير إلى واط (على جهد شبكة 220 فولت)
    const dayWatts = Math.round(dAmperes * 220);
    const nightWatts = Math.round(nAmperes * 220);

    // 1. حساب العاكس المطلوب بناءً على الحمل الأقصى + 25% عامل أمان
    const maxInstantWatts = Math.max(dayWatts, nightWatts);
    const requiredInverterKw = (maxInstantWatts * 1.25) / 1000;
    
    const availableInverters = [1.6, 3.2, 4, 6, 8, 11];
    let matchedInverter = availableInverters.find(kw => kw >= requiredInverterKw) || 11;
    
    // التوصية الهندسية المثالية للجهد حسب قدرة العاكس
    let recommendedVoltage = matchedInverter >= 4 ? 48 : 24;

    // 2. حساب سعة بطارية الليثيوم بناءً على ساعات الليل اليدوية وعمق تفريغ 85%
    const dodFactor = 0.85;
    const requiredWh = (nightWatts * nHours) / dodFactor;
    
    let batteryLabel = '';
    let batteryWh = 0;

    if (systemVoltage === 24) {
      if (requiredWh <= 2400) { batteryLabel = '24V - 100Ah (2.4 kWh)'; batteryWh = 2400; }
      else if (requiredWh <= 4800) { batteryLabel = '24V - 200Ah (4.8 kWh)'; batteryWh = 4800; }
      else { batteryLabel = '24V - 300Ah (7.2 kWh)'; batteryWh = 7200; }
    } else {
      if (requiredWh <= 4800) { batteryLabel = '48V - 100Ah (4.8 kWh)'; batteryWh = 4800; }
      else if (requiredWh <= 9600) { batteryLabel = '48V - 200Ah (9.6 kWh)'; batteryWh = 9600; }
      else { batteryLabel = '48V - 300Ah (14.4 kWh)'; batteryWh = 14400; }
    }

    // 3. حساب عدد الألواح المطلوبة لتغطية الاستهلاك الكلي وشحن البطارية المختارة
    const activeSunHours = pSunHours > 0 ? pSunHours : 4.5;
    const efficiencyFactor = 0.75; 

    const totalDayEnergyWh = dayWatts * dHours; 
    const generatedWhPerPanel = effectivePanelWatts * activeSunHours * efficiencyFactor;
    const totalRequiredEnergyWh = totalDayEnergyWh + batteryWh;

    let requiredPanels = Math.ceil(totalRequiredEnergyWh / generatedWhPerPanel) || 0;
    
    // موازنة السلاسل (Strings) تلقائياً بجعل العدد زوجي في أنظمة 48 فولت لسهولة التوصيل بالتوازي
    if (systemVoltage === 48 && requiredPanels % 2 !== 0 && requiredPanels > 0) {
      requiredPanels += 1;
    }

    return {
      dayWatts,
      nightWatts,
      inverterKw: matchedInverter,
      batteryLabel,
      requiredPanels,
      activeSunHours,
      recommendedVoltage,
      dHours,
      nHours
    };
  };

  const results = calculateResults();

  return (
    <div className="space-y-6 bg-slate-900/95 p-6 md:p-8 rounded-2xl border border-red-600/30 max-w-4xl mx-auto shadow-2xl text-right my-2" dir="rtl">
      <div className="border-b border-slate-800 pb-3 text-center">
        <h2 className="text-lg font-black text-white">⚡ حاسبة الأحمال المخصصة (ساعات وجهد يدوي)</h2>
        <p className="text-xs text-slate-400 mt-1">حدد الأحمال وساعات التشغيل الفعلي وجهد النظام للحصول على تقرير هندسي فوري</p>
      </div>

      {/* قسم المدخلات: أمبير وساعات التشغيل */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* التشغيل النهاري */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">☀️ التشغيل النهاري:</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">الأمبير المطلوب:</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="decimal"
                  value={dayAmperes}
                  placeholder="0"
                  onChange={(e) => setDayAmperes(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="w-full bg-slate-900 text-white text-sm p-2 rounded-lg border border-slate-700 outline-none focus:border-red-500 text-center font-bold"
                />
                <span className="absolute left-2 text-[10px] text-slate-500">A</span>
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">ساعات التشغيل:</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  value={dayHours}
                  placeholder="8"
                  onChange={(e) => setDayHours(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full bg-slate-900 text-white text-sm p-2 rounded-lg border border-slate-700 outline-none focus:border-red-500 text-center font-bold"
                />
                <span className="absolute left-2 text-[10px] text-slate-500">ساعة</span>
              </div>
            </div>
          </div>
          <div className="text-center text-[11px] text-slate-500 pt-1">
            الاستهلاك اللحظي: <strong className="text-white">{results.dayWatts} واط</strong>
          </div>
        </div>

        {/* التشغيل الليلي */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-yellow-500 border-b border-slate-800 pb-2">🌙 التشغيل الليلي (على البطارية):</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">الأمبير المطلوب:</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="decimal"
                  value={nightAmperes}
                  placeholder="0"
                  onChange={(e) => setNightAmperes(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="w-full bg-slate-900 text-white text-sm p-2 rounded-lg border border-slate-700 outline-none focus:border-red-500 text-center font-bold"
                />
                <span className="absolute left-2 text-[10px] text-slate-500">A</span>
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">ساعات التشغيل:</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  value={nightHours}
                  placeholder="6"
                  onChange={(e) => setNightHours(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full bg-slate-900 text-white text-sm p-2 rounded-lg border border-slate-700 outline-none focus:border-red-500 text-center font-bold"
                />
                <span className="absolute left-2 text-[10px] text-slate-500">ساعة</span>
              </div>
            </div>
          </div>
          <div className="text-center text-[11px] text-slate-500 pt-1">
            الاستهلاك اللحظي: <strong className="text-yellow-500">{results.nightWatts} واط</strong>
          </div>
        </div>

      </div>

      {/* قسم إعدادات الألواح والتحكم اليدوي بجهد النظام */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2">☀️ استطاعة اللوح الشمسي:</label>
          <div className="relative flex items-center">
            <input
              type="text"
              inputMode="numeric"
              value={panelWatts}
              placeholder="550"
              onChange={(e) => setPanelWatts(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full bg-slate-900 text-white text-sm p-2.5 rounded-lg border border-slate-700 outline-none focus:border-red-500 text-center font-bold"
            />
            <span className="absolute left-3 text-xs text-slate-500">Watt</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-orange-400 mb-2">🔆 ساعات الذروة الشمسية:</label>
          <div className="relative flex items-center">
            <input
              type="text"
              inputMode="decimal"
              value={peakSunHours}
              placeholder="4.5"
              onChange={(e) => setPeakSunHours(e.target.value.replace(/[^0-9.]/g, ''))}
              className="w-full bg-slate-900 text-white text-sm p-2.5 rounded-lg border border-slate-700 outline-none focus:border-orange-500 text-center font-bold"
            />
            <span className="absolute left-3 text-xs text-slate-500">ساعة</span>
          </div>
        </div>

        {/* أزرار اختيار الجهد اليدوي */}
        <div className="flex flex-col justify-between">
          <label className="block text-xs font-bold text-cyan-400 mb-2">🔋 جهد نظام البطارية المطلوب:</label>
          <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-slate-700 h-[44px] items-center">
            <button
              type="button"
              onClick={() => setSystemVoltage(24)}
              className={`h-full text-xs font-black rounded-lg transition-all ${
                systemVoltage === 24
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              منظومة 24 فولت
            </button>
            <button
              type="button"
              onClick={() => setSystemVoltage(48)}
              className={`h-full text-xs font-black rounded-lg transition-all ${
                systemVoltage === 48
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              منظومة 48 فولت
            </button>
          </div>
        </div>

      </div>

      {/* كرت النتيجة النهائية المخصصة المتكاملة */}
      <div className="bg-gradient-to-b from-slate-950 to-slate-900 p-6 rounded-xl border border-cyan-500/30 shadow-xl">
        <h3 className="text-sm font-black text-cyan-400 border-b border-slate-800 pb-2 mb-4 text-center">🛠️ مواصفات المنظومة المخصصة المتكاملة</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80">
            <span className="block text-[11px] text-slate-400 mb-1">🔌 عاكس الطاقة المقترح:</span>
            <strong className="text-base text-white">SOROTECH {results.inverterKw} kW</strong>
            <span className="block text-[10px] text-slate-500 mt-1">متوافق مع نظام {systemVoltage}V</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80">
            <span className="block text-[11px] text-slate-400 mb-1">🔋 بنك بطاريات الليثيوم:</span>
            <strong className="text-base text-cyan-400">{results.batteryLabel}</strong>
            <span className="block text-[10px] text-slate-500 mt-1">حسب تشغيل ليل {results.nHours} س</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80">
            <span className="block text-[11px] text-slate-400 mb-1">☀️ عدد ألواح الطاقة الشمسية:</span>
            <strong className="text-base text-white">{results.requiredPanels} ألواح</strong>
            <span className="block text-[10px] text-slate-500 mt-1">باستطاعة لوح {panelWatts || '550'}W</span>
          </div>

        </div>

        {/* تنبيه هندسي تلقائي ذكي عند تعارض القدرة مع الجهد المختار */}
        {systemVoltage !== results.recommendedVoltage && (
          <div className="mt-4 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-center text-[11px] text-amber-400">
            💡 ملاحظة هندسية: اختيارك لمنظومة {systemVoltage}V يعمل بشكل صحيح، ولكن هندسياً قدرة هذا العاكس تفضل العمل على نظام {results.recommendedVoltage}V لراحة ورفع كفاءة سحب التيار.
          </div>
        )}
      </div>

      {/* زر إرسال التقرير النهائي عبر واتساب */}
      <div className="text-center mt-1">
        <button 
          type="button"
          onClick={() => {
            const message = `مرحباً سوروتك، تقرير تفصيلي لمنظومة طاقة شمسية مخصصة:\n- حمل النهار: ${dayAmperes}A لـمدة ${results.dHours} ساعات.\n- حمل الليل: ${nightAmperes}A لـمدة ${results.nHours} ساعات.\n- جهد البطارية المختار يدوياً: ${systemVoltage}V.\n- ساعات الذروة الشمسية: ${results.activeSunHours} ساعة.\n\nالمكونات المصممة حسب الطلب:\n1- عاكس: SOROTECH ${results.inverterKw}kW (${systemVoltage}V).\n2- بطارية ليثيوم: ${results.batteryLabel}.\n3- الألواح الشمسية: عدد ${results.requiredPanels} ألواح بحجم ${panelWatts || '550'}W.`;
            window.open(`https://wa.me/963966299727?text=${encodeURIComponent(message)}`, '_blank');
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all text-xs active:scale-[0.98] font-black"
        >
          إرسال تقرير المنظومة المخصصة عبر WhatsApp 💬
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 🚀 المكون الرئيسي للصفحة (بعد حذف الحاسبة التفصيلية وتوسيط الواجهة)
// ==========================================
export default function App() {
  const [showFastCalc, setShowFastCalc] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#fast-calc') {
        setShowFastCalc(true);
        setTimeout(() => {
          document.getElementById('fast-calc')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    };

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

        <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
          
          {/* حاوية التحكم بالحاسبة المتبقية متموضعة وممركزة بشكل متناسق في المنتصف */}
          <div className="flex flex-col gap-6 justify-center items-center max-w-2xl mx-auto">
            
            <div id="fast-calc" className="w-full bg-slate-900/20 p-6 rounded-2xl border border-slate-900/80 shadow-md scroll-mt-20 flex flex-col justify-between text-center">
              <div className="mb-6">
                <h2 className="text-lg font-black text-red-500">⚡ حاسبة الأحمال المخصصة بالأمبير</h2>
                <p className="text-xs text-slate-400 mt-2">احسب منظومتك فوراً وبدقة بناءً على ساعات التشغيل اليدوية وجهد النظام</p>
              </div>
              
              <div className="w-full">
                <button
                  onClick={() => setShowFastCalc(!showFastCalc)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2 text-xs md:text-sm font-black"
                >
                  <span>{showFastCalc ? '❌ إغلاق الحاسبة المخصصة' : '🔌 فتح حاسبة الأمبير والساعات'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* عرض الحاسبة المخصصة المحدثة عند النقر على الزر */}
          {showFastCalc && (
            <div className="animate-fadeIn w-full">
              <SolarFastCalculator />
            </div>
          )}

        </div>

        {/* الأقسام الثابتة للموقع */}
        <ProductsSection />
        <WhyChooseUsSection />
        <ContactSection />
      </main>

      {/* ذيل الصفحة الفوتر */}
      <Footer />
    </div>
  );
}