import bot from '..';
import { Message } from 'discord.js';
import { Command } from '../hooks/Command';
import { describe } from '../hooks/Event';

export default () => {
    describe('message');

    function handleUnknownCommand(message: Message) {
        message.react('❓');
    }

    function handleCommand(message: Message) {
        const args = message.content.substring(bot.prefix.length).split(' ');
        const name = args.shift();
        const command = bot.commands.find(
            (v: Command) => v.data.names.includes(name)
        );

        if (command) command.run(message, args);
        else handleUnknownCommand(message);
    }

    return (message: Message) => {
        if (message.author.bot)
            return;

        if (message.content.startsWith(bot.prefix))
            handleCommand(message);
    }
}