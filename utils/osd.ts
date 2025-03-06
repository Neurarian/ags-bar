import Variable from "astal/variable";
import { timeout } from "astal/time";

type OSDParams = {
  visible: Variable<boolean>;
  value: Variable<number>;
  label: Variable<string>;
  icon: Variable<string>;
  showProgress: Variable<boolean>;
  timeoutMs?: number;
};

export default class OSDManager {
  private count = 0;
  private timeoutMs: number;

  constructor(private params: OSDParams) {
    this.timeoutMs = params.timeoutMs || 2000;
  }

  show(value: number, label: string, icon: string, progress = true) {
    this.params.visible.set(true);
    this.params.value.set(value);
    this.params.label.set(label);
    this.params.icon.set(icon);
    this.params.showProgress.set(progress);
    this.count++;

    timeout(this.timeoutMs, () => {
      this.count--;
      if (this.count === 0) this.params.visible.set(false);
    });
  }

  reset() {
    this.count = 0;
    this.params.visible.set(false);
  }
}
