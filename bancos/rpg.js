
bot.on('raw', async dados => {
    let raw_battle = "true";
    if (raw_battle == "true") {
      try {
        //
        if (dados.t !== 'MESSAGE_CREATE') return
        //if(dados.d.author.id !== '437462376271314954') return
  
        //
        let servidor = bot.guilds.cache.get(dados.d.guild_id);
        let logs = servidor.channels.cache.find(ch => ch.id === dados.d.channel_id);
  
        //
        var argu = dados.d.content;
        let comando = prefix + 'battle';
  
        if (!dados.d.content.startsWith(comando)) return
  
        let args = dados.d.content.slice(comando.length).split(/ +/);
  
        //
        var play1 = "false";
        var play2 = "false";
  
        //
        if (!args[1]) return logs.send("Mencione uma pessoa!");
        if (!dados.d.mentions[0]) return logs.send("Mencione uma pessoa!");
        logs.send("[AINDA EM BETA]\n> Player 1: " + dados.d.author.username + "\n> Player 2: " + dados.d.mentions[0].username + "\n" + "\nOs jogadores tem até 5 segundos para confirmar a partida.").then(msg => {
          msg.react('✅').then(r => {
  
            //Funções
            function filtro1(emoji) { return (reaction, user) => user.id === dados.d.author.id; };
            function filtro2(emoji) { return (reaction, user) => user.id === dados.d.mentions[0].id; };
            function coletor(filtro) { return msg.createReactionCollector((filtro), { time: 60000 }); };
  
            //Filtros
            const atacarFilter1 = filtro1('✅');
            const atacarFilter2 = filtro2('✅');
  
            //Coletores
            const atacar1 = coletor(atacarFilter1);
            const atacar2 = coletor(atacarFilter2);
  
            //Next
            atacar1.on('collect', r => {
              play1 = "true";
            })
            atacar2.on('collect', r => {
              play2 = "true";
            })
  
            setTimeout(() => {
              if (play1 == "true" && play2 == "true") {
  
                //Frases
                //=============
                let frase1 = "Turno: " + dados.d.author.username;
                let frase2 = "Turno: " + dados.d.mentions[0].username;
                let frase3 = "Um jogador acabou de desistir da batalha.";
  
                //
                var hp1 = 200;
                var hp2 = 200;
                var mp1 = 20;
                var mp2 = 20;
  
                //Turnos - Colocar no footer - Máximo de 4 turnos
                //=============
                let footerTodas = [frase1,
                  frase2,
                  frase1,
                  frase2,
                  frase1,
                  frase2,
                  frase1,
                  frase2];
                let footerContagem = 1;
  
                let digi1 = "http://vignette3.wikia.nocookie.net/digimon/images/5/56/Seraphimon_vg.gif";
                let digi2 = "http://img1.wikia.nocookie.net/__cb20110129011649/digimon/images/0/0a/MetalGarurumon_vg.gif";
  
                //Embeds
                //=============
                const EmbedInicio = {
                  color: 0xe20e0e,
                  image: {
                    url: digi1
                  },
                  thumbnail: {
                    url: digi2
                  },
                  footer: {
                    text: "HP1: " + hp1 + "       HP2: " + hp2 + "\nMP1: " + mp1 + "       MP2: " + mp2 + "\n" + "\n" + frase1
                  }
                }
                const EmbedPlayer1 = {
                  color: 0xe20e0e,
                  image: {
                    url: digi1
                  },
                  thumbnail: {
                    url: digi2
                  }
                }
                const EmbedPlayer2 = {
                  color: 0x1c65df,
                  image: {
                    url: digi2
                  },
                  thumbnail: {
                    url: digi1
                  }
                }
                const EmbedGanhador1 = {
                  color: 0x56ca47,
                  description: dados.d.author.username + " ganhou a batalha!"
                }
  
                const EmbedGanhador2 = {
                  color: 0x56ca47,
                  description: dados.d.mentions[0].username + " ganhou a batalha!"
                }
  
                //
  
                let EmbedTodas = [EmbedPlayer1,
                  EmbedPlayer2,
                  EmbedPlayer1,
                  EmbedPlayer2,
                  EmbedPlayer1,
                  EmbedPlayer2,
                  EmbedPlayer1,
                  EmbedPlayer2];
                let EmbedContagem = 1;
  
                //
                logs.send({ embed: EmbedInicio }).then(msg => {
                  msg.react('⚔️').then(r => {
                    //msg.react('🎒')
                    //msg.react('🏃')
  
                    //Funções
                    //function filtro(emoji) { return (reaction, user) => reaction.emoji.name === (emoji) && user.id === message.author.id; };
                    function filtro1(emoji) { return (reaction, user) => reaction.emoji.name === (emoji) && user.id === dados.d.author.id; };
                    function filtro2(emoji) { return (reaction, user) => reaction.emoji.name === (emoji) && user.id === dados.d.mentions[0].id; };
  
                    function coletor(filtro) { return msg.createReactionCollector((filtro), { time: 60000 }); };
  
                    //Filtros
                    const atacarFilter1 = filtro1('⚔️');
                    const atacarFilter2 = filtro2('⚔️');
                    //const mochilaFilter = filtro('🎒');
                    //const fugirFilter = filtro('🏃');
  
                    //Coletores
                    const atacar1 = coletor(atacarFilter1);
                    const atacar2 = coletor(atacarFilter2);
                    //const fugir = coletor(fugirFilter);
  
                    //Next
                    var turno = "1";
  
                    atacar1.on('collect', r => {
                      if (turno !== "1") return
                      turno = "2";
  
  
                      //
                      hp2 = hp2 - 50;
                      mp1 = mp1 - 5;
  
                      //Remover Reação
  
                      let usuario = dados.d.author.id;
                      let servidor = bot.guilds.cache.get(dados.d.guild_id);
                      let membro = servidor.members.cache.get(usuario);
  
                      let reaction = msg.reactions.cache.get('⚔️');
                      reaction.users.remove(membro);
  
                      //Mudar Footer
                      if (footerContagem === footerTodas.length) return;
                      footerContagem++;
  
                      //Mudar Embed
                      if (EmbedContagem === EmbedTodas.length) return;
                      EmbedContagem++;
  
                      EmbedPlayer2.footer = {
                        text: "HP1: " + hp1 + "       HP2: " + hp2 + "\nMP1: " + mp1 + "       MP2: " + mp2 + "\n" + "\n" + (footerTodas[footerContagem - 1])
                      };
  
                      msg.edit({ embed: (EmbedTodas[EmbedContagem - 1]) })
  
                      if (hp1 == "0" || hp2 == "0") return msg.reactions.removeAll() && msg.edit({ embed: EmbedGanhador1 });
                    })
  
  
                    //
                    atacar2.on('collect', r => {
                      if (turno !== "2") return
                      turno = "1";
  
  
                      //
                      hp2 = hp2 - 50;
                      mp1 = mp1 - 5;
  
                      //Remover Reação
  
                      let usuario = dados.d.mentions[0].id;
                      let servidor = bot.guilds.cache.get(dados.d.guild_id);
                      let membro = servidor.members.cache.get(usuario);
  
                      let reaction = msg.reactions.cache.get('⚔️');
                      reaction.users.remove(membro);
  
                      //Mudar Footer
                      if (footerContagem === footerTodas.length) return;
                      footerContagem++;
  
                      //Mudar Embed
                      if (EmbedContagem === EmbedTodas.length) return;
                      EmbedContagem++;
  
                      EmbedPlayer1.footer = {
                        text: "HP1: " + hp1 + "       HP2: " + hp2 + "\nMP1: " + mp1 + "       MP2: " + mp2 + "\n" + "\n" + (footerTodas[footerContagem - 1])
                      };
  
                      msg.edit({ embed: (EmbedTodas[EmbedContagem - 1]) })
                      if (hp1 == "0" || hp2 == "0") return msg.reactions.removeAll() && msg.edit({ embed: EmbedGanhador2 });
                    })
  
                    //
                  })
                })
  
                //
              }
            }, 5 * 1000);
            setTimeout(() => {
              if (play1 == "false" || play2 == "false") return logs.send("Jogadores não encontrados! Na próxima lembrem-se de confirmar antes do tempo acabar.")
            }, 5 * 1000);
  
          })
        })
      }
      catch (err) {
        console.log('Erro battle: ' + err.message);
      }
    }
  });