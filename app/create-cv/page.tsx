"use client";
import { useState, useEffect } from "react";
import { useCvForm } from "./state";
import CVWizard from "./components/CVWizard";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import SkillsForm from "./components/SkillsForm";
import CVPreview from "./components/CVPreview";
import { useRouter } from "next/navigation";

export default function CreateCVPage() {
  const { formData, setFormData, isHydrated } = useCvForm();
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (
      isHydrated &&
      formData.skills.some((s) => typeof s.level !== "string")
    ) {
      setFormData({
        ...formData,
        skills: formData.skills.map((s) =>
          typeof s.level === "string" ? s : { ...s, level: "Básico" }
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  const goNext = () => {
    if (step === 3) {
      const cleanEducation = formData.education.filter(
        edu =>
          edu.degree ||
          edu.institution ||
          edu.city ||
          edu.startDate ||
          edu.endDate ||
          edu.description
      );
      if (cleanEducation.length !== formData.education.length) {
        setFormData({ ...formData, education: cleanEducation });
      }
    }
    setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => s - 1);

  if (!isHydrated) return null;

  let formStep;
  if (step === 1) {
    formStep = (
      <CVWizard
        formData={formData}
        setFormData={setFormData}
        onNext={goNext}
      />
    );
  } else if (step === 2) {
    formStep = (
      <ExperienceForm
        values={formData.experience}
        onChange={(idx, field, value) => {
          const newExp = [...formData.experience];
          newExp[idx] = { ...newExp[idx], [field]: value };
          setFormData({ ...formData, experience: newExp });
        }}
        onAdd={() =>
          setFormData({
            ...formData,
            experience: [
              ...formData.experience,
              { company: "", position: "", startDate: "", endDate: "", city: "", description: "" },
            ],
          })
        }
        onRemove={(idx) =>
          setFormData({
            ...formData,
            experience: formData.experience.filter((_, i) => i !== idx),
          })
        }
        onBack={goBack}
        onNext={goNext}
      />
    );
  } else if (step === 3) {
    formStep = (
      <EducationForm
        values={formData.education}
        onChange={(idx, field, value) => {
          const newEdu = [...formData.education];
          newEdu[idx] = { ...newEdu[idx], [field]: value };
          setFormData({ ...formData, education: newEdu });
        }}
        onAdd={() =>
          setFormData({
            ...formData,
            education: [
              ...formData.education,
              { degree: "", institution: "", startDate: "", endDate: "", city: "", description: "" },
            ],
          })
        }
        onRemove={(idx) =>
          setFormData({
            ...formData,
            education: formData.education.filter((_, i) => i !== idx),
          })
        }
        onBack={goBack}
        onNext={goNext}
      />
    );
  } else if (step === 4) {
    formStep = (
      <SkillsForm
        values={formData.skills}
        onChange={(idx, field, value) => {
          const newSkills = [...formData.skills];
          newSkills[idx] = { ...newSkills[idx], [field]: value };
          setFormData({ ...formData, skills: newSkills });
        }}
        onAdd={() =>
          setFormData({
            ...formData,
            skills: [
              ...formData.skills,
              { name: "", level: "Básico" },
            ],
          })
        }
        onRemove={(idx) =>
          setFormData({
            ...formData,
            skills: formData.skills.filter((_, i) => i !== idx),
          })
        }
        onBack={goBack}
        onNext={goNext}
      />
    );
  } else if (step === 5) {
    formStep = (
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <CVPreview data={formData} />
        </div>
        <div className="flex justify-start p-6">
          <button
            type="button"
            onClick={goBack}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Atrás
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f8fd] flex flex-col md:flex-row">
      <section className="w-full md:w-1/2 flex justify-center items-start p-6">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-[700px] min-h-[90vh] flex flex-col relative">
          {formStep}
        </div>
      </section>
      <section className="w-full md:w-1/2 flex flex-col justify-start items-start p-6">
        <div className="w-full flex justify-end mb-2">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold shadow"
            onClick={() => router.push("/select-template")}
            type="button"
          >
            Descargar PDF
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg w-full max-w-[700px] min-h-[90vh] flex flex-col overflow-hidden">
          <CVPreview data={formData} />
        </div>
      </section>
    </main>
  );
}

