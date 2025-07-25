import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Home, BookOpen, GanttChartSquare, Forward, Download, FileText, Hourglass, Camera, Video, X, LayoutTemplate, Send } from 'lucide-react';

// --- DATA & TRANSLATIONS ---
// This is the central place for all text and file links.
// IMPORTANT: Update 'contact_whatsapp_number' with your number (including country code, no '+').
const projectData = {
    en: {
        contact_whatsapp_number: '1234567890', // <-- REPLACE WITH YOUR WHATSAPP NUMBER
        nav_home: 'Home',
        nav_design: 'Design Selection',
        nav_history: 'Project History',
        nav_docs: 'Documents',
        lang_toggle: 'عربي',
        hero_title: 'British Embassy',
        hero_subtitle: 'Kitchen & Bathroom Renovation Project',
        hero_desc: 'Professional interior design and renovation services, featuring modern kitchen installations and luxury bathroom facilities.',
        project_manager: 'Project Manager:',
        
        home_card_villa: 'Villa Kitchen',
        home_card_embassy: 'Embassy Kitchens',
        home_card_bathroom: 'Bathroom Suite',

        btn_view_designs: 'Proceed to Design Selection',

        design_selection_title: 'Villa Kitchen: Design Selection',
        design_selection_desc: 'Please review the two proposed designs for the villa kitchen. Your selection will determine the next steps for material choices and final quotation.',
        design_option_a: 'Design Option A',
        design_option_b: 'Design Option B',
        view_plan: 'View 2D Plan',
        watch_video: 'Watch Video Tour',
        select_design: 'Select This Design',
        design_selected: 'Design Selected',
        
        confirmation_title: 'Confirm Your Choice',
        confirmation_desc: 'Are you sure you want to select',
        confirmation_button: 'Confirm My Choice',
        cancel_button: 'Cancel',
        
        notification_message: 'Hello, we have made our decision regarding the Villa Kitchen. We would like to proceed with',

        next_step_materials: 'Next Step: Material Selection',
        materials_desc: 'Thank you for your selection! We will contact you shortly to proceed with the material selection and finalize the project quotation.',

        history_title: 'Project History',
        history_desc: 'Our journey with the British Embassy renovation project.',
        history_item1_title: 'Project Initiation',
        history_item1_desc: 'Initial consultation and requirements gathering.',
        history_item1_date: 'January 2024',

        docs_title: 'Project Documents',
        docs_desc: 'Download relevant drawings, quotations, and official documents.',
        
        footer_text: '© 2024 British Embassy Renovation Project - Managed by MICHEAL HAMDY',
        
        documents: [
            { id: 1, title: 'Project Brief & Scope', file: 'files/project-brief.pdf', date: 'January 20, 2024' },
        ],
        
        villa_kitchen_designs: {
            optionA: {
                renders: Array.from({ length: 6 }, (_, i) => `files/photo3d-A-${i + 1}.jpg`),
                plan: 'files/plan-2d-A.pdf',
                video: 'files/video-tour-A.mp4'
            },
            optionB: {
                renders: Array.from({ length: 6 }, (_, i) => `files/photo3d-B-${i + 1}.jpg`),
                plan: 'files/plan-2d-B.pdf',
                video: 'files/video-tour-B.mp4'
            }
        }
    },
    ar: {
        contact_whatsapp_number: '1234567890', // <-- REPLACE WITH YOUR WHATSAPP NUMBER
        nav_home: 'الرئيسية',
        nav_design: 'اختيار التصميم',
        nav_history: 'تاريخ المشروع',
        nav_docs: 'المستندات',
        lang_toggle: 'English',
        hero_title: 'السفارة البريطانية',
        hero_subtitle: 'مشروع تجديد المطابخ والحمامات',
        hero_desc: 'خدمات التصميم الداخلي والتجديد المهنية، تتضمن تركيبات مطابخ حديثة ومرافق حمامات فاخرة.',
        project_manager: 'مدير المشروع:',

        home_card_villa: 'مطبخ الفيلا',
        home_card_embassy: 'مطابخ السفارة',
        home_card_bathroom: 'جناح الحمام',

        btn_view_designs: 'الانتقال إلى اختيار التصميم',

        design_selection_title: 'مطبخ الفيلا: اختيار التصميم',
        design_selection_desc: 'يرجى مراجعة التصميمين المقترحين لمطبخ الفيلا. اختياركم سيحدد الخطوات التالية لاختيار المواد وعرض السعر النهائي.',
        design_option_a: 'التصميم المقترح أ',
        design_option_b: 'التصميم المقترح ب',
        view_plan: 'عرض المخطط ثنائي الأبعاد',
        watch_video: 'مشاهدة جولة الفيديو',
        select_design: 'اختيار هذا التصميم',
        design_selected: 'تم اختيار التصميم',

        confirmation_title: 'تأكيد اختياركم',
        confirmation_desc: 'هل أنتم متأكدون من رغبتكم في اختيار',
        confirmation_button: 'أؤكد اختياري',
        cancel_button: 'إلغاء',

        notification_message: 'مرحباً، لقد اتخذنا قرارنا بخصوص مطبخ الفيلا. نود المتابعة بـ',

        next_step_materials: 'الخطوة التالية: اختيار المواد',
        materials_desc: 'شكراً لاختياركم! سنتواصل معكم قريباً للمتابعة باختيار المواد ووضع اللمسات الأخيرة على عرض أسعار المشروع.',

        history_title: 'تاريخ المشروع',
        history_desc: 'رحلتنا مع مشروع تجديد السفارة البريطانية.',
        history_item1_title: 'انطلاق المشروع',
        history_item1_desc: 'الاستشارة الأولية وجمع المتطلبات.',
        history_item1_date: 'يناير 2024',

        docs_title: 'مستندات المشروع',
        docs_desc: 'تنزيل المخططات وعروض الأسعار والمستندات الرسمية ذات الصلة.',
        
        footer_text: '© 2024 مشروع تجديد السفارة البريطانية - إدارة مايكل حمدي',
        
        documents: [
            { id: 1, title: 'ملخص المشروع ونطاقه', file: 'files/project-brief.pdf', date: '20 يناير 2024' },
        ],

        villa_kitchen_designs: {
            optionA: {
                renders: Array.from({ length: 6 }, (_, i) => `files/photo3d-A-${i + 1}.jpg`),
                plan: 'files/plan-2d-A.pdf',
                video: 'files/video-tour-A.mp4'
            },
            optionB: {
                renders: Array.from({ length: 6 }, (_, i) => `files/photo3d-B-${i + 1}.jpg`),
                plan: 'files/plan-2d-B.pdf',
                video: 'files/video-tour-B.mp4'
            }
        }
    }
};

type Section = 'home' | 'design' | 'history' | 'docs';
type Language = 'en' | 'ar';
type ModalContent = { type: 'image' | 'pdf' | 'video'; src: string } | null;
type Confirmation = { design: 'A' | 'B' } | null;

// --- Reusable UI Components ---
const NavLink = React.memo(({ section, activeSection, setSection, children }) => (
    <a href={`#${section}`} onClick={(e) => { e.preventDefault(); setSection(section); }}
        className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${activeSection === section ? 'bg-blue-100 text-blue-900' : 'text-slate-500 hover:bg-slate-200/50'}`}>
        {children}
    </a>
));

const Header = React.memo(({ activeSection, setSection, lang, toggleLanguage, t }) => (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200/80">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
            <div className="font-bold text-lg text-blue-900">{t.hero_title}</div>
            <div className="hidden md:flex items-center gap-2">
                <NavLink section="home" activeSection={activeSection} setSection={setSection}>{t.nav_home}</NavLink>
                <NavLink section="design" activeSection={activeSection} setSection={setSection}>{t.nav_design}</NavLink>
                <NavLink section="history" activeSection={activeSection} setSection={setSection}>{t.nav_history}</NavLink>
                <NavLink section="docs" activeSection={activeSection} setSection={setSection}>{t.nav_docs}</NavLink>
            </div>
            <button onClick={toggleLanguage} className="bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-900 transition text-sm active:scale-95">
                {t.lang_toggle}
            </button>
        </nav>
    </header>
));

const Footer = React.memo(({ t }) => (
    <footer className="bg-blue-900 text-white text-center py-6 mt-16">
        <p className="text-sm opacity-80">{t.footer_text}</p>
    </footer>
));

const ModalViewer = ({ content, onClose }) => {
    if (!content) return null;
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[60] animate-fade-in-fast" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <a href={content.src} download className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition active:scale-95">
                        <Download size={16} /> Download
                    </a>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 active:scale-90"><X size={20} /></button>
                </div>
                <div className="p-4 flex-grow overflow-auto">
                    {content.type === 'image' && <img src={content.src} alt="Design Preview" className="max-w-full max-h-full mx-auto object-contain" />}
                    {content.type === 'pdf' && <iframe src={content.src} className="w-full h-[75vh]" title="PDF Viewer"></iframe>}
                    {content.type === 'video' && <video src={content.src} controls autoPlay className="max-w-full max-h-full mx-auto"></video>}
                </div>
            </div>
        </div>
    );
};

const ConfirmationModal = ({ confirmation, onConfirm, onClose, t }) => {
    if (!confirmation) return null;
    const designName = confirmation.design === 'A' ? t.design_option_a : t.design_option_b;
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[60] animate-fade-in-fast" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 m-4 text-center" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">{t.confirmation_title}</h2>
                <p className="text-slate-600 mb-8">{t.confirmation_desc} <span className="font-bold">{designName}</span>?</p>
                <div className="flex justify-center gap-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 transition active:scale-95">{t.cancel_button}</button>
                    <button onClick={() => onConfirm(confirmation.design)} className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-2 active:scale-95">
                        <Send size={16} /> {t.confirmation_button}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProgressBar = React.memo(({ percentage }: { percentage: number }) => (
    <div className="bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
        <div className="bg-gradient-to-r from-blue-800 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }}/>
    </div>
));

// --- Animated Background Component ---
const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: any[] = [];
        const particleCount = 50;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.body.scrollHeight; // Make canvas as tall as the page content
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: Math.random() * 0.4 - 0.2,
                    vy: Math.random() * 0.4 - 0.2,
                    radius: Math.random() * 2 + 1,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                
                // Neon glow effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(67, 56, 202, 0.5)';
                
                ctx.fillStyle = 'rgba(129, 140, 248, 0.7)'; // Lighter indigo for better visibility
                ctx.fill();
                
                // Reset shadow for performance
                ctx.shadowBlur = 0;
            });
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dist = Math.sqrt(Math.pow(particles[i].x - particles[j].x, 2) + Math.pow(particles[i].y - particles[j].y, 2));
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(165, 180, 252, ${1 - dist / 150})`; // Lighter indigo lines
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        // Use a timeout to ensure the body has its full height before resizing the canvas
        setTimeout(() => {
            resizeCanvas();
            createParticles();
            animate();
        }, 100);

        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10 bg-slate-50" />;
};


// --- Page Section Components ---
const HeroSection = ({ setSection, t }) => (
    <section id="home" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900">{t.hero_title}</h1>
                <h2 className="text-xl md:text-2xl text-slate-600">{t.hero_subtitle}</h2>
                <p className="text-slate-500 leading-relaxed">{t.hero_desc}</p>
                <div className="inline-block bg-white/70 backdrop-blur-sm p-4 rounded-lg border-l-4 border-blue-800">
                    <span className="text-slate-600">{t.project_manager}</span>
                    <strong className="ml-2 text-blue-900 text-lg">MICHEAL HAMDY</strong>
                </div>
            </div>
            <div className="space-y-4">
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/80 transition hover:shadow-xl hover:-translate-y-1"><div className="flex items-center gap-4 mb-3"><Home className="text-blue-800" size={24} /><h3 className="font-semibold text-lg text-blue-900">{t.home_card_villa}</h3></div><ProgressBar percentage={85} /><span className="font-semibold text-blue-800 text-sm">85%</span></div>
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/80 transition hover:shadow-xl hover:-translate-y-1"><div className="flex items-center gap-4 mb-3"><GanttChartSquare className="text-blue-800" size={24} /><h3 className="font-semibold text-lg text-blue-900">{t.home_card_embassy}</h3></div><ProgressBar percentage={60} /><span className="font-semibold text-blue-800 text-sm">60%</span></div>
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-200/80 transition hover:shadow-xl hover:-translate-y-1"><div className="flex items-center gap-4 mb-3"><Forward className="text-blue-800" size={24} /><h3 className="font-semibold text-lg text-blue-900">{t.home_card_bathroom}</h3></div><ProgressBar percentage={40} /><span className="font-semibold text-blue-800 text-sm">40%</span></div>
            </div>
        </div>
        <div className="text-center mt-12">
            <button onClick={() => setSection('design')} className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95">
                <LayoutTemplate size={20} />{t.btn_view_designs}
            </button>
        </div>
    </section>
);

const DesignSelectionSection = ({ t, setModalContent, setConfirmation, finalSelection }) => {
    const DesignCard = ({ option, title, onSelect, isFinal }) => (
        <div className={`p-1 rounded-2xl transition-all duration-500 group ${isFinal ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 'bg-transparent hover:bg-gradient-to-br hover:from-blue-400 hover:to-indigo-600'}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">{title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    {option.renders.map((src, i) => (
                        <div key={i} className="aspect-square bg-slate-100 rounded-lg overflow-hidden cursor-pointer group/image relative" onClick={() => setModalContent({ type: 'image', src })}>
                            <img src={src} alt={`Render ${i+1}`} className="w-full h-full object-cover transition duration-300 group-hover/image:scale-110" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/image:opacity-100 transition flex items-center justify-center"><Camera className="text-white" size={32} /></div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <button onClick={() => setModalContent({ type: 'pdf', src: option.plan })} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition active:scale-95"><FileText size={16} /> {t.view_plan}</button>
                    <button onClick={() => setModalContent({ type: 'video', src: option.video })} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition active:scale-95"><Video size={16} /> {t.watch_video}</button>
                </div>
                <button onClick={onSelect} disabled={isFinal} className={`w-full py-3 rounded-lg font-semibold text-white transition active:scale-95 ${isFinal ? 'bg-green-600 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-900'}`}>
                    {isFinal ? t.design_selected : t.select_design}
                </button>
            </div>
        </div>
    );

    return (
        <section id="design" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900">{t.design_selection_title}</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">{t.design_selection_desc}</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
                <DesignCard option={t.villa_kitchen_designs.optionA} title={t.design_option_a} onSelect={() => setConfirmation({design: 'A'})} isFinal={finalSelection === 'A'} />
                <DesignCard option={t.villa_kitchen_designs.optionB} title={t.design_option_b} onSelect={() => setConfirmation({design: 'B'})} isFinal={finalSelection === 'B'} />
            </div>
            {finalSelection && (
                <div className="mt-12 text-center max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border animate-fade-in">
                    <h3 className="text-xl font-bold text-green-700">{t.next_step_materials}</h3>
                    <p className="mt-2 text-slate-600">{t.materials_desc}</p>
                </div>
            )}
        </section>
    );
};

const HistorySection = ({ t }) => (
    <section id="history" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
        <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-blue-900">{t.history_title}</h2><p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{t.history_desc}</p></div>
        <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-800 to-blue-500" />
            <div className="space-y-12">
                <div className="relative flex items-center gap-8">
                    <div className="hidden sm:block w-1/2" /><div className="z-10 bg-blue-800 rounded-full w-6 h-6 flex items-center justify-center ring-4 ring-white"><BookOpen size={14} className="text-white" /></div>
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-slate-200/80 w-full sm:w-1/2"><h3 className="font-bold text-lg text-blue-900 mb-2">{t.history_item1_title}</h3><p className="text-slate-600 text-sm mb-3">{t.history_item1_desc}</p><span className="text-xs font-semibold text-white bg-blue-800 px-2 py-1 rounded">{t.history_item1_date}</span></div>
                </div>
            </div>
        </div>
    </section>
);

const DocumentsSection = ({ t }) => (
     <section id="docs" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
        <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-blue-900">{t.docs_title}</h2><p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{t.docs_desc}</p></div>
        <div className="max-w-3xl mx-auto space-y-4">
            {t.documents.map(doc => (
                <a key={doc.id} href={doc.file} download className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-slate-200/80 hover:shadow-md hover:border-blue-300 transition group">
                    <div className="flex items-center gap-4"><FileText className="text-blue-800" /><div><p className="font-semibold text-blue-900">{doc.title}</p><p className="text-xs text-slate-500">{doc.date}</p></div></div>
                    <Download className="text-slate-400 group-hover:text-blue-800 transition" />
                </a>
            ))}
        </div>
    </section>
);

// --- Main App Component ---
function App() {
    const [activeSection, setSection] = useState<Section>('home');
    const [lang, setLang] = useState<Language>('en');
    const [modalContent, setModalContent] = useState<ModalContent>(null);
    const [confirmation, setConfirmation] = useState<Confirmation>(null);
    const [finalSelection, setFinalSelection] = useState<string | null>(null);

    useEffect(() => {
        const savedLang = localStorage.getItem('projectLang') as Language;
        if (savedLang) setLang(savedLang);
        const savedSelection = localStorage.getItem('finalDesignSelection');
        if (savedSelection) setFinalSelection(savedSelection);
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('projectLang', lang);
        document.body.classList.toggle('rtl', lang === 'ar');
    }, [lang]);

    const toggleLanguage = () => setLang(prevLang => prevLang === 'en' ? 'ar' : 'en');
    const t = useMemo(() => projectData[lang], [lang]);

    const handleConfirmSelection = (design) => {
        const designName = design === 'A' ? t.design_option_a : t.design_option_b;
        const message = encodeURIComponent(`${t.notification_message} ${designName}.`);
        const whatsappUrl = `https://wa.me/${t.contact_whatsapp_number}?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
        
        setFinalSelection(design);
        localStorage.setItem('finalDesignSelection', design);
        setConfirmation(null);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'design': return <DesignSelectionSection t={t} setModalContent={setModalContent} setConfirmation={setConfirmation} finalSelection={finalSelection} />;
            case 'history': return <HistorySection t={t} />;
            case 'docs': return <DocumentsSection t={t} />;
            default: return <HeroSection setSection={setSection} t={t} />;
        }
    };

    return (
        <>
            <style>{`
                @keyframes animate-fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes animate-fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: animate-fade-in 0.6s ease-out forwards; }
                .animate-fade-in-fast { animation: animate-fade-in-fast 0.3s ease-out forwards; }
            `}</style>
            <div className={`min-h-screen ${lang === 'ar' ? 'font-[Cairo,sans-serif]' : 'font-[Inter,sans-serif]'}`}>
                <AnimatedBackground />
                <div className="relative z-10">
                    <Header activeSection={activeSection} setSection={setSection} lang={lang} toggleLanguage={toggleLanguage} t={t} />
                    <main>
                        {renderSection()}
                    </main>
                    <Footer t={t} />
                </div>
                <ModalViewer content={modalContent} onClose={() => setModalContent(null)} />
                <ConfirmationModal confirmation={confirmation} onConfirm={handleConfirmSelection} onClose={() => setConfirmation(null)} t={t} />
            </div>
        </>
    );
}

export default App;
