# sulfuron-guilds

## Development

### Stack

- Static site using [Nuxt](https://nuxtjs.org/)
- Hosting, Functions, Auth, and Firestore from [Firebase](https://firebase.google.com/)
- SVG icons from [heroicons](https://heroicons.com/)

### Setup

> Firebase Auth emulator doesn't work well,  at least not when trying to generate custom tokens with `firebase-admin`. 

> Firebase Functions dev environment variables are set using the `.runtimeconfig.json` file. 

```bash
firebase emulators:start --only  hosting,functions,database
```

## Production

### Build

Copy the `.env.example` file as `.env` and edit its values. These environment variables are needed at build time. 

Build the static website using the following command:

```bash
yarn generate
```

### Deployment

> Firebase Functions production environment variables for Firebase Functions are set using `firebase functions:config:set`.

Deploy the project to firebase using the following command:

```bash
yarn deploy
```