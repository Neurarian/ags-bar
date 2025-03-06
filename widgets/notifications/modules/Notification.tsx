import { bind } from "astal";
import { Astal, Gtk } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";
import { NotificationIcon } from "./Icon.tsx";
import { time, urgency, createTimeoutManager } from "../../../utils/notifd.ts";

export function NotificationWidget(props: {
  notification: Notifd.Notification;
}) {
  const { START, CENTER, END } = Gtk.Align;
  const { notification } = props;
  const actions = notification.actions || [];
  const TIMEOUT_DELAY = 3000;
  const timeoutManager = createTimeoutManager(
    () => notification.dismiss(),
    TIMEOUT_DELAY,
  );

  return (
    <eventbox
      setup={(self) => {
        timeoutManager.setupTimeout();
        self.connect("destroy", () => timeoutManager.cleanup());
      }}
      onHover={timeoutManager.handleHover}
      onHoverLost={timeoutManager.handleHoverLost}
      onClick={(self, event) => {
        try {
          const button = event.button;

          if (button === Astal.MouseButton.PRIMARY) {
            if (actions.length > 0) notification.invoke(actions[0]);
          } else if (button === Astal.MouseButton.MIDDLE) {
            Notifd.get_default().notifications?.forEach((n) => n.dismiss());
          } else if (button === Astal.MouseButton.SECONDARY) {
            notification.dismiss();
          }
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }}
    >
      <box vertical className={`notification ${urgency(notification)}`}>
        <box className="header">
          <label
            className="app-name"
            halign={CENTER}
            label={bind(notification, "app_name")}
          />
          <label
            className="time"
            hexpand
            halign={END}
            label={time(notification.time)}
          />
        </box>
        <Gtk.Separator visible />
        <box horizontal className="content">
          <box
            horizontal
            className="thumb"
            visible={Boolean(NotificationIcon(notification))}
            halign={CENTER}
            valign={CENTER}
            vexpand={true}
          >
            {NotificationIcon(notification)}
          </box>
          <box
            vertical
            className="text-content"
            hexpand={true}
            halign={CENTER}
            valign={CENTER}
          >
            <label
              className="title"
              valign={CENTER}
              wrap={false}
              justification="left"
              label={bind(notification, "summary")}
            />
            {notification.body && (
              <label
                className="body"
                valign={CENTER}
                wrap={true}
                maxWidthChars={50}
                label={bind(notification, "body")}
              />
            )}
          </box>
        </box>
        {actions.length > 0 && (
          <box className="actions">
            {actions.map((label, action) => (
              <button
                hexpand
                className="action-button"
                onClicked={() => notification.invoke(action)}
              >
                <label label={label} halign={CENTER} hexpand />
              </button>
            ))}
          </box>
        )}
      </box>
    </eventbox>
  );
}
