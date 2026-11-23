import { Button, Column, Heading, Row, SmartLink, Text } from "@once-ui-system/core";
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
  const [primary, ...rest] = now.links;
  return (
    <section className={`${styles.feature} ${styles.featureNow}`} id={now.label}>
      <div className={styles.featureBody}>
        <div className={styles.brandRow}>
          <Image src={now.logo} alt="" width={44} height={44} className={styles.logo} />
          <div className={styles.eyebrow}>{now.label}</div>
        </div>
        <Heading as="h2" variant="heading-strong-xl">
          {now.title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {now.body}
        </Text>
        <div className={styles.facts}>
          {now.stats.map((s) => (
            <div key={s.label}>
              <div className={styles.factValue}>{s.value}</div>
              <div className={styles.factLabel}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className={styles.links}>
          <Button href={primary.href} size="m" variant="primary" data-border="rounded">
            {primary.label}
          </Button>
          {rest.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <a href={primary.href} className={`${styles.shot} ${styles.shotFluxgo}`} aria-label={now.imageAlt}>
        <Image
          src={now.image}
          alt={now.imageAlt}
          fill
          sizes="(max-width: 860px) 100vw, 520px"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </a>
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
