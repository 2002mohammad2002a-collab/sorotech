import { MapPin, User, Phone, Instagram, Facebook } from 'lucide-react';

// 1. نقل البيانات خارج المكون لمنع إعادة استهلاك الذاكرة وتسهيل التعديل مستقبلاً
const BRANCHES_DATA = [
  {
    city: 'فرع حلب',
    address: 'حلب – شارع القوتلي',
    managers: [
      { name: 'Ahmad Roumieh', phone: '0993 364 793', raw: '+963993364793' },
      { name: 'Omar Zaitony', phone: '0966 299 727', raw: '+963966299727' }
    ]
  },
  {
    city: 'فرع دمشق',
    address: 'دمشق - المزرعة – شارع الشلال',
    managers: [
      { name: 'Fouad Abd Alwahd', phone: '0997 160 041', raw: '+963997160041' }
    ]
  }
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-zinc-50 border-t border-zinc-200/50 text-zinc-900" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* العناوين الرئيسية */}
        <div className="text-center max-w-md mx-auto mb-16 space-y-2">
          <h2 className="text-3xl font-black tracking-tight text-zinc-950">مكاتبنا المعتمدة وفروعنا</h2>
          <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
            يسعدنا تواصلكم معنا مباشرة عبر الأرقام الرسمية التنفيذية لخدمتكم بشكل أسرع.
          </p>
        </div>

        {/* شبكة عرض الفروع */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {BRANCHES_DATA.map((branch, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-red-600 font-black text-lg mb-4">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <h3>{branch.city}</h3>
                </div>
                <p className="text-xs text-zinc-500 font-medium mb-6">{branch.address}</p>
              </div>
              
              {/* قائمة المسؤولين عن الفرع */}
              <div className="space-y-3.5 border-t border-zinc-100 pt-4">
                {branch.managers.map((m, mIdx) => (
                  <div 
                    key={mIdx} 
                    className="bg-zinc-50/60 p-3 rounded-xl border border-zinc-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                  >
                    {/* الاسم - مع الحفاظ على اتجاه النص الإنجليزي */}
                    <div className="flex items-center gap-2" dir="ltr">
                      <User className="w-4 h-4 text-zinc-400 shrink-0" />
                      <span className="text-xs font-bold text-zinc-800 tracking-wide">
                        {m.name}
                      </span>
                    </div>
                    
                    {/* رقم الهاتف - إجبار الاتجاه LTR لمنع تشوه المسافات */}
                    <a 
                      href={`tel:${m.raw}`} 
                      className="text-xs font-black text-red-600 hover:underline flex items-center gap-1.5 transition-all"
                      dir="ltr"
                    >
                      <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{m.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* منصات التواصل الاجتماعي */}
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="text-[10px] font-black text-zinc-400 tracking-wider uppercase">تابع منصاتنا الرسمية</span>
          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/sorotechsyria?igsh=dnVvdmhlcmllOHN6" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-red-600 hover:scale-105 transition-all shadow-sm"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61583754075559&mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-red-600 hover:scale-105 transition-all shadow-sm"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}