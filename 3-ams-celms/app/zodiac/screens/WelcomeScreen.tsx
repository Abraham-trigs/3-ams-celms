"use client";

import { useEffect, useRef } from "react";
import { useZodiac } from "../store/zodiac.store";
import { useModalStore } from "../store/useModalStore";

// Components
import { WelcomeTopModal } from "../modals/WelcomeTopModal";
import { WelcomeAdModal } from "../modals/WelcomeAdModal";
import { LoginOptionsModal } from "../modals/LoginOptionsModal";

export const WelcomeScreen = {
  id: "WELCOME",
  layoutMode: "SPLIT",

  TopComponent: () => {
    const setSharedAction = useZodiac((s) => s.setSharedAction);
    const swapModal = useModalStore((s) => s.swapModal);

    // 🔒 persistent guard across strict-mode remounts
    const injectedRef = useRef(false);

    useEffect(() => {
      if (injectedRef.current) return;
      injectedRef.current = true;

      // ---------------- INITIAL INJECTION ----------------
      swapModal("TOP", WelcomeTopModal);
      swapModal("DOWN", WelcomeAdModal);

      // ---------------- ACTION BINDING ----------------
      setSharedAction({
        label: "Login to Profile",
        onPress: () => {
          swapModal("DOWN", LoginOptionsModal);
        },
      });

      // ---------------- CLEANUP ----------------
      return () => {
        setSharedAction(null);

        swapModal("TOP", null as any);
        swapModal("DOWN", null as any);
      };
    }, [swapModal, setSharedAction]);

    return null;
  },

  DownComponent: () => null,
};
