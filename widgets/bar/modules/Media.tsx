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

    return <box
        className="Media"
        visible={bind(mpris, "players").as(players => players.length > 0)}
    >
        {bind(mpris, "players").as(players => players[0] && (
            <MusicBox player={players[0]} />
        ))}
    </box>
}
