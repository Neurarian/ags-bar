import { App, Astal, Gtk } from "astal/gtk3";
import { timeout } from "astal/time";
import Variable from "astal/variable";
import Wp from "gi://AstalWp";
import Brightness from "./brightness";
import Bluetooth from "gi://AstalBluetooth"
import { focusedGdkMonitor } from "utils/hyprland";

function OnScreenProgress({ visible }: { visible: Variable<boolean> }) {
	// Audio connections
	const speaker = Wp.get_default()!.get_default_speaker()
	const microphone = Wp.get_default()!.get_default_microphone()

	// Brightness
	let brightness: Brightness | null = null;
	try {
		brightness = Brightness.get_default();
	} catch (e) {
		console.error("Brightness controls unavailable. If you're on desktop this is not an issue:", e instanceof Error ? e.message : String(e));
	}

	// BLuetooth
	const bluetooth = Bluetooth.get_default();


	const value = Variable(0)
	const iconName = Variable("")
	const labelText = Variable("")
	const showProgress = Variable(true)

	let count = 0

	// Unified show method
	const showOSD = (v: number, label: string, icon: string, progress = true) => {
		visible.set(true)
		value.set(v)
		labelText.set(label)
		iconName.set(icon)
		showProgress.set(progress)
		count++

		timeout(2000, () => {
			count--
			if (count === 0) visible.set(false)
		});
	};

	return (
		<revealer
			transitionType={Gtk.RevealerTransitionType.CROSSFADE}
			transitionDuration={200}
			revealChild={visible()}
			setup={(self) => {
				if (brightness) {
					self.hook(brightness, "notify::screen", () =>
						showOSD(brightness.screen, "", "display-brightness-symbolic"),
					)
				}

				if (speaker) {
					self.hook(speaker, "notify::volume", () =>
						showOSD(speaker.volume, speaker.description || "", speaker.volumeIcon),
					)
				}
				if (microphone) {
					self.hook(microphone, "notify::volume", () =>
						showOSD(microphone.volume, microphone.description || "", microphone.volumeIcon),
					)
				}
				if (bluetooth) {
					self.hook(bluetooth, "notify::devices", () => {
						bluetooth.devices.forEach(device => {
							// Monitor connection state changes for new devices
							self.hook(device, "notify::connected", () => {
								if (device.connected) {
									showOSD(
										0,
										`Connected: ${device.name || device.address}`,
										device.icon,
										false
									);
								}
								else {
									showOSD(
										0,
										`Disconnected: ${device.name || device.address}`,
										device.icon,
										false
									);

								}
							});
						});
					});
				}
			}
			}
		>
			<box className="osd" horizontal>
				<icon
					icon={iconName()}
				/>

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
	)
}

export default function OnScreenDisplay() {
	const visible = Variable(false)
	return (
		<window
			name="osd"
			layer={Astal.Layer.OVERLAY}
			gdkmonitor={focusedGdkMonitor}
			anchor={Astal.WindowAnchor.BOTTOM}
			application={App}
			keymode={Astal.Keymode.ON_DEMAND}
			namespace="osd"
			setup={(self) => {
				focusedGdkMonitor.subscribe(() => {
					self.set_click_through(true);
				});
			}}
			clickThrough
		>
			<OnScreenProgress visible={visible} />
		</window>

	)
}
