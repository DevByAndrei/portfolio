export default function TechCard({ title, logos }) {
  return (
    <div className="bg-bg-dark rounded-2xl shadow-lg hover:shadow-red-bright/30 transition-all duration-300 border border-gray-700 hover:-translate-y-2 p-6 flex flex-col items-center gap-4">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>

      <div className="grid grid-cols-3 gap-6 mt-2">
        {logos.map((logo, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-12 h-12">{logo.icon}</div>
            <p className="text-sm text-text-muted mt-2 text-center">{logo.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
