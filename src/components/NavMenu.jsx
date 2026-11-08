import { Plus, Settings2 } from "lucide-react";

export default function NavMenu({
  groups = [],
  max_groups,
  selectedGroup,
  setSelectedGroup,
  setShowNewGroup,
}) {
  return (
    <div className="w-full md:max-w-200 lg:max-w-300 px-4 mx-auto flex items-center justify-center">
      <nav className="w-auto md:max-w-200 p-1 flex items-center justify-start gap-px overflow-hidden overflow-x-auto rounded-full bg-neutral-950/50 backdrop-blur-sm">
        {groups?.length > 1 && groups?.slice(0, max_groups).map((category, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedGroup(category.id)}
            className={`h-9 px-3.5 pr-4 flex items-center justify-center gap-1.5 rounded-full ${selectedGroup === category.id ? "bg-neutral-800/75" : "hover:bg-neutral-800/50"} text-white cursor-pointer transition-all duration-300 ease-out`}
            title={category.title}
          >
            {category.Icon && <category.Icon size={16} />}
            {category.title && (
              <span className="mt-0.5 text-sm select-none">
                {category.title}
              </span>
            )}
          </button>
        ))}
        <button
          type="button"
          title="Agregar acceso directo"
          onClick={() => setShowNewGroup(true)}
          className="size-9 min-w-9 flex items-center justify-center gap-1.5 rounded-full bg-neutral-800/50 hover:bg-neutral-900/50 text-white cursor-pointer transition-all duration-300 ease-out"
        >
          {groups?.length > max_groups ? (
            <Settings2 size={18} strokeWidth={1.5} />
          ) : (
            <Plus size={20} strokeWidth={1.5} />
          )}
        </button>
      </nav>
    </div>
  );
}
