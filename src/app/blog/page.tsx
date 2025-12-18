import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { MediumPosts } from "@/components/blog/MediumPosts";
import { baseURL, blog, person, newsletter } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default function Blog() {
  return (
    <Column maxWidth="m" paddingTop="24" paddingX="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column marginBottom="xl">
        <Heading marginBottom="8" variant="display-strong-l">
          {blog.title}
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Thoughts on product management, AI, and building great products.
        </Text>
      </Column>

      {/* Medium Posts Section */}
      <Column fillWidth gap="24" marginBottom="48">
        <Heading as="h2" variant="heading-strong-m" onBackground="neutral-weak">
          Latest from Medium
        </Heading>
        <MediumPosts limit={6} columns="2" />
      </Column>

      {/* Static Blog Posts Section */}
      <Column fillWidth flex={1} gap="32">
        <Heading as="h2" variant="heading-strong-m" onBackground="neutral-weak">
          Articles
        </Heading>
        <Posts range={[1, 1]} thumbnail />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" />
        {newsletter.display && <Mailchimp marginBottom="l" />}
        <Posts range={[4]} columns="2" />
      </Column>
    </Column>
  );
}
