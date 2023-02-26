import { Employee } from "./employee.entity";
import { InventoryBalance } from "./InventoryBalance.entity";
import { Product } from "./product.entity";
import { Warehouse } from "./warehouse.entity";

const entities = [Employee, Product, Warehouse, InventoryBalance];

export {Employee, Product, Warehouse, InventoryBalance};
export default entities;