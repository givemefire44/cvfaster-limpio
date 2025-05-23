import React from "react";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => (
  <div className="flex justify-between mb-8">
    {steps.map((label, idx) => (
      <div key={label} className="flex-1 flex flex-col items-center">
        <div
          className={`rounded-full h-8 w-8 flex items-center justify-center font-bold
            ${idx === currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}
          `}
        >
          {idx + 1}
        </div>
        <span className="mt-2 text-xs text-center">{label}</span>
        {idx < steps.length - 1 && <div className="h-1 bg-gray-300 w-full mt-2" />}
      </div>
    ))}
  </div>
);

export default Stepper;
