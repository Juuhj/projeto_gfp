import { BD } from '../db.js'

class rotasTransacoes{
    static async novaTransacao(req,res){
        const { valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual} = req.body;

        // if (!valor || !descricao || !data_vencimento || !data_pagamento || !tipo_transacao || !id_local_transacao || !id_categoria || !id_usuario || !num_parcelas || !parcela_atual){
        //     return res.status(400).json({message: 'Campos obrigatórios não preenchidos'})
        // }
        if ([valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_usuario, num_parcelas, parcela_atual].some(campo => campo === undefined)) {
            return res.status(400).json({message: 'Campos obrigatórios não preenchidos'})
        }        
        try{
            const query = `INSERT INTO transacoes(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`
            const valores = [valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual]
            const resposta = await BD.query(query, valores)

            res.status(201).json("transacao criada com sucesso")
        }catch(error){
            console.error('Erro ao criar nova transacao', error);
            res.status(500).json({message: 'Erro ao criar nova transacao', error: error.message})
        }
    }
    static async listarTodos(req, res){
        try{
            const resultado = await BD.query( `SELECT * from transacoes`)
            res.json({resultado: resultado.rows})
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
        const {valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual} = req.body
        try{
            const LocalTransacao = await BD.query(
                'UPDATE transacoes SET valor = $1, descricao = $2, data_vencimento = $3, data_pagamento = $4, tipo_transacao = $5, id_local_transacao = $6, id_categoria = $7, id_subcategoria = $8, id_usuario = $9, num_parcelas = $10, parcela_atual = $11 WHERE id_transacao = $12 RETURNING *',
                [valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual, id_transacao]
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
        const {valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_local_transacao, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual} = req.body
        try{
            const campos = []
            const valores = []

            if(valor !== undefined){
                campos.push(`valor = $${valores.length + 1}`)
                valores.push(valor)
            }if(descricao !== undefined){
                campos.push(`descricao = $${valores.length + 1}`)
                valores.push(descricao)
            }
            if(data_vencimento !== undefined){
                campos.push(`data_vencimento = $${valores.length + 1}`)
                valores.push(data_vencimento)
            }
            if(data_pagamento !== undefined){
                campos.push(`data_pagamento = $${valores.length + 1}`)
                valores.push(data_pagamento)
            }
            if(tipo_transacao !== undefined){
                campos.push(`tipo_transacao = $${valores.length + 1}`)
                valores.push(tipo_transacao)
            }
            if(id_local_transacao !== undefined){
                campos.push(`id_local_transacao = $${valores.length + 1}`)
                valores.push(id_local_transacao)
            }
            if(id_categoria !== undefined){
                campos.push(`id_categoria = $${valores.length + 1}`)
                valores.push(id_categoria)
            }
            if(id_subcategoria !== undefined){
                campos.push(`id_subcategoria = $${valores.length + 1}`)
                valores.push(id_subcategoria)
            }
            if(id_usuario !== undefined){
                campos.push(`id_usuario = $${valores.length + 1}`)
                valores.push(id_usuario)
            }
            if(num_parcelas !== undefined){
                campos.push(`num_parcelas = $${valores.length + 1}`)
                valores.push(num_parcelas)
            }
            if(parcela_atual !== undefined){
                campos.push(`parcela_atual = $${valores.length + 1}`)
                valores.push(parcela_atual)
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