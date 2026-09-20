import "server-only";

const API_BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
  revalidate?: number | false;
  tags?: string[];
  timeoutMs?: number;
}

export async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  // If no backend API URL is explicitly configured, throw immediately so feature functions use mock data in 0ms
  if (!API_BASE_URL) {
    throw new Error("No backend API URL configured. Using mock dataset.");
  }

  const { revalidate = 60, tags, headers, timeoutMs = 1500, ...customConfig } = options;

  const config: RequestInit = {
    method: customConfig.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    signal: AbortSignal.timeout(timeoutMs),
    ...customConfig,
  };

  if (revalidate !== undefined || tags) {
    config.next = {
      ...(revalidate !== undefined ? { revalidate } : {}),
      ...(tags ? { tags } : {}),
    };
  }

  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Request failed with status ${response.status}`);
    }

    const json = await response.json();
    return json.data !== undefined ? json.data : json;
  } catch (error: any) {
    throw error;
  }
}
