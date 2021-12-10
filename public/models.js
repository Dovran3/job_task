import pg from 'pg'
const {Pool} = pg


const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'mydb',
  password: '2606',
  max: 500
});

export async function get_user(email) {
  try {
    const client = await pool.connect()
    return await client.query('SELECT * FROM users WHERE email = $1', [email])
    console.log(result.rows)
  } catch (err) {console.log(err)}
}

export async function registr_user(user) {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM users WHERE email = $1', [user.email])
    if (!result.rows[0]) {
      return await client.query('INSERT INTO users (username, email, password, isAdmin) VALUES ($1, $2, $3, $4)',
        [user.username, user.email, user.password, user.isAdmin])
    } else return 'This EMAIL is already in database'
  } catch (err) {console.log(err)}
}
