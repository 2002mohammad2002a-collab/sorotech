import { ShieldCheck, Sparkles, Activity } from 'lucide-react';

// 1. عزل البيانات خارج المكون للحفاظ على أداء مستقر وتسهيل التعديل المستقبلي
const FEATURES_DATA = [
  { 
    icon: ShieldCheck, 
    title: 'الضمان المصنعي الحقيقي الأطول', 
    desc: 'لأننا نثق بمنتجاتنا وخطوط إنتاجنا المتطورة، نوفر لك أطول فترة ضمان حقيقية مدعومة بقطع غيار أصلية متوفرة دائماً.' 
  },
  { 
    icon: Sparkles, 
    title: 'هندسة مخصصة للشبكة المحلية', 
    desc: 'عواكسنا وبطارياتنا مصممة ومبرمجة لتتحمل تقلبات التيار الكهربائي الحادة والظروف المناخية القاسية في بيئتنا.' 
  },
  { 
    icon: Activity, 
    title: 'دعم فني وصيانة فورية', 
    desc: 'مهندسون متخصصون متاحون لخدمتك في فروعنا ومستعدون لتقديم الاستشارات الفنية وحل المشكلات في أسرع وقت.' 
  }
];

export default function WhyChooseUsSection() {
  return (
    <section id="about" className="py-24 bg-white text-zinc-950" dir="rtl">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* شبكة الميزات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {FEATURES_DATA.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div 
                key={i} 
                className="group space-y-4 text-center md:text-right block"
              >
                {/* حاوية الأيقونة مع تأثير حركة سلس عند تمرير الماوس */}
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mx-auto md:mx-0 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-red-100">
                  <Icon className="w-6 h-6 transition-transform duration-300" />
                </div>
                
                {/* العنوان */}
                <h3 className="text-lg font-black text-zinc-950 tracking-tight group-hover:text-red-600 transition-colors duration-200">
                  {feat.title}
                </h3>
                
                {/* الوصف */}
                <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-medium">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}