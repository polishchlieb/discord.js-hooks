import { Command, loadCommands } from './hooks/Command';
import { loadEvents } from './hooks/Event';
import { Client, ClientOptions } from 'discord.js';

export interface BotData extends ClientOptions {
    prefix: string;
    token: string;
}

export default class Bot extends Client {
    public commands: Command[] = [];

    public prefix: string;
    public token: string;

    constructor({ prefix, token, ...clientOptions }: BotData) {
        super(clientOptions);
        this.prefix = prefix;
        this.token = token;
    }

    public start() {
        loadEvents();
        loadCommands();

        this.login(this.token);
    }
}