var V = module.exports = {}

V.layout = function (title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 20px;
        font: 16px Helvetica, Arial;
      }
  
      h1 {
        font-size: 2em;
        color: #222222;
      }
  
      h2 {
        font-size: 1.4em;
        color: #666666;
      }
      
      h3 {
        font-size: 1.2em;
        color: #888888;
      }
  
      #posts {
        margin: 0;
        padding: 0;
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input,
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text] {
        /*width: 500px;*/
      }

      a, a:visited {
        color: #336699;
        text-decoration: none;
      }

      li { line-height: 160%; }
    </style>
  </head>
  <body>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

V.listUsers = function (users) {
  let list = []
  for (let user of Object.keys(users)) {
    list.push(`<li><a href="/${user}/posts">${user} 的留言板</a></li>`)
  }
  return V.layout(`所有留言板列表`, `<h1>所有留言板列表</h1>
    <a href="/login"><button>登入</button></a>
    <a href="/logout"><button>登出</button></a>
    <a href="/signup"><button>注册</button></a>
    <ol>${list.join('\n')}</ol>
  `)
}

V.showLogin = function () {
  return V.layout('登陆', `
  <h2>登陆</h2>
  <form action="/login" method="post">
    <p><input type="text" placeholder="User" name="user"></p>
    <p><input type="password" placeholder="Password" name="password"></textarea></p>
    <p><input type="submit" value="登陆"/></p>
  </form>
  `)
}

V.showSignup = function () {
  return V.layout('注册', `
  <h2>注册</h2>
  <form action="/signup" method="post">
    <p><input type="text" placeholder="账号" name="user"></p>
    <p><input type="email" placeholder="Email" name="email"></textarea></p>
    <p><input type="password" placeholder="输入密码" name="password"></textarea></p>
    <p><input type="password" placeholder="确认密码" name="password2"></textarea></p>
    <p><input type="submit" value="注册"/><input type="reset" value="清除"/></p>
  </form>
  `)
}

V.logout = function () {
  return V.layout('登出成功！', `回到 <a href="/">首頁！</a>`)
}

V.userLayout = function (user, title, content) {
  return V.layout(title, `<h1>${user} 的留言板</h1>\n` + content)
}

V.listPosts = function (user,posts,ctx) {
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
      <h2>${post.title}</h2>
      <p><a href="/${user}/post/${post.id}">讀取貼文</a></p>
    </li>
    `)
  }
  let content = ''
  if (user === ctx.session.user) {
    content += `<p><a href="/${user}/post/new"><button>創建新貼文</button></a></p>`
  }
  content += `
  <p>您總共有 <strong>${posts.length}</strong> 則貼文!</p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return V.userLayout(user, '貼文列表', content)
}

V.newPost = function (user) {
  return V.userLayout(user,'新增貼文', `
  <h2>新增貼文</h2>
  <p>創建一則新貼文</p>
  <form action="/${user}/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="Create"></p>
  </form> 
  `)
}

V.editPost = function (user,post) {
  return V.userLayout(user,'編輯貼文', `
  <h2>編輯貼文</h2>
  <form action="/${user}/modify/${post.id}" method="post">
    <p><input type="text" placeholder="title" name="title" value="${post.title}"></p>
    <p><textarea placeholder="body" name="body">${post.body}</textarea></p>
    <p><input type="submit" value="save"></p>
  </form>
  `)
}

V.showPost = function (user,post) {
  return V.userLayout(user,post.title, `
    <a href="/${user}/edit/${post.id}">編輯</a>
    <a href="/${user}/delete/${post.id}">删除</a>
    <h2>${post.title}</h2>
    <p>${post.body}</p>
  `)
}
