"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const books_module_1 = require("./books/books.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    swagger_1.SwaggerModule.setup('/docs', app, (0, books_module_1.bookDocument)(app));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map