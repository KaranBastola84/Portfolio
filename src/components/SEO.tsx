import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
}

export const SEO = ({ title, description, keywords, url }: SEOProps) => {
  const siteUrl = "https://karanbastola.com.np";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      <title>{title} | Karan Bastola</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={`${title} | Karan Bastola`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />

      <meta name="twitter:title" content={`${title} | Karan Bastola`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};
