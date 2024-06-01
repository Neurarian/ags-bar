import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { Utils } from '../../../imports.js';

export const RamWidget = () => {
    const label = Widget.Label({
        className: 'ram-inner',
        label: '',
    });

    const button = Widget.Button({
        className: 'unset no-hover',
        child: label,
        onClicked: () => Utils.execAsync(["missioncenter"])
    });

    const progress = Widget.CircularProgress({
        className: 'ram',
        child: button,
        startAt: 0,
        rounded: false,
        // inverted: true,
    });

    const ram = {
      type: "MEM",
      poll: (self) =>
        Utils.execAsync([
          "sh",
          "-c",
          `free | tail -2 | head -1 | awk '{print $3/$2*100}'`,
        ])
          .then((val) =>  {
                progress.value = val / 100;
            })
          .catch((err) => print(err)),

      boxpoll: (self) =>
        Utils.execAsync([
          "sh",
          "-c",
          "free --si -h | tail -2 | head -1 | awk '{print $3}'",
        ])
          .then((val) => self.tooltipText = val)
          .catch((err) => print(err)),
    };

        return Widget.Box({
        className: 'bar-hw-ram-box',
        children: [progress]
        }).poll(2000,ram.poll)
          .poll(2000,ram.boxpoll);
};
