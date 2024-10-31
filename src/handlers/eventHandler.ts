import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

export function loadEvents(client: Client) {
    const eventsPath = join(__dirname, '..', 'events');
    const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = join(eventsPath, file);
        const event = require(filePath).default;

        const eventName = file.split('.')[0];
        if (eventName === 'ready') {
            client.once(eventName, (...args) => event(client, ...args));
        } else {
            client.on(eventName, (...args) => event(client, ...args));
        }

        console.log(`Loaded event: ${eventName}`);
    }
}