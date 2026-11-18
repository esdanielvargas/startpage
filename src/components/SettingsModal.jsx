import { X } from "lucide-react";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { t } from "../translations";

const STORAGE_KEY = "startpage";

const defaultSettings = {
  background: { showImage: true, image: "", color: "#737373" },
  clock: { seconds: true, size: "large", format: "h24" },
  faviconSource: "google",
  lang: "en",
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

export default function SettingsModal({
  lang,
  showSettings,
  setShowSettings,
}) {
  const [activeTab, setActiveTab] = useState("background");

  const { register, watch, setValue, reset } = useForm({
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
    { id: "background", title: t(lang, "settings.tabs.background") },
    { id: "clock", title: t(lang, "settings.tabs.clock") },
    { id: "links", title: t(lang, "settings.tabs.links") },
    { id: "general", title: t(lang, "settings.tabs.general") },
    { id: "about", title: t(lang, "settings.tabs.about") },
  ];

  const currentTabTitle = tabs.find((t) => t.id === activeTab)?.title;

  const handleClose = () => {
    setActiveTab("background");
    setShowSettings(false);
  };

  // EXPORTAR: Descarga un archivo startpage-backup-YYYY-MM-DD.json
  const handleExportData = () => {
    const raw = localStorage.getItem(STORAGE_KEY) || "{}";
    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `startpage-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  // IMPORTAR: Lee el .json, valida su estructura y actualiza toda la app
  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (typeof parsed !== "object" || parsed === null) {
          throw new Error("Formato inválido");
        }

        const merged = { ...defaultSettings, ...parsed };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        window.dispatchEvent(new Event("storage"));
        reset(merged); // Actualiza los inputs del modal al instante
        alert(t(lang, "general.backup.importSuccess"));
      } catch {
        alert(t(lang, "general.backup.importError"));
      } finally {
        e.target.value = ""; // Permite volver a seleccionar el mismo archivo
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 backdrop-blur-xs">
      {/* box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-170 h-120 mx-auto flex overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950/90 backdrop-blur-md text-black dark:text-white shadow-2xl"
      >
        {/* sidebar */}
        <div className="w-56 min-w-56 p-2.5 flex flex-col border-r border-neutral-200 dark:border-neutral-800 bg-neutral-200/25 dark:bg-neutral-900/50">
          <div className="w-full pl-2 my-2 flex items-center justify-between pr-2">
            <span className="font-medium">{t(lang, "settings.title")}</span>
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
              title={t(lang, "actions.close")}
              className="size-8 -mr-1.5 flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Contenido de ajustes */}
          <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
            {/* background */}
            {activeTab === "background" && (
              <div className="w-full flex flex-col gap-4">
                <FormField
                  label={t(lang, "background.showImage.label")}
                  caption={t(lang, "background.showImage.caption")}
                  boolean
                  value={showImage}
                  onClick={() =>
                    setValue("background.showImage", !showImage, {
                      shouldDirty: true,
                    })
                  }
                />

                <div className="flex flex-col gap-2">
                  {showImage && (
                    <FormField
                      label={t(lang, "background.imageUrl.label")}
                      caption={t(lang, "background.imageUrl.caption")}
                      banner={!!imageUrl}
                      src={imageUrl}
                      link={true}
                      placeholder="https://cdn.domain.com/images/image.webp"
                      {...register("background.image")}
                    />
                  )}

                  <div className="flex items-center gap-3">
                    <label className="py-2.5 px-3.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-white cursor-pointer transition-colors select-none">
                      {t(lang, "background.localImage.button")}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLocalImage}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-neutral-400 truncate max-w-48">
                      {imageUrl?.startsWith("data:")
                        ? t(lang, "background.localImage.loaded")
                        : t(lang, "background.localImage.empty")}
                    </span>
                  </div>
                </div>

                {/* Selector de color sólido */}
                <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <FormField
                    label={t(lang, "background.baseColor.label")}
                    caption={t(lang, "background.baseColor.caption")}
                  />
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
                            ? "scale-110 border-transparent ring-2 ring-sky-500"
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
                  label={t(lang, "clock.showSeconds.label")}
                  caption={t(lang, "clock.showSeconds.caption")}
                  boolean
                  value={clockSeconds}
                  onClick={() =>
                    setValue("clock.seconds", !clockSeconds, {
                      shouldDirty: true,
                    })
                  }
                />
                <FormField
                  label={t(lang, "clock.size.label")}
                  caption={t(lang, "clock.size.caption")}
                  select
                  options={[
                    {
                      value: "small",
                      label: t(lang, "clock.size.options.small"),
                    },
                    {
                      value: "large",
                      label: t(lang, "clock.size.options.large"),
                    },
                  ]}
                  {...register("clock.size")}
                />
                <FormField
                  label={t(lang, "clock.format.label")}
                  caption={t(lang, "clock.format.caption")}
                  select
                  options={[
                    {
                      value: "h12",
                      label: t(lang, "clock.format.options.h12"),
                    },
                    {
                      value: "h24",
                      label: t(lang, "clock.format.options.h24"),
                    },
                  ]}
                  {...register("clock.format")}
                />
              </div>
            )}

            {/* links */}
            {activeTab === "links" && (
              <div className="w-full flex flex-col gap-4">
                <FormField
                  label={t(lang, "links.openInNewTab.label")}
                  caption={t(lang, "links.openInNewTab.caption")}
                  boolean
                  value={openInNewTab}
                  onClick={() =>
                    setValue("openInNewTab", !openInNewTab, {
                      shouldDirty: true,
                    })
                  }
                />
                <FormField
                  label={t(lang, "links.faviconProvider.label")}
                  caption={t(lang, "links.faviconProvider.caption")}
                  select
                  options={[
                    {
                      value: "google",
                      label: t(lang, "links.faviconProvider.options.google"),
                    },
                    {
                      value: "duckduckgo",
                      label: t(
                        lang,
                        "links.faviconProvider.options.duckduckgo",
                      ),
                    },
                    {
                      value: "iconhorse",
                      label: t(lang, "links.faviconProvider.options.iconhorse"),
                    },
                    {
                      value: "yandex",
                      label: t(lang, "links.faviconProvider.options.yandex"),
                    },
                  ]}
                  {...register("faviconSource")}
                />
              </div>
            )}

            {/* general */}
            {activeTab === "general" && (
              <div className="w-full flex flex-col gap-4">
                <FormField
                  label={t(lang, "general.language.label")}
                  caption={t(lang, "general.language.caption")}
                  select
                  options={[
                    { value: "es", label: "Español" },
                    { value: "en", label: "English" },
                  ]}
                  {...register("lang")}
                />
                <div className="flex flex-col gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <span className="text-sm font-medium">
                    {t(lang, "general.backup.label")}
                  </span>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {t(lang, "general.backup.caption")}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleExportData}
                      className="px-3.5 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-xs font-medium cursor-pointer transition-colors"
                    >
                      {t(lang, "general.backup.exportBtn")}
                    </button>

                    <label className="px-3.5 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black hover:opacity-90 text-xs font-medium cursor-pointer transition-opacity">
                      {t(lang, "general.backup.importBtn")}
                      <input
                        type="file"
                        accept="application/json"
                        onChange={handleImportData}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* about */}
            {activeTab === "about" && (
              <div className="w-full flex flex-col gap-4">
                <FormField
                  label={t(lang, "about.version")}
                  readOnly
                  placeholder="v1.1.0"
                />
                <FormField
                  label={t(lang, "about.credit.label")}
                  caption={t(lang, "about.credit.caption")}
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
