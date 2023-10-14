const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('6057333968:AAE5aqIiK_8gXwasTxutLY_tt7TENUXobSM', {
  polling: false,
});
exports.sendMessage = (req, res) => {
  const {
    motoName, name, mobileNumber, message,
  } = req.body;
  console.log(motoName, name, mobileNumber, message);
  const chatId = '365760486';
  // eslint-disable-next-line no-sequences
  const text = `Вы получили новое сообщение:
  Мотоцикл: ${motoName}
  Имя: ${name}
  Номер Телефона: ${mobileNumber}
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
