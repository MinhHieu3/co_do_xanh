import { MAX_FORM_BYTES, submitForm, type Settings } from "../../server/booking-forms.ts";

const headers = { "Cache-Control": "no-store" };
const invalid = { success: false };

async function readJson(request: Request): Promise<unknown> {
  if (Number(request.headers.get("Content-Length")) > MAX_FORM_BYTES) throw new Error("Form is too large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing form body");

  const bytes = new Uint8Array(MAX_FORM_BYTES);
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (size + value.length > MAX_FORM_BYTES) {
        await reader.cancel();
        throw new Error("Form is too large");
      }
      bytes.set(value, size);
      size += value.length;
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(new TextDecoder().decode(bytes.subarray(0, size)));
}

export default {
  async fetch(request: Request, env: Settings) {
    if (new URL(request.url).pathname !== "/api/forms") {
      return Response.json(invalid, { status: 404, headers });
    }
    if (request.method !== "POST") {
      return Response.json(invalid, { status: 405, headers: { ...headers, Allow: "POST" } });
    }
    if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
      return Response.json(invalid, { status: 415, headers });
    }

    let input: unknown;
    try {
      input = await readJson(request);
    } catch {
      return Response.json(invalid, { status: 400, headers });
    }

    const { status, body } = await submitForm(input, env);
    return Response.json(body, { status, headers });
  },
};
