import axios from "axios";
import { useState } from "react";
import Home from "./Home";

function Header(props) {
    let {page} = props
    let headerTitle = " py-3 d-flex justify-content-between"
    let initialUserValue = {
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        address: "",
    }
    let [newUser, setNewUser] = useState({...initialUserValue})
    let [showPassword, setShowPassword] = useState(false)
    let data = localStorage.getItem('user')
    data = data === null ? null : JSON.parse(data)
    let [loginDetails] = useState(data)
    
    let saveUser = async ()=>{
        let saveData = {
            f_name: newUser.fullName,
            email: newUser.email,
            mobile: newUser.mobile,
            password: newUser.password,
            confirmPassword: newUser.confirmPassword,
            address: newUser.address,
        }
       
        if(newUser.fullName&&newUser.mobile&&newUser.password&&newUser.address&&newUser.email&&newUser.confirmPassword!==undefined||null){
            if(newUser.confirmPassword===newUser.password){
                let url = "http://localhost:3040/api/save-user-data"
                let {data} = await axios.post(url,saveData);
                if(data.call==true){
                 alert("resister successfully")
                } else{
                 alert(data.message)
                }
             console.log(data)
            }else{
                alert("please confirm your password")
            }
           }
            
            
        else{
            
            alert("please fill all blocks")
    }
    }


    let userLogin = async ()=>{
        let sendData = {
            username: newUser.mobile,
            password: newUser.password,
        }
        let url = "http://localhost:3040/api/Login"
        let {data} = await axios.post(url,sendData);
        if(data.call == true){
            localStorage.setItem('user',JSON.stringify(data.user))
            alert("login successfully")
            window.location.assign("/")
        }else{
            alert("Login credential dont match")
        }
    }



    let userLogout = async ()=>{
        localStorage.removeItem('user')
        window.location.assign("/")
    }

   

    let setInputData = (event) =>{
            let {value, name} = event.target;
            setNewUser({...newUser, [name]:value})
    }

    return <>
        <div className="modal fade" id="modalLogin" aria-hidden="true" aria-labelledby="modalLogin" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Login</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form required>
                          
                            <div className="input-group mb-3">
                                <span className="input-group-text bg-success text-white"><i className="fa fa-phone"></i></span>
                                <input type="text" className="form-control" placeholder="mobile number" onChange={setInputData} value={newUser.mobile} name="mobile" required/>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text bg-dark text-white"><i className="fa fa-key"></i></span>
                                <input type={showPassword ? "text" : "password"} className="form-control" placeholder="password" onChange={setInputData} value={newUser.password} name="password" required/>
                                <button type="button" className="input-group-text bg-white text-dark" onClick={() => setShowPassword(!showPassword)}><i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i></button>
                            </div>
                        </form>
                    
                    </div>
                    <hr className="p-0 m-0 bg-secondary mx-3" />
                    <div className="p-2 ps-3 d-flex align-items-lg-start justify-content-between">
                        <p className="pt-2">Haven't an account ?  <button className="btn btn-link pt-1 pb-2" data-bs-target="#modalCreateAccount" data-bs-toggle="modal" data-bs-dismiss="modal">Create an account</button> </p>
                        
                        <button className="btn btn-primary p-1 mt-2 me-2" onClick={userLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="modalCreateAccount" aria-hidden="true" aria-labelledby="modalCreateAccountLabel" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modalCreateAccountLabel">Resigestration</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form required>
                            <div className="input-group mb-3">
                                <span className="input-group-text bg-primary text-white"><i className="fa fa-user"></i></span>
                                <input type="text" className="form-control" placeholder="enter full name" onChange={setInputData} value={newUser.fullName} name="fullName" required/>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text text-white bg-danger"><i className="fa fa-envelope"></i></span>
                                <input type="text" className="form-control" placeholder="email" onChange={setInputData} value={newUser.email} name="email" required/>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text bg-success text-white"><i className="fa fa-phone"></i></span>
                                <input type="text" className="form-control" placeholder="mobile number" onChange={setInputData} value={newUser.mobile} name="mobile" required/>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text bg-dark text-white"><i className="fa fa-key"></i></span>
                                <input type={showPassword ? "text" : "password"} className="form-control" placeholder="password" onChange={setInputData} value={newUser.password} name="password" required/>
                                <button type="button" className="input-group-text bg-white text-dark" onClick={() => setShowPassword(!showPassword)}><i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i></button>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text bg-primary text-white" ><i className="fa fa-lock"></i></span>
                                <input type="password" className="form-control" placeholder="confirm-password" onChange={setInputData} value={newUser.confirmPassword} name="confirmPassword" required/>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text bg-warning text-white"><i className="fa fa-home"></i></span>
                                <textarea type="text" className="form-control" placeholder="address" onChange={setInputData} value={newUser.address} name="address" required/>
                            </div> 
                        </form>
                    </div>
                    <hr className="p-0 m-0 bg-secondary mx-3" />
                    <div className="p-2 ps-3 d-flex align-items-lg-start justify-content-between">
                        <p className="pt-2">Have a account ?  <button className="btn btn-link pt-1 pb-2" data-bs-target="#modalLogin" data-bs-toggle="modal" data-bs-dismiss="modal">Login</button> </p>
                        
                        <button className="btn btn-primary p-1 mt-2 me-2" onClick={saveUser}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>



        <div className={page== 'Home' ? "row justify-content-center" :"row justify-content-center bg-danger"}>
            <div className={page=== 'Home' ?"col-12"+headerTitle:"col-10"+headerTitle}>
                {page === 'Home'?<p></p> : <p className="m-0 brand">e!</p>}
                
                <div>
                    {
                        loginDetails ? (<><span className="fw-bolder text-white me-3">Welcome {loginDetails.first_name}</span><button className="btn btn-warning p-1" onClick={userLogout}>Logout</button></>) : <><button className="btn text-white" data-bs-target="#modalLogin" data-bs-toggle="modal">Login</button>
                        <button className="btn border border-1 border-white text-white" data-bs-target="#modalCreateAccount" data-bs-toggle="modal">
                            <i className="fa fa-search" aria-hidden="true"></i>&nbsp;
                            Create an account
                        </button></>
                    }
                    
                </div>
            </div>
        </div>
    </>
}

export default Header;