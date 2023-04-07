//    14/11/2022
//Básico
require('dotenv').config();
const fs = require('fs');
const { Client, Collection, GatewayIntentBits, ChannelType } = require('discord.js');
const { prefix, token, palavras } = require('./config.json');
const { WebhookClient } = require('discord.js');
const Discord = require("discord.js")
const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers]
});

//Modulos
bot = client
module.exports = client

//Requires
const st = require("./bancos/status.json");
const wh = require("./webhooksv2.json");
//Bancos
bot.raw = require("./bancos/raws.json");

//Funções
function emoji(id) { return bot.emojis.cache.get(id).toString() };

//Importar Evento
fs.readdir("./eventos/", (erro, files) => {

    if (erro) return console.error(erro);

    files.forEach((file) => {
        const evento = require(`./eventos/${file}`);
        let NomeEvento = file.split(".")[0];

        bot.on(NomeEvento, evento.bind(null, bot));
    });

});
//Extras
bot.on('messageCreate', message => {
    if (message.channel.id === '448988275336806421') {
        const Embed = {
            title: "Curtição",
            color: 0xb11c55,
            description: "Use diferentes emotes animados para o <#448988275336806421>\n```\nCurtição\nCurtidog\nCurtikirby\n```"
        }
        if (message.content === prefix + 'curtir' && st.status_curtir == "true") return message.channel.send({ embeds: [Embed] })
        if (message.content === prefix + 'curtir' && st.status_curtir !== "true") return message.reply("Comando em manutenção.");
        if (message.content === 'curtição' && st.status_curtir == "true") return message.channel.send(emoji("758678850644869150"));
        if (message.content === 'curtição' && st.status_curtir !== "true") message.reply("Comando em manutenção.");
        if (message.content === 'curtidog' && st.status_curtir == "true") return message.channel.send(emoji("780849850912210944"));
        if (message.content === 'curtidog' && st.status_curtir !== "true") return message.reply("Comando em manutenção.");
        if (message.content === 'curtikirby' && st.status_curtir == "true") return message.channel.send(emoji("718876272050176072"));
        if (message.content === 'curtikirby' && st.status_curtir !== "true") return message.reply("Comando em manutenção.");
    }
});
//Raw cargos
bot.on('raw', async dados => {
    if (st.raw_status_pokemon == "true") {
        if (dados.t !== 'MESSAGE_REACTION_ADD' && dados.t !== 'MESSAGE_REACTION_REMOVE') return
        if (!bot.raw[dados.d.message_id]) return
        let usuario = dados.d.user_id;
        let servidor = bot.guilds.cache.get(dados.d.guild_id);
        let membro = servidor.members.cache.get(usuario);
        let emote1 = bot.raw[dados.d.message_id][0].emote1
        let cargo1 = bot.raw[dados.d.message_id][0].cargo1
        let nome1 = bot.raw[dados.d.message_id][0].nome1
        let logs = bot.guilds.cache.get("437463800883576853").channels.cache.find(ch => ch.id === "786228920545968158");
        function pegarRole(id) { return servidor.roles.cache.get(id); };
        function verificarRole(cargo) { return membro.roles.cache.has(cargo); };
        function adicionarRole(id) { return membro.roles.add(id); };
        function removerRole(id) { return membro.roles.remove(id); };
        let cargo = pegarRole(cargo1);
        if (dados.t === 'MESSAGE_REACTION_ADD') {
            if (dados.d.emoji.id === emote1) {
                if (!membro.roles.cache.find(r => r.id === cargo1)) {
                    adicionarRole(cargo)
                    if (dados.d.guild_id === "437463800883576853") return logs.send("`[LOG]` " + emoji("699104583955513427") + " <@" + dados.d.user_id + "> `(" + dados.d.user_id + ")` acaba de ganhar o cargo " + nome1 + "!");
                    console.log("[LOG] - " + membro.user.username + " (" + dados.d.user_id + ") acaba de ganhar o cargo " + nome1 + "!");
                }
                if (membro.roles.cache.find(r => r.id === cargo1)) return
            }
        }
        if (dados.t === 'MESSAGE_REACTION_REMOVE') {
            if (dados.d.emoji.id === emote1) {
                if (membro.roles.cache.find(r => r.id === cargo1)) {
                    removerRole(cargo)
                    if (dados.d.guild_id === "437463800883576853") return logs.send("`[LOG]` " + emoji("699104583955513427") + " <@" + dados.d.user_id + "> `(" + dados.d.user_id + ")` acaba de perder o cargo " + nome1 + "!");
                    console.log("[LOG] - " + membro.user.username + " (" + dados.d.user_id + ") acaba de perder o cargo " + nome1 + "!");
                }
                if (!membro.roles.cache.find(r => r.id === cargo1)) return
            }
        }
    }
});

bot.on('raw', async mine => {
    if (mine.t !== 'MESSAGE_CREATE') return
    if (mine.d.channel_id != "990770515989901342") return
    if (mine.d.author.id != "725483868777611275") return

    try {
        //Relogio
        var hoje = new Date(),
            hora = hoje.getHours(), dia = hoje.getDate(), mes = (hoje.getMonth() + 1),
            data = dia.toString().padStart(2, '0') + "/" + mes.toString().padStart(2, '0');
        let time = hora.toString().padStart(2, '0');
        //Embed
        const EmbedMine = {
            color: 0x2F3137,
            title: "Hierarquia - Lista de players online",
            thumbnail: { url: "https://cdn.discordapp.com/attachments/678637048709775374/991265587265286214/unknown.png" },
            fields: [
                {
                    name: "⠀",
                    value: "⠀",
                },
                {
                    name: "⠀",
                    value: "⠀",
                }],
            footer: {
                text: bot.guilds.cache.get("437463800883576853").name,
                icon_url: bot.guilds.cache.get("437463800883576853").iconURL(),
            }
        }

        //Webhook
        const webhookClient = new WebhookClient({ id: "991267666620854324", token: "wjWIt8hK1yPxW5hZT9gZ3nrdCUb0Hs06nqrNOpbggyK8S4bbOWUxg5S2tE92wIW8yu9V" });
        //Regex
        const rgx_joined = /joined/g,
            rgx_left = /left/g,
            rgx_f = /:f>/g;
        //Tradução
        let dec = mine.d.embeds[0].description,
            tradOff = dec.replace(rgx_joined, "entrou").replace(rgx_left, "saiu às"),
            tradOn = dec.replace(rgx_joined, "entrou às"),
            textOff = tradOff.replace(rgx_f, ":t>"),
            textOn = tradOn.replace(rgx_f, ":t>");
        //Entrar dentro da Embed do Realmds On
        bot.channels.cache.get("929769385114083348").messages.fetch("1039832283064061993").then(function (Embed) {

            //Online
            if (mine.d.embeds[0].color == 9093705) {
                setTimeout(function () {
                    try {
                        EmbedMine.fields[0].name = "Agora: ``" + time + "h - " + data + "``";
                        EmbedMine.fields[0].value = textOn;
                        EmbedMine.fields[1].name = Embed.embeds[0].fields[1].name;
                        EmbedMine.fields[1].value = Embed.embeds[0].fields[1].value;
                        const main = async () => { webhookClient.editMessage('1039832283064061993', { embeds: [EmbedMine] }) }
                        main()
                    } catch (erro) {
                        console.log('[Erro] - Online MineRealms - Tem Player :' + erro.message)
                    }
                }, 0.5 * 1000 * 60)
            } else {
                setTimeout(function () {
                    try {
                        EmbedMine.fields[0].name = "Agora:";
                        EmbedMine.fields[0].value = "``Nenhum player online``";
                        EmbedMine.fields[1].name = Embed.embeds[0].fields[1].name;
                        EmbedMine.fields[1].value = Embed.embeds[0].fields[1].value;
                        const main = async () => { webhookClient.editMessage('1039832283064061993', { embeds: [EmbedMine] }) }
                        main()
                    } catch (erro) {
                        console.log('[Erro] - Online MineRealms - Não tem Player :' + erro.message)
                    }
                }, 0.5 * 1000 * 60)
            }

            //Offlines
            if (mine.d.embeds[0].color == 9807270) {
                //Dados
                let novo = "",
                    tem = Embed.embeds[0].fields[1].value.split("\n"),
                    tera = textOff.split("\n"),
                    tam = tem.length,
                    tamN = tera.length;
                const players = [],
                    users = [],
                    reverseTera = [];
                function nickTem(nu) { return tem[nu].split(":")[0] };
                function horarioTem(nu) { return tem[nu].split("`")[2].substring(1) };

                function nickTera(nu) { return reverseTera[nu].split(":")[0] };
                function horarioTera(nu) { return reverseTera[nu].split("`")[2].substring(1) };

                function add(nu) { return players.push([nickTem(nu), horarioTem(nu)]); };
                function listar(nu) { return users.push(nickTem(nu)); };
                function reverse(nu) { return reverseTera.unshift(tera[nu]); };

                var c = 0;
                while (c < tam) {
                    try {
                        add(c)
                        listar(c)
                        c++;
                    } catch (erro) {
                        console.log('[Erro] - Offline MineRealms - While c :' + erro.message)
                    }
                }
                const lista = new Map(players)

                var cr = 0;
                while (cr < tamN) {
                    try {
                        reverse(cr)
                        cr++;
                    } catch (erro) {
                        console.log('[Erro] - Offline MineRealms - While c :' + erro.message)
                    }
                }

                var c2 = 0;
                while (c2 < tamN) {
                    try {
                        if (lista.has(nickTera(c2))) {
                            lista.set(nickTera(c2), horarioTera(c2));
                            let pos = users.indexOf(nickTera(c2));
                            users.splice(pos, 1)
                            users.unshift(nickTera(c2))
                        } else {
                            lista.set(nickTera(c2), horarioTera(c2));
                            users.unshift(nickTera(c2))
                        }
                        c2++;
                    } catch (erro) {
                        console.log('[Erro] - Offline MineRealms - While c2 :' + erro.message)
                    }
                }

                var c3 = 0;
                while (c3 < users.length) {
                    try {
                        if (c3 < users.length - 1) {
                            novo += users[c3] + ":" + lista.get(users[c3]) + "\n";
                        } else {
                            novo += users[c3] + ":" + lista.get(users[c3]);
                        }
                        c3++;
                    } catch (erro) {
                        console.log('[Erro] - Offline MineRealms - While c3 :' + erro.message)
                    }
                }

                try {
                    EmbedMine.fields[1].name = "Últimos a entrar:";
                    EmbedMine.fields[1].value = novo;
                    EmbedMine.fields[0].name = Embed.embeds[0].fields[0].name;
                    EmbedMine.fields[0].value = Embed.embeds[0].fields[0].value;
                    const main = async () => { webhookClient.editMessage('1039832283064061993', { embeds: [EmbedMine] }) }
                    main()
                } catch (erro) {
                    console.log('[Erro] - Offline MineRealms - Adicionando Players :' + erro.message)
                }

            }
        })
    } catch (erro) {
        console.log('[Erro] - MineRealms : ' + erro.message)
    }
})

//Raw Painel
bot.on('raw', async dados => {

    //Pegar reação
    if (dados.t !== 'MESSAGE_REACTION_ADD' && dados.t !== 'MESSAGE_REACTION_REMOVE') return
    if (dados.d.message_id != "941743791277223976") return

    let usuario = dados.d.user_id;
    let servidor = bot.guilds.cache.get(dados.d.guild_id);
    let membro = servidor.members.cache.get(usuario);

    let emote = ["679543542204465156", "679543542024110208", "679543542259253262"];
    let emote2 = "679543542204465156";
    let emote3 = "679543542024110208";
    let emote4 = "679543542259253262";

    if (dados.t == 'MESSAGE_REACTION_ADD') {
        //Jogar ⚁ Duo
        //Jogar ⚂ Trio
        //Jogar ⚃ Squad
        if (dados.d.emoji.id == emote2) {
            try {
                let idcanal = membro.voice.channel.id;
                let canal = bot.guilds.cache.get(dados.d.guild_id).channels.cache.find(ch => ch.id === idcanal);
                canal.edit({ name: 'Jogar ⚁ Duo', userLimit: 2 });
            }
            catch (err) {
                console.log('Erro: ' + err.message)
            }
        } else if (dados.d.emoji.id == emote3) {
            try {
                let idcanal = membro.voice.channel.id;
                let canal = bot.guilds.cache.get(dados.d.guild_id).channels.cache.find(ch => ch.id === idcanal);
                canal.edit({ name: 'Jogar ⚂ Trio', userLimit: 3 });
            } catch (err) {
                console.log('Erro: ' + err.message)
            }
        } else if (dados.d.emoji.id == emote4) {
            try {
                let idcanal = membro.voice.channel.id;
                let canal = bot.guilds.cache.get(dados.d.guild_id).channels.cache.find(ch => ch.id === idcanal);
                canal.edit({ name: 'Jogar ⚃ Squad', userLimit: 4 });
            } catch (err) {
                console.log('Erro: ' + err.message)
            }
        }
    }
})

/*
//Criar Call
const voiceCollection = new Collection();

client.on('voiceStateUpdate', (oldUser, newUser) => {
    console.log(`voiceStateUpdate: ${oldState} | ${newState}`);
});

bot.on("voiceStateUpdate", async (oldState, newState) => {
    try {
        console.log(newState.id)
        const user = await bot.users.fetch(newState.id);
        const member = await newState.guild.members.fetch(user.id)

        if (!oldState.channel && newState.channel.id === '941301347251273749') {
            const channel = await newState.guild.channels.create("Jogar ⚁ Duo",{
                name:"Jogar ⚁ Duo",
                type: ChannelType.GuildVoice,
                parent: newState.channel.parent,
                userLimit: 2,
            });
            member.voice.setChannel(channel);
            voiceCollection.set(user.id, channel.id);
        } else if (!newState.channel) {
            if (oldState.channelId === voiceCollection.get(newState.id)) return oldState.channel.delete()
        }
        
    } catch (err) {
        console.log('Erro: ' + err.message)
    }
});
*/

//Webhooks Hierarquia
bot.on('messageCreate', async message => {
    let canalRecebe = "990042595642183690";
    if (message.channel.id === canalRecebe) {

        if (message.content.startsWith("@")) return

        let inicio = "https://twitter.com/";
        let regex = /(https?:\/\/)?(twitter\.(com))\/.+[a-z]\/status\/.+[0-9]/i;
        const link = regex.exec(message.content)[0];

        {
            let regex = /https:\/\/twitter.com/g;
            const fix = link.replace(regex, "https://d.fxtwitter.com/");

            let dados = link.substr(inicio.length);
            const arroba = dados.replace(/\/status\/.+[0-9]/i, '');
            const texto = message.content.replace(/(https?:\/\/)?(twitter\.(com))\/.+[a-z]\/status\/.+[0-9]/i, '');

            {
                const filtro = {
                    "newascaryan": ["nulo"], "LoLegendsBR": ["nulo"], "TFTBrasil": ["nulo"],
                    "WildRiftBR": ["rotação", "gratuita", "atualização", "balanceamento", "chega",
                        "chegando", "chegarão", "evento", "entrarem", "disponível"],
                    "craftminePortal": ["beta", "preview", "alerta", "saiu"]
                }, silence = ["#lolbrx", "torneios", "torneio",
                    "#prolegends", "qualificatória", "qualificatórias", "lcq", "#tftlcq",
                    "last chance qualifier", "campeonato"
                ], bancoTitulo = {
                    "newascaryan": "Ascaryan",
                    "LoLegendsBR": "League of Legends Brasil",
                    "TFTBrasil": "Teamfight Tactics Brasil",
                    "WildRiftBR": "League of Legends: Wild Rift Brasil",
                    "craftminePortal": "Minecraft Portal 🇧🇷"
                }, bancoFoto = {
                    "newascaryan": "https://pbs.twimg.com/profile_images/1521289464701673474/vJY_ve2A_400x400.jpg",
                    "LoLegendsBR": "https://pbs.twimg.com/profile_images/1611030494082174977/7E6hXMtO_400x400.png",
                    "TFTBrasil": "https://pbs.twimg.com/profile_images/1612848653693063168/vjLOsNzY_400x400.jpg",
                    "WildRiftBR": "https://pbs.twimg.com/profile_images/1613642751702179840/pn7nIDqs_400x400.jpg",
                    "craftminePortal": "https://pbs.twimg.com/profile_images/1612225060005109762/5yrC40Tr_400x400.jpg"
                }, banco = {
                    "newascaryan": "wb_lol", "LoLegendsBR": "wb_lol",
                    "TFTBrasil": "wb_tft", "WildRiftBR": "wb_wild", "craftminePortal": "wb_mine"
                };

                //Verificar no filtro
                let regex = RegExp(`\(${filtro[arroba].join("|")}\)`);
                if (regex.test(message.content.toLowerCase()) == true || filtro[arroba][0] == "nulo") {

                    //Silenciar palavras
                    let regex = RegExp(`\(${silence.join("|")}\)`);
                    if (regex.test(message.content.toLowerCase()) == true) return

                    //Conteúdo
                    let titulo = bancoTitulo[arroba], conteudo = '';
                    conteudo += "\n" + emoji("798488839068057600") + emoji("798488925328375819") + " **[NEWSFEED] - " + titulo + "**";
                    conteudo += "\n" + "[Ir para o Tweet](" + link + ")";
                    conteudo += "\n" + "";
                    {
                        /*
                        let nome = bancoTitulo[arroba] + " (@" + arroba + ")",
                            cont = texto,
                            image = fix,
                            thumb = bancoFoto[arroba], perfil = inicio + arroba;
                        const Embed = {
                            author: {
                                name: "Hierarquia",
                                icon_url: bot.guilds.cache.get("437463800883576853").iconURL(),
                            },
                            title: nome,
                            url: perfil,
                            thumbnail: {
                                url: thumb,
                            },
                            color: 0x00acee,
                            description: cont,
                            image: {
                                url: image,
                            },
                            timestamp: new Date().toISOString(),
                            footer: {
                                text: "Twitter",
                                icon_url: "https://images-ext-1.discordapp.net/external/bXJWV2Y_F3XSra_kEqIYXAAsI3m1meckfLhYuWzxIfI/https/abs.twimg.com/icons/apple-touch-icon-192x192.png",
                            }
                        }
                        */

                        //Enviar conteúdo
                        const webhookClient = new WebhookClient({ id: wh[banco[arroba]][0].id, token: wh[banco[arroba]][0].token });
                        await webhookClient.send({
                            content: conteudo,
                            //embeds: [Embed],
                            username: wh[banco[arroba]][0].nome,
                            avatarURL: wh[banco[arroba]][0].imagem,
                        })
                    }
                }
            }
        }
    }
});

//Webhooks Hierarquia - Game Desconto
bot.on('messageCreate', async message => {
    let canalRecebe = "824678068169736242";
    if (message.channel.id === canalRecebe) {

        try {
        let kk = message.content;

        const ll = kk.split("\n");
        let titulo = ll[0]
        let link = ll[1]


        const silence = [
            "itch.io",
            "indiegala",
            "games2gether",
            "gog"
        ]
        const regex = RegExp(`\(${silence.join("|")}\)`);
        if (regex.test(titulo.toLowerCase()) == true) return

        let corte1 = titulo.split("]");
        let nome = corte1[0].substr(3);

        let corte2 = corte1[1].split("(")[0].substr(1);

        let txt = '';
        txt += "\n" + emoji("1019338916261810196") + emoji("1019338951108075530") + " **[FREE] - " + corte2 + "**";
        txt += "\n" + "[Ir para " + nome + " Store](" + link + ")";

        //Webhook pro Kyro enviar a mensagem
        const webhookClient = new WebhookClient({ id: "1019300389486596106", token: "0X_EKd8eRsmzoXAi6vDuWvcDbqjYkazOd8_50UM7WMyxyqDhHkkhWo2-dESbs69Lmn2F" });
        await webhookClient.send({
            content: txt,
            username: "Kyro - Free Games",
            avatarURL: "https://cdn.discordapp.com/attachments/678637048709775374/1019330658948096011/Picsart_22-09-13_16-35-19-989.jpg",
        });
        } catch (erro) {
            console.log('[Erro] - index.js: 450 - ' + erro.message)
        }
    }
});
//Handler Slash Commands
client.on('interactionCreate', (interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd) return interaction.reply(`Error`);

        interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction)

    }
})
client.slashCommands = new Discord.Collection()
require('./handler')(client)

bot.login(token)