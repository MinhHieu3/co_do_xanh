import { articles, rentalGuide } from "../data/editorialArticles";
import { BUSINESS } from "../data/business";
import guideImage from "../assets/dulich/ninhbinh_slider_1.webp";
import { getRouteMeta, type RouteMeta } from "./routeMeta";

const guidePath = "/news/kinh-nghiem-thue-xe-may-dien-ninh-binh";

export function getEditorialRouteMeta(path: string, isEnglish: boolean): RouteMeta {
  const meta = getRouteMeta(path, isEnglish);
  if (!path.startsWith("/news/")) return meta;

  const lang = isEnglish ? "EN" : "VI";
  const slug = path.split("/").filter(Boolean).at(-1);
  const article = articles.find((item) => item.slug === slug);
  const isGuide = path === guidePath;
  const content = isGuide ? (isEnglish ? rentalGuide.EN : rentalGuide) : article?.[lang];
  if (!content) return meta;

  const image = new URL((isGuide ? guideImage : article?.image) ?? meta.image, BUSINESS.url).href;
  return {
    ...meta,
    title: `${content.title} | ${BUSINESS.name}`,
    description: content.desc,
    image,
    schemas: [{
      "@context": "https://schema.org",
      "@type": "Article",
      headline: content.title,
      description: content.desc,
      image,
      datePublished: isGuide ? rentalGuide.date : article?.date,
      dateModified: isGuide ? rentalGuide.modified : article?.modified,
      inLanguage: isEnglish ? "en" : "vi",
      mainEntityOfPage: meta.canonical,
      author: { "@id": `${BUSINESS.url}/#org` },
      publisher: { "@id": `${BUSINESS.url}/#org` },
    }],
  };
}
