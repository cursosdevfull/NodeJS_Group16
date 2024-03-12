/**
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - Auth
 *      summary: Login
 *      requestBody:
 *        description: Email and password required to authentication
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Auth'
 *      responses:
 *        200:
 *         description: Return access token y el refresh token
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  accessToken:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJIaWRhbGdvIiwicm9sZXMiOlt7InJvbGVJZCI6MSwibmFtZSI6IkFETUlOIn0seyJyb2xlSWQiOjIsIm5hbWUiOiJPUEVSQVRPUiJ9XSwiaWF0IjoxNzEwMjAyNTU0LCJleHAiOjE3MTAyMDI4NTR9.44aq2W08i5JHjJHvEUdUUb6lxj_aScZILE0QrbBr1qU
 *                  refreshToken:
 *                    type: string
 *                    example: 1110ca7b-8e2b-4f88-a80d-c0dbc693101c
 * /auth/register:
 *    post:
 *      tags:
 *        - Auth
 *      summary: Register user
 *      requestBody:
 *        description: Information user required to register
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *         description: Return access token, el refresh token, secret y el qr code
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  accessToken:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJIaWRhbGdvIiwicm9sZXMiOlt7InJvbGVJZCI6MSwibmFtZSI6IkFETUlOIn0seyJyb2xlSWQiOjIsIm5hbWUiOiJPUEVSQVRPUiJ9XSwiaWF0IjoxNzEwMjAyNTU0LCJleHAiOjE3MTAyMDI4NTR9.44aq2W08i5JHjJHvEUdUUb6lxj_aScZILE0QrbBr1qU
 *                  refreshToken:
 *                    type: string
 *                    example: 1110ca7b-8e2b-4f88-a80d-c0dbc693101c
 *                  secret:
 *                    type: string
 *                    example: 1110ca7b-8e2b-4f88-a80d-c0dbc693101c
 *                  qrCode:
 *                    type: string
 *                    example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
 * /auth/get-new-access-token:
 *    post:
 *      tags:
 *        - Auth
 *      summary: Get new access token
 *      requestBody:
 *        description: Refresh token is required to get a new access token
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthGetNewAccessToken'
 *      responses:
 *        200:
 *         description: Return access token y el refresh token
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  accessToken:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJIaWRhbGdvIiwicm9sZXMiOlt7InJvbGVJZCI6MSwibmFtZSI6IkFETUlOIn0seyJyb2xlSWQiOjIsIm5hbWUiOiJPUEVSQVRPUiJ9XSwiaWF0IjoxNzEwMjAyNTU0LCJleHAiOjE3MTAyMDI4NTR9.44aq2W08i5JHjJHvEUdUUb6lxj_aScZILE0QrbBr1qU
 *                  refreshToken:
 *                    type: string
 *                    example: 1110ca7b-8e2b-4f88-a80d-c0dbc693101c
 * components:
 *   schemas:
 *     Auth:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          example: sergio@email.com
 *        password:
 *          type: string
 *          example: 12345
 *     AuthGetNewAccessToken:
 *      type: object
 *      properties:
 *        refreshToken:
 *          type: string
 *          example: b7212b5c-c7e0-4f8f-9be1-8295a4545630
 * /auth/enable-2fa:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Auth
 *      summary: Enable 2fa
 *      requestBody:
 *        description: Token and secret required to enable 2fa
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Enable2FA'
 *      responses:
 *        200:
 *         description: Return access token y el refresh token
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  accessToken:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJIaWRhbGdvIiwicm9sZXMiOlt7InJvbGVJZCI6MSwibmFtZSI6IkFETUlOIn0seyJyb2xlSWQiOjIsIm5hbWUiOiJPUEVSQVRPUiJ9XSwiaWF0IjoxNzEwMjAyNTU0LCJleHAiOjE3MTAyMDI4NTR9.44aq2W08i5JHjJHvEUdUUb6lxj_aScZILE0QrbBr1qU
 *                  refreshToken:
 *                    type: string
 *                    example: 1110ca7b-8e2b-4f88-a80d-c0dbc693101c
 * /auth/verify-2fa:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Auth
 *      summary: Verify 2fa
 *      requestBody:
 *        description: Verify token required by 2FA
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Verify2FA'
 *      responses:
 *        200:
 *         description: Return access token y el refresh token
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  accessToken:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJIaWRhbGdvIiwicm9sZXMiOlt7InJvbGVJZCI6MSwibmFtZSI6IkFETUlOIn0seyJyb2xlSWQiOjIsIm5hbWUiOiJPUEVSQVRPUiJ9XSwiaWF0IjoxNzEwMjAyNTU0LCJleHAiOjE3MTAyMDI4NTR9.44aq2W08i5JHjJHvEUdUUb6lxj_aScZILE0QrbBr1qU
 *                  refreshToken:
 *                    type: string
 *                    example: 1110ca7b-8e2b-4f88-a80d-c0dbc693101c
 */
