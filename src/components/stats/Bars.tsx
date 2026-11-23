import styles from "./stats.module.scss";
import { GitStats, formatNumber, groupColor } from "./data";

export function PrBars({ items }: { items: GitStats["prsByProduct"] }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <div className={styles.viz} style={{ display: "grid", gap: 12 }}>
      {items.map((item) => (
        <div key={item.label} title={`${item.label}: ${item.count}`}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.8125rem",
              marginBottom: 4,
            }}
          >
            <span style={{ color: "var(--viz-ink)" }}>{item.label}</span>
            <span style={{ color: "var(--viz-ink-weak)", fontVariantNumeric: "tabular-nums" }}>
              {formatNumber(item.count)}
            </span>
          </div>
          <div className={styles.barTrack}>
            <div
              className={styles.barFill}
              style={{
                width: `${(item.count / max) * 100}%`,
                background: groupColor(item.group),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LanguageBar({ items }: { items: GitStats["languages"] }) {
  const fallback = "var(--neutral-alpha-strong)";
  return (
    <div className={styles.viz}>
      <div
        className={styles.stack}
        role="img"
        aria-label={items.map((l) => `${l.name} ${(l.share * 100).toFixed(1)}%`).join(", ")}
      >
        {items.map((l) => (
          <div
            key={l.name}
            className={styles.stackSeg}
            title={`${l.name}: ${(l.share * 100).toFixed(1)}%`}
            style={{
              width: `${l.share * 100}%`,
              background: l.color ?? fallback,
            }}
          />
        ))}
      </div>
      <div className={styles.legend} style={{ marginTop: 12 }}>
        {items.map((l) => (
          <span key={l.name}>
            <span className={styles.swatch} style={{ background: l.color ?? fallback }} />
            {l.name}{" "}
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {(l.share * 100).toFixed(1)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
