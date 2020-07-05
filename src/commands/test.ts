import { Message } from 'discord.js'
import { describe } from '../hooks/Command';

export default () => {
    describe({
        names: ['test'],
        description: 'Test command',
        category: 'test',
        usage: 'test'
    });

    return (message: Message) => {
        message.reply('test :flushed:');
    }
}