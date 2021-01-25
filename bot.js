import Discord from 'discord.js'
import env from 'dotenv'
env.config()

const client = new Discord.Client()
// const guild = new Discord.Guild()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
  // let members = guild.members.cache.forEach((m) => console.log(m))
  let guild = client.guilds.cache.get(process.env.GUILD_ID)
  // guild.members.fetch({ force: true })
  console.log(guild.members)
  // guild.members.fetch()
})

client.on('message', (msg) => {
  if (msg.author.bot) return false
  if (msg.content === 'ping') {
    msg.channel.send('pong')
  }
})

// client.guilds.map((i) => console.log(i))
client.login(process.env.BOT_TOKEN)
