import Net from "./modules/Net.tsx";
import Blue from "./modules/Bluetooth.tsx";
import { App } from "astal/gtk3";

export default function SystemInfo() {
  return (
    <eventbox
      className="system-menu-toggler"
      onClick={() => App.toggle_window("system-menu")}
    >
      <box>
        <Net />
        <Blue />
      </box>
    </eventbox>
  );
}
