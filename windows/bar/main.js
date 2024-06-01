import { App, Widget } from "../../imports.js";
import Bluetooth from "./modules/bluetooth.js";
import Date from "./modules/date.js";
import Music from "./modules/music.js";
import Updates from "./modules/updates.js";
import Net from "./modules/net.js";
import Tray from "./modules/tray.js";
import Workspaces from "./modules/workspaces.js";
import Gtk from "gi://Gtk?version=3.0";
import CpuWidget from "./modules/cpu.js";
import RamWidget from "./modules/ram.js";
import Separator from "./modules/separator.js";


const SystemInfo = () =>
  Widget.EventBox({
    className: "system-menu-toggler",
    onPrimaryClick: () => App.toggleWindow("system-menu"),

    child: Widget.Box({
      children: [
        Net(),
        Bluetooth(),
      ],
    }),
  })
    .hook(
      App,
      (self, window, visible) => {
        if (window === "system-menu") {
          self.toggleClassName("active", visible);
        }
      },
    );

const Start = () =>
  Widget.Box({
    hexpand: true,
    hpack: "start",
    children: [
      Workspaces(),
      // Indicators
    ],
  });

const Center = () =>
  Widget.Box({
    children: [
      Music(),
    ],
  });

const End = () =>
  Widget.Box({
    hexpand: true,
    hpack: "end",

    children: [
      Tray(),
      Separator(),
      CpuWidget(),
      RamWidget(),
      Separator(),
      SystemInfo(),
      Separator(),
      Date(),
    ],
  });

const Bar = (gdkmonitor) =>
  Widget.Window({
    gdkmonitor,
    name: `bar${monitorCounter}`,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",

    child: Widget.CenterBox({
      className: "bar",

      startWidget: Start(),
      centerWidget: Center(),
      endWidget: End(),
    }),
  });

export default Bar;
