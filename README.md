# sulfuron-guilds

## Development

### Stack

- SVG icons from [heroicons](https://heroicons.com/)

### Setup

> Firebase Auth emulator doesn't work well,  at least not when trying to generate custom tokens with `firebase-admin`. 

```bash
firebase emulators:start --only  hosting,functions,database
```

## Deployment

```bash
# Build static files for production
yarn generate

# Deploy
yarn deploy
```