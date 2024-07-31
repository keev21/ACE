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
    this.http.post<any>('http://localhost/ACE/WsMunicipioIonic/ws_gad.php', { accion: 'cargar_productos' })
      .subscribe(
        (response) => {
          if (response.estado) {
            this.productos = response.datos.map(producto => ({
              ...producto,
              showInfo: false // Inicialmente, la información está oculta
            }));
          } else {
            console.error('Error al cargar productos:', response.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
  }

  toggleProductInfo(producto) {
    producto.showInfo = !producto.showInfo;
  }

  editarProducto(codigo: string) {
    console.log('Editar producto con código:', codigo);
    // Implementar lógica para editar producto
  }

  eliminarProducto(codigo: string) {
    console.log('Eliminar producto con código:', codigo);
    // Implementar lógica para eliminar producto
  }

  actualizarProducto(codigo: string) {
    console.log('Actualizar producto con código:', codigo);
    // Implementar lógica para actualizar producto
  }
}
