import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { Utils } from '../../../imports.js';

export default () => {
    const label = Widget.Label({
        className: 'cpu-inner',
        label: '',
        xalign: 0.55,
    });

    const button = Widget.Button({
        className: 'unset no-hover',
        child: label,
        onClicked: () => Utils.execAsync(["missioncenter"])
    });

    const progress = Widget.CircularProgress({
        className: 'cpu',
        child: button,
        startAt: 0,
        rounded: false,
        // inverted: true,
    });

    const cpu = {
      type: "CPU",

      poll: (self) =>
        Utils.execAsync([
          "sh",
          "-c",
          `top -bn1 | rg '%Cpu' | tail -1 | awk '{print 100-$8}'`,
        ])
          .then((val) =>  {
                progress.value = val / 100;
            })
          .catch((err) => print(err)),

      boxpoll: (self) =>
        Utils.execAsync([
          "sh",
          "-c",
          "lscpu --parse=MHZ",
        ])
          .then((val) => {
            const mhz = val.split("\n").slice(4);
            const freq = mhz.reduce((acc, e) => acc + Number(e), 0) / mhz.length;
            self.tooltipText = Math.round(freq) + " MHz";
          })
          .catch((err) => print(err)),
    };

    return Widget.Box({
        className: 'bar-hw-cpu-box',
        children: [progress]
        }).poll(2000,cpu.poll)
          .poll(2000,cpu.boxpoll);
};
