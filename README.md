# Bryte-Dev-It

Personal portfolio for **Bright Wallan**: AI operator, product builder, market researcher.

Next.js 15 · TypeScript · Framer Motion · plain CSS. One page, static export.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in /out
```

## Edit content

Everything (copy, projects, links, contacts) lives in **`data/site.ts`**.

- **CV:** put the PDF in `public/cv/` and set `owner.cvUrl` to e.g. `"/cv/Bright-Wallan-CV.pdf"`.
- **Card backgrounds:** each card blurs a live screenshot of the project's site (via microlink.io). For a sharper or custom background, drop an image in `public/shots/` and set `shot: "/shots/callit.png"` on that project.
- **New project:** add an object to `products` or `experiments`.

## Deploy

Import the repo on Vercel. No env vars needed.
