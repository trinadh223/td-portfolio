"use client";

import {
    Column,
    Heading,
    SmartLink,
    Text,
    Media,
    Row,
    Tag,
} from "@once-ui-system/core";

interface ProjectCardCompactProps {
    href: string;
    image: string;
    title: string;
    description: string;
    tags?: string[];
}

export const ProjectCardCompact: React.FC<ProjectCardCompactProps> = ({
    href,
    image,
    title,
    description,
    tags = [],
}) => {
    return (
        <SmartLink href={href} style={{ textDecoration: "none" }}>
            <Column
                fillWidth
                gap="8"
                padding="12"
                border="neutral-alpha-weak"
                radius="l"
                style={{
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                }}
                className="hover-lift"
            >
                {image && (
                    <Media
                        sizes="(max-width: 768px) 100vw, 320px"
                        border="neutral-alpha-weak"
                        cursor="interactive"
                        radius="m"
                        src={image}
                        alt={title}
                        aspectRatio="16 / 9"
                    />
                )}
                <Column gap="4" fillWidth>
                    <Heading as="h3" variant="heading-strong-s">
                        {title}
                    </Heading>
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
                        {description}
                    </Text>
                    {tags.length > 0 && (
                        <Row wrap gap="4" paddingTop="4">
                            {tags.slice(0, 3).map((tag, idx) => (
                                <Tag key={idx} size="s">
                                    {tag}
                                </Tag>
                            ))}
                        </Row>
                    )}
                    <Row gap="4" vertical="center" paddingTop="4">
                        <Text variant="label-default-s" onBackground="brand-weak">
                            View project →
                        </Text>
                    </Row>
                </Column>
            </Column>
        </SmartLink>
    );
};
