import React, { useState, useEffect } from 'react';

export default function SolarDayNightAmpCalculator() {
  const [dayAmperes, setDayAmperes] = useState<string>('8');
  const [nightAmperes, setNightAmperes] = useState<string>('4');
  const [dayHours, setDayHours] = useState<string>('8');
  const [nightHours, setNightHours] = useState<string>('12');
  const [panelInput, setPanelInput] = useState<string>('650');
  
  // الحالة التلقائية (تتحدث بناءً على الحمل)
  const [systemVoltage, setSystemVoltage] = useState<number>(48);

  // منطق تلقائي: تحديث الجهد والإنفرتر بناءً على الحمل
  useEffect(() => {
    const nWatts = (parseFloat(nightAmperes) || 0) * 220;
    const nHours = parseFloat(nightHours) || 0;
    const requiredWh = (nWatts * nHours) / 0.85;
    
    // إذا كان الاستهلاك الليلي يتجاوز 4.8 كيلو واط ساعي، نرفع لـ 48 فولت
    setSystemVoltage(requiredWh > 4800 ? 48 : 24);
  }, [nightAmperes, nightHours]);

  const calculateResults = () => {
    const dAmperes = parseFloat(dayAmperes) || 0;
    const nAmperes = parseFloat(nightAmperes) || 0;
    const dHours = parseFloat(dayHours) || 0;
    const nHours = parseFloat(nightHours) || 0;
    const pSunHours = 4.5; // قيمة ثابتة قياسية
    const effectivePanelWatts = parseFloat(panelInput) || 650;

    const dayWatts = Math.round(dAmperes * 220);
    const nightWatts = Math.round(nAmperes * 220);

    // حساب الإنفرتر التلقائي (اختيار فئة الإنفرتر بناءً على الجهد)
    const maxInstantWatts = Math.max(dayWatts, nightWatts);
    const requiredInverterKw = (maxInstantWatts * 1.25) / 1000;
    
    let matchedInverter = systemVoltage === 48 
      ? ([4, 6, 8, 11].find(k => k >= requiredInverterKw) || 4)
      : ([1.6, 3.2].find(k => k >= requiredInverterKw) || 3.2);

    // حساب البطارية التلقائي
    const requiredWh = (nightWatts * nHours) / 0.85;
    const batteryLabel = systemVoltage === 24
      ? (requiredWh <= 2400 ? '24V - 100Ah' : (requiredWh <= 4800 ? '24V - 200Ah' : '24V - 300Ah'))
      : (requiredWh <= 4800 ? '48V - 100Ah' : (requiredWh <= 9600 ? '48V - 200Ah' : '48V - 300Ah'));

    // حساب الألواح التلقائي
    const batteryWh = systemVoltage === 24 ? (requiredWh <= 2400 ? 2400 : requiredWh <= 4800 ? 4800 : 7200) : (requiredWh <= 4800 ? 4800 : requiredWh <= 9600 ? 9600 : 14400);
    const generatedWhPerPanel = effectivePanelWatts * pSunHours * 0.75;
    let requiredPanels = Math.ceil(((dayWatts * dHours) + batteryWh) / generatedWhPerPanel) || 0;
    if (systemVoltage === 48 && requiredPanels % 2 !== 0) requiredPanels += 1;

    return { inverterKw: matchedInverter, batteryLabel, requiredPanels };
  };

  const results = calculateResults();

  return (
    <div className="space-y-6 bg-[#090d16] p-6 rounded-2xl border border-slate-800 max-w-4xl mx-auto text-right" dir="rtl">
      <h2 className="text-xl font-black text-white text-center">⚡ حاسبة الأحمال الذكية</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* مدخلات الأحمال */}
        <div className="bg-[#0d1527] p-4 rounded-xl border border-slate-800">
           <label className="text-xs text-slate-300">☀️ التشغيل النهاري (A / ساعة):</label>
           <div className="flex gap-2 mt-2">
             <input className="w-full bg-[#090d16] text-white p-2 rounded-lg border border-slate-700 text-center" value={dayAmperes} onChange={e => setDayAmperes(e.target.value.replace(/[^0-9.]/g, ''))} />
             <input className="w-full bg-[#090d16] text-white p-2 rounded-lg border border-slate-700 text-center" value={dayHours} onChange={e => setDayHours(e.target.value.replace(/[^0-9]/g, ''))} />
           </div>
        </div>
        <div className="bg-[#0d1527] p-4 rounded-xl border border-slate-800">
           <label className="text-xs text-yellow-500">🌙 التشغيل الليلي (A / ساعة):</label>
           <div className="flex gap-2 mt-2">
             <input className="w-full bg-[#090d16] text-white p-2 rounded-lg border border-slate-700 text-center" value={nightAmperes} onChange={e => setNightAmperes(e.target.value.replace(/[^0-9.]/g, ''))} />
             <input className="w-full bg-[#090d16] text-white p-2 rounded-lg border border-slate-700 text-center" value={nightHours} onChange={e => setNightHours(e.target.value.replace(/[^0-9]/g, ''))} />
           </div>
        </div>
      </div>

      {/* عرض النتائج المباشر */}
      <div className="bg-gradient-to-b from-[#0d1527] to-[#090d16] p-6 rounded-xl border border-cyan-500/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div><span className="text-[10px] text-slate-500">الإنفرتر المقترح</span><strong className="block text-white text-lg">SOROTECH {results.inverterKw} kW</strong></div>
          <div><span className="text-[10px] text-slate-500">بنك البطاريات</span><strong className="block text-cyan-400 text-lg">{results.batteryLabel}</strong></div>
          <div><span className="text-[10px] text-slate-500">عدد الألواح</span><strong className="block text-white text-lg">{results.requiredPanels} ألواح</strong></div>
        </div>
      </div>
      
      <button onClick={() => window.open(`https://wa.me/963966299727?text=${encodeURIComponent(`طلب منظومة: عاكس ${results.inverterKw}kW، بطارية ${results.batteryLabel}، ألواح ${results.requiredPanels}`)}`)} className="w-full bg-[#ca1f26] text-white font-black py-3 rounded-xl hover:bg-[#b01a20] transition-all">إرسال عبر WhatsApp 💬</button>
    </div>
  );
}