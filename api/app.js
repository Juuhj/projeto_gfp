import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors'
import rotasUsuarios from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasSubCategorias from './routes/rotasSubCategorias.js';
import rotasLocalTransacao from './routes/rotasLocalTransacao.js';
import rotasTransacoes from './routes/rotasTransacoes.js';

const app = express()
testarConexao();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) =>{
    res.send('API Funcionando!')
})

// Rotas usuarios
// Todas estão funcionando perfeitamente
app.post('/usuarios', rotasUsuarios.novoUsuario)
app.post('/usuarios/login', rotasUsuarios.login)
app.get('/usuarios/listarTodos', rotasUsuarios.listarTodos)
app.get('/usuarios/:id', rotasUsuarios.consultaPorId)
app.put('/usuarios/atualizarTodos/:id', rotasUsuarios.atualizarTodosCampos)
app.patch('/usuarios/atualizar/:id', rotasUsuarios.atualizar)
app.patch('/usuarios/desativar/:id', rotasUsuarios.desativar)
app.delete('/usuarios/deletar/:id', rotasUsuarios.deletar)

// Rotas categorias
app.post('/categorias', rotasCategorias.novaCategoria)
app.get('/categorias/listarTodos', rotasCategorias.listarTodos)
// testar
app.get('/categorias/:id_categoria', rotasCategorias.consultarPorId)
app.put('/categorias/atualizarTodos/:id_categoria', rotasCategorias.atualizarTodosCampos)
app.patch('/categorias/atualizar/:id_categoria', rotasCategorias.atualizar)
app.patch('/categorias/desativar/:id_categoria', rotasCategorias.desativar)
app.patch('/categorias/reativar/:id_categoria', rotasCategorias.reativar)
app.delete('/categorias/deletar/:id_categoria', rotasCategorias.deletar)

// Rotas Subcategorias
// testar
app.post('/subcategorias', rotasSubCategorias.novaSubCategoria)
app.get('/subcategorias/listarTodos', rotasSubCategorias.listarTodos)
app.get('/subcategorias/:id_subcategoria', rotasSubCategorias.consultarPorId)
app.put('/subcategorias/atualizarTodos/:id_subcategoria', rotasSubCategorias.atualizarTodosCampos)
app.patch('/subcategorias/atualizar/:id_subcategoria', rotasSubCategorias.atualizar)
app.patch('/subcategorias/desativar/:id_subcategoria', rotasSubCategorias.desativar)
app.patch('/subcategorias/reativar/:id_subcategoria', rotasSubCategorias.reativar)
app.delete('/subcategorias/deletar/:id_subcategoria', rotasSubCategorias.deletar)

// Rotas Local_Transacao
// testar
app.post('/LocalTransacao', rotasLocalTransacao.novoLocalTransacao)
app.get('/LocalTransacao/listarTodos', rotasLocalTransacao.listarTodos)
app.get('/LocalTransacao/:id_local_transacao', rotasLocalTransacao.consultarPorId)
app.put('/LocalTransacao/atualizarTodos/:id_local_transacao', rotasLocalTransacao.atualizarTodosCampos)
app.patch('/LocalTransacao/atualizar/:id_local_transacao', rotasLocalTransacao.atualizar)
app.patch('/LocalTransacao/desativar/:id_local_transacao', rotasLocalTransacao.desativar)
app.patch('/LocalTransacao/reativar/:id_local_transacao', rotasLocalTransacao.reativar)
app.delete('/LocalTransacao/deletar/:id_local_transacao', rotasLocalTransacao.deletar)

// Rotas Transacoes
// testar
app.post('/Transacoes', rotasTransacoes.novaTransacao)
app.get('/Transacoes/listarTodos', rotasTransacoes.listarTodos)
app.get('/Transacoes/:id_transacao', rotasTransacoes.consultarPorId)
app.put('/Transacoes/atualizarTodos/:id_transacao', rotasTransacoes.atualizarTodosCampos)
app.patch('/Transacoes/atualizar/:id_transacao', rotasTransacoes.atualizar)
app.delete('/Transacoes/deletar/:id_transacao', rotasTransacoes.deletar)


const porta = 3000;
app.listen(porta, () =>{
    console.log(`Api http://localhost:${porta}`)
})
