const connection = require('../database/connection');

module.exports = {

    async index(req, res) {
        try {
            const list = await connection('game_category')
                .where({ is_deleted: false })
                .select('*')

            if (list.length === 0) {
                return res.json({ error: 'Nenhum registro armazenado' })
            } else {
                return res.json(list);
            }

        } catch (error) {
            return res.json(error);
        }
    },

    async uniqueIndex(req, res) {
        try {
            const { id } = req.params;

            const game = await connection('game')
                .where('id', id)
                .andWhere({ is_deleted: false })
                .select('title')
                .first()

            if (!game) {
                return res.json({ error: 'Jogo inexistente' })
            } else {
                const list = await connection('game_category')
                    .where('game_id', id)
                    .join('category', 'category.id', '=', 'game_category.category_id')
                    .select('name')

                return res.json(list);

            }
        } catch (error) {
            return res.json(error);
        }

    },

    async register(req, res) {
        try {
            const { game_id, category_id } = req.body;

            const game = await connection('game')
                .where('id', game_id)
                .where({is_deleted: false})
                .select('title')
                .first()

            const category = await connection('category')
                .where('id', category_id)
                .select('name')
                .first()

            if (!game) {
                return res.json({ error: 'Jogo Inexistente' })
            } else if (!category) {
                return res.json({ error: 'Categoria Inexistente' })
            } else {
                const [id] = await connection('game_category').insert({
                    game_id,
                    category_id
                })
                return res.json({ id });
            }

        } catch (error) {
            return res.json(error);
        }
    }
}