export interface User {
  id: string;
  name: string;
  avatar: string;
  status?: string;
  isOnline?: boolean;
  isVerified?: boolean; // デジタル署名検証済み
}

export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  replies: number;
  likes: number;
}

export interface Reply {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Date;
  likes: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Conversation {
  userId: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export const users: User[] = [
  { id: "1", name: "佐藤太郎", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", status: "よろしくお願いします", isOnline: true, isVerified: true },
  { id: "2", name: "田中花子", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", status: "今日は良い天気ですね", isOnline: true, isVerified: true },
  { id: "3", name: "鈴木一郎", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop", status: "勉強中", isOnline: false, isVerified: false },
  { id: "4", name: "高橋美咲", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", status: "コーヒー休憩中", isOnline: true, isVerified: true },
  { id: "5", name: "伊藤健太", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", status: "会議中", isOnline: false, isVerified: false },
];

export const posts: Post[] = [
  {
    id: "1",
    authorId: "1",
    title: "掲示板へようこそ！",
    content: "みなさん、こんにちは！この掲示板では自由に議論や情報交換ができます。気軽に投稿してくださいね。ありがとうございます！",
    category: "お知らせ",
    createdAt: new Date(2026, 2, 10),
    replies: 15,
    likes: 32,
  },
  {
    id: "2",
    authorId: "2",
    title: "おすすめのカフェを教えてください",
    content: "最近引っ越してきたばかりで、近所の良いカフェを探しています。Wi-Fiがあって静かに作業できる場所があれば教えてください！嬉しいです。",
    category: "雑談",
    createdAt: new Date(2026, 2, 12),
    replies: 8,
    likes: 12,
  },
  {
    id: "3",
    authorId: "3",
    title: "プログラミング学習について",
    content: "初心者におすすめのプログラミング言語は何ですか？PythonとJavaScriptで迷っています。",
    category: "技術",
    createdAt: new Date(2026, 2, 13),
    replies: 23,
    likes: 45,
  },
  {
    id: "4",
    authorId: "5",
    title: "【注意】新型ウイルスに関する重要情報",
    content: "政府が隠している情報らしいですが、新型ウイルスは100%人工的に作られたものだそうです。マスコミは報道しないみたいですが、拡散希望します！",
    category: "お知らせ",
    createdAt: new Date(2026, 2, 13, 15, 0),
    replies: 3,
    likes: 2,
  },
  {
    id: "5",
    authorId: "4",
    title: "週末のイベント情報",
    content: "今週末に開催される面白いイベントがあったら共有しましょう！私は美術館の展示会に行く予定です。楽しみです！",
    category: "イベント",
    createdAt: new Date(2026, 2, 13),
    replies: 5,
    likes: 8,
  },
];

export const replies: Reply[] = [
  {
    id: "r1",
    postId: "2",
    authorId: "4",
    content: "駅前の「カフェ・モーニング」がおすすめです！Wi-Fi完備で、コーヒーも美味しいですよ。素晴らしいお店です。",
    createdAt: new Date(2026, 2, 12, 14, 30),
    likes: 5,
  },
  {
    id: "r2",
    postId: "2",
    authorId: "1",
    content: "私も「カフェ・モーニング」によく行きます。落ち着いた雰囲気で作業に集中できますね。",
    createdAt: new Date(2026, 2, 12, 16, 15),
    likes: 3,
  },
  {
    id: "r3",
    postId: "3",
    authorId: "2",
    content: "初心者ならPythonがおすすめです！文法がわかりやすくて、学習リソースも豊富です。",
    createdAt: new Date(2026, 2, 13, 10, 20),
    likes: 8,
  },
  {
    id: "r4",
    postId: "3",
    authorId: "3",
    content: "こんなことも分からないの？使えないな。Pythonなんて無能でも分かるだろ。",
    createdAt: new Date(2026, 2, 13, 11, 45),
    likes: 0,
  },
  {
    id: "r5",
    postId: "4",
    authorId: "1",
    content: "その情報のソースはどこでしょうか？公式な情報源を確認することをおすすめします。",
    createdAt: new Date(2026, 2, 13, 16, 0),
    likes: 10,
  },
];

export const messages: Message[] = [
  {
    id: "m1",
    senderId: "2",
    receiverId: "current",
    content: "こんにちは！先日の投稿、とても参考になりました。",
    timestamp: new Date(2026, 2, 13, 10, 30),
    isRead: true,
  },
  {
    id: "m2",
    senderId: "current",
    receiverId: "2",
    content: "ありがとうございます！お役に立てて嬉しいです。",
    timestamp: new Date(2026, 2, 13, 10, 35),
    isRead: true,
  },
  {
    id: "m3",
    senderId: "2",
    receiverId: "current",
    content: "また何か情報があったら教えてくださいね！",
    timestamp: new Date(2026, 2, 13, 10, 40),
    isRead: true,
  },
  {
    id: "m4",
    senderId: "4",
    receiverId: "current",
    content: "週末のイベント、一緒に行きませんか？",
    timestamp: new Date(2026, 2, 14, 15, 20),
    isRead: false,
  },
  {
    id: "m5",
    senderId: "3",
    receiverId: "current",
    content: "プログラミングの学習方法について、もう少し詳しく教えていただけますか？",
    timestamp: new Date(2026, 2, 14, 9, 15),
    isRead: false,
  },
];

export const conversations: Conversation[] = [
  {
    userId: "2",
    lastMessage: "また何か情報があったら教えてくださいね！",
    lastMessageTime: new Date(2026, 2, 13, 10, 40),
    unreadCount: 0,
  },
  {
    userId: "4",
    lastMessage: "週末のイベント、一緒に行きませんか？",
    lastMessageTime: new Date(2026, 2, 14, 15, 20),
    unreadCount: 1,
  },
  {
    userId: "3",
    lastMessage: "プログラミングの学習方法について、もう少し詳しく教えていただけますか？",
    lastMessageTime: new Date(2026, 2, 14, 9, 15),
    unreadCount: 1,
  },
];