import { SwaggerCreateVo } from "../contracts/vo/SwaggerRelated";

export class SwaggerService {
    document: any;
    constructor({ title, description }: SwaggerCreateVo) {
        this.document = {
            openapi: "3.0.0",
            info: {
                title,
                description,
                version: "1.0.0",
            },
            components: {
                securitySchemes: {},
            },
            security: [],
            paths: {},
        };
    }

    createSecurity() {
        return {
            add: (securityScheme: any) => {
                Object.assign(
                    this.document.components.securitySchemes,
                    securityScheme,
                );
            },
        };
    }

    addComponents(security: any) {
        this.document.security.push(...Object.keys(security));
    }

    createPath(path: string) {
        if (!this.document.paths[path]) {
            this.document.paths[path] = {};
        }
        return {
            get: () => {
                if (!this.document.paths[path].get) {
                    this.document.paths[path].get = {};
                }
                return {
                    setTags: (tags: string) => {
                        this.document.paths[path].get.tags = [tags];
                    },
                    setSummary: (summary: string) => {
                        this.document.paths[path].get.summary = summary;
                    },
                    operationId: (id: string) => {
                        this.document.paths[path].get.operationId = id;
                    },
                    addSecurity: (security: any) => {
                        this.document.paths[path].get.security = security;
                    },
                    responses: (responses: any) => {
                        this.document.paths[path].get.responses = {
                            [responses.code]: {
                                description: responses.description,
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties:
                                                responses.content.properties,
                                        },
                                        example: responses.content.example,
                                    },
                                },
                            },
                        };
                    },
                };
            },
        };
    }

    addPath(path: any) {
        Object.assign(this.document.paths, path);
    }

    getDocument() {
        return this.document;
    }
}

