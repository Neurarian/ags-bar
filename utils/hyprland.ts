import { Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import { bind } from "astal";

/* Get the focused monitor from Hyprland and convert to a GDK monitor
THIS MAY NOT WORK IF YOU HAVE MONITORS OF THE SAME MODEL
I did not find a more elegant solution to this. 
On my setup GDK coordinates and hyprland coordinates are flipped,
so I cant match by coordinates. */

export const focusedGdkMonitor = bind(
  Hyprland.get_default(),
  "focused-monitor",
).as((focused) => {
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
