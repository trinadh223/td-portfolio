"use client";

import { useEffect, useState } from "react";
import { Column, Grid, Row, Text, Tag, Skeleton, SmartLink, Media } from "@once-ui-system/core";

interface MediumPost {
    title: string;
    excerpt: string;
    image: string;
    link: string;
    pubDate: string;
    tags: string[];
}

interface MediumPostsProps {
    limit?: number;
    columns?: "1" | "2" | "3";
}

export function MediumPosts({ limit = 6, columns = "2" }: MediumPostsProps) {
    const [posts, setPosts] = useState<MediumPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                setIsLoading(true);
                const response = await fetch("/api/medium");
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setPosts(data.posts.slice(0, limit));
            } catch (err) {
                setError("Failed to load Medium posts");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPosts();
    }, [limit]);

    if (isLoading) {
        return (
            <Grid columns={columns} s={{ columns: 1 }} gap="16" fillWidth>
                {Array.from({ length: Math.min(limit, 4) }).map((_, i) => (
                    <Column key={i} gap="8" padding="16" border="neutral-alpha-weak" radius="l">
                        <Skeleton shape="block" />
                        <Skeleton shape="line" width="l" />
                        <Skeleton shape="line" width="xl" />
                        <Skeleton shape="line" width="m" />
                    </Column>
                ))}
            </Grid>
        );
    }

    if (error || posts.length === 0) {
        return null;
    }

    return (
        <Grid columns={columns} s={{ columns: 1 }} gap="16" fillWidth>
            {posts.map((post, index) => (
                <SmartLink
                    key={index}
                    href={post.link}
                    style={{ textDecoration: "none" }}
                >
                    <Column
                        gap="12"
                        padding="16"
                        border="neutral-alpha-weak"
                        radius="l"
                        fillWidth
                        style={{
                            transition: "all 0.2s ease",
                            cursor: "pointer",
                        }}
                        className="hover-lift"
                    >
                        {post.image && (
                            <Media
                                sizes="(max-width: 768px) 100vw, 640px"
                                border="neutral-alpha-weak"
                                cursor="interactive"
                                radius="m"
                                src={post.image}
                                alt={post.title}
                                aspectRatio="16 / 9"
                                unoptimized
                            />
                        )}
                        <Column gap="8" fillWidth>
                            <Text variant="label-default-s" onBackground="neutral-weak">
                                {post.pubDate}
                            </Text>
                            <Text variant="heading-strong-m">{post.title}</Text>
                            <Text
                                variant="body-default-s"
                                onBackground="neutral-weak"
                                style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                {post.excerpt}
                            </Text>
                            {post.tags && post.tags.length > 0 && (
                                <Row wrap gap="4" paddingTop="4">
                                    {post.tags.slice(0, 3).map((tag, idx) => (
                                        <Tag key={idx} size="s">
                                            {tag}
                                        </Tag>
                                    ))}
                                </Row>
                            )}
                            <Row gap="4" vertical="center" paddingTop="4">
                                <Text variant="label-default-s" onBackground="brand-weak">
                                    Read on Medium →
                                </Text>
                            </Row>
                        </Column>
                    </Column>
                </SmartLink>
            ))}
        </Grid>
    );
}

export default MediumPosts;
