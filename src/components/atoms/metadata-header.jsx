import { Helmet } from "react-helmet";
import PropType from "prop-types";
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const MetadataHeader = ({
  title = "TaskFlow",
  description = "The most intuitive Kanban board for those who want to get things done. Drag, drop, and deliver with TaskFlow.",
  url = baseUrl,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={baseUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
};

MetadataHeader.propTypes = {
  title: PropType.string,
  description: PropType.string,
  image: PropType?.string,
  url: PropType.string,
};
