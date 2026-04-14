// app/zodiac/hooks/useProcess.ts
import { useCallback } from "react";
import { useProcessStore } from "../store/process.store";

export function useProcess(
  processId: string,
  steps: { label: string }[],
  onComplete: (data: any) => void,
) {
  const { getProcess, updateProcess } = useProcessStore();

  const { currentStep, data } = getProcess(processId);

  // Move forward
  const next = useCallback(() => {
    const isLast = currentStep >= steps.length - 1;

    if (isLast) {
      onComplete(data);
      return;
    }

    updateProcess(processId, currentStep + 1, {});
  }, [currentStep, steps.length, processId, updateProcess, onComplete, data]);

  // Move backward
  const back = useCallback(() => {
    if (currentStep <= 0) return;
    updateProcess(processId, currentStep - 1, {});
  }, [currentStep, processId, updateProcess]);

  // Update form data
  const updateData = useCallback(
    (newData: any) => {
      updateProcess(processId, currentStep, newData);
    },
    [processId, currentStep, updateProcess],
  );

  return {
    currentStep,
    stepLabel: steps[currentStep]?.label,
    data,
    next,
    back,
    updateData,
  };
}
