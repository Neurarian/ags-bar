import { Gtk } from "astal/gtk3";
import { execAsync, bind } from "astal";
import Wp from "gi://AstalWp";

export const Sliders = () => {
  const speaker = Wp.get_default()!.audio.defaultSpeaker;

  return (
    <box className="sliders" vertical>
      <box className="volume">
        <button
          onClick={() => execAsync("pwvucontrol")}
          child={<icon icon={bind(speaker, "volumeIcon")} />}
        />
        <slider
          value={bind(speaker, "volume")}
          onDragged={({ value }) => (speaker.volume = value)}
          valign={Gtk.Align.CENTER}
          hexpand={true}
        />
      </box>
    </box>
  );
};
