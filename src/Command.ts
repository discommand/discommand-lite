import {
  type LocalizationMap,
  type ApplicationCommandOptionData,
  type ChatInputCommandInteraction,
  type ChatInputApplicationCommandData,
} from 'discord.js'

export abstract class Command implements ChatInputApplicationCommandData {
  name: string = ''
  nameLocalizations?: LocalizationMap
  description: string = ''
  descriptionLocalizations?: LocalizationMap
  options?: ApplicationCommandOptionData[]
  execute(interaction: ChatInputCommandInteraction): void {}
}
