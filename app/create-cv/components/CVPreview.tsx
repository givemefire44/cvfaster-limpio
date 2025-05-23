import { CvFormData } from "../state";

type Props = { data: CvFormData };

export default function CVPreview({ data }: Props) {
  const { personal, experience, education, skills } = data;

  // Filtros para eliminar "vacíos"
  const validExperience = (experience || []).filter(
    exp => exp.position || exp.company || exp.city || exp.startDate || exp.endDate || exp.description
  );
  const validEducation = (education || []).filter(
    edu => edu.degree || edu.institution || edu.city || edu.startDate || edu.endDate || edu.description
  );
  const validSkills = (skills || []).filter(
    skill => skill.name
  );

  return (
    <div className="p-10 flex flex-col h-full">
      {/* Banner superior con datos personales */}
      <div className="bg-green-100 p-4 rounded-t-lg mb-4 min-h-[60px]">
        <div className="font-bold text-xl mb-1">
          {personal.firstName} {personal.lastName}
        </div>
        <div className="text-sm text-gray-700 mb-1">
          {personal.address}
          {personal.address && ', '}
          {personal.city}
          {personal.city && ', '}
          {personal.country}
        </div>
        <div className="text-sm text-gray-700 mb-1">
          {personal.phone && <span>{personal.phone} · </span>}
          {personal.email && <span>{personal.email}</span>}
        </div>
        <div className="text-sm text-gray-700">
          {personal.desiredPosition}
        </div>
      </div>

      {/* Experiencia Laboral */}
      <div>
        <div className="font-bold text-lg mb-1 mt-4">Experiencia Laboral</div>
        {validExperience.length > 0
          ? validExperience.map((exp, i) => (
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
          : <span className="text-gray-400">Sin experiencia laboral cargada.</span>}
      </div>

      {/* Educación */}
      <div>
        <div className="font-bold text-lg mb-1 mt-6">Educación</div>
        {validEducation.length > 0
          ? validEducation.map((edu, i) => (
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
          : <span className="text-gray-400">Sin educación cargada.</span>}
      </div>

      {/* Habilidades */}
      <div>
        <div className="font-bold text-lg mb-1 mt-6">Habilidades</div>
        {validSkills.length > 0
          ? (
              <ul className="list-disc list-inside">
                {validSkills.map((skill, i) => (
                  <li key={i}>{skill.name}</li>
                ))}
              </ul>
            )
          : <span className="text-gray-400">Sin habilidades cargadas.</span>}
      </div>
    </div>
  );
}
