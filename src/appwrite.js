import { Client, Databases, ID, Query } from "appwrite"

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1') //api endpoint
.setProject(PROJECT_ID)

//funtionality to use from appwrite

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
   //check if a search term already exists in the database, if it does:
   try {
      const res = await database.listDocuments(DATABASE_ID,COLLECTION_ID, [
         Query.equal('searchTerm', searchTerm)
      ])
      
      if (res.documents.length > 0) {
         const doc = res.documents[0];

         await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
            count: doc.count + 1,

         }) 
      } else {
            //if the search-term doesn't already exist add it to the database
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
               searchTerm,
               count: 1,
               movie_id: movie.id,
               poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
      }
   } catch (error) {
      console.error(error)
   }
   //my guess:update the count by one and finally the elements with the highest counts are displayed in the trending section.


}

export const getTrendingMovies = async () => {
   try {
      const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
         Query.limit(5),
         Query.orderDesc('count')

      ])

      return res.documents
   } catch (error) {
      console.error(error)
   }
}