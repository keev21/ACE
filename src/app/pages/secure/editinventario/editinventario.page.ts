import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editinventario',
  templateUrl: './editinventario.page.html',
  styleUrls: ['./editinventario.page.scss'],
})
export class EditinventarioPage implements OnInit {
  productId: number;
  initialQuantity: number;
  nombre: string;
  selledQuantity: number;
  giftProducts: number;
  wasteProducts: number;
  selectedPvp: number;
  date: string;
  productos: any[] = []; // Arreglo de productos
  selectedProduct: any; // Producto seleccionado

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const riCodigo = params['ri_codigo'];
      const rfCodigo = params['rf_codigo'] || null;
      this.loadProductData(riCodigo, rfCodigo);
    });
  }

  onProductChange(event: any) {
    const selectedProductId = event.detail.value;
    this.selectedProduct = this.productos.find(product => product.id === selectedProductId);
    if (this.selectedProduct) {
      this.nombre = this.selectedProduct.nombre;
      this.initialQuantity = this.selectedProduct.RI_CANTIDAD_INICIAL;
      this.selectedPvp = this.selectedProduct.pvp;
      this.selledQuantity = this.selectedProduct.RF_CANTIDAD_VENDIDA || 0;
      this.giftProducts = this.selectedProduct.RF_PRODUCTOS_MUESTRA || 0;
      this.wasteProducts = this.selectedProduct.RF_PRODUCTOS_DESECHADOS || 0;
      this.date = this.selectedProduct.RI_FECHA;
    }
  }

  loadProductData(riCodigo: number, rfCodigo: number | null) {
    this.http.post<any>('http://localhost/ACE/WsMunicipioIonic/ws_gad.php', { 
      accion: 'cargar_productos3', 
      ri_codigo: riCodigo, 
      rf_codigo: rfCodigo 
    }).subscribe(
      response => {
        if (response.estado) {
          this.productos = response.datos;
          console.log('Datos del producto cargados:', this.productos);
          // Si hay productos, selecciona el primero por defecto
          if (this.productos.length > 0) {
            this.selectedProduct = this.productos[0];
            this.nombre = this.selectedProduct.nombre;
            this.initialQuantity = this.selectedProduct.RI_CANTIDAD_INICIAL;
            this.selectedPvp = this.selectedProduct.pvp;
            this.selledQuantity = this.selectedProduct.RF_CANTIDAD_VENDIDA || 0;
            this.giftProducts = this.selectedProduct.RF_PRODUCTOS_MUESTRA || 0;
            this.wasteProducts = this.selectedProduct.RF_PRODUCTOS_DESECHADOS || 0;
            this.date = this.selectedProduct.RI_FECHA;
          }
        } else {
          console.error('Error al cargar producto:', response.mensaje);
        }
      },
      error => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  saveProduct() {
    // Implementa la lógica para guardar el producto inicial
    console.log('Producto inicial guardado:', this.selectedProduct);
  }

  saveFinal() {
    // Implementa la lógica para guardar el producto final
    console.log('Producto final guardado:', this.selectedProduct);
  }
}
