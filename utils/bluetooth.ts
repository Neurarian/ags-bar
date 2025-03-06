export const getBluetoothIcon = (bt) => {
  if (!bt.is_powered) return "bluetooth-disabled-symbolic";
  if (bt.is_connected) return "bluetooth-active-symbolic";
  return "bluetooth-disconnected-symbolic";
};

export const getBluetoothText = (devs, bt) => {
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
