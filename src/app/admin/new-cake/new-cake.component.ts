import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Cakes } from 'src/app/pages/models/cakes';
import { CakeService } from 'src/app/services/cake.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-cake',
  templateUrl: './new-cake.component.html',
  styleUrls: ['./new-cake.component.css'],
})
export class NewCakeComponent implements OnInit {
  submitted: boolean = false;
  uploading: boolean = false;
  file!: File;
  filename: string = '';
  newCake: Cakes = new Cakes();
  cakeCategories: string[] = [
    'DISCOUNTED CAKES',
    'CELEBRATION CAKES',
    'KIDDIES CAKES',
    'PLANT BASED CAKES',
  ];

  constructor(
    private cakeService: CakeService,
    private modalService: NgbModal,
    private auth: Auth
  ) {}

  ngOnInit(): void {}

  submit(cakeFuploadForm?: any) {
    /* this.cakeService.createNewCake(this.newCake).subscribe((value) => {
      console.log(value);
    }); */
    this.newCake.owner_id;
    this.cakeService.addNewCake(this.newCake);
    /* Swal.fire({
      title: 'Congratulations!',
      text: 'You have successfully added a new cake!',
      timer: 2000,
      icon: 'success',
    }); */
    this.newCake = new Cakes();
    this.ngOnInit();
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
      this.newCake.imageURL = result;
      this.uploading = false;
    }
    //this.newCake.imageURL = result.Location;
    /* this.cakeService.uploadImage(this.file).subscribe(
      (value) => {
        if (value) {
          this.newCake.imageURL = value.id;
        }
        this.uploading = false;
      },
      (error: HttpErrorResponse) => {
        this.uploading = false;
        console.log(error.error.message[0]);
      }
    ); */
  }

  resetImage() {
    this.newCake.imageURL = '';
    //this.file = new File
  }

  openImageModal(imageModal: any) {
    this.modalService.open(imageModal, { centered: true, size: 'md' });
  }
}
