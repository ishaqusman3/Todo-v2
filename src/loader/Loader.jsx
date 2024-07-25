import './Loader.css'
import loaderImg from '../assets/loader.gif'
import ReactDOM from 'react-dom'
const Loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
        <div className="loader">
            <img src='https://ibb.co/YD3RMJP' alt="Loading...." width={200}/>
        </div>
    </div>, 
    document.getElementById('loader')
  )
}

export default Loader