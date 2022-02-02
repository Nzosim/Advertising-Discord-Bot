const config = require('./config.json')
const Discord = require('discord.js'),
    client = new Discord.Client({
        fetchAllMembers: true,
        partials: ['MESSAGE', 'REACTION']
	})
client.login(config.token)

client.on('ready', async() => {
        client.user.setActivity('your advertisings', {type: 'WATCHING'})
        console.log('ready')
})

client.on('message', async (message) => {
    if(message.author.bot) return
    const mess = (await message.channel.messages.fetch({
        limit: 100,
        before: message.id,
    })).filter(a => a.author.id === config.bot_id).array();

    let embed = new Discord.MessageEmbed()
        .setThumbnail(config.image)
        .setTimestamp()
        .setFooter('Nzosim#0379')
        .setTitle(message.channel.guild.name)
        .setDescription(`${config.message[0]}\n${config.message[1]}\n${config.message[2]}`)

    let etre_channel_pub = false;
    for(let i = 0; i < config.pub_channel.length; i++){
        if(config.pub_channel[i] == message.channel.id) etre_channel_pub = true
    }

    if(etre_channel_pub){
        message.channel.bulkDelete(mess).catch(() => { })
        message.channel.send(embed);
    }
})