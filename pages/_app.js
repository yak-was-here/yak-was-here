import NavBar from '../components/NavBar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
