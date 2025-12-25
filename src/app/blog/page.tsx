import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { MediumPosts } from "@/components/blog/MediumPosts";
import { baseURL, blog, person } from "@/resources";


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


    </Column>
  );
}
