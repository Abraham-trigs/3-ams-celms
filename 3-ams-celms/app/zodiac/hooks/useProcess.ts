// app/zodiac/hooks/useProcess.ts
import { useEffect, useCallback } from "react";
import { useZodiac } from "../store/zodiac.store";
import { useProcessStore } from "../store/process.store";

export function useProcess(
  processId: string,
  steps: { label: string }[],
  onComplete: (data: any) => void,
) {
  const setSharedAction = useZodiac((s) => s.setSharedAction);
  const { getProcess, updateProcess } = useProcessStore();

  const { currentStep, data } = getProcess(processId);

  // 1. Stable execution function
  const handleAction = useCallback(() => {
    if (currentStep === steps.length - 1) {
      onComplete(data);
    } else {
      updateProcess(processId, currentStep + 1, {});
    }
  }, [currentStep, data, steps.length, processId, updateProcess, onComplete]);

  // 2. Only update the button when the step or label actually changes
  useEffect(() => {
    setSharedAction({
      label: steps[currentStep].label,
      onPress: handleAction,
    });

    return () => setSharedAction(null);
  }, [currentStep, handleAction, steps, setSharedAction]);

  return {
    currentStep,
    data,
    updateData: (newData: any) =>
      updateProcess(processId, currentStep, newData),
  };
}
