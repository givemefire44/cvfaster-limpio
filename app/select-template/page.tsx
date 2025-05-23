"use client";
import { useEffect, useState, useRef } from "react";
import { useCvForm } from "../create-cv/state";

// Importa el template base
import CVTemplateBase from "./templates/CVTemplateBase";
// Si querés más templates, importalos aquí

const templates = [
  {
    name: "Base",
    component: CVTemplateBase,
  },
  // { name: "OtroTemplate", component: OtroTemplate }, // Agregá más acá
];

export default function SelectTemplatePage() {
  const { formData } = useCvForm();
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const previewRef = useRef<HTMLDivElement | null>(null);

  // Descarga PDF usando html2canvas + jsPDF
  const handleDownload = async () => {
    if (!previewRef.current) return;
    const html2canvasMod = (await import("html2canvas")).default;
    const jsPDFMod = (await import("jspdf")).default;
    const canvas = await html2canvasMod(previewRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDFMod("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("cv.pdf");
  };

  const TemplateComponent = templates[selectedTemplate].component;

  return (
    <main className="min-h-screen bg-gray-900 flex flex-row items-start">
      {/* Galería de templates */}
      <aside className="w-64 bg-gray-800 p-6 min-h-screen text-white">
        <div className="mb-4 font-bold text-lg">Templates</div>
        <div className="flex flex-col gap-4">
          {templates.map((tpl, idx) => (
            <button
              key={tpl.name}
              className={`rounded border p-2 text-left ${
                idx === selectedTemplate
                  ? "border-blue-400 bg-blue-900"
                  : "border-gray-600 bg-gray-700"
              }`}
              onClick={() => setSelectedTemplate(idx)}
            >
              {tpl.name}
            </button>
          ))}
        </div>
      </aside>
      {/* Preview grande del template */}
      <section className="flex-1 flex flex-col items-center justify-start p-12">
        <div className="w-full flex justify-end mb-6">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold shadow"
            onClick={handleDownload}
            type="button"
          >
            Download PDF
          </button>
        </div>
        <div
          className="bg-white rounded-lg shadow-xl p-8 w-[650px] min-h-[900px] flex flex-col items-center"
          ref={previewRef}
        >
          <TemplateComponent data={formData} />
        </div>
      </section>
    </main>
  );
}
