import Mpris from "gi://AstalMpris"
import { PlayerInfo } from "./PlayerInfo"
import { Title, Artists } from "./TitleArtists"
import { Controls } from "./Controls"
import { TimeInfo } from "./TimeInfo"
import CavaDraw from "./Cava.tsx"

export function Info({ player }: { player: Mpris.Player }) {
  return (
    <box vertical className="info">
      <PlayerInfo player={player} />
      <Title player={player} />
      <Artists player={player} />
      <Controls player={player} />
      <TimeInfo player={player} />
      <CavaDraw vexpand={true}/>
    </box>
  )
}

