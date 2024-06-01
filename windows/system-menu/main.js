import { Widget } from "../../imports.js";
import PopupWindow from "../../utils/popup_window.js";

import Toggles from "./toggles.js";
import Sliders from "./sliders.js";

const SystemMenuBox = () =>
  Widget.Box({
    className: "system-menu",
    vertical: true,

    children: [
      Toggles(),
      Sliders(),
    ],
  });

export default () =>
  PopupWindow({
    anchor: ["top", "right"],
    name: "system-menu",
    child: SystemMenuBox(),
  });
