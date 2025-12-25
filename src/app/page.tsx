import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Grid,
  Media,
  Tag,
  Icon,
  Line,
  SmartLink,
} from "@once-ui-system/core";
import { home, about, person, baseURL, work, blog, gallery } from "@/resources";
import { ProjectsCompact } from "@/components/work/ProjectsCompact";
import { MediumPosts } from "@/components/blog/MediumPosts";

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
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" paddingX="l" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero Section */}
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      {/* About Section - Brief Introduction */}
      <RevealFx translateY="12" delay={0.5}>
        <Column fillWidth gap="24">
          <Row fillWidth horizontal="between" vertical="center">
            <Heading as="h2" variant="display-strong-s">
              Experience
            </Heading>
            <SmartLink href={about.path}>
              <Text variant="label-default-s" onBackground="brand-weak">
                Read more →
              </Text>
            </SmartLink>
          </Row>
          <Row fillWidth gap="24" s={{ direction: "column" }}>
            <Column flex={1} gap="16" horizontal="center" vertical="center">
              <Avatar src={person.avatar} size="xl" />
              <Row gap="8" vertical="center">
                <Icon onBackground="accent-weak" name="globe" size="s" />
                <Text variant="body-default-s">{person.location}</Text>
              </Row>
              {person.languages && person.languages.length > 0 && (
                <Row wrap gap="8" horizontal="center">
                  {person.languages.map((language, index) => (
                    <Tag key={index} size="s">
                      {language}
                    </Tag>
                  ))}
                </Row>
              )}
            </Column>
            <Column flex={2} gap="16">
              <Text variant="body-default-l" onBackground="neutral-weak">
                {about.intro.description}
              </Text>
            </Column>
          </Row>
        </Column>
      </RevealFx>

      <Line />

      {/* Work/Projects Section */}
      <RevealFx translateY="12" delay={0.6}>
        <Column fillWidth gap="24">
          <Row fillWidth horizontal="between" vertical="center">
            <Heading as="h2" variant="display-strong-s">
              Projects
            </Heading>
            <SmartLink href={work.path}>
              <Text variant="label-default-s" onBackground="brand-weak">
                View all →
              </Text>
            </SmartLink>
          </Row>
          <ProjectsCompact range={[1, 4]} columns="2" />
        </Column>
      </RevealFx>

      <Line />

      {/* Blog Section */}
      <RevealFx translateY="12" delay={0.7}>
        <Column fillWidth gap="24">
          <Row fillWidth horizontal="between" vertical="center">
            <Heading as="h2" variant="display-strong-s">
              Latest Articles
            </Heading>
            <SmartLink href={blog.path}>
              <Text variant="label-default-s" onBackground="brand-weak">
                Read all →
              </Text>
            </SmartLink>
          </Row>
          <MediumPosts limit={4} columns="2" />
        </Column>
      </RevealFx>

      <Line />

      {/* Gallery Section */}
      <RevealFx translateY="12" delay={0.8}>
        <Column fillWidth gap="24">
          <Row fillWidth horizontal="between" vertical="center">
            <Heading as="h2" variant="display-strong-s">
              Gallery
            </Heading>
            <SmartLink href={gallery.path}>
              <Text variant="label-default-s" onBackground="brand-weak">
                View all →
              </Text>
            </SmartLink>
          </Row>
          <Grid columns="3" s={{ columns: "2" }} gap="12" fillWidth>
            {gallery.images.slice(0, 6).map((image, index) => (
              <Media
                key={index}
                priority={index < 3}
                sizes="(max-width: 560px) 50vw, 33vw"
                radius="m"
                aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
                src={image.src}
                alt={image.alt}
                border="neutral-alpha-weak"
                enlarge
              />
            ))}
          </Grid>
        </Column>
      </RevealFx>
    </Column>
  );
}
