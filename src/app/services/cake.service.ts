import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as S3 from 'aws-sdk/clients/s3';
import { Auth } from '@angular/fire/auth';
import {
  doc,
  Firestore,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  where,
  getDocsFromServer,
  query,
  limit,
} from '@angular/fire/firestore';
import { Cakes } from '../pages/models/cakes';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CakeService {
  celebrationCakeRef = collection(this.firestore, 'celebration-cakes');
  discountedCakeRef = collection(this.firestore, 'discounted-cakes');
  kiddiesCakeRef = collection(this.firestore, 'kiddies-cakes');
  plantBasedCakeRef = collection(this.firestore, 'plant-based-cakes');

  constructor(
    private http: HttpClient,
    private firestore: Firestore,
    private auth: Auth
  ) {}

  createCelebrationCake(new_cake: Cakes) {
    
    addDoc(this.celebrationCakeRef, {
      ...new_cake,
      document_owner: this.auth.currentUser?.uid,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createDiscountedCake(new_cake: Cakes) {
    
    addDoc(this.discountedCakeRef, {
      ...new_cake,
      document_owner: this.auth.currentUser?.uid,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createKiddiesCake(new_cake: Cakes) {
    
    addDoc(this.kiddiesCakeRef, {
      ...new_cake,
      document_owner: this.auth.currentUser?.uid,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createPlantBasedCake(new_cake: Cakes) {
    
    addDoc(this.plantBasedCakeRef, {
      ...new_cake,
      document_owner: this.auth.currentUser?.uid,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async retrieveCelebrationCakes(page?: string) {
    let cakes: any[] = [];
    let q;
    // retrieve all cakes
    if(page == 'home'){
      q = query(this.celebrationCakeRef, limit(4));
    }else{
      q = query(this.celebrationCakeRef);
    }
    
    let retrieved_cakes = await getDocsFromServer(q);
    retrieved_cakes.forEach((document) => {
      cakes.push({ doc_id: document.id, ...document.data() });
    });
    console.log(cakes);
    return cakes;
  }

  async retrieveDiscountedCakes(page?: string) {
    let cakes: any[] = [];
    let q;
    // retrieve all cakes
    if(page == 'home'){
      q = query(this.discountedCakeRef, limit(4));
    }else{
      q = query(this.discountedCakeRef);
    }
    
    let retrieved_cakes = await getDocsFromServer(q);
    retrieved_cakes.forEach((document) => {
      cakes.push({ doc_id: document.id, ...document.data() });
    });
    console.log(cakes);
    return cakes;
  }

  async retrieveKiddiesCakes(page?: string) {
    let cakes: any[] = [];
    let q;
    // retrieve all cakes
    if(page == 'home'){
      q = query(this.kiddiesCakeRef, limit(4));
    }else{
      q = query(this.kiddiesCakeRef);
    }
    
    let retrieved_cakes = await getDocsFromServer(q);
    retrieved_cakes.forEach((document) => {
      cakes.push({ doc_id: document.id, ...document.data() });
    });
    console.log(cakes);
    return cakes;
  }

  async retrievePlantBasedCakes(page?: string) {
    let cakes: any[] = [];
    let q;
    // retrieve all cakes
    if(page == 'home'){
      q = query(this.plantBasedCakeRef, limit(4));
    }else{
      q = query(this.plantBasedCakeRef);
    }
    
    let retrieved_cakes = await getDocsFromServer(q);
    retrieved_cakes.forEach((document) => {
      cakes.push({ doc_id: document.id, ...document.data() });
    });
    console.log(cakes);
    return cakes;
  }

  /* async retrieveCakes() {
    let cakes: any[] = [];

    // retrieve all cakes
    const q = query(this.cakesRef);
    let retrieved_cakes = await getDocsFromServer(q);
    retrieved_cakes.forEach((document) => {
      cakes.push({ doc_id: document.id, ...document.data() });
    });
    //console.log(cakes);
    return cakes;
  } */

  async deleteCake(doc_id: string) {
    const cakeRef = doc(this.firestore, `cakes/${doc_id}`);
    let result = await deleteDoc(cakeRef);
    console.log(result);
    return result;
  }

  async updateCake(doc_id: string, editCake: Cakes) {
    let result = await updateDoc(doc(this.firestore, `cakes/${doc_id}`), {
      ...editCake,
    });
  }

  uploadImage(file: File) {
    const contentType = file.type;
    const bucket = new S3({
      accessKeyId: environment.AWS_ACCESS_KEY_ID,
      secretAccessKey: environment.AWS_ACCESS_SECRET_KEY,
      region: environment.AWS_S3_REGION,
    });

    const params = {
      Bucket: environment.AWS_BUCKET_NAME,
      Key: file.name + Date.now(),
      Body: file,
      ACL: 'public-read',
      ContentType: contentType,
    };
    let data = bucket
      .upload(params)
      .promise()
      .then((data) => {
        return data;
      });

    return data;
    /* bucket.upload(params, function (err: any, data: any) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log(data.location);
      return data;
    }); */
    /* return this.http.post<ResourceCreated>(
      `${environment.developmentIP}/cakes/upload-image`,
      file
    );) */
  }
}
