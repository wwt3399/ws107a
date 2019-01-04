const M = module.exports = {}

const db = {
  profile: {
    wwt: { password: '123'},
  },
  users: {
    wwt: {
      posts: [
        {id: 0, title: '今日运势', body: '今天也是糟糕的一天'},
        {id: 1, title: '今日用餐', body: '店里牛肉很好吃，这是今天最快乐的时光'},
      ]
    },
  }
}

M.listUsers = function () {
  return db.users
}

M.login = function (user, password) {
  const profile = db.profile[user]
  console.log('profile=', profile, 'password=', password)
  return (profile.password === password)
}

M.signup = function (user) {
  return db.profile[user] == null
}

M.addUser = function (passport) {
  db.profile[passport.user] = passport
  db.users[passport.user] = {posts: []}
}

M.userPosts = function (user) {
  const userTable = db.users[user] || {}
  const posts = userTable.posts
  if (posts == null) throw Error('M.userPosts: fail!')
  return posts
}

M.addPost = function (user,post) {
  const posts = M.userPosts(user)
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
}

M.modifyPost = function(user,post) {
  // let oldPost = posts[post.id]
  const posts = M.userPosts(user)
  posts[post.id] = post
}

M.removePost = function (user,id) {
  const posts = M.userPosts(user)
  let post = posts[id]
  // posts.splice(id, 1)
  posts[id] = null
  return post
}

M.getPost = function (user,id) {
  const posts = M.userPosts(user)
  return posts[id]
}

M.listPosts = function (user) {
  const posts = M.userPosts(user)
  return posts
}
