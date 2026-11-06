import {
  Apple,
  Asterisk,
  Astroid,
  AtSign,
  AudioLines,
  Bird,
  Bone,
  BookText,
  BriefcaseBusiness,
  Building,
  BuildingComplex,
  Clapperboard,
  Cloud,
  CodeXml as Code,
  Coffee,
  Cookie,
  CreditCard,
  Feather,
  Flame,
  FlaskConical,
  Gamepad,
  Gamepad2,
  Gem,
  Ghost,
  Gift,
  GraduationCap,
  Heart,
  House,
  HouseHeart,
  Mail,
  Megaphone,
  Mic,
  Newspaper,
  NotebookText,
  Palette,
  PawPrint,
  Plus,
  Rocket,
  Scale,
  ScrollText,
  Server,
  Settings,
  Settings2,
  Shapes,
  Shell,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  SixteenthNotes,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Wallet,
  WalletMinimal,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function HubLayout() {
  const BackgroundImage =
    "https://plus.unsplash.com/premium_photo-1701520447608-3ff1bd3314f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D";

  const [relojGrande, setRelojGrande] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showNewLinkModal, setShowNewLinkModal] = useState(false);

  // Lógica para que el reloj funcione en tiempo real
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  
  const icons = [
    { id: "briefcase-business", Icon: BriefcaseBusiness, title: "Maletín" },
    { id: "book-text", Icon: BookText, title: "Libro de texto" },
    { id: "notebook-text", Icon: NotebookText, title: "Cuaderno" },
    { id: "newspaper", Icon: Newspaper, title: "Periódico" },
    { id: "scroll-text", Icon: ScrollText, title: "Pergamino" },
    { id: "building", Icon: Building, title: "Edificio" },
    { id: "building-complex", Icon: BuildingComplex, title: "Complejo de Edificios", },
    { id: "house", Icon: House, title: "Casa" },
    { id: "house-heart", Icon: HouseHeart, title: "Casa con Corazón" },
    { id: "store", Icon: Store, title: "Tienda" },
    { id: "graduation-cap", Icon: GraduationCap, title: "Graduación" },
    { id: "code", Icon: Code, title: "Código" },
    { id: "cloud", Icon: Cloud, title: "Nube" },
    { id: "feather", Icon: Feather, title: "Pluma" },
    { id: "sixteenth-notes", Icon: SixteenthNotes, title: "Música" },
    { id: "audio-lines", Icon: AudioLines, title: "Audio" },
    { id: "mic", Icon: Mic, title: "Micrófono" },
    { id: "gamepad", Icon: Gamepad, title: "Mando" },
    { id: "gamepad2", Icon: Gamepad2, title: "Ocio" },
    { id: "heart", Icon: Heart, title: "Salud" },
    { id: "star", Icon: Star, title: "Favoritos" },
    { id: "palette", Icon: Palette, title: "Diseño" },
    { id: "sparkles", Icon: Sparkles, title: "Magia" },
    { id: "scale", Icon: Scale, title: "Escalabilidad" },
    { id: "gem", Icon: Gem, title: "Gema" },
    { id: "coffee", Icon: Coffee, title: "Café" },
    { id: "clapperboard", Icon: Clapperboard, title: "Cine" },
    { id: "asterisk", Icon: Asterisk, title: "Destacado" },
    { id: "shopping-bag", Icon: ShoppingBag, title: "Compras" },
    { id: "shopping-cart", Icon: ShoppingCart, title: "Carrito" },
    { id: "shopping-basket", Icon: ShoppingBasket, title: "Cesta" },
    { id: "mail", Icon: Mail, title: "Correo" },
    { id: "shapes", Icon: Shapes, title: "Formas" },
    { id: "cookie", Icon: Cookie, title: "Galleta" },
    { id: "apple", Icon: Apple, title: "Manzana" },
    { id: "megaphone", Icon: Megaphone, title: "Megáfono" },
    { id: "rocket", Icon: Rocket, title: "Cohete" },
    { id: "server", Icon: Server, title: "Servidor" },
    { id: "shell", Icon: Shell, title: "Shell" },
    { id: "wallet", Icon: Wallet, title: "Billetera" },
    { id: "wallet-minimal", Icon: WalletMinimal, title: "Billetera Mínima" },
    { id: "credit-card", Icon: CreditCard, title: "Tarjeta de Crédito" },
    { id: "flame", Icon: Flame, title: "Llama" },
    { id: "ghost", Icon: Ghost, title: "Fantasma" },
    { id: "flask-conical", Icon: FlaskConical, title: "Matraz Cónico" },
    { id: "gift", Icon: Gift, title: "Regalo" },
    { id: "bird", Icon: Bird, title: "Pájaro" },
    { id: "bone", Icon: Bone, title: "Hueso" },
    { id: "paw-print", Icon: PawPrint, title: "Huella de Pata" },
    { id: "smartphone", Icon: Smartphone, title: "Teléfono Inteligente" },
    { id: "at-sign", Icon: AtSign, title: "Signo de @" },
    { id: "astroid", Icon: Astroid, title: "Asteroide" },
  ];

  const group = [
    { Icon: BriefcaseBusiness, name: "Trabajo" },
    { Icon: GraduationCap, name: "Educación" },
    { Icon: SixteenthNotes, name: "Música" },
    { Icon: Gamepad2, name: "Entretenimiento" },
  ];

  const links = [
    { name: "Google", url: "https://google.com", group: "Trabajo" },
    { name: "YouTube", url: "https://youtube.com", group: "Ocio" },
    { name: "GitHub", url: "https://github.com", group: "Trabajo" },
    {
      name: "Stack Overflow",
      url: "https://stackoverflow.com",
      group: "Educación",
    },
    { name: "Reddit", url: "https://reddit.com", group: "Ocio" },
    { name: "Twitter", url: "https://twitter.com", group: "Ocio" },
    { name: "Facebook", url: "https://facebook.com", group: "Ocio" },
    { name: "Instagram", url: "https://instagram.com", group: "Ocio" },
    { name: "LinkedIn", url: "https://linkedin.com", group: "Trabajo" },
    { name: "Wikipedia", url: "https://wikipedia.org", group: "Educación" },
    { name: "Spotify", url: "https://spotify.com", group: "Música" },
    { name: "Netflix", url: "https://netflix.com", group: "Ocio" },
  ];

  const max_group = 5;

  function formatUrl(url) {
    let cleaned = url.trim();
    if (!/^https?:\/\//i.test(cleaned)) cleaned = "https://" + cleaned;
    return cleaned;
  }

  function getFavicon(url) {
    try {
      const host = new URL(formatUrl(url)).hostname;
      return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
    } catch (error) {
      console.error("Error al obtener el favicon:", error);
      return "";
    }
  }

  return (
    <>
      {/* Fondo */}
      <div className="w-full h-screen fixed inset-0 z-0">
        <img
          src={BackgroundImage}
          alt="Fondo"
          loading="eager"
          fetchpriority="high"
          className="w-full h-screen object-cover absolute top-0 left-0"
        />
        <div className="w-full h-screen absolute top-0 left-0 bg-neutral-950/25" />
        <div className="w-full h-screen fixed bg-[url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjciIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48ZmVDb2xvck1hdHJpeCBpbj0idHVyYnVsZW5jZSIgdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjxmZUNvbXBvbmVudFRyYW5zZmVyPjxmZUZ1bmNSIHR5cGU9ImRpc2NyZXRlIiB0YWJsZVZhbHVlcz0iMCAxIi8+PGZlRnVuY0cgdHlwZT0iZGlzY3JldGUiIHRhYmxlVmFsdWVzPSIwIDEiLz48ZmVGdW5jQiB0eXBlPSJkaXNjcmV0ZSIgdGFibGVWYWx1ZXM9IjAgMSIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjYSkiLz48L3N2Zz4=)] bg-repeat bg-size-[380px] mix-blend-overlay opacity-10"></div>
      </div>

      {/* Contenido principal */}
      <div className="w-full h-screen fixed inset-0 z-10 flex flex-col gap-4">
        {/* header */}
        <div className="w-full h-15 flex items-center justify-center">
          <div className="w-full mx-3 flex items-center justify-between gap-2">
            {/* Watch / Time (Pequeño) */}
            {!relojGrande && (
              <div
                onClick={() => setRelojGrande(!relojGrande)}
                className="fixed z-20 top-4 left-5 cursor-pointer"
              >
                <span className="font-medium text-white select-none">
                  {formattedTime.slice(0, 5)}
                </span>
              </div>
            )}

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
            relojGrande ? "justify-center" : "justify-start mt-10-"
          } gap-8`}
        >
          {/* Reloj Grande */}
          {relojGrande && (
            <div
              className="flex flex-col items-center justify-center gap-4 select-none cursor-pointer"
              onClick={() => setRelojGrande(!relojGrande)}
            >
              <span className="font-light text-7xl text-white font-sans [text-shadow:0_4px_16px_rgba(0,0,0,0.6)]">
                {formattedTime}
              </span>
              <span className="text-sm text-neutral-300 font-mono [text-shadow:0_4px_16px_rgba(0,0,0,0.6)]">
                {formattedDate}
              </span>
            </div>
          )}

          {/* menu + enlaces */}
          <div className="w-full flex flex-col items-center gap-4">
            {/* menu de navegacion de categorias */}
            <div className="w-full md:max-w-200 lg:max-w-300 px-4 mx-auto flex items-center justify-center">
              <nav className="w-auto md:max-w-200 p-1 flex items-center justify-start gap-px overflow-hidden overflow-x-auto rounded-full bg-neutral-950/50 backdrop-blur-sm">
                {group.slice(0, max_group).map((category, index) => (
                  <button
                    key={index}
                    type="button"
                    className="h-9 px-3.5 pr-4 flex items-center justify-center gap-1.5 rounded-full hover:bg-neutral-400/50 hover:dark:bg-neutral-800/50 text-white cursor-pointer transition-all duration-300 ease-out"
                    title={category.name}
                  >
                    {category.Icon && <category.Icon size={16} />}
                    {category.name && (
                      <span className="mt-0.5 text-sm select-none">
                        {category.name}
                      </span>
                    )}
                  </button>
                ))}
                <button
                  type="button"
                  title="Agregar acceso directo"
                  onClick={() => setShowNewGroupModal(true)}
                  className="size-9 min-w-9 flex items-center justify-center gap-1.5 rounded-full bg-neutral-800/50 hover:bg-neutral-900/50 text-white cursor-pointer transition-all duration-300 ease-out"
                >
                  {group.length > max_group ? (
                    <Settings2 size={18} strokeWidth={1.5} />
                  ) : (
                    <Plus size={20} strokeWidth={1.5} />
                  )}
                </button>
              </nav>
            </div>

            {/* enlaces > accesos cortos */}
            <div className="w-full md:max-w-200 lg:max-w-300 mx-auto flex items-center justify-center">
              <nav className="w-full px-4 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 grid-rows-4 gap-1">
                {links.map((link, index) => (
                  <a
                    key={index} // Agregado el key requerido
                    href={formatUrl(link?.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full min-w-20 min-h-20 py-5 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-neutral-950/50 hover:bg-neutral-900/50 backdrop-blur-sm text-white cursor-pointer transition-colors"
                    title={link.name}
                  >
                    <img
                      src={getFavicon(link?.url)}
                      alt={link.name}
                      className="w-8 h-8 rounded-md"
                    />
                    {link.name && (
                      <span className="text-xs truncate w-16 text-center">
                        {link.name}
                      </span>
                    )}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => setShowNewLinkModal(true)}
                  className="w-full h-full min-w-20 min-h-20 py-5 flex flex-col items-center justify-center gap-1.5 group rounded-xl bg-neutral-950/50 backdrop-blur-sm overflow-hidden text-white cursor-pointer transition-colors"
                >
                  <div className="absolute inset-0 z-0 bg-neutral-800/50 group-hover:bg-neutral-900/50"></div>
                  <div className="size-8 z-1 flex items-center justify-center">
                    <Plus size={30} strokeWidth={1.5} />
                  </div>
                  <span className="z-1 text-xs">Agregar</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="w-full h-15- flex items-center justify-center">
          <div className="w-full m-3 flex items-center justify-between">
            {/* Créditos de la imagen de fondo */}
            <div className="px-2 py-1.5 rounded-md bg-neutral-950/25 backdrop-blur-sm text-xs text-white">
              {"Foto de "}
              <a
                href="https://unsplash.com/es/fotos/una-imagen-borrosa-de-un-fondo-azul-claro-TY1-GSaQF7Q"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline-offset-2 hover:underline"
              >
                Andrew Petrischev
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal flotante de ajustes */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 backdrop-blur-xs"
          onClick={() => setShowSettings(false)} // Cierra al hacer clic fuera
        >
          {/* caja flotante > ajustes */}
          <div
            className="w-170 h-120 mx-auto flex overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/90 backdrop-blur-md text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic adentro
          >
            {/* sidebar > menú */}
            <div className="w-56 p-4 flex flex-col gap-1.5 border-r border-neutral-800 bg-neutral-900/50">
              <div className="w-full pl-2 mb-2 flex items-center">
                <span className="font-medium">Ajustes</span>
              </div>
              <button className="w-full h-9.5 px-4 flex items-center justify-start gap-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors">
                <span className="font-normal text-sm">Imagen de fondo</span>
              </button>
              <button className="w-full h-9.5 px-4 flex items-center justify-start gap-2 rounded-lg hover:bg-neutral-800 transition-colors">
                <span className="font-normal text-sm">Accesos directos</span>
              </button>
              <button className="w-full h-9.5 px-4 flex items-center justify-start gap-2 rounded-lg hover:bg-neutral-800 transition-colors">
                <span className="font-normal text-sm">Reloj</span>
              </button>
              <button className="w-full h-9.5 px-4 flex items-center justify-start gap-2 rounded-lg hover:bg-neutral-800 transition-colors">
                <span className="font-normal text-sm">Diseños</span>
              </button>
            </div>

            {/* contenedor */}
            <div className="flex-1 p-6 flex flex-col">
              <div className="w-full flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
                <span className="font-medium text-lg">Imagen de fondo</span>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="size-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Contenido de ejemplo para ajustes */}
              <div className="flex flex-col gap-4 text-sm text-neutral-400">
                <p>
                  Aquí puedes agregar los inputs para cambiar la URL del fondo,
                  ajustar el desenfoque, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal flotante de nuevo grupo */}
      {showNewGroupModal && (
        <div
          onClick={() => setShowNewGroupModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 backdrop-blur-xs"
        >
          {/* caja */}
          <div className="w-125 h-120- mx-auto flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md text-white shadow-2xl">
            {/* header */}
            <div className="w-full p-2.5 flex items-center justify-between border-b border-neutral-800">
              <div className="w-full pl-2 flex items-center">
                <span className="font-bold text-base">Añadir grupo</span>
              </div>
              <button
                type="button"
                onClick={() => setShowNewGroupModal(false)}
                className="size-8 min-w-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            {/* main */}
            <div className="p-4 space-y-4">
              {/* Icono */}
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium text-sm">Icono</label>
                <div className="w-full p-1 grid grid-cols-13 grid-rows-4 gap-0.5 rounded-md bg-neutral-950/95 border border-neutral-800">
                  {icons.map(({ id, Icon, title }) => (
                    <button
                      key={id}
                      type="button"
                      className="size-8 flex items-center justify-center rounded-md hover:bg-neutral-800/50 border border-neutral-800 cursor-pointer"
                      title={title}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </button>
                  ))}
                </div>
              </div>
              {/* Nombre del grupo */}
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium text-sm">Nombre del grupo</label>
                <input
                  type="text"
                  placeholder="Nombre del grupo"
                  className="w-full h-10 px-3 rounded-md bg-neutral-950/95 border border-neutral-800 text-sm text-white focus:outline-none"
                />
              </div>
              <button className="w-full h-10 px-4 rounded-md bg-sky-500 hover:bg-sky-600 font-medium text-sm text-white transition-colors cursor-pointer">
                Añadir grupo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal flotante de nuevo enlace */}
      {showNewLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 backdrop-blur-xs">
          <div className="w-125 h-120- mx-auto flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-md text-white shadow-2xl">
            <div className="w-full p-2.5 flex items-center justify-between border-b border-neutral-800">
              <div className="w-full pl-2 flex items-center">
                <span className="font-bold text-base">Añadir enlace</span>
              </div>
              <button
                type="button"
                onClick={() => setShowNewLinkModal(false)}
                className="size-8 min-w-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="w-full flex flex-col gap-2">
                <label className="font-medium text-sm">Enlace</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  className="w-full h-10 px-3 rounded-md bg-neutral-950/95 border border-neutral-800 text-sm text-white focus:outline-none"
                />
              </div>
              <button className="w-full h-10 px-4 rounded-md bg-sky-500 hover:bg-sky-600 font-medium text-sm text-white transition-colors cursor-pointer">
                Añadir enlace
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
