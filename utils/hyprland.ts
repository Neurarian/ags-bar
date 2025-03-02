import { Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import { bind } from "astal";

export const focusedGdkMonitor = bind(Hyprland.get_default(), "focused-monitor").as(focused => {
    const display = Gdk.Display.get_default()!;
    const hyprModel = focused.get_model();
    const nMon = display.get_n_monitors();
    for (let i = 0; i < nMon; i++) {
        const gdkMon = display.get_monitor(i);
        if (gdkMon.get_model() === hyprModel) {
            return gdkMon;
        }
    }
});
