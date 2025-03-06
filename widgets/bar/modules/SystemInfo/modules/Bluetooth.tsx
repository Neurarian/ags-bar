import { bind } from "astal";
import Bluetooth from "gi://AstalBluetooth";
import {
  getBluetoothIcon,
  getBluetoothText,
} from "../../../../../utils/bluetooth.ts";

export default function Blue() {
  const bluetooth = Bluetooth.get_default();
  return (
    <icon
      className="bluetooth module"
      icon={bind(bluetooth, "devices").as(() => getBluetoothIcon(bluetooth))}
      tooltipText={bind(bluetooth, "devices").as((devices) =>
        getBluetoothText(devices, bluetooth),
      )}
    />
  );
}
