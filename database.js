let users = [
  { _id: 0, name: 'user1', quotes: ['duude!', 'shet!', 'feck...'] },
  { _id: 1, name: 'user2', quotes: ['gg ez!', 'top5!', 'nice.'] },
  {
    _id: 2,
    name: 'user3',
    quotes: ['whats up!', 'wow..', 'lucky!'],
  },
  {
    _id: 3,
    name: 'user4',
    quotes: ['noob!', 'i hate this game!', 'hilfe!'],
  },
]

let servers = [
  {
    _id: 0,
    name: 'SlutBumWalla',
    users: [{ user_id: users[0]._id }, { user_id: users[1]._id }],
  },
  {
    _id: 1,
    name: 'Nerds Hangout',
    users: [{ user_id: users[2]._id }, { user_id: users[3]._id }],
  },
]
function userExist(userId) {
  if (users[userId]?._id) {
    return users[userId]
  } else {
    return undefined
  }
}

servers.map((server) => console.log(server))

function serverExist(serverId) {
  if (servers[serverId]?._id) {
    return servers[serverId]
  } else {
    return undefined
  }
}

let server = serverExist(0)
console.log(server)

export function findUser(userId) {
  let exist = userExist(userId)
  if (exist) {
    let found = SlutBumWalla.users.find((u) => u.user_id == exist._id)
    if (found) {
      return exist
    } else {
      return 'User is not on this Server'
    }
  } else {
    return '404 - User Not Found'
  }
}
