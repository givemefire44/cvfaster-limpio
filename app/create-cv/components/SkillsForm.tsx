import React, { useEffect, useRef } from "react";
import type { Skill } from "../state"; // Asegurate que la ruta es correcta

type Props = {
  values: Skill[];
  onChange: (index: number, field: keyof Skill, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
};

const SkillsForm: React.FC<Props> = ({
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
      <h2 className="text-2xl font-bold mb-2">Habilidades</h2>
      {values.map((skill, idx) => (
        <div key={idx} className="mb-4 p-4 border rounded-xl bg-gray-50 relative flex items-center">
          <input
            type="text"
            value={skill.name}
            onChange={e => onChange(idx, "name", e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Ej: Trabajo en equipo, Inglés, Python"
            required
          />
          <select
            value={skill.level}
            onChange={e => onChange(idx, "level", e.target.value)}
            className="ml-4 border rounded p-2"
          >
            <option value="Básico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
          {values.length > 1 && (
            <button
              type="button"
              className="text-red-500 text-xs ml-4"
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
        + Añadir habilidad
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
          Siguiente: Previsualizar
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;
