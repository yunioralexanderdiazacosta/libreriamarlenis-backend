import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IniciarsesionComponent } from './componentes/iniciarsesion/iniciarsesion.component';
import { RecuperarContrasenaComponent } from './componentes/contrasena/recuperar/recuperar.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

/****************************************** CLIENTE *********************************************************/
import { ListaClientesComponent } from './componentes/clientes/lista/lista.component';
import { ClientesEdicionComponent } from './componentes/clientes/edicion/edicion.component';
import { HistoricoClienteComponent } from './componentes/clientes/historico/historico.component';
/***********************************************************************************************************/

/****************************************** VENTAS *********************************************************/
import { ListaVentasComponent } from './componentes/ventas/lista/lista.component';
import { NuevaVentaComponent } from './componentes/ventas/nueva/nueva.component';
import { DetallesVentaComponent } from './componentes/ventas/detalles/detalles.component';
/***********************************************************************************************************/

/**************************************** COMPRAS **********************************************************/
import { ListaComprasComponent } from './componentes/compras/lista/lista.component';
import { NuevaCompraComponent } from './componentes/compras/nueva/nueva.component';
import { DetallesCompraComponent } from './componentes/compras/detalles/detalles.component';

import { ListaProveedoresComponent } from './componentes/compras/proveedores/lista/lista.component';
import { ProveedorVistaComponent } from './componentes/proveedores/vista/vista.component';
import { ProveedorEdicionComponent } from './componentes/proveedores/edicion/edicion.component';
/***********************************************************************************************************/

/***************************************** INVENTARIO ******************************************************/
import { ListaInventarioComponent } from './componentes/inventario/lista/lista.component';
import { ListaEntradasComponent } from './componentes/inventario/entradas/lista/lista.component';
import { NuevaEntradaComponent } from './componentes/inventario/entradas/nueva/nueva.component';
import { CategoriasProductosComponent } from './componentes/inventario/categorias/categorias.component';
import { CategoriaProductoEditarComponent } from './componentes/inventario/categorias/editar/editar.component';
import { ProductosEdicionComponent } from './componentes/productos/edicion/edicion.component';
/***********************************************************************************************************/

/************************************* TRANSCRIPCIONES *****************************************************/
import { ListaTranscripcionesComponent } from './componentes/transcripciones/lista/lista.component';
import { NuevaTranscripcionComponent  } from './componentes/transcripciones/nueva/nueva.component';
import { EditarTrancripcionComponent  } from './componentes/transcripciones/editar/editar.component';
import { EdicionTranscripcionComponent } from './componentes/transcripciones/edicion/edicion.component';
import { AlmacenamientoComponent } from './componentes/transcripciones/almacenamiento/almacenamiento.component';
//tipo de tareas
import { TipoTareasListaComponent } from './componentes/transcripciones/categorias/lista/lista.component';
import {TipoTareasEditarComponent } from './componentes/transcripciones/categorias/editar/editar.component';
/***********************************************************************************************************/

/****************************************** REPORTES *******************************************************/
import { ReportesSeleccionComponent } from './componentes/reportes/seleccion/seleccion.component';
import { ReporteVentasComponent } from './componentes/reportes/ventas/ventas.component';
import { ReporteComprasComponent } from './componentes/reportes/compras/compras.component';
import { ReporteTransPendientesComponent } from './componentes/reportes/trans-pendientes/trans-pendientes.component';
import { ReporteInventarioComponent } from './componentes/reportes/inventario/inventario.component';
import { ReporteFotocopiasComponent } from './componentes/reportes/fotocopias/fotocopias.component';
/***********************************************************************************************************/

/****************************************** ESTADISTICAS *******************************************************/
import { EstadisticasSeleccionComponent } from './componentes/estadisticas/seleccion/seleccion.component';
import { EstadisticasVentasComponent } from './componentes/estadisticas/ventas/ventas.component';
import { EstadisticasEmpleadosComponent } from './componentes/estadisticas/empleados/empleados.component';
import { EstadisticasFotocopiasComponent } from './componentes/estadisticas/fotocopias/fotocopias.component';
/***********************************************************************************************************/

/****************************************** EMPLEADOS *******************************************************/
import { ListaEmpleadosComponent } from './componentes/ajustes/empleados/lista/lista.component';
import { DetallesEmpleadoComponent } from './componentes/ajustes/empleados/detalles/detalles.component';
import { EditarEmpleadoComponent } from './componentes/ajustes/empleados/editar/editar.component';
/***********************************************************************************************************/

/****************************************** AJUSTES *******************************************************/
import { RespaldosBdComponent } from './componentes/respaldos-bd/respaldos-bd.component';
import { CambiarContrasenaComponent } from './componentes/ajustes/cambiar-contrasena/cambiar-contrasena.component';
import { ListaTiposCopiasComponent } from './componentes/ajustes/tiposcopias/lista/lista.component'
import { EditarTipoCopiaComponent } from './componentes/ajustes/tiposcopias/editar/editar.component';
/***********************************************************************************************************/

/****************************************** IVA *******************************************************/
import { IvaComponent } from './componentes/iva/iva.component';
/***********************************************************************************************************/


import { AuthGuardService } from './servicios/auth-guard/auth-guard.service';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/iniciarsesion',
		pathMatch: 'full'
	},

	{
		path: 'iniciarsesion',
		component: IniciarsesionComponent
	},

	{
		path: 'recuperar-clave',
		component: RecuperarContrasenaComponent
	},

	{
		path: 'inicio',
		component: InicioComponent,
		canActivate: [AuthGuardService]
	},


    /************ CLIENTES ***************/
	{
		path: 'clientes',
		component: ListaClientesComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'clientes/edicion/:id',
		component: ClientesEdicionComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'clientes/historico/:id',
		component: HistoricoClienteComponent,
		canActivate: [AuthGuardService]
	},
    /*************************************/

    /************ VENTAS *****************/
	{
		path: 'ventas',
		component: ListaVentasComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'ventas/nueva',
		component: NuevaVentaComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'ventas/detalles/:id',
		component: DetallesVentaComponent,
		canActivate: [AuthGuardService]
	},
	/*************************************/

	/*********** COMPRAS ****************/
	{
		path: 'compras',
		component: ListaComprasComponent
	},

	{
		path: 'compras/nueva',
		component: NuevaCompraComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'compras/detalles/:id',
		component: DetallesCompraComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'proveedores',
		component: ListaProveedoresComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'proveedores/detalles/:id',
		component: ProveedorVistaComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'proveedores/edicion/:id',
		component: ProveedorEdicionComponent,
		canActivate: [AuthGuardService]
	},
	/************************************/

	/*********** INVENTARIO *************/
	{
		path: 'inventario',
		component: ListaInventarioComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'inventario/entradas/:id',
		component: ListaEntradasComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'inventario/editar/:id',
		component: ProductosEdicionComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'inventario/nueva-entrada',
		component: NuevaEntradaComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'inventario/categorias-productos',
		component: CategoriasProductosComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'inventario/categorias-productos/editar/:id',
		component: CategoriaProductoEditarComponent,
		canActivate: [AuthGuardService]
	},
	/************************************/

	/*********** TRANSCRIPCIONES ********/
	{
		path: 'transcripciones',
		component: ListaTranscripcionesComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'transcripciones/nueva',
		component: NuevaTranscripcionComponent,
		canActivate: [AuthGuardService]
	},

	{
		path:'transcripciones/editar/:id',
		component: EditarTrancripcionComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'transcripciones/actualizar/:id',
		component: EdicionTranscripcionComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'transcripciones/almacenamiento',
		component: AlmacenamientoComponent
	},
	//tipo de tareas
	{
		path: 'tipostareas',
		component: TipoTareasListaComponent,
		canActivate: [AuthGuardService]
	},

	{
		path: 'tipostareas/editar/:id',
		component: TipoTareasEditarComponent,
		canActivate: [AuthGuardService]
	},
	/************************************/

	/************* REPORTES *************/
	{
		path: 'reportes',
		component: ReportesSeleccionComponent,
		canActivate: [AuthGuardService]
	},

    {
    	path: 'reportes/ventas/:desde/:hasta',
    	component: ReporteVentasComponent,
    	canActivate: [AuthGuardService]
    },

    {
    	path: 'reportes/compras/:desde/:hasta',
    	component: ReporteComprasComponent,
    	canActivate: [AuthGuardService]
    },

    {
    	path: 'reportes/transcripciones-pendientes',
    	component: ReporteTransPendientesComponent
    },

    {
		path: 'reportes/inventario',
    	component: ReporteInventarioComponent
    },

    {
    	path: 'reportes/fotocopias/:desde/:hasta',
    	component: ReporteFotocopiasComponent
    },
	/************************************/

    /*********** ESTADISTICAS ***********/
    {
    	path: 'estadisticas',
    	component: EstadisticasSeleccionComponent,
    	canActivate: [AuthGuardService]
    },

    {
    	path: 'estadisticas/ventas',
    	component: EstadisticasVentasComponent,
    	canActivate: [AuthGuardService]
    },

    {
    	path: 'estadisticas/empleados/:id/mes/:mes',
    	component: EstadisticasEmpleadosComponent,
    	canActivate: [AuthGuardService]
    },

    {
    	path: 'estadisticas/fotocopias/:mes',
    	component: EstadisticasFotocopiasComponent,
    	canActivate: [AuthGuardService]

    },
    /************************************/

    /*********** EMPLEADOS *************/
    {
    	path: 'empleados',
    	component: ListaEmpleadosComponent,
    	canActivate: [AuthGuardService]
    },

    {
    	path: 'empleados/detalles/:id',
    	component: DetallesEmpleadoComponent,
    	canActivate: [AuthGuardService]
    },

    {
    	path: 'empleados/editar/:id',
    	component: EditarEmpleadoComponent,
    	canActivate: [AuthGuardService]
    },
    /************************************/

    /************ RESPALDOS *************/
    {
    	path: 'respaldos',
    	component: RespaldosBdComponent,
    	canActivate: [AuthGuardService]
    },
    /************************************/

    /********* CAMBIAR CONTRASEÑA *******/
    {
    	path: 'cambiar-contrasena',
    	component: CambiarContrasenaComponent,
    	canActivate: [AuthGuardService]
    },
    /************************************/

    /********* TIPOS DE COPIAS **********/
    {
    	path: 'tiposdecopias',
    	component: ListaTiposCopiasComponent,
    	canActivate: [AuthGuardService]
    },

    {
    	path: 'tiposdecopias/editar/:id',
    	component: EditarTipoCopiaComponent,
    	canActivate: [AuthGuardService]
    },
    /*************************************/
    {
    	path: 'iva',
    	component: IvaComponent,
    	canActivate: [AuthGuardService]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
