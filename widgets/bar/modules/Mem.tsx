import { Variable, bind } from "astal";
import { interval } from "astal/time";
import { execAsync } from "astal/process";

export default function Mem() {
    const ramValue = Variable(0);
    const ramMem = Variable('');

    interval(2000, () => {
        execAsync([
            "sh",
            "-c",
            `free | tail -2 | head -1 | awk '{print $3/$2*100}'`,
        ])
            .then(val => ramValue.set(Number(val) / 100))
            .catch(err => console.log(err));
    });

    interval(2000, () => {
        execAsync([
            "sh",
            "-c",
            "free --si -h | tail -2 | head -1 | awk '{print $3}'",
        ])
            .then(val => {
                ramMem.set(val)
            })
            .catch(err => console.log(err));
    });

    return <box
        className={"bar-hw-ram-box"}
    >
        <circularprogress
            className="ram"
            value={bind(ramValue)}
            startAt={0.25}
            endAt={1.25}
            rounded={false}
            tooltipText={bind(ramMem)}
        >
            <button
                className="ram-inner"
                onClick={async () => {
                    try {
                        await execAsync("missioncenter");
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }}
                xalign={0.7}
                yalign={0.49}
                label={'  '}
            />
        </circularprogress>
    </box>;
}
