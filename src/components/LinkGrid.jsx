import { Plus } from "lucide-react";
import { formatUrl, getFavicon } from "../utils";
import { useState, useEffect } from "react";

export default function LinkGrid({ size, links, selectedGroup, setShowNewLink }) {
  const [cols, setCols] = useState(12);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 768) setCols(4); // Móvil
      else if (window.innerWidth < 1024) setCols(8); // Tablet
      else setCols(12); // Escritorio
    };
    
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const maxRows = size === "large" ? 4 : 7;
  const itemsPerPage = cols * maxRows;

  const [currentPage, setCurrentPage] = useState(0);
  const [prevGroup, setPrevGroup] = useState(selectedGroup);

  if (selectedGroup !== prevGroup) {
    setPrevGroup(selectedGroup);
    setCurrentPage(0);
  }

  const filteredLinks = links.filter((link) =>
    selectedGroup ? link.group === selectedGroup : true
  );

  const allItems = [...filteredLinks, { isAddButton: true }];
  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  if (currentPage >= totalPages && totalPages > 0) {
    setCurrentPage(totalPages - 1);
  }

  const startIndex = currentPage * itemsPerPage;
  const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full md:max-w-200 lg:max-w-300 mx-auto flex flex-col items-center justify-center gap-3">
      
      <div className="w-full px-4 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-1">
        {currentItems.map((item, index) => {
          
          if (item.isAddButton) {
            return (
              <button
                key="add-btn"
                type="button"
                onClick={() => setShowNewLink(true)}
                className="w-full h-full min-w-20 min-h-20 py-5 flex flex-col items-center justify-center gap-1.5 group rounded-xl bg-neutral-950/50 backdrop-blur-sm overflow-hidden text-white cursor-pointer transition-colors"
              >
                <div className="absolute inset-0 z-0 bg-neutral-800/50 group-hover:bg-neutral-900/50 transition-colors"></div>
                <div className="size-8 z-1 flex items-center justify-center">
                  <Plus size={30} strokeWidth={1.5} />
                </div>
                <span className="z-1 text-xs">Agregar</span>
              </button>
            );
          }

          return (
            <a
              key={item.id || index}
              href={formatUrl(item.link)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full min-w-20 min-h-20 py-5 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-neutral-950/50 hover:bg-neutral-900/50 backdrop-blur-sm text-white cursor-pointer transition-colors"
              title={item.title}
            >
              <img
                src={getFavicon(item.link)}
                width={32}
                height={32}
                loading="eager"
                fetchPriority="high"
                alt={`Ir a «${item.title}»`}
                title={`Ir a «${item.title}»`}
                className="w-8 h-8 rounded-md"
              />
              {item.title && (
                <span className="text-xs truncate w-18 text-center">
                  {item.title}
                </span>
              )}
            </a>
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