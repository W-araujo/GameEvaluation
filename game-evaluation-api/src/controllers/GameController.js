const connection = require('../database/connection');

module.exports = {

    async index(req, res) {

        try {
            const list = await connection('game')
                .where({ is_deleted: false })
                .select('*');

            const [count] = await connection('game')
                .where({ is_deleted: false })
                .count();

            res.header('X-Total-Count', count['count(*)']);

            if (list.length === 0) {
                return res.json({ msg: 'Nenhum jogo cadastrado no momento :(' })
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

            const list = await connection('game')
                .where('id', id)
                .andWhere({ is_deleted: false })
                .select(
                    'title',
                    'description',
                    'year',
                    'creator',
                    'created_at',
                    'updated_at',
                    'is_deleted'
                )

            if (list.length === 0) {
                return res.json({ error: 'Jogo inexistente' })
            } else {
                return res.json(list);
            }

        } catch (error) {
            return res.json(error);
        }
    },

    async register(req, res) {

        try {
            const { title, description, year, creator } = req.body;

            const [id] = await connection('game').insert({
                title,
                description,
                year,
                creator
            })
            return res.status(201).json({ id });

        } catch (error) {
            return res.json(error);
        }

    },

    async update(req, res) {
        try {
            const { id } = req.params;

            const game = await connection('game')
                .where('id', id)
                .select('title')
                .first()

            if (!game) {
                res.status(401).json({ Error: 'Jogo inexistente' })
            } else {
                const { title, description, year, creator } = req.body;

                await connection('game')
                    .where('id', '=', id)
                    .update({ title: title, description: description, year: year, creator: creator })

                return res.json({ title, description, year, creator });
            }

        } catch (error) {
            return res.json(errors);
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;

            const game = await connection('game')
                .where('id', id)
                .select('title')
                .first()

            if (!game) {
                return res.status(401).json({ error: 'Jogo inexistente' })
            } else {

                await connection('game')
                    .where('id', '=', id)
                    .update({ is_deleted: true })

                return res.json({ msg: 'Jogo deletado com sucesso' })
            }

        } catch (error) {
            return res.json(error)
        }
    }
};