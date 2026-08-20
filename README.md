# ShortLink Web

React 19 client for the ShortLink URL shortener. Also acts as the redirector: any unknown
path is resolved against the API and forwarded to its target.

## Setup

```sh
bun install
cp .env.example .env
bun run dev
```

Serves on `WEB_PORT` (default 3002, `strictPort`). The API must be running separately.

### Environment

| Variable        | Purpose                                                              |
| --------------- | -------------------------------------------------------------------- |
| `WEB_PORT`      | Dev and preview server port                                          |
| `VITE_API_URL`  | Base url of the ShortLink API                                        |
| `VITE_BASE_URL` | Public origin of this app, used to build the short links it displays |

`VITE_*` values are inlined at build time, so a production build is tied to the values
present when `bun run build` ran.

## Scripts

| Script                         | Does                        |
| ------------------------------ | --------------------------- |
| `bun run dev`                  | Dev server                  |
| `bun run build`                | Static build to `dist/`     |
| `bun run lint` / `bun run fmt` | oxlint (type-aware) / oxfmt |

## Routes

| Path                  | Page                                        |
| --------------------- | ------------------------------------------- |
| `/`                   | Landing / shorten form                      |
| `/register`, `/login` | Auth                                        |
| `/create`             | Create a short link                         |
| `/links`              | Manage owned links                          |
| `/profile`            | Account                                     |
| `*`                   | Redirect: resolves the path as a short code |

All pages are lazy-loaded under a shared root layout.

## Notes

- State: Redux Toolkit with `redux-persist`, gated behind `PersistGate`.
- UI: Base UI primitives, Tailwind 4, `tailwind-variants`, Iconify icon packs.
- QR codes: `lean-qr`.
- Deployed as static files behind Caddy with SPA fallback (`try_files {path} /index.html`);
  any host serving it needs the same fallback or the redirect route 404s.

## License

[MIT](LICENSE)
