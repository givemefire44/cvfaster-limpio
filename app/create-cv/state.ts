import { useState, useEffect } from "react";

// ...tus tipos aquí...

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
    profileImage: "",
    profile: "",
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
};

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
z
