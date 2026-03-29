import { Configuration } from "./runtime";
import { UsersApi } from "./apis";

const config = new Configuration({
    basePath: "http://localhost:8000",
});

export const usersApi = new UsersApi(config);