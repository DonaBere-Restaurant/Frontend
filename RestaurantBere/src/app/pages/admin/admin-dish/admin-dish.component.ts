import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AdminService } from '../../../core/Services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Plato } from '../../../shared/models/admin/admin-platos-response-model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-admin-dish',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-dish.component.html',
  styleUrl: './admin-dish.component.scss'
})

export class AdminDishComponent {

  dishes: Plato[];
  imageUrls: { [key: string]: SafeUrl } = {};
  dishForm: FormGroup;
  updatedDish: FormGroup;
  editingDishId: number | null = null;

  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.dishForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });

    this.updatedDish = this.fb.group({
      title: ['', [Validators.minLength(3)]],
      description: [''],
      price: ['', [ Validators.min(0)]],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.dishesAll();
  }

  dishesAll(){
    this.adminService.getAllDishes().subscribe(
      (dishes) => {
      this.dishes = dishes;
      this.dishes.forEach(
        (dish) => {
          this.cargarImagenPlato(dish.image);
        }
      )
    });
  }

  cargarImagenPlato(filename: string) {
    this.adminService.getImageDish(filename).subscribe(
      (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imageUrls[filename] = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      },
      (error) => {
        console.error('Error al cargar la imagen del plato', error);
      }
    );
  }

  createDish() {
    if (this.dishForm.valid) {
      this.dishForm.disable();
  
      const dish = this.dishForm.value;
      this.adminService.createDish(dish).subscribe(
        (response) => {
          this.dishesAll();
          this.dishForm.reset();
          this.dishForm.enable();
          alert('Plato creado exitosamente');
        },
        (error) => {
          console.error('Error al crear el plato:', error);
          this.dishForm.enable();
          alert('Error al crear el plato. Por favor, intente de nuevo.');
        }
      );
    }
  }

  loadDishInForm(dish: Plato) {
    this.editingDishId = dish.id;
    this.updatedDish.patchValue({
      title: dish.title,
      description: dish.description,
      price: dish.price
    });
  }
  

  editDish() {
    if (this.updatedDish.valid && this.editingDishId) {
      this.updatedDish.disable();
      
      const updatedDishData = this.updatedDish.value;
      this.adminService.getUpdateDish(this.editingDishId, updatedDishData).subscribe(
        (response) => {
          this.dishesAll();
          this.updatedDish.reset();
          this.updatedDish.enable();
          this.editingDishId = null;
          alert('Plato editado exitosamente');
        },
        (error) => {
          console.error('Error al editar el plato:', error);
          this.updatedDish.enable();
          alert('Error al editar el plato. Por favor, intente de nuevo.');
        }
      );
    }
  }

  onFileSelectedForEdit(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.updatedDish.patchValue({
          image: file
        });
      };
      reader.readAsDataURL(file);
    }
  }


  cancelEdit() {
    this.updatedDish.reset();
    this.editingDishId = null;
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.dishForm.patchValue({
          image: file
        });
      };
      reader.readAsDataURL(file);
    }
  }

  deleteDish(id: number){
    if (confirm('¿Estás seguro de eliminar este plato?')) {
      this.adminService.deleteDish(id).subscribe(
        (response) => {
          this.dishesAll();
          alert('Plato eliminado exitosamente');
        },
        (error) => {
          console.error('Error al eliminar el plato:', error);
          alert('Error al eliminar el plato. Por favor, intente de nuevo.');
        }
      );
    }
  }

}
