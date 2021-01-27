# Work with Python 3.6
import discord
import cursewords
import strikes

TOKEN = 'ODAzOTM0MDIxODk2NzY1NDQw.YBE_5w.CMety3VrlJJJFSrIqWnB4skfgVg'

client = discord.Client()

def strike(id):
    if id in strikes.strikes:
        strikes.strikes[id] = strikes.strikes[id] + 1
    else:
        strikes.strikes[id] = 1

def check_warning(id):
    return True if strikes.strikes[id] > 4 else False

async def warn(message):
    await message.channel.send(f"<@{message.author.id}>, you have been warned. Clean up that dirty mouth of yours!")

@client.event
async def on_message(message):
    # we do not want the bot to reply to itself
    if message.author == client.user:
        return

    for word_reply_pair in cursewords.cursewords_and_answers:
        if word_reply_pair[0] in message.content:
            await message.channel.send(word_reply_pair[1])
            await message.delete()
            strike(message.author.id)
            if check_warning(message.author.id):
                await warn(message)
    
    if message.content.startswith("!strikes"):
        no_of_strikes = 0
        if message.author.id in strikes.strikes:
            no_of_strikes = strikes.strikes[message.author.id]
        await message.channel.send(f"<@{message.author.id}>, you have {no_of_strikes} strikes.")


    if message.content.startswith("!addCurse"):
        list = message.content.split()
        curse = list[1]
        reply = list[2:]
        listToStr = ' '.join([str(elem) for elem in reply]) 
        cursewords.cursewords_and_answers.append((curse, listToStr))
        await message.channel.send(f"Curse added! Word: {curse}, Reply: {listToStr}.")
        await message.delete()
    
    if message.content.startswith("!listCurses"):
        entry_string = "**List of Cursewords and Replies**\n"
        for entry in cursewords.cursewords_and_answers:
            entry_string = entry_string + "Word: " + entry[0] + ". Reply: " + entry[1] + "\n"
        await message.channel.send(entry_string)
        await message.delete()
            

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')
    print(cursewords.cursewords_and_answers)

client.run(TOKEN)