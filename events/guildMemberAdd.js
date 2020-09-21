const moment = require('moment')
const Discord = require('discord.js')

/**
 * O evento guildMemberAdd é emitido após um membro entrar (ser adicionado em uma guild).
 */

module.exports = async (client, member) => {
  // Verificações anti-selfbot de divulgação já que estamos tendo problemas com isso.
  const daysSinceCreation = moment().diff(moment(member.user.createdAt), 'days')
  const isDefaultAvatar = member.user.displayAvatarURL.startsWith('https://discordapp.com/')
  const domaincount = member.user.username.match(/\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/)
  if (domaincount > 0 && (isDefaultAvatar || daysSinceCreation < 3)) return (() => { member.send('Olá! você foi kickado automaticamente por suspeita de divulgação em nosso servidor. Contas com menos de 3 dias no discord não podem ter domínios (exemplo twitter.com)').catch(); member.kick('Autokick: Selfbots não são bem vindos').catch() })()

  const message = new Discord.RichEmbed()
    .setThumbnail(member.user.displayAvatarURL)
    .setColor('RANDOM')
    .setAuthor('👋 Bem-vindo(a) a Liga dos Programadores!')
    .setTitle('Tire duvidas e compartilhe conhecimentos!')
    .setDescription(`${member}, vá em <#701166972003549244> e leia os tópicos.`)
    .setFooter('2020 Antartic Shop | Fivem criation • © Todos os direitos reservados.')
    .setTimestamp()

  const join = new Discord.RichEmbed()
    .setThumbnail(member.user.displayAvatarURL)
    .setColor('RANDOM')
    .setAuthor('✨ ANTARTTIC SHOP | FIVEM!')
    .setDescription(`:wave: Sabias que...

    Você é um novo membro aqui no servidor?
    
    :shield: Tag do Usuário:
    
    ${member}
    
    :name_badge: Precisas de ajuda?
    
    Caso tenhas alguma dúvida ou problema, abre um ticket em <#710400831639519283>
    
    :police_officer: Evita punições!
    
    Lê as nossas <#719594392020844645> para evitar ser punido no servidor!
    
    :tada: Sobre Nós
    
    Somos uma Loja de FiveM com diversos Produtos!`) 
    .setImage("https://cdn.discordapp.com/attachments/755512999393099917/755821384080293938/GIF_-_Antartic_RP_-_by_Design_Ideal.gif")                                                                      
    .setFooter('2020 Antartic Shop | Fivem criation • © Todos os direitos reservados.')
    .setTimestamp()

  member.guild.channels.get(process.env.JOINCHANNEL).send(join).catch()                         
  member.guild.channels.get(process.env.GREETCHANNEL).send(message).catch()
}
