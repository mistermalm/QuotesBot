# Work with Python 3.6
import discord
import cursewords

TOKEN = 'ODAzOTM0MDIxODk2NzY1NDQw.YBE_5w.CMety3VrlJJJFSrIqWnB4skfgVg'

client = discord.Client()

@client.event
async def on_message(message):
    # we do not want the bot to reply to itself
    if message.author == client.user:
        return

    for word_reply_pair in cursewords.cursewords_and_answers:
        if word_reply_pair[0] in message.content:
            await message.channel.send(word_reply_pair[1])
            await message.delete() 

@client.event
async def on_ready():
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')
    print(cursewords.cursewords_and_answers)

client.run(TOKEN)