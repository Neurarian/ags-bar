import { App, Gdk, Gtk } from "astal/gtk3"
import { monitorFile } from "astal/file"
import { exec } from "astal/process"
import Bar from "./widgets/bar/main.tsx"
import OnScreenDisplay from "./widgets/osd/main.tsx"
import Notifications from "./widgets/notifications/popups.tsx";
import SystemMenu from "./widgets/system-menu/main.tsx"
import MusicPlayer from "./widgets/music/main.tsx"
const css = "./style.css";
const scss = "./style.scss";

function reloadCss() {
    console.log("scss change detected");
    exec(`sass ${scss} ${css}`);
    App.apply_css(css);
}

App.start({
    icons: "./icons",
    css: css,
    instanceName: "js",
    requestHandler(request, res) {
        print(request)
        res("ok")
    },
    main() {
        exec(`sass ${scss} ${css}`);
        monitorFile(`./style`, reloadCss);
        const bars = new Map<Gdk.Monitor, Gtk.Widget>()

        // initialize
        for (const gdkmonitor of App.get_monitors()) {
            bars.set(gdkmonitor, Bar(gdkmonitor))
        }

        App.connect("monitor-added", (_, gdkmonitor) => {
            bars.set(gdkmonitor, Bar(gdkmonitor))
        })

        App.connect("monitor-removed", (_, gdkmonitor) => {
            bars.get(gdkmonitor)?.destroy()
            bars.delete(gdkmonitor)
        })
        Notifications();
        OnScreenDisplay();
        SystemMenu();
        MusicPlayer();
},
})
