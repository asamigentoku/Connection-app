export interface ModerationResult_post{
    isHarassment: string;
    fake_number:number
    sentiment: string;
    toxicityLevel: number; // 0-100
    flags: string[];
}
