import styles from "./stats.module.scss";
import { formatNumber } from "./data";

type Stat = { value: number; label: string; suffix?: string };

export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className={`${styles.viz} ${styles.statGrid}`}>
      {stats.map((s) => (
        <div key={s.label} className={styles.card}>
          <div className={styles.statValue}>
            {formatNumber(s.value)}
            {s.suffix}
          </div>
          <div className={styles.statLabel}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
