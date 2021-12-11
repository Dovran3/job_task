import jwt from 'jsonwebtoken'


const secret_key = '1hf82glq723njdff'

export function set_token(user) {
  return jwt.sign({data: user}, secret_key, {expiresIn: '1h'})
}

export function admin_verify(req, res, next) {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, secret_key, (err, result) => {
      if (err) return res.send('This token is not what I have given -_-')
      jwt.verify(req.cookies.isAdmin, secret_key, (err, result) => {
        if (err) return res.send('You dont have admin permission')
        next()
      })
    })
  } else return res.send('You are not authenticated')
}

export function client_verify(req, res, next) {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, secret_key, (err, result) => {
      if (err) return res.send('This token is not what I have given -_-')
      next()
    })
  } else return res.send('You are not authenticated')
}

export function clean_cookie(req, res, next) {
  if (req.cookies.token) res.clearCookie('token')
  if (req.cookies.isAdmin) res.clearCookie('isAdmin')
  next()
}
