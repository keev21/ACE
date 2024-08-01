import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventariomenu',
  templateUrl: './inventariomenu.page.html',
  styleUrls: ['./inventariomenu.page.scss'],
})
export class InventariomenuPage implements OnInit {
  currentDate: string;
  productos: any[] = [];
  productInfoVisible: { [key: number]: boolean } = {};

  constructor(private http: HttpClient) {}

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
            console.log(this.productos); // Asegúrate de que los datos sean correctos
            // Inicializar el estado de visibilidad para cada producto
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
    // Cambiar el estado de visibilidad para el producto seleccionado
    this.productInfoVisible[producto.id] = !this.productInfoVisible[producto.id];
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
