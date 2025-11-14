import Customer from "../../src/models/CustomerModel";

class CustomerAppOs extends Customer {
  constructor(data) {
    super(data);

    // Placeholder temporário porque equipamentos e OS ainda não estão disponíveis na Main
    this.equipmentList = [];
    this.orderServiceList = [];
  }
}

export default CustomerAppOs;