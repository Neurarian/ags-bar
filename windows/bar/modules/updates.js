import { Utils, Widget } from "../../../imports.js";

export default () =>
  Widget.EventBox({
    child: Widget.Label({ className: "updates module" })
      .poll(
        10000,
        (self) =>
          Utils.execAsync(["bash", "-c", `~/scripts/updates.sh | awk '{print $2}'`,

    ]).then((r) =>
            self.tooltipText = r
          ),
      ),
  });
