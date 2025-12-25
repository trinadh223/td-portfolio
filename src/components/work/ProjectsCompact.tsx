import { getPosts } from "@/utils/utils";
import { Grid } from "@once-ui-system/core";
import { ProjectCardCompact } from "./ProjectCardCompact";

interface ProjectsCompactProps {
    range?: [number, number?];
    columns?: "1" | "2" | "3";
}

export function ProjectsCompact({ range, columns = "2" }: ProjectsCompactProps) {
    let allProjects = getPosts(["src", "app", "work", "projects"]);

    const sortedProjects = allProjects.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedProjects = range
        ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
        : sortedProjects;

    return (
        <Grid columns={columns} s={{ columns: "1" }} gap="16" fillWidth>
            {displayedProjects.map((post) => (
                <ProjectCardCompact
                    key={post.slug}
                    href={`/work/${post.slug}`}
                    image={post.metadata.images?.[0] || ""}
                    title={post.metadata.title}
                    description={post.metadata.summary}
                />
            ))}
        </Grid>
    );
}
