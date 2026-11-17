import { Edit, Menu, Trash, X } from "lucide-react";
import { useState } from "react";
import { iconsList } from "../constants";
import Button from "./Button";

const STORAGE_KEY = "startpage";

export default function ManageGroups({
  groups,
  showManageGroup,
  setShowManageGroup,
  setShowNewGroup,
  setGroupToEdit, // Estado del padre para pasar el grupo a editar al modal
}) {
  // Estados para el Drag & Drop
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [dropPosition, setDropPosition] = useState(null); // "before" | "after"
  const [canDrag, setCanDrag] = useState(false);

  if (!showManageGroup) return null;

  // Función centralizada para guardar cambios en localStorage
  const saveGroupsToStorage = (updatedGroups) => {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const updatedState = {
      ...existingData,
      groups: updatedGroups,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    window.dispatchEvent(new Event("storage"));
  };

  // --- ELIMINAR GRUPO ---
  const handleDeleteGroup = (groupId) => {
    const updatedGroups = groups.filter((g) => g.id !== groupId);
    saveGroupsToStorage(updatedGroups);
  };

  // --- EDITAR GRUPO ---
  const handleEditClick = (group) => {
    if (setGroupToEdit) {
      setGroupToEdit(group);
    }
    setShowManageGroup(false);
    setShowNewGroup(true);
  };

  // --- LÓGICA DE ARRASTRE (DRAG & DROP) ---
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Necesario para Firefox
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    // Calculamos si el cursor está en la mitad superior (antes) o inferior (después)
    const rect = e.currentTarget.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const position = e.clientY < midY ? "before" : "after";

    setDragOverIndex(index);
    setDropPosition(position);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      resetDragState();
      return;
    }

    const updatedGroups = [...groups];
    const [movedItem] = updatedGroups.splice(draggedIndex, 1);

    // Ajustamos el índice destino según si se soltó antes o después
    let insertIndex = targetIndex;
    if (draggedIndex < targetIndex && dropPosition === "before") {
      insertIndex = targetIndex - 1;
    } else if (draggedIndex > targetIndex && dropPosition === "after") {
      insertIndex = targetIndex + 1;
    }

    updatedGroups.splice(insertIndex, 0, movedItem);
    saveGroupsToStorage(updatedGroups);
    resetDragState();
  };

  const resetDragState = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setDropPosition(null);
    setCanDrag(false);
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
          <div className="w-full pl-2 flex items-center">
            <span className="font-bold text-base">Gestionar grupos</span>
          </div>
          <button
            type="button"
            onClick={() => setShowManageGroup(false)}
            className="size-8 min-w-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* lista de grupos */}
        <div className="size-full p-2.5 flex flex-col gap-2.5 overflow-y-auto">
          {groups.map((group, index) => {
            const iconFiltered = iconsList.find(
              (icon) => icon.id === group.iconName,
            );

            // Clases dinámicas para mostrar la línea azul de "antes" o "después"
            const isDragging = draggedIndex === index;
            const isOverBefore =
              dragOverIndex === index && dropPosition === "before";
            const isOverAfter =
              dragOverIndex === index && dropPosition === "after";

            return (
              <div
                key={group.id}
                draggable={canDrag}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={resetDragState}
                className={`relative w-full h-10 pl-2.5 flex items-center justify-between rounded-lg transition-colors select-none ${
                  isDragging
                    ? "opacity-40 bg-neutral-800"
                    : "hover:bg-neutral-800/75"
                } ${isOverBefore ? "border-t-2 border-sky-500" : ""} ${
                  isOverAfter ? "border-b-2 border-sky-500" : ""
                }`}
              >
                <div className="w-full flex items-center gap-2 overflow-hidden">
                  {iconFiltered?.Icon && <iconFiltered.Icon size={18} />}
                  <span className="text-xs truncate">{group.title}</span>
                </div>

                <div className="flex items-center justify-end shrink-0">
                  {/* Botón Editar */}
                  <button
                    type="button"
                    onClick={() => handleEditClick(group)}
                    title="Editar grupo"
                    className="size-8 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Edit size={16} strokeWidth={1.5} />
                  </button>

                  {/* Botón Eliminar */}
                  <button
                    type="button"
                    onClick={() => handleDeleteGroup(group.id)}
                    title="Eliminar grupo"
                    className="size-8 flex items-center justify-center text-rose-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Trash size={16} strokeWidth={1.5} />
                  </button>

                  <div className="w-px h-5 bg-neutral-800 mx-1"></div>

                  {/* Handle para arrastrar */}
                  <button
                    type="button"
                    title="Arrastrar para reordenar"
                    onMouseDown={() => setCanDrag(true)}
                    onMouseUp={() => setCanDrag(false)}
                    className="size-8 flex items-center justify-center text-neutral-400 hover:text-white cursor-grab active:cursor-grabbing"
                  >
                    <Menu size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="w-full h-px bg-neutral-800"></div>

          <Button
            full
            onClick={() => {
              if (setGroupToEdit) setGroupToEdit(null); // Asegura que abra en modo "crear"
              setShowManageGroup(false);
              setShowNewGroup(true);
            }}
          >
            Agregar nuevo grupo
          </Button>
        </div>
      </div>
    </div>
  );
}
