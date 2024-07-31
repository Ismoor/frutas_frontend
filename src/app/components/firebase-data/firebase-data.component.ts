import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { FrutaService } from '../../services/fruta.service';

@Component({
  selector: 'app-firebase-data',
  templateUrl: './firebase-data.component.html',
  styleUrls: ['./firebase-data.component.css']
})
export class FirebaseDataComponent implements OnInit {
  firebaseData: any[] = [];
  loading: boolean = true;
  nombreFruta: string = '';
  successMessage: string = ''; // Añadido para el mensaje de éxito

  constructor(private firebaseService: FirebaseService, private authService: AuthService, private frutaService: FrutaService) {}

  ngOnInit(): void {
    this.loadFirebaseData();
  }

  loadFirebaseData(): void {
    this.firebaseService.getFirebaseData().subscribe(data => {
      this.firebaseData = data;
      this.loading = false;
    }, error => {
      console.error(error);
      this.loading = false;
    });
  }

  onAddFruta(): void {
    const cedula = this.authService.userCedula;
  
    if (cedula) {
      // Recopilar todos los valores de sensorValue
      const sensorValues = this.firebaseData.map(data => data.sensorValue);
      console.log(sensorValues)
      this.frutaService.addFruta(cedula, { nombre: this.nombreFruta, sensorValue: sensorValues }).subscribe(() => {
        this.loadFirebaseData();
        this.successMessage = 'La fruta se ha agregado correctamente.';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000); // Ocultar mensaje después de 3 segundos
      }, error => {
        console.error('Error adding fruta', error);
      });
    } else {
      console.error('Cedula is null');
    }
  }
}
