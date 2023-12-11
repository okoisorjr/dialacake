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
  selectedCake_img_URL!: string;
  totalCakesInCollection!: number;

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
    this.totalCakesInCollection =
      await this.cakeService.getCollectionCountFromDB(this.category);
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

  async filterCakes() {
    let filteredOrders: any = [];
    if (this.searchOrder) {
      let result = await this.cakeService.filterCake(
        this.category,
        this.searchOrder
      );
    } else {
      return;
    }
    this.allOrders = filteredOrders;
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

  openImageHighlightModal(imageHighlightModal: any) {
    this.modalService.open(imageHighlightModal, { centered: true, size: 'md' });
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

  async onFileSelected($event: any, cake: any) {
    cake.updatingImg = true;
    this.file = $event.target.files[0];

    let result = await this.cakeService.updateImage(
      this.category,
      this.file,
      cake.doc_id
    );
    cake.updatingImg = false;
    this.ngOnInit();
    Swal.fire({
      title: 'Congratulations!',
      text: 'The image has been updated successfully.',
      icon: 'success',
      timer: 2000,
    });
  }

  async submit(editCakeForm: any) {
    let result = await this.cakeService.updateCake(
      this.category,
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

  /* paginate(event: any) {
    this.cakeService.nextPage(this.category);
  } */
}
