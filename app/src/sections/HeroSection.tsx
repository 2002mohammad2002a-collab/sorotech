export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* حاوية الصورة الخلفية */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      >
        {/* طبقة تعتيم لضمان تباين النصوص */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* المحتوى النصي */}
      <div className="relative z-10 text-center px-4">
        <span className="text-red-500 font-black tracking-widest text-sm uppercase mb-4 block">
          SOROTECH SYRIA
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          مستقبل الطاقة المتجددة<br />
          <span className="text-red-600">بأيدي مصنعية سورية</span>
        </h1>
        <p className="text-zinc-200 text-lg mb-8 max-w-lg mx-auto">
          نحن فخورون بتقديم الجيل الأحدث من أنظمة تخزين الطاقة الذكية وعواكس الطاقة الهجينة.
        </p>

        {/* حاوية الأزرار المرتبة عمودياً */}
        <div className="flex flex-col gap-4 max-w-xs mx-auto justify-center items-center">
          {/* زر تصفح المنتجات */}
          <a 
            href="#products" 
            className="w-full inline-block bg-red-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg text-center"
          >
            📦 تصفح كتالوج المنتجات
          </a>

          {/* زر الحاسبة السريعة أسفله مباشرة */}
          <a 
            href="#fast-calc" 
            className="w-full inline-block bg-transparent text-white px-8 py-3.5 rounded-xl font-bold hover:bg-zinc-900/60 transition-colors border border-zinc-700 text-center backdrop-blur-sm"
          >
            ⚡ احسب أحمال منظومتك الآن
          </a>
        </div>
      </div>
    </section>
  );
}