import React  from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      name:"",
      email:"",
      message:""
    }
  }

  notify(message,mode ="success"){
if(mode === "success"){
    toast.success(message,{position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
  })

} else {
  toast.error(message,{position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark"


})
  }
} 
  handleChange(e){
    this.setState({[e.target.name]:e.target.value})
  }

  async handleSubmit(e){
    e.preventDefault();
    
    let request = await fetch("https://3001-kjraval-reactwithapi-nwtjaexah5l.ws-us90.gitpod.io/message",{
      method: "POST",
     body: JSON.stringify(this.state),
     headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         "Access-Control-Allow-Origin": "*",
         "mode": "no-cors",
         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
     },
 })
    let data = await request.json();
    console.log(request.status,data.message)
    if(request.status === 200){
     
      this.notify(data.message)

    } else {
      this.notify(data.message,"error")
    }

  }


render(){
  return <>
   <ToastContainer />
  <section className="bg-white dark:bg-gray-900">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
      <form  className="space-y-8"  onSubmit={(e)=>{this.handleSubmit(e)}}>
      <div>
              <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
              <input onChange={(e)=>{this.handleChange(e)}} type="text" name="name" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Full Name"/>
          </div>
        
          <div>
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input  onChange={(e)=>{this.handleChange(e)}} type="email" name="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@gmail.com"/>
          </div>
         <div className="sm:col-span-2">
              <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea  onChange={(e)=>{this.handleChange(e)}} name="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-green-700 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
      </form>
  </div>
</section>
  
  </>
}







}