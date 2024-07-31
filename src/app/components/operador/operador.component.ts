import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.css']
})
export class OperadorComponent implements OnInit {
  public chartData: any[] = [];
  public chartLabels: string[] = [];
  public sensorValues: number[] = [];
  public view: [number, number] = [700, 400];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Puntos';
  public showYAxisLabel = true;
  public yAxisLabel = 'Sensor Value';
  public autoScale = true;
  public firebaseData: any[] = [];

  // Define the color scheme
  public colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadFirebaseData();
  }

  loadFirebaseData(): void {
    this.firebaseService.getFirebaseData().subscribe((data: any[]) => {
      this.firebaseData = data;
      this.sensorValues = data.map(d => Number(d.sensorValue));
      this.chartLabels = data.map((_, index) => `Punto ${index + 1}`);
      this.chartData = [
        {
          name: 'Sensor Value',
          series: this.sensorValues.map((value, index) => ({
            name: `Punto ${index + 1}`,
            value: value
          }))
        }
      ];
    }, error => {
      console.error('Error loading data', error);
    });
  }

  downloadPDF(): void {
    const doc = new jsPDF();
    doc.text('Datos de Sensor', 14, 16);
    const tableColumn = ['ID', 'Valores del Sensor', 'Estado'];
    const tableRows: any[] = [];
    this.firebaseData.forEach(data => {
      const estado = data.sensorValue >= 450 ? 'En proceso de descomposición' : 'Fruta en buen estado';
      const dataRow = [data.id, data.sensorValue, estado];
      tableRows.push(dataRow);
    });
    (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('sensor_data.pdf');
  }

  downloadExcel(): void {
    const excelData = this.firebaseData.map(data => ({
      ID: data.id,
      'Valores del Sensor': data.sensorValue,
      'Estado': data.sensorValue >= 450 ? 'En proceso de descomposición' : 'Fruta en buen estado'
    }));
  
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos de Sensor');
    XLSX.writeFile(wb, 'sensor_data.xlsx');
  }
  
}
