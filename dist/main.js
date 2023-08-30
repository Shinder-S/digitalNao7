"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('books library')
        .setDescription('Save a new book, see the complete list and reserve one of our books')
        .setVersion('1.0')
        .addServer('http://localhost:3000/api/v1')
        .addTag('books')
        .addTag('users')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.setGlobalPrefix('api/v1');
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map