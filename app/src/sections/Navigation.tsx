import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Cpu, Zap, Sun } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProductsMenu, setShowProductsMenu] = useState(false);

  // قائمة المنتجات الفرعية الثابتة
  const productItems = [
    { name: 'بطاريات الليثيوم', link: '#products', icon: Cpu },
    { name: 'الإنفرترات الهجينة', link: '#products', icon: Zap },
    { name: 'الألواح الشمسية', link: '#products', icon: Sun }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-sm text-right" dir="rtl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* اللوجو الرسمي المعدل (SORO بالأحمر و TECH بالأسود) */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Sorotech Logo" 
            className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col justify-center border-r border-zinc-200 pr-3 font-sans">
            <div className="text-lg font-black tracking-tight select-none">
              <span className="text-red-600">SORO</span>
              <span className="text-zinc-950">TECH</span>
            </div>
            <span className="text-[9px] font-black text-zinc-400 tracking-widest uppercase -mt-1">Syria</span>
          </div>
        </div>

        {/* زر التحكم بالقائمة الموحدة للجوال */}
        <button 
          onClick={() => {
            setIsOpen(!isOpen);
            if(isOpen) {
              setShowProductsMenu(false);
            }
          }} 
          className="p-2 text-zinc-900 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors z-[100]"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* القائمة المنسدلة التفاعلية الرئيسية */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-[64px] left-0 right-0 bg-white border-b border-zinc-100 shadow-2xl overflow-hidden z-[90]"
          >
            <div className="container mx-auto max-w-md flex flex-col px-6 py-6 gap-4 text-center">
              
              {/* الرابط الأول: الرئيسية */}
              <a 
                href="#" 
                onClick={() => setIsOpen(false)}
                className="text-lg font-black text-zinc-800 hover:text-red-600 block border-b border-zinc-50 pb-2 transition-colors"
              >
                الرئيسية
              </a>

              {/* زر منتجاتنا التفاعلي لفتح القائمة الفرعية للمنتجات */}
              <div className="border-b border-zinc-50 pb-2">
                <button 
                  onClick={() => setShowProductsMenu(!showProductsMenu)}
                  className="w-full text-lg font-black text-zinc-800 hover:text-red-600 flex items-center justify-center gap-2 transition-colors focus:outline-none"
                >
                  <span>منتجاتنا</span>
                  <motion.div
                    animate={{ rotate: showProductsMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  </motion.div>
                </button>

                {/* القائمة المنسدلة الفرعية للمنتجات */}
                <AnimatePresence>
                  {showProductsMenu && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-zinc-50 rounded-xl mt-3 overflow-hidden border border-zinc-100"
                    >
                      <div className="p-2 flex flex-col gap-1">
                        {productItems.map((prod) => {
                          const Icon = prod.icon;
                          return (
                            <a
                              key={prod.name}
                              href={prod.link}
                              onClick={() => {
                                setIsOpen(false);
                                setShowProductsMenu(false);
                              }}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-zinc-700 hover:bg-red-50 hover:text-red-600 transition-all text-right"
                            >
                              <Icon className="w-4 h-4 text-red-600 shrink-0" />
                              <span>{prod.name}</span>
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* رابط مباشر إلى الحاسبة الشمسية المتبقية (بدون قوائم فرعية معقدة) */}
              <a 
                href="#fast-calc" 
                onClick={() => setIsOpen(false)}
                className="text-lg font-black text-zinc-800 hover:text-red-600 block border-b border-zinc-50 pb-2 transition-colors"
              >
                الحاسبة الشمسية السريعة
              </a>

              {/* الرابط: لماذا نحن */}
              <a 
                href="#about" 
                onClick={() => setIsOpen(false)}
                className="text-lg font-black text-zinc-800 hover:text-red-600 block border-b border-zinc-50 pb-2 transition-colors"
              >
                لماذا نحن
              </a>

              {/* الرابط: اتصل بنا */}
              <a 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="text-lg font-black text-zinc-800 hover:text-red-600 block border-b border-zinc-50 pb-2 transition-colors"
              >
                اتصل بنا
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}