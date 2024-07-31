import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventariomenu',
  templateUrl: './inventariomenu.page.html',
  styleUrls: ['./inventariomenu.page.scss'],
})
export class InventariomenuPage implements OnInit {
  showProductInfo: boolean = false;
  currentDate: string;

  constructor() { }

  ngOnInit() {
    this.currentDate = this.getCurrentDate();
  }

  getCurrentDate(): string {
    const now = new Date();
    return now.toLocaleDateString('es-ES'); // Formato de fecha en español
  }

  toggleProductInfo() {
    this.showProductInfo = !this.showProductInfo;
  }

  editarProducto(codigo: string) {
    // Implementar la lógica para editar el producto
  }

  eliminarProducto(codigo: string) {
    // Implementar la lógica para eliminar el producto
  }

  actualizarProducto(codigo: string) {
    // Implementar la lógica para actualizar el producto
  }

  filterProductos(event: any) {
    // Implementar la lógica para filtrar productos
  }
}
