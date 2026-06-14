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
        <a 
          href="#products" 
          className="inline-block bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-colors"
        >
          تصفح المنتجات
        </a>
      </div>
    </section>
  );
}