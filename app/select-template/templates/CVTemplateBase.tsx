import { CvFormData } from "../../create-cv/state";

type Props = {
  data: CvFormData;
};

export default function CVTemplateBase({ data }: Props) {
  const { personal, experience, education, skills } = data;
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-green-300 p-4 rounded-t-lg mb-4 min-h-[60px] flex flex-col items-center">
        {/* Imagen de perfil */}
        {personal.profileImage && (
          <img
            src={personal.profileImage}
            alt="Foto de perfil"
            className="w-28 h-28 rounded-full object-cover mb-2 border-4 border-white shadow"
            style={{ marginTop: -60 }}
          />
        )}
        <div className="font-bold text-2xl mb-1 text-center">{personal.firstName} {personal.lastName}</div>
        <div className="text-sm text-gray-800 mb-1 text-center">
          {personal.address}
          {personal.address && ', '}
          {personal.city}
          {personal.city && ', '}
          {personal.country}
        </div>
        <div className="text-sm text-gray-800 mb-1 text-center">
          {personal.phone && <span>{personal.phone} · </span>}
          {personal.email && <span>{personal.email}</span>}
        </div>
        <div className="text-sm text-gray-800 text-center">
          {personal.desiredPosition}
        </div>
      </div>

      {/* Experiencia Laboral */}
      <div>
        <div className="font-bold text-lg mb-1 mt-4">Employment History</div>
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
      <div>
        <div className="font-bold text-lg mb-1 mt-6">Education</div>
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

      {/* Skills */}
      <div>
        <div className="font-bold text-lg mb-1 mt-6">Skills</div>
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
    </div>
  );
}
