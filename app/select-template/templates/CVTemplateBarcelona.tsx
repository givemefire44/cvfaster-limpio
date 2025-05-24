import { CvFormData } from "../../create-cv/state";
import { FaPhone, FaEnvelope, FaHome, FaGlobe, FaUser, FaBook } from "react-icons/fa";

type Props = {
  data: CvFormData;
};

export default function CVTemplateBarcelona({ data }: Props) {
  const { personal, experience, education, skills, languages } = data;

  return (
    // Cambiado a fondo oscuro igual que el template Base
    <div className="bg-gray-900 p-4 sm:p-6 flex justify-center min-h-screen">
      <div className="bg-white rounded-xl shadow-lg flex w-full max-w-[900px] overflow-hidden">
        {/* Sidebar Izquierda */}
        <aside className="bg-blue-900 text-white w-[220px] sm:w-[270px] flex flex-col py-8 px-4 sm:px-6 gap-8">
          <div className="flex flex-col items-center gap-2">
            {personal.profileImage && (
              <img
                src={personal.profileImage}
                alt="Foto de perfil"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-md mb-2"
              />
            )}
            <div className="font-bold text-lg sm:text-xl text-center">{personal.firstName} {personal.lastName}</div>
            <div className="text-blue-200 text-center text-sm">{personal.desiredPosition}</div>
          </div>

          {/* Contacto */}
          <section>
            <h3 className="font-semibold text-blue-200 mb-2 flex items-center gap-2"><FaUser /> Contacto</h3>
            <ul className="text-xs sm:text-sm space-y-2">
              {personal.phone && (
                <li className="flex items-center gap-2"><FaPhone /> {personal.phone}</li>
              )}
              {personal.email && (
                <li className="flex items-center gap-2"><FaEnvelope /> {personal.email}</li>
              )}
              {personal.address && (
                <li className="flex items-center gap-2"><FaHome /> {personal.address}</li>
              )}
              {personal.city && <li>{personal.city}</li>}
              {personal.country && <li>{personal.country}</li>}
            </ul>
          </section>

          {/* Idiomas */}
          {languages && languages.length > 0 && (
            <section>
              <h3 className="font-semibold text-blue-200 mb-2 flex items-center gap-2"><FaGlobe /> Idiomas</h3>
              <ul className="text-xs sm:text-sm space-y-1">
                {languages.map((lang: any, i: number) => (
                  <li key={i}>{lang.name} <span className="text-xs text-blue-100">({lang.level})</span></li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Columna Principal */}
        <main className="flex-1 flex flex-col p-4 sm:p-8 gap-8">
          {/* Experiencia Laboral */}
          <section>
            <h2 className="font-bold text-lg sm:text-xl text-blue-900 mb-2 flex items-center gap-2">
              <FaBook className="text-blue-800" /> Experiencia Laboral
            </h2>
            {experience && experience.length > 0 ? (
              experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <div className="font-semibold text-blue-800">
                    {exp.position}
                    {exp.position && exp.company && ', '}
                    {exp.company}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {exp.startDate}
                    {exp.startDate && exp.endDate && ' – '}
                    {exp.endDate}
                  </div>
                  <div className="text-gray-800 text-xs sm:text-sm">{exp.description}</div>
                </div>
              ))
            ) : (
              <span className="text-gray-400 text-xs sm:text-sm">No employment history.</span>
            )}
          </section>

          {/* Educación */}
          <section>
            <h2 className="font-bold text-lg sm:text-xl text-blue-900 mb-2 flex items-center gap-2">
              <FaBook className="text-blue-800" /> Formación
            </h2>
            {education && education.length > 0 ? (
              education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <div className="font-semibold text-blue-800">
                    {edu.degree}
                    {edu.degree && edu.institution && ', '}
                    {edu.institution}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {edu.startDate}
                    {edu.startDate && edu.endDate && ' – '}
                    {edu.endDate}
                  </div>
                  <div className="text-gray-800 text-xs sm:text-sm">{edu.description}</div>
                </div>
              ))
            ) : (
              <span className="text-gray-400 text-xs sm:text-sm">No education loaded.</span>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
