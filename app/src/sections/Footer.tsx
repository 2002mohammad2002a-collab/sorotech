export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-500 py-12 text-xs border-t border-zinc-900">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-right">
        <div className="flex flex-col">
          <span className="text-sm font-black text-white ltr-text">SOROTEC SYRIA</span>
          <span className="text-[10px] font-bold text-zinc-600 mt-0.5">أول مصنع بطاريات ليثيوم في سوريا</span>
        </div>
        <div>
          <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لشركة سوروتك سوريا.</p>
        </div>
      </div>
    </footer>
  );
}