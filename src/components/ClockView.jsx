import { useClock } from "../hooks";

export default function ClockView({ language, seconds, size, format }) {
  const { formattedTime, formattedDate } = useClock({
    format: format,
    showSeconds: seconds,
    language: language,
  });

  return (
    <>
      {/* Reloj Grande (Centrado) */}
      {size === "large" && (
        <div className="flex flex-col items-center justify-center gap-4 select-none cursor-pointer">
          <span className="font-light text-7xl text-white font-sans [text-shadow:0_4px_16px_rgba(0,0,0,0.6)]">
            {formattedTime}
          </span>
          <span className="text-sm text-neutral-200 font-mono [text-shadow:0_4px_16px_rgba(0,0,0,0.6)]">
            {formattedDate}
          </span>
        </div>
      )}

      {/* Reloj Pequeño (Flotante) */}
      {size === "small" && (
        <div className="fixed z-20 top-4 left-5 cursor-pointer">
          <span className="font-medium text-white select-none">
            {formattedTime}
          </span>
        </div>
      )}
    </>
  );
}
