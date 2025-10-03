abstract class Pizaa {
    type: string | undefined;
    price: number | undefined;
    receipy: string | undefined;
}
class BlackPizza implements Pizaa {
    type: string;
    price: number;
    receipy: string;
    constructor() {
        this.type = "black";
        this.price = 10;
        this.receipy = "";
    }
}
class RedPizza implements Pizaa {
    type: string;
    price: number;
    receipy: string;
    constructor() {
        this.type = "red";
        this.price = 10;
        this.receipy = "";
    }
}
class PizzaShop {
    getPizza(pizzaType: String) {
        switch (pizzaType) {
            case "black":
                return new BlackPizza();
            case "red":
                return new RedPizza();
        }
    }
}

const p = new PizzaShop();
console.log(p.getPizza("red"));
