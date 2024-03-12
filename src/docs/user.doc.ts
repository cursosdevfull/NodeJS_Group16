/**
 * @openapi
 * /user:
 *    get:
 *      security:
 *        - bearerAuth: []
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
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - User
 *      summary: Create user
 *      requestBody:
 *        description: Information user required to create
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *
 * /user/{userId}:
 *    put:
 *      security:
 *        - bearerAuth: []
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
 *      security:
 *        - bearerAuth: []
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
 *      security:
 *        - bearerAuth: []
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
 *      security:
 *        - bearerAuth: []
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
 * components:
 *   schemas:
 *     User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: Sergio
 *        lastname:
 *          type: string
 *          example: Hidalgo
 *        email:
 *          type: string
 *          example: sergio@email.com
 *        password:
 *          type: string
 *          example: 12345
 *        roles:
 *          type: array
 *          items:
 *             $ref: '#/components/schemas/Role'
 *     Role:
 *      type: object
 *      properties:
 *        roleId:
 *          type: integer
 *          example: 1
 *     Enable2FA:
 *      type: object
 *      properties:
 *        token:
 *          type: integer
 *          example: 452578
 *        secret:
 *          type: string
 *          example: secret
 *     Verify2FA:
 *      type: object
 *      properties:
 *        token:
 *          type: integer
 *          example: 452578
 */
