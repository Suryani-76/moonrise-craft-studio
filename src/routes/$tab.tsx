import { createFileRoute, notFound } from "@tanstack/react-router";
import { Index, VALID_TABS } from "./index";

export const Route = createFileRoute("/$tab")({
  loader: ({ params }) => {
    if (!VALID_TABS.includes(params.tab)) {
      throw notFound();
    }
    return params.tab;
  },
  component: Index,
});
