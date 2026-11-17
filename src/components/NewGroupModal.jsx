import { ChevronLeft, X } from "lucide-react";
import { useState } from "react";
import { iconsList } from "../constants";
import { generateUniqueId } from "../utils";

const STORAGE_KEY = "startpage";

export default function NewGroupModal({
  showNewGroup,
  setShowNewGroup,
  setShowManageGroup,
  groupToEdit,
  setGroupToEdit,
}) {
  const [selectedIcon, setSelectedIcon] = useState(groupToEdit?.iconName || "");
  const [groupName, setGroupName] = useState(groupToEdit?.title || "");

  if (!showNewGroup) return null;

  const handleBack = () => {
    setShowNewGroup(false);
    setShowManageGroup(true);
  };

  const handleClose = () => {
    setSelectedIcon("");
    setGroupName("");
    if (setGroupToEdit) setGroupToEdit(null);
    setShowNewGroup(false);
  };

  const handleSaveGroup = () => {
    if (!groupName.trim()) {
      alert("Por favor, ingresa un nombre para el grupo.");
      return;
    }
    if (!selectedIcon) {
      alert("Por favor, selecciona un icono.");
      return;
    }

    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const currentGroups = existingData.groups || [];

    const updatedGroups = groupToEdit
      ? currentGroups.map((group) =>
          group.id === groupToEdit.id
            ? { ...group, title: groupName.trim(), iconName: selectedIcon }
            : group,
        )
      : [
          ...currentGroups,
          {
            id: generateUniqueId(),
            title: groupName.trim(),
            iconName: selectedIcon,
          },
        ];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...existingData, groups: updatedGroups }),
    );
    window.dispatchEvent(new Event("storage"));

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 backdrop-blur-xs">
      {/* caja */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-125 mx-auto flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md text-white shadow-2xl"
      >
        {/* header */}
        <div className="w-full p-2.5 flex items-center justify-between border-b border-neutral-800">
          <button
            type="button"
            onClick={handleBack}
            className="size-8 min-w-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <div className="w-full flex items-center justify-center">
            <span className="font-bold text-base">
              {groupToEdit ? "Editar grupo" : "Añadir grupo"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="size-8 min-w-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* main */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Icono */}
          <div className="w-full flex flex-col gap-2">
            <label className="font-medium text-sm">Icono</label>
            <div className="w-full p-1 grid grid-cols-12 grid-rows-4 gap-0.5 rounded-md bg-neutral-950/95 border border-neutral-800">
              {iconsList.map(({ id, Icon, title }) => {
                if (!Icon) return null;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedIcon(id)}
                    className={`size-8 flex items-center justify-center rounded-md cursor-pointer transition-colors ${
                      selectedIcon === id
                        ? "bg-neutral-800/50 border border-neutral-800 text-white"
                        : "hover:bg-neutral-800/50 border border-transparent hover:border-neutral-800 text-neutral-400 hover:text-white"
                    }`}
                    title={title}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nombre del grupo */}
          <div className="w-full flex flex-col gap-2">
            <label className="font-medium text-sm">Nombre del grupo</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Nombre del grupo"
              className="w-full h-10 px-3 rounded-md bg-neutral-950/95 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={handleSaveGroup}
            className="w-full h-10 px-4 rounded-md bg-neutral-50 hover:bg-neutral-300 font-medium text-sm text-black transition-colors cursor-pointer"
          >
            {groupToEdit ? "Guardar cambios" : "Agregar grupo"}
          </button>
        </div>
      </div>
    </div>
  );
}
