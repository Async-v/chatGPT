import dotenv from 'dotenv';

dotenv.config()

function requiredVariable(name){
    if(!process.env[name]){
        throw new Error(`Environment variable ${name} is required but not defined.`)
    }
    return process.env[name]
}

const configEnv = {
    MONGO_URI: requiredVariable("MONGO_URI"),
    JWT_SECRET: requiredVariable("JWT_SECRET")
}

export default configEnv;