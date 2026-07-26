import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // La base de datos ya contiene estos cambios.
  // Dejamos esto vacío para que Payload registre la migración como aplicada exitosamente.
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "subscribers" DISABLE ROW LEVEL SECURITY;
   ALTER TABLE "promotions" DISABLE ROW LEVEL SECURITY;
   DROP TABLE "subscribers" CASCADE;
   DROP TABLE "promotions" CASCADE;
   ALTER TABLE "news" DROP CONSTRAINT "news_audio_news_id_media_id_fk";
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_subscribers_fk";
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_promotions_fk";
   DROP INDEX "news_audio_news_idx";
   DROP INDEX "payload_locked_documents_rels_subscribers_id_idx";
   DROP INDEX "payload_locked_documents_rels_promotions_id_idx";
   ALTER TABLE "news" ALTER COLUMN "new_author" DROP DEFAULT;
   ALTER TABLE "news" ALTER COLUMN "category" SET NOT NULL;
   ALTER TABLE "news" ALTER COLUMN "columnist_id" SET NOT NULL;
   ALTER TABLE "news" DROP COLUMN "format";
   ALTER TABLE "news" DROP COLUMN "audio_news_id";
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "subscribers_id";
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "promotions_id";
   DROP TYPE "public"."enum_news_format";
  `)
}
