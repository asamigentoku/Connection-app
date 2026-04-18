// src/api/client.ts
import { Configuration } from "../api/runtime";

import {
    UsersApi,
    DMApi,
    EmotionApi,
    FakecheckApi,
    HarassmentCheckApi,
    JWTApi,
    TweetApi,
    FriendsApi
} from "../api/apis";
const BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// 共通設定（JWTなどもここに集約できる）
const config = new Configuration({
    basePath: BASE_PATH,
    accessToken: () => {
        const token = localStorage.getItem("accessToken"); // ←ここ統一
        return token ? `Bearer ${token}` : "";
    },
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
    friends:new FriendsApi(config)
};

