import fs from 'fs'
import path from 'path'

const factoriesDirectory = path.resolve(__dirname, './factories')

// Retrieve factory functions in `~/test/factories` directory
const factories = fs
  .readdirSync(factoriesDirectory)
  .filter(filename => filename.endsWith('.js'))
  .map((filename) => {
    return {
      name: filename.slice(0, -3), // remove '.js'
      fakeFn: require(path.join(factoriesDirectory, filename)).default
    }
  })

export default function (vueComponent, props) {
  if (!vueComponent.name) {
    throw new Error('Cannot find factory file for component without name')
  }

  const factory = factories.find(({ name }) => name === vueComponent.name)

  if (!factory) {
    throw new Error(`No factory function defined for ${vueComponent.name}`)
  }
  return {
    ...factory.fakeFn(),
    ...props
  }
}
