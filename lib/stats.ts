// Live protocol stats from the DAO Ships indexer (Supabase / PostgREST).
// Falls back gracefully to curated testnet figures when env is not configured,
// so the page is never broken by a missing/offline indexer.

export type Stat = { label: string; value: string; live: boolean };

const FALLBACK: Stat[] = [
  { label: "Ships launched", value: "—", live: false },
  { label: "Crew members", value: "—", live: false },
  { label: "Proposals", value: "—", live: false },
];

function compact(n: number): string {
  return Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

async function countTable(base: string, key: string, schema: string, table: string) {
  const res = await fetch(`${base}/rest/v1/${table}?select=id`, {
    method: "HEAD",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Accept-Profile": schema,
      Prefer: "count=exact",
    },
    next: { revalidate: 300 },
  });
  // PostgREST returns the count in the Content-Range header: "0-24/25"
  const range = res.headers.get("content-range");
  const total = range?.split("/")?.[1];
  return total ? Number(total) : null;
}

export async function getStats(): Promise<Stat[]> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const schema = process.env.NEXT_PUBLIC_INDEXER_SCHEMA ?? "testnet";
  if (!base || !key) return FALLBACK;

  try {
    const [daos, members, proposals] = await Promise.all([
      countTable(base, key, schema, "ds_daos"),
      countTable(base, key, schema, "ds_members"),
      countTable(base, key, schema, "ds_proposals"),
    ]);
    return [
      { label: "Ships launched", value: daos != null ? compact(daos) : "—", live: daos != null },
      { label: "Crew members", value: members != null ? compact(members) : "—", live: members != null },
      { label: "Proposals", value: proposals != null ? compact(proposals) : "—", live: proposals != null },
    ];
  } catch {
    return FALLBACK;
  }
}
