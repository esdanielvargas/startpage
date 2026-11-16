import { Edit, MoreVertical, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { formatUrl, getFavicon } from "../utils";

const STORAGE_KEY = "startpage";

export default function LinkGrid({
  size,
  links = [],
  selectedGroup,
  setShowNewLink,
  setLinkToEdit, // Nueva prop para pasar el enlace a editar al modal
}) {
  const [cols, setCols] = useState(12);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 768) setCols(4);
      else if (window.innerWidth < 1024) setCols(8);
      else setCols(12);
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  // Cierra el menú de tres puntos si haces clic fuera
  useEffect(() => {
    const closeMenu = () => setOpenMenuId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const maxRows = size === "large" ? 4 : 7;
  const itemsPerPage = cols * maxRows;

  const [currentPage, setCurrentPage] = useState(0);
  const [prevGroup, setPrevGroup] = useState(selectedGroup);

  if (selectedGroup !== prevGroup) {
    setPrevGroup(selectedGroup);
    setCurrentPage(0);
  }

  // Compatibilidad con groupId o group
  const filteredLinks = (links || []).filter((link) => {
    const linkGroup = link.groupId ?? link.group;
    return selectedGroup ? linkGroup === selectedGroup : true;
  });

  const allItems = [...filteredLinks, { isAddButton: true }];
  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  if (currentPage >= totalPages && totalPages > 0) {
    setCurrentPage(totalPages - 1);
  }

  const startIndex = currentPage * itemsPerPage;
  const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);

  // --- ELIMINAR ENLACE ---
  const handleDeleteLink = (e, linkId) => {
    e.preventDefault();
    e.stopPropagation();
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const updatedLinks = (existingData.links || []).filter(
      (l) => l.id !== linkId
    );
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...existingData, links: updatedLinks })
    );
    window.dispatchEvent(new Event("storage"));
    setOpenMenuId(null);
  };

  // --- ABRIR MODAL EN MODO EDICIÓN ---
  const handleEditLink = (e, link) => {
    e.preventDefault();
    e.stopPropagation();
    if (setLinkToEdit) setLinkToEdit(link);
    setOpenMenuId(null);
    setShowNewLink(true);
  };

  return (
    <div className="w-full md:max-w-200 lg:max-w-300 mx-auto flex flex-col items-center justify-center gap-3">
      <div className="w-full px-4 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-1">
        {currentItems.map((item, index) => {
          if (item.isAddButton) {
            return (
              <button
                key="add-btn"
                type="button"
                onClick={() => {
                  if (setLinkToEdit) setLinkToEdit(null);
                  setShowNewLink(true);
                }}
                className="relative w-full h-full min-w-20 min-h-20 py-5 flex flex-col items-center justify-center gap-1.5 group rounded-xl bg-neutral-950/50 backdrop-blur-sm overflow-hidden text-white cursor-pointer transition-colors"
              >
                <div className="absolute inset-0 z-0 bg-neutral-800/50 group-hover:bg-neutral-900/50 transition-colors"></div>
                <div className="size-8 z-1 flex items-center justify-center">
                  <Plus size={30} strokeWidth={1.5} />
                </div>
                <span className="z-1 text-xs">Agregar</span>
              </button>
            );
          }

          const isMenuOpen = openMenuId === item.id;

          return (
            <div key={item.id || index} className="relative group">
              <a
                href={formatUrl(item.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full min-w-20 min-h-20 py-5 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-neutral-950/50 hover:bg-neutral-900/50 backdrop-blur-sm text-white cursor-pointer transition-colors"
                title={item.title}
              >
                <img
                  src={getFavicon(item.url)}
                  width={32}
                  height={32}
                  loading="eager"
                  fetchPriority="high"
                  alt={`Ir a «${item.title}»`}
                  className="w-8 h-8 rounded-md"
                />
                {item.title && (
                  <span className="text-xs truncate w-18 text-center">
                    {item.title}
                  </span>
                )}
              </a>

              {/* Botón de 3 puntos (visible al hacer hover o si el menú está abierto) */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenMenuId(isMenuOpen ? null : item.id);
                }}
                className={`absolute top-1.5 right-1.5 size-6 flex items-center justify-center rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800/90 transition-opacity cursor-pointer ${
                  isMenuOpen ? "opacity-100 bg-neutral-800/90 text-white" : "opacity-0 group-hover:opacity-100"
                }`}
                title="Opciones"
              >
                <MoreVertical size={14} />
              </button>

              {/* Menú desplegable */}
              {isMenuOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-8 right-1.5 z-30 w-28 py-1 rounded-lg border border-neutral-800 bg-neutral-900/95 backdrop-blur-md shadow-xl flex flex-col text-xs"
                >
                  <button
                    type="button"
                    onClick={(e) => handleEditLink(e, item)}
                    className="w-full px-2.5 py-1.5 flex items-center gap-2 text-neutral-200 hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <Edit size={13} />
                    <span>Editar</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteLink(e, item.id)}
                    className="w-full px-2.5 py-1.5 flex items-center gap-2 text-rose-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <Trash size={13} />
                    <span>Eliminar</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Indicadores del Carrusel */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-2 h-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              aria-label={`Ir a la página ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ease-out cursor-pointer ${
                currentPage === i
                  ? "bg-white w-5"
                  : "bg-white/30 hover:bg-white/60 w-1.5"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}