const { default: makeWASocket, useMultiFileAuthState } = require('@adiwajshing/baileys');

const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Usando a função correta para a autenticação
const { state, saveState } = useMultiFileAuthState('./auth_info');

async function startBot() {
  const sock = makeWASocket({ auth: state });

  sock.ev.on('creds.update', saveState);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const contact = msg.key.remoteJid;

    console.log('Mensagem recebida:', text);

    // Processar mensagem (como adicionar etiquetas, etc)
  });

  app.listen(3000, () => {
    console.log('Bot rodando na porta 3000');
  });
}

startBot();
