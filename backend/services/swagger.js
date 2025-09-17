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
                            likes: {
                                type: 'number',
                                example: 100,
                            },
                            dislikes: {
                                type: 'number',
                                example: 10,
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
                            password: {
                                type: 'string',
                                example: '1234',
                            },
                            ConfirmPassword: {
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
                        required: ['username', 'password', 'ConfirmPassword'],
                        properties: {
                            username: {
                                type: 'string',
                                example: 'yum',
                            },
                            password: {
                                type: 'string',
                                example: '12345',
                            },
                            ConfirmPassword: {
                                type: 'string',
                                example: '12345',
                            }
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