import Hyprland from "gi://AstalHyprland";
import { bind } from "astal";

// May implement this later
function FocusedClient() {
  const hypr = Hyprland.get_default();
  const focused = bind(hypr, "focusedClient");

  return (
    <box className="Focused" visible={focused.as(Boolean)}>
      {focused.as(
        (client) =>
          client && <label label={bind(client, "title").as(String)} />,
      )}
    </box>
  );
}

export default function Workspaces() {
  const hypr = Hyprland.get_default();

  return (
    <box className="Workspaces">
      {bind(hypr, "workspaces").as((wss) => {
        const activeWorkspaces = wss
          .filter((ws) => !(ws.id >= -99 && ws.id <= -2))
          .sort((a, b) => a.id - b.id);

        return [...Array(10)].map((_, i) => {
          const id = i + 1;
          const ws = activeWorkspaces.find((w) => w.id === id);
          return (
            <button
              visible={activeWorkspaces[activeWorkspaces.length - 1]?.id >= id}
              className={bind(hypr, "focusedWorkspace").as(
                (fw) =>
                  `${ws === fw && "focused"}
                         ${ws !== undefined && `monitor${ws.monitor.id}`}`,
              )}
              onClicked={() => hypr.message(`dispatch workspace ${id}`)}
            >
              {}
            </button>
          );
        });
      })}
    </box>
  );
}
