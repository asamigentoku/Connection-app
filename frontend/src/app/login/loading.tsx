//内部ではsuspenseを使用しているため、asyncの関数を判定することができる
export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            <p className="ml-4">読み込み中...</p>
        </div>
    )
}