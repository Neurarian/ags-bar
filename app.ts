import { App } from "astal/gtk3"
import { monitorFile } from "astal/file"
import { exec } from "astal/process"
import Bar from "./widgets/bar/main.tsx"
import OnScreenDisplay from "./widgets/osd/main.tsx"
import Notifications from "./widgets/notifications/popups.tsx";
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
        App.get_monitors().map(Bar);
        Notifications();
        OnScreenDisplay();
    },
})
