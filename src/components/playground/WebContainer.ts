import { WebContainer } from "@webcontainer/api";

class PlaygroundWebContainer {
  public isBooting: boolean;
  public isReady: boolean;
  public hasError: boolean;

  constructor(public webContainer: WebContainer) {
    this.isBooting = false;
    this.isReady = false;
    this.hasError = false;
  }

  boot = async () => {
    try {
      this.isBooting = true;
      this.webContainer = await WebContainer.boot();
      this.isReady = true;
      this.isBooting = false;
    } catch {
      this.hasError = true;
    }
  };
}

export default PlaygroundWebContainer;
