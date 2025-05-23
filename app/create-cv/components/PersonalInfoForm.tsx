import React from "react";
import { Experience } from "../state";

type Props = {
  values: Experience[];
  onChange: (index: number, field: keyof Experience, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
};

const emptyExperience: Experience = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  city: "",
  description: "",
};

const ExperienceForm: React.FC<Props> = ({
  values,
  onChange,
  onAdd,
  onRemove,
  onBack,
  onNext,
}) => {
  return (
    <div className="p-8 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-2">Employment History</h2>
      {values.length === 0 && (
        <div className="mb-6 text-gray-500">No work experience added yet.</div>
      )}
      {values.map((exp, idx) => (
        <div key={idx} className="mb-6 p-4 border rounded-xl bg-gray-50 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block font-semibold mb-1">Job title *</label>
              <input
                type="text"
                value={exp.position}
                onChange={e => onChange(idx, "position", e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Ej: Repositor"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Employer *</label>
              <input
                type="text"
                value={exp.company}
                onChange={e => onChange(idx, "company", e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Ej: Supermercado Argentino"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Start Date *</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={e => onChange(idx, "startDate", e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">End Date</label>
              <input
                type="month"
                value={exp.endDate}
                onChange={e => onChange(idx, "endDate", e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">City *</label>
              <input
                type="text"
                value={exp.city}
                onChange={e => onChange(idx, "city", e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Ej: Caseros"
                required
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Description *</label>
            <textarea
              value={exp.description}
              onChange={e => onChange(idx, "description", e.target.value)}
              className="w-full border rounded p-2"
              placeholder="Describe tus logros y tareas principales"
              required
              minLength={20}
              maxLength={400}
              rows={4}
            />
            <div className="text-xs text-gray-400 text-right">
              {exp.description.length} / 400
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
        + Añadir experiencia
      </button>
      <div className="flex justify-between mt-auto">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next: Education
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;
