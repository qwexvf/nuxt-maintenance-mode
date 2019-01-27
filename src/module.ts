import { createMiddleware } from './middleware'
import { toObject } from './utils/toObject'
import { ModuleOptions } from './types/nuxt';
import consola from 'consola'

function nuxtMaintenanceMode(this: any, moduleOptions: ModuleOptions) {
  const options = Object.assign(
    {},
    toObject(moduleOptions),
    this.options ? toObject(this.options.maintenance) : {}
  ) as ModuleOptions
  options.nuxt = this
  if (!options.enabled) {
    consola.info('Skip activation of maintenance mode plugin')
    return false
  }
  consola.info('Add maintenance mode plugin to server middleware')
  const middleware = createMiddleware(options)
  this.addServerMiddleware(middleware)
}

export default nuxtMaintenanceMode
module.exports.meta = require('../package.json')