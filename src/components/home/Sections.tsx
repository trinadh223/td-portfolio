import { Column, Heading, Row, SmartLink, Text } from "@once-ui-system/core";
import Image from "next/image";
import styles from "./home.module.scss";
import { explorations, now, statsCopy } from "@/resources/portfolio";
import { gitStats, hasStats } from "@/components/stats/data";
import { StatRow } from "@/components/stats/StatRow";
import { Heatmap } from "@/components/stats/Heatmap";
import vizStyles from "@/components/stats/stats.module.scss";

function SectionHeading({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <Column gap="8" marginBottom="24" id={id} className={styles.section}>
      <Heading as="h2" variant="display-strong-s">
        {title}
      </Heading>
      {intro && (
        <Text variant="body-default-m" onBackground="neutral-weak">
          {intro}
        </Text>
      )}
    </Column>
  );
}

export function GitStatsSummary() {
  if (!hasStats(gitStats)) {
    return (
      <>
        <SectionHeading id={statsCopy.title} title={statsCopy.title} />
        <Text onBackground="neutral-weak">{statsCopy.error}</Text>
      </>
    );
  }
  const t = gitStats.totals;
  return (
    <>
      <SectionHeading id={statsCopy.title} title={statsCopy.title} />
      <Column gap="12">
        <StatRow
          stats={[
            { value: t.contributions, label: statsCopy.contributions },
            { value: t.mergedPrs, label: statsCopy.mergedPrs },
            { value: t.activeDays, label: statsCopy.activeDays },
            { value: t.longestStreak, label: statsCopy.longestStreak },
          ]}
        />
        <div className={vizStyles.card}>
          <Heatmap
            days={gitStats.calendar}
            title={statsCopy.heatmapTitle}
            legendLess={statsCopy.legendLess}
            legendMore={statsCopy.legendMore}
          />
        </div>
        <Row horizontal="end">
          <SmartLink href="/stats">
            <span className={styles.link}>{statsCopy.viewAll}</span>
          </SmartLink>
        </Row>
      </Column>
    </>
  );
}

export function NowCard() {
  const [site, app] = now.links;
  return (
    <section className={styles.banner} id={now.label} aria-label={now.label}>
      <div className={styles.bannerBody}>
        <div className={styles.bannerTop}>
          <Image src={now.logo} alt="" width={36} height={36} className={styles.bannerLogo} />
          <span className={styles.bannerLead}>{now.lead}</span>
        </div>
        <a href={site.href} className={styles.bannerText}>
          {now.text}
        </a>
        <div className={styles.bannerLinks}>
          <a href={site.href} className={styles.bannerPrimary}>
            {site.label}
          </a>
          <a href={app.href} className={styles.bannerSecondary}>
            {app.label}
          </a>
        </div>
      </div>
    </section>
  );
}

export function SideProjects() {
  const side = explorations.items.filter((p) => p.name !== "Glimpse HQ");
  return (
    <div className={styles.grid2}>
      {side.map((p) => {
        const inner = (
          <>
            <div className={styles.cardName}>{p.name}</div>
            <span className={styles.cardSummary}>{p.summary}</span>
            {p.href && <span className={styles.link}>{explorations.viewRepo}</span>}
          </>
        );
        return p.href ? (
          <a key={p.name} href={p.href} className={styles.card}>
            {inner}
          </a>
        ) : (
          <div key={p.name} className={styles.card}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
