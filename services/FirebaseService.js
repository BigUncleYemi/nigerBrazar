import { auth, db } from '../services/Firebase';
import * as actionTypes from '../redux/constants';

const FirebaseService = {}

FirebaseService.signInEmailRequest = async (email, password) =>
  await auth.signInWithEmailAndPassword(email, password);
		
FirebaseService.signOutRequest = async () =>
	await auth.signOut();

FirebaseService.signUpEmailRequest = async (email, password) =>
	await auth.createUserWithEmailAndPassword(email, password);	

FirebaseService.signUpAddUserDetailsRequest = async (id, value) => 
	await db.collection("users").doc(id).set({ ...value });
	
FirebaseService.signInGetUserDetailsRequest = async (id) => 
	await db.collection("users").doc(id).get();

FirebaseService.adminGetAllUsers = async () => 
	await db.collection("users").get();

FirebaseService.postNewRestaurantRequest = async (id, value) => 
		await db.collection("restaurant").doc(id).set({ ...value });

FirebaseService.getOwnersRestaurantsRequest = async () => 
		await db.collection("restaurant").where("ownerId", "==", localStorage.getItem(actionTypes.AUTH_TOKEN_ID)).get();

FirebaseService.getRestaurantsRequest = async () => 
		await db.collection("restaurant").get()

FirebaseService.getARestaurantRequest = async (id) => 
		await db.collection("restaurant").doc(id).get();

FirebaseService.updateARestaurantRequest = async (id, value) => 
		await db.collection("restaurant").doc(id).update({ ...value });

FirebaseService.postRestaurantReviewRequest = async (id, value) => 
		await db.collection("reviews").doc(id).set({ ...value });

FirebaseService.getAdminRestaurantReviewRequest = async () => 
		await db.collection("reviews").get();

FirebaseService.getRestaurantReviewRequest = async (id) => 
		await db.collection("reviews").where("restaurantId", "==", id).get();

FirebaseService.getOwnerRestaurantReviewRequest = async () => 
		await db.collection("reviews").where("restaurantOwnerId", "==", localStorage.getItem(actionTypes.AUTH_TOKEN_ID)).get();

FirebaseService.replyRestaurantReviewRequest = async (id, value) => 
		await db.collection("reviews").doc(id).update({ ...value });

FirebaseService.adminEditRestaurantReviewRequest = async (id, value) => 
		await db.collection("reviews").doc(id).update({ ...value });

FirebaseService.adminDeleteRestaurantReviewRequest = async (id) => 
		await db.collection("reviews").doc(id).delete();

FirebaseService.adminDeleteRestaurantRequest = async (id) => 
		await db.collection("restaurant").doc(id).delete();

FirebaseService.AdminEditRestaurantNameOnReviewRequest = async (id, value) => {
	const batch = db.batch();
	const querySnapshot = db.collection("reviews").where("restaurantId", "==", id).get();
	(await querySnapshot).forEach(documentSnapshot => {
		batch.update(documentSnapshot.ref, {...value});
	});
	return await batch.commit();
}

FirebaseService.AdminDeleteAllRestaurantReviewsRequest = async (id) =>  {
	const batch = db.batch();
	const querySnapshot = db.collection("reviews").where("restaurantId", "==", id).get();
	(await querySnapshot).forEach(documentSnapshot => {
		batch.delete(documentSnapshot.ref);
	});
	return await batch.commit();
}

FirebaseService.adminDeleteUserDetailsRequest = async (id, value) => 
	await db.collection("users").doc(id).delete();

FirebaseService.AdminDeleteAllUserRestaurantRequest = async (id) =>  {
	const batch = db.batch();
	const querySnapshot = db.collection("restaurant").where("ownerId", "==", id).get();
	(await querySnapshot).forEach(documentSnapshot => {
		batch.delete(documentSnapshot.ref);
	});
	return await batch.commit();
}

FirebaseService.AdminDeleteAllUserRestaurantReviewsRequest = async (id) =>  {
	const batch = db.batch();
	const querySnapshot = db.collection("reviews").where("restaurantOwnerId", "==", id).get();
	(await querySnapshot).forEach(documentSnapshot => {
		batch.delete(documentSnapshot.ref);
	});
	return await batch.commit();
}

FirebaseService.AdminDeleteAllUserReviewsRequest = async (id) =>  {
	const batch = db.batch();
	const querySnapshot = db.collection("reviews").where("reviewerId", "==", id).get();
	(await querySnapshot).forEach(documentSnapshot => {
		batch.delete(documentSnapshot.ref);
	});
	return await batch.commit();
}
	
FirebaseService.adminUpdateUserDetailsRequest = async (id, value) => 
	await db.collection("users").doc(id).update({ ...value });

export default FirebaseService;
