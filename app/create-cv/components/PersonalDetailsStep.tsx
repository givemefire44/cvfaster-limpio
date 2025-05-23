"use client";
import React from "react";

type PersonalDetailsStepProps = {
  data: { [key: string]: any };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
};

export default function PersonalDetailsStep({
  data,
  onChange,
  onNext,
}: PersonalDetailsStepProps) {
  return (
    <form className="w-full h-full flex flex-col gap-6 p-8 relative" onSubmit={e => { e.preventDefault(); onNext(); }}>
      <div>
        <h2 className="text-2xl font-bold text-blue-700 mb-1">Detalles personales</h2>
        <p className="text-gray-500 mb-4 text-sm">
          ¡Completá todos los campos para mejorar tu CV!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col text-sm font-semibold">
          Puesto deseado
          <input
            name="desiredPosition"
            value={data.desiredPosition || ""}
            onChange={onChange}
            placeholder="Ej: Desarrollador Fullstack"
            className="mt-1 p-2 border rounded bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold">
          Nombre
          <input
            name="firstName"
            value={data.firstName || ""}
            onChange={onChange}
            placeholder="Ej: Mario"
            className="mt-1 p-2 border rounded bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold">
          Apellido
          <input
            name="lastName"
            value={data.lastName || ""}
            onChange={onChange}
            placeholder="Ej: D"
            className="mt-1 p-2 border rounded bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold">
          Email
          <input
            name="email"
            type="email"
            value={data.email || ""}
            onChange={onChange}
            placeholder="ejemplo@email.com"
            className="mt-1 p-2 border rounded bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold">
          Teléfono
          <input
            name="phone"
            value={data.phone || ""}
            onChange={onChange}
            placeholder="Ej: 25254845888"
            className="mt-1 p-2 border rounded bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold">
          Dirección
          <input
            name="address"
            value={data.address || ""}
            onChange={onChange}
            placeholder="Ej: Varela 2612"
            className="mt-1 p-2 border rounded bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold">
          Ciudad / Provincia
          <input
            name="city"
            value={data.city || ""}
            onChange={onChange}
            placeholder="Ej: Buenos Aires"
            className="mt-1 p-2 border rounded bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold">
          País
          <input
            name="country"
            value={data.country || ""}
            onChange={onChange}
            placeholder="Ej: Argentina"
            className="mt-1 p-2 border rounded bg-gray-100 focus:outline-none focus:ring focus:border-blue-400"
          />
        </label>
      </div>
      <div className="flex-1" />
      {/* Botón Next fijo abajo */}
      <div className="absolute bottom-6 left-0 w-full flex justify-end px-8">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded shadow"
        >
          Siguiente: Experiencia laboral
        </button>
      </div>
    </form>
  );
}
