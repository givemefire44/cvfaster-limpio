import { CvFormData } from "../../create-cv/state";

type Props = {
  data: CvFormData;
};

export default function CVTemplateModern({ data }: Props) {
  const { personal, experience, education, skills } = data;
  return (
    <div className="w-full font-sans" style={{ color: "#222" }}>
      <div className="bg-blue-700 text-white p-6 rounded-t-lg flex items-center gap-6">
        {personal.profileImage && (
          <img
            src={personal.profileImage}
            alt="Foto de perfil"
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-200"
          />
        )}
        <div>
          <div className="text-3xl font-bold">{personal.firstName} {personal.lastName}</div>
          <div className="text-md">{personal.desiredPosition}</div>
          <div className="text-sm">{personal.city}, {personal.country}</div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-b-lg">
        <section className="mb-4">
          <h2 className="font-semibold text-blue-700 mb-2">Experiencia Laboral</h2>
          {experience.length > 0 ? (
            experience.map((exp, i) => (
              <div key={i} className="mb-2">
                <div className="font-semibold">{exp.position} - {exp.company}</div>
                <div className="text-sm text-gray-500">{exp.startDate} — {exp.endDate}</div>
                <div className="text-sm">{exp.description}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-400">No hay experiencia cargada.</div>
          )}
        </section>
        <section className="mb-4">
          <h2 className="font-semibold text-blue-700 mb-2">Educación</h2>
          {education.length > 0 ? (
            education.map((edu, i) => (
              <div key={i} className="mb-2">
                <div className="font-semibold">{edu.degree} - {edu.institution}</div>
                <div className="text-sm text-gray-500">{edu.startDate} — {edu.endDate}</div>
                <div className="text-sm">{edu.description}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-400">No hay educación cargada.</div>
          )}
        </section>
        <section>
          <h2 className="font-semibold text-blue-700 mb-2">Habilidades</h2>
          {skills.length > 0 ? (
            <ul className="list-disc list-inside">
              {skills.map((s, i) => (
                <li key={i}>{s.name} <span className="text-xs text-gray-500">({s.level})</span></li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400">No hay habilidades cargadas.</div>
          )}
        </section>
      </div>
    </div>
  );
}
