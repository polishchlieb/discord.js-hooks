import { Message } from 'discord.js';
import { HookFunction } from './Hook';
import { readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import bot from '..';
import 'colors';

export interface CommandData {
    names: Array<string>;
    description: string;
    usage: string;
    category: string;
}

type CommandFunction = (message?: Message, args?: string[]) => any;
type CommandHookFunction = HookFunction<CommandFunction>;

export interface Command {
    data: CommandData;
    run: CommandFunction;
}

const hookData: CommandData = {
    names: [],
    description: '',
    usage: '',
    category: ''
};

export function describe(data: CommandData): void {
    Object.assign(hookData, data);
}

function makeCommand(hook: CommandHookFunction): Command {
    Object.assign(hookData, {
        names: [],
        description: '',
        usage: '',
        category: ''
    });

    const run = hook();

    return { data: { ...hookData }, run };
}

function searchCommands(dirName: string): Command[] {
    const result: Command[] = [];
    readdirSync(dirName).forEach(file => {
        const path = join(dirName, file);
        if (lstatSync(path).isDirectory())
            result.push(...searchCommands(path));
        else result.push(
            makeCommand(require(path).default)
        );
    });
    return result;
}

export function loadCommands(): void {
    bot.commands = searchCommands(
        join(__dirname, '../commands')
    );
    this.emit(<any>'commandsLoaded');
    console.log('Loaded '.green + String(bot.commands.length).cyan + ' commands'.green);
}