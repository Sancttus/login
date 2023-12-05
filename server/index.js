

const express = require('express');
const cors = require('cors');
const app = express();



const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


app.use(express.json());
app.use(cors());
const bd = require('./database/bd');



app.get('/', (req, res)=>{
    res.send('Ola!');
});

//não precisa ser uma rota
app.get('/hash', (req, res)=>{
    bcrypt.hash('senha', 10, (err, hash)=>{
        if(err){
            return res.json({Error: 'error na criptografar a senha'});
        };

        const values = [
            hash
        ];

        return res.json({result:hash});
    });
});


/*
podemos fazer apenas
bcrypt.hash('senha', 10, (err, hash)=>{
    if(err){
        console.log('error na criptografar a senha');
    };

    console.log(hash);
})
*/

/*
esse metodo é apenas para verificar se o bando de dados esta funcionando
bd.connect((err)=>{
    if(err){
        console.log('Erro na conexão')
    }else{
        console.log('conetado')
    }
})
*/

app.post('/login', (req, res)=>{
 const sql = 'SELECT * FROM users WHERE email = ?';
 bd.query(sql, [req.body.email], (err, result)=>{
        if (err) {
        return res.json({Status: 'error', Error: 'erro na query do metodo login'})
    }

    if (result.length > 0) {       
        bcrypt.compare(req.body.senha.toString(), result[0].senha, (err, response)=>{
          
            if (err) {
                return res.json({Error:'senha invalida'})
            }

            if (response) {
          
                const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
                return res.json({Status: "Success", Token: token})

            }else{
                return res.json({Status:'error', Error:'email ou senha errado'})
            }
        })
    }else{
        return res.json({Status:'error', Error:'email ou senha errado'})
    }
 })
})



app.post('/register', (req, res) => {
    // Verificar se o e-mail já está cadastrado
    const emailCheckQuery = 'SELECT * FROM users WHERE email = ?';
    bd.query(emailCheckQuery, [req.body.email], (emailCheckErr, emailCheckResult) => {
        if (emailCheckErr) {
            return res.json({ Error: 'Erro na verificação de e-mail' });
        }

        if (emailCheckResult.length > 0) {
            // E-mail já cadastrado
            return res.json({ Status: 'Error', Error: 'E-mail já cadastrado' });
        }

        // Se o e-mail não estiver cadastrado, continue com o registro
        const insertQuery = 'INSERT INTO users (`nome`,`email`, `senha`) VALUES (?)';
        bcrypt.hash(req.body.senha.toString(), 10, (hashErr, hash) => {
            if (hashErr) {
                return res.json({ Error: 'Erro ao criptografar a senha' });
            }

            const values = [
                req.body.nome,
                req.body.email,
                hash
            ];

            bd.query(insertQuery, [values], (insertErr, result) => {
                if (insertErr) {
                    return res.json({ Error: 'Erro ao inserir usuário no banco de dados' });
                }

                return res.json({ Status: 'Success' });
            });
        });
    });
});



app.listen(8080, ()=>{
    console.log('servidor rodando...');
});