import { Gtk } from "astal/gtk3";
import Variable from "astal/variable";
import Wp from "gi://AstalWp";
import Brightness from "../../../utils/brightness";
import Bluetooth from "gi://AstalBluetooth";
import OSDManager from "../../../utils/osd.ts";

export default function OnScreenProgress({
  visible,
}: {
  visible: Variable<boolean>;
}) {
  // Audio connections
  const speaker = Wp.get_default()!.get_default_speaker();
  const microphone = Wp.get_default()!.get_default_microphone();

  // Brightness
  let brightness: Brightness | null = null;
  try {
    brightness = Brightness.get_default();
  } catch (e) {
    console.log(
      "Brightness controls unavailable. If you're on desktop this is not an issue.",
    );
  }

  // Bluetooth
  const bluetooth = Bluetooth.get_default();

  const value = Variable(0);
  const labelText = Variable("");
  const iconName = Variable("");
  const showProgress = Variable(true);

  const osd = new OSDManager({
    visible,
    value,
    label: labelText,
    icon: iconName,
    showProgress,
  });

  return (
    <revealer
      transitionType={Gtk.RevealerTransitionType.CROSSFADE}
      transitionDuration={200}
      revealChild={visible()}
      setup={(self) => {
        if (brightness) {
          self.hook(brightness, "notify::screen", () =>
            osd.show(brightness.screen, "", "display-brightness-symbolic"),
          );
        }

        if (speaker) {
          self.hook(speaker, "notify::volume", () =>
            osd.show(
              speaker.volume,
              speaker.description || "",
              speaker.volumeIcon,
            ),
          );
        }
        if (microphone) {
          self.hook(microphone, "notify::volume", () =>
            osd.show(
              microphone.volume,
              microphone.description || "",
              microphone.volumeIcon,
            ),
          );
        }
        if (bluetooth) {
          self.hook(bluetooth, "notify::devices", () => {
            bluetooth.devices.forEach((device) => {
              // Monitor connection state changes for new devices
              self.hook(device, "notify::connected", () => {
                if (device.connected) {
                  osd.show(
                    0,
                    `Connected: ${device.name || device.address}`,
                    device.icon,
                    false,
                  );
                } else {
                  osd.show(
                    0,
                    `Disconnected: ${device.name || device.address}`,
                    device.icon,
                    false,
                  );
                }
              });
            });
          });
        }
      }}
    >
      <box className="osd" horizontal>
        <icon icon={iconName()} />

        <box vertical>
          <label
            label={labelText()}
            maxWidthChars={24}
            widthRequest={250}
            truncate={"end"}
          />

          <levelbar
            valign={Gtk.Align.CENTER}
            value={value()}
            visible={showProgress()}
          />
        </box>
      </box>
    </revealer>
  );
}
