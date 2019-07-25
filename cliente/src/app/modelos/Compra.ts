export class Compra  {
	
	constructor(
	public producto_id: number,
	public producto_nombre:string,
	public cantidad: number,
	public precio_compra: number,
	public precio_venta: number,
	public subtotal: number
	) {}
}