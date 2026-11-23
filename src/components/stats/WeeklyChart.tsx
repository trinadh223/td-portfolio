"use client";

import { useMemo, useRef, useState } from "react";
import styles from "./stats.module.scss";
import { Week, formatDay, groupColor } from "./data";

type Props = {
  weeks: Week[];
  groups: string[];
  milestones: { date: string; label: string }[];
  title: string;
  prLabel: string;
  commitLabel: string;
};

const H = 220;
const PAD = { top: 28, right: 8, bottom: 22, left: 30 };

export function WeeklyChart({ weeks, groups, milestones, title, prLabel, commitLabel }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const W = 720;

  const activeGroups = groups.filter((g) => weeks.some((w) => (w.byGroup[g] ?? 0) > 0));

  const { x, y, max, bw, ticks, marks } = useMemo(() => {
    const max = Math.max(1, ...weeks.map((w) => Math.max(w.commits, w.mergedPrs)));
    const nice = Math.ceil(max / 50) * 50;
    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;
    const slot = innerW / weeks.length;
    const x = (i: number) => PAD.left + i * slot;
    const y = (v: number) => PAD.top + innerH - (v / nice) * innerH;
    const ticks = [0, nice / 2, nice];
    const marks = milestones
      .map((m) => ({
        ...m,
        i: weeks.findIndex(
          (w, idx) => m.date >= w.week && (!weeks[idx + 1] || m.date < weeks[idx + 1].week),
        ),
      }))
      .filter((m) => m.i >= 0);
    return { x, y, max: nice, bw: Math.max(2, slot - 2), ticks, marks };
  }, [weeks, milestones]);

  const prPath = weeks
    .map(
      (w, i) => `${i === 0 ? "M" : "L"}${(x(i) + bw / 2).toFixed(1)},${y(w.mergedPrs).toFixed(1)}`,
    )
    .join(" ");

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.floor((px - PAD.left) / ((W - PAD.left - PAD.right) / weeks.length));
    setHover(i >= 0 && i < weeks.length ? i : null);
  };

  const hw = hover !== null ? weeks[hover] : null;
  const tipLeftPct = hover !== null ? ((x(hover) + bw / 2) / W) * 100 : 0;

  return (
    <div className={styles.viz} ref={wrap}>
      <div className={styles.legend} style={{ marginBottom: 12 }}>
        {activeGroups.map((g) => (
          <span key={g}>
            <span className={styles.swatch} style={{ background: groupColor(g) }} />
            {g}
          </span>
        ))}
        <span>
          <span className={styles.lineSwatch} />
          {prLabel}
        </span>
      </div>
      <div className={styles.chartScroll}>
        <div className={styles.chartInner}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            role="img"
            aria-label={title}
            style={{ display: "block" }}
          >
            {ticks.map((t) => (
              <g key={t}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={y(t)}
                  y2={y(t)}
                  stroke="var(--viz-grid)"
                  strokeWidth={1}
                />
                <text x={PAD.left - 6} y={y(t) + 3} textAnchor="end" className={styles.axisText}>
                  {t}
                </text>
              </g>
            ))}
            {marks.map((m, k) => (
              <g key={m.label}>
                <line
                  x1={x(m.i) + bw / 2}
                  x2={x(m.i) + bw / 2}
                  y1={PAD.top - 6 - (k % 2) * 0}
                  y2={H - PAD.bottom}
                  stroke="var(--viz-ink-weak)"
                  strokeDasharray="2 3"
                  strokeWidth={1}
                  opacity={0.6}
                />
                <text
                  x={x(m.i) + bw / 2}
                  y={k % 2 === 0 ? 10 : 21}
                  textAnchor={m.i > weeks.length * 0.8 ? "end" : "middle"}
                  className={styles.axisText}
                >
                  {m.label}
                </text>
              </g>
            ))}
            {weeks.map((w, i) => {
              let acc = 0;
              return (
                <g key={w.week} opacity={hover === null || hover === i ? 1 : 0.45}>
                  {activeGroups.map((g) => {
                    const v = w.byGroup[g] ?? 0;
                    if (!v) return null;
                    const y0 = y(acc);
                    acc += v;
                    const y1 = y(acc);
                    return (
                      <rect
                        key={g}
                        x={x(i)}
                        y={y1}
                        width={bw}
                        height={Math.max(0, y0 - y1 - 1)}
                        rx={Math.min(2, bw / 2)}
                        fill={groupColor(g)}
                      />
                    );
                  })}
                </g>
              );
            })}
            <path
              d={prPath}
              fill="none"
              stroke="var(--viz-ink)"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {weeks
              .map((w, i) => ({ w, i }))
              .filter(({ i }) => i % 13 === 0)
              .map(({ w, i }) => (
                <text key={w.week} x={x(i)} y={H - 6} className={styles.axisText}>
                  {new Date(`${w.week}T00:00:00Z`).toLocaleString("en", {
                    month: "short",
                    year: "2-digit",
                    timeZone: "UTC",
                  })}
                </text>
              ))}
            {hover !== null && (
              <line
                x1={x(hover) + bw / 2}
                x2={x(hover) + bw / 2}
                y1={PAD.top}
                y2={H - PAD.bottom}
                stroke="var(--viz-ink)"
                strokeWidth={1}
                opacity={0.35}
              />
            )}
            <rect
              x={PAD.left}
              y={PAD.top}
              width={W - PAD.left - PAD.right}
              height={H - PAD.top - PAD.bottom}
              fill="transparent"
              onPointerMove={onMove}
              onPointerLeave={() => setHover(null)}
            />
          </svg>
          {hw && (
            <div
              className={styles.tooltip}
              style={{
                left: `${tipLeftPct}%`,
                top: 24,
                transform: `translateX(${tipLeftPct > 70 ? "-105%" : "8px"})`,
              }}
            >
              <div className={styles.tooltipMuted}>Week of {formatDay(hw.week)}</div>
              <div>
                <strong>{hw.commits}</strong> {commitLabel}
              </div>
              <div>
                <strong>{hw.mergedPrs}</strong> {prLabel}
              </div>
              {activeGroups
                .filter((g) => hw.byGroup[g])
                .map((g) => (
                  <div key={g} className={styles.tooltipMuted}>
                    <span className={styles.swatch} style={{ background: groupColor(g) }} />
                    {g}: {hw.byGroup[g]}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <span className={styles.srOnly}>{`Maximum on the scale: ${max}.`}</span>
    </div>
  );
}
