import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventariomenu',
  templateUrl: './inventariomenu.page.html',
  styleUrls: ['./inventariomenu.page.scss'],
})
export class InventariomenuPage implements OnInit {
  showProductInfo: boolean = false;
  currentDate: string;
  productos: any[] = [];
  selectedProduct: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.currentDate = this.getCurrentDate();
    this.loadProducts();
  }

  getCurrentDate(): string {
    const now = new Date();
    return now.toLocaleDateString('es-ES'); // Formato de fecha en español
  }

  loadProducts() {
    this.http.post<any>('http://localhost/ACE/WsMunicipioIonic/ws_gad.php', { accion: 'cargar_productos2' })
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

  toggleProductInfo(product: any) {
    if (this.selectedProduct === product) {
      this.showProductInfo = !this.showProductInfo;
    } else {
      this.selectedProduct = product;
      this.showProductInfo = true;
    }
  }

  editarProducto(codigo: string) {
    // Implementa la lógica para editar el producto
  }

  eliminarProducto(codigo: string) {
    // Implementa la lógica para eliminar el producto
  }

  actualizarProducto(codigo: string) {
    // Implementa la lógica para actualizar el producto
  }
}
