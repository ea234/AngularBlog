import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';

import { BlogEntry, ClsBlogEntry } from '../ClsBlogEntry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogFirebaseService
{
  /*
   * https://www.youtube.com/watch?v=v7lhtEa13QM&list=PLgWsj7sh9WibsvWDI65q2_a6rpDpU6bDo&index=6
   */

  private firestore_db_collection_name  = "test";

  constructor( private m_firestore : Firestore )
  {

  }


  getData() : Observable<any>
  {
    const collection_inst = collection( this.m_firestore, this.firestore_db_collection_name );

    return collectionData( collection_inst, { idField:"m_entry_id" } );
  }


























  // get todos
  /*
  getItems(): Observable<any[]> {
    const itemsCollection = collection(this.m_firestore, this.firestore_db_collection_name);
    return collectionData(itemsCollection, { idField: "id" }).pipe(
      map((items) =>
        items.map((item) => {
          // check if the dueDate is instance of timestamp
          if (item['dueDate'] instanceof Timestamp) {
            return { ...item, dueDate: item['dueDate'].toDate() }
          }
          return item;
        })
      )
    );
  }*/

  // read a single item by ID
  getItemById(id: string): Observable<any>
  {
    const itemDoc = doc( this.m_firestore, `${this.firestore_db_collection_name}/${id}`);

    return docData(itemDoc, { idField:"m_entry_id" });
  }


  // delete an item
  async deleteItem( id : string ): Promise<void>
  {
    const itemDoc = doc(this.m_firestore, `${this.firestore_db_collection_name}/${id}`);

    await deleteDoc(itemDoc);
  }


  async addBlogEntry( data_to_store : ClsBlogEntry ) : Promise<void>
  {
    const payload = { ...data_to_store };

    const collection_inst = collection( this.m_firestore, this.firestore_db_collection_name );

    await addDoc( collection_inst, payload  )
    .then(  ()  => console.log( "Firebase createNewData " ) )
    .catch( err => alert(err));

     try
     {
//      await addDoc(collection_inst, data_to_store); console.log("Firebase createNewData");
    } catch (error)
    {
      console.error("Fehler beim Firebase createNewData:", error);
    }
  }

  // update an item
  async updateBlogEntry( data_to_store : BlogEntry ): Promise<void>
  {
    const payload = { ...data_to_store };

    const itemDoc = doc( this.m_firestore, `${this.firestore_db_collection_name}/${ data_to_store.m_entry_id }`);

    await updateDoc( itemDoc, payload );
  }




}
