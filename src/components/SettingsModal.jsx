import { X } from "lucide-react";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";

const STORAGE_KEY = "startpage";

const defaultSettings = {
  background: { image: "", color: "" },
  clock: { seconds: true, size: "large", format: "h24" },
  openInNewTab: true,
  credit: true,
};

const getInitialSettings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

export default function SettingsModal({ showSettings, setShowSettings }) {
  const [activeTab, setActiveTab] = useState("background");

  const { register, watch, handleSubmit, reset, setValue } = useForm({
    defaultValues: getInitialSettings()
  });

  const imageUrl = watch("background.image");
  const clockSeconds = watch("clock.seconds");
  const openInNewTab = watch("openInNewTab");
  const credit = watch("credit");

  useEffect(() => {
    if (showSettings) {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        reset(JSON.parse(storedData));
      }
    }
  }, [showSettings, reset]);

  if (!showSettings) return null;

  // Lista de pestañas y títulos (centralizado)
  const tabs = [
    { id: "background", title: "Fondo de pantalla" },
    { id: "clock", title: "Reloj digital" },
    { id: "links", title: "Accesos directos" },
    { id: "about", title: "Acerca de" },
  ];

  // Buscamos el título de la pestaña activa para el header
  const currentTabTitle = tabs.find((t) => t.id === activeTab)?.title;

  const onSubmit = (formData) => {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const updatedState = { ...existingData, ...formData };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 backdrop-blur-xs"
      onClick={() => setShowSettings(false)}
    >
      {/* box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-170 h-120 mx-auto flex overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/90 backdrop-blur-md text-black dark:text-white shadow-2xl"
      >
        {/* sidebar */}
        <div className="w-56 p-2.5 flex flex-col border-r border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50">
          <div className="w-full pl-2 my-2 flex items-center">
            <span className="font-medium">Ajustes</span>
          </div>
          <div className="w-full py-1 flex flex-col gap-px">
            {tabs.map((tab, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                // className="w-full px-3 h-10 cursor-pointer flex items-center justify-start gap-2.5 rounded-lg transition-all duration-300 ease-out hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 active:bg-neutral-200/75 dark:active:bg-neutral-800/75"
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
              onClick={() => setShowSettings(false)}
              className="size-8 -mr-1.5 flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Contenido de ajustes */}
          <div className="w-full h-full p-4 flex flex-col gap-4 overflow-y-auto">
            {/* background */}
            {activeTab === "background" && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4"
              >
                <FormField
                  label="Enlace de la imagen de fondo"
                  caption="Ingresa el enlace de la imagen de fondo o la ruta local."
                  banner={!!imageUrl}
                  src={imageUrl}
                  link={true}
                  placeholder="https://cdn.domain.com/images/image.webp"
                  {...register("background.image")}
                />
                <Button type="submit">Guardar</Button>
              </form>
            )}
            {/* reloj */}
            {activeTab === "clock" && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4"
              >
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
                  caption="Elige tu tamaño del reloj preferido."
                  select
                  options={[
                    { value: "small", label: "Pequeño" },
                    { value: "large", label: "Grande" },
                  ]}
                  {...register("clock.size")}
                />
                <FormField
                  label="Formato del reloj"
                  caption="Elije tu formato del reloj preferido."
                  select
                  options={[
                    { value: "h12", label: "Reloj de 12 horas" },
                    { value: "h24", label: "Reloj de 24 horas" },
                  ]}
                  {...register("clock.format")}
                />
                <Button type="submit">Guardar</Button>
              </form>
            )}
            {/* links */}
            {activeTab === "links" && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-2"
              >
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
                <Button type="submit">Guardar</Button>
              </form>
            )}
            {/* about */}
            {activeTab === "about" && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4"
              >
                <FormField label="Versión" readOnly placeholder="v1.0.0" />
                <FormField
                  label="Mostrar crédito"
                  caption="Se desactivas esto no pasa nada, solo es para que sepas quien es el creador de esta extensión, agradecería mucho que compartas esta extensión con tus amistades o conocidos."
                  boolean
                  value={credit}
                  onClick={() =>
                    setValue("credit", !credit, { shouldDirty: true })
                  }
                />
                <Button type="submit">Guardar</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
