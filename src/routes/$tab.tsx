import { createFileRoute, notFound } from "@tanstack/react-router";
import { Index, VALID_TABS } from "./index";

export const Route = createFileRoute("/$tab")({
  head: ({ params }) => {
    const canonicalUrl = params.tab === "home" ? "https://mooncid.com/" : `https://mooncid.com/${params.tab}`;
    return {
      meta: [
        { property: "og:url", content: canonicalUrl },
      ],
      links: [
        { rel: "canonical", href: canonicalUrl },
      ],
    };
  },
  loader: ({ params }) => {
    if (!VALID_TABS.includes(params.tab)) {
      throw notFound();
    }
    return params.tab;
  },
  component: Index,
});
