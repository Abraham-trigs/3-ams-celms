"use client";

import { useEffect } from "react";
import { useZodiac } from "../store/zodiac.store";
import { useModalStore } from "../store/useModalStore";
import { ZodiacScreen } from "../types/screen.types";

// Components
import { WelcomeTopModal } from "../modals/WelcomeTopModal";
import { WelcomeAdModal } from "../modals/WelcomeAdModal";
import { LoginOptionsModal } from "../modals/LoginOptionsModal";

export const WelcomeScreen: ZodiacScreen = {
  id: "WELCOME",
  layoutMode: "SPLIT",

  TopComponent: () => {
    const setSharedAction = useZodiac((s) => s.setSharedAction);
    const swapModal = useModalStore((s) => s.swapModal);

    useEffect(() => {
      // ---------------- INITIAL UI INJECTION ----------------
      swapModal("TOP", WelcomeTopModal);
      swapModal("DOWN", WelcomeAdModal);

      // ---------------- ACTION BINDING ----------------
      setSharedAction({
        label: "Login to Profile",
        onPress: () => {
          console.log("Swapping DOWN zone → LoginOptionsModal");

          // clean replacement (no stacking, no ambiguity)
          swapModal("DOWN", LoginOptionsModal);
        },
      });

      // ---------------- CLEANUP ----------------
      return () => {
        setSharedAction(null);

        // optional: clear only what this screen owns
        swapModal("TOP", null);
        swapModal("DOWN", null);
      };
    }, [setSharedAction, swapModal]);

    return null;
  },

  DownComponent: () => null,
};
