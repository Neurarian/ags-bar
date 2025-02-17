import { Astal, Gdk } from "astal/gtk3";
import Tray from "gi://AstalTray";
import { bind } from "astal";

function SysTrayItem({ item }) {
    return <menubutton
        className="tray-item"
        menuModel={bind(item, "menuModel")}
        actionGroup={bind(item, "actionGroup").as((ag) => ["dbusmenu", ag])}
        usePopover={false}
        onButtonReleaseEvent={(self, event) => {
            try {
                if (event.get_button()[1] === Astal.MouseButton.PRIMARY) {
                    item.activate(event.x, event.y);
                }
                if (event.get_button()[1] === Astal.MouseButton.SECONDARY) {
                    self.get_popup()?.popup_at_widget(
                        self,
                        Gdk.Gravity.NORTH,
                        Gdk.Gravity.SOUTH,
                        null
                    );
                }
                return true;
            } catch (error) {
                console.log(error);
            }
        }}
        tooltipMarkup={bind(item, "tooltipMarkup")}>
        <icon gicon={bind(item, "gicon")} />
    </menubutton>;
}

export default function SysTray() {
    const tray = Tray.get_default();

    return <box className="tray module">
        {bind(tray, "items").as(items =>
            items.map(item => <SysTrayItem item={item} />)
        )}
    </box>;
}
