import { Delivery } from "./delivery.entity";
import { Employee } from "./employee.entity";
import { InventoryBalance } from "./InventoryBalance.entity";
import { Product } from "./product.entity";
import { Warehouse } from "./warehouse.entity";

const entities = [Employee, Product, Warehouse, InventoryBalance, Delivery];

export {Employee, Product, Warehouse, InventoryBalance, Delivery};
export default entities;