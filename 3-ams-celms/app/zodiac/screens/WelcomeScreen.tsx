"use client";

import { useEffect } from "react";
import { useZodiac } from "../store/zodiac.store";
import { useModalStore } from "../store/useModalStore";
import { ZodiacScreen } from "../types/screen.types";

// 1. IMPORT REAL COMPONENTS (No more strings)
import { WelcomeTopModal } from "../modals/WelcomeTopModal";
import { WelcomeAdModal } from "../modals/WelcomeAdModal";
import { LoginOptionsModal } from "../modals/LoginOptionsModal";

export const WelcomeScreen: ZodiacScreen = {
  id: "WELCOME",
  layoutMode: "SPLIT",

  TopComponent: () => {
    const setSharedAction = useZodiac((s) => s.setSharedAction);
    const openModal = useModalStore((s) => s.openModal);

    useEffect(() => {
      // 2. INITIAL INJECTION: Pass the actual component functions
      openModal("TOP", WelcomeTopModal);
      openModal("DOWN", WelcomeAdModal);

      // 3. CONFIGURE ACTION: Swap with the real Login component
      setSharedAction({
        label: "Login to Profile",
        onPress: () => {
          console.log(
            "Direct Injection Swap: Replacing Ad with Login Options...",
          );
          openModal("DOWN", LoginOptionsModal);
        },
      });

      return () => setSharedAction(null);
    }, [setSharedAction, openModal]);

    // Controller returns null; visuals are handled by the injected components
    return null;
  },

  DownComponent: () => null,
};
