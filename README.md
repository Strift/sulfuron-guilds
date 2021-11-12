# Sulfuron guilds portal

🔗 [https://guildes.sulfuron.eu/](https://guildes.sulfuron.eu/)

## 🧰 Stack

- Dependencies management with [Yarn](https://yarnpkg.com/)
- Static site using [Nuxt](https://nuxtjs.org/)
- Hosting, Functions, Auth, and Firestore from [Firebase](https://firebase.google.com/)
- CSS utilities from [TailwindCSS](https://tailwindcss.com/)
- SVG icons from [heroicons](https://heroicons.com/)
- Testing with [Jest](https://jestjs.io/en/) and [Vue Test Utils](https://vue-test-utils.vuejs.org/) (with [Babel](https://babeljs.io/))
- Error monitoring with [Sentry](https://sentry.io)

**Node versions**

- Front-end website is built with Node.js v12.x (cf. [.nvmrc](.nvmrc))
- Firebase functions running on Node.js v12.x (cf. `engines.node` in [functions/package.json](functions/package.json))

## 🚧 Development setup

**Setting up the environment**

Copy the `.env.example` file as `.env` and edit its values. These environment variables are used by the Nuxt app at _build time_.

Copy the `functions/.runtimeconfig.example.json` file as `functions/.runtimeconfig.json` and edit its values. These environement variables are used by the Firebase Functions _at runtime_.

**Running the apps**

> ⚠️ As of today, Firebase Auth emulator encounters issues when trying to generate custom tokens with `firebase-admin`, so we're not using it in local. 

Install the project dependencies using the following command:

```bash
# Clone the repository
git clone https://github.com/Strift/sulfuron-guilds.git
# Install the dependencies
cd sulfuron-guilds
yarn
# Run the Nuxt app
yarn dev
# Run the Firebase emulators
yarn serve --only  hosting,functions,firestore
```

> ⚠️ Using the Firebase Auth emulator creates client-side errors that prevents proper rendering of the page in non-incognito mode. 🤔

## 🧪 Testing

Run the tests using the following command:

```bash
yarn test
```

> This commands just runs Jest, so you can use any Jest CLI flags like `--watch`. 

Tests that involves browser locale (to format dates) require `full-icu` to be installed.

## 🚀 Production

### Build

> `.env` file is not used for production build, all production values are currently hard-coded in `nuxt.config.js`.

Build the static website using the following command:

```bash
yarn generate
```

### Deployment

Deploy the project to firebase using the following command:

```bash
yarn deploy
```

When only deploying the Nuxt app, use the following command to decrease the deployment time:

```bash
yarn deploy --only hosting
```

When deploying the Firebase Functions, make sure to update the production runtime environment using when necessary.

```bash
firebase functions:config:set \
  hosting.app='https://guildes.sulfuron.eu/' \
  hosting.auth_function='https://us-central1-sulfuron-guilds.cloudfunctions.net/auth' \
  battlenet.client_secret='bnet app client secret code' \
  battlenet.client_id='bnet app client ID'
```