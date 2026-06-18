import React, { useState } from 'react';

interface Appliance {
  id: string;
  name: string;
  defaultWatts: number;
  count: number;
}

export default function SolarCalculator() {
  const [calcUnit, setCalcUnit] = useState<'amp' | 'watt'>('amp');
  const [panelWatts, setPanelWatts] = useState<number>(550);
  
  // خيارات تشغيل الأحمال لحظياً في الليل
  const [runFridgeAtNight, setRunFridgeAtNight] = useState<boolean>(false);
  const [runACAtNight, setRunACAtNight] = useState<boolean>(false);
  const [runFanAtNight, setRunFanAtNight] = useState<boolean>(false);

  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: '1', name: 'إنارة منزلية وشواحن', defaultWatts: 100, count: 0 },
    { id: '2', name: 'شاشة تلفزيون مع رسيفر', defaultWatts: 120, count: 0 },
    { id: '3', name: 'براد منزلي (انفيرتر أو عادي)', defaultWatts: 250, count: 0 },
    { id: '4', name: 'مروحة تبريد', defaultWatts: 60, count: 0 },
    { id: '5', name: 'مكيف (1 طن إنفيرتر)', defaultWatts: 1100, count: 0 },
    { id: '6', name: 'غسالة ملابس', defaultWatts: 500, count: 0 },
  ]);

  // ⚡ الـ State السحرية لحل مشكلة الكتابة الحرة (تخزن النصوص كما يكتبها المستخدم تماماً دون تعديل دائري)
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const updateValue = (id: string, field: 'count' | 'defaultWatts', value: number) => {
    setAppliances(appliances.map(app => app.id === id ? { ...app, [field]: value } : app));
  };

  const calculateResults = () => {
    let totalPeakWatts = 0; 
    let nightInstantWatts = 0; 

    if (!appliances || appliances.length === 0) {
      return {
        peakWatts: 0, peakAmperes: '0.0', nightInstantWatts: 0, nightInstantAmperes: '0.0',
        inverterKw: 1.6, systemVoltage: 24, ecoBattery: '24V - 100Ah', proBattery: '24V - 100Ah',
        minPanels: 0, idealPanels: 0
      };
    }

    appliances.forEach(app => {
      const applianceTotalPower = (app.defaultWatts || 0) * (app.count || 0);
      totalPeakWatts += applianceTotalPower;
      
      if (app.id === '1' || app.id === '2') {
        nightInstantWatts += applianceTotalPower;
      }
      
      if (app.id === '3' && runFridgeAtNight) {
        nightInstantWatts += applianceTotalPower; 
      }

      if (app.id === '4' && runFanAtNight) {
        nightInstantWatts += applianceTotalPower;
      }

      if (app.id === '5' && runACAtNight) {
        nightInstantWatts += applianceTotalPower;
      }
    });

    const peakAmperes = (totalPeakWatts / 220).toFixed(1);
    const nightInstantAmperes = (nightInstantWatts / 220).toFixed(1);
    
    const requiredInverterKw = (totalPeakWatts * 1.25) / 1000; 
    const availableInverters = [1.6, 3.2, 4, 6, 8, 11];
    
    let matchedInverter = availableInverters.find(kw => kw >= requiredInverterKw) || 11;
    const systemVoltage = matchedInverter >= 4 ? 48 : 24;
    const effectivePanelWatts = panelWatts > 0 ? panelWatts : 550;

    const getSuggestedBattery = (instantWatts: number, type: 'eco' | 'pro') => {
      if (instantWatts <= 0) {
        return systemVoltage === 24 
          ? { label: '24V - 100Ah (2.4 kWh)', wh: 2400 } 
          : { label: '48V - 100Ah (4.8 kWh)', wh: 4800 };
      }

      const factor = type === 'eco' ? 4 : 8; 
      const targetWh = instantWatts * factor;
      const requiredAh = targetWh / systemVoltage;

      if (systemVoltage === 24) {
        if (requiredAh <= 100) return { label: '24V - 100Ah (2.4 kWh)', wh: 2400 };
        if (requiredAh <= 200) return { label: '24V - 200Ah (4.8 kWh)', wh: 4800 };
        return { label: '24V - 300Ah (7.2 kWh)', wh: 7200 };
      } else {
        if (requiredAh <= 100) return { label: '48V - 100Ah (4.8 kWh)', wh: 4800 };
        if (requiredAh <= 200) return { label: '48V - 200Ah (9.6 kWh)', wh: 9600 };
        return { label: '48V - 300Ah (14.4 kWh)', wh: 14400 };
      }
    };

    const ecoBattery = getSuggestedBattery(nightInstantWatts, 'eco');
    const proBattery = getSuggestedBattery(nightInstantWatts, 'pro');

    const minPanels = Math.ceil(((totalPeakWatts * 4.5 + ecoBattery.wh * 0.6) / 4.5) / effectivePanelWatts) || 0;
    let idealPanels = Math.ceil(((totalPeakWatts * 4.5 + proBattery.wh * 0.9) / 4.5) / effectivePanelWatts) || 0;
    
    if (idealPanels <= minPanels) {
      idealPanels = minPanels + 2;
    }

    return {
      peakWatts: totalPeakWatts,
      peakAmperes,
      nightInstantWatts,
      nightInstantAmperes,
      inverterKw: matchedInverter,
      systemVoltage,
      ecoBattery: ecoBattery.label,
      proBattery: proBattery.label,
      minPanels,
      idealPanels
    };
  };

  const results = calculateResults();

  // دالة التعامل مع تغيير نوع الوحدة لتنظيف المدخلات المؤقتة منعا للتعارض
  const handleUnitChange = (unit: 'amp' | 'watt') => {
    setCalcUnit(unit);
    setInputValues({}); // تفريغ النصوص المؤقتة لإجبار النظام على إعادة القراءة النظيفة
  };

  return (
    <div className="space-y-6 bg-slate-900/95 p-6 md:p-8 rounded-2xl border border-red-600/30 max-w-4xl mx-auto shadow-2xl text-right" dir="rtl">
      
      {/* التبديل بين الواط والأمبير */}
      <div className="flex justify-center p-1 bg-slate-950 rounded-xl max-w-xs mx-auto border border-slate-800">
        <button
          type="button"
          onClick={() => handleUnitChange('amp')}
          className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${
            calcUnit === 'amp' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          الحساب بالأمبير (Amp)
        </button>
        <button
          type="button"
          onClick={() => handleUnitChange('watt')}
          className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${
            calcUnit === 'watt' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          الحساب بالواط (Watt)
        </button>
      </div>

      {/* الجدول المبسط بدون الساعات */}
      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
        {appliances.map(app => {
          // جلب القيمة النصية الحالية المكتوبة بداخل الحقل، إن لم تكن موجودة نحسبها بشكل افتراضي مرن
          const displayValue = inputValues[app.id] !== undefined 
            ? inputValues[app.id] 
            : (calcUnit === 'amp' 
                ? (app.defaultWatts > 0 ? (app.defaultWatts / 220).toFixed(1) : '') 
                : (app.defaultWatts > 0 ? app.defaultWatts.toString() : '')
              );

          return (
            <div key={app.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/50 p-3 rounded-xl items-center border border-slate-700/40">
              <span className="font-semibold text-slate-200 text-sm md:text-base">{app.name}</span>
              
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 mb-1">
                  {calcUnit === 'amp' ? 'التيار اللحظي (A)' : 'القدرة اللحظية (W)'}
                </span>
                <div className="relative flex items-center justify-center">
                  <input 
                    type="text" 
                    inputMode="decimal"
                    value={displayValue} 
                    onChange={(e) => {
                      const text = e.target.value.replace(/[^0-9.]/g, ''); // حماية المدخلات لتشمل الأرقام والفواصل فقط
                      
                      // 1. تحديث النص الظاهري فوراً في الـ State المؤقتة للسماح بالكتابة الحرة والمسح الكامل والفواصل
                      setInputValues(prev => ({ ...prev, [app.id]: text }));

                      // 2. تحديث الحسابات البرمجية الأصلية في الخلفية دون التأثير على حركة يد المستخدم في الإدخال
                      if (text === '' || text === '.') {
                        updateValue(app.id, 'defaultWatts', 0);
                        return;
                      }
                      
                      const numericValue = Number(text);
                      const watts = calcUnit === 'amp' ? Math.round(numericValue * 220) : numericValue;
                      updateValue(app.id, 'defaultWatts', watts);
                    }}
                    placeholder="0"
                    className="w-full bg-slate-950 text-white text-sm p-1.5 rounded-lg border border-slate-700 text-center outline-none focus:border-red-500 font-bold"
                  />
                  <span className="absolute left-2 text-[10px] text-slate-500 pointer-events-none">
                    {calcUnit === 'amp' ? 'A' : 'W'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 mb-1">العدد</span>
                <input 
                  type="text"
                  inputMode="numeric"
                  value={app.count > 0 ? app.count : ''} 
                  placeholder="0"
                  onChange={(e) => {
                    const textValue = e.target.value.replace(/[^0-9]/g, '');
                    updateValue(app.id, 'count', textValue === '' ? 0 : Number(textValue));
                  }}
                  className="bg-slate-950 text-white text-sm p-1.5 rounded-lg border border-slate-700 text-center outline-none focus:border-red-500 font-bold"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* التحكم اللحظي الليلي واللوح */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 items-center">
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2">🧊 إدخال البراد ليلاً؟</label>
          <button
            type="button"
            onClick={() => setRunFridgeAtNight(!runFridgeAtNight)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
              runFridgeAtNight ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            {runFridgeAtNight ? '🟢 مدرج فوري' : '⚪ مستثنى'}
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2">🌀 إدخال المروحة ليلاً؟</label>
          <button
            type="button"
            onClick={() => setRunFanAtNight(!runFanAtNight)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
              runFanAtNight ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            {runFanAtNight ? '🟢 مدرج فوري' : '⚪ مستثنى'}
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2">❄️ إدخال المكيف ليلاً؟</label>
          <button
            type="button"
            onClick={() => setRunACAtNight(!runACAtNight)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
              runACAtNight ? 'bg-red-600 text-white border-red-500' : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            {runACAtNight ? '🟢 مدرج فوري' : '⚪ مستثنى'}
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2">☀️ استطاعة اللوح الشمسي:</label>
          <div className="relative flex items-center">
            <input
              type="text"
              inputMode="numeric"
              value={panelWatts > 0 ? panelWatts : ''}
              placeholder="550"
              onChange={(e) => {
                const textValue = e.target.value.replace(/[^0-9]/g, '');
                setPanelWatts(textValue === '' ? 0 : Number(textValue));
              }}
              className="w-full bg-slate-900 text-white text-xs p-2 rounded-lg border border-slate-700 outline-none focus:border-red-500 text-center font-bold"
            />
            <span className="absolute left-3 text-[10px] text-slate-500 pointer-events-none">W</span>
          </div>
        </div>
      </div>

      {/* 📊 ملخص الحسابات اللحظية */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-2 md:border-l border-slate-800 pb-3 md:pb-0 md:pl-4">
          <div className="text-slate-400 flex justify-between">
            <span>🔌 الاستطاعة اللحظية للأجهزة الفعالة:</span> 
            <span className="text-white font-black text-sm">{results.peakWatts} W</span>
          </div>
          <div className="text-slate-400 flex justify-between">
            <span>⚡ الأمبير اللحظي المقابل (220V):</span> 
            <span className="text-white font-black text-sm">{results.peakAmperes} A</span>
          </div>
        </div>

        <div className="space-y-2 flex flex-col justify-center">
          <div className="text-slate-400 flex justify-between">
            <span>🌙 الاستطاعة الليلية الفورية:</span> 
            <span className="text-yellow-400 font-black text-sm">{results.nightInstantWatts} W</span>
          </div>
          <div className="text-slate-400 flex justify-between">
            <span>🔋 الأمبير الليلي المقابل:</span> 
            <span className="text-yellow-400 font-black text-sm">{results.nightInstantAmperes} A</span>
          </div>
        </div>
      </div>

      {/* عرض المنظومتين المقترحتين */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-b from-slate-950 to-slate-900 p-5 rounded-xl border border-yellow-600/30 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-yellow-500 border-b border-slate-800 pb-2 mb-3">📉 المنظومة الاقتصادية</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>🔌 الانفيرتر: <span className="text-white font-black text-sm">SOROTECH {results.inverterKw} kW</span></li>
              <li>🔋 البطارية التلقائية: <span className="text-yellow-400 font-bold">{results.ecoBattery}</span></li>
              <li>☀️ عدد الألواح: <span className="text-white font-bold">{results.minPanels} ألواح</span></li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-b from-slate-950 to-red-950/10 p-5 rounded-xl border border-emerald-600/30 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-emerald-400 border-b border-slate-800 pb-2 mb-3">⭐ المنظومة الاحترافية</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>🔌 الانفيرتر: <span className="text-white font-black text-sm">SOROTECH {results.inverterKw} kW</span></li>
              <li>🔋 البطارية التلقائية: <span className="text-emerald-400 font-bold">{results.proBattery}</span></li>
              <li>☀️ عدد الألواح: <span className="text-white font-bold">{results.idealPanels} ألواح</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* زر الواتساب */}
      <div className="text-center mt-1">
        <button 
          type="button"
          onClick={() => {
            const instantFeatures = `البراد [${runFridgeAtNight ? 'مفعل' : 'ملغى'}]، المروحة [${runFanAtNight ? 'مفعل' : 'ملغى'}]، المكيف [${runACAtNight ? 'مفعل' : 'ملغى'}]`;
            const message = `مرحباً سوروتك، قمت بحساب أحمالي اللحظية الفورية عبر حاسبتكم:\n- الاستطاعة الفعالة الحالية: ${results.peakWatts}W (${results.peakAmperes}A).\n- حمل الأجهزة الليلية المحددة: ${results.nightInstantWatts}W (${results.nightInstantAmperes}A).\n- حالة النظام الفوري ليلاً: ${instantFeatures}.\n\nأرغب بالاستفسار عن أسعار المنظومات المقترحة:\n1- الاقتصادية: الانفيرتر ${results.inverterKw}kW، بطارية ${results.ecoBattery}.\n2- الاحترافية: الانفيرتر ${results.inverterKw}kW، بطارية ${results.proBattery}.`;
            window.open(`https://wa.me/963966299727?text=${encodeURIComponent(message)}`, '_blank');
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg text-sm md:text-base active:scale-[0.98]"
        >
          طلب عرض أسعار للمنظومة اللحظية عبر WhatsApp 💬
        </button>
      </div>
    </div>
  );
}