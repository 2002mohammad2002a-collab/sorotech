import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Cpu, Sun, Layers, AlertCircle, X, CheckCircle } from 'lucide-react';

interface TechSpecTable {
  columns: string[];
  rows: string[][];
}

interface Product {
  id: string;
  category: 'battery' | 'inverter' | 'solar';
  title: string;
  models: string;
  specs: string[];
  image: string;
  isComingSoon?: boolean;
  techTable: TechSpecTable;
}

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'battery' | 'inverter' | 'solar'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    // 1. سلسلة Tanker
    {
      id: 'tanker-series',
      category: 'battery',
      title: 'سلسلة Tanker Vertical',
      models: 'تتوفر بإصدارين: 15KWh | 30KWh',
      specs: [
        'أول مصنع بطاريات ليثيوم في سوريا بأعلى معايير الجودة العالمية',
        'نظام إدارة البطارية الذكي والمتقدم جداً JK Active Balance BMS',
        'عمر افتراضي استثنائي يصل إلى 8000 دورة شحن عند تفريغ 80%'
      ],
      image: 'Group 11.jpg', // تم ربط صورة Tanker
      techTable: {
        columns: ['الخاصية الفنية', 'TANKER 15KWh', 'TANKER 30KWh'],
        rows: [
          ['الجهد الاسمي المستمر (Nominal Voltage)', '51.2 V', '51.2 V'],
          ['السعة الاسمية (Nominal Capacity)', '300 Ah', '600 Ah'],
          ['الطاقة التخزينية (Energy Storage)', '15 KWh', '30 KWh'],
          ['نوع الشاشة (Display Type)', '4.3-inch Touchscreen', '4.3-inch Touchscreen'],
          ['عمر الدورة (Cycle Life)', '8000 Cycles @80% DOD', '8000 Cycles @80% DOD'],
          ['نظام الـ BMS الذكي', 'JK Active Balance BMS', 'JK Active Balance BMS'],
          ['جهد الشحن القياسي (Charge Voltage)', '56 V', '56 V'],
          ['أقصى تيار شحن وتفريغ مستمر', '200 A', '200 A'],
          ['درجة حرارة التشغيل (تفريغ)', '-20°C to 65°C', '-20°C to 65°C'],
          ['نظام الربط على التوازي (Parallel)', 'يدعم حتى 16 بطارية لتصل إلى 256KWh', 'يدعم حتى 16 بطارية لتصل إلى 256KWh'],
          ['نوع الهيكل الميكانيكي', 'واقف مجهز بعجلات للحركة والتدوير', 'واقف مجهز بعجلات للحركة والتدوير'],
          ['الوزن الصافي (Net Weight)', '119 kg / 150 kg', '119 kg / 150 kg'],
          ['فترة الضمان المصنعي الرسمي', '7 Years Warranty (7 سنوات)', '7 Years Warranty (7 سنوات)'],
          ['بروتوكولات الاتصال (Communication)', 'Canbus / RS485 / RS232', 'Canbus / RS485 / RS232'],
          ['الشهادات المعتمدة للخلية والحزمة', 'CE, MSDS, UN38.3, IEC62619, UL1973', 'CE, MSDS, UN38.3, IEC62619, UL1973']
        ]
      }
    },
    // 2. سلسلة One
    {
      id: 'one-series',
      category: 'battery',
      title: 'سلسلة One SL-W-02',
      models: 'تتوفر بـ 4 إصدارات قدرة وتخزين مختلفة',
      specs: [
        'تصميم ذكي ومدمج للغاية يدعم التعليق الحداري أو التثبيت الأرضي',
        'تيار شحن وتفريغ مستمر عالي يصل حتى 150 أمبير متوافق مع العواكس',
        'تأتي مجهزة بشاشات عرض ذكية متكاملة ومنافذ اتصال متعددة'
      ],
      image: 'Group 12.jpg', // تم ربط صورة One
      techTable: {
        columns: ['الموديل الفني الأساسي', 'SL 25.6 200', 'SL 51.2 200', 'SL 25.6 300', 'SL 51.2 300'],
        rows: [
          ['المواصفة الاسمية للموديل', '25.6V 200Ah', '51.2V 200Ah', '25.6V 300Ah', '51.2V 300Ah'],
          ['الطاقة الاسمية (Capacity @25°C)', '5.1 KWh', '10.2 KWh', '7.6 KWh', '15.3 KWh'],
          ['مجال الجهد التشغيلي المستمر', '24V - 29.4V', '48V - 58.4V', '24V - 29.4V', '48V - 58.4V'],
          ['جهد الشحن العائم (Float Charge)', '27.6 VDC', '58.4 VDC', '27.6 VDC', '58.4 VDC'],
          ['أقصى تيار مستمر للشحن/التفريغ', '150 A', '150 A', '150 A', '150 A'],
          ['عمر الدورة الافتراضي (100% DOD)', '>6000 Cycles', '>6000 Cycles', '>6000 Cycles', '>6000 Cycles'],
          ['نظام إدارة الخلايا وموازنتها', 'JK Active Balance BMS', 'JK Active Balance BMS', 'JK Active Balance BMS', 'JK Active Balance BMS'],
          ['بروتوكول التوافق والربط المباشر', 'CAN/RS485/RS232 متوافق مع إنفرترات سوروتك وباقي الشركات المعترف بها', 'CAN/RS485/RS232 متوافق مع إنفرترات سوروتك وباقي الشركات المعترف بها', 'CAN/RS485/RS232 متوافق مع إنفرترات سوروتك وباقي الشركات المعترف بها', 'CAN/RS485/RS232 متوافق مع إنفرترات سوروتك وباقي الشركات المعترف بها'],
          ['درجة الحماية الميكانيكية', 'IP20', 'IP20', 'IP20', 'IP20'],
          ['نظام الحماية المدمج في البطارية', 'حماية متكاملة من زيادة التيار، تفريغ زائد، ماس كهربائي، وشحن زائد', 'حماية متكاملة من زيادة التيار، تفريغ زائد، ماس كهربائي، وشحن زائد', 'حماية متكاملة من زيادة التيار، تفريغ زائد، ماس كهربائي، وشحن زائد', 'حماية متكاملة من زيادة التيار، تفريغ زائد، ماس كهربائي، وشحن زائد']
        ]
      }
    },
    // 3. سلسلة Line
    {
      id: 'line-series',
      category: 'battery',
      title: 'سلسلة Line Lifepo4',
      models: 'تتوفر بـ 4 إصدارات جدارية وأرضية',
      specs: [
        'استقرار حراري وكيميائي فائق تحت أصعب الظروف المناخية',
        'مراقبة فورية ودقيقة لحالة الشحن والتفريغ SOC عبر الواجهة السلسة',
        'عمر افتراضي طويل يتجاوز 10 سنوات استخدام فعلي'
      ],
      image: 'Group 13.jpg', // تم ربط صورة Line
      techTable: {
        columns: ['الموديل المعتمد للسلسلة', 'SL 25.6 200', 'SL 25.6 300', 'SL 51.2 200', 'SL 51.2 300'],
        rows: [
          ['المواصفة والجهد الاسمي', '25.6V 200Ah', '25.6V 300Ah', '51.2V 200Ah', '51.2V 300Ah'],
          ['القدرة الإجمالية بالكيلو واط', '5.1 KWh', '7.6 KWh', '10.2 KWh', '15.3 KWh'],
          ['جهد الشحن العائم المخصص', '27.6 VDC', '27.6 VDC', '58.4 VDC', '58.4 VDC'],
          ['مجال الجهد الكهربائي الآمن', '24V - 29.4V', '24V - 29.4V', '48V - 58.4V', '48V - 58.4V'],
          ['التيار المستمر الأقصى للتفريغ والشحن', '150 A', '150 A', '150 A', '150 A'],
          ['عدد دورات الخلايا الافتراضية', '>6000 Cycles', '>6000 Cycles', '>6000 Cycles', '>6000 Cycles'],
          ['نوع معالج الـ BMS الذكي', 'JK Active Balance BMS', 'JK Active Balance BMS', 'JK Active Balance BMS', 'JK Active Balance BMS']
        ]
      }
    },
    // 4. سلسلة Rio
    {
      id: 'rio-series',
      category: 'battery',
      title: 'سلسلة Rio Premium',
      models: 'تتوفر بـ 4 إصدارات تشغيلية فائقة',
      specs: [
        'مثالية جداً لأنظمة التوليد الشمسي والشبكات المستقلة تماماً OFF-Grid',
        'استجابة ديناميكية ممتازة للأحمال الحثية والمفاجئة في المنازل والمصانع',
        'اتصال برمجى فوري وسلس مع عواكس الطاقة الذكية'
      ],
      image: 'Group 15.jpg', // تم ربط صورة Rio
      techTable: {
        columns: ['طراز حزمة Rio', 'SL 25.6 200', 'SL 25.6 300', 'SL 51.2 200', 'SL 51.2 300'],
        rows: [
          ['الجهد والسعة الاسمية للحزمة', '25.6V 200Ah', '25.6V 300Ah', '51.2V 200Ah', '51.2V 300Ah'],
          ['طاقة التخزين الفعلية المتاحة', '5.1 KWh', '7.6 KWh', '10.2 KWh', '15.3 KWh'],
          ['تيار الشحن والتفريغ الأقصى المتواصل', '150 A', '150 A', '150 A', '150 A'],
          ['العمر الافتراضي للدورات الحية', '>6000 Cycles @100% DOD', '>6000 Cycles @100% DOD', '>6000 Cycles @100% DOD', '>6000 Cycles @100% DOD'],
          ['نظام موازنة الخلايا النشط المدمج', 'JK Active Balance BMS', 'JK Active Balance BMS', 'JK Active Balance BMS', 'JK Active Balance BMS'],
          ['درجة الرطوبة والتشغيل الآمن', '0-80% (بدون تكاثف) / حرارة شحن من 0 حتى 45 درجة مئوية', '0-80% (بدون تكاثف) / حرارة شحن من 0 حتى 45 درجة مئوية', '0-80% (بدون تكاثف) / حرارة شحن من 0 حتى 45 درجة مئوية', '0-80% (بدون تكاثف) / حرارة شحن من 0 حتى 45 درجة مئوية']
        ]
      }
    },
    // 5. سلسلة Flycell
    {
      id: 'flycell-series',
      category: 'battery',
      title: 'سلسلة Flycell Smart',
      models: 'تتوفر بـ 4 إصدارات تكنولوجية مدمجة',
      specs: [
        'أعلى كثافة طاقة ميكانيكية في حجم خارجي مدمج وموفر للمساحة',
        'دعم متقدم جداً لتقنيات الشحن والتفريغ السريع الآمن المستقر',
        'حماية إلكترونية رباعية متعددة المستويات لتأمين أجهزة المنشأة'
      ],
      image: 'Group 16.jpg', // تم ربط صورة FlyCell
      techTable: {
        columns: ['رقم الموديل والتوصيف', 'SL 25.6 200', 'SL 25.6 300', 'SL 51.2 200', 'SL 51.2 300'],
        rows: [
          ['الجهد المستمر والامبيرية', '25.6V 200Ah', '25.6V 300Ah', '51.2V 200Ah', '51.2V 300Ah'],
          ['القدرة الكلية الفعلية للكيلوواط', '5.1 KWh', '7.6 KWh', '10.2 KWh', '15.3 KWh'],
          ['نظام معالجة وتوازن مدمج متطور', 'JK Active Balance BMS', 'JK Active Balance BMS', 'JK Active Balance BMS', 'JK Active Balance BMS'],
          ['منافذ الاتصالات البرمجية الذكية', 'CAN / RS485 / RS232', 'CAN / RS485 / RS232', 'CAN / RS485 / RS232', 'CAN / RS485 / RS232'],
          ['أقصى تيار تفريغ مستمر مدعوم', '150 A', '150 A', '150 A', '150 A']
        ]
      }
    },
    // 6. سلسلة Blade (قريباً)
    {
      id: 'blade-series',
      category: 'battery',
      title: 'سلسلة Blade Ultra-Thin',
      models: 'جيل ثوري جديد - قريباً في الأسواق السورية',
      specs: [
        'تعتمد على خلايا BYD Blade Battery Cells الشهيرة بأنها الأكثر أماناً في العالم',
        'تصميم فائق النحافة تكنولوجي وجذاب (Ultra-thin) مخصص للتعليق الفاخر',
        'عمر افتراضي غير مسبوق يصل إلى 10000 دورة شحن مع ضمان مصنعي 10 سنوات'
      ],
      image: 'Group 14.jpg', // تم ربط صورة Blade
      isComingSoon: true,
      techTable: {
        columns: ['المواصفات الفنية المتوقعة', 'Blade 7.4KWh', 'Blade 14.3KWh', 'Blade 21KWh'],
        rows: [
          ['نوع الخلايا المستخدمة داخلياً', 'BYD Blade Battery Cells (The Safest Cells)', 'BYD Blade Battery Cells', 'BYD Blade Battery Cells'],
          ['الجهد الكهربائي الاسمي للحزمة', '51.2 V', '51.2 V', '51.2 V'],
          ['سعة الحزمة الاسمية بالأمبير', '145 Ah', '280 Ah', '410 Ah'],
          ['عمر الدورة الاستثنائي (Cycle Life)', '10000 Cycles @80% DOD', '10000 Cycles @80% DOD', '10000 Cycles @80% DOD'],
          ['نوع الشاشة وواجهة التحكم', '4.3-inch Touchscreen', '4.3-inch Touchscreen', '4.3-inch Touchscreen'],
          ['أقصى تيار مستمر للشحن/التفريغ', '100A / 200A', '100A / 200A', '100A / 200A'],
          ['فترة الضمان الطويلة المعتمدة', '10-Year Warranty (10 سنوات ضمان رسمي)', '10-Year Warranty', '10-Year Warranty']
        ]
      }
    },
    // 7. إنفرترات Syriaeco
    {
      id: 'syriaeco-series',
      category: 'inverter',
      title: 'إنفرترات Syriaeco الهجينة (On/Off Grid)',
      models: 'الموديلات: ECO-4.2KW PLUS | ECO-6.2KW PLUS',
      specs: [
        'عواكس ذكية مطورة تدعم العمل المتكامل على الشبكة وخارجها بشكل متزامن',
        'شاحن شمسي مدمج عالي الكفاءة ومجال تشغيل واسع جداً يصل حتى 500VDC',
        'يحتوي نظام حماية وفلترة متكامل ضد الغبار مخصص للأجواء التشغيلية الصعبة'
      ],
      image: 'Group 7.jpg', // تم ربط صورة Syria Eco
      techTable: {
        columns: ['المواصفة الفنية للعاكس الشمسي', 'ECO-II-4.2KW PLUS', 'ECO-II-6.2KW PLUS'],
        rows: [
          ['نوع النظام الفازي (Phase)', 'Single phase (أحادي الفاز)', 'Single phase (أحادي الفاز)'],
          ['أقصى قدرة لألواح الطاقة الشمسية (PV)', '6200 W', '8000 W'],
          ['القدرة الاسمية الحقيقية للمخرج (Output)', '4200W / 4200VA', '6200W / 6200VA'],
          ['أقصى جهد مستمر للألواح / جهد البدء', '360VDC / 500VDC', '360VDC / 500VDC'],
          ['مجال جهد منظم الشحن (MPPT Range)', '60 - 450 VDC', '60 - 450 VDC'],
          ['أقصى تيار دخل من المصفوفة الشمسية', '27 A', '27 A'],
          ['جهد المخرج المتردد الاسمي (AC)', '220 / 230 / 240 VAC', '220 / 230 / 240 VAC'],
          ['أقصى تيار شحن شمسي (MPPT Current)', '120 A', '120 A'],
          ['أقصى تيار شحن كهرباء (AC Charger)', '100 A', '100 A'],
          ['الجهد الاسمي لمنظومة البطاريات المستمرة', '24 VDC', '48 VDC'],
          ['كفاءة التحويل القصوى (DC to AC)', '94% في وضع البطارية / 98% وضع ربط الشبكة', '94% في وضع البطارية / 98% وضع ربط الشبكة'],
          ['أبعاد الجهاز الهندسية الارتفاع*العرض*العمق', '423x344x113 mm', '423x344x113 mm'],
          ['بروتوكول اتصالات الليثيوم والتطبيقات', 'توصيل مدمج مخصص لـ RS232 / RS485 / WIFI / GPRS / BMS مع عرض كامل للحالة', 'توصيل مدمج مخصص لـ RS232 / RS485 / WIFI / GPRS / BMS مع عرض كامل للحالة'],
          ['ميزات إضافية حصرية بالسلسلة', 'موجة جيبية نقية، تشغيل بدون بطارية، تفعيل إلكتروني تلقائي لبطاريات الليثيوم الميتة، إضاءة RGB مدمجة تفاعلية تظهر الحالة الحية للتحميل الشمسي والكهربائي والبطارية مباشرة.', 'موجة جيبية نقية، تشغيل بدون بطارية، تفعيل إلكتروني تلقائي لبطاريات الليثيوم الميتة، إضاءة RGB مدمجة تفاعلية تظهر الحالة الحية للتحميل الشمسي والكهربائي والبطارية مباشرة.']
        ]
      }
    },
    // 8. إنفرترات Syria Max
    {
      id: 'syriamax-series',
      category: 'inverter',
      title: 'إنفرترات Syria Max العملاقة (Heavy Duty)',
      models: 'الموديلات: VICTOR MAX-8.2KW | VICTOR MAX-10.2KW',
      specs: [
        'عواكس طاقة فائقة مصممة للأحمال الثقيلة والمنشآت الضخمة والشركات الكبرى',
        'منظم شحن شمسي مزدوج (Dual PV Input) مدمج لتوصيل مصفوفتين منفصلتين',
        'ميزة المخرج الثنائي للحمل الذكي (Dual Output) لفرز وتنظيم الأحمال الضرورية'
      ],
      image: 'Group 9.jpg', // تم ربط صورة Syria Max
      techTable: {
        columns: ['المواصفة الفنية الشاملة لعاكس الفئة العليا', 'VICTOR MAX-8.2KW', 'VICTOR MAX-10.2KW'],
        rows: [
          ['نظام تشغيل الفاز', 'Single phase (1-phase)', 'Single phase (1-phase)'],
          ['أقصى قدرة مصفوفة ألواح كهروضوئية', '5400W + 5400W (مدخل شمس مزدوج عالي القدرة)', '5400W + 5400W (مدخل شمس مزدوج عالي القدرة)'],
          ['القدرة الاسمية المستمرة للمخرج المعالج', '8200W / 8200VA', '10200W / 10200VA'],
          ['أقصى جهد مستمر دخل للألواح (Max PV)', '360VDC / 500VDC', '360VDC / 500VDC'],
          ['جهد بدء تشغيل الإنفرتر وتغذية الألواح', '90 VDC / 120 VDC', '90 VDC / 120 VDC'],
          ['مجال منظم الشحن الشمسي المتقدم', '90 - 450 VDC', '90 - 450 VDC'],
          ['أقصى تيار شحن شمسي (MPPT Solar)', '160 A', '160 A'],
          ['أقصى تيار شحن من تيار المدينة (AC)', '140 A', '140 A'],
          ['أقصى تيار شحن مشترك (Solar + AC)', '160 A', '160 A'],
          ['جهد مصفوفة بطاريات الليثيوم أو السائل', '48 VDC', '48 VDC'],
          ['ميزة المخرج الثنائي الذكي للأحمال', 'المخرج الرئيسي: 8200W / مخرج الأحمال الثاني: 1640W-5740W جهد فصل 52VDC والعودة 54V', 'المخرج الرئيسي: 10200W / مخرج الأحمال الثاني: 2040W-7140W جهد فصل 52VDC والعودة 54V'],
          ['نوع مخرج الطاقة والشكل الموجي وبطارية الحماية', 'موجة جيبية نقية 100% (Pure Sine Wave) لضمان حماية الإلكترونيات المعقدة والمحركات الحساسة بكفاءة 94%', 'موجة جيبية نقية 100% (Pure Sine Wave) لضمان حماية الإلكترونيات المعقدة والمحركات الحساسة بكفاءة 94%'],
          ['الوزن الصافي الميكانيكي للجهاز (Net Weight)', '14.5 kg', '14.7 kg'],
          ['أبعاد هيكل العاكس الفني H*W*D', '500x390x136 mm', '500x390x136 mm'],
          ['تقنيات التحكم والمراقبة والتفاعل الفاخر', 'أزرار تحكم تعمل باللمس بالكامل، تطبيق جوال ذكي متوافق مع نظامي iOS و Android، تشغيل برمجى متطور بدون بطارية، فلتر مدمج مانع للأتربة القاسية، إضاءة RGB متحركة فريدة لبيان الحالة الفورية وتحليلات الأحمال بدقة عالية.', 'أزرار تحكم تعمل باللمس بالكامل، تطبيق جوال ذكي متوافق مع نظامي iOS و Android، تشغيل برمجى متطور بدون بطارية، فلتر مدمج مانع للأتربة القاسية، إضاءة RGB متحركة فريدة لبيان الحالة الفورية وتحليلات الأحمال بدقة عالية.']
        ]
      }
    },
    // 9. الألواح الشمسية (أبقيتها كما هي لعدم توفر صورة مخصصة لها في المرفقات)
    // {
    //   id: 'solar-panels',
    //   category: 'solar',
    //   title: 'ألواح سوروتك الشمسية المتقدمة',
    //   models: 'تقنية الخلايا أحادية البلورة المتطورة Mono-PERC',
    //   specs: [
    //     'خلايا شمسية نقية تضمن أعلى معدلات إنتاجية وتوليد في الأمتار المربعة المحدودة',
    //     'أداء مستقر ومثالي ومقاومة تامة للتوليد في ظروف الغيوم والإضاءة المنخفضة والأجواء الحارة',
    //     'إطار هندسي متين مصنع من ألومنيوم معزز ومقاوم لأقوى الرياح والأحمال الميكانيكية والثلجية'
    //   ],
    //   image: 'solar.png',
    //   techTable: {
    //     columns: ['الخاصية الفنية للهيكل والتوليد', 'مواصفات الألواح المعتمدة'],
    //     rows: [
    //       ['نوع تقنية الخلايا الداخلية المعتمدة', 'Mono-PERC أحادية البلورة فائقة النقاء وعالية الكفاءة والإنتاج الكلي'],
    //       ['كفاءة الخلايا الضوئية (Module Efficiency)', 'تصل حتى 21.5% لضمان أعلى توليد مستدام من شمس الشتاء والصيف المباشرة'],
    //       ['هيكل المقاومة الخارجي للوحة التوليد', 'ألومنيوم مقسى مع زجاج حماية مقوى ومقاوم للصدمات الميكانيكية المباشرة'],
    //       ['معامل الأداء الحراري المقاوم للحر السوري', 'معامل تدهور منخفض جداً يحافظ على القدرة التوليدية للعاكس دون هبوط حاد'],
    //       ['صندوق التوصيل والأسلاك الخلفية وحماية القصر', 'صندوق معزول كلياً IP68 مجهز بصمامات ثنائية (Bypass Diodes) لمنع نقاط السخونة']
    //     ]
    //   }
    // }
  ];

  const filteredProducts = activeTab === 'all' ? products : products.filter(p => p.category === activeTab);

  return (
    <section id="products" className="py-24 bg-zinc-50 overflow-hidden text-right" dir="rtl">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-red-600 font-black tracking-widest text-sm uppercase block mb-3">الصناعة الوطنية الرائدة</span>
          <h2 className="text-4xl font-black text-zinc-950">منتجاتنا المعتمدة ومواصفاتها الفنية</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {[
            { id: 'all', label: 'الكل', icon: Layers },
            { id: 'battery', label: 'بطاريات الليثيوم', icon: Cpu },
            { id: 'inverter', label: 'الإنفرترات الهجينة', icon: Zap },
            { id: 'solar', label: 'الألواح الشمسية', icon: Sun }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors duration-300 ${
                  activeTab === tab.id ? 'text-white' : 'text-zinc-600 hover:text-zinc-950 bg-white border border-zinc-200 shadow-sm'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-red-600 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {product.isComingSoon && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 z-10 animate-pulse">
                    <AlertCircle className="w-3 h-3" />
                    قريباً في سوريا
                  </div>
                )}

                <div>
                  <div className={`w-full h-48 flex items-center justify-center mb-6 overflow-hidden rounded-xl bg-zinc-50 border border-zinc-100 ${product.isComingSoon ? 'opacity-60' : ''}`}>
                    <img 
                      src={`/${product.image}`} 
                      alt={product.title}
                      className="max-h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-zinc-950 mb-2 group-hover:text-red-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs font-bold text-red-600 bg-red-50/70 inline-block px-3 py-1 rounded-lg">
                      {product.models}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {product.specs.map((spec, index) => (
                      <li key={index} className="text-sm font-medium text-zinc-600 flex items-start gap-2 leading-relaxed">
                        <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="w-full py-3 rounded-xl bg-zinc-950 text-white font-bold text-xs hover:bg-red-600 transition-colors mt-auto"
                >
                  {product.isComingSoon ? 'عرض المواصفات الأولية المتاحة' : 'عرض الجدول والمواصفات الفنية الكاملة'}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-zinc-950/70 backdrop-blur-md"
              />

              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl border border-zinc-100 z-10 text-right"
              >
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 left-6 p-2 rounded-xl bg-zinc-100 text-zinc-600 hover:bg-red-600 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 border-b border-zinc-100 pb-5 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-zinc-950">{selectedProduct.title}</h4>
                    <p className="text-sm font-bold text-zinc-500 mt-1">{selectedProduct.models}</p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-zinc-200">
                  <table className="w-full text-right border-collapse text-sm">
                    <thead>
                      <tr className="bg-zinc-950 text-white font-black text-xs md:text-sm">
                        {selectedProduct.techTable.columns.map((col, idx) => (
                          <th key={idx} className="p-4 border-b border-zinc-800 whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProduct.techTable.rows.map((row, rIdx) => (
                        <tr 
                          key={rIdx} 
                          className={`transition-colors border-b border-zinc-100 font-medium ${
                            rIdx % 2 === 0 ? 'bg-zinc-50/50' : 'bg-white'
                          } hover:bg-red-50/30`}
                        >
                          {row.map((cell, cIdx) => (
                            <td 
                              key={cIdx} 
                              className={`p-4 leading-relaxed text-zinc-700 ${
                                cIdx === 0 ? 'font-bold text-zinc-900 bg-zinc-100/30' : ''
                              }`}
                            >
                              {cell.includes('BMS') || cell.includes('Pure Sine') || cell.includes('MPPT') ? (
                                <span className="flex items-center gap-1.5 flex-wrap">
                                  <CheckCircle className="w-4 h-4 text-red-600 shrink-0" />
                                  {cell}
                                </span>
                              ) : cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                  <div className="text-xs font-bold text-zinc-500">
                    * البيانات الفنية مستخرجة ومطابقة 100% لكتيب المواصفات الرسمي الصادر عن مصنع سوروتك سوريا.
                  </div>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="px-6 py-2.5 rounded-xl bg-zinc-950 text-white font-black text-xs hover:bg-red-600 transition-colors shadow-sm"
                  >
                    إغلاق المواصفات
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}