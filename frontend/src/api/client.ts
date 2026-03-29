// src/api/client.ts
import { Configuration } from "./runtime";
import {
    UsersApi,
    DMApi,
    EmotionApi,
    FakecheckApi,
    HarassmentCheckApi,
    JWTApi,
    TweetApi,
} from "./apis";

// 共通設定（JWTなどもここに集約できる）
const config = new Configuration({
    basePath: "http://localhost:8000",
    accessToken: () => localStorage.getItem("token") || "",
});

// APIまとめオブジェクト（これが一番使いやすい）
export const api = {
    users: new UsersApi(config),
    dm: new DMApi(config),
    emotion: new EmotionApi(config),
    fakecheck: new FakecheckApi(config),
    harassment: new HarassmentCheckApi(config),
    jwt: new JWTApi(config),
    tweets: new TweetApi(config),
};

