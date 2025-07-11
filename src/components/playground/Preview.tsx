import { useEffect, useRef } from "react";
import usePlayground from "src/hooks/usePlayground";
import eventEmitter from "src/structures/EventEmitter";

function PlaygroundPreview() {
  const { url: baseUrl } = usePlayground();
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onUpdateUrl = (_url: string) => {
      const url = baseUrl!.concat(_url);
      ref.current!.src = url;
    };

    eventEmitter.on("playground:updateUrl", onUpdateUrl);

    return () => {
      eventEmitter.off("playground:updateUrl", onUpdateUrl);
    };
  }, [baseUrl]);

  if (!baseUrl) return null;

  return <iframe ref={ref} src={baseUrl} width="100%" height="100%" />;
}

export default PlaygroundPreview;
