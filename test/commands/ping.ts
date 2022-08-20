import { Command } from '../../dist'
import { ChatInputCommandInteraction } from 'discord.js'

export default class extends Command {
  name = 'ping'
  description = 'pong'
  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply('Pong!')
  }
}
