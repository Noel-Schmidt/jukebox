import { Client } from "discord.js"
import {CommandHandler} from "../Command/Handle/comand.handler";
import {HelpCommand} from "../Command/help.command";

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
    }

}
