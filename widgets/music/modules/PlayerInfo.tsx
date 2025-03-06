import { Astal, Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";
import { bind } from "astal";

export function PlayerInfo({ player }: { player: Mpris.Player }) {
  const { START, END } = Gtk.Align;
  return (
    <box className="player-info" halign={END}>
      <icon
        className="player-icon"
        halign={END}
        tooltipText={bind(player, "identity")}
        icon={bind(player, "entry").as((entry) => {
          if (entry === "spotify") entry = "spotify-client";
          return Astal.Icon.lookup_icon(entry ?? "")
            ? entry
            : "multimedia-player-symbolic";
        })}
      />
    </box>
  );
}
