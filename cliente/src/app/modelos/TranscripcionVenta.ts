export class TranscripcionVenta {
	
	constructor(
		public fechaEntrega: string,
		public subtotal: number,
		public encargado_id: number,
		public encargado_usuario: string,
		public categoria: number,
		public titulo: string,
		public archivo_id: number,
		public contenido: string) {}
}