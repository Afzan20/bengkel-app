import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xlpatfegdcdusbhlrnkx.supabase.co";
const supabaseKey = "sb_publishable_OqNG0h7u0hDQnP9McO50bg_3Wuqjn4Z";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);