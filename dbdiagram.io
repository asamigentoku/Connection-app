// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs



Table User {
  user_id integer [primary key]
  user_name varchar [not null]
  user_pass varchar [not null]
  email varchar [unique]
  gender varchar
  status varchar
  icon_url varchar
  created_at timestamp
}

Table Talk_room {
  room_id integer [primary key]
  room_name varchar
  created_at timestamp
}

Table Room_member {
  id integer [primary key]
  user_id integer [ref: > User.user_id]
  room_id integer [ref: > Talk_room.room_id]
}

Table Message {
  id integer [primary key]
  room_id integer [ref: > Talk_room.room_id]
  user_id integer [ref: > User.user_id]
  content text
  created_at timestamp
}

Table Message_read {
  id integer [primary key]
  message_id integer [ref: > Message.id]
  user_id integer [ref: > User.user_id]
  read_at timestamp
}

Table Post {
  post_id integer [primary key]
  user_id integer [ref: > User.user_id]
  content text
  created_at timestamp
}

Table Post_image {
  id integer [primary key]
  post_id integer [ref: > Post.post_id]
  image_url varchar
}


Table Reply {
  id integer [primary key]
  post_id integer [ref: > Post.post_id]
  user_id integer [ref: > User.user_id]
  content text
  created_at timestamp
}

Table Like {
  id integer [primary key]
  user_id integer [ref: > User.user_id]
  post_id integer [ref: > Post.post_id]
  created_at timestamp
}

Table Follow {
  id integer [primary key]
  follower_id integer [ref: > User.user_id]
  following_id integer [ref: > User.user_id]
  created_at timestamp
}

Table Block {
  id integer [primary key]
  blocker_id integer [ref: > User.user_id]
  blocked_id integer [ref: > User.user_id]
  created_at timestamp
}




Ref: "Block"."id" < "Follow"."follower_id"