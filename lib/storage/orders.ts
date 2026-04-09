import { promises as fs } from "fs";
import path from "path";

const storePath = path.join(process.cwd(), ".loft", "orders.json");

type LocalOrderStore = {
  orders: Array<Record<string, unknown>>;
};

function emptyStore(): LocalOrderStore {
  return {
    orders: []
  };
}

async function ensureLocalStore() {
  await fs.mkdir(path.dirname(storePath), { recursive: true });

  try {
    await fs.access(storePath);
  } catch {
    await fs.writeFile(storePath, JSON.stringify(emptyStore(), null, 2), "utf8");
  }
}

async function readLocalStore(): Promise<LocalOrderStore> {
  await ensureLocalStore();

  try {
    const raw = await fs.readFile(storePath, "utf8");
    return JSON.parse(raw) as LocalOrderStore;
  } catch {
    return emptyStore();
  }
}

async function writeLocalStore(store: LocalOrderStore) {
  await ensureLocalStore();
  await fs.writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

export async function appendOrderLog(order: Record<string, unknown>) {
  try {
    const store = await readLocalStore();
    store.orders.unshift(order);
    store.orders = store.orders.slice(0, 100);
    await writeLocalStore(store);
  } catch {
    // best-effort local logging only
  }
}
