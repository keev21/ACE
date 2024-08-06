import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Importa Router

@Component({
  selector: 'app-inventariomenu',
  templateUrl: './inventariomenu.page.html',
  styleUrls: ['./inventariomenu.page.scss'],
})
export class InventariomenuPage implements OnInit {
  currentDate: string;
  productos: any[] = [];
  productInfoVisible: { [key: number]: boolean } = {};

  constructor(private http: HttpClient, private router: Router) {}  // Agrega Router al constructor

  ngOnInit() {
    this.currentDate = this.getCurrentDate();
    this.loadProducts();
  }

  getCurrentDate(): string {
    const now = new Date();
    return now.toLocaleDateString('es-ES');
  }

  loadProducts() {
    this.http.post<any>('http://localhost/ACE/WsMunicipioIonic/ws_gad.php', { accion: 'cargar_productos2' })
      .subscribe(
        (response) => {
          if (response.estado) {
            this.productos = response.datos;
            this.productos.forEach(producto => {
              this.productInfoVisible[producto.id] = false;
            });
          } else {
            console.error('Error al cargar productos:', response.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
  }

  toggleProductInfo(producto: any) {
    this.productInfoVisible[producto.id] = !this.productInfoVisible[producto.id];
  }

  editarProducto(riCodigo: string, rfCodigo: string) {
    this.router.navigate(['/editinventario', { ri_codigo: riCodigo, rf_codigo: rfCodigo }]);
  }

  eliminarProducto(codigo: string) {
    // Lógica para eliminar el producto
  }

  actualizarProducto(codigo: string) {
    // Lógica para actualizar el producto
  }
}
