import Mpris from "gi://AstalMpris";
import { bind } from "astal";

export function Title({ player }: { player: Mpris.Player }) {
  return (
    <scrollable
      vexpand={true}
      heightRequest={12}
      className="title"
      vscroll={"never"}
      hscroll={"automatic"}
    >
      <label
        className="title"
        label={bind(player, "title").as((t) => t || "Nothing playing")}
      />
    </scrollable>
  );
}

export function Artists({ player }: { player: Mpris.Player }) {
  return (
    <scrollable
      className="artists"
      vexpand={true}
      vscroll={"never"}
      hscroll={"automatic"}
    >
      <label
        className="artists"
        label={bind(player, "artist").as((a) => a || "")}
      />
    </scrollable>
  );
}
