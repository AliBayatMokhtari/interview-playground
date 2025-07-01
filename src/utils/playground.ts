import type { FileSystemTree } from "@webcontainer/api";
import type { VirtualFile } from "src/structures/VirtualFile";
import type { VirtualFileSystemTree } from "src/structures/VirtualFileSystemTree";
import { isDirectory } from "./file";

export function filesToWebContainerFs(files: VirtualFile[]) {
  const tree: FileSystemTree = {};

  for (const file of files) {
    if (!isDirectory(file.filepath)) {
      tree[file.filepath] = file.toNode();
    } else {
      let parts = file.filepath.split("/");
      const filename = parts.pop()!;
      let current = tree;
      parts = parts.filter((part) => part !== ".." && part !== ".");
      for (const dir of parts) {
        if (!current[dir]) {
          current[dir] = { directory: {} };
        }
        const node = current[dir];
        if (!("directory" in node)) {
          throw new Error("Unexpected directory but found file");
        }
        current = node.directory;
      }
      current[filename] = file.toNode();
    }
  }
  return tree;
}

export function filesToVirtualFsTree(files: VirtualFile[]) {
  const tree: VirtualFileSystemTree = {};

  for (const file of files) {
    if (!isDirectory(file.filepath)) {
      tree[file.filepath] = { file };
    } else {
      let parts = file.filepath.split("/");
      const filename = parts.pop()!;
      let current = tree;
      parts = parts.filter((part) => part !== ".." && part !== ".");
      for (const dir of parts) {
        if (!current[dir]) {
          current[dir] = { directory: {} };
        }
        const node = current[dir];
        if (!("directory" in node))
          throw new Error("Unexpected directory but found file");
        current = node.directory;
      }
      current[filename] = { file };
    }
  }
  return tree;
}
