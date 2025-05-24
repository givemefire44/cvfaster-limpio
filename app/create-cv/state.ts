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
  languages: Language[]; // <-- DEBE ESTAR AQUÍ
  // Si quieres usar tools, about, other, agrégalos aquí también:
  // tools?: { name: string }[];
  // about?: string;
  // other?: { [key: string]: any };
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
  languages: [], // <-- DEBE ESTAR AQUÍ TAMBIÉN
  // tools: [],
  // about: "",
  // other: {},
};

