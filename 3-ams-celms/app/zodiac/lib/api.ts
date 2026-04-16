import { userAgent } from "next/server";

export const apiFetch = async (url: string, options: RequestInit) => {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
};

// USAGE EXAMPLE
// userAgentawait apiFetch("/api/jobs", {
//   method: "POST",
//   body: JSON.stringify(job),
// });
