# sulfuron-guilds

## Stack

- SVG icons from [heroicons](https://heroicons.com/)

## Development setup

> Firebase Auth emulator doesn't work well,  at least not when trying to generate custom tokens with `firebase-admin`. 

```bash
firebase emulators:start --only  hosting,functions,database
```