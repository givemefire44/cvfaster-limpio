"use client";
import { useEffect, useState, useRef } from "react";
import { useCvForm } from "../create-cv/state";
import { useRouter } from "next/navigation";

import CVTemplateBase from "./templates/CVTemplateBase";
import CVTemplateModern from "./templates/CVTemplateModern";
import CVTemplateColumnar from "./templates/CVTemplateColumnar";
import CVTemplateBarcelona from "./templates/CVTemplateBarcelona";
// Si querés más templates, importalos aquí

const templates = [
  { name: "Base", component: CVTemplateBase },
  { name: "Moderno", component: CVTemplateModern },
  { name: "Columnar", component: CVTemplateColumnar },
  { name: "Barcelona", component: CVTemplateBarcelona },
];

export default function SelectTemplatePage() {
  const { formData } = useCvForm();
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Descarga PDF usando html2canvas + jsPDF
  const handleDownload = async () => {
    if (!previewRef.current) return;
    const images = previewRef.current.querySelectorAll("img");
    await Promise.all(Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(res => { img.onload = img.onerror = res; });
    }));
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
    <main className="min-h-screen bg-gray-900 flex flex-col sm:flex-row items-start">
      {/* Sidebar DESKTOP */}
      <aside className="hidden sm:flex w-64 bg-gray-800 p-6 min-h-screen text-white flex-col">
        <div className="mb-4 font-bold text-lg">Templates</div>
        <div className="flex flex-col gap-4">
          {templates.map((tpl, idx) => (
            <button
              key={tpl.name}
              className={`rounded border p-2 text-left transition ${
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
      {/* Tabs MOBILE */}
      <div className="flex sm:hidden w-full bg-gray-800 p-2 gap-2 sticky top-0 z-10">
        {templates.map((tpl, idx) => (
          <button
            key={tpl.name}
            className={`flex-1 rounded p-2 text-sm transition ${
              idx === selectedTemplate
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
            onClick={() => setSelectedTemplate(idx)}
          >
            {tpl.name}
          </button>
        ))}
      </div>
      {/* Preview grande del template */}
      <section className="flex-1 flex flex-col items-center justify-start p-0 sm:p-6 w-full">
        <div className="w-full max-w-3xl flex flex-col gap-2">
          {/* Tarjeta principal con botones adentro */}
          <div
            className="bg-white rounded-lg shadow-xl p-2 sm:p-8 w-full sm:w-[650px] min-h-[600px] sm:min-h-[900px] flex flex-col items-center relative"
            ref={previewRef}
          >
            {/* Botones dentro de la tarjeta, alineados arriba izquierda y derecha */}
            <div className="w-full flex flex-row justify-between items-start absolute left-0 top-0 px-4 pt-4 z-10">
              <button
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded font-semibold shadow hover:bg-gray-300 transition text-xs min-h-0"
                onClick={() => router.push("/create-cv")}
                type="button"
                style={{ height: "28px" }}
              >
                Volver al editor
              </button>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded font-semibold shadow text-xs min-h-0"
                onClick={handleDownload}
                type="button"
                style={{ height: "28px" }}
              >
                Descargar PDF
              </button>
            </div>
            {/* Espacio para no tapar el contenido */}
            <div style={{ height: "36px" }} />
            <TemplateComponent data={formData} />
          </div>
        </div>
      </section>
    </main>
  );
}

