import type { ReactionType } from "./api";

const KEY = "tlc-reactions";

type LocalReactions = Record<number, ReactionType[]>;

function load(): LocalReactions {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

function save(data: LocalReactions) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getLocalReactions(blogId: number): ReactionType[] {
  return load()[blogId] ?? [];
}

export function hasLocalReaction(blogId: number, type: ReactionType): boolean {
  return getLocalReactions(blogId).includes(type);
}

export function toggleLocalReaction(blogId: number, type: ReactionType): boolean {
  const data = load();
  const current = data[blogId] ?? [];
  const active = current.includes(type);

  data[blogId] = active
    ? current.filter((t) => t !== type)
    : [...current, type];

  save(data);
  return !active;
}
