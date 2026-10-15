import { Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { rentalGuide } from "../data/editorialArticles";
import imgCover from "../assets/dulich/ninhbinh_slider_1.webp";

export default function EditorialGuidePage() {
    const { language } = useLanguage();
    const lang = language === "EN" ? "EN" : "VI";
    const article = lang === "EN" ? rentalGuide.EN : rentalGuide;

    useEffect(() => {
        const title = `${article.title} | Xe Cố Đô Xanh`;
        document.title = title;

        const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        if (description) description.content = article.desc;

        const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = title;

        const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
        if (ogDescription) ogDescription.content = article.desc;

        const schema = document.createElement("script");
        schema.type = "application/ld+json";
        schema.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.desc,
            image: `https://xecodoxanh.com${imgCover}`,
            datePublished: rentalGuide.date,
            dateModified: rentalGuide.modified,
            inLanguage: lang === "VI" ? "vi" : "en",
            mainEntityOfPage: "https://xecodoxanh.com/news/kinh-nghiem-thue-xe-may-dien-ninh-binh",
            author: { "@type": "Organization", name: "Xe Cố Đô Xanh" },
            publisher: {
                "@type": "Organization",
                name: "Xe Cố Đô Xanh",
                logo: { "@type": "ImageObject", url: "https://xecodoxanh.com/og-image.png" },
            },
        });
        document.head.appendChild(schema);
        return () => schema.remove();
    }, [article, lang]);

    return (
        <div className="w-full min-h-screen pt-4 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/news" className="inline-flex items-center text-[#17493a] hover:text-[#0f3528] font-medium mb-8 transition-colors">
                    {lang === "EN" ? "Back to News" : "Quay lại Tin tức"}
                </Link>

                <article>
                    <header className="mb-10">
                        <p className="text-sm font-bold uppercase tracking-wider text-[#17493a] mb-3">
                            {lang === "EN" ? "Travel guide" : "Cẩm nang du lịch"}
                        </p>
                        <h1 className="text-3xl md:text-5xl font-black text-[#1d2b24] mb-6 leading-tight font-display">
                            {article.title}
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6">{article.desc}</p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 font-medium">
                            <time className="flex items-center gap-2" dateTime={rentalGuide.date}>
                                <Calendar size={18} /> {new Date(rentalGuide.date).toLocaleDateString(lang === "VI" ? "vi-VN" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}
                            </time>
                            <span className="flex items-center gap-2"><User size={18} /> Xe Cố Đô Xanh</span>
                        </div>
                    </header>

                    <figure className="mb-10">
                        <img src={imgCover} alt={lang === "EN" ? "Electric motorbike travel in Ninh Binh" : "Di chuyển bằng xe máy điện tại Ninh Bình"} className="w-full max-h-[520px] object-cover rounded-2xl" />
                    </figure>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        <p className="text-xl font-medium text-gray-600 mb-10">{article.intro}</p>
                        {article.sections.map((section) => (
                            <section key={section.h}>
                                <h2>{section.h}</h2>
                                {section.p.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                            </section>
                        ))}
                        <section>
                            <h2>{lang === "EN" ? "The takeaway" : "Điều cần nhớ"}</h2>
                            <p>{article.conclusion}</p>
                        </section>
                        <p className="mt-10">
                            <Link to="/booking" className="inline-flex items-center justify-center px-7 py-4 bg-[#17493a] text-white font-bold rounded-lg text-lg hover:bg-[#0f3528] transition-colors">
                                {lang === "EN" ? "Check vehicles and book" : "Xem xe và đặt xe"}
                            </Link>
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
}
