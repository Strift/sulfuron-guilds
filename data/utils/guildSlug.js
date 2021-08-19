import { convert } from 'url-slug'

const dictionary = {
  ø: 'o'
}

export default function guildSlug (guildName) {
  return convert(guildName, { dictionary })
}
