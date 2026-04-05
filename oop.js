// ─── FoodItem Class ──────────

class FoodItem {
  static totalItems = 0;

  constructor(itemId, name, availableQuantity) {
    this.itemId = itemId;
    this.name = name;
    this.availableQuantity = availableQuantity;
    FoodItem.totalItems++;
  }

  // Instance method
  orderItem() {
    if (this.availableQuantity > 0) {
      this.availableQuantity--;
      console.log(`${this.name} ordered. Remaining: ${this.availableQuantity}`);
    } else {
      console.log(`${this.name} is out of stock.`);
    }
  }

  restockItem(quantity) {
    this.availableQuantity += quantity;
    console.log(`${this.name} restocked. Available: ${this.availableQuantity}`);
  }

  // Static method
  static getTotalItems() {
    return FoodItem.totalItems;
  }
}

// ─── Customer Class ───────────

class Customer {
  static totalCustomers = 0;

  constructor(customerId, name) {
    this.customerId = customerId;
    this.name = name;
    Customer.totalCustomers++;
  }

  placeOrder(foodItem) {
    console.log(`${this.name} is placing an order for ${foodItem.name}`);
    foodItem.orderItem();
  }

  cancelOrder(foodItem) {
    console.log(`${this.name} cancelled order for ${foodItem.name}`);
    foodItem.restockItem(1);
  }
}

// ─── Usage ──────────

const pizza = new FoodItem("F001", "Pizza", 5);
const burger = new FoodItem("F002", "Burger", 3);

const customer1 = new Customer("C001", "Kenechukwu");
const customer2 = new Customer("C002", "Ada");

customer1.placeOrder(pizza);
customer2.placeOrder(pizza);

customer1.placeOrder(burger);
customer2.cancelOrder(burger);

console.log(`Total food items: ${FoodItem.getTotalItems()}`);
console.log(`Total customers: ${Customer.totalCustomers}`);
