export class CopiasVenta {
	constructor(
		public tipo_id: number,
  		public tipo_descripcion: string,
  		public cantidad: number,
  		public precio: number,
  		public subtotal: number
	){}
}