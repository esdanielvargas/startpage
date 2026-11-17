import { X } from "lucide-react";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const STORAGE_KEY = "startpage";

const defaultSettings = {
  background: { showImage: true, image: "", color: "#737373" },
  clock: { seconds: true, size: "large", format: "h24" },
  faviconSource: "google",
  language: "es",
  openInNewTab: true,
  credit: true,
};

const PRESET_COLORS = [
  { name: "Neutral 500", value: "#737373" },
  { name: "Slate 600", value: "#475569" },
  { name: "Zinc 600", value: "#52525b" },
  { name: "Red 600", value: "#dc2626" },
  { name: "Orange 500", value: "#f97316" },
  { name: "Amber 500", value: "#f59e0b" },
  { name: "Emerald 600", value: "#059669" },
  { name: "Teal 600", value: "#0d9488" },
  { name: "Sky 500", value: "#0ea5e9" },
  { name: "Blue 600", value: "#2563eb" },
  { name: "Indigo 600", value: "#4f46e5" },
  { name: "Violet 600", value: "#7c3aed" },
  { name: "Rose 600", value: "#e11d48" },
];

const getInitialSettings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw);
    return {
      ...defaultSettings,
      ...parsed,
      background: { ...defaultSettings.background, ...parsed.background },
      clock: { ...defaultSettings.clock, ...parsed.clock },
    };
  } catch {
    return defaultSettings;
  }
};

export default function SettingsModal({ showSettings, setShowSettings }) {
  const [activeTab, setActiveTab] = useState("background");

  const { register, watch, setValue } = useForm({
    defaultValues: getInitialSettings(),
  });

  // Valores observados para UI reactiva
  const showImage = watch("background.showImage");
  const imageUrl = watch("background.image");
  const bgColor = watch("background.color");
  const clockSeconds = watch("clock.seconds");
  const openInNewTab = watch("openInNewTab");
  const credit = watch("credit");

  // Auto-guardado cada vez que cambia cualquier campo
  useEffect(() => {
    const subscription = watch((formData) => {
      const existingData = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}",
      );
      const updatedState = { ...existingData, ...formData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
      window.dispatchEvent(new Event("storage"));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleLocalImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1920;
        const scale = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convierte a JPEG comprimido al 85% (pesa ~200-400 KB)
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.85);
        setValue("background.image", compressedBase64, { shouldDirty: true });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  if (!showSettings) return null;

  const tabs = [
    { id: "background", title: "Fondo de pantalla" },
    { id: "clock", title: "Reloj digital" },
    { id: "links", title: "Accesos directos" },
    { id: "general", title: "General" },
    { id: "about", title: "Acerca de" },
  ];

  const currentTabTitle = tabs.find((t) => t.id === activeTab)?.title;

  const handleClose = () => {
    setActiveTab("background");
    setShowSettings(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 backdrop-blur-xs">
      {/* box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-170 h-120 mx-auto flex overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/90 backdrop-blur-md text-black dark:text-white shadow-2xl"
      >
        {/* sidebar */}
        <div className="w-56 min-w-56 p-2.5 flex flex-col border-r border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50">
          <div className="w-full pl-2 my-2 flex items-center justify-between pr-2">
            <span className="font-medium">Ajustes</span>
            <span className="text-[11px] text-neutral-400">Auto-guardado</span>
          </div>
          <div className="w-full py-1 flex flex-col gap-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full px-3 h-10 cursor-pointer flex items-center justify-start gap-2.5 rounded-lg transition-all duration-300 ease-out 
                  ${
                    activeTab === tab.id
                      ? "bg-neutral-200/80 dark:bg-neutral-800/80 font-medium"
                      : "hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                  }`}
              >
                <div className="min-w-max size-full flex items-center justify-start select-none text-sm text-neutral-700 dark:text-neutral-300">
                  {tab.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* contenedor */}
        <div className="flex-1 flex flex-col">
          {/* header */}
          <div className="w-full py-2.5 px-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
            <span className="font-medium text-lg select-none">
              {currentTabTitle}
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="size-8 -mr-1.5 flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Contenido de ajustes */}
          <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-auto">
            {/* background */}
            {activeTab === "background" && (
              <div className="w-full flex flex-col gap-4">
                <FormField
                  label="Mostrar imagen de fondo"
                  caption="Desactívalo para usar únicamente un color sólido."
                  boolean
                  value={showImage}
                  onClick={() =>
                    setValue("background.showImage", !showImage, {
                      shouldDirty: true,
                    })
                  }
                />

                {showImage && (
                  <FormField
                    label="Enlace de la imagen de fondo"
                    caption="Ingresa el enlace de la imagen de fondo o la ruta local."
                    banner={!!imageUrl}
                    src={imageUrl}
                    link={true}
                    placeholder="https://cdn.domain.com/images/image.webp"
                    {...register("background.image")}
                  />
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">
                    O subir desde tu equipo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLocalImage}
                    className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 cursor-pointer"
                  />
                </div>

                {/* Selector de color sólido */}
                <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <label className="text-sm font-medium">
                    Color de fondo base
                  </label>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Se muestra cuando la imagen está desactivada o mientras
                    carga.
                  </p>
                  <div className="grid grid-cols-10 gap-2 pt-1">
                    {PRESET_COLORS.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        title={preset.name}
                        onClick={() =>
                          setValue("background.color", preset.value, {
                            shouldDirty: true,
                          })
                        }
                        className={`size-7 rounded-full border transition-transform cursor-pointer ${
                          bgColor === preset.value
                            ? "scale-110 border-white ring-2 ring-blue-500"
                            : "border-neutral-600 hover:scale-105"
                        }`}
                        style={{ backgroundColor: preset.value }}
                      />
                    ))}
                    <input
                      type="color"
                      value={bgColor || "#737373"}
                      onChange={(e) =>
                        setValue("background.color", e.target.value, {
                          shouldDirty: true,
                        })
                      }
                      title="Elegir color personalizado"
                      className={`size-7 p-0 rounded-full cursor-pointer bg-transparent border-0`}
                      style={{ backgroundColor: bgColor }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* reloj */}
            {activeTab === "clock" && (
              <div className="w-full flex flex-col gap-4">
                <FormField
                  label="Mostrar segundos"
                  caption="Al activar esta opción se mostraran los segundos en el reloj."
                  boolean
                  value={clockSeconds}
                  onClick={() =>
                    setValue("clock.seconds", !clockSeconds, {
                      shouldDirty: true,
                    })
                  }
                />
                <FormField
                  label="Tamaño del reloj"
                  caption="Elige el tamaño del reloj preferido."
                  select
                  options={[
                    { value: "small", label: "Pequeño" },
                    { value: "large", label: "Grande" },
                  ]}
                  {...register("clock.size")}
                />
                <FormField
                  label="Formato del reloj"
                  caption="Elige el formato del reloj preferido."
                  select
                  options={[
                    { value: "h12", label: "Reloj de 12 horas" },
                    { value: "h24", label: "Reloj de 24 horas" },
                  ]}
                  {...register("clock.format")}
                />
              </div>
            )}

            {/* links */}
            {activeTab === "links" && (
              <div className="w-full flex flex-col gap-4">
                <FormField
                  label="Abrir en nueva pestaña"
                  caption="Al activar esta opción los enlaces se abrirán en una nueva pestaña."
                  boolean
                  value={openInNewTab}
                  onClick={() =>
                    setValue("openInNewTab", !openInNewTab, {
                      shouldDirty: true,
                    })
                  }
                />
                <FormField
                  label="Proveedor de iconos (Favicons)"
                  caption="Cambia la fuente si algún sitio web no muestra su logo."
                  select
                  options={[
                    { value: "google", label: "Google (Recomendado)" },
                    { value: "duckduckgo", label: "DuckDuckGo" },
                    { value: "iconhorse", label: "Icon Horse (Alta calidad)" },
                    { value: "yandex", label: "Yandex" },
                  ]}
                  {...register("faviconSource")}
                />
              </div>
            )}

            {/* general */}
            {activeTab === "general" && (
              <div className="w-full flex flex-col gap-4">
                <FormField
                  label="Idioma / Language"
                  caption="Selecciona el idioma de la interfaz."
                  select
                  options={[
                    { value: "es", label: "Español" },
                    { value: "en", label: "English" },
                  ]}
                  {...register("language")}
                />
              </div>
            )}

            {/* about */}
            {activeTab === "about" && (
              <div className="w-full flex flex-col gap-4">
                <FormField label="Versión" readOnly placeholder="v1.0.0" />
                <FormField
                  label="Mostrar crédito"
                  caption="Si desactivas esto no pasa nada, solo es para que sepas quién es el creador de esta extensión."
                  boolean
                  value={credit}
                  onClick={() =>
                    setValue("credit", !credit, { shouldDirty: true })
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
