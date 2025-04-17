import { BD } from '../db.js'

class rotasSubCategorias{
    static async novaSubCategoria(req,res){
        const { nome, gasto_fixo, id_categoria } = req.body;

        if (!nome || !gasto_fixo === undefined || !id_categoria){
            return res.status(400).json({message: 'Campos obrigatórios não preenchidos'})
        }
        try{
            const query = `INSERT INTO subcategorias(nome, gasto_fixo, id_categoria) VALUES($1, $2, $3)`
            const valores = [nome, gasto_fixo, id_categoria]
            const resposta = await BD.query(query, valores)

            res.status(201).json("SubCategoria criada")
        }catch(error){
            console.error('Erro ao criar nova a SubCategoria', error);
            res.status(500).json({message: 'Erro ao criar nova SubCategoria', error: error.message})
        }
    }
    static async listarTodos(req, res){
        try{
            const resultado = await BD.query( `SELECT id_subcategoria, nome, gasto_fixo, id_categoria, ativo from subcategorias`)
            res.json({subcategorias: resultado.rows})
        }catch(error){
            res.status(500).json({message: 'Erro ao buscar SubCategorias', error: error.message})
        }
    }
    static async consultarPorId(req, res){
        const {id_subcategoria} = req.params
        try{
            const SubCategoria = await BD.query('SELECT * from subcategorias WHERE id_subcategoria = $1', [id_subcategoria])

            if (SubCategoria.rows.length === 0) {
                return res.status(404).json({ message: 'SubCategoria não encontrada' });
            }

            res.status(200).json(SubCategoria.rows[0])
        }catch(error){
            res.status(500).json({message: 'Erro ao consultar a SubCategoria', error: error.message})
        }
    }
    static async atualizarTodosCampos(req, res){
        const {id_subcategoria} = req.params
        const {nome, gasto_fixo, ativo, id_categoria} = req.body
        try{
            const SubCategoria = await BD.query(
                'UPDATE subcategorias SET nome = $1, gasto_fixo = $2, ativo = $3, id_categoria = $4 WHERE id_subcategoria = $5 RETURNING *',
                [nome, gasto_fixo, ativo, id_categoria, id_subcategoria]
            )
            if (SubCategoria.rows.length === 0) {
                return res.status(404).json({ message: 'SubCategoria não encontrada para atualização' });
            }

            // console.log('Subcategoria atualizada:', SubCategoria.rows[0])
            res.status(200).json(SubCategoria.rows[0]) 
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar a SUbCategoria', error: error.message})
        }
    }
    static async atualizar(req,res){
        const {id_subcategoria} = req.params
        const {nome, gasto_fixo} = req.body
        try{
            const campos = []
            const valores = []

            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome)
            }if(gasto_fixo !== undefined){
                campos.push(`gasto_fixo = $${valores.length + 1}`)
                valores.push(gasto_fixo)
            }

            valores.push(id_subcategoria)

            const query = `UPDATE subcategorias SET ${campos.join(', ')} WHERE id_subcategoria = $${valores.length} RETURNING *`;

            const SubCategoria = await BD.query(query, valores)

            if(SubCategoria.rows.length === 0){
                return res.status(404).json({message: 'SubCategoria não encontrada'})
            }
            res.status(200).json(SubCategoria.rows[0])
        }catch(error){
            res.status(500).json({message: 'Erro ao atualizar a SubCategoria', error: error.message})
        }
    }
    static async desativar(req, res) {
        const { id_subcategoria } = req.params;
        try {
            console.log(`Tentando desativar a subcategoria com id: ${id_subcategoria}`);
            
            const SubCategoria = await BD.query(
                'UPDATE subcategorias SET ativo = false WHERE id_subcategoria = $1 RETURNING *', [id_subcategoria]
            );
            
            if (SubCategoria.rows.length === 0) {
                return res.status(404).json({ message: "SubCategoria não encontrada" });
            }
    
            console.log('SubCategoria após desativação:', SubCategoria.rows[0]);
            return res.status(200).json({ message: "SubCategoria desativada com sucesso" });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao desativar a SubCategoria', error: error.message });
        }
    }
    static async reativar(req, res){
        const {id_subcategoria} = req.params
        try{
            const SubCategoria = await BD.query(
                'UPDATE subcategorias SET ativo = true WHERE id_subcategoria = $1', [id_subcategoria])
                return res.status(200).json({message: "Categoria reativada com sucesso"})
        }catch(error){
            res.status(500).json({message: 'Erro ao ativar a SubCategoria', error: error.message})
        }
    }
    static async deletar(req,res){
        const {id_subcategoria} = req.params
        try{
            const SubCategoria = await BD.query(
                'DELETE FROM subcategorias WHERE id_subcategoria = $1', [id_subcategoria])
                return res.status(200).json({message: "SubCategoria deletada com sucesso"})
        }catch(error){
            res.status(500).json({message: 'Erro ao deletar SubCategoria', error: error.message})
        }
    }
}

export default rotasSubCategorias;