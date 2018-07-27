/*The following functions are defined to make use of api end points easy.
  Each function is associated with one api endpoint.
  To handle an api request select a function and pass in a successCallback,
  errorCallback and a payload that is defined from wherever you are */
import axios from 'axios'
//var apiBaseUrl = "https://dog-grooming.herokuapp.com"
var apiBaseUrl = "http://localhost:5000"
const LOGIN_ENDPOINT = "/api/users/login"
const REGISTER_ENDPOINT = "/api/users/register"
const USER_INFORMATION_ENDPOINT = "/api/users/getDetails"
const USER_INFORMATION_CHANGE_ENDPOINT = "/api/users/changeDetails"
const DOG_ADD_ENDPOINT = "/api/dogs/addDog"
const DOG_DELETE_ENDPOINT = "/api/dogs/deleteDog"
const DOG_EDIT_ENDPOINT = "/api/dogs/editDog"
const USER_GET_DOGS_ENDPOINT = "/api/dogs/getDogs"
const BOOKING_ADD_ENDPOINT = "/api/bookings/addBooking"
const BOOKING_EDIT_ENDPOINT = "/api/bookings/editBooking"
const BOOKING_DELETE_ENDPOINT = "/api/bookings/deleteBooking"
const USER_GET_A_DAY_BOOKING_ENDPOINT = "/api/bookings/getDayBookings"
const USER_GET_BOOKING_ENDPOINT = "/api/bookings/getUserBookings"
const ADMIN_GET_DAY_BOOKINGS_ENDPOINT = "/api/bookings/getDayBookingsAdmin"


/************************************************************************/
/***************************AUTHENTICATION*******************************/
/************************************************************************/

/*End point used for logging in users*/
export const loginUserPost = (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempting to log in:" + payloadstr)
  const promise = axios.post(apiBaseUrl + LOGIN_ENDPOINT, payload)
  promise.then(successCallback).catch(errorCallback)
}

/*End point used for registering new users*/
export const registerUserPost = (successCallback,errorCallback,payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempting to register:" + payloadstr)
  const promise = axios.post(apiBaseUrl + REGISTER_ENDPOINT, payload)
  promise.then(successCallback).catch(errorCallback)
}

export const userInformationGET = (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempting to retrieve information: " + payloadstr);
  const promise = axios.post(apiBaseUrl + USER_INFORMATION_ENDPOINT, payload)
  promise.then(successCallback).catch(errorCallback);
}

export const userInformationEditPUT = (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempted to edit user information: " + payloadstr);
  const promise = axios.post(apiBaseUrl + USER_INFORMATION_CHANGE_ENDPOINT, payload);
  promise.then(successCallback).catch(errorCallback);
}

export const dogAddPUT = (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempted to add dog: " + payloadstr);
  const promise = axios.post(apiBaseUrl + DOG_ADD_ENDPOINT, payload);
  promise.then(successCallback).catch(errorCallback);
}

export const dogDELETE = (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempted to delete dog: " + payloadstr);
  const promise = axios.post(apiBaseUrl + DOG_DELETE_ENDPOINT, payload);
  promise.then(successCallback).catch(errorCallback);
}

export const dogEditPUT = (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempted to edit dog: " + payloadstr);
  const promise = axios.post(apiBaseUrl + DOG_EDIT_ENDPOINT, payload);
  promise.then(successCallback).catch(errorCallback);
}

export const userDogsGET = (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempted to get user's dogs: " + payloadstr);
  const promise = axios.post(apiBaseUrl + USER_GET_DOGS_ENDPOINT, payload);
  promise.then(successCallback).catch(errorCallback);
}

export const bookingAddPUT = (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempted to add booking: " + payloadstr);
  const promise = axios.post(apiBaseUrl + BOOKING_ADD_ENDPOINT, payload);
  promise.then(successCallback).catch(errorCallback);
}

export const bookingEditPUT = (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempted to edit booking: " + payloadstr);
  const promise = axios.post(apiBaseUrl + BOOKING_EDIT_ENDPOINT, payload);
  promise.then(successCallback).catch(errorCallback);
}
export const bookingDELETE= (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempted to delet booking: " + payloadstr);
  const promise = axios.post(apiBaseUrl + BOOKING_DELETE_ENDPOINT, payload);
  promise.then(successCallback).catch(errorCallback);
}
export const userBookingGET = (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempted to get booking list: " + payloadstr);
  const promise = axios.post(apiBaseUrl + USER_GET_BOOKING_ENDPOINT, payload);
  promise.then(successCallback).catch(errorCallback);
}

export const dayBookingGET = (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempted to get whole day booking list: " + payloadstr);
  const promise = axios.post(apiBaseUrl + USER_GET_A_DAY_BOOKING_ENDPOINT, payload);
  promise.then(successCallback).catch(errorCallback);
}

export const adminDayBookingsGET = (successCallback,errorCallback, payload) => {
  var payloadstr = JSON.stringify(payload);
  console.log("Attempted to get all bookings for day for admin: " + payloadstr);
  const promise = axios.post(apiBaseUrl + ADMIN_GET_DAY_BOOKINGS_ENDPOINT, payload);
  promise.then(successCallback).catch(errorCallback);
}
