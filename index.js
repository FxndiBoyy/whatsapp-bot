const { default: makeWASocket, useSingleFileAuthState } = require('@adiwajshing/baileys');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
  const sock = makeWASocket({ auth: state });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const contact = msg.key.remoteJid;

    console.log('Mensagem recebida:', text);

    // Aqui você vai processar a mensagem e aplicar etiquetas, caso necessário
  });

  app.listen(3000, () => {
    console.log('Bot rodando na porta 3000');
  });
}

startBot();
