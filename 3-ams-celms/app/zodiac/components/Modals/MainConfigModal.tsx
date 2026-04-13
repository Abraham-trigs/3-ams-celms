// "use client";

// import React from "react";
// import { useJobCardStore } from "../../store/useJobCardStore";
// import { useZodiacStore } from "../../store/useZodiacStore";

// export const MainConfigModal = () => {
//   const {
//     activeStep,
//     setStep,
//     setService,
//     selectMaterial,
//     setQuantity,
//     quantity,
//     activeService,
//     materialName,
//     activeMaterialId,
//     unitPrice,
//     closeModal,
//     resetConfig,
//   } = useJobCardStore();

//   const { materials, services, createJob } = useZodiacStore();

//   // --- 1. Service Selection View ---
//   const ServiceView = () => (
//     <div
//       style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}
//     >
//       {services.map((ser) => (
//         <button
//           key={ser.id}
//           onClick={() => setService(ser.name as any)}
//           className="zodiac-card"
//           style={{
//             border: "2px solid var(--zodiac-bg)",
//             textAlign: "center",
//             padding: "20px",
//           }}
//         >
//           <div style={{ fontSize: "1.5rem", marginBottom: "10px" }}>📄</div>
//           <div style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
//             {ser.name}
//           </div>
//         </button>
//       ))}
//     </div>
//   );

//   // --- 2. Material Selection View ---
//   const MaterialView = () => (
//     <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//       {materials.map((mat) => (
//         <button
//           key={mat.id}
//           onClick={() => selectMaterial(mat.id, mat.name, mat.sellingPrice)}
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             padding: "20px",
//             borderRadius: "15px",
//             background: "var(--zodiac-bg)",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           <div>
//             <div style={{ fontWeight: "bold", color: "var(--zodiac-deep)" }}>
//               {mat.name}
//             </div>
//             <div style={{ fontSize: "0.7rem", opacity: 0.6 }}>
//               {mat.unit} available
//             </div>
//           </div>
//           <div style={{ fontWeight: "800", color: "var(--zodiac-primary)" }}>
//             Ghc {mat.sellingPrice}
//           </div>
//         </button>
//       ))}
//     </div>
//   );

//   // --- 3. Quantity View (UPDATED → goes to REVIEW) ---
//   const QuantityView = () => (
//     <div style={{ textAlign: "center", padding: "20px 0" }}>
//       <h1
//         className="text-orange-glow"
//         style={{ fontSize: "4rem", margin: "20px 0" }}
//       >
//         {quantity}
//       </h1>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "20px",
//           marginBottom: "30px",
//         }}
//       >
//         <button
//           onClick={() => setQuantity(Math.max(1, quantity - 1))}
//           className="btn-zodiac-main"
//           style={{ borderRadius: "50%", width: "60px", height: "60px" }}
//         >
//           -
//         </button>

//         <button
//           onClick={() => setQuantity(quantity + 1)}
//           className="btn-zodiac-main"
//           style={{ borderRadius: "50%", width: "60px", height: "60px" }}
//         >
//           +
//         </button>
//       </div>

//       <button
//         onClick={() => setStep("REVIEW")}
//         className="btn-zodiac-main"
//         style={{ width: "100%" }}
//       >
//         Next: Review
//       </button>
//     </div>
//   );

//   // --- 4. Review & Commit ---
//   const ReviewView = () => {
//     const total = quantity * unitPrice;

//     const handleConfirm = () => {
//       if (!activeService || !activeMaterialId) return;

//       // 1. Persist job
//       createJob({
//         type: activeService,
//         materialId: activeMaterialId,
//         quantity: quantity,
//       });

//       // 2. Reset + close
//       resetConfig();
//       closeModal();

//       alert("Job Added to Pending Queue!");
//     };

//     return (
//       <div style={{ textAlign: "center" }}>
//         <div
//           className="zodiac-card"
//           style={{ background: "var(--zodiac-bg)", marginBottom: "20px" }}
//         >
//           <p style={{ margin: "5px 0", opacity: 0.7 }}>Summary</p>
//           <h4 style={{ margin: "5px 0" }}>{activeService}</h4>
//           <p style={{ fontSize: "0.8rem", margin: 0 }}>
//             {materialName} x {quantity}
//           </p>
//           <h2 className="text-orange-glow" style={{ marginTop: "15px" }}>
//             Ghc {total.toFixed(2)}
//           </h2>
//         </div>

//         <button
//           onClick={handleConfirm}
//           className="btn-zodiac-accent"
//           style={{ width: "100%" }}
//         >
//           Confirm & Add to Cart
//         </button>

//         <button
//           onClick={() => setStep("QUANTITY")}
//           style={{
//             background: "none",
//             border: "none",
//             marginTop: "15px",
//             color: "var(--zodiac-primary)",
//             fontWeight: "600",
//           }}
//         >
//           Edit Quantity
//         </button>
//       </div>
//     );
//   };

//   // --- Main Switcher ---
//   return (
//     <div>
//       <div
//         style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
//       >
//         {activeStep !== "SERVICE" && (
//           <button
//             onClick={() => setStep("SERVICE")}
//             style={{ background: "none", border: "none", marginRight: "10px" }}
//           >
//             ⬅️
//           </button>
//         )}

//         <h3
//           style={{
//             margin: 0,
//             textTransform: "uppercase",
//             letterSpacing: "1px",
//           }}
//         >
//           {activeStep}
//         </h3>
//       </div>

//       {activeStep === "SERVICE" && <ServiceView />}
//       {activeStep === "MATERIAL" && <MaterialView />}
//       {activeStep === "QUANTITY" && <QuantityView />}
//       {activeStep === "REVIEW" && <ReviewView />}
//     </div>
//   );
// };
