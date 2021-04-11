import { Command } from "./command";
import { CommandHandler } from "./Handle/comand.handler";
import { Channel, Guild, Message, MessageEmbed, TextChannel, User } from "discord.js";
import { application } from '../main'

export class NicknameCommand extends Command {
    private commandHandler: CommandHandler

    constructor(commandHandler: CommandHandler) {
        super("nickname", "Command to Change the Nickname of the Bot")
        this.commandHandler = commandHandler;
    }

    execute(author: User, message: Message, channel: Channel, args: string[], guild: Guild | null): void {
        const textChannel = <TextChannel>channel;

        if(args.length < 1) {
            textChannel.send(new MessageEmbed({
                title: 'Wrong usage',
                description: '**nickname <name>**',
                color: "DARK_ORANGE",
            }));
            return;
        }

        guild.me.setNickname(args[0]).then(res => {
            textChannel.send(new MessageEmbed({
                title: 'Nickname changed',
                description: `The nickname successfuly changed to **${res.nickname}**`,
                color: "DARK_ORANGE",
            }));
        });
    }
}
