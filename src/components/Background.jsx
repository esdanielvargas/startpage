export default function Background({ image = "", color, showImage = true }) {
  const hasActiveImage = showImage && Boolean(image);

  return (
    <div
      className="w-full h-screen fixed inset-0 z-0 bg-neutral-500"
      style={!hasActiveImage && color ? { backgroundColor: color } : undefined}
    >
      {hasActiveImage && (
        <img
          src={image}
          width={1920}
          height={917}
          loading="eager"
          fetchPriority="high"
          alt="Fondo de pantalla"
          title="Fondo de pantalla"
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="w-full h-screen object-cover absolute top-0 left-0"
        />
      )}

      {/* Capa de oscurecimiento */}
      <div className="w-full h-screen absolute top-0 left-0 bg-neutral-950/25" />

      {/* Textura de ruido */}
      <div className="w-full h-screen fixed bg-[url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjciIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48ZmVDb2xvck1hdHJpeCBpbj0idHVyYnVsZW5jZSIgdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjxmZUNvbXBvbmVudFRyYW5zZmVyPjxmZUZ1bmNSIHR5cGU9ImRpc2NyZXRlIiB0YWJsZVZhbHVlcz0iMCAxIi8+PGZlRnVuY0cgdHlwZT0iZGlzY3JldGUiIHRhYmxlVmFsdWVzPSIwIDEiLz48ZmVGdW5jQiB0eXBlPSJkaXNjcmV0ZSIgdGFibGVWYWx1ZXM9IjAgMSIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjYSkiLz48L3N2Zz4=)] bg-repeat bg-size-[380px] mix-blend-overlay opacity-10"></div>
    </div>
  );
}
