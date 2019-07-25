export class TokenPayload {
	constructor(
	public id: number,
	public cedula: string,
	public nombres: string,
	public apellidos: string,
	public correo: string,
	public telefono: string,
	public usuario: string,
	public clave: string,
	public estatus: number,
	public rol_id: number,
	public created_at: Date
	){}
}