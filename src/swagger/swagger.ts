import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  explorer: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Curso NodeJS",
      version: "1.0.0",
      description: "API documentation",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          in: "header",
        },
      },
    },
  },
  apis: ["./src/docs/*.doc.ts", "./dist/docs/*.doc.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Application, port: number) => {
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`Swagger running on http://localhost:${port}/docs`);
};

export { swaggerDocs };
