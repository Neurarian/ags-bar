import Net from "./modules/Net.tsx";
import Blue from "./modules/Bluetooth.tsx";
import { App } from "astal/gtk3";

export default function SystemInfo() {
    return <eventbox
        className="system-menu-toggler"
        onClick={() => App.toggleWindow("system-menu")}
        setup={self => {
            App.connect("window-toggled", (app, window, visible) => {
                if (window === "system-menu") {
                    self.toggleClassName("active", visible);
                }
            });
        }}
    >
        <box>
            <Net />
            <Blue />
        </box>
    </eventbox>;
}
