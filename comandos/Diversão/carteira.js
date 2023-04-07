const Discord = require("discord.js")
module.exports = {
    name: "carteira",
    description: "Acesse sua carteira.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        bot = client
        bot.channels.cache.get("1025461710833848340").messages.fetch("1025488589695488122").then(function (msg) {

            function emoji(id) { return client.emojis.cache.get(id).toString() };

            const players = [];
            const users = [];
            let novo = "";

            let txt = msg.content;
            const corte = txt.split("\n");
            let tam = corte.length

            function nick(nu) { return corte[nu].split(":")[0].split(")")[1] };
            function horario(nu) { return corte[nu].split(":")[1] };
            function add(nu) { return players.unshift([nick(nu), horario(nu)]); };
            function listar(nu) { return users.unshift(nick(nu)); };
            function userNick(nu) { return bot.guilds.cache.get("437463800883576853").members.cache.get(nu).user.username; };

            var c = 0;
            while (c < tam) {
                add(c)
                listar(c)
                c++;
            }
            const lista = new Map(players)

            if (lista.has(interaction.user.id)) {
                let credito = lista.get(interaction.user.id);
                const Embed = {
                    color: 0x2F3137,
                    author: {
                        name: interaction.user.username,
                        icon_url: interaction.user.displayAvatarURL(),
                    },
                    description: "**Carteira:**\n⠀⠀⠀" + emoji("933482636444315689") + " " + credito + " rubis",
                    image: { url: "https://cdn.discordapp.com/attachments/643938799826501643/934916884267155466/code.png" }
                }
                interaction.reply({ embeds: [Embed] })
            } else {
                interaction.reply("Você não possui uma carteira ainda. Infelizmente o comando de criação está desabilitado por um periodo.")
            }

        })
    }
}