import Bot from './Bot';
import { token, prefix } from '../config.json';

const bot = new Bot({ token, prefix });
bot.start();

export default bot;