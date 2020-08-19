const connection = require('../database/connection');

module.exports = {

    async index(req, res) {
        try {
            const list = await connection('category')
                .where({ is_deleted: false })
                .select('*')

                const [count] = await connection('category')
                .where({ is_deleted: false })
                .count();

                res.header('X-Total-Count', count['count(*)']);

            if (list.length === 0) {
                return res.json({ msg: 'Nenhuma categoria cadastrada no momento :(' })
            } else {
                return res.json(list);
            }

        } catch (error) {
            return res.json(error);
        }
    },

    async register(req, res) {

        try {
            const { name } = req.body;

            const [id] = await connection('category').insert({
                name
            })
            return res.json({ id });

        } catch (error) {
            return res.json(error);
        }

    },

    async delete(req, res) {

        try {
            const { id } = req.params;

            const category = await connection('category')
                .where('id', id)
                .select('name')
                .first()

            if (!category) {
                return res.status(404).json({ error: 'Categoria inexistente' })
            } else {
                await connection('category')
                    .where('id', id)
                    .select('name')
                    .update({ is_deleted: true })

                    return res.json({msg: 'Categoria deletada com sucesso'})
            }
        } catch (error) {
            return res.json(error);
        }
    }


}