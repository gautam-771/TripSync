import {useState} from "react";
import {Link,useNavigate,useLocation} from "react-router-dom";
import {Plane,Mail,Lock,ArrowRight} from "lucide-react";
import {loginUser} from "../api/authApi";
import {getErrorMessage} from "../utils/errors";

export default function Login(){
 const [form,setForm]=useState({email:"",password:""}),[error,setError]=useState(""),[loading,setLoading]=useState(false);
 const navigate=useNavigate(),location=useLocation();
 function update(e){setForm({...form,[e.target.name]:e.target.value});}
 async function submit(e){
  e.preventDefault();setError("");setLoading(true);
  try{
   const data=await loginUser(form);
   sessionStorage.setItem("tripsync_token",data.accessToken);
   // AuthResponse has no user profile fields; keep email until a profile API is available.
   sessionStorage.setItem("tripsync_user",JSON.stringify({email:form.email,...(data.role?{role:data.role}:{})}));
   navigate("/dashboard");
  }catch(err){setError(getErrorMessage(err,"Unable to log in. Check your email and password."));}
  finally{setLoading(false);}
 }
 return <div className="auth-page"><div className="auth-decoration"><div className="auth-brand"><span className="brand-mark"><Plane size={21}/></span> Trip<span>Sync</span></div><div className="auth-promo"><h1><Plane size={34}/> TripSync</h1><h2>Your Perfect Travel Companion</h2><p>Plan together. Travel better.</p></div></div>
 <div className="auth-panel"><div className="auth-form-wrap"><div className="auth-mobile-brand"><span className="brand-mark"><Plane size={19}/></span> Trip<span>Sync</span></div><span className="eyebrow blue-eyebrow">WELCOME BACK</span><h2>Sign in to TripSync</h2><p className="muted">Enter your details to continue your travel plans.</p>
 {location.state?.message&&<div className="alert success-alert">{location.state.message}</div>}{error&&<div className="alert error-alert">{error}</div>}
 <form onSubmit={submit} className="form-stack"><label>Email address</label><div className="input-wrap"><Mail size={18}/><input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={update} required/></div><label>Password</label><div className="input-wrap"><Lock size={18}/><input type="password" name="password" placeholder="Enter your password" value={form.password} onChange={update} required/></div><button className="btn btn-primary btn-full" disabled={loading}>{loading?"Signing in...":"Sign in"} <ArrowRight size={17}/></button></form>
 <p className="auth-switch">Don't have an account? <Link to="/register">Create an account</Link></p></div></div></div>;
}
