import Navigation from '@/sections/Navigation';
import HeroSection from '@/sections/HeroSection';
import ProductsSection from '@/sections/ProductsSection';
import WhyChooseUsSection from '@/sections/WhyChooseUsSection';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-right font-sans" dir="rtl">
      {/* شريط التنقل العلوي الذكي الذي يحتوي على الشعار الجديد */}
      <Navigation />
      
      <main>
        {/* الواجهة الرئيسية الفاخرة بالخلفية السوداء (مستقبل الطاقة الكهروضوئية) */}
        <HeroSection />
        
        {/* قسم المنتجات والمواصفات الفنية للبطاريات والعواكس */}
        <ProductsSection />
        
        {/* قسم "لماذا نحن" (لماذا سوروتك) الذي كان مختفياً */}
        <WhyChooseUsSection />
        
        {/* قسم اتصل بنا للتواصل المباشر */}
        <ContactSection />
      </main>
      
      {/* ذيل الصفحة السفلي */}
      <Footer />
    </div>
  );
}

export default App;