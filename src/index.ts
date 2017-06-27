import "reflect-metadata";
import { Application } from "./app/application";
import { myContainer } from "./inversify.config";

function main() {
  const app = myContainer.get(Application);
  app.start();
}

main();
