import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "promotions" DROP CONSTRAINT IF EXISTS "promotions_horizontal_image_id_media_id_fk";
    ALTER TABLE "promotions" DROP CONSTRAINT IF EXISTS "promotions_vertical_image_id_media_id_fk";
    
    DROP INDEX IF EXISTS "promotions_horizontal_image_idx";
    DROP INDEX IF EXISTS "promotions_vertical_image_idx";

    -- Añadimos las columnas necesarias
    ALTER TABLE "promotions" ADD COLUMN IF NOT EXISTS "horizontal_image_desktop_id" integer;
    ALTER TABLE "promotions" ADD COLUMN IF NOT EXISTS "horizontal_image_mobile_id" integer;
    ALTER TABLE "promotions" ADD COLUMN IF NOT EXISTS "vertical_image_desktop_id" integer;
    ALTER TABLE "promotions" ADD COLUMN IF NOT EXISTS "vertical_image_mobile_id" integer;

    ALTER TABLE "promotions" ADD CONSTRAINT "promotions_horizontal_image_desktop_id_media_id_fk" FOREIGN KEY ("horizontal_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "promotions" ADD CONSTRAINT "promotions_horizontal_image_mobile_id_media_id_fk" FOREIGN KEY ("horizontal_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "promotions" ADD CONSTRAINT "promotions_vertical_image_desktop_id_media_id_fk" FOREIGN KEY ("vertical_image_desktop_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "promotions" ADD CONSTRAINT "promotions_vertical_image_mobile_id_media_id_fk" FOREIGN KEY ("vertical_image_mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "promotions_horizontal_image_desktop_idx" ON "promotions" USING btree ("horizontal_image_desktop_id");
    CREATE INDEX IF NOT EXISTS "promotions_horizontal_image_mobile_idx" ON "promotions" USING btree ("horizontal_image_mobile_id");
    CREATE INDEX IF NOT EXISTS "promotions_vertical_image_desktop_idx" ON "promotions" USING btree ("vertical_image_desktop_id");
    CREATE INDEX IF NOT EXISTS "promotions_vertical_image_mobile_idx" ON "promotions" USING btree ("vertical_image_mobile_id");

    ALTER TABLE "promotions" DROP COLUMN IF EXISTS "horizontal_image_id";
    ALTER TABLE "promotions" DROP COLUMN IF EXISTS "vertical_image_id";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Reversión opcional
}
