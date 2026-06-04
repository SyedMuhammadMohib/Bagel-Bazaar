/**
 * Data for Popular Now, Breakfast Builder, and review-food links
 */
window.POPULAR_ITEMS = [
  {
    id: "belly-buster",
    name: "Belly Buster",
    tag: "Most loved",
    image: "data/Belly Buster Sandwich.jpg",
    desc: "Legendary stacked breakfast sandwich.",
  },
  {
    id: "bacon-egg-cheese",
    name: "Bacon Egg and Cheese",
    tag: "Guest favorite",
    image: "data/Egg & Cheese Sandwich.jpg",
    desc: "Classic on a toasted everything bagel.",
  },
  {
    id: "french-toast-bagel",
    name: "French Toast Bagel",
    tag: "Trending",
    image: "data/Classic French Toast.jpg",
    desc: "Sweet, golden, and always a hit.",
  },
  {
    id: "lox-spread",
    name: "Lox and Spreads",
    tag: "Signature",
    image: "data/bagel with lox spread.jpg",
    desc: "Premium toppings on NY-style bagels.",
  },
  {
    id: "coffee",
    name: "Morning Coffee",
    tag: "Coffee bar",
    image: "data/coffee.jpg",
    desc: "Espresso, lattes, and fresh drip.",
  },
  {
    id: "reuben",
    name: "The Reuben",
    tag: "Lunch pick",
    image: "data/%232%20The%20Reuben.jpg",
    desc: "Real deli-style, made to order.",
  },
];

window.BUILDER_OPTIONS = {
  bagel: ["Everything", "Plain", "Sesame", "Cinnamon Raisin", "Asiago"],
  spread: ["Cream cheese", "Butter", "Scallion cream cheese", "No spread"],
  protein: ["Bacon egg and cheese", "Turkey bacon", "Lox", "Just eggs", "None"],
  drink: ["Hot coffee", "Iced coffee", "Latte", "Orange juice", "Water"],
};

window.BUILDER_DEFAULTS = {
  bagel: "Everything",
  spread: "Cream cheese",
  protein: "Bacon egg and cheese",
  drink: "Hot coffee",
};
