import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { baseURL, person } from "@/resources";
import { statsCopy } from "@/resources/portfolio";
import { gitStats, hasStats, formatDay, formatNumber } from "@/components/stats/data";
import { StatRow } from "@/components/stats/StatRow";
import { Heatmap } from "@/components/stats/Heatmap";
import { WeeklyChart } from "@/components/stats/WeeklyChart";
import { LanguageBar, PrBars } from "@/components/stats/Bars";
import styles from "@/components/stats/stats.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: statsCopy.pageTitle,
    description: statsCopy.pageDescription,
    baseURL,
    image: "/images/og/home.jpg",
    path: "/stats",
  });
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.card}>
      <Text as="h2" variant="label-strong-m" marginBottom="16" style={{ display: "block" }}>
        {title}
      </Text>
      {children}
    </div>
  );
}

export default function StatsPage() {
  const ok = hasStats(gitStats);
  return (
    <Column maxWidth="m" paddingTop="24" gap="16" fillWidth style={{ minWidth: 0 }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path="/stats"
        title={statsCopy.pageTitle}
        description={statsCopy.pageDescription}
        image="/images/og/home.jpg"
        author={{ name: person.name, url: baseURL, image: `${baseURL}${person.avatar}` }}
      />
      <Column gap="8" marginBottom="16">
        <Heading variant="display-strong-m">{statsCopy.pageTitle}</Heading>
      </Column>

      {!ok ? (
        <Text onBackground="neutral-weak">{statsCopy.error}</Text>
      ) : (
        <>
          <StatRow
            stats={[
              { value: gitStats.totals.contributions, label: statsCopy.contributions },
              { value: gitStats.totals.mergedPrs, label: statsCopy.mergedPrs },
              { value: gitStats.totals.activeDays, label: statsCopy.activeDays },
              { value: gitStats.totals.longestStreak, label: statsCopy.longestStreak },
            ]}
          />

          <Card title={statsCopy.heatmapTitle}>
            <Heatmap
              days={gitStats.calendar}
              title={statsCopy.heatmapTitle}
              legendLess={statsCopy.legendLess}
              legendMore={statsCopy.legendMore}
            />
          </Card>

          <Card title={statsCopy.weeklyTitle}>
            <WeeklyChart
              weeks={gitStats.weekly}
              groups={gitStats.groups}
              milestones={gitStats.milestones}
              title={statsCopy.weeklyTitle}
              prLabel={statsCopy.mergedPrs}
              commitLabel="commits"
            />
            <details className={styles.details} style={{ marginTop: 16 }}>
              <summary>Table</summary>
              <div style={{ overflowX: "auto", marginTop: 8 }}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Week</th>
                      <th>Commits</th>
                      <th>{statsCopy.mergedPrs}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gitStats.weekly
                      .filter((w) => w.commits || w.mergedPrs)
                      .slice()
                      .reverse()
                      .map((w) => (
                        <tr key={w.week}>
                          <td>{formatDay(w.week)}</td>
                          <td>{formatNumber(w.commits)}</td>
                          <td>{formatNumber(w.mergedPrs)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </details>
          </Card>

          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            }}
          >
            <Card title={statsCopy.prsByProductTitle}>
              <PrBars items={gitStats.prsByProduct} />
            </Card>
            <Card title={statsCopy.languagesTitle}>
              <LanguageBar items={gitStats.languages} />
            </Card>
          </div>

        </>
      )}
    </Column>
  );
}
