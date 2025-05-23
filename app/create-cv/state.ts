import { useState, useEffect } from "react";

// Tipos para cada sección
export type PersonalDetails = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  country: string;
  desiredPosition: string;
  profileImage?: string; // <-- AGREGADO
};

export type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  city: string;
};

export type Education = {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
  city: string;
};

export type Skill = {
  name: string;
  level: string; // e.g. "Básico", "Intermedio", "Avanzado"
};

// Estado global del CV
export type CvFormData = {
  personal: PersonalDetails;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
};

// Estado inicial completo
const initialFormData: CvFormData = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    country: "",
    desiredPosition: "",
    profileImage: "", // <-- AGREGADO
  },
  experience: [],
  education: [],
  skills: [],
};

const LOCAL_STORAGE_KEY = "cv-form-data";

export function useCvForm() {
  // 1. Estado inicial siempre vacío (igual que el server)
  const [formData, setFormData] = useState<CvFormData>(initialFormData);
  const [isHydrated, setIsHydrated] = useState(false);

  // 2. Cuando montó en el cliente, leo localStorage y actualizo estado
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setFormData(JSON.parse(stored));
    }
    setIsHydrated(true);
  }, []);

  // 3. Cada vez que cambia el estado, lo guardo en localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, isHydrated]);

  return {
    formData,
    setFormData,
    isHydrated,
  };
}
