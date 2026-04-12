// ─── FoodItem Class ───────────

class FoodItem {
  static totalItems = 0;

  // Private fields (Encapsulation)
  #itemId;
  #name;
  #availableQuantity;

  constructor(itemId, name, availableQuantity) {
    this.#itemId = itemId;
    this.#name = name;
    this.#availableQuantity = availableQuantity;
    FoodItem.totalItems++;
  }

  // Getters
  get itemId() {
    return this.#itemId;
  }

  get name() {
    return this.#name;
  }

  get availableQuantity() {
    return this.#availableQuantity;
  }

  // Optional setter
  set availableQuantity(quantity) {
    if (quantity >= 0) {
      this.#availableQuantity = quantity;
    } else {
      console.log("Quantity cannot be negative.");
    }
  }

  // Abstraction: caller does not need to know internal stock logic
  orderItem() {
    if (this.#availableQuantity > 0) {
      this.#availableQuantity--;
      console.log(`${this.#name} ordered. Remaining: ${this.#availableQuantity}`);
    } else {
      console.log(`${this.#name} is out of stock.`);
    }
  }

  restockItem(quantity) {
    if (quantity > 0) {
      this.#availableQuantity += quantity;
      console.log(`${this.#name} restocked. Available: ${this.#availableQuantity}`);
    } else {
      console.log("Restock quantity must be greater than 0.");
    }
  }

  getSummary() {
    return `Food Item: ${this.#name} | Available Quantity: ${this.#availableQuantity}`;
  }

  static getTotalItems() {
    return FoodItem.totalItems;
  }
}

// ─── Customer Class ──────────────

class Customer {
  static totalCustomers = 0;

  // Private fields (Encapsulation)
  #customerId;
  #name;

  constructor(customerId, name) {
    this.#customerId = customerId;
    this.#name = name;
    Customer.totalCustomers++;
  }

  // Getters
  get customerId() {
    return this.#customerId;
  }

  get name() {
    return this.#name;
  }

  placeOrder(foodItem) {
    console.log(`${this.#name} is placing an order for ${foodItem.name}`);
    foodItem.orderItem();
  }

  cancelOrder(foodItem) {
    console.log(`${this.#name} cancelled order for ${foodItem.name}`);
    foodItem.restockItem(1);
  }

  getSummary() {
    return `Customer: ${this.#name} (ID: ${this.#customerId})`;
  }
}

// ─── PremiumCustomer Subclass ───────────

class PremiumCustomer extends Customer {
  #membershipLevel;

  constructor(customerId, name, membershipLevel) {
    super(customerId, name); // Inheritance
    this.#membershipLevel = membershipLevel;
  }

  get membershipLevel() {
    return this.#membershipLevel;
  }

  // Polymorphism: overriding placeOrder()
  placeOrder(foodItem) {
    console.log(
      `${this.name} (${this.#membershipLevel} Member) is placing a priority order for ${foodItem.name}`
    );
    foodItem.orderItem();
  }

  // Overriding getSummary()
  getSummary() {
    return `[PREMIUM] Customer: ${this.name} (ID: ${this.customerId}) | Membership: ${this.#membershipLevel}`;
  }
}

// ─── Usage Section ────────────────

const pizza = new FoodItem("F001", "Pizza", 5);
const burger = new FoodItem("F002", "Burger", 3);

const customer1 = new Customer("C001", "Kenechukwu");
const customer2 = new PremiumCustomer("C002", "Ada", "Gold");

console.log(pizza.getSummary());
console.log(customer1.getSummary());
console.log(customer2.getSummary());

customer1.placeOrder(pizza);
customer2.placeOrder(pizza);

customer1.placeOrder(burger);
customer2.cancelOrder(burger);

console.log(`Total food items: ${FoodItem.getTotalItems()}`);
console.log(`Total customers: ${Customer.totalCustomers}`);