import Mpris from "gi://AstalMpris"
import { bind } from "astal"

export function Cover({ player }: { player: Mpris.Player }) {
	return (
		<box className="cover"
			css={bind(player, "cover_art").as(cover =>
				`background-image: url('${cover ?? ""}')`)} />
	)
}
