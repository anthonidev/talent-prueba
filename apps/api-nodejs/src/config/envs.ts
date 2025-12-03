import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    JWT_SECRET: string;
    NODE_ENV: string;
}

const envsSchema = joi
    .object({
        PORT: joi.number().required(),
        JWT_SECRET: joi.string().required(),
        NODE_ENV: joi.string().default('development'),
    })
    .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    PORT: envVars.PORT,
    JWT_SECRET: envVars.JWT_SECRET,
    NODE_ENV: envVars.NODE_ENV,
};
