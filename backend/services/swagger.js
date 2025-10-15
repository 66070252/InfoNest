import swaggerJsdoc from 'swagger-jsdoc';

const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'E-comerce API Documentation',
                version: '1.0.0',
                description: 'API documentation for E-comerce product management',
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Development server',
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
                schemas: {
                    Info: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'integer',
                                example: 1,
                            },
                            title: {
                                type: 'string',
                                example: 'iPhone 15',
                            },
                            info: {
                                type: 'string',
                                example: 'A new phone with advanced features',
                            },
                            imageUrl:{
                                type: 'string',
                                example: "/uploads/image-1760546662056-268043302.png",
                            },
                            author: {
                                type: 'object',
                                example: '64f4c8e2f9d8b2a5c8e4d123',
                            },
                            likes: {
                                type: 'number',
                                example: 5,
                            },
                            dislikes: {
                                type: 'number',
                                example: 5,
                            },
                        },
                    },
                    User: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'integer',
                                example: 1,
                            },
                            username: {
                                type: 'string',
                                example: 'jane doe',
                            },
                            email: {
                                type: 'string',
                                example: 'jane@bow.com',
                            },
                            password: {
                                type: 'string',
                                example: '1234',
                            }
                        },
                    },
                    InfoInput: {
                        type: 'object',
                        required: ['title', 'info'],
                        properties: {
                            title: {
                                type: 'string',
                                example: 'iPhone 15',
                            },
                            info: {
                                type: 'string',
                                example: 'A new phone with advanced features',
                            },
                        },
                    },
                    UserInput: {
                        type: 'object',
                        required: ['username','email', 'password'],
                        properties: {
                            username: {
                                type: 'string',
                                example: 'yum',
                            },
                            email: {
                                type: 'string',
                                example: 'yum@mail.com'
                            },
                            password: {
                                type: 'string',
                                example: '12345',
                            },
                        },
                    },
                    loginInput: {
                        type: 'object',
                        required: ['username','email', 'password'],
                        properties: {
                            emailOrUsername: {
                                type: 'string',
                                example: 'yum@mail.com'
                            },
                            password: {
                                type: 'string',
                                example: '12345',
                            },
                        },
                    },
                    ErrorResponse: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'info not found',
                            },
                            code: {
                                type: 'integer',
                                example: '404',
                            },
                        },
                    },
                },
            },
        },
        apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;