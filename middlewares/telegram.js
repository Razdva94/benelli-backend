const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('6170489957:AAHify6Q9CEAoT6YLCRXQ9ghUr7QzIl3fN0', {
  polling: false,
});
exports.sendMessage = (req, res) => {
  const {
    name, email, service, message,
  } = req.body;
  console.log(name, email, service, message);
  const chatId = '917943994';
  // eslint-disable-next-line no-sequences
  const text = `Вы получили новое сообщение:
  Имя: ${name}
  Email: ${email}
  Услуга: ${service}
  Сообщение: ${message}`;
  bot
    .sendMessage(chatId, text)
    .then(() => {
      console.log('Сообщение успешно отправлено');
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      console.error('Ошибка отправки сообщения:', error);
      res.status(500).json({ error: 'Ошибка отправки сообщения' });
    });
};
