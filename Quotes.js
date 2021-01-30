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
        }

        let randNrfromArr = Math.floor(Math.random() * Math.floor( userQuotes.length ))

        return userQuotes[randNrfromArr];
    }

    // Get a quote from userID. Returns TRUE or FALSE
    static async add( guild, userId, quoteToAdd ) {

        // check if user is a guildmember
        const guildUser = await this.guildUserExist( guild, userId )
        if( guildUser === false ) {
            return 'User does not exist in guild'
        }
        
        // check if user has any quotes in the DB.
        let allQuotes = await this.getAll()
     
        // check if userId exist in DB // AKA has quotes
        if( allQuotes[userId] ) {
            let existingQuote = allQuotes[userId].quotes.filter(quote => quote == quoteToAdd )
            if(existingQuote.length > 0) {
                return false
            }

            // adds quote to the user array
            allQuotes[userId].quotes.push(quoteToAdd)
            
            // save updated array in database
            this.saveQuote(allQuotes)
            return true
        } else {
            // create the user object
            allQuotes[userId] = {
                quotes: [ quoteToAdd ]
            }

            this.saveQuote(allQuotes)
            return true
        }
    }

    
    // Get all records from database
    static getAll() {
        let data = JSON.parse(fs.readFileSync("guildQuotes.json"))
        return data;
    }

    // write to file
    static saveQuote(allQuotes) {
        fs.writeFileSync( 'guildQuotes.json', JSON.stringify( allQuotes ) )
    }
    
}
  
module.exports = Quotes