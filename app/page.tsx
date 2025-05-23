export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f8fd]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a CVFaster</h1>
        <p className="text-lg mb-8 text-gray-700">
          Creá tu currículum profesional en minutos. Completá el formulario, generá textos con IA y descargalo listo para enviar.
        </p>
        <a href="/create-cv">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition">
            Crear CV
          </button>
        </a>
      </div>
    </main>
  );
}
