import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return( 
  <div>
    <script src={`https://maps.googleapis.com/maps/api/js?key=${ process.env.NEXT_PUBLIC_MAPS_API_KEY}&libraries=places`}></script>

    <Component {...pageProps} />
  </div>
  
  )
}

export default MyApp
