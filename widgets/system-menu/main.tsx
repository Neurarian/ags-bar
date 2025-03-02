// SystemMenu.tsx
import { Astal, App, Gtk, Gdk } from "astal/gtk3";
import { Variable, execAsync, bind } from "astal";
import Bluetooth from "gi://AstalBluetooth";
import Network from "gi://AstalNetwork";
import Wp from "gi://AstalWp";
import { getBluetoothIcon, getBluetoothText } from "../../utils/bluetooth.ts";

const Sliders = () => {
	const speaker = Wp.get_default()!.audio.defaultSpeaker;

	return (
		<box className="sliders" vertical>
			<box className="volume">
				<button
					onClick={() => execAsync("pwvucontrol")}
					child={
						<icon
							icon={bind(speaker, "volumeIcon")}
						/>
					}
				/>
				<slider
					value={bind(speaker, "volume")}
					onDragged={({ value }) => speaker.volume = value}
					valign={Gtk.Align.CENTER}
					hexpand={true}
				/>
			</box>
		</box>
	);
};

const Toggles = () => {
	const network = Network.get_default();
	const bluetooth = Bluetooth.get_default();

	return (
		<box className="toggles" vertical>
			{/* Network Toggle */}
			<box className="toggle">
				<button
					onClick={() => {
						if (network.wifi.enabled) {
							network.wifi.set_enabled(false)
						}
						else
							network.wifi.set_enabled(true)
					}}
					className={bind(network, "connectivity").as(c =>
						c === Network.Connectivity.FULL ? "button" : "button-disabled")}>
					<icon icon={bind(network.wifi, "icon_name")} />
				</button>
				<button
					onClick={() => execAsync([
						"sh",
						"-c",
						"XDG_CURRENT_DESKTOP=GNOME gnome-control-center",
					])}>
					<label label={bind(network.wifi, "ssid")} />
				</button>
			</box>

			{/* Bluetooth Toggle */}
			<box className="toggle">
				<button
					onClick={() => bluetooth.toggle()}

					className={bind(bluetooth, "is_powered").as(p =>
						p ? "button" : "button-disabled")}>
					<icon icon={bind(bluetooth, "devices").as(() => getBluetoothIcon(bluetooth))} />
				</button>
				<button
					onClick={() => execAsync("overskride")}>
					<label label={bind(bluetooth, "devices").as((devices) =>
						getBluetoothText(devices, bluetooth) || "Bluetooth")}
					/>
				</button>
			</box>
		</box>
	);
};

export default function SystemMenu() {
	const { TOP, RIGHT } = Astal.WindowAnchor
	const visible = Variable(false);
	return (
		<window
			name="system-menu"
			application={App}
			layer={Astal.Layer.OVERLAY}
			anchor={TOP | RIGHT}
			keymode={Astal.Keymode.ON_DEMAND}
			visible={visible()}
		>
			<box className="system-menu" vertical>
				<Toggles />
				<Sliders />
			</box>
		</window>
	);
}
