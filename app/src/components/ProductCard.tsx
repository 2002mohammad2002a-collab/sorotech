import { MessageCircle } from 'lucide-react';
import type { ReactNode } from 'react';

interface ProductCardProps {
  image: string;
  badge: string;
  name: string;
  specs: { icon: ReactNode; text: string }[];
  whatsappMessage: string;
}

export default function ProductCard({ image, badge, name, specs, whatsappMessage }: ProductCardProps) {
  return (
    <div className="group bg-white border border-[#E8E8E8] rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image Area */}
      <div className="relative aspect-[4/3] bg-[#F0EEEC] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badge */}
        <div className="absolute top-3 left-3 bg-brand text-white text-[11px] font-medium px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-md">
          {badge}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-7 flex flex-col flex-1">
        <h3 className="text-[#1A1A1A] font-bold text-lg leading-[1.4] mb-4">
          {name}
        </h3>

        {/* Specs */}
        <div className="flex flex-col flex-1">
          {specs.map((spec, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 py-2 text-[13px] leading-[1.6] text-[#666] ${
                i < specs.length - 1 ? 'border-b border-[#F0F0F0]' : ''
              }`}
            >
              <span className="text-brand shrink-0 mt-0.5">{spec.icon}</span>
              <span>{spec.text}</span>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/963966299727?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200 shadow-whatsapp hover:shadow-lg"
        >
          <MessageCircle size={18} />
          اطلب السعر عبر واتساب
        </a>
      </div>
    </div>
  );
}
