
"use client";
import { useState, useRef } from "react";
import { useCvForm } from "../create-cv/state";
import { useRouter } from "next/navigation";

import CVTemplateBase from "./templates/CVTemplateBase";
import CVTemplateBarcelona from "./templates/CVTemplateBarcelona";

const templates = [
  { name: "Base", component: CVTemplateBase },
  { name: "Barcelona", component: CVTemplateBarcelona },
];

export default function SelectTemplatePage() {
  const { formData } = useCvForm();
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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
    <main className="min-h-screen bg-gray-900 flex flex-col sm:flex-row">
      {/* Sidebar */}
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
      {/* Botones siempre arriba y extremos */}
      <div className="w-full flex flex-row justify-between items-center px-8 pt-8 sticky top-0 z-20 bg-gray-900"
        style={{ minHeight: 40 }}
      >
        <button
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded font-semibold shadow hover:bg-gray-300 transition text-xs min-h-0"
          onClick={() => router.push("/create-cv")}
          type="button"
        >
          Volver al editor
        </button>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded font-semibold shadow text-xs min-h-0"
          onClick={handleDownload}
          type="button"
        >
          Descargar PDF
        </button>
      </div>
      {/* Preview grande del template */}
      <section className="flex-1 flex flex-col items-center justify-start p-0 sm:p-6 w-full h-full">
        <div className="w-full h-full flex flex-col gap-2 items-center">
          <div
            className="relative w-full h-full flex flex-col items-center"
            ref={previewRef}
          >
            {/* Espacio arriba para que los botones sticky no tapen el contenido */}
            <div style={{ height: "48px" }} />
            <div className="w-full h-full flex items-center justify-center">
              <TemplateComponent data={formData} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
