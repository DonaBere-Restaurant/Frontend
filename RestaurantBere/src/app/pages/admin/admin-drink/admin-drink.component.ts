import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AdminService } from '../../../core/Services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Bebidas } from '../../../shared/models/admin/admin-bebidas-response-model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-admin-drink',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-drink.component.html',
  styleUrl: './admin-drink.component.scss'
})
export class AdminDrinkComponent {
  drinks: Bebidas[];
  imageUrls: { [key: string]: SafeUrl } = {};
  drinkForm: FormGroup;
  updatedDrink: FormGroup;
  editingDrinkId: number | null = null;

  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.drinkForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });

    this.updatedDrink = this.fb.group({
      name: ['', [Validators.minLength(3)]],
      description: [''],
      price: ['', [Validators.min(0)]],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.drinksAll();
  }

  drinksAll(){
    this.adminService.getAllDrinks().subscribe(
      (drinks) => {
        this.drinks = drinks;
        this.drinks.forEach(
          (drink) => {
            this.cargarImagenBebida(drink.image);
          }
        )
      });
  }

  cargarImagenBebida(filename: string) {
    this.adminService.getImageDrink(filename).subscribe(
      (data: Blob) => {
        const objectUrl = URL.createObjectURL(data);
        this.imageUrls[filename] = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      },
      (error) => {
        console.error('Error al cargar la imagen de la bebida', error);
      }
    );
  }

  createDrink() {
    if (this.drinkForm.valid) {
      this.drinkForm.disable();
      
      const drink = this.drinkForm.value;
      this.adminService.createDrink(drink).subscribe(
        (response) => {
          this.drinksAll();
          this.drinkForm.reset();
          this.drinkForm.enable();
          alert('Bebida creada exitosamente');
        },
        (error) => {
          console.error('Error al crear la bebida:', error);
          this.drinkForm.enable();
          alert('Error al crear la bebida. Por favor, intente de nuevo.');
        }
      );
    }
  }

  loadDrinkInForm(drink: Bebidas) {
    this.editingDrinkId = drink.id;
    this.updatedDrink.patchValue({
      name: drink.name,
      description: drink.description,
      price: drink.price
    });
  }
  
  editDrink() {
    if (this.updatedDrink.valid && this.editingDrinkId) {
      this.updatedDrink.disable();
      
      const updatedDrinkData = this.updatedDrink.value;
      this.adminService.getUpdateDrink(this.editingDrinkId, updatedDrinkData).subscribe(
        (response) => {
          this.drinksAll();
          this.updatedDrink.reset();
          this.updatedDrink.enable();
          this.editingDrinkId = null;
          alert('Bebida editada exitosamente');
        },
        (error) => {
          console.error('Error al editar la bebida:', error);
          this.updatedDrink.enable();
          alert('Error al editar la bebida. Por favor, intente de nuevo.');
        }
      );
    }
  }

  onFileSelectedForEdit(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.updatedDrink.patchValue({
          image: file
        });
      };
      reader.readAsDataURL(file);
    }
  }

  cancelEdit() {
    this.updatedDrink.reset();
    this.editingDrinkId = null;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.drinkForm.patchValue({
          image: file
        });
      };
      reader.readAsDataURL(file);
    }
  }

  deleteDrink(id: number){
    if (confirm('¿Estás seguro de eliminar esta bebida?')) {
      this.adminService.deleteDrink(id).subscribe(
        (response) => {
          this.drinksAll();
          alert('Bebida eliminada exitosamente');
        },
        (error) => {
          console.error('Error al eliminar la bebida:', error);
          alert('Error al eliminar la bebida. Por favor, intente de nuevo.');
        }
      );
    }
  }
}