import { CvFormData } from "../../create-cv/state";
import { FaPhone, FaEnvelope, FaHome, FaCar, FaPlane, FaTools, FaBook, FaGlobe, FaUser, FaInfoCircle } from "react-icons/fa";

type Props = {
  data: CvFormData;
};

export default function CVTemplateBarcelona({ data }: Props) {
  const { personal, experience, education, skills, languages, tools, about, other } = data;

  return (
    <div className="bg-gray-100 p-6 flex justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg flex w-[900px] overflow-hidden">
        {/* Sidebar Izquierda */}
        <aside className="bg-blue-900 text-white w-[270px] flex flex-col py-8 px-6 gap-8">
          <div className="flex flex-col items-center gap-2">
            {personal.profileImage && (
              <img
                src={personal.profileImage}
                alt="Foto de perfil"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mb-2"
              />
            )}
            <div className="font-bold text-xl text-center">{personal.firstName} {personal.lastName}</div>
            <div className="text-blue-200 text-center">{personal.desiredPosition}</div>
          </div>

          {/* Contacto */}
          <section>
            <h3 className="font-semibold text-blue-200 mb-2 flex items-center gap-2"><FaUser /> Contacto</h3>
            <ul className="text-sm space-y-2">
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

          {/* Información */}
          <section>
            <h3 className="font-semibold text-blue-200 mb-2 flex items-center gap-2"><FaInfoCircle /> Información</h3>
            <ul className="text-sm space-y-2">
              {other?.driversLicense && (
                <li className="flex items-center gap-2"><FaCar /> Carnet de conducir</li>
              )}
              {other?.ownCar && (
                <li className="flex items-center gap-2"><FaCar /> Vehículo propio</li>
              )}
              {other?.availabilityToTravel && (
                <li className="flex items-center gap-2"><FaPlane /> Disponibilidad para viajar</li>
              )}
            </ul>
          </section>

          {/* Herramientas */}
          {tools && tools.length > 0 && (
            <section>
              <h3 className="font-semibold text-blue-200 mb-2 flex items-center gap-2"><FaTools /> Herramientas</h3>
              <ul className="text-sm space-y-1">
                {tools.map((tool: any, i: number) => (
                  <li key={i}>{tool.name}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Idiomas */}
          {languages && languages.length > 0 && (
            <section>
              <h3 className="font-semibold text-blue-200 mb-2 flex items-center gap-2"><FaGlobe /> Idiomas</h3>
              <ul className="text-sm space-y-1">
                {languages.map((lang: any, i: number) => (
                  <li key={i}>{lang.language} <span className="text-xs text-blue-100">({lang.level})</span></li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Columna Principal */}
        <main className="flex-1 flex flex-col p-8 gap-8">
          {/* Sobre Mí */}
          {about && (
            <section>
              <h2 className="font-bold text-xl text-blue-900 mb-2">Perfil Profesional</h2>
              <p className="text-gray-800">{about}</p>
            </section>
          )}

          {/* Experiencia Laboral */}
          <section>
            <h2 className="font-bold text-xl text-blue-900 mb-2 flex items-center gap-2">
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
                  <div className="text-sm text-gray-600">
                    {exp.startDate}
                    {exp.startDate && exp.endDate && ' – '}
                    {exp.endDate}
                  </div>
                  <div className="text-gray-800">{exp.description}</div>
                </div>
              ))
            ) : (
              <span className="text-gray-400">No employment history.</span>
            )}
          </section>

          {/* Educación */}
          <section>
            <h2 className="font-bold text-xl text-blue-900 mb-2 flex items-center gap-2">
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
                  <div className="text-sm text-gray-600">
                    {edu.startDate}
                    {edu.startDate && edu.endDate && ' – '}
                    {edu.endDate}
                  </div>
                  <div className="text-gray-800">{edu.description}</div>
                </div>
              ))
            ) : (
              <span className="text-gray-400">No education loaded.</span>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
