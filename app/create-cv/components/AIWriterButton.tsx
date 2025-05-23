import React, { useState } from "react";

type Props = {
  jobTitle: string;
  jobDesc: string;
  onApply: (summary: string) => void;
  disabled?: boolean;
  maxDesc?: number;
};

const fetchSummary = async (jobTitle: string, jobDesc: string, maxDesc: number) => {
  const res = await fetch("/api/generate-summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobTitle, jobDesc, maxDesc }),
  });
  const data = await res.json();
  return data.summary || "No se pudo generar un resumen. Intenta de nuevo.";
};

// Ícono de rayo violeta
const LightningSVG = ({ className = "" }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    style={{ marginRight: 6, minWidth: 18 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.82 1.63c.33-.6 1.22-.6 1.55 0l6.6 12.1c.32.59-.1 1.27-.77 1.27H12.5l1.16 4.37c.18.66-.61 1.13-1.15.7l-9.4-7.36c-.55-.43-.31-1.34.38-1.34h4.04L8.3 2.32c.07-.36.5-.53.82-.69z"
      fill="#a78bfa"
    />
  </svg>
);

const AIWriterButton: React.FC<Props> = ({
  jobTitle,
  jobDesc,
  onApply,
  disabled = false,
  maxDesc = 250,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [hover, setHover] = useState(false);

  // Pulse solo si descripción vacía
  const pulse = !jobDesc ? "animate-pulse" : "";

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    try {
      let summary = await fetchSummary(jobTitle, jobDesc, maxDesc ?? 250);
      if (summary.length > (maxDesc ?? 250)) {
        summary = summary.slice(0, maxDesc) + "…";
      }
      setSuggestion(summary);
    } catch (err) {
      setError("No se pudo generar la sugerencia. Intenta de nuevo.");
    }
    setLoading(false);
  };

  const handleImprove = async () => {
    setLoading(true);
    setError("");
    try {
      let summary = await fetchSummary(jobTitle, suggestion || jobDesc, maxDesc ?? 250);
      if (summary.length > (maxDesc ?? 250)) {
        summary = summary.slice(0, maxDesc) + "…";
      }
      setSuggestion(summary);
    } catch (err) {
      setError("No se pudo mejorar la sugerencia. Intenta de nuevo.");
    }
    setLoading(false);
  };

  const handleUse = () => {
    if (suggestion) {
      onApply(suggestion.slice(0, maxDesc));
      setShowModal(false);
    }
  };

  const openModal = async () => {
    setShowModal(true);
    setSuggestion(null);
    setError("");
    setLoading(true);
    try {
      let summary = await fetchSummary(jobTitle, jobDesc, maxDesc ?? 250);
      if (summary.length > (maxDesc ?? 250)) {
        summary = summary.slice(0, maxDesc) + "…";
      }
      setSuggestion(summary);
    } catch (err) {
      setError("No se pudo generar la sugerencia. Intenta de nuevo.");
    }
    setLoading(false);
  };

  return (
    <>
      <button
        type="button"
        className={`
          flex items-center gap-1 px-3 py-1 rounded-full
          text-gray-800 font-medium shadow transition-all duration-150
          bg-gray-100 border border-gray-200
          hover:bg-yellow-100 hover:text-yellow-900
          focus:outline-none absolute top-2 right-2 z-20
          ${pulse}
          ${loading ? "opacity-60 cursor-wait" : ""}
        `}
        title="IA Asistente: Genera tu descripción automáticamente"
        disabled={disabled || loading}
        onClick={openModal}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          fontSize: "1rem",
          cursor: loading ? "wait" : "pointer",
          minHeight: 36,
          minWidth: 120,
          letterSpacing: ".01em",
        }}
      >
        <LightningSVG />
        <span style={{ fontWeight: 500 }}>
          {loading ? "Generando…" : "IA Asistente"}
        </span>
      </button>
      {hover && !loading && (
        <div
          className="absolute right-0 top-12 z-30 bg-white bg-opacity-95 text-gray-800 text-xs p-2 rounded shadow-md border border-yellow-200"
          style={{ minWidth: 210, pointerEvents: "none" }}
        >
          Haz clic para que la IA genere y puedas elegir la mejor descripción.
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar"
            >✖️</button>
            <h3 className="font-bold mb-2 flex items-center gap-1">
              <LightningSVG /> Sugerencia IA
            </h3>
            <p className="text-xs text-gray-500 mb-1">
              Este texto reemplazará tu descripción si lo usás. <br />
              <b>Límite: {maxDesc} caracteres.</b>
            </p>
            {loading && (
              <div className="text-center p-6 text-purple-600">Generando sugerencia...</div>
            )}
            {error && <div className="text-red-500 mb-2">{error}</div>}
            {suggestion && !loading && (
              <div className="mb-4 border rounded bg-gray-50 p-3 whitespace-pre-line text-sm">
                {suggestion}
                {suggestion.length >= (maxDesc ?? 250) && (
                  <div className="text-xs text-orange-500 mt-1">
                    (Texto recortado a {maxDesc} caracteres)
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-between items-center gap-2 mt-4 flex-wrap">
              <button
                type="button"
                className="px-3 py-1 rounded text-gray-700 bg-gray-100 border border-gray-200 hover:bg-gray-200 text-sm"
                onClick={handleGenerate}
                disabled={loading}
              >
                Generar
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded text-yellow-800 bg-yellow-100 border border-yellow-200 hover:bg-yellow-200 text-sm"
                onClick={handleImprove}
                disabled={loading || !suggestion}
              >
                Mejorar
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded text-white bg-purple-600 hover:bg-purple-700 text-sm"
                onClick={handleUse}
                disabled={loading || !suggestion}
              >
                Usar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIWriterButton;
