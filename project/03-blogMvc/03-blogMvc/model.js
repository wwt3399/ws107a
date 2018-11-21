const M = module.exports = {}

const posts = []

M.add = function (post) {
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
}

M.modify = function(post) {
  // let oldPost = posts[post.id]
  posts[post.id] = post
}

M.remove = function (id) {
  let post = posts[id]
  // posts.splice(id, 1)
  posts[id] = null
  return post
}

M.get = function (id) {
  return posts[id]
}

M.list = function () {
  return posts
}
