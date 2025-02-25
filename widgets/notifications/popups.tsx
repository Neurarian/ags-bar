import { Astal, Gtk, Gdk } from "astal/gtk3";
import Notifd from "gi://AstalNotifd";
import Hyprland from "gi://AstalHyprland";
import { GLib, bind } from "astal";

const TIMEOUT_DELAY = 5000;

const fileExists = (path: string) =>
	GLib.file_test(path, GLib.FileTest.EXISTS)

const isIcon = (icon: string) =>
	!!Astal.Icon.lookup_icon(icon)

function NotificationWidget(props: { notification: Notifd.Notification }) {
	const { notification } = props;
	const { START, CENTER, END } = Gtk.Align
	const actions = notification.actions || [];

	// Track if the notification is being hovered
	let isHovered = false;
	let timeoutId: number | null = null;

	// Setup timeout to auto-dismiss

	const setupTimeout = () => {
		// Clear any existing timeout
		if (timeoutId !== null) {
			GLib.source_remove(timeoutId);
			timeoutId = null;
		}

		// Only set timeout if not being hovered
		if (!isHovered) {
			timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, TIMEOUT_DELAY, () => {
				notification.dismiss();
				timeoutId = null;
				return GLib.SOURCE_REMOVE;
			});
		}
	};

	return <eventbox
		setup={self => {
			// Set initial timeout when widget is created
			setupTimeout();
			self.connect("destroy", () => {
				if (timeoutId !== null) {
					GLib.source_remove(timeoutId);
					timeoutId = null;
				}
			})
			}}
		onHover={() => {
			isHovered = true;
			// Clear timeout when hovering
			if (timeoutId !== null) {
				GLib.source_remove(timeoutId);
				timeoutId = null;
			}
		}}
		onHoverLost={() => {
			isHovered = false;
			// Restart timeout when no longer hovering
			setupTimeout();
		}}
		onClick={(self, event) => {
			try {
				print(notification.body)
				const button = event.button;

				if (button === Gdk.BUTTON_PRIMARY) {
					if (actions.length > 0)
						notification.invoke(actions[0]);
				}
				else if (button === Gdk.BUTTON_MIDDLE) {
					Notifd.get_default().notifications?.forEach(n => n.dismiss());
				}
				else if (button === Gdk.BUTTON_SECONDARY) {
					notification.dismiss();
				}
				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		}}
	>
		<box className={`notification ${notification.urgency}`}>
			<box className="info">
				<box className="icon">
					{notification.image && fileExists(notification.image) && <box
						valign={START}
						css={`background-image: url('${notification.image}')`}
					/>}
					{notification.image && isIcon(notification.image) && <box
						expand={false}
						valign={START}>
						<icon icon={notification.image} expand halign={CENTER} valign={CENTER} />
					</box>}
				</box>
				<box className="text">
					<label className="app-name" label={bind(notification, "app_name")} />
					<label className="title" label={bind(notification, "summary")} />
					{notification.body &&
						<label className="body" label={bind(notification, "body")} />
					}
				</box>
				{actions.length > 0 && <box className="actions">
					{actions.map(action =>
						<button
							className="action-button"
							onClicked={() => notification.invoke(action)}
							label={action}
						/>
					)}
				</box>}
			</box>
		</box>
	</eventbox>;
}

export default function Notifications() {
	const notifd = Notifd.get_default();
	const hypr = Hyprland.get_default();
	const display = Gdk.Display.get_default()!;
	const { TOP, RIGHT } = Astal.WindowAnchor

	// Get the focused monitor from Hyprland and convert to a GDK monitor
	// THIS MAY NOT WORK IF YOU HAVE MONITORS OF THE SAME MODEL
	// I did not find a more elegant solution to this. 
	// On my setup GDK coordinates and hyprland coordinates are flipped,
	// so I cant match by coordinates.
	const focusedGdkMonitor = bind(hypr, "focused-monitor").as(focused => {
		const hyprModel = focused.get_model();
		const nMon = display.get_n_monitors();
		for (let i = 0; i < nMon; i++) {
			const gdkMon = display.get_monitor(i);
			if (gdkMon.get_model() === hyprModel) {
				return gdkMon;
			}
		}
	});

	return <window
		name="notifications"
		gdkmonitor={focusedGdkMonitor}
		anchor={TOP | RIGHT}
		child={
			<box vertical={true} className="notifications">
				{bind(notifd, "notifications").as(notifications =>
					notifications.map(n =>
						<NotificationWidget key={n.id} notification={n} />
					)
				)}
			</box>
		}
	/>;
}
