DROP SCHEMA IF EXISTS "study" CASCADE;

CREATE SCHEMA "study";

CREATE TABLE "study"."topics" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar,
  "url" varchar
);

CREATE TABLE "study"."rooms" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar,
  "topic_id" int,
  "created_at" timestamp default now(),
  "thumbnail" varchar,
  "max_users" int,
  "user_ids" json,
  "is_private" boolean,
  "admin_id" int
);

CREATE TABLE "study"."messages" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "room_id" int,
  "user_id" int,
  "body" varchar,
  "file_id" int default null,
  "created_at" timestamp default now()
);

CREATE TABLE "study"."users" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "username" varchar,
  "avatar" varchar,
  "room_ids" json
);

CREATE TABLE "study"."files" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "url" varchar
);

CREATE TABLE "study"."events" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar,
  "description" varchar,
  "user_id" int,
  "room_id" int,
  "created_at" timestamp default now(),
  "event_date" timestamp
);

CREATE TABLE "study"."goals" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar,
  "description" varchar,
  "created_at" timestamp default now(),
  "goal_date" timestamp default null,
  "creator_id" int,
  "user_ids" json,
  "room_id" int
);

ALTER TABLE "study"."rooms" ADD FOREIGN KEY ("topic_id") REFERENCES "study"."topics" ("id");

ALTER TABLE "study"."messages" ADD FOREIGN KEY ("room_id") REFERENCES "study"."rooms" ("id");

ALTER TABLE "study"."messages" ADD FOREIGN KEY ("user_id") REFERENCES "study"."users" ("id");

ALTER TABLE "study"."messages" ADD FOREIGN KEY ("file_id") REFERENCES "study"."files" ("id");

ALTER TABLE "study"."rooms" ADD FOREIGN KEY ("admin_id") REFERENCES "study"."users" ("id");

ALTER TABLE "study"."events" ADD FOREIGN KEY ("user_id") REFERENCES "study"."users" ("id");

ALTER TABLE "study"."events" ADD FOREIGN KEY ("room_id") REFERENCES "study"."rooms" ("id");

ALTER TABLE "study"."goals" ADD FOREIGN KEY ("creator_id") REFERENCES "study"."users" ("id");

ALTER TABLE "study"."goals" ADD FOREIGN KEY ("room_id") REFERENCES "study"."rooms" ("id");


-- to create schema, run:
-- psql -h localhost -f schema.sql
-- in terminal