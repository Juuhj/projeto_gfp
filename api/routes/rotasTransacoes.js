import { BD } from '../db.js'

class rotasTransacoes{
    static async novoTransacao(req,res){
        const { valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual} = req.body;

        if (!nome || !tipo_local || saldo === undefined){
            return res.status(400).json({message: 'Campos obrigatórios não preenchidos'})
        }
        try{
            const query = `INSERT INTO transacoes(nome, tipo_local, saldo) VALUES($1, $2, $3)`
            const valores = [nome, tipo_local, saldo]
            const resposta = await BD.query(query, valores)

            res.status(201).json("transacao criada com sucesso")
        }catch(error){
            console.error('Erro ao criar nova transacao', error);
            res.status(500).json({message: 'Erro ao criar nova transacao', error: error.message})
        }
    }
    static async listarTodos(req, res){
        try{
            const resultado = await BD.query( `SELECT id_transacao, nome, tipo_local, saldo, ativo from transacoes`)
            res.json({local_transacao: resultado.rows})
        }catch(error){
            res.status(500).json({message: 'Erro ao buscar transacao', error: error.message})
        }
    }
    static async consultarPorId(req, res){
        const {id_transacao} = req.params
        try{
            const LocalTransacao = await BD.query('SELECT * from transacoes WHERE id_transacao = $1', [id_transacao])

            if (LocalTransacao.rows.length === 0) {
                return res.status(404).json({ message: 'transacao não encontrada' });
            }

            res.status(200).json(LocalTransacao.rows[0])
        }catch(error){
            res.status(500).json({message: 'Erro ao consultar a transacao', error: error.message})
        }
    }
    static async atualizarTodosCampos(req, res){
        const {id_transacao} = req.params
        const {nome, tipo_local, ativo, saldo} = req.body
        try{
            const LocalTransacao = await BD.query(
                'UPDATE transacoes SET nome = $1, tipo_local = $2, ativo = $3, saldo = $4 WHERE id_transacao = $5 RETURNING *',
                [nome, tipo_local, ativo, saldo, id_transacao]
            )
            if (LocalTransacao.rows.length === 0) {
                return res.status(404).json({ message: 'transacao não encontrada para atualização' });
            }

            res.status(200).json(LocalTransacao.rows[0]) 
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar a transacao', error: error.message})
        }
    }
    static async atualizar(req,res){
        const {id_transacao} = req.params
        const {nome, tipo_local, saldo} = req.body
        try{
            const campos = []
            const valores = []

            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome)
            }if(tipo_local !== undefined){
                campos.push(`tipo_local = $${valores.length + 1}`)
                valores.push(tipo_local)
            }
            if(saldo !== undefined){
                campos.push(`saldo = $${valores.length + 1}`)
                valores.push(saldo)
            }

            valores.push(id_transacao)

            const query = `UPDATE transacoes SET ${campos.join(', ')} WHERE id_transacao = $${valores.length} RETURNING *`;

            const LocalTransacao = await BD.query(query, valores)

            if(LocalTransacao.rows.length === 0){
                return res.status(404).json({message: 'transacao não encontrada'})
            }
            res.status(200).json(LocalTransacao.rows[0])
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar a transacao', error: error.message})
        }
    }
    static async deletar(req,res){
        const {id_transacao} = req.params
        try{
            const LocalTransacao = await BD.query(
                'DELETE FROM transacoes WHERE id_transacao = $1', [id_transacao])
                return res.status(200).json({message: "transacao deletada com sucesso"})
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar transacao', error: error.message})
        }
    }
}

export default rotasTransacoes;