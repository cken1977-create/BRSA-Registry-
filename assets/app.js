const $ = (id) => document.getElementById(id);

const API_BASE = document
  .querySelector('meta[name="brsa-api-base"]')
  ?.getAttribute("content")
  ?.replace(/\/+$/, "");

const els = {
  form: $("lookupForm"),
  input: $("ridInput"),
  pill: $("statusPill"),
  dot: $("stateDot"),
  label: $("stateLabel"),
  headline: $("headline"),
  kv_registry_id: $("kv_registry_id"),
  kv_readiness_state: $("kv_readiness_state"),
  kv_status: $("kv_status"),
  kv_last_updated_at: $("kv_last_updated_at"),
};

function normalizeRid(raw) {
  return (raw || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/_/g, "-");
}

function isValidRid(rid) {
  return /^BRSA-\d{2}-[A-Z0-9]{8}$/.test(rid);
}

function setState(state) {
  els.label.textContent = state || "—";
  els.dot.style.background = "#6B7280";

  if (state === "GREEN") els.dot.style.background = "#1A6B3A";
  if (state === "YELLOW") els.dot.style.background = "#B58A00";
  if (state === "RED") els.dot.style.background = "#8B1A1A";
}

function setHeadline(text) {
  els.headline.textContent = text;
}

function setKV(obj) {
  els.kv_registry_id.textContent = obj.registry_id ?? "—";
  els.kv_readiness_state.textContent = obj.readiness_state ?? "—";
  els.kv_status.textContent = obj.status ?? "—";
  els.kv_last_updated_at.textContent = obj.last_updated_at ?? "—";
}

async function lookup(rid) {
  if (!API_BASE) {
    setState("RED");
    setHeadline("Config error: API base not set.");
    return;
  }

  if (!isValidRid(rid)) {
    setState("RED");
    setHeadline("Invalid Registry ID format. Example: BRSA-26-3MU364EP");
    return;
  }

  setState("—");
  setHeadline("Querying registry…");
  setKV({ registry_id: rid });

  try {
    const res = await fetch(
      `${API_BASE}/registry/v1/lookup?rid=${encodeURIComponent(rid)}`,
      { headers: { Accept: "application/json" } }
    );

    if (!res.ok) {
      setState("RED");
      setHeadline("No registry record found.");
      return;
    }

    const data = await res.json();

    setState(data.readiness_state || "RED");
    setHeadline("Registry record retrieved.");

    setKV({
      registry_id: data.registry_id,
      readiness_state: data.readiness_state,
      status: data.status,
      last_updated_at: data.last_updated_at,
    });
  } catch (e) {
    setState("RED");
    setHeadline("Network error. Check API + CORS.");
  }
}

els.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const rid = normalizeRid(els.input.value);
  els.input.value = rid;
  lookup(rid);
});
