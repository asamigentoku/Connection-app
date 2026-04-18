import { ReactNode } from "react";
import { ModerationResult_post } from "@my-types/analyze";
import { User } from "@data/mock-data";
export interface ContentCardProps {
    children: ReactNode;
    moderationResult?: ModerationResult_post;
    author?: User;
    className?: string;
}