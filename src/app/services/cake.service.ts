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
} from '@angular/fire/firestore';
import { Cakes } from '../pages/models/cakes';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CakeService {
  cakesRef = collection(this.firestore, 'cakes');

  constructor(
    private http: HttpClient,
    private firestore: Firestore,
    private auth: Auth
  ) {}

  addNewCake(new_cake: Cakes) {
    addDoc(this.cakesRef, {
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

  async retrieveCakes() {
    let cakes: any[] = [];

    // retrieve all cakes
    const q = query(this.cakesRef);
    let retrieved_cakes = await getDocsFromServer(q);
    retrieved_cakes.forEach((document) => {
      cakes.push({ doc_id: document.id, ...document.data() });
    });
    console.log(cakes);
    return cakes;
  }

  async retrieveCategoryCakes(category: string) {
    let cakes: any[] = [];
    // retrieve cakes based on category
    const q = query(this.cakesRef, where('category', '==', category));
    let retrieved_cakes = await getDocsFromServer(q);
    retrieved_cakes.forEach((document) => {
      cakes.push({ doc_id: document.id, ...document.data() });
    });
    console.log(cakes);
    return cakes;
  }

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
