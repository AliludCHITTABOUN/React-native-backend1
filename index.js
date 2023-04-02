const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

const mysql = require('mysql')
const cors = require('cors')

const con = mysql.createConnection({
    host: '159.89.206.43',
    user: 'jack',
    password: '123456',
    database: 'wannabedev'
})

con.connect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) //kha t pen khaiy2 pa sa lao
app.use(cors())



app.get('/', (req, res) =>{
    res.send('Hello May Vi')
})

app.get('/getData', (req, res) => {
    con.query('SELECT * FROM user', (err, result) => {
        if (err) throw err

        res.send(result)
    }) 
})


app.get('/getUser', (req, res) => {
    const query = "SELECT id, email,  password  FROM user"
    const params = [] 

    con.query(query, params, (err, result) => {
        if (err) throw err

    res.send(result)
    })
})

// app.post('/login', (req, res) =>{
//     res.send('Login Success')
// })

app.post('/Login', (req, res) => {
    const {email, password} = req.body

    const query = "SELECT id FROM user WHERE email = ? AND password =? "
    const params = [email, password ]

    con.query(query, params, (err, result) => {
        if (err) throw err
        console.log(result)

        if(result.length > 0) {
            res.send('Login success')
        }
        else{
            res.send('Login Fail')
        }
    })
})

app.post('/register', (req, res) =>{
    const {email, password} = req.body

    const query = "INSERT INTO user (email, password) VALUES (?,?)"
    const params = [email, password ]

    con.query(query, params, (err) => {
        if (err) throw err
        res.send('Register success')
    })
})

app.put('/updateUser', (req, res) =>{

    const {email, password, id } = req.body
    
    const createUserQuery = "UPDATE user SET email = ? , password = ? WHERE id = ? "
    const paramas = [email, password, id ]

    con.query(createUserQuery, paramas, (err, result) => {
        if (err) throw err
        res.send('UpdateUser Success')
    })
})

app.delete('/deleteUser', (req, res) =>{
    const {id} = req.body
    
    const createUserQuery = "DELETE FROM user WHERE id = ?"
    const paramas = [id]

    con.query(createUserQuery, paramas, (err, result) => {
        if (err) throw err
        res.send('DeleteUser Success')
    })

})

app.listen(port)