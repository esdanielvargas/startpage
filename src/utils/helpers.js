export const formatUrl = (url) => {
  let cleaned = url.trim();
  if (!/^https?:\/\//i.test(cleaned)) cleaned = "https://" + cleaned;
  return cleaned;
};

export const getFavicon = (url) => {
  try {
    const host = new URL(formatUrl(url)).hostname;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
  } catch (error) {
    console.error("Error al obtener el favicon:", error);
    return "";
  }
};

export const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 10);
};
