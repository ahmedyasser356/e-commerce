/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,jsx}",
    './node_modules/flowbite/**/*.js'
  ],
    
  theme: {
    colors:{
      'main-color':'#0aad0a',
      "light-color":'#f0f3f2',
      "rating-color":'#ffc908'
      
   },
    extend: {
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },

      fontSize:{
          h1:' 2.5rem',
          h2:' 2rem',
          h3:' 1.75rem',
          h4:' 1.5rem',
          h5:' 1.25rem',
          h6:' 1rem',
      },
      container:{
            center:true,
            padding:'1rem'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode:'class'
}

