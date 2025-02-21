import { createRoot } from 'react-dom/client'
import '../node_modules/flowbite/dist/flowbite.min.js'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import App from './App.jsx'
import UserTokenBrovider from './Context/UserTocken.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import NumOfCartItemsBrovider from './Context/NumOfCartItems.jsx';
 
 
 
 const queryclient = new QueryClient()
 

createRoot(document.getElementById('root')).render(
 
<NumOfCartItemsBrovider>
   <QueryClientProvider client={queryclient}>
      <UserTokenBrovider>
        <App/>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Toaster></Toaster>
      </UserTokenBrovider>
   </QueryClientProvider> 
   </NumOfCartItemsBrovider>
 
 
           
)
