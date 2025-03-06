import { Gtk } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";
import { fileExists, isIcon } from "../../../utils/notifd.ts";

export function NotificationIcon(notification: Notifd.Notification) {
  if (notification.image && fileExists(notification.image)) {
    return (
      <box
        css={`
          background-image: url("${notification.image} background-size: contain; background-repeat: no-repeat; background-position: center;");
        `}
      />
    );
  }
  if (notification.image && isIcon(notification.image)) {
    return (
      <box expand={false} valign={Gtk.Align.CENTER}>
        <icon icon={notification.image} />
      </box>
    );
  }
  if (notification.appIcon || notification.desktopEntry) {
    return (
      <box expand={false} valign={Gtk.Align.CENTER}>
        <icon icon={notification.appIcon || notification.desktopEntry} />
      </box>
    );
  }
  return null;
}
