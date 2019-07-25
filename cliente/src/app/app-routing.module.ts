import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IniciarsesionComponent } from './componentes/iniciarsesion/iniciarsesion.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

import { ListaClientesComponent } from './componentes/clientes/lista/lista.component';
import { HistoricoClienteComponent } from './componentes/clientes/historico/historico.component';
/****************************************** VENTAS *********************************************************/
import { ListaVentasComponent } from './componentes/ventas/lista/lista.component';
import { NuevaVentaComponent } from './componentes/ventas/nueva/nueva.component';
/***********************************************************************************************************/

/**************************************** COMPRAS **********************************************************/
import { ListaComprasComponent } from './componentes/compras/lista/lista.component';
import { NuevaCompraComponent } from './componentes/compras/nueva/nueva.component';

import { ListaProveedoresComponent } from './componentes/compras/proveedores/lista/lista.component';
/***********************************************************************************************************/

/***************************************** INVENTARIO ******************************************************/
import { ListaInventarioComponent } from './componentes/inventario/lista/lista.component';
import { ListaEntradasComponent } from './componentes/inventario/entradas/lista/lista.component';
import { NuevaEntradaComponent } from './componentes/inventario/entradas/nueva/nueva.component';
import { CategoriasProductosComponent } from './componentes/inventario/categorias/categorias.component';
/***********************************************************************************************************/

/************************************* TRANSCRIPCIONES *****************************************************/
import { ListaTranscripcionesComponent } from './componentes/transcripciones/lista/lista.component';
import { NuevaTranscripcionComponent  } from './componentes/transcripciones/nueva/nueva.component';
import { EdicionTranscripcionComponent } from './componentes/transcripciones/edicion/edicion.component';
import { AlmacenamientoComponent } from './componentes/transcripciones/almacenamiento/almacenamiento.component';
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
/***********************************************************************************************************/

import { RespaldosBdComponent } from './componentes/respaldos-bd/respaldos-bd.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'iniciarsesion',
		pathMatch: 'full'
	},

	{
		path: 'iniciarsesion',
		component: IniciarsesionComponent
	},

	{
		path: 'inicio',
		component: InicioComponent
	},


    /************ CLIENTES ***************/
	{
		path: 'clientes',
		component: ListaClientesComponent
	},

	{
		path: 'clientes/historico',
		component: HistoricoClienteComponent
	},
    /*************************************/

    /************ VENTAS *****************/
	{
		path: 'ventas',
		component: ListaVentasComponent
	},

	{
		path: 'ventas/nueva',
		component: NuevaVentaComponent
	},
	/*************************************/

	/*********** COMPRAS ****************/
	{
		path: 'compras',
		component: ListaComprasComponent
	},

	{
		path: 'compras/nueva',
		component: NuevaCompraComponent
	},

	{
		path: 'proveedores',
		component: ListaProveedoresComponent
	},
	/************************************/

	/*********** INVENTARIO *************/
	{
		path: 'inventario',
		component: ListaInventarioComponent
	},

	{
		path: 'inventario/entradas',
		component: ListaEntradasComponent
	},

	{
		path: 'inventario/nueva-entrada',
		component: NuevaEntradaComponent
	},

	{
		path: 'inventario/categorias-productos',
		component: CategoriasProductosComponent
	},
	/************************************/

	/*********** TRANSCRIPCIONES ********/
	{
		path: 'transcripciones',
		component: ListaTranscripcionesComponent
	},

	{
		path: 'transcripciones/nueva',
		component: NuevaTranscripcionComponent
	},

	{
		path: 'transcripciones/actualizar/:id',
		component: EdicionTranscripcionComponent
	},

	{
		path: 'transcripciones/almacenamiento',
		component: AlmacenamientoComponent
	},
	/************************************/

	/************* REPORTES *************/
	{
		path: 'reportes',
		component: ReportesSeleccionComponent
	},

    {
    	path: 'reportes/ventas',
    	component: ReporteVentasComponent
    },

    {
    	path: 'reportes/compras',
    	component: ReporteComprasComponent
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
    	path: 'reportes/fotocopias',
    	component: ReporteFotocopiasComponent
    },
	/************************************/

    /*********** ESTADISTICAS ***********/
    {
    	path: 'estadisticas',
    	component: EstadisticasSeleccionComponent
    },

    {
    	path: 'estadisticas/ventas',
    	component: EstadisticasVentasComponent
    },

    {
    	path: 'estadisticas/empleados',
    	component: EstadisticasEmpleadosComponent
    },

    {
    	path: 'estadisticas/fotocopias',
    	component: EstadisticasFotocopiasComponent
    },
    /************************************/

    /*********** EMPLEADOS ***********/
    {
    	path: 'empleados',
    	component: ListaEmpleadosComponent
    },

    /*********** RESPALDOS ***********/
    {
    	path: 'respaldos',
    	component: RespaldosBdComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
