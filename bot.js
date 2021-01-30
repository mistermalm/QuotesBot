const env = require( 'dotenv' )
const Discord = require( 'discord.js' )
const Quotes = require('./Quotes')
env.config()

// define client
const client = new Discord.Client()

// define guild
var guild

client.on( 'ready', async () => {
  console.log( `Logged in as ${client.user.tag}` )
  guild = await client.guilds.cache.get( process.env.GUILD_ID )
})

client.on( 'message', async ( msg ) => {

  if ( msg.author.bot ) return false
  if ( msg.content === 'ping' ) {
    msg.channel.send( 'pong' )
  }

  if ( msg.content.includes('-Quote ') ) {
    const input = msg.content.split( '-Quote ' )
    // find all numbers in the input using regex.
    let numbers = new RegExp('[^0-9]');
    // split up the string by numbers, to get the user id.

    const inputUserId = input[1].split(numbers).find( index => index )

    if(await Quotes.guildUserExist( guild, inputUserId) ) {
      // get the quote
      const theQuote = await doFunction( guild, inputUserId, input[1] )

      // send back the quote to the channel
      let userData = await getUserById( guild, inputUserId )
      msg.channel.send( theQuote + " - " + userData.user.username )
    } else {
      msg.channel.send( 'User was not found' )
    }
  }

})

async function doFunction( guild, inputUserId, functionName ) {
  let random = functionName.includes( 'random' )
  let add = functionName.includes( 'add' )

  if( random) {
    return await Quotes.get( guild, inputUserId )
  } else if( add ) {

    let split = functionName.split( " " )

    if( split[0].includes( "add") && split[1].includes( "<@") ) {

      let quoteStr = split.slice(2, split.length).join(' ')

      let quoteAdded = await Quotes.add( guild, inputUserId, quoteStr )

      if( quoteAdded ) {
        return "Quote was added"
      } else {
        return "Something went wrong..."
      }
    
    } else {
      return "wrong order pal"
    }
  }

}

async function getUserById( guild, userId ) {

  let guildMembers = await guild.members.fetch()

  let userData = guildMembers.find(user => user.id == userId );
  
  return userData
}

client.login( process.env.BOT_TOKEN )