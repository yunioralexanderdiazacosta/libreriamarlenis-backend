import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../../../servicios/clientes/clientes.service';
import { ProductosService } from '../../../servicios/productos/productos.service';
import { CopiasService } from '../../../servicios/copias/copias.service';
import { TipoCopiasService } from '../../../servicios/tipo-copias/tipo-copias.service';
import { TranscripcionesService } from '../../../servicios/transcripciones/transcripciones.service';
import { VentasService } from '../../../servicios/ventas/ventas.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { Cliente } from '../../../modelos/Cliente';
import { ProductoApi } from '../../../modelos/ProductoApi';
import { CopiasApi } from '../../../modelos/CopiasApi';
import { TranscripcionesApi } from '../../../modelos/TranscripcionesApi';
import { Venta } from '../../../modelos/Venta';
import { ToastrService } from 'ngx-toastr';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaVentaComponent implements OnInit {
    /**
    *Formulario del cliente
    *
    *@property {FormGroup}
    **/
    formCliente: FormGroup;

    /**
    *Guarda los clientes obtenidos de la API
    *
    *@property {Array}
    **/
    clientes: Array<Cliente>; 

     /**
    *Guarda el cliente obtenido de la API
    *
    *@property {Object}
    **/
    cliente: Cliente;

    /** 
    * Activa o desactiva el collapse de productos
    *
    *@property {boolean}
    **/
    formProductos: boolean = false;

    /** 
    * Activa o desactiva el collapse de copias
    *
    *@property {boolean}
    **/
    formCopias: boolean = false;

    /** 
    * Activa o desactiva el collapse de transcripciones
    *
    *@property {boolean}
    **/
    formTranscripciones: boolean = false;

    /** 
    * Almacena los productos obtenidos del arreglo
    *
    *@property {Array}
    **/
    productos;

    /** 
    * Almacena monto total de cada uno de los productos    
    *
    *@property {number}
    **/
    montoProductos = 0;

    /** 
    * Almacena las copias obtenidas del arreglo
    *
    *@property {Array}
    **/
    copias;

    /** 
    * Almacena monto total de cada una de las copias    
    *
    *@property {number}
    **/
    montoCopias = 0;

     /** 
    * Almacena monto total de cada una de las transcripciones    
    *
    *@property {number}
    **/
    montoTranscripciones = 0;


    /** 
    * Subtotal de la venta
    *
    *@property {number}
    **/
    subtotalVenta: number = 0;

    /** 
    * Total del Iva
    *
    *@property {number}
    **/    
    subtotalIVA: number = 0;

    /** 
    * Monto total de la venta
    *
    *@property {number}
    **/
    totalVenta: number = 0;

    /** 
    * Obtiene los productos de la API
    *
    *@property {Array}
    **/
    productosApi;

    /** 
    * Obtiene los productos del arreglo
    *
    *@property {Array}
    **/
    productosArreglo;

    /** 
    * Guardar los tipos de copias de la API
    *
    *@property {Array}
    **/
    tipoCopiasApi;

    /** 
    * Obtiene los tipos de copias del arreglo
    *
    *@property {Array}
    **/
    tipoCopiasArreglo;

    /** 
    * Obtiene las transcripciones almacenadas en el arreglo
    *
    *@property {Array}
    **/
    transcripciones;

    /** 
    * Almacena los datos a enviar de cada producto a la API
    *
    *@property {Object}
    **/
    ProductoApi: ProductoApi

    /** 
    * Almacena los datos a enviar de cada copia a la API
    *
    *@property {Object}
    **/
    CopiaApi: CopiasApi

    /** 
    * Almacena los datos a enviar de cada copia a la API
    *
    *@property {Object}
    **/
    TranscripcionApi: TranscripcionesApi

    /** 
    * Almacena los datos a enviar de la venta a la API
    *
    *@property {Object}
    **/
    Venta: Venta

    /** 
    * Almacena el identificador de la venta
    *
    *@property {number}
    **/
    venta_id: any

    /** 
    * Almacena los datos del usuario conectado
    *
    *@property {Object}
    **/
    usuario

    /** 
    * Para activar el el envio del formulario
    *
    *@property {number}
    **/
    submitted: boolean = false

    /** 
    * Almacena el total de copias dañadas introducido en el componente hijo
    *
    *@property {number}
    **/
    copias_danadas: number

    constructor(
        public fb: FormBuilder,
        public clientesService: ClientesService,
        public productosService: ProductosService,
        public copiasService: CopiasService,
        public tipoCopiasService: TipoCopiasService,
        public ventasService: VentasService,
        public transcripcionesService: TranscripcionesService,
        public usuariosService: UsuariosService,
        public toastr: ToastrService,
        private config: NgSelectConfig,
        public router: Router) 
    { 
        this.config.notFoundText = 'No se encontraron resultados';
    }

    ngOnInit() {
        this.obtenerClientes();
        this.obtenerMontoVenta();
        this.obteniendoProductos();
        this.obteniendoTipoCopias();
        this.formCliente = this.fb.group({
            cliente: [''],
            nombre: [''],
            apellido: ['']
        })

        this.usuariosService.obtenerUsuario().subscribe(
            res => {
                this.usuario = res
            },
            err => {
                console.log(err)
            }
        )
    }

    /** 
    * Accede a cada uno de los elementos del formulario
    *
    *@return {Object}
    **/
    get f() { return this.formCliente.controls }

    /** 
    * Activar o desactivar el formulario para agregar productos
    *
    *@return {void}
    **/
    activarFormProductos()
    {
        this.formProductos = !this.formProductos
        const cliente = this.formCliente.get('cliente')
        cliente.setValidators(Validators.required)
        cliente.updateValueAndValidity()
    }

    /** 
    * Activar o desactivar el formulario para agregar copias
    *
    *@return {void}
    **/
    activarFormCopias()
    {
        this.formCopias = !this.formCopias
    }

    /** 
    * Activar o desactivar el formulario para agregar transcripciones
    *
    *@return {void}
    **/
    activarFormTranscripciones()
    {
        this.formTranscripciones = !this.formTranscripciones  
        const cliente = this.formCliente.get('cliente')
        cliente.setValidators(Validators.required)
        cliente.updateValueAndValidity() 
    }

    /** 
    * Obtiene las copias danadas del componente hijo
    *
    *@return {void}
    **/
    obtenerCopiasDanadas(copias)
    {
        this.copias_danadas = copias
    }

    /** 
    * Obtiene los clientes de la API y los almacena en el array
    *
    *@return {void}
    **/
    obtenerClientes()
    {
        this.clientesService.obtenerClientes().subscribe(
            (res: any) => {
                this.clientes = res;
            },
            err => {
                console.log(err);
            }
        )
    }

    /** 
    * Obtiene los nombres y apellidos del cliente seleccionado
    *
    *@return {void}
    **/
    obtenerDatos(id)
    {
        if(id)
        {
            this.clientesService.obtenerCliente(id).subscribe(
            (res: any) => {
                this.cliente = res;
                this.formCliente.patchValue({
                    nombre: this.cliente.nombres,
                    apellido: this.cliente.apellidos
                })
            },
            err => {
                console.log(err);
            })
        }
    }

    /** 
    * Obtiene los monto subtotales y total de la venta
    *
    *@return {void}
    **/
    obtenerMontoVenta()
    {
        this.montoProductos = 0;
        this.montoCopias = 0;
        this.montoTranscripciones = 0;
        this.productos = this.productosService.obtenerProductosVenta();
        this.copias = this.copiasService.obtenerCopiasArreglo();
        this.transcripciones = this.transcripcionesService.obtenerTranscripcionesArreglo();

        this.productos.filter(dato => {
            this.montoProductos = this.montoProductos + dato.subtotal 
        })
        this.copias.filter(dato => {
            this.montoCopias = this.montoCopias + dato.subtotal
        })
        this.transcripciones.filter(dato => {
            this.montoTranscripciones = this.montoTranscripciones + dato.subtotal
        })
        this.subtotalVenta = 0
        this.subtotalVenta = this.montoProductos + this.montoCopias + this.montoTranscripciones;
        this.subtotalIVA = this.subtotalVenta * (19 /100);
        this.totalVenta = this.subtotalVenta + this.subtotalIVA;
    }

    /** 
    * Obtiene los productos de la API y los almacena en el arreglo
    *
    *@return {void}
    **/
    obteniendoProductos()
    {
        this.productosService.obtenerProductos().subscribe(
        (res: any) => {
            this.productosApi = res;
            this.productosArreglo = this.productosService.obtenerProductosArreglo();
            this.productosArreglo.length = 0;
            this.productosApi.map(dato => {   
                let productoArreglo = {
                    id: 0,
                    nombre: '',
                    precio_venta: 0,
                    stock: 0,
                    estado: 0
                }; 
                productoArreglo.id = dato.id;
                productoArreglo.nombre = dato.nombre;
                productoArreglo.precio_venta = dato.precio_venta;
                productoArreglo.stock = dato.stock
                this.productosService.guardarProductoArreglo(productoArreglo)
            })  
        },
        err => {
            console.log(err)
        })
    }

    /** 
    * Obtiene los tipos de copias de la API y los almacena en el arreglo
    *
    *@return {void}
    **/
    obteniendoTipoCopias()
    {

        this.tipoCopiasService.obtenerTipoCopias().subscribe(
        res => {
            this.tipoCopiasApi = res;
            this.tipoCopiasArreglo = this.tipoCopiasService.obtenerTipoCopiasArreglo()
            this.tipoCopiasArreglo.length = 0;
            this.tipoCopiasApi.map(dato => {
                let tipoCopiaArreglo = {
                    id: 0,
                    descripcion: '',
                    precio: 0,
                    estado: 0 
                };
                tipoCopiaArreglo.id = dato.id,
                tipoCopiaArreglo.descripcion = dato.descripcion,
                tipoCopiaArreglo.precio = dato.precio,
                this.tipoCopiasService.guardarTipoCopiaArreglo(tipoCopiaArreglo)
            })
        },
        err => {
            console.log(err)
        })
    }

    guardarDatosVenta()
    {
        this.submitted = true
        if(this.formCliente.invalid) { return; }

        if(this.productos.length > 0 || this.copias.length > 0 || this.transcripciones.length > 0  )
        {
            this.Venta = new Venta(null,null,null, 1)
            this.Venta.cliente_id = this.formCliente.value.cliente
            this.Venta.total = this.totalVenta
            this.Venta.usuario_id = this.usuario.id

            this.ventasService.guardarVenta(this.Venta).subscribe(
            res => {
                this.venta_id = res

                if(this.productos.length > 0)
                {
                    this.productos.filter(dato => {
                        this.ProductoApi = new ProductoApi(null, null, null, null)
                        this.ProductoApi.cantidad = dato.cantidad
                        this.ProductoApi.subtotal = dato.subtotal
                        this.ProductoApi.venta_id = this.venta_id 
                        this.ProductoApi.producto_id = parseInt(dato.producto_id)
                       
                        this.productosService.guardarProducto(this.ProductoApi).subscribe(
                        err => {
                            console.log(err)
                        })
                        let campos = {
                                producto_id: this.ProductoApi.producto_id,
                                cantidad: this.ProductoApi.cantidad
                            } 
                        this.productosService.actualizarInventarioProducto(campos).subscribe(
                        err => {
                            console.log(err)
                        })
                    })
                }
                
                if(this.copias.length > 0)
                {
                    this.copias.filter(dato => {
                        this.CopiaApi = new CopiasApi(null, null, null, null)
                        this.CopiaApi.cantidad = dato.cantidad,
                        this.CopiaApi.subtotal = dato.subtotal
                        this.CopiaApi.venta_id = this.venta_id 
                        this.CopiaApi.tipocopia_id = parseInt(dato.tipo_id)

                        this.copiasService.guardarCopias(this.CopiaApi).subscribe(
                        err => {
                            console.log(err)
                        })
                        if(this.copias_danadas > 0)
                        {
                            let datos = {
                                cantidad: this.copias_danadas,
                                venta_id: this.venta_id
                            }
                            this.copiasService.guardarCopiasDanadas(datos).subscribe(
                            err => {
                                console.log(err)
                            })
                        }
                    })
                }
                
                if(this.transcripciones.length > 0)
                {
                    this.transcripciones.filter(dato => {
                        this.TranscripcionApi = new TranscripcionesApi('', '', '', null, 0, null, null, null)
                        this.TranscripcionApi.titulo = dato.titulo
                        this.TranscripcionApi.contenido = dato.contenido
                        this.TranscripcionApi.fechaEntrega = dato.fechaEntrega
                        this.TranscripcionApi.monto = dato.subtotal
                        this.TranscripcionApi.archivo_inv =  dato.archivo_id
                        this.TranscripcionApi.tipo_transcripcion = parseInt(dato.categoria)
                        this.TranscripcionApi.venta_id =  this.venta_id
                        this.TranscripcionApi.usuario_id = parseInt(dato.encargado_id)
                        
                        this.transcripcionesService.guardarTranscripcion(this.TranscripcionApi).subscribe(
                        err => {
                            console.log(err)
                        }) 
                    })
                }
            this.productos.length = 0
            this.copias.length = 0
            this.transcripciones.length = 0
            this.toastr.success('Datos almacenados correctamente.', 'Exito')
            this.router.navigateByUrl('ventas')
            },
            err => {
                console.log(err)
            })
        }
        else
        {
            this.toastr.error('No se ha insertado ningún registro.', 'Error')
        }
    }
}
