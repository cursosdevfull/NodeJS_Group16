/**
 * @openapi
 * /user:
 *    get:
 *      tags:
 *        - User
 *      summary: Get all users
 *      responses:
 *        200:
 *         description: Return all users
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    userId:
 *                      type: string
 *                      example: 064e691e-1267-4959-9c93-5b57ce8bb708
 *                    title:
 *                      type: string
 *                      example: Microservicios con NestJS y Pulumi
 *                    slug:
 *                      type: string
 *                      example: microservicios-con-nestjs-y-pulumi
 *                    status:
 *                      type: string
 *                      example: published
 *    post:
 *      tags:
 *        - User
 *      summary: Create user
 *
 * /user/{userId}:
 *    put:
 *      tags:
 *        - User
 *      summary: Update user
 *      parameters:
 *       - name: userId
 *         in: path
 *         description: ID of user
 *         required: true
 *         schema:
 *          type: string
 *    delete:
 *      tags:
 *        - User
 *      summary: Delete user
 *      parameters:
 *       - name: userId
 *         in: path
 *         description: ID of user
 *         required: true
 *         schema:
 *          type: string
 *    get:
 *      tags:
 *        - User
 *      summary: Get user by ID
 *      parameters:
 *       - name: userId
 *         in: path
 *         description: ID of user
 *         required: true
 *         schema:
 *          type: string
 * /user/page/{page}/size/{pageSize}:
 *    get:
 *      tags:
 *        - User
 *      summary: Get users by page
 *      parameters:
 *       - name: page
 *         in: path
 *         description: Page to show
 *         required: true
 *         schema:
 *          type: number
 *       - name: pageSize
 *         in: path
 *         description: Page size
 *         required: true
 *         schema:
 *          type: number
 */
