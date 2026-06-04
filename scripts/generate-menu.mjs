/**
 * Generates js/menu-data.js and assets/menu/manifest.json from source menu.
 * Run: node scripts/generate-menu.mjs
 */
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** @param {string} id @param {string} name @param {string} price @param {string} [desc] @param {string|null} [badge] @param {string} [imageKey] */
function item(id, name, price, desc = "", badge = null, imageKey = id) {
  return { id, name, price, description: desc, badge, imageKey };
}

const categories = [
  {
    id: "coffee",
    label: "Coffee Bar",
    folder: "coffee",
    items: [
      item("coffee-drip", "Coffee", "$2.50"),
      item("espresso-single", "Single Espresso", "$1.77"),
      item("espresso-double", "Double Espresso", "$3.14"),
      item("cappuccino-hot", "Hot Cappuccino", "$3.14", "Small, medium or large for add'l charge. Add an extra shot for add'l charge."),
      item("cappuccino-flavored", "Flavored Hot Cappuccino", "$3.14", "Small, medium or large for add'l charge. Add an extra shot for add'l charge."),
      item("latte-iced", "Iced Latte", "$3.14", "Small, medium or large for add'l charge."),
      item("latte-iced-flavored", "Flavored Iced Latte", "$2.99", "Small, medium or large for add'l charge."),
      item("coffee-iced", "Iced Coffee", "$3.66", "Small, medium or large for add'l charge."),
      item("coffee-iced-flavored", "Flavored Iced Coffee", "$3.66", "Small, medium or large for add'l charge."),
      item("frappe-frozen", "Frozen Frappe", "$5.24", "Small, medium or large for add'l charge. Espresso, cream, sugar & ice blended then topped with whipped cream. Add an extra shot for add'l charge."),
      item("frappe-flavored", "Flavored Frozen Frappe", "$5.24", "Small, medium or large for add'l charge. Espresso, cream, sugar & ice blended then topped with whipped cream. Add an extra shot for add'l charge."),
      item("box-o-joe", "Box o Joe (12 Cups)", "$26.24", "Includes condiments, milk & paper goods.", "Signature"),
    ],
  },
  {
    id: "bagels",
    label: "Freshly Baked Bagels",
    folder: "bagels",
    items: [
      item("bagel-1", "Bagel (1)", "$1.77", "Choose from our selection. Gluten free bagels available for add'l charge."),
      item("bagels-6", "Bagels (6)", "$9.96", "Choose from our selection. Use special Instructions Field to specify quantities of each.", null, "bagel-1"),
      item("bagels-13", "Bagel (13)", "$19.94", "Choose from our selection. Use special Instructions Field to specify quantities of each.", null, "bagel-1"),
      item("bagel-special-1", "#1 Bagel Special", "$27.29", "Dozen bagels (13), 8 oz butter & 8 oz plain cream cheese. Choose from our selection. Use special Instructions Field to specify quantities of each.", "Popular"),
      item("bagel-special-2", "#2 Bagel Special", "$28.34", "Dozen bagels (13), 8 oz plain cream cheese & 8 oz flavored cream cheese. Choose from our selection. Use special Instructions Field to specify quantities of each.", "Popular"),
    ],
  },
  {
    id: "spreads",
    label: "Spreads on a Bagel",
    folder: "spreads",
    items: [
      item("spread-butter", "Bagel w/ Butter", "$3.41", "Add jelly for add'l charge."),
      item("spread-cinna-butter", "Bagel w/ Cinna Butter", "$3.66", "Add jelly for add'l charge."),
      item("spread-peanut-butter", "Bagel w/ Peanut Butter", "$3.56", "Add jelly for add'l charge."),
      item("spread-nutella", "Bagel w/ Nutella", "$3.56", "Add jelly for add'l charge."),
      item("spread-jelly", "Bagel w/ Jelly", "$3.41"),
      item("spread-plain-cc", "Bagel w/ Plain Cream Cheese", "$4.08", "Add jelly for add'l charge."),
      item("spread-veggie-cc", "Bagel w/ Vegetable Cream Cheese", "$5.13"),
      item("spread-scallion-cc", "Bagel w/ Scallion Cream Cheese", "$5.13"),
      item("spread-lox-spread", "Bagel w/ Lox Spread", "$6.29"),
      item("spread-walnut-cc", "Bagel w/ Walnut Raisin Cream Cheese", "$5.13", "Add jelly for add'l charge."),
      item("spread-strawberry-cc", "Bagel w/ Strawberry Cream Cheese", "$5.13", "Add jelly for add'l charge."),
      item("spread-jalapeno-cc", "Bagel w/ Jalapeno Garlic Cream Cheese", "$5.13"),
      item("spread-oreo-cc", "Bagel w/ Oreo Explosion Cream Cheese", "$5.13", "Add jelly for add'l charge."),
      item("spread-bacon-cc", "Bagel w/ Bacon & Chives Cream Cheese", "$5.13"),
      item("spread-lite-veggie-cc", "Bagel w/ Lite Veggie Cream Cheese", "$5.13"),
      item("spread-olive-cc", "Bagel w/ Green Olive Pimento Cream Cheese", "$5.13"),
    ],
  },
  {
    id: "lox",
    label: "Bagels w/ Lox",
    folder: "lox",
    note: "Available with capers, tomato, onion or jalapeño. Add avocado for add'l charge.",
    items: [
      item("lox-plain-cc", "Bagel w/ Lox & Plain Cream Cheese", "$12.06", null, "Signature"),
      item("lox-veggie-cc", "Bagel w/ Lox & Veggie Cream Cheese", "$13.11"),
      item("lox-scallion-cc", "Bagel w/ Lox & Scallion Cream Cheese", "$13.11"),
      item("lox-whitefish", "Bagel w/ Whitefish Salad & Plain Cream Cheese", "$15.21"),
    ],
  },
  {
    id: "spreads-to-go",
    label: "Spreads to Go",
    folder: "spreads",
    note: "8 oz tubs",
    items: [
      item("tub-plain-cc", "Plain Cream Cheese Tub", "$6.30"),
      item("tub-flavored-cc", "Flavored Cream Cheese Tub", "$7.35"),
      item("tub-plain-butter", "Plain Butter Tub", "$5.78"),
      item("tub-flavored-butter", "Flavored Butter Tub", "$3"),
      item("tub-jelly", "Jelly Tub", "$5.78"),
    ],
  },
  {
    id: "lox-to-go",
    label: "Lox to Go",
    folder: "lox",
    items: [
      item("lox-quarter", "Lox Slices (1/4 lb.)", "$10.50", null, null, "lox-slices"),
      item("lox-half", "Lox Slices (1/2 lb.)", "$20.99", null, null, "lox-slices"),
      item("lox-pound", "Lox Slices (1 lb.)", "$41.99", null, null, "lox-slices"),
    ],
  },
  {
    id: "bakery",
    label: "Bakery Sweets",
    folder: "breakfast",
    items: [
      item("bakery-muffin", "Jumbo Muffins", "$3.41", "Choose from our selection."),
      item("bakery-cookie", "Jumbo Cookies", "$3.41", "Choose from our selection."),
      item("bakery-crumb-cake", "Crumb Cake", "$3.41"),
      item("bakery-brownie", "Brownie", "$3.41"),
      item("bakery-blondie", "Blondie", "$3.41"),
    ],
  },
  {
    id: "burritos",
    label: "Breakfast Burrito & Quesadilla",
    folder: "breakfast",
    note: "Served with a side of salsa. Available with egg whites for add'l charge.",
    items: [
      item("burrito-1", "#1 Burrito", "$7.34", "Scrambled egg, cheddar cheese & home fries."),
      item("burrito-2", "#2 Burrito", "$8.39", "Scrambled egg, sausage, peppers, onions & cheddar."),
      item("burrito-3", "#3 Burrito", "$8.39", "Scrambled egg, bacon, cheddar cheese & home fries."),
      item("bfast-quesadilla-4", "#4 Quesadilla", "$7.34", "Scrambled egg, cheese & home fries."),
      item("bfast-quesadilla-5", "#5 Quesadilla", "$7.34", "Scrambled egg, cheese, spinach & tomato."),
      item("bfast-quesadilla-6", "#6 Quesadilla", "$8.39", "Scrambled egg, cheese, bacon, peppers & onion."),
    ],
  },
  {
    id: "hot-breakfast",
    label: "Hot Breakfast Sandwiches",
    folder: "breakfast",
    note: "Made with 2 fresh eggs & choice of bread. Bread subs available for add'l charge. Egg whites available for add'l charge.",
    items: [
      item("bfast-egg", "Egg Sandwich", "$4.46"),
      item("bfast-egg-cheese", "Egg & Cheese Sandwich", "$4.99"),
      item("bfast-egg-meat-cheese", "Egg, Meat & Cheese Sandwich", "$7.61"),
      item("bfast-meat-egg", "Meat & Egg Sandwich", "$6.92"),
      item("bfast-belly-buster", "Belly Buster Sandwich", "$9.96", "Scrambled egg, bacon, sausage, pork roll & cheese.", "Popular"),
      item("bfast-buddy-buster", "Buddy Buster Sandwich", "$9.44", "Scrambled egg, seasoned home fries, bacon, sausage & cheese."),
      item("bfast-breakfast-bomb", "Breakfast Bomb Sandwich", "$8.60", "Scrambled egg, pork roll, cheese & seasoned home fries."),
      item("bfast-western-patty", "Western Patty Sandwich", "$9.44", "Scrambled egg, ham, peppers, onions, cheese & hash brown patty."),
      item("bfast-philly", "Philly Sandwich", "$8.39", "Scrambled eggs, Philly steak, sautéed onions & cheese."),
      item("bfast-healthy-veggie", "Healthy Veggie Sandwich", "$7.86", "3 scrambled egg whites, peppers, onions, mushrooms, broccoli & tomato. Cooked in PAM spray. Add cheese for add'l charge."),
      item("bfast-xxx", "XXX Sandwich", "$10.49", "6 egg whites, diced grilled chicken & cheese."),
      item("bfast-leo", "The Leo Sandwich", "$9.44", "Freshly scrambled egg with sauteed onion & smoked cooked omelet style. Add cheese for add'l charge."),
      item("bfast-avocado-toast", "Classic Avocado Toast", "$6.29", "One whole ripe avocado open faced on toasted bagel or bread.", "Popular"),
    ],
  },
  {
    id: "omelettes",
    label: "Omelettes & Platters",
    folder: "breakfast",
    note: "Served with choice of bagel or toast with butter or jelly. Egg whites available for add'l charge.",
    items: [
      item("omelette-3-eggs", "3 Eggs Any Style", "$6.56"),
      item("omelette-3-eggs-meat", "3 Eggs Any Style w/ Meat", "$8.91"),
      item("omelette-western", "The Western Omelette", "$9.44", "Peppers, onions & ham. Add cheese for add'l charge."),
      item("omelette-veggie", "The Veggie Omelette", "$8.39", "Broccoli, mushrooms, peppers, onions & tomato. Add cheese for add'l charge."),
      item("omelette-cheesy", "The Cheesy Omelette", "$8.39", "Cheddar, Swiss, American & provolone."),
      item("omelette-hammy", "The Hammy Omelette", "$8.91", "Loaded with ham & cheddar cheese."),
      item("omelette-bacon", "The Bacon Lovers Omelette", "$9.44", "Loads of crispy bacon, peppers, onions & cheddar cheese."),
      item("omelette-shroomy", "The Shroomy Omelette", "$8.39", "Fresh white mushrooms, melted imported Swiss cheese & more sauteed mushrooms to top it."),
      item("omelette-mediterranean", "The Mediterranean Omelette", "$9.44", "Peppers, onions, tomato, spinach & feta cheese."),
      item("omelette-turkey-garden", "The Turkey Garden Omelette", "$9.96", "Diced turkey breast, spinach, broccoli, mushrooms, peppers, onions & tomato. Add cheese for add'l charge."),
    ],
  },
  {
    id: "pancakes",
    label: "Pancakes",
    folder: "breakfast",
    note: "Served with butter & syrup. Add 2 eggs or breakfast meat for an add'l charge.",
    items: [
      item("pancakes-buttermilk", "3 Buttermilk Pancakes", "$7.34"),
      item("pancakes-chocolate", "3 Chocolate Chip Pancakes", "$8.66"),
      item("pancakes-blueberry", "3 Blueberry Pancakes", "$8.66"),
      item("pancakes-cinnamon", "3 Cinnamon Swirl Pancakes", "$8.39"),
    ],
  },
  {
    id: "french-toast",
    label: "French Toast",
    folder: "breakfast",
    note: "Served with butter & syrup. Add 2 eggs or breakfast meat for an add'l charge.",
    items: [
      item("ft-classic", "Classic French Toast", "$8.39", "Our thick cut egg bread, dipped in egg & cream cooked perfectly, topped with our cinnamon sugar & powder sugar."),
      item("ft-nutella-smores", "Nutella Smores French Toast", "$9.71", "Our classic French toast stuffed with Nutella, mini marshmallows & graham cracker crumble."),
      item("ft-strawberry", "Strawberry Stuffed French Toast", "$9.71", "Our classic French toast stuffed with creamy strawberry filling & topped with fresh strawberry topping."),
      item("ft-oreo", "Once Stuffed French Toast", "$9.71", "Our classic French toast stuffed with a creamy Oreo filling, chocolate sauce & Oreo crumble."),
    ],
  },
  {
    id: "breakfast-sides",
    label: "Breakfast Sides",
    folder: "sides",
    items: [
      item("side-home-fries", "Seasoned Home Fries", "$5.20"),
      item("side-silver-dollar", "Silver Dollar Fries (Chips)", "$5.20"),
      item("side-hash-patty", "Hash Brown Patty", "$2.09"),
      item("side-breakfast-meat", "Side of Breakfast Meat", "$3.41"),
      item("side-cream-cheese", "Side of Cream Cheese", "$2.09"),
      item("side-fruit-salad", "Fruit Salad", "$3.25"),
      item("side-watermelon", "Watermelon", "$3.25"),
      item("side-chobani", "Chobani Yogurt", "$1.99"),
    ],
  },
  {
    id: "salad-bowls",
    label: "Salad Bowls",
    folder: "salads",
    note: "Served with homemade breadstick & dressing.",
    items: [
      item("salad-garden", "Perfect Garden Salad", "$8.14", "Lettuce, grape tomato, cucumber, carrot, avocado & hard boiled egg."),
      item("salad-cobb", "Chopped Cobb Salad", "$9.44", "Chopped greens, tomato, cucumber, carrot, bacon, cheddar, avocado & egg."),
      item("salad-green-dream", "Green Dream Salad", "$9.44", "Greens, tomato, cucumber, carrot, avocado, broccoli, spinach & cabbage."),
      item("salad-caesar", "Caesar Salad", "$8.14", "Romaine, garlic butter croutons & shaved Parmesan."),
      item("salad-greek", "Chopped Greek Salad", "$8.14", "Romaine, tomato, cucumber, bell peppers, olives, pepperoncini & feta."),
    ],
  },
  {
    id: "deli-salads",
    label: "Deli Salads",
    folder: "salads",
    note: "Priced per 1/4 lb",
    items: [
      item("deli-tuna", "White Tuna Salad (1/4 lb)", "$3.15"),
      item("deli-veggie-tuna", "Low Fat Veggie Tuna Salad (1/4 lb)", "$3.41"),
      item("deli-chicken", "White Chicken Salad (1/4 lb)", "$3.15"),
      item("deli-cranberry-chicken", "Cranberry Walnut Chicken Salad (1/4 lb)", "$3.68"),
      item("deli-shrimp", "Shrimp Salad (1/4 lb)", "$3.94"),
      item("deli-egg", "Egg Salad (1/4 lb)", "$2.89"),
      item("deli-whitefish", "Whitefish Salad (1/4 lb)", "$4.73"),
      item("deli-salmon", "Baked Salmon Salad (1/4 lb)", "$4.73"),
    ],
  },
  {
    id: "hot-sandwiches",
    label: "Hot Sandwiches",
    folder: "sandwiches",
    note: "Choice of coleslaw, macaroni or potato salad & deli pickle.",
    items: [
      item("hot-grilled-chicken", "Grilled Chicken Sandwich", "$8.66", "Add cheese for add'l charge."),
      item("hot-chicken-blt", "Chicken BLT Sandwich", "$10.49", "Add cheese for add'l charge."),
      item("hot-chicken-mozzarella", "Grilled Chicken, Roasted Peppers & Mozzarella Sandwich", "$9.96"),
      item("hot-crispy-chicken", "Crispy Chicken Sandwich", "$9.44", "Add cheese for add'l charge."),
      item("hot-spicy-crispy", "Spicy Crispy Chicken Sandwich", "$9.44", "Add cheese for add'l charge."),
      item("hot-grilled-cheese", "Grilled Cheese Sandwich", "$6.81"),
      item("hot-grilled-cheese-blt", "Grilled Cheese w/ Bacon & Tomato Sandwich", "$8.66"),
      item("hot-blt", "BLT Sandwich", "$7.86", "Add cheese for add'l charge."),
    ],
  },
  {
    id: "hot-specialty",
    label: "Hot Specialty Sandwiches",
    folder: "sandwiches",
    items: [
      item("spec-cuban", "#1 The Cuban", "$9.71", "Ham, roast pork, Swiss, dijon mustard & pickles on pressed Italian bread."),
      item("spec-reuben", "#2 The Reuben", "$9.71", "Corned beef, kraut, Swiss & Russian dressing on grilled rye.", "Signature"),
      item("spec-gourmet-blt", "#3 The Gourmet BLT", "$9.71", "Bacon, avocado, tomato, lettuce & egg over easy on Texas bread."),
      item("spec-beef-gyro", "#4 The Beef Gyro", "$8.66", "Grilled beef strips, lettuce, tomato & tzatziki on warm pita."),
      item("spec-gourmet-grilled-cheese", "#5 The Gourmet Grilled Cheese", "$9.71", "Cheddar, American, ham, bacon & tomato on Texas bread."),
    ],
  },
  {
    id: "cold-specialty",
    label: "Cold Specialty Sandwiches",
    folder: "sandwiches",
    items: [
      item("spec-tuna-melt", "#6 Tuna Melt", "$9.44", "White tuna salad, grilled tomato & melted cheese on a grilled roll."),
      item("spec-sloppy-joe", "#7 The Sloppy Joe", "$11.54", "Corned beef, turkey, roast beef, coleslaw & Russian dressing triple decker."),
      item("spec-turkey-club", "#8 The Turkey Club", "$11.54", "Turkey, provolone, bacon, lettuce, tomato & mayo triple decker."),
      item("spec-pastrami-corned", "#9 The Pastrami & Corned Beef", "$10.49", "Corned beef & pastrami piled high on rye."),
      item("spec-cranberry", "#10 The Cranberry", "$10.49", "Cranberry walnut chicken salad, mixed greens & avocado on whole wheat."),
    ],
  },
  {
    id: "hot-subs",
    label: "Hot Subs",
    folder: "subs",
    items: [
      item("sub-philly", "Philly Cheesesteak Sub", "$9.71", null, "Popular"),
      item("sub-chicken-philly", "Chicken Cheesesteak Sub", "$9.71"),
      item("sub-crispy-blt", "Crispy Chicken BLT Sub", "$11.01", "Add cheese for add'l charge."),
      item("sub-buffalo-chicken", "Crispy Buffalo Chicken Sub", "$9.96"),
    ],
  },
  {
    id: "hoagies",
    label: "8\" Hoagies & Sandwiches",
    folder: "subs",
    items: [
      item("hoagie-1", "#1 Ham & Cheese Sandwich", "$9.44"),
      item("hoagie-2", "#2 Ham, Salami & Cheese Sandwich", "$9.44"),
      item("hoagie-3", "#3 Ham, Turkey & Cheese Sandwich", "$9.96"),
      item("hoagie-4", "#4 Turkey & Cheese Sandwich", "$9.96"),
      item("hoagie-5", "#5 Italian Sandwich", "$9.96", "Ham, salami, capicola & provolone.", "Signature"),
      item("hoagie-6", "#6 American Sandwich", "$10.49", "Turkey, salami, roast beef, ham & provolone."),
      item("hoagie-7", "#7 Sloppy Sandwich", "$11.01", "Turkey, roast beef, corned beef, coleslaw & Russian dressing."),
      item("hoagie-8", "#8 Corned Beef & Pastrami Sandwich", "$10.49", "Add cheese for add'l charge."),
      item("hoagie-9", "#9 Roast Beef & Cheese Sandwich", "$10.49"),
      item("hoagie-10", "#10 Bologna & Cheese Sandwich", "$9.44"),
      item("hoagie-11", "#11 Liverwurst Sandwich", "$8.39", "Add cheese for add'l charge."),
      item("hoagie-12", "#12 Honey Maple Turkey & Cheese Sandwich", "$9.96"),
    ],
  },
  {
    id: "salad-sandwiches",
    label: "Salad Sandwiches",
    folder: "sandwiches",
    items: [
      item("salad-sand-tuna", "#13 White Tuna Sandwich", "$8.91"),
      item("salad-sand-veggie-tuna", "#14 Low Fat Veggie Tuna Sandwich", "$9.44"),
      item("salad-sand-chicken", "#15 White Chicken Salad Sandwich", "$8.91"),
      item("salad-sand-cranberry", "#16 Cranberry Walnut Chicken Salad Sandwich", "$9.44"),
      item("salad-sand-shrimp", "#17 Shrimp Salad Sandwich", "$9.44"),
      item("salad-sand-egg", "#18 Egg Salad Sandwich", "$7.61"),
      item("salad-sand-whitefish", "#19 Whitefish Salad Sandwich", "$10.49"),
      item("salad-sand-salmon", "#20 Baked Salmon Salad Sandwich", "$10.49"),
    ],
  },
  {
    id: "vegetarian",
    label: "Vegetarian Sandwiches",
    folder: "sandwiches",
    items: [
      item("veg-all-veggies", "#21 All Fresh Veggies Sandwich", "$7.86", "Lettuce, tomato, onion, cucumber, roasted peppers, olives & jalapeño."),
      item("veg-cheese-combo", "#22 Veggie & Cheese Combo Sandwich", "$8.91", "Fresh veggie combo & choice of cheeses."),
    ],
  },
  {
    id: "paninis",
    label: "Paninis",
    folder: "sandwiches",
    items: [
      item("panini-1", "#1 Honey Maple Turkey Panini", "$9.71", "Roasted red pepper, provolone & honey mustard."),
      item("panini-2", "#2 Italian Combo Panini", "$9.71", "Ham, salami, capicola, provolone & roasted red pepper."),
      item("panini-3", "#3 Cali Turkey Panini", "$9.71", "Turkey, bacon, avocado & ranch."),
      item("panini-4", "#4 Chipotle Grilled Chicken Panini", "$9.71", "Bacon, pepper jack, avocado & chipotle ranch."),
      item("panini-5", "#5 BBQ Chicken Panini", "$9.71", "Bacon, cheddar, sweet BBQ sauce & homemade slaw."),
    ],
  },
  {
    id: "hot-wraps",
    label: "Hot Wraps",
    folder: "wraps",
    items: [
      item("wrap-hot-1", "#1 Balsamic Chicken Wrap", "$9.44", "Roasted red peppers, mozzarella & balsamic glaze."),
      item("wrap-hot-2", "#2 Crispy Honey Chicken Wrap", "$10.49", "Crispy chicken, bacon, lettuce, tomato & honey mustard."),
      item("wrap-hot-3", "#3 Cali Chicken Grilled Wrap", "$11.54", "Grilled chicken, bacon, avocado, lettuce, tomato & ranch.", "Popular"),
      item("wrap-hot-4", "#4 Crispy Buffalo Chicken Wrap", "$9.44", "Crispy chicken, buffalo sauce, blue cheese, lettuce & tomato."),
      item("wrap-hot-5", "#5 Grilled Chicken Caesar Wrap", "$9.44", "Grilled chicken, romaine, croutons, caesar & romano."),
    ],
  },
  {
    id: "cold-wraps",
    label: "Cold Wraps",
    folder: "wraps",
    items: [
      item("wrap-cold-6", "#6 Turkey BLT Wrap", "$10.49", "Turkey, bacon, lettuce, tomato & mayo."),
      item("wrap-cold-7", "#7 New Yorker Wrap", "$10.49", "Corned beef & pastrami, Swiss, coleslaw & Russian dressing."),
      item("wrap-cold-8", "#8 Light Veggie Tuna Wrap", "$8.66", "Light veggie tuna, lettuce, tomato & onion."),
      item("wrap-cold-9", "#9 Cali Honey Turkey Wrap", "$11.54", "Honey roasted turkey, avocado, bacon, lettuce & ranch."),
      item("wrap-cold-10", "#10 Chicken Salad BLT Wrap", "$10.49", "Chicken salad, bacon, lettuce & tomato."),
    ],
  },
  {
    id: "quesadillas",
    label: "Quesadillas",
    folder: "breakfast",
    note: "Served with sour cream & salsa.",
    items: [
      item("quesadilla-cheese", "Cheese Quesadilla", "$7.34"),
      item("quesadilla-chicken", "Chicken & Cheese Quesadilla", "$9.44"),
      item("quesadilla-chicken-bacon", "Chicken, Bacon & Ranch Quesadilla", "$10.49", "Grilled chicken, bacon & ranch."),
      item("quesadilla-buffalo", "Buffalo Chicken Ranch Quesadilla", "$9.44", "Buffalo tossed grilled chicken & ranch."),
    ],
  },
  {
    id: "burgers",
    label: "Burgers",
    folder: "burgers",
    items: [
      item("burger-cheese", "Cheeseburger", "$8.49"),
      item("burger-bacon", "Bacon Cheeseburger", "$10.49", null, "Popular"),
      item("burger-turkey", "Turkey Cheeseburger", "$8.91"),
      item("burger-mushroom-swiss", "Mushroom Swiss Burger", "$9.44"),
      item("burger-breakfast", "Breakfast Burger", "$11.54", "Bacon, American cheese, hash brown patty & egg over easy."),
      item("burger-avocado", "Avocado Burger", "$10.49", "Avocado, Swiss, pickle & choice of sauce."),
      item("burger-chipotle", "Chipotle Burger", "$11.54", "Bacon, pepper jack, avocado & chipotle ranch."),
      item("burger-kosher-deli", "Kosher Deli Burger", "$11.54", "Hot pastrami, pickle, mustard & coleslaw."),
    ],
  },
  {
    id: "hot-dogs",
    label: "Hot Dogs & Sides",
    folder: "sides",
    items: [
      item("hotdog-beef", "All Beef Hot Dog", "$3.66"),
      item("hotdog-italian", "Italian Hot Dog", "$6.29"),
      item("side-fries", "French Fries", "$4.46"),
      item("side-onion-rings", "Onion Rings", "$4.71"),
      item("side-tenders-3", "Chicken Tenders (3)", "$6.81", null, null, "chicken-tenders"),
      item("side-tenders-5", "Chicken Tenders (5)", "$8.91", null, null, "chicken-tenders"),
      item("side-wings-6", "Buffalo Wings (6)", "$7.86", null, null, "buffalo-wings"),
      item("side-wings-12", "Buffalo Wings (12)", "$12.59", null, null, "buffalo-wings"),
    ],
  },
  {
    id: "fresh-beverages",
    label: "Fresh Beverages",
    folder: "beverages",
    items: [
      item("bev-iced-tea", "Fresh Brewed Iced Tea", "$2.61", "Small, medium or large for add'l charge. Choice of sweetened or unsweetened."),
      item("bev-iced-tea-flavored", "Flavored Fresh Brewed Iced Tea", "$2.61", "Small, medium or large for add'l charge. Choice of sweetened or unsweetened.", null, "bev-iced-tea"),
      item("bev-lemonade", "Fresh Lemonade", "$3.14", "Small, medium or large for add'l charge."),
      item("bev-lemonade-flavored", "Flavored Fresh Lemonade", "$3.14", "Small, medium or large for add'l charge.", null, "bev-lemonade"),
      item("bev-smoothie", "Fruit Smoothies", "$5.24", "Small, medium or large for add'l charge. Choose from our selection of flavors. Add protein, vitamins or energy for add'l charge."),
    ],
  },
  {
    id: "bottled-beverages",
    label: "Beverages",
    folder: "beverages",
    items: [
      item("bev-canned-soda", "Canned Soda", "$1.39", "Choose from our selection."),
      item("bev-bottled-soda", "Bottled Soda (20 oz.)", "$2.75", "Choose from our selection."),
      item("bev-snapple", "Snapple (16oz.)", "$2.75", "Choose from our selection."),
      item("bev-gatorade", "Gatorade", "$2.75", "Choose from our selection."),
      item("bev-arizona", "Arizona (20oz.)", "$2.75", "Choose from our selection."),
      item("bev-vitamin-water", "Vitamin Water", "$2.49", "Choose from our selection."),
      item("bev-monster", "Monster", "$4.25", "Choose from our selection."),
      item("bev-bang", "Bang", "$4.25", "Choose from our selection.", null, "bev-energy-drink"),
      item("bev-bang-alt", "Bang", "$4.49", "Choose from our selection.", null, "bev-energy-drink"),
      item("bev-bai", "Bai", "$3.49", "Choose from our selection."),
      item("bev-calypso", "Calypso", "$3.49", "Choose from our selection."),
      item("bev-poland-sparkling", "Poland Spring Sparkling Water", "$1.99", "Choose from our selection."),
      item("bev-tropicana-12", "Tropicana (12oz.)", "$2.49", "Choose from our selection.", null, "bev-tropicana"),
      item("bev-tropicana-16", "Tropicana (16oz.)", "$2.75", "Choose from our selection.", null, "bev-tropicana"),
      item("bev-tropicana-gallon", "Tropicana Orange Juice (Gallon)", "$5.99"),
      item("bev-choc-milk-16", "Cream o Land Chocolate Milk (16oz)", "$2.49", null, null, "bev-chocolate-milk"),
      item("bev-choc-milk-quart", "Cream o Land Chocolate Milk (quart)", "$3.25", null, null, "bev-chocolate-milk"),
      item("bev-nesquik", "Nesquik", "$2.75", "Choose from our selection."),
      item("bev-yoohoo", "Yoohoo", "$2.25"),
      item("bev-red-bull", "Red Bull", "$3.49", "8oz or 12 oz or 20 oz for add'l charge."),
      item("bev-red-bull-diet", "Diet Red Bull (8oz)", "$3.49", null, null, "bev-red-bull"),
      item("bev-sbux-frap-95", "Starbucks Frappuccino Coffee Flavor (9.5 oz)", "$3.49"),
      item("bev-sbux-frap-13", "Starbucks Frappuccino (13oz)", "$4.49", "Choose from our selection.", null, "bev-sbux-frap"),
      item("bev-sbux-double", "Starbucks Double Shot", "$4.49", "Choose from our selection."),
      item("bev-poland-water", "Poland Spring Bottled Water", "$1.79", "12oz. or sport cap or 1 liter for add'l charge."),
      item("bev-fiji", "Fiji Water", "$2.25"),
      item("bev-essentia", "Essentia Water", "$2.25", null, null, "bev-premium-water"),
    ],
  },
];

const imageKeys = new Set();
categories.forEach((cat) => {
  cat.items.forEach((i) => imageKeys.add(i.imageKey));
});

const manifest = {};
for (const key of imageKeys) {
  manifest[key] = {
    path: `assets/menu/_placeholder/${key}.jpg`,
    remote: null,
    alt: key.replace(/-/g, " "),
  };
}

const dataJs = `/**
 * Bagel Bazaar Monroe — full menu data (auto-generated)
 * Regenerate: node scripts/generate-menu.mjs
 */
window.MENU_CATEGORIES = ${JSON.stringify(categories, null, 2)};
`;

mkdirSync(join(root, "assets", "menu"), { recursive: true });
writeFileSync(join(root, "js", "menu-data.js"), dataJs, "utf8");
writeFileSync(join(root, "assets", "menu", "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

const totalItems = categories.reduce((n, c) => n + c.items.length, 0);
console.log(`Generated ${categories.length} categories, ${totalItems} items, ${imageKeys.size} unique image keys.`);
