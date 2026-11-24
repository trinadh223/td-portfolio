"use client";

import { useMemo, useState } from "react";
import styles from "./stats.module.scss";
import { Day, formatDay } from "./data";

const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 26;
const TOP = 16;

type Props = { days: Day[]; legendLess: string; legendMore: string; title: string };

export function Heatmap({ days, legendLess, legendMore, title }: Props) {
  const [hover, setHover] = useState<{ x: number; y: number; day: Day } | null>(null);

  const { cells, months, width, height, thresholds } = useMemo(() => {
    const first = new Date(`${days[0].date}T00:00:00Z`);
    const offset = first.getUTCDay();
    const counts = days
      .map((d) => d.count)
      .filter((c) => c > 0)
      .sort((a, b) => a - b);
    const q = (p: number) =>
      counts[Math.min(counts.length - 1, Math.floor(p * counts.length))] ?? 1;
    const thresholds = [q(0.25), q(0.5), q(0.8)];
    const cells = days.map((d, i) => {
      const idx = i + offset;
      return { day: d, col: Math.floor(idx / 7), row: idx % 7 };
    });
    const months: { col: number; label: string }[] = [];
    let last = -1;
    for (const c of cells) {
      const m = Number(c.day.date.slice(5, 7));
      if (m !== last && c.row === 0) {
        months.push({
          col: c.col,
          label: new Date(`${c.day.date}T00:00:00Z`).toLocaleString("en", {
            month: "short",
            timeZone: "UTC",
          }),
        });
        last = m;
      }
    }
    const cols = cells[cells.length - 1].col + 1;
    return { cells, months, thresholds, width: LEFT + cols * STEP, height: TOP + 7 * STEP };
  }, [days]);

  const level = (c: number) =>
    c === 0 ? 0 : c <= thresholds[0] ? 1 : c <= thresholds[1] ? 2 : c <= thresholds[2] ? 3 : 4;

  return (
    <div className={styles.viz} style={{ position: "relative" }}>
      <div className={styles.heatScroll}>
        <div style={{ position: "relative", width: "100%", minWidth: 640 }}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            role="img"
            aria-label={title}
            style={{ display: "block" }}
          >
            {months.map((m, i) =>
              i === 0 && months[1] && months[1].col - m.col < 3 ? null : (
                <text
                  key={`${m.col}-${m.label}`}
                  x={LEFT + m.col * STEP}
                  y={10}
                  className={styles.axisText}
                >
                  {m.label}
                </text>
              ),
            )}
            {["Mon", "Wed", "Fri"].map((d, i) => (
              <text
                key={d}
                x={0}
                y={TOP + (1 + i * 2) * STEP + CELL - 2}
                className={styles.axisText}
              >
                {d}
              </text>
            ))}
            {cells.map(({ day, col, row }) => (
              <rect
                key={day.date}
                className={styles.heatCell}
                x={LEFT + col * STEP}
                y={TOP + row * STEP}
                width={CELL}
                height={CELL}
                rx={2.5}
                fill={`var(--viz-seq-${level(day.count)})`}
                aria-label={`${day.count} contributions on ${formatDay(day.date)}`}
                onMouseEnter={() => setHover({ x: LEFT + col * STEP, y: TOP + row * STEP, day })}
                onMouseLeave={() => setHover(null)}
              />
            ))}
          </svg>
          {hover && (
            <div
              className={styles.tooltip}
              style={{
                left: `${(hover.x / width) * 100}%`,
                top: `${(hover.y / height) * 100}%`,
                transform: `translate(${hover.x / width > 0.75 ? "-100%" : "-10%"}, ${
                  hover.y < TOP + 3 * STEP ? `${CELL + 6}px` : "calc(-100% - 6px)"
                })`,
              }}
            >
              <strong>{hover.day.count}</strong> contributions
              <div className={styles.tooltipMuted}>{formatDay(hover.day.date)}</div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.legend} style={{ justifyContent: "flex-end", marginTop: 8, gap: 4 }}>
        <span style={{ marginRight: 4 }}>{legendLess}</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span
            key={l}
            className={styles.swatch}
            style={{ background: `var(--viz-seq-${l})`, margin: 0 }}
          />
        ))}
        <span style={{ marginLeft: 4 }}>{legendMore}</span>
      </div>
    </div>
  );
}
