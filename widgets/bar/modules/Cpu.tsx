import { Variable, bind } from "astal";
import { interval } from "astal/time";
import { execAsync } from "astal/process";

export default function Cpu() {
    const cpuValue = Variable(0);
    const cpuFreq = Variable('');

    interval(2000, () => {
        execAsync([
            "sh",
            "-c",
            `top -bn1 | rg '%Cpu' | tail -1 | awk '{print 100-$8}'`
        ])
            .then(val => cpuValue.set(Number(val) / 100))
            .catch(err => console.log(err));
    });

    interval(2000, () => {
        execAsync([
            "sh",
            "-c",
            "lscpu --parse=MHZ"
        ])
            .then(val => {
                const mhz = val.split("\n").slice(4);
                const freq = mhz.reduce((acc, e) => acc + Number(e), 0) / mhz.length;
                cpuFreq.set(`${Math.round(freq)} MHz`)
            })
            .catch(err => console.log(err));
    });

    return <box
        className={"bar-hw-ram-box"}
    >
        <circularprogress
            className="cpu"
            value={bind(cpuValue)}
            startAt={0.25}
            endAt={1.25}
            rounded={false}
            tooltipText={bind(cpuFreq)}
        >
            <button
                className="cpu-inner"
                onClick={async () => {
                    try {
                        await execAsync("missioncenter");
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }}
                xalign={0.3}
                yalign={0.49}
                label=' '
            />
        </circularprogress>
    </box >;
}
