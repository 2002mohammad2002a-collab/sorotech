import React, { useState } from 'react';

export default function SolarDayNightAmpCalculator() {
  const [dayAmperes, setDayAmperes] = useState<number>(5);
  const [nightAmperes, setNightAmperes] = useState<number>(2);
  
  // 🟢 تحويل حالة الألواح إلى نصية نقية لمنع فرض الرقم 100 أثناء الكتابة والمسح
  const [panelInput, setPanelInput] = useState<string>('550');

  const calculateResults = () => {
    // تحويل الأمبير إلى واط على جهد الشبكة 220 فولت للحسابات الفنية
    const dayWatts = Math.round(dayAmperes * 220);
    const nightWatts = Math.round(nightAmperes * 220);

    // 1. حساب الإنفيرتر بناءً على الحمل الأكبر مع عامل أمان 25%
    const maxInstantWatts = Math.max(dayWatts, nightWatts);
    const requiredInverterKw = (maxInstantWatts * 1.25) / 1000;
    
    const availableInverters = [1.6, 3.2, 4, 6, 8, 11];
    let matchedInverter = availableInverters.find(kw => kw >= requiredInverterKw) || 11;
    
    const systemVoltage = matchedInverter >= 4 ? 48 : 24;
    
    // 🛡️ حماية الحسابات: إذا قام المستخدم بمسح الحقل تماماً، نعتمد 550 واط خلف الكواليس رياضياً لمنع القسمة على صفر
    const effectivePanelWatts = panelInput === '' || Number(panelInput) <= 0 ? 550 : Number(panelInput);

    // 2. حساب البطارية المقترحة
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

    // 3. حساب الألواح بناءً على القيمة الآمنة خلف الكواليس
    const minPanels = Math.ceil(((dayWatts * 4.5 + ecoBattery.wh * 0.6) / 4.5) / effectivePanelWatts) || 0;
    let idealPanels = Math.ceil(((dayWatts * 4.5 + proBattery.wh * 0.9) / 4.5) / effectivePanelWatts) || 0;
    
    if (idealPanels <= minPanels) {
      idealPanels = minPanels + 2;
    }

    return {
      dayWatts,
      nightWatts,
      inverterKw: matchedInverter,
      systemVoltage,
      ecoBattery: ecoBattery.label,
      proBattery: proBattery.label,
      minPanels,
      idealPanels
    };
  };

  const results = calculateResults();

  return (
    <div className="space-y-6 bg-slate-900/95 p-6 md:p-8 rounded-2xl border border-red-600/30 max-w-4xl mx-auto shadow-2xl text-right" dir="rtl">
      
      <div className="border-b border-slate-800 pb-3 text-center">
        <h2 className="text-xl font-black text-white">🧮 حاسبة الأحمال المباشرة بالأمبير (نهاري / ليلي)</h2>
        <p className="text-xs text-slate-400 mt-1">أدخل الأمبير المطلوب تشغيله مباشرة للحصول على المواصفات الهندسية للمنظومة</p>
      </div>

      {/* حقول الإدخال للأحمال والألواح */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* الأحمال النهارية */}
        <div className="flex flex-col bg-slate-950 p-4 rounded-xl border border-slate-800">
          <label className="block text-xs font-bold text-slate-300 mb-2">☀️ الأحمال النهارية المطلوبة:</label>
          <div className="relative flex items-center">
            <input
              type="text"
              inputMode="decimal"
              value={dayAmperes > 0 ? dayAmperes : ''}
              placeholder="0"
              onChange={(e) => {
                const textValue = e.target.value.replace(/[^0-9.]/g, '');
                setDayAmperes(textValue === '' || textValue === '.' ? 0 : Number(textValue));
              }}
              className="w-full bg-slate-900 text-white text-base p-2.5 rounded-lg border border-slate-700 outline-none focus:border-red-500 text-center font-bold"
            />
            <span className="absolute left-3 text-xs text-slate-500 pointer-events-none">Amp</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-2 text-center">تعادل تقريباً: <strong className="text-white">{results.dayWatts} واط</strong></span>
        </div>

        {/* الأحمال الليلية */}
        <div className="flex flex-col bg-slate-950 p-4 rounded-xl border border-slate-800">
          <label className="block text-xs font-bold text-yellow-500 mb-2">🌙 الأحمال الليلية المطلوبة:</label>
          <div className="relative flex items-center">
            <input
              type="text"
              inputMode="decimal"
              value={nightAmperes > 0 ? nightAmperes : ''}
              placeholder="0"
              onChange={(e) => {
                const textValue = e.target.value.replace(/[^0-9.]/g, '');
                setNightAmperes(textValue === '' || textValue === '.' ? 0 : Number(textValue));
              }}
              className="w-full bg-slate-900 text-white text-base p-2.5 rounded-lg border border-slate-700 outline-none focus:border-red-500 text-center font-bold"
            />
            <span className="absolute left-3 text-xs text-slate-500 pointer-events-none">Amp</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-2 text-center">تعادل تقريباً: <strong className="text-yellow-500">{results.nightWatts} واط</strong></span>
        </div>

        {/* 🟢 حقل استطاعة اللوح بعد الإصلاح الجذري للمشكلة الموضحة في الفيديو */}
        <div className="flex flex-col bg-slate-950 p-4 rounded-xl border border-slate-800 justify-center">
          <label className="block text-xs font-bold text-slate-400 mb-2">☀️ استطاعة اللوح الشمسي:</label>
          <div className="relative flex items-center">
            <input
              type="text"
              inputMode="numeric"
              value={panelInput}
              placeholder="550"
              onChange={(e) => {
                // تصفية المدخلات للأرقام فقط لإنهاء دمج الـ 100 تلقائياً
                const textValue = e.target.value.replace(/[^0-9]/g, '');
                setPanelInput(textValue);
              }}
              onFocus={() => {
                // تفريغ تلقائي عند النقر إذا كان يحتوي على القيمة الافتراضية تسهيلاً للمستخدم
                if (panelInput === '550' || panelInput === '100') {
                  setPanelInput('');
                }
              }}
              className="w-full bg-slate-900 text-white text-xs p-2 rounded-lg border border-slate-700 outline-none focus:border-red-500 text-center font-bold"
            />
            <span className="absolute left-3 text-[10px] text-slate-500 pointer-events-none">W</span>
          </div>
        </div>

      </div>

      {/* عرض المنظومات المقترحة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-b from-slate-950 to-slate-900 p-5 rounded-xl border border-yellow-600/30 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-yellow-500 border-b border-slate-800 pb-2 mb-3">📉 المنظومة الاقتصادية المقترحة</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li>🔌 قدرة العاكس المطلوبة: <span className="text-white font-black text-sm">SOROTECH {results.inverterKw} kW</span></li>
              <li>🔋 نظام تخزين البطاريات المتاح: <span className="text-yellow-400 font-bold">{results.ecoBattery}</span></li>
              <li>☀️ الحد الأدنى للألواح الشمسيّة: <span className="text-white font-bold">{results.minPanels} ألواح</span></li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-b from-slate-950 to-red-950/10 p-5 rounded-xl border border-emerald-600/30 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-emerald-400 border-b border-slate-800 pb-2 mb-3">⭐ المنظومة الاحترافية المقترحة</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li>🔌 قدرة العاكس المطلوبة: <span className="text-white font-black text-sm">SOROTECH {results.inverterKw} kW</span></li>
              <li>🔋 نظام تخزين البطاريات المتاح: <span className="text-emerald-400 font-bold">{results.proBattery}</span></li>
              <li>☀️ العدد المثالي للألواح الشمسيّة: <span className="text-white font-bold">{results.idealPanels} ألواح</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* إرشادات التشغيل الفنية */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-right space-y-3">
        <h3 className="text-sm font-bold text-red-500 border-b border-slate-800 pb-2 flex items-center gap-2">🛠️ إرشادات التشغيل وإدارة الطاقة اللحظية:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="space-y-2">
            <p className="font-semibold text-white">1. التوزيع الزمني للأحمال (Load Management):</p>
            <p className="text-slate-400 leading-relaxed">• ينصح بجدولة الأحمال الثقيلة كالغسالة والسخان في منتصف النهار للاستفادة الكاملة من ذروة إنتاج الألواح.</p>
            <p className="text-slate-400 leading-relaxed">• احرص على تشغيل الأجهزة الكبيرة تتابعياً لتفادي تراكم تيار البدء النبضي وافصل الأحمال غير الضرورية ليلاً.</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-white">2. كفاءة الربط وحماية الدوائر الحساسة:</p>
            <p className="text-slate-400 leading-relaxed">• تأكد من إحكام ربط نقاط اتصال الكابلات لمنع نشوء مقاومة حرارية تتسبب في ضياع الاستطاعة اللحظية.</p>
            <p className="text-slate-400 leading-relaxed">• حافظ على بيئة جيدة التهوية للانفيرتر لضمان عمل مراوح التبريد بكفاءة وحماية منظم الشحن الذكي.</p>
          </div>
        </div>
      </div>

      {/* زر إرسال التقرير عبر واتساب */}
      <div className="text-center mt-1">
        <button 
          type="button"
          onClick={() => {
            const currentPanelText = panelInput === '' ? '550' : panelInput;
            const message = `مرحباً سوروتك، قمت بحساب أحمالي المباشرة بالأمبير عبر حاسبتكم:\n- الأحمال النهارية: ${dayAmperes}A (${results.dayWatts}W).\n- الأحمال الليلية: ${nightAmperes}A (${results.nightWatts}W).\n- استطاعة اللوح: ${currentPanelText}W.\n\nنتائج المنظومات المقترحة:\n1- الاقتصادية: عاكس ${results.inverterKw}kW، بطارية ${results.ecoBattery}، وعدد ${results.minPanels} ألواح.\n2- الاحترافية: عاكس ${results.inverterKw}kW، بطارية ${results.proBattery}، وعدد ${results.idealPanels} ألواح.`;
            window.open(`https://wa.me/963966299727?text=${encodeURIComponent(message)}`, '_blank');
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg text-sm md:text-base active:scale-[0.98]"
        >
          إرسال تقرير الأحمال (أمبير) عبر WhatsApp 💬
        </button>
      </div>
    </div>
  );
}