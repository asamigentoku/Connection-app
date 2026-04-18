import {ContentCardProps} from "@my-types/card"
export function ReplyCard({ children, className = "" }: ContentCardProps) {
    return(
        <div className={`rounded-xl border-2 border-green-200 bg-green-50 p-6 ${className}`}>
            <div className="flex items-start gap-3">
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}