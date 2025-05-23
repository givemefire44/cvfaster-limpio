import { CvFormData } from "../../create-cv/state";

type Props = {
  data: CvFormData;
};

export default function CVTemplateColumnar({ data }: Props) {
  const { personal, experience, education, skills, profile } = data;
  return (
    <div
      className="w-full font-sans"
      style={{
        background: "#fff",
        color: "#222",
        borderRadius: 8,
        overflow: "hidden",
        minHeight: "900px",
      }}
    >
      {/* Header */}
      <div
        className="flex flex-row items-center p-0"
        style={{ background: "#38F8C8", minHeight: 110 }}
      >
        {personal.profileImage && (
          <img
            src={personal.profileImage}
            alt="Foto de perfil"
            className="w-28 h-28 object-cover"
            style={{
              borderRadius: 6,
              margin: 18,
              background: "#fff",
              border: "2px solid #fff",
            }}
          />
        )}
        <div style={{ flex: 1, padding: "0.7rem 0" }}>
          <div className="text-3xl font-bold mb-1">{personal.firstName} {personal.lastName}</div>
          <div className="text-sm">{personal.address}{personal.city && `, ${personal.city}`}{personal.country && `, ${personal.country}`}</div>
          <div className="text-sm">{personal.phone} {personal.email && <>· <a className="underline text-blue-800" href={`mailto:${personal.email}`}>{personal.email}</a></>}</div>
        </div>
      </div>
      {/* Main Content: Habilidades columna + resto */}
      <div className="flex flex-row px-4 py-6 gap-8">
        {/* Columna izquierda: Skills */}
        <div style={{ minWidth: 220, maxWidth: 260 }}>
          <div className="font-bold mb-2">Skills</div>
          <ul className="flex flex-col gap-1">
            {skills.length > 0
              ? skills.map((skill, i) => (
                  <li key={i} className="flex items-center mb-1">
                    <span style={{ flex: 1, fontSize: 14 }}>{skill.name}</span>
                    <span
                      style={{
                        borderBottom: "2px solid #333",
                        flex: 1.5,
                        marginLeft: 8,
                        opacity: 0.5,
                        height: 1,
                      }}
                    ></span>
                  </li>
                ))
              : <span className="text-gray-400">No skills loaded.</span>}
          </ul>
        </div>
        {/* Columna derecha: Perfil, Experiencia, Educación */}
        <div className="flex-1">
          {/* Profile */}
          <div className="mb-3">
            <div className="font-bold text-lg mb-1">Profile</div>
            <div className="text-base mb-4">
              {profile || "Escribe una breve descripción profesional."}
            </div>
          </div>
          {/* Experiencia */}
          <div className="mb-3">
            <div className="font-bold text-lg mb-1">Employment History</div>
            {experience.length > 0 ? (
              experience.map((exp, i) => (
                <div key={i} className="mb-3">
                  <div className="font-semibold">
                    {exp.position && <>{exp.position}</>}
                    {exp.position && exp.company && ", "}
                    {exp.company && <>{exp.company}</>}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {exp.startDate}
                    {exp.startDate && exp.endDate && " – "}
                    {exp.endDate}
                  </div>
                  <div className="pl-2">
                    {exp.description ? (
                      exp.description.includes("\n") ? (
                        <ul className="list-disc list-inside">
                          {exp.description.split("\n").map((line, idx) =>
                            <li key={idx}>{line}</li>
                          )}
                        </ul>
                      ) : (
                        exp.description
                      )
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <span className="text-gray-400">No employment history.</span>
            )}
          </div>
          {/* Educación */}
          <div>
            <div className="font-bold text-lg mb-1">Education</div>
            {education.length > 0 ? (
              education.map((edu, i) => (
                <div key={i} className="mb-2">
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
            ) : (
              <span className="text-gray-400">No education loaded.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
