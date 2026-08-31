const basePath = process.env.NODE_ENV === "production" ? "/variablevelocitywebsite36397" : "";

export function asset(path: string) {
  return `${basePath}${path}`;
}
