const basePath = process.env.PAGES_BASE_PATH || "";

export function asset(path: string) {
  return `${basePath}${path}`;
}
