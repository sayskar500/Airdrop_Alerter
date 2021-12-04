const { MessageEmbed, WebhookClient } = require('discord.js');
const config = require('./config.json');
const ftch = require('node-fetch');

const webhookClient = new WebhookClient({ id: config.id, token: config.token });

const embed = new MessageEmbed().setTitle('NEW STAGE !').setColor('#0099ff');

var map = new Map();

export { map, webhookClient, config, ftch, MessageEmbed, WebhookClient, embed };