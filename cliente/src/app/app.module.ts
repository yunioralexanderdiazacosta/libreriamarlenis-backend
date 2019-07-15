import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidebarComponent } from './componentes/layouts/sidebar/sidebar.component';
import { IniciarsesionComponent } from './componentes/iniciarsesion/iniciarsesion.component';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { VentasSemanaComponent } from './componentes/inicio/ventas-semana/ventas-semana.component';
import { FotocopiasSemanaComponent } from './componentes/inicio/fotocopias-semana/fotocopias-semana.component';

/******************************************* CLIENTES*******************************************************/
import { ListaClientesComponent } from './componentes/clientes/lista/lista.component';
import { NuevoClienteComponent } from './componentes/clientes/nuevo/nuevo.component';
import { HistoricoClienteComponent } from './componentes/clientes/historico/historico.component';
/***********************************************************************************************************/

/******************************************** VENTAS *******************************************************/
import { ListaVentasComponent } from './componentes/ventas/lista/lista.component';
import { NuevaVentaComponent } from './componentes/ventas/nueva/nueva.component';
import { ProductoComponent } from './componentes/ventas/producto/producto.component';
/***********************************************************************************************************/

/*************************************** COMPRAS ********************************************************/
import { ListaComprasComponent } from './componentes/compras/lista/lista.component';
import { NuevaCompraComponent } from './componentes/compras/nueva/nueva.component';
import { ProductoCompraComponent } from './componentes/compras/producto/producto.component';

import { ListaProveedoresComponent } from './componentes/compras/proveedores/lista/lista.component';
import { NuevoProveedorComponent } from './componentes/compras/proveedores/nuevo/nuevo.component';
/**********************************************************************************************************/

/*************************************** INVENTARIO ********************************************************/
import { ListaInventarioComponent } from './componentes/inventario/lista/lista.component';
import { ListaEntradasComponent } from './componentes/inventario/entradas/lista/lista.component';
import { NuevaEntradaComponent } from './componentes/inventario/entradas/nueva/nueva.component';
import { CategoriasProductosComponent } from './componentes/inventario/categorias/categorias.component';
/**********************************************************************************************************/

/************************************** TRANSCRIPCIONES ***************************************************/
import { ListaTranscripcionesComponent } from './componentes/transcripciones/lista/lista.component';
import { NuevaTranscripcionComponent } from './componentes/transcripciones/nueva/nueva.component';
import { EdicionTranscripcionComponent } from './componentes/transcripciones/edicion/edicion.component';
import { AlmacenamientoComponent } from './componentes/transcripciones/almacenamiento/almacenamiento.component';
import { ContenidoComponent } from './componentes/transcripciones/contenido/contenido.component';
/**********************************************************************************************************/

/************************************** FOTOCOPIAS ********************************************************/
import { NuevaFotocopiaComponent } from './componentes/fotocopias/nueva/nueva.component';
/**********************************************************************************************************/

/***************************************** REPORTES ******************************************************/
import { ReportesSeleccionComponent } from './componentes/reportes/seleccion/seleccion.component';
import { ReporteVentasComponent } from './componentes/reportes/ventas/ventas.component';
import { ReporteComprasComponent } from './componentes/reportes/compras/compras.component';
import { ReporteTransPendientesComponent } from './componentes/reportes/trans-pendientes/trans-pendientes.component';
import { ReporteInventarioComponent } from './componentes/reportes/inventario/inventario.component';
import { ReporteFotocopiasComponent } from './componentes/reportes/fotocopias/fotocopias.component';
/**********************************************************************************************************/

/****************************************** ESTADISTICAS **************************************************/
import { EstadisticasSeleccionComponent } from './componentes/estadisticas/seleccion/seleccion.component';

import { EstadisticasVentasComponent } from './componentes/estadisticas/ventas/ventas.component';
import { IngresosMesVentasComponent } from './componentes/estadisticas/ventas/ingresos-mes/ingresos-mes.component';
import { ProductosMesVentasComponent } from './componentes/estadisticas/ventas/productos-mes/productos-mes.component';
import { ProductosMasVendidosComponent } from './componentes/estadisticas/ventas/productos-mas-vendidos/productos-mas-vendidos.component';
import { ProductosCategoriasMesComponent } from './componentes/estadisticas/ventas/productos-categorias-mes/productos-categorias-mes.component';
import { ClientesMesVentasComponent } from './componentes/estadisticas/ventas/clientes-mes/clientes-mes.component';
import { ClientesAtendidosMesComponent } from './componentes/estadisticas/ventas/clientes-atendidos-mes/clientes-atendidos-mes.component';

import { EstadisticasEmpleadosComponent } from './componentes/estadisticas/empleados/empleados.component';
import { TranscripcionesMedicionComponent } from './componentes/estadisticas/empleados/transcripciones-medicion/transcripciones-medicion.component';
import { TranscripcionesEficienciaComponent } from './componentes/estadisticas/empleados/transcripciones-eficiencia/transcripciones-eficiencia.component';
import { EstadisticasFotocopiasComponent } from './componentes/estadisticas/fotocopias/fotocopias.component';
import { EstadisticaFotocopiasTipoComponent } from './componentes/estadisticas/fotocopias/tipo/tipo.component';
import { EstadisticaCompFotocopiasComponent } from './componentes/estadisticas/fotocopias/comp/comp.component';
/**********************************************************************************************************/

/***************************************** REPORTES *******************************************************/
//empleados
import { ListaEmpleadosComponent } from './componentes/ajustes/empleados/lista/lista.component';
import { NuevoEmpleadoComponent } from './componentes/ajustes/empleados/nuevo/nuevo.component';
import { NavbarComponent } from './componentes/layouts/navbar/navbar.component';
/**********************************************************************************************************/
import { RespaldosBdComponent } from './componentes/respaldos-bd/respaldos-bd.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    IniciarsesionComponent,
    /******** INICIO ***********/
    InicioComponent,
    VentasSemanaComponent,
    FotocopiasSemanaComponent,
    /***************************/

    /******* CLIENTES **********/ 
    ListaClientesComponent,
    NuevoClienteComponent,
    HistoricoClienteComponent,
    /***************************/
    
    /********* VENTAS **********/ 
    ListaVentasComponent,
    ProductoComponent,
    NuevaVentaComponent,
    /***************************/

    /********* COMPRAS **********/ 
    ListaComprasComponent,
    NuevaCompraComponent,
    ProductoCompraComponent,

    ListaProveedoresComponent,
    NuevoProveedorComponent,
    /***************************/

    /******* INVENTARIO ********/
    ListaInventarioComponent,
    ListaEntradasComponent,
    NuevaEntradaComponent,
    CategoriasProductosComponent,
    /***************************/

    /***** TRANSCRIPCIONES *****/
    ListaTranscripcionesComponent,
    NuevaTranscripcionComponent,
    EdicionTranscripcionComponent,
    AlmacenamientoComponent,
    /***************************/

    /****** FOTOCOPIAS *********/
    NuevaFotocopiaComponent,
    ContenidoComponent,
    /***************************/

    /****** REPORTES ***********/
    ReportesSeleccionComponent,
    ReporteVentasComponent,
    ReporteComprasComponent,
    ReporteTransPendientesComponent,
    ReporteInventarioComponent,
    ReporteFotocopiasComponent,
    /***************************/

    /******* ESTADISTICAS ******/
    EstadisticasSeleccionComponent,
    //ventas
    EstadisticasVentasComponent,
    IngresosMesVentasComponent,
    ProductosMesVentasComponent,
    ProductosMasVendidosComponent,
    ClientesMesVentasComponent,
    ClientesAtendidosMesComponent,

    //empleados
    EstadisticasEmpleadosComponent,
    TranscripcionesMedicionComponent,
    TranscripcionesEficienciaComponent,
    //fotocopias
    EstadisticasFotocopiasComponent,
    EstadisticaFotocopiasTipoComponent,
    EstadisticaCompFotocopiasComponent,
    /***************************/

    /******** AJUSTES ************/
    //empleado
    ListaEmpleadosComponent,
    NuevoEmpleadoComponent,
    ProductosCategoriasMesComponent,
    //respaldos
    RespaldosBdComponent,
    /*****************************/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
