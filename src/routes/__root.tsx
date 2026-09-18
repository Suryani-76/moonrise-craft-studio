import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-gold btn-gold-hover">Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-gold btn-gold-hover">Try again</button>
          <a href="/" className="btn-outline-gold" style={{ color: "var(--navy)", borderColor: "var(--navy)" }}>Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Moon Construction & Interiors — Luxury Construction & Interior Design" },
      { name: "description", content: "Premium construction and interior design for luxury villas, apartments, offices, and turnkey projects. 700+ happy clients worldwide." },
      { name: "author", content: "Moon Construction & Interiors" },
      { property: "og:site_name", content: "Moon Construction & Interiors" },
      { property: "og:title", content: "Moon Construction & Interiors — Building Spaces. Designing Dreams." },
      { property: "og:description", content: "Luxury construction and interior design with world-class craftsmanship. 700+ satisfied clients." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mooncid.com/" },
      { property: "og:image", content: "https://mooncid.com/pic%201.jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Moon Construction & Interiors — Luxury Construction & Interior Design" },
      { name: "twitter:description", content: "Premium construction and interior design for luxury villas, apartments, offices, and turnkey projects. 700+ happy clients worldwide." },
      { name: "twitter:image", content: "https://mooncid.com/pic%201.jpeg" },
    ],
    links: [
      { rel: "canonical", href: "https://mooncid.com/" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Poppins:wght@300;400;500;600&family=Montserrat:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const schemaOrgWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Moon Construction & Interiors",
  alternateName: [
    "Moon CID",
    "Moon Construction and Interior Design",
    "Moon Construction",
    "mooncid.com",
  ],
  url: "https://mooncid.com/",
};

const schemaOrgBusiness = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Moon Construction & Interiors",
  alternateName: "Moon CID",
  url: "https://mooncid.com/",
  logo: "https://mooncid.com/favicon.png",
  image: "https://mooncid.com/pic%201.jpeg",
  description:
    "Premium construction and interior design for luxury villas, apartments, offices, and turnkey projects. 700+ happy clients worldwide.",
  telephone: "+91 98765 43210",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jubilee Hills",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500033",
    addressCountry: "IN",
  },
  sameAs: [
    "https://facebook.com",
    "https://instagram.com",
    "https://linkedin.com",
  ],
};

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgBusiness) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
