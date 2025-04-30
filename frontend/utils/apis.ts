
// cart
export const GET_CART = 'auth/getCart'
export const DELETE_CART = 'auth/deleteCartItemByItemId/'
export const CREATE_CART_ITEM = 'auth/addToCart'
export const UPDATE_CART_ITEM = 'auth/updateCartItemByItemId/'


//user
export const CREATE_USER = '/auth/register'
export const DELETE_USER = '/auth/'
export const UPDATE_USER = '/auth/'
export const USER_LOGIN = '/auth/signin'
export const USER_LOGOUT = '/auth/logout'
export const USER_INFO = '/auth/info'
export const UPLOAD_PROFILE_PIC = '/user/uploadProfilePicture'


//restaurants

export const UPLOAD_ITEM_IMAGE = '/restaurants/image/upload'
export const GET_ALL_ITEMS_OWN = '/restaurants/getOwnItems'
export const CREATE_ITEM = '/restaurants/createNewItem'
export const GET_ALL_ITEMS = '/restaurants/getAllItems'
export const UPDATE_ITEM = '/restaurants/updateItem/'
export const DELETE_ITEM = '/restaurants/deleteItem/'

export const GET_ALL_RESTURANTS = `/restaurants/getAllRestaurants`
export const UPDATE_AVAILABILITY = `/restaurants/:id/availability`
export const VERIFY_RESTAURANT = `/restaurants/verify/:id`

//orders

export const CREATE_ORDER = '/orders/placeOrder'


