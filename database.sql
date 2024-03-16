CREATE TABLE "tasks" (
  "id" serial primary key,
  "taskName" VARCHAR,
  "isCompleted" BOOLEAN DEFAULT FALSE
  );


INSERT INTO "tasks"
("taskName")

VALUES
('Wash The Dishes')