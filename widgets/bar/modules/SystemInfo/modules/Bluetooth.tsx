import { bind } from "astal";
import Bluetooth from "gi://AstalBluetooth";

export default function Blue() {

    const getBluetoothIcon = (bt) => {
        if (!bt.is_powered) return "bluetooth-disabled-symbolic";
        if (bt.is_connected) return "bluetooth-active-symbolic";
        return "bluetooth-disconnected-symbolic";
    };

    const getBluetoothText = (devs, bt) => {
        if (!bt.is_powered) return "Bluetooth off";

        if (bt.is_connected) {

            for (const dev of devs) {
                if (dev.connected) {
                    let battery_str = "";

                    if (dev.battery_percentage > 0) {
                        battery_str = ` ${dev.battery_percentage}%`;
                    }
                    return `${dev.name} ${battery_str}`;
                }
            }
        }

        return "Bluetooth on";
    };
    const bluetooth = Bluetooth.get_default()
    return <icon
        className="bluetooth module"
        icon={bind(bluetooth, "devices").as(() => getBluetoothIcon(bluetooth))}
        tooltipText={bind(bluetooth, "devices").as(devices =>
            getBluetoothText(devices, bluetooth)
        )}
    />;
}
