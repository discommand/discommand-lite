import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  PermissionResolvable,
} from 'discord.js'

export class Command {
  name: string = ''
  description: string = ''
  type?: ApplicationCommandType = ApplicationCommandType.ChatInput
  options?: ApplicationCommandOptionData[]
  defaultPermission?: PermissionResolvable
  execute(interaction: ChatInputCommandInteraction): void {}
}
