import { Astal } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";
import { bind } from "astal";
import { focusedGdkMonitor } from "../../utils/hyprland.ts";
import { NotificationWidget } from "./modules/Notification.tsx";

export default function Notifications() {
  const notifd = Notifd.get_default();
  const { TOP, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      name="notifications"
      gdkmonitor={focusedGdkMonitor}
      anchor={TOP | RIGHT}
      child={
        <box vertical={true} className="notifications">
          {bind(notifd, "notifications").as((notifications) =>
            notifications.map((n) => (
              <NotificationWidget key={n.id} notification={n} />
            )),
          )}
        </box>
      }
    />
  );
}
