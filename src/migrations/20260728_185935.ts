import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_festival_events_category" AS ENUM('musica', 'gastronomia', 'deporte', 'religioso', 'cultural');
  CREATE TABLE "festival_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"category" "enum_festival_events_category" NOT NULL,
  	"location" varchar,
  	"google_maps_url" varchar,
  	"price" varchar DEFAULT 'Entrada libre',
  	"featured_image_id" integer,
  	"is_featured" boolean DEFAULT false,
  	"promo_url" varchar,
  	"description" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "festival_events_id" integer;
  ALTER TABLE "festival_events" ADD CONSTRAINT "festival_events_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "festival_events_slug_idx" ON "festival_events" USING btree ("slug");
  CREATE INDEX "festival_events_featured_image_idx" ON "festival_events" USING btree ("featured_image_id");
  CREATE INDEX "festival_events_updated_at_idx" ON "festival_events" USING btree ("updated_at");
  CREATE INDEX "festival_events_created_at_idx" ON "festival_events" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_festival_events_fk" FOREIGN KEY ("festival_events_id") REFERENCES "public"."festival_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_festival_events_id_idx" ON "payload_locked_documents_rels" USING btree ("festival_events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "festival_events" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "festival_events" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_festival_events_fk";
  
  DROP INDEX "payload_locked_documents_rels_festival_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "festival_events_id";
  DROP TYPE "public"."enum_festival_events_category";`)
}
