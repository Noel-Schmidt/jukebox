import { Command } from "./command";
import { CommandHandler } from "./Handle/comand.handler";
import { Channel, Guild, Message, MessageEmbed, TextChannel, User } from "discord.js";

export class HelpCommand extends Command {

    private commandHandler: CommandHandler

    constructor(commandHandler: CommandHandler) {
        super("help", "Command with a Help Page")
        this.commandHandler = commandHandler;
    }

    execute(author: User, message: Message, channel: Channel, args: string[], guild: Guild | null) {
        const textChannel = <TextChannel>channel;

        textChannel.send(new MessageEmbed({
            title: 'Help - A list for help',
            description: '→ **help** - List you all commands.\n→ **skip** - Skip the current Song.\n→ **play** - Play a song from URL.\n→ **stop** - Stop the current Song.\n\n⭐ **Current Prefix**: * ⭐',
            color: "DARK_ORANGE",
        }));
    }
}
