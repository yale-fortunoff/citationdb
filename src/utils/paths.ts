export function assetPath(path: string): string {
  // Next.js injects basePath into this env var at build time
  const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
  return `${basePath}${path}`;
}
