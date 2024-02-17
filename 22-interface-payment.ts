interface PaymentCheckout {
  checkout(product: string, price: number): boolean;
}

interface PaymentCancel {
  cancel(): void;
}

class Payment01 implements PaymentCheckout, PaymentCancel {
  cancel(): void {
    console.log("Payment01 cancelled");
  }
  checkout(product: string, price: number): boolean {
    const randomNumber = Math.random();
    return randomNumber > 0.5;
  }
}

class Payment02 implements PaymentCheckout, PaymentCancel {
  cancel(): void {
    console.log("Payment02 cancelled");
  }
  checkout(product: string, price: number): boolean {
    const randomNumber = Math.random();
    return randomNumber > 0.5;
  }
}

class Payment03 implements PaymentCheckout {
  checkout(product: string, price: number): boolean {
    const randomNumber = Math.random();
    return randomNumber > 0.5;
  }
}

type IPayment = PaymentCheckout & PaymentCancel;

const payment01: IPayment = new Payment01();
if (!payment01.checkout("product", 10)) {
  const payment02: IPayment = new Payment02();
  if (!payment01.checkout("product", 10)) {
    const payment03: PaymentCheckout = new Payment03();
    payment03.checkout("product", 10);
  } else {
    console.log("Payment02 executed");
  }
} else {
  console.log("Payment01 executed");
}
