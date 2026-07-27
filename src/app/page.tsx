import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Line,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
  SmartLink,
} from "@once-ui-system/core";
import { baseURL, home, about, person, social, work, blog } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import { ProjectsCompact } from "@/components/work/ProjectsCompact";
import { MediumPosts } from "@/components/blog/MediumPosts";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
    {
      title: about.achievements.title,
      display: about.achievements.display,
      items: [],
    },
    {
      title: "Projects",
      display: true,
      items: [],
    },
    {
      title: "Blog",
      display: true,
      items: [],
    },
  ];
  return (
    <Column maxWidth="m" paddingTop="24" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={home.title}
        description={home.description}
        path={home.path}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${home.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Column fillWidth horizontal="center">
        {/* Compact identity header */}
        <Row
          id={about.intro.title}
          fillWidth
          gap="24"
          vertical="center"
          s={{ direction: "column" }}
          marginBottom="l"
        >
          {about.avatar.display && (
            <Avatar src={person.avatar} size="xl" />
          )}
          <Column flex={1} gap="8" s={{ horizontal: "center", align: "center" }}>
            <Heading className={styles.textAlign} variant="display-strong-l">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="heading-default-l"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            <Row gap="8" vertical="center" className={styles.blockAlign}>
              <Icon onBackground="accent-weak" name="globe" size="s" />
              <Text variant="body-default-s" onBackground="neutral-weak">
                {person.location}
              </Text>
            </Row>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="8"
                gap="8"
                wrap
                fitWidth
                data-border="rounded"
              >
                {social
                  .filter((item) => item.essential)
                  .map(
                    (item) =>
                      item.link && (
                        <IconButton
                          size="m"
                          key={`${item.name}-icon`}
                          href={item.link}
                          icon={item.icon}
                          variant="secondary"
                        />
                      ),
                  )}
                {about.calendar.display && (
                  <Button
                    href={about.calendar.link}
                    prefixIcon="calendar"
                    label="Schedule a call"
                    size="s"
                    weight="default"
                    variant="secondary"
                    data-border="rounded"
                  />
                )}
              </Row>
            )}
          </Column>
        </Row>

        <Line marginBottom="l" />

        <Column fillWidth>
          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: React.ReactNode, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${index}`}
                          >
                            {achievement}
                          </Text>
                        ),
                      )}
                    </Column>
                    {experience.images && experience.images.length > 0 && (
                      <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image, index) => (
                          <Row
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill}-${index}`} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">
                      {skill.title}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag key={`${skill.title}-${tagIndex}`} size="l" prefixIcon={tag.icon}>
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}
                    {skill.images && skill.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image, index) => (
                          <Row
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.achievements.display && (
            <>
              <Heading
                as="h2"
                id={about.achievements.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.achievements.title}
              </Heading>
              <Column fillWidth gap="16" marginBottom="40">
                {about.achievements.items.map((item, index) => (
                  <Row key={`achievement-${index}`} fillWidth gap="12" vertical="start">
                    <Icon
                      name={item.icon || "trophy"}
                      size="s"
                      onBackground="brand-weak"
                      marginTop="4"
                    />
                    <Column gap="4">
                      <Text variant="body-default-m">{item.title}</Text>
                      {item.description && (
                        <Text variant="body-default-s" onBackground="neutral-weak">
                          {item.description}
                        </Text>
                      )}
                    </Column>
                  </Row>
                ))}
              </Column>
            </>
          )}

          <Line marginBottom="40" />

          <Row fillWidth horizontal="between" vertical="center" marginBottom="m">
            <Heading as="h2" id="Projects" variant="display-strong-s">
              Projects
            </Heading>
            <SmartLink href={work.path}>
              <Text variant="label-default-s" onBackground="brand-weak">
                View all →
              </Text>
            </SmartLink>
          </Row>
          <Column fillWidth marginBottom="40">
            <ProjectsCompact range={[1, 4]} columns="2" />
          </Column>

          <Line marginBottom="40" />

          <Row fillWidth horizontal="between" vertical="center" marginBottom="m">
            <Heading as="h2" id="Blog" variant="display-strong-s">
              Blog
            </Heading>
            <SmartLink href={blog.path}>
              <Text variant="label-default-s" onBackground="brand-weak">
                Read all →
              </Text>
            </SmartLink>
          </Row>
          <Column fillWidth marginBottom="40">
            <MediumPosts limit={4} columns="2" />
          </Column>
        </Column>
      </Column>
    </Column>
  );
}
