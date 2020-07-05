# discord.js-hooks
Yet another way to structure your Discord.js bot. Heavily inspired by React Hooks

## Installation
- Clone this repository
- Install the dependencies using `npm i`
- Provide bot's token in `config.json`
- Build using `npm run build`
- Run using `npm start`

## Command
```ts
import bot from '..';
import { Message } from 'discord.js'
import { describe } from '../hooks/Command';

export default () => {
    describe({
        names: ['commandname', 'command_name'],
        description: '',
        category: '',
        usage: ''
    });

    return (message: Message, args: string[]) => {
        // do something
    }
}
```

## Event
```ts
import { GuildMember } from 'discord.js';

export default () => {
    describe('guildMemberAdd');

    return (member: GuildMember) => {
        // do something
    }
}
```