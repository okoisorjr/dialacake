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
  getDocs,
  startAfter,
  getCountFromServer,
  orderBy,
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
  lastRetrievedCake: any;

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

  async getCollectionCountFromDB(collectionName: string) {
    const coll = collection(this.firestore, collectionName);
    const snapshot = await getCountFromServer(coll);

    return snapshot.data().count;
  }

  async filterCake(category: string, search: string) {
    let cakes: any[] = [];

    if (category == 'celebration-cakes') {
      let q = query(this.celebrationCakeRef, where('cakeName', 'in', [search]));
      let result = await getDocs(q);
      result.forEach((doc) => {
        cakes.push({ doc_id: doc.id, ...doc.data() });
      });
    } else if (category == 'discounted-cakes') {
      let q = query(this.discountedCakeRef, where('cakeName', '==', search));
      let result = await getDocs(q);
      result.forEach((doc) => {
        cakes.push({ doc_id: doc.id, ...doc.data() });
      });
    } else if (category == 'kiddies-cakes') {
      let q = query(this.kiddiesCakeRef, where('cakeName', '==', search));
      let result = await getDocs(q);
      result.forEach((doc) => {
        cakes.push({ doc_id: doc.id, ...doc.data() });
      });
    } else if (category == 'plant-based-cakes') {
      let q = query(this.plantBasedCakeRef, where('cakeName', '==', search));
      let result = await getDocs(q);
      result.forEach((doc) => {
        cakes.push({ doc_id: doc.id, ...doc.data() });
      });
    }
    return cakes;
  }

  async retrieveCelebrationCakes(page?: string) {
    let cakes: any[] = [];
    let q;
    // retrieve all cakes
    if (page == 'home') {
      q = query(this.celebrationCakeRef, limit(4));
    } else {
      q = query(this.celebrationCakeRef, orderBy('cakeName'));
    }

    let retrieved_cakes = await getDocsFromServer(q);
    retrieved_cakes.forEach((document) => {
      cakes.push({
        doc_id: document.id,
        ...document.data(),
        updatingImg: false,
      });
    });
    /* this.lastRetrievedCake =
      retrieved_cakes.docs[retrieved_cakes.docs.length - 1].data();
    console.log(this.lastRetrievedCake); */
    return cakes;
  }

  async retrieveDiscountedCakes(page?: string) {
    let cakes: any[] = [];
    let q;
    // retrieve all cakes
    if (page == 'home') {
      q = query(this.discountedCakeRef, limit(4));
    } else {
      q = query(this.discountedCakeRef);
    }

    let retrieved_cakes = await getDocsFromServer(q);
    retrieved_cakes.forEach((document) => {
      cakes.push({
        doc_id: document.id,
        ...document.data(),
        updatingImg: false,
      });
    });

    /* this.lastRetrievedCake =
      retrieved_cakes.docs[retrieved_cakes.docs.length - 1];
    console.log(this.lastRetrievedCake); */
    return cakes;
  }

  async retrieveKiddiesCakes(page?: string) {
    let cakes: any[] = [];
    let q;
    // retrieve all cakes
    if (page == 'home') {
      q = query(this.kiddiesCakeRef, limit(4));
    } else {
      q = query(this.kiddiesCakeRef);
    }

    let retrieved_cakes = await getDocsFromServer(q);
    retrieved_cakes.forEach((document) => {
      cakes.push({
        doc_id: document.id,
        ...document.data(),
        updatingImg: false,
      });
    });

    /* this.lastRetrievedCake =
      retrieved_cakes.docs[retrieved_cakes.docs.length - 1];
    console.log(this.lastRetrievedCake); */
    return cakes;
  }

  async retrievePlantBasedCakes(page?: string) {
    let cakes: any[] = [];
    let q;
    // retrieve all cakes
    if (page == 'home') {
      q = query(this.plantBasedCakeRef, limit(4));
    } else {
      q = query(this.plantBasedCakeRef);
    }

    let retrieved_cakes = await getDocsFromServer(q);
    retrieved_cakes.forEach((document) => {
      cakes.push({
        doc_id: document.id,
        ...document.data(),
        updatingImg: false,
      });
    });

    /* this.lastRetrievedCake =
      retrieved_cakes.docs[retrieved_cakes.docs.length - 1];
    console.log(this.lastRetrievedCake); */
    return cakes;
  }

  /* nextPage(collectionName: string) {
    let nextPage = query(
      collection(this.firestore, collectionName),
      orderBy('cakeName'),
      startAfter(this.lastRetrievedCake),
      limit(10)
    );
    console.log(nextPage);
  } */

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

  async deleteCake(category: string, doc_id: string) {
    const cakeRef = doc(this.firestore, `${category}/${doc_id}`);
    let result = await deleteDoc(cakeRef);

    return result;
  }

  async updateCake(category: string, doc_id: string, editCake: Cakes) {
    if (category == 'celebration-cakes') {
      let result = await updateDoc(
        doc(this.firestore, `celebration-cakes/${doc_id}`),
        {
          ...editCake,
        }
      );
      return result;
    } else if (category == 'discounted-cakes') {
      let result = await updateDoc(
        doc(this.firestore, `celebration-cakes/${doc_id}`),
        {
          ...editCake,
        }
      );
      return result;
    } else if (category == 'kiddies-cakes') {
      let result = await updateDoc(
        doc(this.firestore, `celebration-cakes/${doc_id}`),
        {
          ...editCake,
        }
      );
      return result;
    } else if (category == 'plant-based-cakes') {
      let result = await updateDoc(
        doc(this.firestore, `celebration-cakes/${doc_id}`),
        {
          ...editCake,
        }
      );
      return result;
    }
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

  async updateImage(category: string, file: File, doc_id: string) {
    console.log(category);
    let new_image_url = await this.uploadImage(file);
    if (category == 'celebration-cakes') {
      let result = await updateDoc(
        doc(this.firestore, `celebration-cakes/${doc_id}`),
        {
          imageURL: new_image_url.Location,
        }
      );
      return result;
    } else if (category == 'discounted-cakes') {
      let result = await updateDoc(
        doc(this.firestore, `discounted-cakes/${doc_id}`),
        {
          imageURL: new_image_url.Location,
        }
      );
      return result;
    } else if (category == 'kiddies-cakes') {
      let result = await updateDoc(
        doc(this.firestore, `kiddies-cakes/${doc_id}`),
        {
          imageURL: new_image_url.Location,
        }
      );
      return result;
    } else if (category == 'plant-based-cakes') {
      let result = await updateDoc(
        doc(this.firestore, `plant-based-cakes/${doc_id}`),
        {
          imageURL: new_image_url.Location,
        }
      );
      return result;
    }
  }
}
