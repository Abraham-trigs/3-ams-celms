// File: components/OurServices.tsx
"use client";

import React from "react";

interface ServiceListProps {
  title: string;
  description?: string;
  items?: (string | { heading: string; subItems: string[] })[];
}

const ServiceList: React.FC<ServiceListProps> = ({
  title,
  description,
  items,
}) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
      {title}
    </h3>
    {description && (
      <p className="text-[var(--color-text-secondary)] mb-2">{description}</p>
    )}
    {items && (
      <ul className="list-disc list-inside text-[var(--color-text-secondary)] space-y-1">
        {items.map((item, i) =>
          typeof item === "string" ? (
            <li key={i}>{item}</li>
          ) : (
            <li key={i}>
              <span className="font-medium text-[var(--color-secondary)]">
                {item.heading}
              </span>
              <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                {item.subItems.map((sub, j) => (
                  <li key={j}>{sub}</li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
    )}
  </div>
);

interface MaintenanceTableProps {
  columns: string[];
  data: { model: string; checks: boolean[] }[];
}

const MaintenanceTable: React.FC<MaintenanceTableProps> = ({
  columns,
  data,
}) => (
  <div className="overflow-x-auto mt-8">
    <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4 text-left">
      BASIC MAINTENANCE
    </h3>
    <table className="table-auto border-collapse border border-[var(--color-secondary)] w-full">
      <thead className="bg-[var(--color-primary)] text-white">
        <tr>
          <th className="px-4 py-2 text-left">Model</th>
          {columns.map((col, i) => (
            <th key={i} className="px-4 py-2">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            className="text-center border-b border-[var(--color-secondary)]"
          >
            <td className="px-4 py-2 font-semibold text-[var(--color-text-primary)] text-left">
              {row.model}
            </td>
            {row.checks.map((c, j) => (
              <td
                key={j}
                className="px-4 py-2 text-[var(--color-text-primary)]"
              >
                {c ? "✔️" : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function OurServices() {
  return (
    <section className="p-8 bg-[var(--color-background)] flex justify-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-extrabold mb-8 text-[var(--color-primary)] text-left">
          OUR SERVICES
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceList
            title="Light Aviation"
            description="50H, 10H, and CDN maintenance visits"
          />

          <ServiceList
            title="Non-Routine Work"
            items={[
              "Standard exchange of engines and APU",
              "Standard exchange of landers",
              "Treatment of fuel tank leaks",
            ]}
          />

          <ServiceList
            title="Online Maintenance"
            items={[
              "F28",
              "B727",
              "B737",
              "B707",
              "DC8",
              "DC9",
              "DC10",
              "A300",
              "A310",
              "A330",
              "B737 NG",
            ]}
          />

          <ServiceList
            title="Soon to be Implemented"
            items={[
              {
                heading: "Embraer ERJ",
                subItems: ["ERJ 135", "ERJ 140", "ERJ 145", "ERJ 145XR"],
              },
              {
                heading: "Jet Stream",
                subItems: ["HP137", "200", "31", "32 (SUPER 31)", "41"],
              },
            ]}
          />
        </div>

        <MaintenanceTable
          columns={["Check A", "Check B", "Check C", "Check D"]}
          data={[
            { model: "F28", checks: [true, false, true, true] },
            { model: "B727", checks: [true, true, true, true] },
            { model: "B737 classique", checks: [true, true, true, true] },
            { model: "B737 NG", checks: [true, true, true, false] },
            { model: "B707", checks: [true, true, true, false] },
            { model: "DC8", checks: [true, true, true, false] },
            { model: "DC9", checks: [true, true, true, false] },
            { model: "A300", checks: [true, true, false, false] },
            { model: "A301", checks: [true, false, false, false] },
          ]}
        />
      </div>
    </section>
  );
}
