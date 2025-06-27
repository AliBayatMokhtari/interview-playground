import type { VirtualFile } from "src/structures/VirtualFile";

export function isDirectory(filepath: string) {
  return filepath.includes("/");
}
