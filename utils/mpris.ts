import Mpris from "gi://AstalMpris"
import GLib from "gi://GLib"
import { exec } from "astal/process"

export function findPlayer(players: Mpris.Player[]): Mpris.Player | undefined {
    // try to get the first active player
    const activePlayer = players.find(p => p.playback_status === Mpris.PlaybackStatus.PLAYING)
    if (activePlayer) return activePlayer

    // otherwise get the first "working" player
    return players.find(p => p.title !== undefined)
}

export function mprisStateIcon(status: Mpris.PlaybackStatus): string {
    return status === Mpris.PlaybackStatus.PLAYING
        ? "media-playback-pause-symbolic"
        : "media-playback-start-symbolic"
}

const MEDIA_CACHE_PATH = GLib.get_user_cache_dir() + "/media"
const blurredPath = MEDIA_CACHE_PATH + "/blurred"

export function generateBackground(coverPath: string | null): string {
    if (!coverPath) return ""

    const makeBg = (bg: string) => `background: center/cover url('${bg}')`

    const blurred = blurredPath + coverPath.substring(MEDIA_CACHE_PATH.length)

    if (GLib.file_test(blurred, GLib.FileTest.EXISTS)) {
        return makeBg(blurred)
    }

    GLib.mkdir_with_parents(blurredPath, 0o755)
    exec(`magick ${coverPath} -blur 0x22 ${blurred}`)

    return makeBg(blurred)
}

export function lengthStr(length: number) {
  const min = Math.floor(length / 60).toString();
  const sec = Math.floor(length % 60).toString().padStart(2, "0");
  return min + ":" + sec;
}
