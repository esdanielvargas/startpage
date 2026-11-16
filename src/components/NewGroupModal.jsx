import { X } from "lucide-react";
import { useState } from "react";
import { iconsList } from "../constants";
import { generateUniqueId } from "../utils";

const STORAGE_KEY = "startpage";

export default function NewGroupModal({ showNewGroup, setShowNewGroup }) {
  // Estados para capturar los datos del formulario
  const [selectedIcon, setSelectedIcon] = useState("");
  const [groupName, setGroupName] = useState("");

  if (!showNewGroup) return null;

  const handleOverlayClick = () => {
    // Limpiamos los estados al cerrar el modal
    setSelectedIcon("");
    setGroupName("");
    setShowNewGroup(false);
  };

  const handleAddGroup = () => {
    // Validaciones básicas
    if (!groupName.trim()) {
      alert("Por favor, ingresa un nombre para el grupo.");
      return;
    }
    if (!selectedIcon) {
      alert("Por favor, selecciona un icono.");
      return;
    }

    // Obtenemos el estado actual del localStorage
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const currentGroups = existingData.groups || [];

    // Construimos el nuevo objeto de grupo
    const newGroup = {
      id: generateUniqueId(),
      title: groupName.trim(),
      iconName: selectedIcon,
    };

    // Actualizamos los datos
    const updatedState = {
      ...existingData,
      groups: [...currentGroups, newGroup],
    };

    // Guardamos y avisamos a la app
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    window.dispatchEvent(new Event("storage"));

    // Limpiamos y cerramos
    handleOverlayClick();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 backdrop-blur-xs"
    >
      {/* caja */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-125 h-120 mx-auto flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md text-white shadow-2xl"
      >
        {/* header */}
        <div className="w-full p-2.5 flex items-center justify-between border-b border-neutral-800">
          <div className="w-full pl-2 flex items-center">
            <span className="font-bold text-base">Añadir grupo</span>
          </div>
          <button
            type="button"
            onClick={handleOverlayClick}
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
            onClick={handleAddGroup}
            className="w-full h-10 px-4 rounded-md bg-neutral-50 hover:bg-neutral-300 font-medium text-sm text-black transition-colors cursor-pointer mt-4"
          >
            Añadir grupo
          </button>
        </div>
      </div>
    </div>
  );
}
