// コンテンツモデレーションと分析のユーティリティ

import {ModerationResult_post} from "@typs/analyze"
import {api} from "@api/client"

export async function analyzebyPostId(post_id:number): ModerationResult_post {
    const flags: string[] = [];
    let toxicityLevel = 0;
    console.log(post_id)
    let isHarassment = await api.harassment.harassmentCheckHarassmentAnycheckPost({
      postId: post_id
    });
    switch (isHarassment) {
      case "inappropriate":
        isHarassment=true;
        flags.push("不適切な表現");
        toxicityLevel += 40;
        break;
      case "power":
        isHarassment
        flags.push("パワハラの可能性");
        toxicityLevel += 35;
        break;
      case "discriminatory":
        isDiscriminatory=true;
        flags.push("差別的表現");
        toxicityLevel += 30;
        break;
      case "sexual_harassment":
        //セクハラの処理
        break;
      default:
        // どれにも当てはまらない
    }

    const fake_number=await api.fakecheck.fakeCheckByPostFakecheckFakeCheckByPostPost({postId:post_id})
    console.log(fake_number)
    if(fake_number>=1){
        const isPotentialFakeNews=true;
        flags.push("要検証情報");
        toxicityLevel += 20;
    }


    const sentiment=await api.emotion.getEmotionByPostEmotionGetEmotionByPostPost({postId:post_id})

    return {
        isHarassment,
        fake_number,
        sentiment,
        toxicityLevel: Math.min(toxicityLevel, 100),
        flags,
    };
}

export function getSentimentColor(sentiment: ModerationResult["sentiment"]): string {
    switch (sentiment) {
        case "positive":
            return "bg-green-50 border-green-200";
        case "negative":
            return "bg-blue-50 border-blue-200";
        case "angry":
            return "bg-red-50 border-red-200";
        default:
            return "bg-gray-50 border-gray-200";
    }
}

export function getSentimentBadge(sentiment: ModerationResult["sentiment"]): string {
    switch (sentiment) {
        case "positive":
            return "😊 ポジティブ";
        case "negative":
            return "😢 ネガティブ";
        case "angry":
            return "😠 怒り";
        default:
            return "😐 中立";
    }
}
