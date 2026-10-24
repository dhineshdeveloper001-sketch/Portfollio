type PulseCallback = (actIndex: number) => void;

class PulseBus {
  private listeners: Set<PulseCallback> = new Set();
  private lastAct: number = -1;

  public subscribe(cb: PulseCallback): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  public emit(actIndex: number) {
    if (this.lastAct !== actIndex) {
      this.lastAct = actIndex;
      this.listeners.forEach((cb) => {
        try {
          cb(actIndex);
        } catch {
          // ignore
        }
      });
    }
  }

  public fireManual(actIndex: number = 0) {
    this.listeners.forEach((cb) => {
      try {
        cb(actIndex);
      } catch {
        // ignore
      }
    });
  }
}

export const pulseBus = new PulseBus();
