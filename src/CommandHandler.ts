import { type Client, Collection, InteractionType } from 'discord.js'
import { readdirSync } from 'fs'
import { type Command, LoadType, type Options } from '.'

export class CommandHandler {
  public constructor(
    public readonly client: Client,
    public readonly options: Options
  ) {}

  public modules: Collection<string, Command> = new Collection()

  /**
   *
   * @private
   */
  private register(modules: Command) {
    console.info(`[discommand-lite] ${modules.name} is Loaded.`)
    this.modules.set(modules.name, modules)
    this.client.once('ready', () => {
      this.client.application?.commands.create(modules.toJSON())
    })
  }

  private deregister(module: Command, fileDir: string) {
    this.modules.delete(module.name)
    console.log(`[discommand-lite] ${module.name} is deloaded.`)
    delete require.cache[require.resolve(fileDir)]
  }

  public deloadAll() {
    const dir = readdirSync(this.options.directory, { withFileTypes: true })

    if (!this.options.loadType)
      dir.forEach(a => {
        if (a.isFile()) this.options.loadType = LoadType.File
        else if (a.isDirectory()) this.options.loadType = LoadType.Folder
      })

    if (this.options.loadType === LoadType.File) {
      for (const file of dir) {
        const tempModules = require(`${this.options.directory}/${file.name}`)
        let modules: Command
        if (!tempModules.default) {
          modules = new tempModules()
        } else {
          modules = new tempModules.default()
        }

        this.deregister(modules, `${this.options.directory}/${file.name}`)
      }
    } else if (this.options.loadType === LoadType.Folder) {
      for (const folder of dir) {
        const folderDir = readdirSync(
          `${this.options.directory}/${folder.name}`
        )
        for (const file of folderDir) {
          const tempModules = require(`${this.options.directory}/${folder.name}/${file}`)
          let modules: Command
          if (!tempModules.default) {
            modules = new tempModules()
          } else {
            modules = new tempModules.default()
          }
          this.deregister(modules, `${this.options.directory}/${file}`)
        }
      }
    }
  }

  public loadAll() {
    const dir = readdirSync(this.options.directory, { withFileTypes: true })

    if (!this.options.loadType)
      dir.forEach(a => {
        if (a.isFile()) this.options.loadType = LoadType.File
        else if (a.isDirectory()) this.options.loadType = LoadType.Folder
      })

    if (this.options.loadType === LoadType.File) {
      for (const file of dir) {
        const tempModules = require(`${this.options.directory}/${file.name}`)
        let modules
        if (!tempModules.default) {
          modules = new tempModules()
        } else {
          modules = new tempModules.default()
        }
        this.register(modules)
      }
    } else if (this.options.loadType === LoadType.Folder) {
      for (const folder of dir) {
        const folderDir = readdirSync(
          `${this.options.directory}/${folder.name}`
        )
        for (const file of folderDir) {
          const tempModules = require(`${this.options.directory}/${folder.name}/${file}`)
          let modules: Command
          if (!tempModules.default) {
            modules = new tempModules()
          } else {
            modules = new tempModules.default()
          }
          this.register(modules)
        }
      }
    }

    this.client.on('interactionCreate', async interaction => {
      if (interaction.type === InteractionType.ApplicationCommand) {
        if (interaction.isChatInputCommand()) {
          const command = this.modules.get(interaction.commandName)

          if (!command) return

          try {
            await command.execute(interaction)
          } catch (error) {
            console.error(error)
          }
        }
      }
    })
  }

  public reloadAll() {
    this.deloadAll()
    this.loadAll()
  }
}
