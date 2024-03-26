import { container } from "@container";
import { Router } from "express";

import { GenerateUrlPresignedController } from "./controller";

class GenerateUrlUploadRoutes {
  router: Router;
  controller: GenerateUrlPresignedController;

  constructor(controller: GenerateUrlPresignedController) {
    this.router = Router();
    this.controller = controller;
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.get(
      "/",
      this.controller.generateUrlPresigned.bind(this.controller)
    );
  }
}

const controller = container.get<GenerateUrlPresignedController>(
  "GenerateUrlPresignedController"
);

export default new GenerateUrlUploadRoutes(controller).router;
