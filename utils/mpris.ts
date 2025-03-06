import Mpris from "gi://AstalMpris";
import GLib from "gi://GLib";
import { exec } from "astal/process";

export function findPlayer(players: Mpris.Player[]): Mpris.Player | undefined {
  // try to get the first active player
  const activePlayer = players.find(
    (p) => p.playback_status === Mpris.PlaybackStatus.PLAYING,
  );
  if (activePlayer) return activePlayer;

  // otherwise get the first "working" player
  return players.find((p) => p.title !== undefined);
}

export function mprisStateIcon(status: Mpris.PlaybackStatus): string {
  return status === Mpris.PlaybackStatus.PLAYING
    ? "media-playback-pause-symbolic"
    : "media-playback-start-symbolic";
}

const MEDIA_CACHE_PATH = GLib.get_user_cache_dir() + "/media";
const blurredPath = MEDIA_CACHE_PATH + "/blurred";

export function generateBackground(coverpath: string | null): string {
  if (!coverpath) return "";

  const makebg = (bg: string) => `background: center/cover url('${bg}')`;

  // Construct blurred path using path.join for safe concatenation
  const relativePath = coverpath.substring(MEDIA_CACHE_PATH.length + 1); // +1 to skip slash
  const blurred = GLib.build_filenamev([blurredPath, relativePath]);

  // Create parent directory for blurred file
  const blurredDir = GLib.path_get_dirname(blurred);
  if (!GLib.file_test(blurredDir, GLib.FileTest.EXISTS)) {
    GLib.mkdir_with_parents(blurredDir, 0o755);
  }

  try {
    exec(`magick "${coverpath}" -blur 0x22 "${blurred}"`);
  } catch (e) {
    console.error("Background generation failed:", e);
    return ""; // Fallback
  }

  return makebg(blurred);
}

export function lengthStr(length: number) {
  const min = Math.floor(length / 60).toString();
  const sec = Math.floor(length % 60)
    .toString()
    .padStart(2, "0");
  return min + ":" + sec;
}
