/////// Contexto 01: Company
// No tiene vida propia
class Address {
  district: string;
  street: string;
  num: number;

  constructor(district: string, street: string, num: number) {
    this.district = district;
    this.street = street;
    this.num = num;
  }
}

// No tiene vida propia
class CompanyBusiness {
  //id: string
  businessId: string;
  //name: string
  constructor(businessId: string) {
    this.businessId = businessId;
  }
}

interface CompanyProperties {
  id: string;
  name: string;
  ruc: string;
  locals: Array<Address>;
  business: Array<CompanyBusiness>;
}

class Company {
  id: string;
  name: string;
  ruc: string;
  locals: Array<Address>;
  business: Array<CompanyBusiness>;

  constructor(props: CompanyProperties) {
    if (props.name.trim().length < 3)
      throw "Name must have 3 characters at least";
    if (props.ruc.trim().length !== 10) throw "Ruc must have 10 characters";

    if (props.locals.length < 1) throw "Company must have 1 local at least";
    if (props.business.length < 1)
      throw "Company must have 1 business at least";

    this.id = props.id;
    this.name = props.name;
    this.ruc = props.ruc;
    this.locals = props.locals;
    this.business = props.business;
  }
}

const props: CompanyProperties = {
  id: "12345",
  name: "Company name",
  ruc: "1034568798",
  locals: [new Address("distric01", "street01", 123)],
  business: [
    new CompanyBusiness("1"),
    new CompanyBusiness("2"),
    new CompanyBusiness("3"),
  ],
};

const company = new Company(props);
console.log(company);

const address = new Address("district", "street", 123);
const business = new CompanyBusiness("5");

//////////////// Contexto 02: Product

class Company2 {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

class Product {
  productId: string;
  productName: string;
  companies: Array<Company2>;

  constructor(
    productId: string,
    productName: string,
    companies: Array<Company2>
  ) {
    this.productId = productId;
    this.productName = productName;
    this.companies = companies;
  }
}

const product = new Product("abc123", "product star", [new Company2("12345")]);
console.log("product", product);
