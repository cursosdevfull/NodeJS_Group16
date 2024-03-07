/**
 * @openapi
 * /course:
 *    get:
 *      tags:
 *        - Course
 *      summary: Get all courses
 *      responses:
 *        200:
 *         description: Return all courses
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    courseId:
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
 *        - Course
 *      summary: Create course
 *
 * /course/{courseId}:
 *    put:
 *      tags:
 *        - Course
 *      summary: Update course
 *      parameters:
 *       - name: courseId
 *         in: path
 *         description: ID of course
 *         required: true
 *         schema:
 *          type: string
 *    delete:
 *      tags:
 *        - Course
 *      summary: Delete course
 *      parameters:
 *       - name: courseId
 *         in: path
 *         description: ID of course
 *         required: true
 *         schema:
 *          type: string
 *    get:
 *      tags:
 *        - Course
 *      summary: Get course by ID
 *      parameters:
 *       - name: courseId
 *         in: path
 *         description: ID of course
 *         required: true
 *         schema:
 *          type: string
 * /course/page/{page}/size/{pageSize}:
 *    get:
 *      tags:
 *        - Course
 *      summary: Get courses by page
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
