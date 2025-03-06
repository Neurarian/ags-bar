import { App, Astal } from "astal/gtk3";
import Variable from "astal/variable";
import { focusedGdkMonitor } from "utils/hyprland";
import OnScreenProgress from "./modules/Progress.tsx";

export default function OnScreenDisplay() {
  const visible = Variable(false);
  return (
    <window
      name="osd"
      layer={Astal.Layer.OVERLAY}
      gdkmonitor={focusedGdkMonitor}
      anchor={Astal.WindowAnchor.BOTTOM}
      application={App}
      keymode={Astal.Keymode.ON_DEMAND}
      namespace="osd"
      setup={(self) => {
        focusedGdkMonitor.subscribe(() => {
          self.set_click_through(true);
        });
      }}
      clickThrough
    >
      <OnScreenProgress visible={visible} />
    </window>
  );
}
