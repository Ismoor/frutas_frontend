import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../services/info.service';
import { FrutaService } from '../../services/fruta.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  infoList: any[] = [];
  frutas: any[] = [];
  frutaAEliminar: any = null; // Variable para almacenar la fruta a eliminar
  showModal: boolean = false; // Variable para controlar la visibilidad del modal

  constructor(
    private infoService: InfoService,
    private frutaService: FrutaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadInfo();
    this.loadFrutas();
  }

  loadInfo(): void {
    this.infoService.getInfos().subscribe(
      data => this.infoList = data,
      error => console.error(error)
    );
  }

  loadFrutas(): void {
    const cedula = this.authService.userCedula;
    if (cedula) {
      this.frutaService.getFrutas(cedula).subscribe(
        data => this.frutas = data,
        error => console.error(error)
      );
    }
  }

  confirmarEliminar(fruta: any): void {
    this.frutaAEliminar = fruta;
    this.showModal = true; // Mostrar el modal de confirmación
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  eliminarFruta(): void {
    const cedula = this.authService.userCedula;
    if (cedula && this.frutaAEliminar) {
      this.frutaService.deleteFruta(cedula, this.frutaAEliminar._id).subscribe(
        () => {
          this.loadFrutas();
          this.cerrarModal();
        },
        error => console.error('Error deleting fruit', error)
      );
    }
  }

  getFrutaEstado(sensorValues: number[]): string {
    const promedio = sensorValues.reduce((sum, value) => sum + value, 0) / sensorValues.length;
    return promedio >= 450 ? 'En proceso de descomposición' : 'Fruta en buen estado';
  }
}
