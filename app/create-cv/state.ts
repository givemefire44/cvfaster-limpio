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
  profileImage?: string;
  profile?: string;
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
  level: string;
};

export type Language = {
  name: string;
  level: string;
};

export type CvFormData = {
  personal: PersonalDetails;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
};

export const initialFormData: CvFormData = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    country: "",
    desiredPosition: "",
    profileImage: "",
    profile: "",
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
};

// ¡ESTO ES LO QUE FALTABA!
export function useCvForm() {
  const [formData, setFormData] = useState<CvFormData>(initialFormData);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cv-form-data");
    if (stored) setFormData(JSON.parse(stored));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cv-form-data", JSON.stringify(formData));
    }
  }, [formData, isHydrated]);

  return { formData, setFormData, isHydrated };
}
