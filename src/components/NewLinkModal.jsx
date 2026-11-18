import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { formatUrl, generateUniqueId } from "../utils";
import Button from "./Button";
import FormField from "./FormField";
import { t } from "../translations";

const STORAGE_KEY = "startpage";

export default function NewLinkModal({
  lang,
  showNewLink,
  setShowNewLink,
  selectedGroup,
  groups = [],
  linkToEdit,
  setLinkToEdit,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: linkToEdit?.title || "",
      url: linkToEdit?.url || "",
      group:
        linkToEdit?.groupId ??
        linkToEdit?.group ??
        selectedGroup ??
        groups[0]?.id ??
        "",
    },
  });

  if (!showNewLink) return null;

  const handleClose = () => {
    reset();
    if (setLinkToEdit) setLinkToEdit(null);
    setShowNewLink(false);
  };

  const onSubmit = (data) => {
    // Obtenemos el estado actual del localStorage
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const currentLinks = existingData.links || [];

    const updatedLinks = linkToEdit
      ? currentLinks.map((item) =>
          item.id === linkToEdit.id
            ? {
                ...item,
                title: data.title.trim(),
                url: formatUrl(data.url),
                group: data.group || null,
              }
            : item,
        )
      : [
          ...currentLinks,
          {
            id: generateUniqueId(),
            title: data.title.trim(),
            url: formatUrl(data.url),
            group: data.group || selectedGroup || null,
          },
        ];

    // Guardamos y disparamos el evento para que la interfaz se entere
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...existingData, links: updatedLinks }),
    );
    window.dispatchEvent(new Event("storage"));

    // Limpiamos y cerramos el modal
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 backdrop-blur-xs">
      {/* caja */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-125 mx-auto flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-100 dark:bg-neutral-900/90 backdrop-blur-md shadow-2xl"
      >
        <div className="w-full p-2.5 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
          <div className="w-full pl-2 flex items-center">
            <span className="font-bold text-base">{t(lang, "links.title")}</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="size-8 min-w-8 flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <FormField
            label={t(lang, "links.webTitle.label")}
            caption={t(lang, "links.webTitle.caption")}
            placeholder={t(lang, "links.webTitle.placeholder")}
            {...register("title", { required: "El nombre es obligatorio" })}
            error={errors.title && errors.title.message}
          />
          <FormField
            label={t(lang, "links.webLink.label")}
            caption={t(lang, "links.webLink.caption")}
            placeholder={t(lang, "links.webLink.placeholder")}
            {...register("url", { required: "La URL es obligatoria" })}
            error={errors.url && errors.url.message}
          />
          <Button type="submit" full>
            {linkToEdit ? "Guardar cambios" : t(lang, "actions.addWebsite")}
          </Button>
        </form>
      </div>
    </div>
  );
}
