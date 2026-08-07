const BREETH_API_URL = "https://api.thebreeth.com/v1";

function getBreethHeaders() {
  const apiKey = process.env.BREETH_API_KEY;

  if (!apiKey) {
    throw new Error("BREETH_API_KEY is not configured.");
  }

  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}

export async function searchBreeth(query: string) {
  const response = await fetch(`${BREETH_API_URL}/search`, {
    method: "POST",
    headers: getBreethHeaders(),
    body: JSON.stringify({
      query,
      limit: 5,
    }),
  });

  if (!response.ok) {
    throw new Error("Breeth search failed.");
  }

  return response.json();
}

export async function storeBreethMemory(content: string) {
  const response = await fetch(`${BREETH_API_URL}/episodes`, {
    method: "POST",
    headers: getBreethHeaders(),
    body: JSON.stringify({
      content,
      group_id: "default",
      extract_intent: true,
    }),
  });

  if (!response.ok) {
    throw new Error("Breeth memory storage failed.");
  }

  return response.json();
}