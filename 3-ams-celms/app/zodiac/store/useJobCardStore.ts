import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

// Matching the UI categories from your documents
export type ServiceType =
  | "Printing"
  | "Large Format"
  | "Apparel"
  | "Digital Editing"
  | null;

export type ModalStep = "SERVICE" | "MATERIAL" | "SIZE" | "QUANTITY" | "REVIEW";

interface JobCardState {
  // --- Current Configuration State ---
  activeService: ServiceType;
  activeMaterialId: string | null; // Links to db.json
  materialName: string | null;
  paperSize: string | null;
  quantity: number;
  unitPrice: number;
  colorType: "Color" | "Black & White";
  sideType: "Front" | "Front & Back";

  // --- Modal Visibility State ---
  isMainModalOpen: boolean;
  activeStep: ModalStep;

  // --- Actions ---
  openModal: () => void;
  closeModal: () => void;
  setStep: (step: ModalStep) => void;

  // --- Selection Setters ---
  setService: (service: ServiceType) => void;
  // Passing full material info to sync with pricing
  selectMaterial: (id: string, name: string, price: number) => void;
  setPaperSize: (size: string | null) => void;
  setQuantity: (qty: number) => void;
  toggleColor: () => void;
  toggleSides: () => void;

  // --- System Actions ---
  resetConfig: () => void;
}

export const useJobCardStore = create<JobCardState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        activeService: null,
        activeMaterialId: null,
        materialName: "Plain Paper",
        paperSize: "A4",
        quantity: 1,
        unitPrice: 3.0,
        colorType: "Color",
        sideType: "Front",

        isMainModalOpen: false,
        activeStep: "SERVICE",

        // Modal Management
        openModal: () => set({ isMainModalOpen: true }),
        closeModal: () => set({ isMainModalOpen: false }),
        setStep: (step) => set({ activeStep: step }),

        // Configuration Logic
        setService: (service) => {
          set({
            activeService: service,
            // Logic: If Digital Editing, we go straight to Quantity/Review
            // If Large Format, we MUST pick Material next.
            activeStep: service === "Large Format" ? "MATERIAL" : "SIZE",
          });
        },

        selectMaterial: (id, name, price) => {
          set({
            activeMaterialId: id,
            materialName: name,
            unitPrice: price,
            activeStep: "QUANTITY", // Auto-advance after picking material
          });
        },

        setPaperSize: (size) =>
          set({
            paperSize: size,
            activeStep: "MATERIAL", // Follow the breadcrumb trail
          }),

        setQuantity: (qty) => set({ quantity: qty }),

        toggleColor: () =>
          set((state) => ({
            colorType: state.colorType === "Color" ? "Black & White" : "Color",
          })),

        toggleSides: () =>
          set((state) => ({
            sideType: state.sideType === "Front" ? "Front & Back" : "Front",
          })),

        // Cleaning up after saving a job to the main Zodiac Store
        resetConfig: () =>
          set({
            activeService: null,
            activeMaterialId: null,
            materialName: "Plain Paper",
            paperSize: "A4",
            quantity: 1,
            unitPrice: 3.0,
            colorType: "Color",
            sideType: "Front",
            activeStep: "SERVICE",
            isMainModalOpen: false,
          }),
      }),
      {
        name: "zodiac-job-config",
        // We persist the draft but NOT the open modal state
        partialize: (state) => ({
          activeService: state.activeService,
          activeMaterialId: state.activeMaterialId,
          materialName: state.materialName,
          paperSize: state.paperSize,
          quantity: state.quantity,
          unitPrice: state.unitPrice,
          colorType: state.colorType,
          sideType: state.sideType,
        }),
      },
    ),
  ),
);
