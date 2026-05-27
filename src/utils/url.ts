export function getPathname(url: string): string {
  return new URL(url).pathname
}
