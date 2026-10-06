# [lavask.in](https://lavask.in)

Built with [Angular](https://angular.dev) 22. Needs Node `^22.22.3`, `^24.15.0` or `>=26`.

## Development server

Run `npm start` for a dev server, then open `http://localhost:4200/`. It reloads when source files change.

## Code scaffolding

To make a new page, use `ng g c pages/name --type=page`. Add it to `src/app/app.routes.ts`.

To make a new generic component, use `ng g c components/name`.

Static files (images, the favicon) go in `public/` and are served from the site root, so `public/images/foo.png` is `/images/foo.png`.

## Tests

Run `npm test` for the [Vitest](https://vitest.dev) unit tests.

## Build and deploy

Run `npm run build` to build the project into `dist/browser/`.

Merging into `main` deploys to Firebase Hosting through GitHub Actions. Pull requests get a preview channel.
