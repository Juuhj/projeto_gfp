import { BD } from '../db.js'

class rotasCategorias{
    static async novaCategoria(req,res){
        const { nome, tipo_transacao, gasto_fixo, id_usuario } = req.body;

        if (!nome || !tipo_transacao || !gasto_fixo  || !id_usuario){
            return res.status(400).json({message: 'Campos obrigatórios não preenchidos'})
        }
        // if (!nome || !tipo_transacao || !gasto_fixo === undefined || !id_usuario){
        //     return res.status(400).json({message: 'Campos obrigatórios não preenchidos'})
        // }
        try{
            const query = `INSERT INTO categorias(nome, tipo_transacao, gasto_fixo, id_usuario) VALUES($1, $2, $3, $4)`
            const valores = [nome, tipo_transacao, gasto_fixo, id_usuario]
            const resposta = await BD.query(query, valores)

            res.status(201).json("Categoria criada")
        }catch(error){
            console.error('Erro ao criar nova a categoria', error);
            res.status(500).json({message: 'Erro ao criar nova categoria', error: error.message})
        }
    }
    static async listarTodos(req, res){
        try{
            const resultado = await BD.query( `SELECT id_categoria, nome, tipo_transacao, gasto_fixo, id_usuario from categorias`)
            res.json({categorias: resultado.rows})
        }catch(error){
            res.status(500).json({message: 'Erro ao buscar categorias', error: error.message})
        }
    }
    static async consultarPorId(req, res){
        const {id_categoria} = req.params
        try{
            const categoria = await BD.query('SELECT * from categorias WHERE id_categoria = $1', [id_categoria])

            if (categoria.rows.length === 0) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }

            res.status(200).json(categoria.rows[0])
        }catch(error){
            res.status(500).json({message: 'Erro ao consultar a categoria', error: error.message})
        }
    }
    static async atualizarTodosCampos(req, res){
        const {id_categoria} = req.params
        const {nome, tipo_transacao, gasto_fixo,  ativo, id_usuario} = req.body
        try{
            const categoria = await BD.query(
                'UPDATE categorias SET nome = $1, tipo_transacao = $2, gasto_fixo = $3, ativo = $4, id_usuario = $5 WHERE id_categoria = $6 RETURNING *',
                [nome, tipo_transacao, gasto_fixo, ativo, id_usuario, id_categoria]
            )
            res.status(200).json(categoria.rows[0])
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar a categoria', error: error.message})
        }
    }
    static async atualizar(req,res){
        const {id_categoria} = req.params
        const {nome, tipo_transacao, gasto_fixo} = req.body
        try{
            const campos = []
            const valores = []

            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome)
            }if(tipo_transacao !== undefined){
                campos.push(`tipo_transacao = $${valores.length + 1}`)
                valores.push(tipo_transacao)
            }if(gasto_fixo !== undefined){
                campos.push(`gasto_fixo = $${valores.length + 1}`)
                valores.push(gasto_fixo)
            }

            valores.push(id_categoria)

            const query = `UPDATE categorias SET ${campos.join(', ')} WHERE id_categoria = $${valores.length} RETURNING *`;

            const categoria = await BD.query(query, valores)

            if(categoria.rows.length === 0){
                return res.status(404).json({message: 'Categoria não encontrada'})
            }
            res.status(200).json(categoria.rows[0])
            // return res.status(200).json(categoria.rows[0])
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar a categoria', error: error.message})
        }
    }static async desativar(req, res){
        const {id_categoria} = req.params
        try{
            const categoria = await BD.query(
                'UPDATE categorias SET ativo = false WHERE id_categoria = $1', [id_categoria])
                return res.status(200).json({message: "Categoria desativada com sucesso"})
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar/desativar a categoria', error: error.message})
        }
    }
    static async reativar(req, res){
        const {id_categoria} = req.params
        try{
            const categoria = await BD.query(
                'UPDATE categorias SET ativo = true WHERE id_categoria = $1', [id_categoria])
                return res.status(200).json({message: "Categoria reativada com sucesso"})
        }catch(error){
            res.status(500).json({message: 'Erro ao ativar a categoria', error: error.message})
        }
    }
    static async deletar(req,res){
        const {id_categoria} = req.params
        try{
            const categoria = await BD.query(
                'DELETE FROM categorias WHERE id_categoria = $1', [id_categoria])
                return res.status(200).json({message: "Categoria deletada com sucesso"})
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar categoria', error: error.message})
        }
    }
}

export default rotasCategorias;