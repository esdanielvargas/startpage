import { Settings } from "lucide-react";
import {
  Background,
  ClockView,
  LinkGrid,
  ManageGroups,
  NavMenu,
  NewGroupModal,
  NewLinkModal,
  SettingsModal,
} from "./components";
import { useEffect, useState } from "react";
import { t } from "./translations";

const STORAGE_KEY = "startpage";

const defaultState = {
  background: {
    showImage: true,
    image: "",
    color: "",
  },
  clock: {
    seconds: true,
    size: "large",
    format: "h24",
  },
  groups: [],
  links: [],
  language: "es",
  faviconSource: "google",
  openInNewTab: true,
  credit: true,
};

export default function StartPage() {
  const [appState, setAppState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState;
    } catch (error) {
      console.error("Error ", error);
      return defaultState;
    }
  });

  // Efecto para escuchar cuando SettingsModal guarda datos nuevos
  useEffect(() => {
    const handleStorageChange = () => {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setAppState({ ...defaultState, ...JSON.parse(raw) });
      }
    };

    // Escuchamos el evento que despachamos desde SettingsModal
    window.addEventListener("storage", handleStorageChange);

    // Limpieza
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const max_groups = 6;
  const [selectedGroup, setSelectedGroup] = useState(
    () => appState?.groups?.[0]?.id,
  );
  const [showSettings, setShowSettings] = useState(false);
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [showManageGroup, setShowManageGroup] = useState(false);
  const [showNewLink, setShowNewLink] = useState(false);
  const [groupToEdit, setGroupToEdit] = useState(null);
  const [linkToEdit, setLinkToEdit] = useState(null);

  // En lugar de confiar ciegamente en selectedGroup si se borró o creó el primero:
  const activeGroup = appState?.groups?.some((g) => g.id === selectedGroup)
    ? selectedGroup
    : appState?.groups?.[0]?.id;

  return (
    <>
      <Background
        showImage={appState?.background?.showImage}
        image={appState?.background?.image}
        color={appState?.background?.color}
      />

      {/* Contenido principal */}
      <div className="w-full h-screen fixed inset-0 z-10 flex flex-col gap-4">
        {/* header */}
        <div className="w-full h-15 flex items-center justify-center">
          <div className="w-full mx-3 flex items-center justify-between gap-2">
            {/* Reloj Pequeño */}
            <div className=""></div>
            {/* Options Button */}
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="size-8.5 fixed z-20 top-3 right-3 flex items-center justify-center rounded-full hover:bg-neutral-400/50 hover:dark:bg-neutral-950/25 text-white cursor-pointer group"
            >
              <Settings
                size={18}
                strokeWidth={1.5}
                className="transition-all duration-300 ease-out group-hover:-rotate-180"
              />
            </button>
          </div>
        </div>

        {/* main */}
        <div
          className={`w-full h-full flex flex-col items-center ${
            appState?.clock?.size === "large"
              ? "justify-center"
              : "justify-start mt-10-"
          } gap-8`}
        >
          {/* Reloj Grande */}
          <ClockView
            language={appState?.language}
            seconds={appState?.clock?.seconds}
            size={appState?.clock?.size}
            format={appState?.clock?.format}
          />

          {/* menu + grid de enlaces */}
          <div className="w-full flex flex-col items-center gap-4">
            {/* menu de navegacion de categorias */}
            <NavMenu
              language={appState?.language}
              groups={appState?.groups}
              max_groups={max_groups}
              selectedGroup={activeGroup}
              setSelectedGroup={setSelectedGroup}
              setShowNewGroup={setShowNewGroup}
              setShowManageGroup={setShowManageGroup}
            />

            {/* enlaces > accesos cortos */}
            <LinkGrid
              language={appState?.language}
              groups={appState?.groups}
              size={appState?.clock?.size}
              links={appState?.links}
              selectedGroup={activeGroup}
              setShowNewLink={setShowNewLink}
              setLinkToEdit={setLinkToEdit}
            />
          </div>
        </div>

        {/* footer */}
        <div className="w-full h-15- flex items-center justify-center">
          <div className="w-full m-3 flex items-center justify-between">
            {/* Créditos de la imagen de fondo */}
            {appState?.credit && (
              <div className="px-2 py-1.5 rounded-md bg-neutral-950/25 backdrop-blur-sm text-xs text-white">
                {t(appState?.language, "about.madeBy")}{" "}
                <a
                  href="https://danielvargas.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline-offset-2 hover:underline"
                >
                  Daniel Vargas
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <SettingsModal
        language={appState?.language}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />

      <NewGroupModal
        language={appState?.language}
        key={groupToEdit?.id || "new-group"}
        showNewGroup={showNewGroup}
        setShowNewGroup={setShowNewGroup}
        setShowManageGroup={setShowManageGroup}
        groupToEdit={groupToEdit}
        setGroupToEdit={setGroupToEdit}
      />

      <ManageGroups
        language={appState?.language}
        groups={appState?.groups}
        showManageGroup={showManageGroup}
        setShowManageGroup={setShowManageGroup}
        setShowNewGroup={setShowNewGroup}
        setGroupToEdit={setGroupToEdit}
      />

      <NewLinkModal
        language={appState?.language}
        key={linkToEdit?.id || `new-link-${activeGroup}`}
        selectedGroup={activeGroup}
        groups={appState?.groups}
        showNewLink={showNewLink}
        setShowNewLink={setShowNewLink}
        linkToEdit={linkToEdit}
        setLinkToEdit={setLinkToEdit}
      />
    </>
  );
}
