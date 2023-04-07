const { prefix } = require('../config.json');
const wh = require("../webhooksv2.json");
const { ActivityType } = require('discord.js');

module.exports = async (client) => {
  //Status
  setInterval(() => {
    const status = [
      [{ name: `no Hierarquia!`, type: ActivityType.Playing }],
      [{ name: `ky!help┃ky!ajuda`, type: ActivityType.Watching }],
      [{ name: `em um servidor privado, ou em ${client.guilds.cache.size}!`, type: ActivityType.Playing }]
    ];
    client.user.setPresence({ activities: status[Math.floor(Math.random() * status.length)], status: 'online' });
  }, 15000);

  //Iniciação do Bot
  var hoje = new Date(),
    minuto = hoje.getMinutes(), hora = hoje.getHours(), dia = hoje.getDate(), mes = (hoje.getMonth() + 1), ano = hoje.getFullYear(),
    time = hora.toString().padStart(2, '0') + ":" + minuto.toString().padStart(2, '0'),
    data = dia.toString().padStart(2, '0') + "/" + mes.toString().padStart(2, '0') + "/" + ano.toString().padStart(2, '0');
  console.log("[LOG] --------------------------------------------------------");
  console.log(`[LOG] - ${client.user.username} está online! Estou acordado desde às ${time}h do dia ${data}!`);

  /*
  //Mudança de icon
  setInterval(() => {
    var hoje = new Date(),
      minuto = hoje.getMinutes(), hora = hoje.getHours(), dia = hoje.getDate(), mes = (hoje.getMonth() + 1), ano = hoje.getFullYear(),
      time = hora.toString().padStart(2, '0') + ":" + minuto.toString().padStart(2, '0'),
      data = dia.toString().padStart(2, '0') + "/" + mes.toString().padStart(2, '0') + "/" + ano.toString().padStart(2, '0');
    var rea_icon = "true"
    if (rea_icon == "true") {
      if (hora == "03") {
        bot.user.setAvatar(wh["wb_lol"][0].imagem);
        console.log("[LOG] - Foto de perfil alterada! Kyro - LoL as " + time + "-" + data);
      }
      if (hora == "06") {
        bot.user.setAvatar(wh["wb_fate"][0].imagem);
        console.log("[LOG] - Foto de perfil alterada! Kyro - Fate as " + time + "-" + data);
      }
      if (hora == "18") {
        bot.user.setAvatar(wh["wb_tft"][0].imagem);
        console.log("[LOG] - Foto de perfil alterada! Kyro - TFT as " + time + "-" + data);
      }
      if (hora == "21") {
        bot.user.setAvatar(wh["wb_wild"][0].imagem);
        console.log("[LOG] - Foto de perfil alterada! Kyro - WildRift as " + time + "-" + data);
      }
    }
  }, 1 * 1000 * 60 * 60);
  */
};