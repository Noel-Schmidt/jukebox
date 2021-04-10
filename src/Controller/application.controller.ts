import {Client, Message, MessageEmbed} from "discord.js"
import {CommandHandler} from "../Command/Handle/comand.handler";
import {HelpCommand} from "../Command/help.command";
import {ENVIRONMENT} from "../main";

export class ApplicationController {
    instance: Client;
    commandHandler: CommandHandler;

    constructor(APP_TOKEN: string) {
        this.instance = new Client({
            disableMentions: "everyone"
        });

        this.instance.on('ready', () => {
            console.log('=> Application Loaded');
        });

        this.instance.login(APP_TOKEN).then(res => {
            console.log("=> Discord API connected");
        })

        this.setup();
    }

    setup() {
        this.commandHandler = new CommandHandler();
        this.commandHandler.registerCommand(new HelpCommand(this.commandHandler));

        this.instance.on("message", (event: Message) => {
            const author = event.author
            const message = event.content
            const guild = event.guild
            const channel = event.channel

            if(message.includes(ENVIRONMENT.get('BOT_COMMAND_PREFIX'))) {
                var args: Array<string> = message.split(" ")
                if(args[0].startsWith(ENVIRONMENT.get('BOT_COMMAND_PREFIX'))) {
                    const cmd: string = args[0].replace(ENVIRONMENT.get('BOT_COMMAND_PREFIX'),"")
                    args = args.filter(str => str != ENVIRONMENT.get('BOT_COMMAND_PREFIX')+cmd)
                    if(!this.commandHandler.handle(cmd, author, event, channel, args, guild)) {
                        event.delete()
                        const messageEmbed = new MessageEmbed({
                            title: "Fehler",
                            description: "Dieser Command existiert nicht",
                            color: "RED"
                        })
                        channel.send(messageEmbed)
                    }
                }
            }
        });
    }

}
