CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"caption" text,
	"saree_type" text,
	"price" numeric(10, 2) NOT NULL,
	"original_price" numeric(10, 2),
	"image_url" text,
	"collection" text,
	"is_new_arrival" boolean DEFAULT false,
	"is_featured" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
