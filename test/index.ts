import { CommandHandler, LoadType } from '../dist'
import { Client, GatewayIntentBits } from 'discord.js'
import * as path from 'path'

const config = require('./config.json')
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})
const cmd = new CommandHandler(client, {
  loadType: LoadType.File,
  directory: path.join(__dirname, 'commands'),
})

const a = () => {
  cmd.reloadAll()
}

setTimeout(a, 15000)

cmd.loadAll()
client.login(config.token)
