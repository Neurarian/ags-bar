import { App } from "astal/gtk3"
import Mpris from "gi://AstalMpris";
import { bind } from "astal";

function Cover({ player }) {
    return <box
        className="cover"
        css={bind(player, "coverArt").as(cover =>
            `background-image: url('${cover}');`
        )}
    />;
}

function Title({ player }) {
    return <label
        className="title module"
        label={bind(player, "metadata").as(() =>
            player.title && `${player.artist} - ${player.title}`
        )}
    />;
}

function MusicBox({ player }) {
    return <box>
        <Cover player={player} />
        <Title player={player} />
    </box>;
}

export default function Media() {
    const mpris = Mpris.get_default()

    return <eventbox
        className="Media"
        onClick={() => App.toggle_window("music-player")}
        visible={bind(mpris, "players").as(players => players.length > 0)}
    >
        {bind(mpris, "players").as(players => players[0] && (
            <MusicBox player={players[0]} />
        ))}
    </eventbox>
}
