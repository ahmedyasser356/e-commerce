import axios from "axios";

export function paymentOnline({cartId,values}) {
  let token = localStorage.getItem('token')
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{ "shippingAddress":values},{headers:{token}});
}
