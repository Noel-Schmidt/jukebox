import { Command } from "../command";
import { Channel, Guild, Message, User } from "discord.js";
import { ENVIRONMENT } from "../../main";

export class CommandHandler {

    private _commands: Array<Command>

    constructor() {
        this._commands = new Array()
    }

    registerCommand(command: Command): void {
        console.log(`${ENVIRONMENT.get('BOT_PREFIX')}Command ${command.name} registered`)
        this._commands.push(command)
    }

    unregisterCommand(command: string): void {
        this._commands = this._commands.filter(cmd => cmd.name != command)
    }

    handle(commandName: string, author: User, message: Message, channel: Channel, args: string[], guild: Guild | null): boolean {
        const command = this._commands.find(cmd => cmd.name == commandName)
        if(command) {
            message.delete()
            command.execute(author, message, channel, args, guild)
            return true
        }
        return false
    }

    get commands(): Array<Command> {
        return this._commands
    }

    toJson(obj: Object): Object {
        return JSON.stringify(obj)
    }
}
