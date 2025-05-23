import { CvFormData } from "../state";

type Props = {
  formData: CvFormData;
  setFormData: (data: CvFormData) => void;
  onNext: () => void;
};

export default function CVWizard({ formData, setFormData, onNext }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      personal: {
        ...formData.personal,
        [name]: value,
      },
    });
  };

  // Para compatibilidad con el tipo (según tu CvFormData/personal)
  const { desiredPosition, firstName, lastName, email, phone, address, city, country } = formData.personal;

  return (
    <form className="p-8 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-blue-700 mb-1">Detalles personales</h2>
      <p className="text-sm text-gray-500 mb-6">¡Completá todos los campos para mejorar tu CV!</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-1">Puesto deseado</label>
          <input
            name="desiredPosition"
            value={desiredPosition}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Programador"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Nombre</label>
          <input
            name="firstName"
            value={firstName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Mario Sergio"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Apellido</label>
          <input
            name="lastName"
            value={lastName}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Dalo"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="damefuego@yahoo.com"
            type="email"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Teléfono</label>
          <input
            name="phone"
            value={phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="5458521878"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Dirección</label>
          <input
            name="address"
            value={address}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Varela 2612"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Ciudad / Provincia</label>
          <input
            name="city"
            value={city}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Buenos Aires"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">País</label>
          <input
            name="country"
            value={country}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Argentina"
          />
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="button"
          onClick={onNext}
        >
          Siguiente: Experiencia laboral
        </button>
      </div>
    </form>
  );
}
