import "dotenv/config";

interface MongoConnection {
    name: string | undefined;
    host: string | undefined;
    port: number | undefined;
}

interface AppConnection {
    port: number | undefined;
}

interface NodeConfig {
    environment: string | undefined;
}

export const mongo: MongoConnection = {
    name: process.env.MONGO_DB_NAME,
    host: process.env.MONGO_DB_HOST,
    port: Number(process.env.MONGO_DB_PORT),
};

export const app: AppConnection = {
    port: Number(process.env.APP_PORT),
};

export const node: NodeConfig = {
    environment: process.env.NODE_ENVIRONMENT,
};
