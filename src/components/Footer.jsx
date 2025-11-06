export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-soft border-t border-gray-700 text-gray-400 text-sm text-center">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col items-center gap-3">
        <p className="text-gray-400">
          © {year}{" "}
          <span className="text-red-bright font-semibold">devbyandrei</span>.{" "}
          Todos los derechos reservados.
        </p>

        <p className="text-gray-500 text-xs max-w-2xl leading-relaxed">
          Este portfolio es un proyecto personal con fines demostrativos.  
          Las marcas y logotipos mencionados pertenecen a sus respectivos propietarios.
        </p>
      </div>

      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-red-bright/40 to-transparent"></div>
    </footer>
  );
}
