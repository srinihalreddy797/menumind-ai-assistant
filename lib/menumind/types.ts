export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

/**
 * Dish intelligence shape. Kept generic so the right-side card can later be
 * populated directly from the MenuMind backend (e.g. a menu-tool lookup)
 * without any UI changes.
 */
export type DishInfo = {
  name: string;
  tagline?: string;
  category: "Veg" | "Non-Veg";
  price: number;
  spiceLevel: number; // 0..10
  healthScore: number; // 0..10
  allergens?: string[];
  image?: string;
};
