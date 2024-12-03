export default ( /** @type {import('express').Router} */ router) => {
    /**
     * @swagger
     * /health:
     *   get:
     *     summary: Returns a greeting message
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           text/plain:
     *             schema:
     *               type: string
     *               example: Hello World!
     */
    router.get('/health', (req, res) => {
        res.send('Hello World!');
    });
}