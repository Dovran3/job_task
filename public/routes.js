import {Router} from 'express'
import {body, validationResult} from 'express-validator'
import path from 'path'
import {set_token, admin_verify, client_verify, clean_cookie} from './utils.js'
import {get_user, registr_user} from './models.js'


export const router = Router()

const __dirname = `${path.resolve()}/public/templates/`

// --------------------GET HANDLERS-----------------------

router.get('/', clean_cookie, (req, res) => res.sendFile(__dirname + 'authentication.html'))

router.get('/registr', (req, res) => res.sendFile(__dirname + 'authorization.html'))

router.get('/admin', admin_verify, (req, res) => res.sendFile(__dirname + 'admin.html'))

router.get('/client', client_verify, (req, res) => res.sendFile(__dirname + 'client.html'))

// --------------------POST HANDLERS-----------------------
router.post('/', async (req, res) => {
  const email = req.body.email,
        password = req.body.password

  const result = await get_user(email)

  try {
    if (result.rows[0].password === password) {
      if (result.rows[0].isadmin === 'true') {
        res.cookie('token', set_token(result.rows[0].email))
        res.cookie('isAdmin', set_token(result.rows[0].password))
        return res.redirect(301, '/admin')
      } else {
        res.cookie('token', set_token(result.rows[0].email))
        return res.redirect(301, '/client')
      }
    } else return res.send('Incorrect password')
  } catch (err) {return res.send('This account is not in database')}
})

router.post('/registr',
  body('username').isLength({min: 3}).withMessage('Username must be greater than 3'),
  body('email').isEmail().normalizeEmail().withMessage('Please write correct email'),
  body('password').isLength({min: 6}).withMessage('Password must be greater than 6'),
  async (req, res) => {
    const errors = validationResult(req),
          messages = {}
    if (errors.array().length) {
      errors.array().forEach((item, i) => messages[i + 1] = item.msg)
      return res.send(JSON.stringify(messages))
    } else {
      const result = await registr_user({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
      })
      if (result.rows) return res.send('Successful created account')
      else return res.send(result)
    }
})
