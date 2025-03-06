import { execAsync, bind } from "astal";
import Bluetooth from "gi://AstalBluetooth";
import Network from "gi://AstalNetwork";
import {
  getBluetoothIcon,
  getBluetoothText,
} from "../../../utils/bluetooth.ts";

export const Toggles = () => {
  const network = Network.get_default();
  const bluetooth = Bluetooth.get_default();

  return (
    <box className="toggles" vertical>
      {/* Network Toggle */}
      <box className="toggle">
        <button
          onClick={() => {
            if (network.wifi.enabled) {
              network.wifi.set_enabled(false);
            } else network.wifi.set_enabled(true);
          }}
          className={bind(network, "connectivity").as((c) =>
            c === Network.Connectivity.FULL ? "button" : "button-disabled",
          )}
        >
          <icon icon={bind(network.wifi, "icon_name")} />
        </button>
        <button
          onClick={() =>
            execAsync([
              "sh",
              "-c",
              "XDG_CURRENT_DESKTOP=GNOME gnome-control-center",
            ])
          }
        >
          <label label={bind(network.wifi, "ssid")} />
        </button>
      </box>

      {/* Bluetooth Toggle */}
      <box className="toggle">
        <button
          onClick={() => bluetooth.toggle()}
          className={bind(bluetooth, "is_powered").as((p) =>
            p ? "button" : "button-disabled",
          )}
        >
          <icon
            icon={bind(bluetooth, "devices").as(() =>
              getBluetoothIcon(bluetooth),
            )}
          />
        </button>
        <button onClick={() => execAsync("overskride")}>
          <label
            label={bind(bluetooth, "devices").as(
              (devices) => getBluetoothText(devices, bluetooth) || "Bluetooth",
            )}
          />
        </button>
      </box>
    </box>
  );
};
