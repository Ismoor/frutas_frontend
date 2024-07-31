import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  infos: any[] = [];
  selectedInfo: any | null = null;
  isFormLocked = true;
  infoForm: FormGroup;
  addInfoForm: FormGroup;
  showModal: boolean = false;

  constructor(private fb: FormBuilder, private infoService: InfoService) {
    this.infoForm = this.fb.group({
      titulo: [{ value: '', disabled: true }, Validators.required],
      descripcion: [{ value: '', disabled: true }, Validators.required]
    });

    this.addInfoForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getInfos();
  }

  getInfos(): void {
    this.infoService.getInfos().subscribe(infos => {
      this.infos = infos;
    }, error => {
      console.error('Error fetching infos', error);
    });
  }

  onSelectInfo(info: any): void {
    this.selectedInfo = { ...info };
    this.isFormLocked = false;
    this.infoForm.enable();  // Enable the form controls
    this.infoForm.patchValue(info);
  }

  confirmUpdate(): void {
    if (this.infoForm.valid) {
      this.showModal = true; // Mostrar el modal de confirmación
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  onSubmit(): void {
    if (this.selectedInfo) {
      this.infoService.updateInfo(this.selectedInfo._id, this.infoForm.value).subscribe(updatedInfo => {
        this.isFormLocked = true;
        this.infoForm.disable();  // Disable the form controls again
        this.getInfos();
        this.closeModal(); // Ocultar el modal de confirmación después de la actualización
      }, error => {
        console.error('Error updating info', error);
      });
    }
  }

  onDeleteInfo(id: string): void {
    this.infoService.deleteInfo(id).subscribe(() => {
      this.getInfos();
    }, error => {
      console.error('Error deleting info', error);
    });
  }

  onAddInfo(): void {
    if (this.addInfoForm.valid) {
      this.infoService.createInfo(this.addInfoForm.value).subscribe(newInfo => {
        this.addInfoForm.reset();
        this.getInfos();
      }, error => {
        console.error('Error creating info', error);
      });
    }
  }
}
