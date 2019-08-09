import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from '../../../servicios/proveedores/proveedores.service';
import { ComprasService } from '../../../servicios/compras/compras.service';
import { ProductosService } from '../../../servicios/productos/productos.service';
import { CompraApi } from '../../../modelos/CompraApi';
import { PedidoCompraApi } from '../../../modelos/PedidoCompraApi';
import { Compra } from '../../../modelos/Compra';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-compra',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaCompraComponent implements OnInit {
    /**
    *Almacena los datos generales de la compra
    *
    *@property {FormGroup}
    **/
    formCompra: FormGroup

    /**
    *Almacena cada uno de los proveedores obtenidos de la API
    *
    *@property {Array}
    **/
    proveedores: any = [];
 
    /**
    *Activar o desactivar formulario para agregar nueva solicitud
    *
    *@property {boolean}
    **/
    nuevaSolicitud: boolean = false;

    /**
    *Mensaje de error
    *
    *@property {string}
    **/
    input_required: string = 'Este campo es requerido'

    /** 
    * Almacena los productos obtenidos de la API
    *
    *@property {Array}
    **/
    productosApi

    /** 
    * Almacena los productos obtenidos del arreglo
    *
    *@property {Array}
    **/
    productosArreglo;

    /** 
    * Almacena los productos de la compra obtenidos del arreglo
    *
    *@property {Array}
    **/
    compras: Array<Compra> = [];

    /** 
    * Subtotal de la venta
    *
    *@property {number}
    **/
    subtotalCompra: number = 0;

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
    totalCompra: number = 0;

    /** 
    * Verifica si el formulario ha sido enviado
    *
    *@property {boolean}
    **/
    submitted: boolean = false

    /** 
    * Almacena los datos generales de la compra a ser enviados a la API
    *
    *@property {CompraApi}
    **/
    CompraApi: CompraApi

    /** 
    * Almacena los datos especificos de la compra a ser enviados a la API
    *
    *@property {PedidoCompraApi}
    **/
    PedidoCompraApi: PedidoCompraApi;

    /** 
    * Almacena el identificador de la compra obtenido de la API
    *
    *@property {CompraApi}
    **/
    compra_id: number = 0

    constructor(
        public fb: FormBuilder,
        public toastr: ToastrService,
        public proveedoresService: ProveedoresService,
        public productosService: ProductosService,
        public comprasService: ComprasService,
        public router: Router) { }

    ngOnInit() {
        this.listarProveedores()
        this.obtenerMontos()
        this.obteniendoProductos()
        this.formCompra = this.fb.group({
            proveedor_id: ['', Validators.required],
            proveedor_contacto: [''],
            proveedor_telefono: ['']
        })
    }

    get f(){ return this.formCompra.controls }

    listarProveedores(){
        this.proveedoresService.obtenerProveedores().subscribe(
        res => {
            this.proveedores = res
        },
        err => {
           console.log(err)
        })
    }

    ultimoProveedor(){
        this.listarProveedores()
        this.proveedoresService.obtenerUltimoProveedor().subscribe(
        res => {
            this.formCompra.patchValue({ proveedor_id: res })
            this.obtenerProveedor(res)
        },
        err => {
            console.log(err)
        })
    }

    obtenerProveedor(id)
    {
        this.proveedores.find(dato => {
            if(dato.id == id){
                this.formCompra.patchValue({
                    proveedor_contacto: dato.contacto,
                    proveedor_telefono: dato.telefono
                })
            }
        })
    }

    obtenerMontos()
    {
        this.subtotalCompra = 0;
        this.compras = this.comprasService.obtenerCompraArreglo()
        this.compras.filter(dato => {
            this.subtotalCompra = this.subtotalCompra + dato.subtotal
        })
        this.subtotalIVA = this.subtotalCompra * (19 /100);
        this.totalCompra = this.subtotalCompra + this.subtotalIVA;
    }

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

    enviarDatosCompra()
    {
        this.submitted = true
        if(this.formCompra.invalid){  return } 

        if(this.compras.length > 0)
        {
            this.CompraApi = new CompraApi(null,null)
            this.CompraApi.total = this.totalCompra
            this.CompraApi.proveedor_id = parseInt(this.formCompra.value.proveedor_id)

            this.comprasService.guardarCompraApi(this.CompraApi).subscribe(
            (res: any) => {
                this.compra_id = res
                this.compras.filter(dato => {
                    this.PedidoCompraApi = new PedidoCompraApi(null,null,null,null,null)
                    this.PedidoCompraApi.producto_id = dato.producto_id
                    this.PedidoCompraApi.cantidad_compra = dato.cantidad
                    this.PedidoCompraApi.precio_compra = dato.precio_compra
                    this.PedidoCompraApi.subtotal = dato.subtotal
                    this.PedidoCompraApi.compra_id = this.compra_id 
                    this.comprasService.guardarPedidoCompraApi(this.PedidoCompraApi).subscribe(err => {
                        console.log(err)
                    })

                    let datos = {
                        producto_id: dato.producto_id,
                        cantidad_compra: dato.cantidad,
                        precio_venta: dato.precio_venta
                    }
                    this.productosService.aumentarInventarioProducto(datos).subscribe(err => {
                        console.log(err)
                    })
                })

            this.compras.length = 0
            this.toastr.success('Datos almacenados correctamente.', 'Exito')
            this.router.navigateByUrl('compras')
            },
            err => {
                console.log(err)
            })
        }
        else
        {
            this.toastr.error('No se ha insertado ningún registro.', 'Error');
        }
       
    }
}
