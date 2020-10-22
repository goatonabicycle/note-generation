import melody from "./routes/melody";

import errorHandler from "./middlewares/errorHandler";

import MelodyService from "../services/melodyService";

//This is where we setup Dependencies and inject them
const setup = (app) => {
    melody(app)(new MelodyService());

    errorHandler(app);

    return app;
}

export default setup;