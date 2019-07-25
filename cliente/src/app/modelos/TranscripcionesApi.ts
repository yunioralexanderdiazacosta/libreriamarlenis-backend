export class TranscripcionesApi {
	
	constructor(
	public titulo: string,
	public contenido: string,
	public fechaEntrega: string,
	public monto: number,
	public archivo_inv: number,
	public venta_id: number,
	public usuario_id: number
	) {}
}