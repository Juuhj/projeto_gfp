import { BD } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'chave_api_gfp'


class rotasUsuarios{
    static async novoUsuario(req,res){
        const { nome, email, senha, tipo_acesso } = req.body;

        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        try{
            // const usuario = await BD.query(`
            //     INSERT INTO usuarios(nome, email, senha, tipo_acesso)
            //     VALUES($1, $2, $3, $4)      
            //     `, [nome, email, senhaCriptografada, tipo_acesso])

            // Se der errado comenta e tenta o de cima !-!
            const query = `INSERT INTO usuarios(nome, email, senha, k) VALUES($1, $2, $3, $4)`
            const valores = [nome, email, senhaCriptografada, tipo_acesso]
            const resposta = await BD.query(query, valores)

            res.status(201).json("Usuario Cadastrado")
        }catch(error){
            console.error('Erro ao criar usuário', error)
            res.status(500).json({message: 'Erro ao criar', error: error.message})
        }
    }
    static async login(req,res){
        const {email, senha} = req.body
        try{
            const resultado = await BD.query(
                `SELECT id_usuario, nome, email, senha FROM usuarios WHERE email = $1 and ativo = true`,[email]
            );
            if(resultado.rows.length === 0){
                return res.status(401).json({message: 'Email ou senha inválidos'})
            }
            const usuario = resultado.rows[0];
            const senhaValida = await bcrypt.compare(senha, usuario.senha)

            if(!senhaValida){
                return res.status(401).json('Email ou senha inválidos')
            }
            const token = jwt.sign(
                {id: usuario.id_usuario, nome: usuario.nome, email: usuario.email},
                SECRET_KEY,
                {expiresIn: '1h'}
            )

            return res.status(200).json({token,
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email,
                tipo_acesso: usuario.tipo_acesso})
        }catch(error){
            console.error('Erro ao realizar login:', error)
            return res.status(500).json({message: 'Erro ao realizar login', error: error.message})
        }
    }
    static async listarTodos(req, res){
        try{
            const resultado = await BD.query(`SELECT id_usuario, nome, email from usuarios`);
            res.json({usuarios: resultado.rows})
        }catch(error){
            res.status(500).json({message: 'Erro ao buscar usuários', error: error.message})
        }
    }
    static async consultaPorId(req,res){
        const {id} = req.params
        try{
            const usuario =  await BD.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
            res.status(200).json(usuario.rows[0])
        }catch(error){
            res.status(500).json({message: 'Erro ao consultar o usuario', error: error.message})
        }
    }
    static async atualizarTodosCampos(req, res) {
        const { id } = req.params;
        const { nome, email, senha, tipo_acesso } = req.body;
        try {
            const usuario = await BD.query(
                'UPDATE usuarios SET nome = $1, email = $2, senha = $3, tipo_acesso = $4 WHERE id_usuario = $5 RETURNING *',
                [nome, email, senha, tipo_acesso, id]
            );
            res.status(200).json(usuario.rows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar o usuário', error: error.message });
        }
    }
    static async atualizar(req,res){
        const {id} = req.params;
        const {nome, email, senha} = req.body;
        try{
            const campos = [];
            const valores = [];

            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome);
            }
            if(email !== undefined){
                campos.push(`email = $${valores.length + 1}`)
                valores.push(email)
            }
            if(senha !== undefined){
                campos.push(`senha = $${valores.length + 1}`)
                valores.push(senha);
            }
            if(campos.length === 0){
                return res.status(400).json({message: 'Nenhum campo fornecido para atualização'})
            }

            valores.push(id);
            
            // const query = `UPDATE usuarios SET ${campos.join(', ')} WHERE id_usuario = ${id} RETURNING *`;
            const query = `UPDATE usuarios SET ${campos.join(', ')} WHERE id_usuario = $${valores.length} RETURNING *`;

            const usuario = await BD.query(query, valores)

            if(usuario.rows.length === 0){
                return res.status(404).json({message: 'Usuário não encontrado'})
            }
            return res.status(200).json(usuario.rows[0]);
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar o usuario', error: error.message})
        }
    }
    static async desativar(req,res){
        const { id } = req.params;
        try{
            const usuario = await BD.query(
                'UPDATE usuarios set ativo = false where id_usuario = $1',[id])
                return res.status(200).json({message: 'Usuario desativada com sucesso'})
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar/dsativar o usuario', error: error.message})
        }
    }
    static async deletar(req,res){
        const { id } = req.params;
        try{
            const usuario = await BD.query(
                'DELETE FROM usuarios WHERE id_usuario = $1', [id])
                return res.status(200).json({message: "Usuario deletado com sucesso"})
        }catch(error){
            res.status(500).json({message:'Erro ao deletar usuario', error: error.message})
        }
    }

}
export function autenticarToken(req, res, next){
    const token = req.headers['authorization'];

    if(!token) return res.status(403).json({message: 'Token não fornecido'})
    
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, usuario) => {
        if(err) return res.status(403).json({message:'Token inválido'})

        req.usuario = usuario;
        next()
    })
}

export default rotasUsuarios;