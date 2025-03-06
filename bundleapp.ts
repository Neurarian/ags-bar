import { App, Gdk, Gtk } from "astal/gtk3";
import { monitorFile } from "astal/file";
import Bar from "./widgets/bar/main.tsx";
import OnScreenDisplay from "./widgets/osd/main.tsx";
import Notifications from "./widgets/notifications/main.tsx";
import SystemMenu from "./widgets/system-menu/main.tsx";
import MusicPlayer from "./widgets/music/main.tsx";
import scss from "./style.scss";

function reloadCss() {
  console.log("scss change detected");
  App.apply_css(scss);
}

App.start({
  icons: "./icons",
  css: scss,
  instanceName: "js",
  requestHandler(request, res) {
    print(request);
    res("ok");
  },
  main() {
    monitorFile(`./style`, reloadCss);
    const bars = new Map<Gdk.Monitor, Gtk.Widget>();

    // initialize
    for (const gdkmonitor of App.get_monitors()) {
      bars.set(gdkmonitor, Bar(gdkmonitor));
    }

    App.connect("monitor-added", (_, gdkmonitor) => {
      bars.set(gdkmonitor, Bar(gdkmonitor));
    });

    App.connect("monitor-removed", (_, gdkmonitor) => {
      bars.get(gdkmonitor)?.destroy();
      bars.delete(gdkmonitor);
    });
    Notifications();
    OnScreenDisplay();
    SystemMenu();
    MusicPlayer();
  },
});
