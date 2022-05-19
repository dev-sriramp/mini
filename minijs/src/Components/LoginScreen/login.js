import axios from "axios";
import React, {useState,useContext,useEffect} from "react";
import imageSelected from "../util/imageSelected";
import validator from 'validator';
import {Link, Navigate} from "react-router-dom";
import {userData} from "../../dataProvider";

const SignUp = () => {
   
    const [email, setEmail] = useState("");
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [emailVerified, setEmailVerified] = useState("");
    // const [emailError, setEmailError] = useState("outline-blue-500");
    const [showresend, setShowresend] = useState(false);
    const [passwordVerified, setPasswordVerified] = useState(false);
    const userDetail = useContext(userData);
    // if (passwordVerified) {
    //     return <Navigate to="/welcome" />;
    // }

    const {setUserEmail} = useContext(userData);

    useEffect(()=>{
        console.log(userDetail)
    },[userDetail])

    if(userDetail.userEmail){
        return <Navigate to="/welcome" />;
    }
    const emailCheck = (e) => {
        let email = e.target.value;
        if (validator.isEmail(email)) {
            // setEmailError("outline-green-500");
        } else {
            // setEmailError("outline-cyan-500");
        }
        setEmail(email);
    }
    const resendEmail = async () => {
        await axios.get(`http://localhost:${
            process.env.React_App_DBPORT
        }/resendemail?email=${email}`).then((e) => {

            console.log(e);

        }).catch((err) => {
            console.log(err);

        })
    }
    const verifyPassword = async () => {
        
        await axios.post(`http://localhost:${
            process.env.React_App_DBPORT
        }/verifypassword`, {
            email: email,
            password: selectedImage
        }).then(async (e) => {
            if (e.data.value) {

                console.log(e.data.value);
                console.log(email);
                setUserEmail(email);
                setPasswordVerified(true);
                console.log(userDetail)
            }

        }).catch((e) => {
            console.log("Error")
            setSelectedImage([]);
            setImages([]);
            emailChecked();
        })
    }
    const emailChecked = async (e) => {
        console.log(userDetail);
        console.log(process.env.React_App_DBPORT);
        // var data = [];
        await axios.get(`http://localhost:${
            process.env.React_App_DBPORT
        }/getallimages?email=${email}`).then((e) => {
            setImages(e.data);
            // console.log(e);

        }).catch((err) => {
            console.log(err);
            if (err.toString().includes("code 400")) {
                setEmailVerified("Email Not Found");
            }
            if (err.toString().includes("code 401")) {
                setEmailVerified("Verify Your Email");
                setShowresend(true);
            }

        })
        // setImages(data);
        // imagesValue();
    }

    return (<div className="container"> {/* <center> */}
        <div className="row align-self-center">
            <div className="mx-auto col-10 mt-5 col-sm-6">
                <form>
                    <center>
                        <div>

                            <h4 className="mx-auto">Graphical password Login</h4>
                        </div>
                        <div>
                            <input className={``}
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={
                                    (e) => {
                                        emailCheck(e)
                                    }
                            }></input>
                    </div>
                    <br/> {
                    !images[0] ? <button className="btn btn-primary mt-2" type="button"
                        onClick={
                            (e) => {
                                emailChecked(e)
                            }
                    }>Login</button> : ""
                }
                    {
                    !images[0] && <p className="mt-2" style={{"color":"red"}}> {emailVerified}</p>
                }
                    {
                    !images[0] && showresend && <button type="button" className="btn btn-success mt-2"
                        onClick={
                            () => {
                                resendEmail();
                            }
                    }>
                        resend verification Email
                    </button>
                } </center>
            </form>
            <div className="row"> {
                images.map((image) => {
                    return (
                        <div className="col-6 col-sm-3">
                            <div className="custom-control custom-checkbox image-checkbox">
                                <input value={`${image}`} style={{position: 'relative',top: 20,}}type="checkbox"
                                 onClick={(e) => { imageSelected(e,selectedImage,setSelectedImage) }}
                                    className="custom-control-input"
                                    id={
                                        `${image}`
                                    }/>
                                <label className="custom-control-label"
                                    htmlFor={
                                        `${image}`
                                }>
                                    <img style={
                                            {
                                                "width": "10rem",
                                                "height": "10rem"
                                            }
                                        }

                                        src={
                                            `http://localhost:${
                                                process.env.React_App_DBPORT
                                            }/getPassword?image=${image}`
                                        }
                                        alt={
                                            `${image}`
                                        }
                                        className="img-fluid"/>
                                </label>
                            </div>
                        </div>

            )
                })
            } </div>
<div><center>
            {
            images[0] && <div>
                <button className="btn btn-primary mt-2"
                    onClick={
                        (e) => {
                            verifyPassword()
                        }
                }>Login</button>
            </div>
        }
            {
            !images[0] && <div>
                <Link to="/create">
                    <button className="btn btn-info mt-2">Create An Account</button>
                </Link>
            </div>

        } </center></div></div>
    </div>
</div>)
}
export default SignUp;
