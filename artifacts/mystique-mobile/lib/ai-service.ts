const API_BASE = `https://${process.env.EXPO_PUBLIC_DOMAIN}/api`;

export async function generateTransitionAdvisoryAI(prompt: string): Promise<string> {
  const res = await fetch(`${API_BASE}/ai/transition-advisory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).error || 'AI request failed');
  }
  const data = await res.json();
  return data.text;
}

export async function fetchWikipediaBiography(name: string): Promise<{ day?: number; month?: number; year?: number; gender?: string } | null> {
  try {
    const params = new URLSearchParams({ name });
    const res = await fetch(`${API_BASE}/biography?${params}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}
