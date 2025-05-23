import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors'
import rotasUsuarios, {autenticarToken} from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasSubCategorias from './routes/rotasSubCategorias.js';
import rotasContas from './routes/rotasContas.js';
import rotasTransacoes from './routes/rotasTransacoes.js';

import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js';

const app = express()
testarConexao();

app.use(cors());
app.use(express.json())

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) =>{
    res.redirect('/api-docs')
})

// Rotas usuarios
app.post('/usuarios', rotasUsuarios.novoUsuario)
app.post('/usuarios/login', rotasUsuarios.login)
app.get('/usuarios/listarTodos',autenticarToken, rotasUsuarios.listarTodos)
app.get('/usuarios/:id', rotasUsuarios.consultaPorId)
app.put('/usuarios/atualizarTodos/:id', autenticarToken, rotasUsuarios.atualizarTodosCampos)
app.patch('/usuarios/atualizar/:id', autenticarToken,  rotasUsuarios.atualizar)
app.patch('/usuarios/desativar/:id', autenticarToken, rotasUsuarios.desativar)
app.delete('/usuarios/deletar/:id', autenticarToken, rotasUsuarios.deletar)

// Rotas categorias
app.post('/categorias', rotasCategorias.novaCategoria)
app.get('/categorias',autenticarToken, rotasCategorias.listarTodos)
// app.get('/categorias/:id_categoria', rotasCategorias.consultarPorId)
// app.put('/categorias/atualizarTodos/:id_categoria', rotasCategorias.atualizarTodosCampos)
// app.patch('/categorias/atualizar/:id_categoria', rotasCategorias.atualizar)
app.delete('/categorias/desativar/:id_categoria', autenticarToken, rotasCategorias.desativar)
// app.patch('/categorias/reativar/:id_categoria', rotasCategorias.reativar)
// app.delete('/categorias/deletar/:id_categoria', rotasCategorias.deletar)
app.get('/categorias/filtrarCategorias', rotasCategorias.filtrarCategoria)

// Rotas Subcategorias
app.post('/subcategorias', rotasSubCategorias.novaSubCategoria)
app.get('/subcategorias/listarTodos', rotasSubCategorias.listarTodos)
// app.get('/subcategorias/:id_subcategoria', rotasSubCategorias.consultarPorId)
// app.put('/subcategorias/atualizarTodos/:id_subcategoria', rotasSubCategorias.atualizarTodosCampos)
// app.patch('/subcategorias/atualizar/:id_subcategoria', rotasSubCategorias.atualizar)
// app.patch('/subcategorias/desativar/:id_subcategoria', rotasSubCategorias.desativar)
// app.patch('/subcategorias/reativar/:id_subcategoria', rotasSubCategorias.reativar)
// app.delete('/subcategorias/deletar/:id_subcategoria', rotasSubCategorias.deletar)

// // Rotas Local_Conta
app.post('/contas', rotasContas.novaConta)
app.get('/contas', rotasContas.listarContas)
app.get('/contas/:id_conta', rotasContas.consultaPorId)
// // app.put('/contas/atualizarTodos/:id_conta', rotasContas.atualizarTodosCampos)
app.put('/contas/:id_conta', rotasContas.atualizarTodosCampos)
app.patch('/contas/:id_conta', rotasContas.atualizar)
app.delete('/contas/:id_conta', rotasContas.desativar);
// // app.patch('/contas/reativar/:id_conta', rotasContas.reativar)
// app.delete('/contas/deletar/:id_conta', rotasContas.deletar)
app.get('/contas/filtrarNome', rotasContas.filtrarNome)

// Rotas Transacoes
app.get('/transacao/filtroData', rotasTransacoes.filtrarPorData)
app.get('/transacao/somarTransacoes', rotasTransacoes.somarTransacoes)
app.get('/transacao/transacoesVencidas/:id_usuario', rotasTransacoes.transacoesVencidas)
// app.post('/Transacoes', rotasTransacoes.novaTransacao)
// app.get('/Transacoes/listarTodos', rotasTransacoes.listarTodos)
// app.get('/Transacoes/:id_transacao', rotasTransacoes.consultarPorId)
// app.put('/Transacoes/atualizarTodos/:id_transacao', rotasTransacoes.atualizarTodosCampos)
// app.patch('/Transacoes/atualizar/:id_transacao', rotasTransacoes.atualizar)
// app.delete('/Transacoes/deletar/:id_transacao', rotasTransacoes.deletar)


const porta = 3000;
app.listen(porta, () =>{
    console.log(`Api http://localhost:${porta}`)
})
