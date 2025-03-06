import { App, Astal } from "astal/gtk3"
import Mpris from "gi://AstalMpris"
import { bind, Variable } from "astal"
import { findPlayer, generateBackground } from "../../utils/mpris"
import { Cover } from "./modules/Cover"
import { Info } from "./modules/Info"

function MusicBox({ player }: { player: Mpris.Player }) {
	return (
		<box className="music window"
			css={bind(player, "cover_art").as(generateBackground)}
		>
			<Cover player={player} />
			<Info player={player} />
		</box>
	)
}

export default function MusicPlayer() {
	const mpris = Mpris.get_default()
	const { TOP } = Astal.WindowAnchor
	const visible = Variable(false);
	return (
		<window
			name="music-player"
			application={App}
			layer={Astal.Layer.OVERLAY}
			anchor={TOP}
			keymode={Astal.Keymode.ON_DEMAND}
			visible={visible()}
		>
			<box>
				{bind(mpris, "players").as(players =>
					players.length > 0 ? <MusicBox player={findPlayer(players)} /> : null
				)}
			</box>

		</window>
	)
}
