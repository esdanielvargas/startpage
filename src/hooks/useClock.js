import { useState, useEffect } from "react";

export function useClock({ format = "h24", showSeconds = true, lang = "es" } = {}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Configuramos las opciones de hora dinámicamente
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: format === "h12",
  };

  // Agregamos los segundos solo si la configuración lo permite
  if (showSeconds) {
    timeOptions.second = "2-digit";
  }

  const formattedTime = time.toLocaleTimeString(lang, timeOptions);

  const formattedDate = time.toLocaleDateString(lang, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return {
    time,
    formattedTime,
    formattedDate,
  };
}