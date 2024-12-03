import { z } from 'zod';
import { DATA } from '../data/char-count.mjs';

const schema = z.object({
    fields: z.array(z.string()).optional(),
});

export default ( /** @type {import('express').Router} */ router) => {
    /**
     * @swagger
     * /big-data:
     *   post:
     *     summary: Retrieve big data
     *     description: Returns data based on the provided fields. If no fields are provided, returns all data. The data weights around 4MB.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               fields:
     *                 type: array
     *                 items:
     *                   type: string
     *     responses:
     *       200:
     *         description: Successfully retrieved data
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *       400:
     *         description: Invalid request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    router.post('/big-data', (req, res) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json(result.error.format());
        }

        const { fields } = result.data;
        if (!fields || fields.length === 0) {
            return res.json(DATA);
        }

        const invalidFields = fields.filter(option => !DATA.hasOwnProperty(option));
        if (invalidFields.length > 0) {
            return res.status(400).json({ error: `Invalid fields: ${invalidFields.join(', ')}` });
        }

        const response = fields.reduce((acc, option) => {
            acc[option] = DATA[option];
            return acc;
        }, {});

        res.json(response);
    });

    /**
     * @swagger
     * /big-data/fields:
     *   get:
     *     summary: Get available data fields
     *     description: Returns a list of available data fields.
     *     responses:
     *       200:
     *         description: Successfully retrieved data fields
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: string
     */
    router.get('/big-data/fields', (req, res) => {
        res.json(Object.keys(DATA));
    });
};