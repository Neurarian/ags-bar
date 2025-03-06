import { Gtk } from "astal/gtk3";
import { execAsync } from "astal/process";
import { interval } from "astal/time";
import { Variable, bind } from "astal";

export default function Time() {
  const time = Variable("");
  const revealPower = Variable(false);

  interval(1000, () => {
    execAsync(["date", "+%H 󰇙 %M"])
      .then((val) => time.set(val.trim()))
      .catch(console.error);
  });

  return (
    <eventbox
      onHover={() => revealPower.set(true)}
      onHoverLost={() => revealPower.set(false)}
    >
      <box>
        <label className="date" label={bind(time)} />
        <revealer
          transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
          transitionDuration={300}
          revealChild={bind(revealPower)}
        >
          <button
            className="power-button"
            onClicked={() =>
              execAsync(["sh", "-c", "systemctl poweroff || loginctl poweroff"])
            }
          >
            <icon icon="system-shutdown-symbolic" />
          </button>
        </revealer>
      </box>
    </eventbox>
  );
}
