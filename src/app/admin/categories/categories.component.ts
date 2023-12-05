import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cakes } from 'src/app/pages/models/cakes';
import { CakeService } from 'src/app/services/cake.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  category: any;
  cakes: any[] = [];
  orders: any[] = [];
  allOrders: any[] = [];
  searchOrder: string = '';
  submitted: boolean = false;
  cakeCategories: string[] = [
    'DISCOUNTED CAKES',
    'CELEBRATION CAKES',
    'KIDDIES CAKES',
    'PLANT BASED CAKES',
  ];
  editCake: Cakes = new Cakes();
  selectedCake_id!: string;
  uploading: boolean = false;
  file!: File;
  filename: string = '';

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private cakeService: CakeService,
    private modalService: NgbModal
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  async ngOnInit() {
    this.category = this.ar.snapshot.paramMap.get('category');
    /* this.category = this.category.toUpperCase().replaceAll('-', ' '); */
    if (this.category == 'celebration-cakes') {
      this.cakes = await this.cakeService.retrieveCelebrationCakes();
    } else if (this.category == 'discounted-cakes') {
      this.cakes = await this.cakeService.retrieveDiscountedCakes();
    } else if (this.category == 'kiddies-cakes') {
      this.cakes = await this.cakeService.retrieveKiddiesCakes();
    } else if (this.category == 'plant-based-cakes') {
      this.cakes = await this.cakeService.retrievePlantBasedCakes();
    }
    /* this.cakeService.fetchCategoryCakes(this.category).subscribe((value) => {
      this.cakes = value;
    }); */
  }

  filterOrders() {
    let filteredOrders: any = [];
    if (this.orders.length == 0) {
      this.orders = this.allOrders;
    }
    if (this.searchOrder) {
      for (let i = 0; i <= this.searchOrder.length; i++) {
        this.allOrders.filter((order) => {
          if (
            order.name.startsWith(this.searchOrder) //&&
            //!filteredOrders.includes(order)
          ) {
            filteredOrders.push(order);
          }
        });
      }
    }
    this.allOrders = filteredOrders;
    if (this.allOrders.length === 0) {
      this.allOrders = this.orders;
      this.orders = [];
    }

    console.log(filteredOrders);
  }

  openEditModal(cake_id: string, cake: Cakes, editModal: any) {
    this.editCake = cake;
    this.selectedCake_id = cake_id;
    this.modalService.open(editModal, { centered: true, size: 'lg' });
  }

  openDeleteModal(cake_id: string, deleteModal: any) {
    this.selectedCake_id = cake_id;
    this.modalService.open(deleteModal, { centered: true, size: 'md' });
  }

  async deleteCake() {
    this.submitted = true;
    let result = await this.cakeService.deleteCake(this.selectedCake_id);
    Swal.fire({
      title: 'Congratulations!',
      text: 'You have successfully deleted a cake.',
      icon: 'success',
      timer: 2000,
    });
    this.submitted = false;
    this.ngOnInit();
    this.modalService.dismissAll();
  }

  onFileSelected($event: any) {
    this.file = $event.target.files[0];
    this.uploadImage();
  }

  async uploadImage() {
    this.uploading = true;
    this.filename = this.file.name;
    const formData = new FormData();
    formData.append('file', this.file);
    let result = (await this.cakeService.uploadImage(this.file)).Location;
    if (result) {
      this.editCake.imageURL = result;
      this.uploading = false;
    }
  }

  async submit(editCakeForm: any) {
    let result = await this.cakeService.updateCake(
      this.selectedCake_id,
      this.editCake
    );
    Swal.fire({
      title: 'Congratulations!',
      text: 'You have successfully updated a cake',
      timer: 2000,
      icon: 'success',
    });
    this.ngOnInit();
    this.modalService.dismissAll();
  }
}
