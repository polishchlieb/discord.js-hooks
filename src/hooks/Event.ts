import { HookFunction } from './Hook';
import { ClientEvents } from 'discord.js';
import bot from '..';
import { join } from 'path';
import { readdirSync, lstatSync } from 'fs';

interface Event {
    run: (...args: any[]) => any;
    name: string;
}

const hookData: { name: string } = { name: '' };

export function describe(name: string): void {
    hookData.name = name;
}

type EventHookFunction = HookFunction<(...args: any[]) => any>;
function makeEvent(hook: EventHookFunction): Event {
    hookData.name = '';
    const run = hook();
    return { name: hookData.name, run };
}

function searchEvents(dirName: string): Event[] {
    const result: Event[] = [];
    readdirSync(dirName).forEach(file => {
        const path = join(dirName, file);
        if (lstatSync(path).isDirectory()) {
            result.push(...searchEvents(path));
        } else {
            result.push(makeEvent(require(path).default));
        }
    });
    return result;
}

export function loadEvents() {
    const events = searchEvents(join(__dirname, '../events'))
    events.forEach(event => {
        bot.on(<keyof ClientEvents>event.name, event.run);
    });

    console.log('Loaded '.green + String(events.length).cyan + ' events'.green);
}