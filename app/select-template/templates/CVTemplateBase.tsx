import { CvFormData } from "../../create-cv/state";

type Props = {
  data: CvFormData;
};

/**
 * Un template de CV de "Base" que:
 * - Siempre tiene el tamaño de una hoja A4 (210mm x 297mm).
 * - Está centrado y con "tarjeta" (fondo blanco, borde redondeado, sombra).
 * - Pagina automáticamente el contenido cuando hay overflow (para PDF).
 * - Soporta exportación limpia a PDF (usa page-break).
 * - Muestra header, experiencia, educación y habilidades.
 */
export default function CVTemplateBase({ data }: Props) {
  const { personal, experience, education, skills } = data;

  return (
    <div
      className="cv-page bg-white rounded-xl shadow mx-auto p-8"
      style={{
        width: "210mm",
        minHeight: "297mm",
        maxWidth: "210mm",
        boxSizing: "border-box",
        position: "relative",
        // Opcional: para pantalla, que no crezca infinito si hay poco contenido
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* Header: imagen a la izquierda, datos a la derecha */}
      <div className="bg-green-100 p-4 rounded-t-lg mb-6 min-h-[110px] flex items-center gap-4">
        {personal.profileImage && (
          <img
            src={personal.profileImage}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
            style={{ flexShrink: 0 }}
          />
        )}
        <div>
          <div className="font-bold text-2xl mb-1">{personal.firstName} {personal.lastName}</div>
          <div className="text-sm text-gray-800 mb-1">{personal.desiredPosition}</div>
          <div className="text-sm text-gray-800 mb-1">
            {personal.address}
            {personal.address && ', '}
            {personal.city}
            {personal.city && ', '}
            {personal.country}
          </div>
          <div className="text-sm text-gray-800 mb-1">
            {personal.phone && <span>{personal.phone} · </span>}
            {personal.email && <span>{personal.email}</span>}
          </div>
        </div>
      </div>

      {/* Experiencia Laboral */}
      <div className="mb-2">
        <div className="font-bold text-lg mb-1 mt-2">Experiencia Laboral</div>
        {experience.length > 0
          ? experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="font-semibold">
                  {exp.position}{exp.position && exp.company && ', '}
                  {exp.company}{exp.city && `, ${exp.city}`}
                </div>
                <div className="text-sm text-gray-600">
                  {exp.startDate}{exp.startDate && exp.endDate && ' – '}{exp.endDate}
                </div>
                <div>{exp.description}</div>
              </div>
            ))
          : <span className="text-gray-400">No employment history.</span>}
      </div>

      {/* Educación */}
      <div className="mb-2">
        <div className="font-bold text-lg mb-1 mt-4">Educación</div>
        {education.length > 0
          ? education.map((edu, i) => (
              <div key={i} className="mb-4">
                <div className="font-semibold">
                  {edu.degree}{edu.degree && edu.institution && ', '}
                  {edu.institution}{edu.city && `, ${edu.city}`}
                </div>
                <div className="text-sm text-gray-600">
                  {edu.startDate}{edu.startDate && edu.endDate && ' – '}{edu.endDate}
                </div>
                <div>{edu.description}</div>
              </div>
            ))
          : <span className="text-gray-400">No education loaded.</span>}
      </div>

      {/* Habilidades */}
      <div className="mb-2 flex-1">
        <div className="font-bold text-lg mb-1 mt-4">Habilidades</div>
        {skills.length > 0
          ? (
              <ul className="list-disc list-inside">
                {skills.map((skill, i) => (
                  <li key={i}>{skill.name}</li>
                ))}
              </ul>
            )
          : <span className="text-gray-400">No skills loaded.</span>}
      </div>

      {/* Pagina visual solo para PDF: esto fuerza salto de página si hay varias hojas */}
      <style jsx global>{`
        @media print {
          .cv-page {
            page-break-after: always;
            break-after: page;
          }
        }
      `}</style>
    </div>
  );
}
