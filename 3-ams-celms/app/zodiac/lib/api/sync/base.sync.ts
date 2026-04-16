import { apiClient } from "@/lib/api/client";

export interface SyncResult<T> {
  data: T | null;
  error?: string;
}

export async function syncRequest<T>(
  url: string,
  options: RequestInit,
): Promise<SyncResult<T>> {
  try {
    const data = await apiClient<T>(url, options);
    return { data };
  } catch (error: any) {
    return {
      data: null,
      error: error.message || "Unknown sync error",
    };
  }
}
