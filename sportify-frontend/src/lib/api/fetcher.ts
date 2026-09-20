import "server-only";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface FetchOptions extends RequestInit {
  revalidate?: number | false;
  tags?: string[];
}

export async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate = 60, tags, headers, ...customConfig } = options;

  const config: RequestInit = {
    method: customConfig.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
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
    console.error(`[Fetcher Error] [${config.method}] ${url}:`, error.message);
    throw error;
  }
}
