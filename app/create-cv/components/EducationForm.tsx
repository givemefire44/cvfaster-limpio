import React, { useEffect, useRef } from "react";
import { Education } from "../state";
import AIWriterButton from "../components/AIWriterButton";

type Props = {
  values: Education[];
  onChange: (index: number, field: keyof Education, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
};

const MAX_DESC = 250;

const EducationForm: React.FC<Props> = ({
  values,
  onChange,
  onAdd,
  onRemove,
  onBack,
  onNext,
}) => {
  // Este ref evita que onAdd se llame más de una vez al montar
  const yaAgregado = useRef(false);
  useEffect(() => {
    if (values.length === 0 && !yaAgregado.current) {
      yaAgregado.current = true;
      onAdd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-8 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-2">Educación</h2>
      {values.map((edu, idx) => (
        <div key={idx} className="mb-6 p-4 border rounded-xl bg-gray-50 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block font-semibold mb-1">Título o carrera *</label>
              <input
                type="text"
                value={edu.degree}
                onChange={e => onChange(idx, "degree", e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Ej: Licenciatura en Biología"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Institución *</label>
              <input
                type="text"
                value={edu.institution}
                onChange={e => onChange(idx, "institution", e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Ej: Universidad de Buenos Aires"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Fecha de inicio *</label>
              <input
                type="month"
                value={edu.startDate}
                onChange={e => onChange(idx, "startDate", e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Fecha de fin</label>
              <input
                type="month"
                value={edu.endDate}
                onChange={e => onChange(idx, "endDate", e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Ciudad *</label>
              <input
                type="text"
                value={edu.city}
                onChange={e => onChange(idx, "city", e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Ej: Córdoba"
                required
              />
            </div>
          </div>
          <div className="mb-2 relative">
            <label className="block font-semibold mb-1">
              Descripción (máx. {MAX_DESC})
            </label>
            <textarea
              value={edu.description}
              onChange={e => onChange(idx, "description", e.target.value.slice(0, MAX_DESC))}
              className="w-full border rounded p-2"
              placeholder="Detalles relevantes, promedio, actividades, etc."
              maxLength={MAX_DESC}
              rows={3}
            />
            {/* AI Writer Button */}
            <AIWriterButton
              jobTitle={edu.degree}
              jobDesc={edu.description}
              onApply={summary => onChange(idx, "description", summary.slice(0, MAX_DESC))}
              maxDesc={MAX_DESC}
            />
            <div className="text-xs text-gray-400 text-right">
              {edu.description.length} / {MAX_DESC}
            </div>
          </div>
          {values.length > 1 && (
            <button
              type="button"
              className="text-red-500 text-xs absolute top-2 right-2"
              onClick={() => onRemove(idx)}
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="text-blue-600 font-medium mb-8 text-left"
        onClick={onAdd}
      >
        + Añadir educación
      </button>
      <div className="flex justify-between mt-auto">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Siguiente: Habilidades
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
