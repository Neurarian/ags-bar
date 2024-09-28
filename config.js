import { App, Audio, Notifications, Utils } from "./imports.js";
import Bar from "./windows/bar/main.js";
import Music from "./windows/music/main.js";
import NotificationPopup from "./windows/notifications/popups.js";
import Osd from "./windows/osd/main.js";
import SystemMenu from "./windows/system-menu/main.js";
import Gdk from "gi://Gdk";

const scss = App.configDir + "/style.scss";
const css = App.configDir + "/style.css";

Utils.exec(`sass ${scss} ${css}`);

App.connect("config-parsed", () => print("config parsed"));

App.config({
  style: css,
  closeWindowDelay: {
    "system-menu": 200,
  },
});

Notifications.popupTimeout = 5000;
Notifications.forceTimeout = false;
Notifications.cacheActions = true;
Audio.maxStreamVolume = 1;

function reloadCss() {
  console.log("scss change detected");
  Utils.exec(`sass ${scss} ${css}`);
  App.resetCss();
  App.applyCss(css);
}

Utils.monitorFile(`${App.configDir}/style`, reloadCss);

/**
 * @param {import("types/widgets/window.js").Window[]} windows
 */
globalThis.monitorCounter = 0;

function addWindows(windows) {
  windows.forEach((win) => App.addWindow(win));
}
function addMonitorWindows(monitor) {
addWindows(
  [
    Bar(monitor),
  ],
);
  monitorCounter++;
}
Utils.idle(() => {
  addWindows(
  [
    Music(),
    Osd(),
    SystemMenu(),
    NotificationPopup(),
  ],
);
  const display = Gdk.Display.get_default();
  for (let m = 0;  m < display?.get_n_monitors();  m++) {
    const monitor = display?.get_monitor(m);
    addMonitorWindows(monitor);
  }

  display?.connect("monitor-added", (disp, monitor) => {
    addMonitorWindows(monitor);
  });

});

export {};
