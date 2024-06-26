import { SwaggerService } from "../service/SwaggerService";

const swagger = new SwaggerService({
    title: "Api Flow",
    description: "Api Flow",
});
const swaggerSecurity = swagger.createSecurity();
swaggerSecurity.add({
    bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
        name: "authorization",
    },
});
swaggerSecurity.add({
    cookieAuth: { type: "apiKey", in: "cookie", name: "refresh_token" },
});
swagger.addComponents(swaggerSecurity);

let swaggerPath = swagger.createPath("/");
swaggerPath.get().setTags("root");
swaggerPath.get().setSummary("Check API Service status");
swaggerPath.get().operationId("checkStatus");

swaggerPath.get().addSecurity([{ bearerAuth: [] }]);
swaggerPath.get().responses({
    code: 200,
    description: "description",
    content: {
        properties: {
            message: { type: "string" },
        },
        example: {
            message: "This API Service is currently running",
        },
    },
});

swagger.addPath(swaggerPath);

export const swaggerDocument = swagger.getDocument();
