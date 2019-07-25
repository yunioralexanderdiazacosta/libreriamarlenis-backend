export class ProductoVenta {
	
	constructor(
		public producto_id: number, 
		public producto_nombre: string,
		public cantidad: string,
		public precio: number,
		public subtotal: number) {
	}
}