import {
  type LocalizationMap,
  type ApplicationCommandOptionData,
  type ApplicationCommandType,
  type ChatInputCommandInteraction,
  type PermissionResolvable,
} from 'discord.js'

export abstract class Command {
  name: string = ''
  nameLocalizations?: LocalizationMap
  description: string = ''
  descriptionLocalizations?: LocalizationMap
  type?: ApplicationCommandType
  options?: ApplicationCommandOptionData[]
  defaultPermission?: PermissionResolvable
  execute(interaction: ChatInputCommandInteraction): void {}
}
