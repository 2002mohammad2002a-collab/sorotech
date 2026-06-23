import { motion } from 'framer-motion';
import { ArrowLeft, Calculator } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden" dir="rtl">
      
      {/* حاوية الصورة الخلفية مع تأثير تكبير بسيط لمنح عمق بVisual */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      >
        {/* طبقة تعتيم متدرجة لضمان تباين عالي واحترافي للنصوص */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* المحتوى النصي المعزز بالحركات */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        
        {/* اسم الشركة العلوي */}
        <motion.span 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-red-500 font-black tracking-widest text-xs md:text-sm uppercase mb-4 block"
        >
          SOROTECH SYRIA
        </motion.span>
        
        {/* العنوان الرئيسي للمنصة */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight select-none"
        >
          مستقبل الطاقة المتجددة<br />
          <span className="text-red-600">بأيدي مصنعية سورية</span>
        </motion.h1>

        {/* الوصف المختصر */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-zinc-300 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        >
          نحن فخورون بتقديم الجيل الأحدث من أنظمة تخزين الطاقة الذكية وعواكس الطاقة الهجينة.
        </motion.p>

        {/* حاوية الأزرار - مرنة (أفقية على الكمبيوتر وعمودية على الجوال) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto"
        >
          {/* زر تصفح المنتجات الكتالوج */}
          <a 
            href="#products" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 active:scale-98 group text-center"
          >
            <span>تصفح كتالوج المنتجات</span>
            {/* أيقونة السهم تتحرك للتحفيز على الضغط */}
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 shrink-0" />
          </a>

          {/* زر الحاسبة السريعة المباشر */}
          <a 
            href="#fast-calc" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/15 transition-all border border-white/10 backdrop-blur-md active:scale-98 text-center"
          >
            <Calculator className="w-5 h-5 text-red-500 shrink-0" />
            <span>احسب أحمال منظومتك الآن</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}