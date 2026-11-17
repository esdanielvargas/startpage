export const formatUrl = (url) => {
  let cleaned = url.trim();
  if (!/^https?:\/\//i.test(cleaned)) cleaned = "https://" + cleaned;
  return cleaned;
};

export const getFavicon = (url, source = "google") => {
  try {
    const host = new URL(formatUrl(url)).hostname;
    const providers = {
      google: `https://www.google.com/s2/favicons?domain=${host}&sz=64`,
      duckduckgo: `https://icons.duckduckgo.com/ip3/${host}.ico`,
      iconhorse: `https://icon.horse/icon/${host}`,
      yandex: `https://favicon.yandex.net/favicon/${host}`,
    };
    return providers[source] || providers.google;
  } catch (error) {
    console.error("Error al obtener el favicon:", error);
    return "";
  }
};

export const generateUniqueId = () => {
  return Math.random().toString(36).substring(2, 10);
};
