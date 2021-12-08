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
  "created_at" timestamp,
  "is_private" boolean,
  "admin_id" int
);

CREATE TABLE "study"."messages" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "room_id" int,
  "user_id" int,
  "body" varchar,
  "file_id" int,
  "created_at" timestamp
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

ALTER TABLE "study"."rooms" ADD FOREIGN KEY ("topic_id") REFERENCES "study"."topics" ("id");

ALTER TABLE "study"."messages" ADD FOREIGN KEY ("room_id") REFERENCES "study"."rooms" ("id");

ALTER TABLE "study"."messages" ADD FOREIGN KEY ("user_id") REFERENCES "study"."users" ("id");

ALTER TABLE "study"."messages" ADD FOREIGN KEY ("file_id") REFERENCES "study"."files" ("id");

ALTER TABLE "study"."rooms" ADD FOREIGN KEY ("admin_id") REFERENCES "study"."users" ("id");


-- to create schema, run
-- psql -h localhost -f schema.sql
-- in terminal