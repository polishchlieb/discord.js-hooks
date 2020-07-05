import { describe } from '../hooks/Event';
import 'colors';

export default () => {
    describe('ready');

    return () => {
        console.log('Bot is ready'.green);
    }
}