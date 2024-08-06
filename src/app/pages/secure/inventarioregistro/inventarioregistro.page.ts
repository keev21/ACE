import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventario-registro',
  templateUrl: 'inventarioregistro.page.html',
  styleUrls: ['inventarioregistro.page.scss'],
})
export class InventarioregistroPage implements OnInit {
  productId: string;
  initialQuantity: number;
  date: string;
  selectedPvp: string;
  productos: any[] = []; // Arreglo para almacenar los productos
  initialRecordId: number; // Para almacenar el ID del registro inicial

  // Registro final
  selledQuantity: number;
  giftProducts: number;
  wasteProducts: number;
  totalMoney: number;

  accion: string;
  riCodigo: number;
  rfCodigo: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadProducts();
    this.setCurrentDate();


  }

  loadProducts() {
    this.http.post<any>('http://localhost/ACE/WsMunicipioIonic/ws_gad.php', { accion: 'cargar_productos' })
      .subscribe(
        (response) => {
          if (response.estado) {
            this.productos = response.datos;
          } else {
            console.error('Error al cargar productos:', response.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
  }

  setCurrentDate() {
    const today = new Date().toISOString().split('T')[0]; // Obtener la fecha en formato YYYY-MM-DD
    this.date = today;
  }

  onProductChange(event: any) {
    this.productId = event.detail.value;
    const product = this.productos.find(p => p.id === this.productId);
    if (product) {
      this.selectedPvp = product.pvp;
    }
  }

  saveProduct() {
    const datos = {
      accion: 'guardar_inventario',
      producto_id: this.productId,  // ID del producto
      cantidad_inicial: this.initialQuantity,  // Cantidad inicial
      fecha_registro: this.date,  // Fecha de registro
    };

    this.http.post<any>('http://localhost/ACE/WsMunicipioIonic/ws_gad.php', datos)
      .subscribe(
        (response) => {
          if (response.estado) {
            console.log('Datos guardados exitosamente:', response.mensaje);
            this.getLastInitialRecordId(); // Obtener el último ID del registro inicial
          } else {
            console.error('Error al guardar los datos:', response.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
  }

  getLastInitialRecordId() {
    this.http.post<any>('http://localhost/ACE/WsMunicipioIonic/ws_gad.php', { accion: 'ultimo_registro_inicial' })
      .subscribe(
        (response) => {
          if (response.estado) {
            this.initialRecordId = response.datos.id;
          } else {
            console.error('Error al obtener el último registro inicial:', response.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
  }

  saveFinal() {
    // Verifica que el pvp y la cantidad vendida estén disponibles
    if (!this.selectedPvp || !this.selledQuantity) {
      console.error('No se puede calcular el dinero total. PVP o cantidad vendida faltantes.');
      return;
    }

    const dineroTotal = this.selledQuantity * parseFloat(this.selectedPvp);

    const datos = {
      accion: 'guardar_registro_final',
      registro_inicial_id: this.initialRecordId,
      cantidad_vendida: this.selledQuantity,
      productos_muestra: this.giftProducts,
      productos_desechados: this.wasteProducts,
      dinero_total: dineroTotal,
    };

    this.http.post<any>('http://localhost/ACE/WsMunicipioIonic/ws_gad.php', datos)
      .subscribe(
        (response) => {
          if (response.estado) {
            console.log('Datos del registro final guardados exitosamente:', response.mensaje);
          } else {
            console.error('Error al guardar los datos del registro final:', response.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
  }

  
}
