import { useEffect, useRef } from "react";
import useWebContainer from "src/stores/webContainer";
import { VirtualFile } from "src/structures/VirtualFile";
import { filesToWebContainerFs } from "src/utils/playground";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { PlaygroundStatus } from "src/types/Playground";

import "@xterm/xterm/css/xterm.css";

export default function usePlayground() {
  const { wc, url, isBooted, status, boot, setStatus, setUrl } =
    useWebContainer();
  const terminal = useRef(
    new Terminal({
      fontSize: 15,
      cursorBlink: true,
      customGlyphs: true,
      allowTransparency: true,
      fontFamily: 'DM Mono, Menlo, "Courier New", monospace',
      theme: {
        background: "#00000000",
        foreground: "black",
      },
    })
  );
  const terminalEl = useRef<HTMLDivElement>(null);

  const mountFiles = async (files: VirtualFile[]) => {
    if (!wc) {
      return;
    }
    const wcFsTree = filesToWebContainerFs(files);
    setStatus(PlaygroundStatus.MOUNTING);
    if (wc) {
      await wc.mount(wcFsTree);
    }
    const fitAddon = new FitAddon();
    terminal.current.loadAddon(fitAddon);
    terminal.current.open(terminalEl.current!);
    fitAddon.fit();
  };

  const installDependencies = async () => {
    if (!wc) {
      return;
    }
    setStatus(PlaygroundStatus.INSTALLING);
    const installProcess = await wc.spawn("pnpm", ["install"]);

    installProcess.output.pipeTo(
      new WritableStream({
        write: (chunk) => {
          terminal.current.write(chunk);
          terminal.current.scrollToBottom();
        },
      })
    );

    const exitCode = await installProcess.exit;
    if (exitCode !== 0) {
      setStatus(PlaygroundStatus.ERROR);
      console.error("Failed to install dependencies");
    }
  };

  const runDevServer = async () => {
    if (!wc) {
      return;
    }
    setStatus(PlaygroundStatus.STARTING);
    await wc.spawn("pnpm", ["start"]);
    setStatus(PlaygroundStatus.READY);
  };

  const setupListeners = () => {
    if (!wc) {
      return;
    }
    wc.on("server-ready", (port, url) => {
      setUrl(url);
      console.log(`Server is running at ${url} and port ${port}`);
    });

    wc.on("error", (error) => {
      console.error("WebContainer error:", error);
    });
  };

  useEffect(() => {
    const warmUpWC = async () => {
      if (!isBooted && !wc) {
        await boot();
      } else if (wc) {
        const rawFiles: Record<string, string> = import.meta.glob(
          ["../.templates/**/*", "!../.templates/node_modules/**"],
          {
            eager: true,
            query: "?raw",
            import: "default",
          }
        );
        const files = Object.entries(rawFiles).map(([path, content]) => {
          const _path = path.replace("../.templates/", "");
          return new VirtualFile(_path, content, wc);
        });
        await mountFiles(files);
        await installDependencies();
        await runDevServer();
        setupListeners();
      }
    };

    warmUpWC();
  }, [wc, isBooted]);

  return {
    url,
    status,
    terminal,
    terminalEl,
  };
}
