
import { Utils, Widget, Icons } from "../../../imports.js";

export default () =>
  Widget.EventBox({
    // Toggle the reveal state of the Revealer on hover in and out
    onHover: (self) => {
      self.get_child().children[1].revealChild = true;
    },
    onHoverLost: (self) => {
      self.get_child().children[1].revealChild = false;
    },
    child: Widget.Box({
      children: [
        Widget.Label({
          className: "date-module",
          setup: (self) =>
            self.poll(1000, () =>
              Utils.execAsync(["date", "+%H 󰇙 %M"]).then(
                (r) => (self.label = r),
              ),
            ),
        }),
        // Reveal Power Button on hover
        Widget.Revealer({
          revealChild: false,
          transitionDuration: 300,
          transition: "slide_right",
          child: Widget.Button({
            className: "power-button",
            onClicked: () => Utils.execAsync(["shutdown --poweroff"]),
            // Comment above line and uncomment below to use wlogout instead
            // onClicked: () => Utils.execAsync(["wlogout"]),
            child: Widget.Icon({
              icon: Icons.powerButton,
            }),
          }),
        }),
      ],
    }),
  });
