import { ChainTag, chainIds } from '../types'
import { node, secrets, types } from '../index'

export function networkGenerator() {
  const networks = {} as { [key: string]: Object }

  for (const name of Object.keys(chainIds) as ChainTag[]) {
    if (name === 'localhost') continue
    networks[name] = {
      url: node(name).rpc,
      accounts: secrets.chains[name].keys,
      tags: [types[name]],
      verify: {
        etherscan: {
          apiKey: secrets.chains[name].api,
        },
      },
    }
  }

  return networks
}
