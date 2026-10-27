// Builds the site's pages from src/: one shared head, header and footer plus a
// body per page. The finished pages are written next to this file, so Vercel
// deploys them as plain static HTML with no build step of its own.
//
// After editing anything in src/, run:  node build.mjs

import { readFileSync, writeFileSync } from "node:fs";

// Bump this when index.css or index.js changes so browsers fetch the new files.
const VERSION = "20261027-hero22";

const pages = [
  {
    output: "index.html",
    body: "home",
    nav: "home",
    path: "/",
    ogimage: "photos/og-home.jpg",
    title: "Umrah Tours from Sri Lanka | Rahath Tours &amp; Travels",
    description: "Umrah group tours from Sri Lanka. Our next group leaves on 24 November 2026. Standard and Premium packages with a guide, hotels, transport and meals.",
  },
  {
    output: "packages.html",
    body: "packages",
    nav: "packages",
    path: "/packages",
    ogimage: "photos/og-packages.jpg",
    title: "Umrah Packages 2026 | Rahath Tours &amp; Travels",
    description: "Standard (LKR 385,000) and Premium (LKR 600,000) Umrah packages from Sri Lanka. The group leaves 24 November 2026 with hotels, transport, meals and a guide.",
  },
  {
    output: "about.html",
    body: "about",
    nav: "about",
    path: "/about",
    ogimage: "photos/og-about.jpg",
    title: "About Us | Rahath Tours &amp; Travels",
    description: "Rahath Tours &amp; Travels takes Sri Lankan families and groups for Umrah. Meet our guide, Arshad Athaur Rahman, and see photos and reviews from our groups.",
  },
  {
    output: "contact.html",
    body: "contact",
    nav: "contact",
    path: "/contact",
    ogimage: "photos/og-contact.jpg",
    title: "Contact Us | Rahath Tours &amp; Travels",
    description: "Book a free call with Rahath Tours &amp; Travels about Umrah from Sri Lanka, or call and WhatsApp us on +94 72 532 9242.",
    extras: ["confirmation"],
  },
  {
    // Vercel serves 404.html for any unknown address, at any depth, so this
    // page uses root paths and stays out of search results.
    output: "404.html",
    body: "404",
    nav: "none",
    path: "/404",
    ogimage: "photos/og-home.jpg",
    title: "Page not found | Rahath Tours &amp; Travels",
    description: "This page doesn't exist. Go back to Rahath Tours &amp; Travels for Umrah packages from Sri Lanka.",
    notFound: true,
  },
];

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const partial = (name) => read(`./src/partials/${name}.html`);

const head = partial("head");
const header = partial("header");
const footer = partial("footer");

function fill(template, values) {
  return template.replace(/\{\{([a-z:]+)\}\}/g, (match, key) => {
    if (key.startsWith("nav:")) {
      return key.slice(4) === values.nav ? ' class="active" aria-current="page"' : "";
    }
    if (!(key in values)) throw new Error(`No value for ${match}`);
    return values[key];
  });
}

// Asset paths stay relative (photos/x.webp, not /photos/x.webp) so the pages
// also work when opened straight from the folder. Every page sits at the top
// level, and vercel.json removes trailing slashes, so these resolve the same
// on the live site.
const relativePaths = (html) => html.replace(/(src|srcset|href|poster)="\.\//g, '$1="');

// The 404 page can appear at /a/b, where relative paths would break.
const rootPaths = (html) =>
  html.replace(/(src|srcset|href|poster)="(?:\.\/)?(?!https?:|\/|#|mailto:|tel:|data:)/g, '$1="/');

const notFoundHead = (html) =>
  html
    .replace(/\n  <link rel="canonical"[^>]*>/, "")
    .replace("<head>\n", '<head>\n  <meta name="robots" content="noindex">\n');

for (const page of pages) {
  const values = { ...page, version: VERSION };
  const extras = (page.extras ?? []).map(partial).join("\n");

  const html = `<!DOCTYPE html>
<!-- Built from src/ by build.mjs. Edit the files in src/, then run: node build.mjs -->
<html lang="en">
<head>
${fill(head, values).trimEnd()}
</head>

<body>

${fill(header, values).trimEnd()}

<main>

${read(`./src/pages/${page.body}.html`).trimEnd()}

</main>

${footer.trimEnd()}
${extras ? `\n${extras.trimEnd()}\n` : ""}
<script src="index.js?v=${VERSION}" defer></script>

</body>
</html>
`;

  const finished = page.notFound ? rootPaths(notFoundHead(html)) : relativePaths(html);
  writeFileSync(new URL(`./${page.output}`, import.meta.url), finished);
  console.log(`built ${page.output}`);
}
