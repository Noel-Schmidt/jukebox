import { EnvironmentLoader, ProcessEnvironment } from '@mscs/environment';
import { ApplicationController } from "./Controller/application.controller";
import { join } from "path";

export const ENVIRONMENT = new ProcessEnvironment();

const DEFAULT_MODE = "development";
const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 80;

export let application: ApplicationController;

async function bootstrap() {
    const enviromentLoader = new EnvironmentLoader()
    await enviromentLoader.loadEnvironment(join(__dirname + '/../.env'));

    const APP_MODE: string = ENVIRONMENT.has("APP_MODE") ? ENVIRONMENT.get("APP_MODE") : DEFAULT_MODE;
    const APP_HOST: string = ENVIRONMENT.has("APP_HOST") ? ENVIRONMENT.get("APP_HOST") : DEFAULT_HOST;
    const APP_PORT: number = ENVIRONMENT.has("APP_PORT") ? parseInt(ENVIRONMENT.get("APP_PORT"), 10) : DEFAULT_PORT;

    const APP_TOKEN: string = ENVIRONMENT.has('APP_TOKEN') ? ENVIRONMENT.get("APP_TOKEN") : null;

    ENVIRONMENT.set('APP_MODE', APP_MODE.toString());
    ENVIRONMENT.set('APP_HOST', APP_HOST.toString());
    ENVIRONMENT.set('APP_PORT', APP_PORT.toString());
    ENVIRONMENT.set('APP_TOKEN', APP_TOKEN.toString());

    return { APP_MODE: APP_MODE, APP_HOST: APP_HOST, APP_PORT: APP_PORT, APP_TOKEN: APP_TOKEN };
}

async function runtime(data: { APP_MODE, APP_HOST, APP_PORT, APP_TOKEN }) {
    const app = new ApplicationController(data.APP_TOKEN);

    application = app;
}

bootstrap()
    .then(runtime)
    .catch(err => {
        console.log(err);
        process.exit(1);
    })
