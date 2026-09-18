import { createFileRoute, notFound } from "@tanstack/react-router";
import { Index, VALID_TABS } from "./index";

export const Route = createFileRoute("/$tab")({
  head: ({ params }) => ({
    meta: [
      { property: "og:url", content: `https://mooncid.com/${params.tab}` },
    ],
    links: [
      { rel: "canonical", href: `https://mooncid.com/${params.tab}` },
    ],
  }),
  loader: ({ params }) => {
    if (!VALID_TABS.includes(params.tab)) {
      throw notFound();
    }
    return params.tab;
  },
  component: Index,
});
