import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { formatUrl, generateUniqueId } from "../utils";

const STORAGE_KEY = "startpage";

export default function NewLinkModal({
  showNewLink,
  setShowNewLink,
  selectedGroup,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!showNewLink) return null;

  const handleClose = () => {
    reset();
    setShowNewLink(false);
  };

  const onSubmit = (data) => {
    // Obtenemos el estado actual del localStorage
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const currentLinks = existingData.links || [];

    // Construimos el nuevo objeto de enlace
    const newLink = {
      id: generateUniqueId(),
      title: data.title.trim(),
      url: formatUrl(data.url),
      group: selectedGroup || existingData.groups?.[0]?.id || null,
    };

    // Actualizamos el objeto general de "startpage"
    const updatedState = {
      ...existingData,
      links: [...currentLinks, newLink],
    };

    // Guardamos y disparamos el evento para que la interfaz se entere
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    window.dispatchEvent(new Event("storage"));

    // Limpiamos y cerramos el modal
    handleClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 backdrop-blur-xs"
    >
      {/* caja */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-125 mx-auto flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md text-white shadow-2xl"
      >
        <div className="w-full p-2.5 flex items-center justify-between border-b border-neutral-800">
          <div className="w-full pl-2 flex items-center">
            <span className="font-bold text-base">Añadir enlace</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="size-8 min-w-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div className="w-full flex flex-col gap-2">
            <label className="font-medium text-sm">Nombre</label>
            <input
              type="text"
              placeholder="Example"
              className="w-full h-10 px-3 rounded-md bg-neutral-950/95 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors"
              {...register("title", { required: "El nombre es obligatorio" })}
            />
            {errors.title && (
              <span className="text-xs text-red-400">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="font-medium text-sm">Enlace</label>
            <input
              type="text"
              placeholder="https://example.com"
              className="w-full h-10 px-3 rounded-md bg-neutral-950/95 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors"
              {...register("url", { required: "La URL es obligatoria" })}
            />
            {errors.link && (
              <span className="text-xs text-red-400">
                {errors.link.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-10 px-4 rounded-md bg-neutral-50 hover:bg-neutral-300 font-medium text-sm text-black transition-colors cursor-pointer"
          >
            Añadir enlace
          </button>
        </form>
      </div>
    </div>
  );
}
