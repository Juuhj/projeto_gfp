import { BD } from '../db.js'

class rotasTransacoes{
    static async novaTransacao(req,res){
        const { valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual} = req.body;

        // if (!valor || !descricao || !data_vencimento || !data_pagamento || !tipo_transacao || !id_conta || !id_categoria || !id_usuario || !num_parcelas || !parcela_atual){
        //     return res.status(400).json({message: 'Campos obrigatórios não preenchidos'})
        // }
        if ([valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_usuario, num_parcelas, parcela_atual].some(campo => campo === undefined)) {
            return res.status(400).json({message: 'Campos obrigatórios não preenchidos'})
        }        
        try{
            const query = `INSERT INTO transacoes(valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`
            const valores = [valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual]
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
        const {valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual} = req.body
        try{
            const LocalTransacao = await BD.query(
                'UPDATE transacoes SET valor = $1, descricao = $2, data_vencimento = $3, data_pagamento = $4, tipo_transacao = $5, id_conta = $6, id_categoria = $7, id_subcategoria = $8, id_usuario = $9, num_parcelas = $10, parcela_atual = $11 WHERE id_transacao = $12 RETURNING *',
                [valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual, id_transacao]
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
        const {valor, descricao, data_vencimento, data_pagamento, tipo_transacao, id_conta, id_categoria, id_subcategoria, id_usuario, num_parcelas, parcela_atual} = req.body
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
            if(id_conta !== undefined){
                campos.push(`id_conta = $${valores.length + 1}`)
                valores.push(id_conta)
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

    // Criar uma rota que permite filtrar transações por data de vencimento ou data de pagamento
    // Dentro de um intervalo específico
    static async filtrarPorData(req, res){
        const { data_inicio, data_fim, tipo_data } = req.query;

        let colunaData;
        if(tipo_data == 'vencimento'){
            colunaData = 'data_vencimento'
        }
        else if(tipo_data == 'pagamento'){
            colunaData = 'data_pagamento'
        }
        else{
            return res.status(400).json({
                message: "Tipo_data inválido, use vencimento ou pagamento"
            })
        }
        try{
            const query = `
                SELECT t.*, u.nome AS nome_usuario, ct.nome  
                FROM  transacoes AS t
                LEFT JOIN usuarios AS u ON t.id_usuario = u.id_usuario
                JOIN contas ct ON t.id_conta = ct.id_conta
                WHERE ${colunaData} BETWEEN $1 AND $2
                ORDER BY ${colunaData} ASC
            `
            const transacoes = await BD.query(query, [data_inicio, data_fim])

            res.status(200).json(transacoes.rows);
        }catch(error){
            console.error("Erro ao filtrar transação:", error);
            res.status(500).json({message: "Erro ao filtrar transação", error: error.message});
        }
    }
    // somando transações entrada ou saída

    static async somarTransacoes(req, res){
        const { tipo, id_usuario } = req.query;
        try{
            const tipoTransacao = tipo.toUpperCase();

            const query = `
                    SELECT SUM(valor) AS total
                    FROM transacoes
                    WHERE tipo_transacao = $1 AND id_usuario = $2
                `
            const resultado = await BD.query(query, [tipoTransacao, id_usuario]) 

            let total = resultado.rows[0].total
            if(total === null)
            {
                total = 0
            }
            res.status(200).json({total: parseFloat(total)})
        }catch(error){
            console.error("Erro ao somar transação:", error);
            res.status(500).json({message: "Erro ao somar transação", error: error.message});
        }
    }

    static async transacoesVencidas(req, res){
        const { id_usuario } = req.params;

        try{
            const query = `
                SELECT t.valor, t.data_transacao, t.data_vencimento, t.data_pagamento, 
                u.nome AS nome_usuario,
                c.nome AS nome_conta,
                ct.nome AS nome_categoria,
                sct.nome AS nome_subcategoria
                from transacoes AS t
                LEFT JOIN usuarios u ON t.id_usuario = u.id_usuario
                LEFT JOIN contas c ON t.id_conta = c.id_conta
                LEFT JOIN categorias ct ON t.id_categoria = ct.id_categoria
                LEFT JOIN subcategorias sct ON t.id_subcategoria = sct.id_subcategoria
                WHERE t.data_vencimento < CURRENT_DATE --filtra transacoes vencidas
                AND t.id_usuario = $1
                ORDER BY t.data_vencimento ASC 
            `
            const resultado = await BD.query(query, [id_usuario])

            // Função pra formatar data
            const formatarDataBr = (data) =>{
                if(!data) return null;
                return new Date(data).toLocaleDateString('pt-BR') // Converte a data no padrão BR
            }

            const dadosFormatados = resultado.rows.map(t =>({
                ...t, // Copia todas as propriedades originais da resultado para a t
                data_transacao: formatarDataBr(t.data_transacao),
                data_vencimento: formatarDataBr(t.data_vencimento),
                data_pagamento: formatarDataBr(t.data_pagamento)
            }))
            res.status(200).json(dadosFormatados);
        }catch(error){
            console.error("Erro ao buscar transações vencidas:", error);
            res.status(500).json({message: "Erro ao buscar transações vencidas", error: error.message});
        }
    }
}

export default rotasTransacoes;