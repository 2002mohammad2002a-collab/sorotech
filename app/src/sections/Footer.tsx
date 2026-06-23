export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-500 py-12 text-xs border-t border-zinc-900" dir="rtl">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 text-center">
        
        {/* الهوية والشعار الفرعي - محاذاة لليمين في الشاشات الكبيرة */}
        <div className="flex flex-col md:text-right">
          <span className="text-sm font-black text-white tracking-wider ltr-text">
            SOROTEC SYRIA
          </span>
          <span className="text-[11px] font-medium text-zinc-400 mt-1">
            أول مصنع بطاريات ليثيوم في سوريا
          </span>
        </div>

        {/* حقوق النشر - محاذاة لليسار في الشاشات الكبيرة لتوازن الهوامش */}
        <div className="md:text-left text-zinc-500 font-medium">
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لشركة سوروتك سوريا.</p>
        </div>

      </div>
    </footer>
  );
}