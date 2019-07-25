export class PedidoCompraApi {
	constructor(
		public cantidad_compra: number,
		public precio_compra: number,
		public subtotal: number,
		public producto_id: number,
		public compra_id: number,
	){}
}