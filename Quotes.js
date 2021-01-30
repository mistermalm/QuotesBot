const fs = require("fs")

class Quotes {

    static async get( guild, inputUserId ) {
        const guildUser = await this.guildUserExist( guild, inputUserId )
        if( guildUser === false ) {
            return 'User does not exist in guild'
        }

        return this.getRandomUserQuote( inputUserId )
    }

    // Check if user is a member of the guild.
    // RETURNS TRUE OR FALSE
    static async guildUserExist( guild, userId ) {
        let members = await guild.members.fetch()
        let foundUser = members.find( elem => elem.user.id == userId )
        if( foundUser ) {
            return true
        }
        return false
    }

    // Get a quote from userID
    static getRandomUserQuote( userId ) {
        let dbData = this.getAll()
        let userQuotes = dbData[userId].quotes
        //If user does not have quotes
        if( userQuotes.length <= 0 ) {
            return "No quotes Found"
        } else {
            var randNrfromArr = Math.floor(Math.random() * Math.floor( userQuotes.length ))
        }

        return userQuotes[randNrfromArr];
    }

    // Get a quote from userID. Returns TRUE or FALSE
    static async add( guild, userId, quoteToAdd ) {
        const guildUser = await this.guildUserExist( guild, userId )
        if( guildUser === false ) {
            return 'User does not exist in guild'
        }

        let allQuotes = getAll()
        // var data1 = JSON.parse(fs.readFileSync("guildQuotes.json"))
        // var userQuotesArr = data1[userId].quotes
        // //If user does not have quotes
        // if( userQuotesArr.length <= 0 ) {
        //     return "No quotes Found"
        // } else {
        //     var randNrfromArr = Math.floor(Math.random() * Math.floor( userQuotesArr.length ))
        // }

        return true;
    }
    
    // Get all records from database
    static getAll() {
        let data = JSON.parse(fs.readFileSync("guildQuotes.json"))
        return data;
    }
    
}
  
module.exports = Quotes