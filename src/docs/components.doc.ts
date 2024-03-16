/**
 * @openapi
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
 *        recaptchaCode:
 *          type: string
 *          example: "03AGdBq24FJ8J4"
 *     AuthGetNewAccessToken:
 *      type: object
 *      properties:
 *        refreshToken:
 *          type: string
 *          example: b7212b5c-c7e0-4f8f-9be1-8295a4545630
 *     ErrorInputParameters:
 *      required:
 *       - name
 *       - message
 *       - status
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: "Error name"
 *        message:
 *          type: string
 *          example: "Error message"
 *        status:
 *          type: integer
 *          example: 411
 *        stack:
 *          type: string
 *          example: "Error stack"
 *     ErrorServer:
 *      required:
 *       - name
 *       - message
 *       - status
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: "Error name"
 *        message:
 *          type: string
 *          example: "Error message"
 *        status:
 *          type: integer
 *          example: 500
 *        stack:
 *          type: string
 *          example: "Error stack"
 *     ErrorNotFound:
 *      required:
 *       - name
 *       - message
 *       - status
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: "Error name"
 *        message:
 *          type: string
 *          example: "Error message"
 *        status:
 *          type: integer
 *          example: 404
 *        stack:
 *          type: string
 *          example: "Error stack"
 *     ErrorNotAuthorized:
 *      required:
 *       - name
 *       - message
 *       - status
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: "Error name"
 *        message:
 *          type: string
 *          example: "Error message"
 *        status:
 *          type: integer
 *          example: 401
 *        stack:
 *          type: string
 *          example: "Error stack"
 *     ErrorForbidden:
 *      required:
 *       - name
 *       - message
 *       - status
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: "Error name"
 *        message:
 *          type: string
 *          example: "Error message"
 *        status:
 *          type: integer
 *          example: 403
 *        stack:
 *          type: string
 *          example: "Error stack"
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
