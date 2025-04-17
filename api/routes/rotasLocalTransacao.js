import { BD } from '../db.js'

class rotasLocalTransacao{
    static async novoLocalTransacao(req,res){
        const { nome, tipo_local, saldo } = req.body;

        if (!nome || !tipo_local || saldo === undefined){
            return res.status(400).json({message: 'Campos obrigatórios não preenchidos'})
        }
        try{
            const query = `INSERT INTO local_transacao(nome, tipo_local, saldo) VALUES($1, $2, $3)`
            const valores = [nome, tipo_local, saldo]
            const resposta = await BD.query(query, valores)

            res.status(201).json("local_transacao criado com sucesso")
        }catch(error){
            console.error('Erro ao criar novo local_transacao', error);
            res.status(500).json({message: 'Erro ao criar novo local_transacao', error: error.message})
        }
    }
    static async listarTodos(req, res){
        try{
            const resultado = await BD.query( `SELECT id_local_transacao, nome, tipo_local, saldo, ativo from local_transacao`)
            res.json({local_transacao: resultado.rows})
        }catch(error){
            res.status(500).json({message: 'Erro ao buscar local_transacao', error: error.message})
        }
    }
    static async consultarPorId(req, res){
        const {id_local_transacao} = req.params
        try{
            const LocalTransacao = await BD.query('SELECT * from local_transacao WHERE id_local_transacao = $1', [id_local_transacao])

            if (LocalTransacao.rows.length === 0) {
                return res.status(404).json({ message: 'local_transacao não encontrada' });
            }

            res.status(200).json(LocalTransacao.rows[0])
        }catch(error){
            res.status(500).json({message: 'Erro ao consultar a local_transacao', error: error.message})
        }
    }
    static async atualizarTodosCampos(req, res){
        const {id_local_transacao} = req.params
        const {nome, tipo_local, ativo, saldo} = req.body
        try{
            const LocalTransacao = await BD.query(
                'UPDATE local_transacao SET nome = $1, tipo_local = $2, ativo = $3, saldo = $4 WHERE id_local_transacao = $5 RETURNING *',
                [nome, tipo_local, ativo, saldo, id_local_transacao]
            )
            if (LocalTransacao.rows.length === 0) {
                return res.status(404).json({ message: 'local_transacao não encontrada para atualização' });
            }

            res.status(200).json(LocalTransacao.rows[0]) 
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar a local_transacao', error: error.message})
        }
    }
    static async atualizar(req,res){
        const {id_local_transacao} = req.params
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

            valores.push(id_local_transacao)

            const query = `UPDATE local_transacao SET ${campos.join(', ')} WHERE id_local_transacao = $${valores.length} RETURNING *`;

            const LocalTransacao = await BD.query(query, valores)

            if(LocalTransacao.rows.length === 0){
                return res.status(404).json({message: 'local_transacao não encontrada'})
            }
            res.status(200).json(LocalTransacao.rows[0])
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar a local_transacao', error: error.message})
        }
    }
    static async desativar(req, res) {
        const { id_local_transacao } = req.params;
        try {
            console.log(`Tentando desativar a local_transacao com id: ${id_local_transacao}`);
            
            const LocalTransacao = await BD.query(
                'UPDATE local_transacao SET ativo = false WHERE id_local_transacao = $1 RETURNING *', [id_local_transacao]
            );
            
            if (LocalTransacao.rows.length === 0) {
                return res.status(404).json({ message: "local_transacao não encontrada" });
            }
    
            console.log('Local de Transacao após desativação:', LocalTransacao.rows[0]);
            return res.status(200).json({ message: "local_transacao desativada com sucesso" });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao desativar a local_transacao', error: error.message });
        }
    }
    static async reativar(req, res){
        const {id_local_transacao} = req.params
        try{
            const LocalTransacao = await BD.query(
                'UPDATE local_transacao SET ativo = true WHERE id_local_transacao = $1', [id_local_transacao])
                return res.status(200).json({message:"local_transacao reativada com sucesso"})
        }catch(error){
            res.status(500).json({message: 'Erro ao ativar a local_transacao', error: error.message})
        }
    }
    static async deletar(req,res){
        const {id_local_transacao} = req.params
        try{
            const LocalTransacao = await BD.query(
                'DELETE FROM local_transacao WHERE id_local_transacao = $1', [id_local_transacao])
                return res.status(200).json({message: "local_transacao deletada com sucesso"})
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar local_transacao', error: error.message})
        }
    }
}

export default rotasLocalTransacao;