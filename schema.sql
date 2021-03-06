DROP SCHEMA IF EXISTS "study" CASCADE;

CREATE SCHEMA "study";

CREATE TABLE "study"."topics" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "url" varchar NOT NULL
);

CREATE TABLE "study"."rooms" (
  "id" varchar PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL UNIQUE,
  "topic_id" int NOT NULL,
  "created_at" timestamp default now(),
  "thumbnail" varchar NOT NULL,
  "max_users" int NOT NULL,
  "is_private" boolean NOT NULL,
  "is_archived" boolean default false,
  "admin_id" int NOT NULL,
  "invite_key" varchar
);

CREATE TABLE "study"."messages" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "room_id" varchar NOT NULL,
  "user_id" int NOT NULL,
  "body" varchar NOT NULL,
  "created_at" timestamp default now()
);

CREATE TABLE "study"."users/rooms" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" int NOT NULL,
  "room_id" varchar NOT NULL,
  "created_at" timestamp default now()
);

CREATE TABLE "study"."users" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "avatar" varchar NOT NULL default 'https://via.placeholder.com/100x100',
  "password" varchar,
  "google_id" varchar,
  "created_at" timestamp default now()
);

CREATE TABLE "study"."files" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "url" varchar NOT NULL,
  "name" varchar NOT NULL,
  "room_id" varchar NOT NULL,
  "user_id" int NOT NULL,
  "created_at" timestamp default now()
);

CREATE TABLE "study"."events" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "user_id" int NOT NULL,
  "room_id" varchar NOT NULL,
  "created_at" timestamp default now(),
  "event_date" date NOT NULL,
  "event_time" time NOT NULL
);

CREATE TABLE "study"."goals" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "created_at" timestamp default now(),
  "user_id" int NOT NULL,
  "room_id" varchar NOT NULL,
  "goal_date" date default null
);

CREATE TABLE "study"."users/goals" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" int NOT NULL,
  "goal_id" int NOT NULL,
  "created_at" timestamp default now()
);

ALTER TABLE "study"."rooms" ADD FOREIGN KEY ("topic_id") REFERENCES "study"."topics" ("id");

ALTER TABLE "study"."messages" ADD FOREIGN KEY ("room_id") REFERENCES "study"."rooms" ("id");

ALTER TABLE "study"."messages" ADD FOREIGN KEY ("user_id") REFERENCES "study"."users" ("id");

ALTER TABLE "study"."rooms" ADD FOREIGN KEY ("admin_id") REFERENCES "study"."users" ("id");

ALTER TABLE "study"."events" ADD FOREIGN KEY ("user_id") REFERENCES "study"."users" ("id");

ALTER TABLE "study"."events" ADD FOREIGN KEY ("room_id") REFERENCES "study"."rooms" ("id");

ALTER TABLE "study"."goals" ADD FOREIGN KEY ("user_id") REFERENCES "study"."users" ("id");

ALTER TABLE "study"."goals" ADD FOREIGN KEY ("room_id") REFERENCES "study"."rooms" ("id");

ALTER TABLE "study"."users/rooms" ADD FOREIGN KEY ("room_id") REFERENCES "study"."rooms" ("id");

ALTER TABLE "study"."users/rooms" ADD FOREIGN KEY ("user_id") REFERENCES "study"."users" ("id");

ALTER TABLE "study"."users/goals" ADD FOREIGN KEY ("user_id") REFERENCES "study"."users" ("id");

ALTER TABLE "study"."users/goals" ADD FOREIGN KEY ("goal_id") REFERENCES "study"."goals" ("id") ON DELETE CASCADE;

ALTER TABLE "study"."files" ADD FOREIGN KEY ("user_id") REFERENCES "study"."users" ("id");

ALTER TABLE "study"."files" ADD FOREIGN KEY ("room_id") REFERENCES "study"."rooms" ("id");


-- to create schema, run:
-- psql -h localhost -f schema.sql
-- in terminal

-- change filepath for .csv files below:

COPY "study"."topics"("name", "url")
FROM '/home/ubuntu/API/csv/topics.csv'
DELIMITER ','
CSV HEADER;

COPY "study"."users"("first_name", "last_name", "email", "avatar", "password", "google_id")
FROM '/home/ubuntu/API/csv/users.csv'
DELIMITER ','
CSV HEADER;

COPY "study"."rooms"("id", "name", "topic_id", "created_at", "thumbnail", "max_users", "is_private", "admin_id", "is_archived")
FROM '/home/ubuntu/API/csv/rooms.csv'
DELIMITER ','
CSV HEADER;

COPY "study"."users/rooms"("user_id", "room_id")
FROM '/home/ubuntu/API/csv/users_rooms.csv'
DELIMITER ','
CSV HEADER;

COPY "study"."messages"("room_id", "user_id", "body")
FROM '/home/ubuntu/API/csv/messages.csv'
DELIMITER ','
CSV HEADER;

COPY "study"."events"("name", "user_id", "room_id", "created_at", "event_date", "event_time")
FROM '/home/ubuntu/API/csv/events.csv'
DELIMITER ','
CSV HEADER;

COPY "study"."goals"("name", "created_at", "user_id", "room_id")
FROM '/home/ubuntu/API/csv/goals.csv'
DELIMITER ','
CSV HEADER;

COPY "study"."users/goals"("user_id", "goal_id")
FROM '/home/ubuntu/API/csv/users_goals.csv'
DELIMITER ','
CSV HEADER;

COPY "study"."files"("url", "name", "room_id", "user_id")
FROM '/home/ubuntu/API/csv/files.csv'
DELIMITER ','
CSV HEADER;

DROP extension IF EXISTS pg_trgm;
CREATE extension pg_trgm;