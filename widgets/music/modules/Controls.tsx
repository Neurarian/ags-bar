
import Mpris from "gi://AstalMpris"
import { bind } from "astal"
import { mprisStateIcon } from "../../../utils/mpris"

export function Controls({ player }: { player: Mpris.Player }) {
	return (
		<centerbox className="controls" vexpand={true}>
			<button onClick={() => player.previous()}>
				<icon icon="media-skip-backward-symbolic" />
			</button>
			<button onClick={() => player.play_pause()}>
				<icon icon={bind(player, "playback_status").as(mprisStateIcon)} />
			</button>
			<button onClick={() => player.next()}>
				<icon icon="media-skip-forward-symbolic" />
			</button>
		</centerbox>
	)
}
