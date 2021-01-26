const env = require( 'dotenv' )
const Discord = require( 'discord.js' )
env.config()

const client = new Discord.Client()
//const guild = new Discord.Guild()

client.on( 'ready', async () => {
  console.log( `Logged in as ${client.user.tag}` )
  let guild = client.guilds.cache.get( process.env.GUILD_ID )
  let members = await guild.members.fetch()
  
  let patten = members.filter( elem => elem.user.username == "Pstanizewski" )

  let patteMember
  patten.forEach( p => patteMember = p )

  let kickPatten = new Discord.GuildMember( client, patteMember, guild );
  // console.log(kickPatten)
  kickPatten.kick()

})

client.on( 'message', ( msg ) => {
  if ( msg.author.bot ) return false
  if ( msg.content === 'ping' ) {
    msg.channel.send( 'pong' )
  }
})

// client.guilds.map((i) => console.log(i))
client.login( process.env.BOT_TOKEN )
