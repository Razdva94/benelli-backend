const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('6057333968:AAE5aqIiK_8gXwasTxutLY_tt7TENUXobSM', {
  polling: false,
});

const bot1 = new TelegramBot('6505517380:AAEv6oZgb37C9TfoNk0Q_4xnl2oRjxx70yo', {
  polling: false,
});

exports.sendMessage = (req, res) => {
  const {
    motoName, name, mobileNumber, message,
  } = req.body;
  console.log(motoName, name, mobileNumber, message);

  const chatId = '365760486';
  const chatId1 = '1057943364';

  const text = `Вы получили новое сообщение:
    Мотоцикл: ${motoName}
    Имя: ${name}
    Номер Телефона: ${mobileNumber}
    Сообщение: ${message}`;

  // Используйте Promise.all для одновременной отправки сообщений обоим ботам
  Promise.all([
    bot.sendMessage(chatId, text),
    bot1.sendMessage(chatId1, text),
  ])
    .then(() => {
      console.log('Сообщения успешно отправлены');
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      console.error('Ошибка отправки сообщений:', error);
      // Проверка, был ли уже отправлен ответ клиенту
      if (!res.headersSent) {
        res.status(500).json({ error: 'Ошибка отправки сообщений' });
      }
    });
};
