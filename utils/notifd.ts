import Notifd from "gi://AstalNotifd";
import { GLib } from "astal";
import { Astal } from "astal/gtk3";

type TimeoutManager = {
  setupTimeout: () => void;
  clearTimeout: () => void;
  handleHover: () => void;
  handleHoverLost: () => void;
  cleanup: () => void;
};

export const createTimeoutManager = (
  dismissCallback: () => void,
  timeoutDelay: number,
): TimeoutManager => {
  let isHovered = false;
  let timeoutId: number | null = null;

  const clearTimeout = () => {
    if (timeoutId !== null) {
      GLib.source_remove(timeoutId);
      timeoutId = null;
    }
  };

  const setupTimeout = () => {
    clearTimeout();

    if (!isHovered) {
      timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, timeoutDelay, () => {
        dismissCallback();
        timeoutId = null;
        return GLib.SOURCE_REMOVE;
      });
    }
  };

  return {
    setupTimeout,
    clearTimeout,
    handleHover: () => {
      isHovered = true;
      clearTimeout();
    },
    handleHoverLost: () => {
      isHovered = false;
      setupTimeout();
    },
    cleanup: clearTimeout,
  };
};

export const time = (time: number, format = "%H:%M") =>
  GLib.DateTime.new_from_unix_local(time).format(format)!;

export const urgency = (notification: Notifd.Notification) => {
  const { LOW, NORMAL, CRITICAL } = Notifd.Urgency;

  switch (notification.urgency) {
    case LOW:
      return "low";
    case CRITICAL:
      return "critical";
    case NORMAL:
    default:
      return "normal";
  }
};

export const isIcon = (icon: string) => !!Astal.Icon.lookup_icon(icon);

export const fileExists = (path: string) =>
  GLib.file_test(path, GLib.FileTest.EXISTS);
