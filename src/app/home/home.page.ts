import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuario = localStorage.getItem('loggedUser');
  scannedData: string = ''; // Para almacenar el contenido escaneado
  loggedUserName: string | null = null;

  constructor(private router: Router) {}

  navigateToAbout() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.getLoggedUserName();
  }

  getLoggedUserName() {
    // Recupera el nombre del usuario desde localStorage
    const storedUserName = localStorage.getItem('loggedUser');
    console.log('Nombre de usuario recuperado: ', storedUserName); // Agregamos este log para depurar
    this.loggedUserName = storedUserName;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
    console.log('La sesión se ha cerrado correctamente');
  }

  // Nueva funcionalidad: Iniciar el escaneo QR
  async startScanner() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });

      if (status.granted) {
        BarcodeScanner.hideBackground(); // Oculta la vista web para escanear

        const result = await BarcodeScanner.startScan(); // Inicia el escaneo
        if (result.hasContent) {
          this.scannedData = result.content; // Captura el contenido escaneado
          console.log('Contenido escaneado:', this.scannedData);
        } else {
          console.log('No se encontró contenido en el QR.');
        }
      } else {
        console.error('Permiso denegado para usar la cámara.');
      }
    } catch (error) {
      console.error('Error al escanear el código QR:', error);
    } finally {
      BarcodeScanner.showBackground(); // Restaura la vista web
    }
  }
}
