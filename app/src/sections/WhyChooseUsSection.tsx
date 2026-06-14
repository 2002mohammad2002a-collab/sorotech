import { ShieldCheck, Sparkles, Activity } from 'lucide-react';

export default function WhyChooseUsSection() {
  const features = [
    { icon: ShieldCheck, title: 'الضمان المصنعي الحقيقي الأطول', desc: 'لأننا نثق بمنتجاتنا وخطوط إنتاجنا المتطورة، نوفر لك أطول فترة ضمان حقيقية مدعومة بقطع غيار أصلية متوفرة دائماً.' },
    { icon: Sparkles, title: 'هندسة مخصصة للشبكة المحلية', desc: 'عواكسنا وبطارياتنا مصممة ومبرمجة لتتحمل تقلبات التيار الكهربائي الحادة والظروف المناخية القاسية في بيئتنا.' },
    { icon: Activity, title: 'دعم فني وصيانة فورية', desc: 'مهندسون متخصصون متاحون لخدمتك في فروعنا ومستعدون لتقديم الاستشارات الفنية وحل المشكلات في أسرع وقت.' }
  ];

  return (
    <section id="about" className="py-24 bg-white text-zinc-950">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="space-y-4 text-center md:text-right">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mx-auto md:mx-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-zinc-950 tracking-tight">{feat.title}</h3>
                <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-medium">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}