import { CvFormData } from "../../create-cv/state";

type Props = {
  data: CvFormData;
};

export default function CVTemplateBase({ data }: Props) {
  const { personal, experience, education, skills } = data;
  return (
    <div
      className="
        bg-white rounded-xl shadow mx-auto
        p-2 sm:p-8
        w-full max-w-full
        sm:max-w-[210mm]
        min-h-screen sm:min-h-[297mm]
        box-border
        transition-all
      "
      style={{
        width: "100%",
        maxWidth: "100%",
        minHeight: "100vh",
        // Desktop A4
        ...(typeof window !== "undefined" && window.innerWidth >= 640
          ? {
              width: "210mm",
              minHeight: "297mm",
              maxWidth: "210mm",
            }
          : {}),
      }}
    >
      {/* Header */}
      <div className="bg-green-100 p-2 sm:p-4 rounded-t-lg mb-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        {personal.profileImage && (
          <img
            src={personal.profileImage}
            alt="Foto de perfil"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow"
          />
        )}
        <div className="mt-2 sm:mt-0 w-full">
          <div className="font-bold text-lg sm:text-2xl mb-1">{personal.firstName} {personal.lastName}</div>
          <div className="text-xs sm:text-sm text-gray-800 mb-1">{personal.desiredPosition}</div>
          <div className="text-xs sm:text-sm text-gray-800 mb-1">
            {personal.address}
            {personal.address && ', '}
            {personal.city}
            {personal.city && ', '}
            {personal.country}
          </div>
          <div className="text-xs sm:text-sm text-gray-800 mb-1">
            {personal.phone && <span>{personal.phone} · </span>}
            {personal.email && <span>{personal.email}</span>}
          </div>
        </div>
      </div>

      {/* Experiencia Laboral */}
      <div className="mb-2">
        <div className="font-bold text-base sm:text-lg mb-1 mt-2">Experiencia Laboral</div>
        {experience.length > 0
          ? experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="font-semibold">
                  {exp.position}{exp.position && exp.company && ', '}
                  {exp.company}{exp.city && `, ${exp.city}`}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {exp.startDate}{exp.startDate && exp.endDate && ' – '}{exp.endDate}
                </div>
                <div className="text-xs sm:text-sm">{exp.description}</div>
              </div>
            ))
          : <span className="text-gray-400 text-xs sm:text-sm">No employment history.</span>}
      </div>

      {/* Educación */}
      <div className="mb-2">
        <div className="font-bold text-base sm:text-lg mb-1 mt-4">Educación</div>
        {education.length > 0
          ? education.map((edu, i) => (
              <div key={i} className="mb-4">
                <div className="font-semibold">
                  {edu.degree}{edu.degree && edu.institution && ', '}
                  {edu.institution}{edu.city && `, ${edu.city}`}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {edu.startDate}{edu.startDate && edu.endDate && ' – '}{edu.endDate}
                </div>
                <div className="text-xs sm:text-sm">{edu.description}</div>
              </div>
            ))
          : <span className="text-gray-400 text-xs sm:text-sm">No education loaded.</span>}
      </div>

      {/* Habilidades */}
      <div className="mb-2 flex-1">
        <div className="font-bold text-base sm:text-lg mb-1 mt-4">Habilidades</div>
        {skills.length > 0
          ? (
              <ul className="list-disc list-inside">
                {skills.map((skill, i) => (
                  <li key={i} className="text-xs sm:text-sm">{skill.name}</li>
                ))}
              </ul>
            )
          : <span className="text-gray-400 text-xs sm:text-sm">No skills loaded.</span>}
      </div>

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
