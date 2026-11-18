export const translations = {
  es: {
    settings: {
      title: "Ajustes",
      autoSave: "Auto-guardado",
      tabs: {
        background: "Fondo de pantalla",
        clock: "Reloj digital",
        links: "Accesos directos",
        general: "General",
        about: "Acerca de",
      },
      background: {
        showImage: {
          label: "Mostrar imagen de fondo",
          caption: "Desactívalo para usar únicamente un color sólido.",
        },
        imageUrl: {
          label: "Enlace de la imagen de fondo",
          caption: "Ingresa el enlace de la imagen de fondo o la ruta local.",
        },
        localImage: {
          button: "Subir imagen",
          loaded: "Imagen local cargada",
          empty: "Ningún archivo seleccionado",
        },
        baseColor: {
          label: "Color de fondo base",
          caption:
            "Se muestra cuando la imagen está desactivada o mientras carga.",
        },
      },
      clock: {
        showSeconds: {
          label: "Mostrar segundos",
          caption:
            "Al activar esta opción se mostrarán los segundos en el reloj.",
        },
        size: {
          label: "Tamaño del reloj",
          caption: "Elige tu tamaño de reloj preferido.",
          options: {
            small: "Pequeño",
            large: "Grande",
          },
        },
        format: {
          label: "Formato del reloj",
          caption: "Elige tu formato de reloj preferido.",
          options: {
            h12: "Reloj de 12 horas",
            h24: "Reloj de 24 horas",
          },
        },
      },
      links: {
        openInNewTab: {
          label: "Abrir en nueva pestaña",
          caption:
            "Al activar esta opción los enlaces se abrirán en una nueva pestaña.",
        },
        faviconProvider: {
          label: "Proveedor de iconos",
          caption: "Cambia la fuente si algún sitio web no muestra su logo.",
          options: {
            google: "Google (Recomendado)",
            duckduckgo: "DuckDuckGo",
            iconhorse: "Icon Horse (Alta calidad)",
            yandex: "Yandex",
          },
        },
      },
      general: {
        language: {
          label: "Idioma",
          caption: "Selecciona el idioma de la interfaz.",
        },
        backup: {
          label: "Copia de seguridad (JSON)",
          caption:
            "Exporta tus grupos, enlaces y ajustes o restaura un respaldo previo.",
          exportBtn: "Exportar datos",
          importBtn: "Importar datos",
          importSuccess: "Datos restaurados correctamente.",
          importError: "El archivo JSON no es válido.",
        },
      },
      about: {
        version: "Versión",
        credit: {
          label: "Mostrar crédito",
          caption:
            "Si desactivas esto no pasa nada, solo es para que sepas quién es el creador de esta extensión.",
        },
        madeBy: "Hecho por",
      },
    },
    manageGroups: {
      title: "Gestionar grupos",
    },
    group: {
      title: "Nuevo grupo",
      edit: "Editar grupo",
      icon: {
        label: "Icono del grupo",
        caption: "Selecciona el icono que mejor represente este grupo.",
      },
      name: {
        label: "Nombre del grupo",
        caption: "Nombra este grupo según tus gustos.",
        placeholder: "ej. Trabajo, Educación, Música, Entretenimiento, etc.",
      },
    },
    links: {
      title: "Agregar sitio web",
      editTitle: "Editar sitio web",
      webTitle: {
        label: "Título del sitio web",
        caption: "Nombre corto que aparecerá debajo del icono.",
        placeholder: "ej. GitHub",
      },
      webLink: {
        label: "Enlace del sitio web",
        caption: "Dirección URL a la que abrirá este acceso directo.",
        placeholder: "ej. https://github.com",
      },
      group: {
        label: "Grupo",
        caption: "Elige el grupo donde se guardará este sitio web.",
      },
    },
    actions: {
      add: "Agregar",
      addWebsite: "Agregar sitio web",
      manageGroups: "Gestionar grupos",
      saveGroup: "Guardar grupo",
      addGroup: "Agregar grupo",
      addNewGroup: "Agregar nuevo grupo",
      hiddenGroup: "Ocultar grupo",
      showGroup: "Mostrar grupo",
      editGroup: "Editar grupo",
      deleteGroup: "Eliminar grupo",
      dragGroup: "Arrastrar para reordenar",
      addLink: "Agregar enlace",
      addLinkDisabled: "Primero, crea un grupo para agregar enlaces",
      editLink: "Editar enlace",
      edit: "Editar",
      delete: "Eliminar",
      options: "Opciones",
      close: "Cerrar",
      back: "Volver",
      settings: "Ajustes",
    },
  },
  en: {
    settings: {
      title: "Settings",
      autoSave: "Auto-save",
      tabs: {
        background: "Wallpaper",
        clock: "Digital Clock",
        links: "Shortcuts",
        general: "General",
        about: "About",
      },
      background: {
        showImage: {
          label: "Show background image",
          caption: "Disable to use only a solid background color.",
        },
        imageUrl: {
          label: "Background image URL",
          caption: "Enter the background image URL or local path.",
        },
        localImage: {
          button: "Upload image",
          loaded: "Local image loaded",
          empty: "No file chosen",
        },
        baseColor: {
          label: "Base background color",
          caption: "Shown when the image is disabled or while loading.",
        },
      },
      clock: {
        showSeconds: {
          label: "Show seconds",
          caption: "Enable this option to display seconds on the clock.",
        },
        size: {
          label: "Clock size",
          caption: "Choose your preferred clock size.",
          options: {
            small: "Small",
            large: "Large",
          },
        },
        format: {
          label: "Clock format",
          caption: "Choose your preferred clock format.",
          options: {
            h12: "12-hour clock",
            h24: "24-hour clock",
          },
        },
      },
      links: {
        openInNewTab: {
          label: "Open in new tab",
          caption: "Enable this option to open links in a new tab.",
        },
        faviconProvider: {
          label: "Icon provider",
          caption: "Switch the source if a website fails to display its logo.",
          options: {
            google: "Google (Recommended)",
            duckduckgo: "DuckDuckGo",
            iconhorse: "Icon Horse (High quality)",
            yandex: "Yandex",
          },
        },
      },
      general: {
        language: {
          label: "Language",
          caption: "Select the interface language.",
        },
        backup: {
          label: "Backup & Restore (JSON)",
          caption:
            "Export your groups, links, and settings or restore a previous backup.",
          exportBtn: "Export data",
          importBtn: "Import data",
          importSuccess: "Data restored successfully.",
          importError: "Invalid JSON backup file.",
        },
      },
      about: {
        version: "Version",
        credit: {
          label: "Show credit",
          caption:
            "Disabling this won't affect anything; it just shows who created this extension.",
        },
        madeBy: "Made by",
      },
    },
    manageGroups: {
      title: "Manage groups",
    },
    group: {
      title: "New group",
      edit: "Edit group",
      icon: {
        label: "Group icon",
        caption: "Select the icon that best represents this group.",
      },
      name: {
        label: "Group name",
        caption: "Name this group according to your preferences.",
        placeholder: "e.g. Work, Education, Music, Entertainment, etc.",
      },
    },
    links: {
      title: "Add website",
      editTitle: "Edit website",
      webTitle: {
        label: "Website title",
        caption: "Short name displayed below the shortcut icon.",
        placeholder: "e.g. GitHub",
      },
      webLink: {
        label: "Website URL",
        caption: "Web address this shortcut will open.",
        placeholder: "e.g. https://github.com",
      },
      group: {
        label: "Group",
        caption: "Choose the group where this website will be saved.",
      },
    },
    actions: {
      add: "Add",
      addWebsite: "Add website",
      manageGroups: "Manage groups",
      saveGroup: "Save group",
      addGroup: "Add group",
      addNewGroup: "Add new group",
      hiddenGroup: "Hide group",
      showGroup: "Show group",
      editGroup: "Edit group",
      deleteGroup: "Delete group",
      dragGroup: "Drag to reorder",
      addLink: "Add link",
      addLinkDisabled: "First, create a group to add links",
      editLink: "Edit link",
      edit: "Edit",
      delete: "Delete",
      options: "Options",
      close: "Close",
      back: "Back",
      settings: "Settings",
    },
  },
};

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
};

export const t = (lang = "es", path) => {
  return (
    getNestedValue(translations[lang], path) ??
    getNestedValue(translations.es, path) ??
    path
  );
};