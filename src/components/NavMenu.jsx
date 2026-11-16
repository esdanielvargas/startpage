import { Plus, Settings2 } from "lucide-react";
import { useState } from "react";
import { iconsList } from "../constants";

const STORAGE_KEY = "startpage";

export default function NavMenu({
  groups = [],
  max_groups,
  selectedGroup,
  setSelectedGroup,
  setShowNewGroup,
  setShowManageGroup,
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [dropPosition, setDropPosition] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    // Detectamos si el cursor está en la mitad izquierda o derecha de la píldora
    const rect = e.currentTarget.getBoundingClientRect();
    const midX = rect.left + rect.width / 2;
    const position = e.clientX < midX ? "left" : "right";

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

    // Calculamos el índice de inserción horizontal
    let insertIndex = targetIndex;
    if (draggedIndex < targetIndex && dropPosition === "left") {
      insertIndex = targetIndex - 1;
    } else if (draggedIndex > targetIndex && dropPosition === "right") {
      insertIndex = targetIndex + 1;
    }

    updatedGroups.splice(insertIndex, 0, movedItem);

    // Guardamos el nuevo orden en localStorage y notificamos a la app
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...existingData, groups: updatedGroups })
    );
    window.dispatchEvent(new Event("storage"));

    resetDragState();
  };

  const resetDragState = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setDropPosition(null);
  };

  return (
    <div className="w-full md:max-w-200 lg:max-w-300 px-4 mx-auto flex items-center justify-center">
      <nav className="w-auto md:max-w-200 p-1 flex items-center justify-start gap-0.5 overflow-hidden overflow-x-auto rounded-full bg-neutral-950/50 backdrop-blur-sm">
        {groups?.length > 0 &&
          groups?.slice(0, max_groups).map((category, index) => {
            const iconFiltered = iconsList.find(
              (icon) => icon.id === category.iconName
            );

            const isDragging = draggedIndex === index;
            const isOverLeft =
              dragOverIndex === index && dropPosition === "left";
            const isOverRight =
              dragOverIndex === index && dropPosition === "right";

            return (
              <button
                key={category.id || index}
                type="button"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={resetDragState}
                onClick={() => setSelectedGroup(category.id)}
                className={`relative h-9 px-3.5 pr-4 flex items-center justify-center gap-1.5 rounded-full text-white cursor-pointer transition-all duration-200 ease-out ${
                  selectedGroup === category.id
                    ? "bg-neutral-800/75"
                    : "hover:bg-neutral-800/50"
                } ${isDragging ? "opacity-40 scale-95" : ""} ${
                  isOverLeft ? "border-l-2 border-sky-500" : ""
                } ${isOverRight ? "border-r-2 border-sky-500" : ""}`}
                title={category.title}
              >
                {iconFiltered?.Icon && <iconFiltered.Icon size={16} />}
                {category.title && (
                  <span className="mt-0.5 text-sm select-none">
                    {category.title}
                  </span>
                )}
              </button>
            );
          })}

        <button
          type="button"
          title="Gestionar o agregar grupos"
          onClick={() => {
            if (groups?.length > 0) {
              setShowManageGroup(true);
            } else {
              setShowNewGroup(true);
            }
          }}
          className="size-9 min-w-9 flex items-center justify-center gap-1.5 rounded-full bg-neutral-800/50 hover:bg-neutral-900/50 text-white cursor-pointer transition-all duration-300 ease-out"
        >
          {groups?.length > 0 ? (
            <Settings2 size={18} strokeWidth={1.5} />
          ) : (
            <Plus size={20} strokeWidth={1.5} />
          )}
        </button>
      </nav>
    </div>
  );
}