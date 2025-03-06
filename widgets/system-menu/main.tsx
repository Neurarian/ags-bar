import { Astal, App } from "astal/gtk3";
import { Variable } from "astal";
import { Sliders } from "./modules/Sliders.tsx";
import { Toggles } from "./modules/Toggles.tsx";

export default function SystemMenu() {
  const { TOP, RIGHT } = Astal.WindowAnchor;
  const visible = Variable(false);
  return (
    <window
      name="system-menu"
      application={App}
      layer={Astal.Layer.OVERLAY}
      anchor={TOP | RIGHT}
      keymode={Astal.Keymode.ON_DEMAND}
      visible={visible()}
    >
      <box className="system-menu" vertical>
        <Toggles />
        <Sliders />
      </box>
    </window>
  );
}
