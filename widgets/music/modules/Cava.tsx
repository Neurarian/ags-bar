// Credit to https://github.com/Sk7Str1p3 & https://github.com/kotontrion

import { Gtk } from "astal/gtk3";
import Cava from "gi://AstalCava";

export default function CavaDraw() {
	const cava = Cava.get_default()!;
	return (
		<box className="Cava">
			<drawingarea
				hexpand={true}
				vexpand={true}
				widthRequest={50}
				onDraw={(self, cr) => {
					const width = self.get_allocated_width();
					const height = self.get_allocated_height();
					const values = cava.get_values();
					const bars = cava.bars;

					if (bars === 0 || values.length === 0) return;

					// Get color from style context
					const color = self.get_style_context().get_color(Gtk.StateFlags.NORMAL);
					cr.setSourceRGBA(color.red, color.green, color.blue, color.alpha);

					const barWidth = width / (bars - 1);
					let lastX = 0;
					let lastY = height - height * values[0];

					cr.moveTo(lastX, lastY);

					for (let i = 1; i < bars; i++) {
						const h = height * values[i];
						const y = height - h;

						cr.curveTo(
							lastX + barWidth / 2, lastY,
							lastX + barWidth / 2, y,
							i * barWidth, y
						);

						lastX = i * barWidth;
						lastY = y;
					}

					// Close and fill the path
					cr.lineTo(lastX, height);
					cr.lineTo(0, height);
					cr.closePath();
					cr.fill();
				}
				}
			/></box>).hook(cava, "notify::values", (self) => self.queue_draw());
}
