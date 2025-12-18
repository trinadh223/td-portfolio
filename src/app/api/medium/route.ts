import { NextResponse } from "next/server";

interface MediumPost {
    title: string;
    excerpt: string;
    image: string;
    link: string;
    pubDate: string;
    tags: string[];
}

interface RssItem {
    title: string;
    description: string;
    thumbnail: string;
    link: string;
    pubDate: string;
    categories: string[];
}

interface RssResponse {
    status: string;
    items: RssItem[];
}

export async function GET() {
    try {
        const mediumRssFeed = "https://medium.com/feed/@trinadhdivvela";
        const rssToJsonApi = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumRssFeed)}`;

        const response = await fetch(rssToJsonApi, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error("Failed to fetch Medium feed");
        }

        const data: RssResponse = await response.json();

        if (data.status !== "ok" || !data.items) {
            throw new Error("Invalid RSS response");
        }

        const posts: MediumPost[] = data.items.map((item) => {
            // Extract img src from description HTML
            const imgSrcMatch = item.description.match(/<img[^>]+src=["']?([^"'>\s]+)["']?/i);
            const extractedImageSrc = imgSrcMatch ? imgSrcMatch[1] : null;

            // Clean excerpt from HTML tags
            const excerpt = item.description
                .replace(/<[^>]*>/g, "")
                .split(".")
                .slice(0, 2)
                .join(".") + ".";

            return {
                title: item.title,
                excerpt: excerpt.substring(0, 200) + (excerpt.length > 200 ? "..." : ""),
                image: extractedImageSrc || item.thumbnail || "",
                link: item.link,
                pubDate: new Date(item.pubDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                tags: item.categories || [],
            };
        });

        return NextResponse.json({ posts });
    } catch (error) {
        console.error("Error fetching Medium posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch Medium posts", posts: [] },
            { status: 500 }
        );
    }
}
