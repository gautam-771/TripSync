import {useEffect,useState} from "react";
import {Bell,Check,CalendarDays,MailCheck,MailX,CheckCircle2,XCircle,KeyRound} from "lucide-react";
import {getNotifications,markNotificationRead,acceptInvitation,rejectInvitation} from "../api/featureApi";
import {Link,useNavigate} from "react-router-dom";
import {getErrorMessage} from "../utils/errors";

const labels={
  INVITATION_RECEIVED:"Trip invitation received",
  INVITATION_ACCEPTED:"Invitation accepted",
  INVITATION_REJECTED:"Invitation rejected"
};

export default function Notifications(){
 const [items,setItems]=useState([]);
 const [error,setError]=useState("");
 const [success,setSuccess]=useState("");
 const [loading,setLoading]=useState(true);
 const [tokens,setTokens]=useState({});
 const [tripIds,setTripIds]=useState({});
 const [busy,setBusy]=useState({});
 const [manualTripId,setManualTripId]=useState("");
 const [manualToken,setManualToken]=useState("");
 const [manualBusy,setManualBusy]=useState(false);
 const navigate=useNavigate();

 async function load(){
  try{
   setError("");
   const data=await getNotifications();
   setItems(Array.isArray(data)?data:(data?.content||data?.notifications||[]));
  }catch(e){setError(getErrorMessage(e));}
  finally{setLoading(false);}
 }
 useEffect(()=>{load();},[]);

 async function mark(id){
  try{
   await markNotificationRead(id);
   setItems(current=>current.map(n=>n.id===id?{...n,read:true}:n));
  }catch(e){setError(getErrorMessage(e));}
 }

 async function respondManually(action){
  const tripId=manualTripId.trim();
  const token=manualToken.trim();
  if(!tripId){setError("Please enter the Trip ID from the invitation details.");return;}
  if(!token){setError("Please paste the invitation token from your email.");return;}
  setError("");setSuccess("");setManualBusy(true);
  try{
   if(action==="accept"){
    await acceptInvitation(tripId,token);
    setSuccess("Invitation accepted! You have joined the trip.");
    setManualToken("");
    navigate(`/trips/${tripId}`);
   }else{
    await rejectInvitation(tripId,token);
    setSuccess("Invitation rejected.");
    setManualToken("");
    await load();
   }
  }catch(e){setError(getErrorMessage(e));}
  finally{setManualBusy(false);}
 }

 async function respond(invitation, action){
  const token=(tokens[invitation.id]||"").trim();
  const tripId=invitation.tripId||tripIds[invitation.id]?.trim();
  if(!tripId){
   setError("Trip ID is missing. Enter the Trip ID for this invitation.");
   return;
  }
  if(!token){
   setError("Please paste the invitation token from your email.");
   return;
  }
  setError("");
  setSuccess("");
  setBusy(current=>({...current,[invitation.id]:true}));
  try{
   if(action==="accept"){
    await acceptInvitation(tripId,token);
    setSuccess("Invitation accepted! You have joined the trip.");
    await load();
    navigate(`/trips/${tripId}`);
   }else{
    await rejectInvitation(tripId,token);
    setSuccess("Invitation rejected.");
    setTokens(current=>({...current,[invitation.id]:""}));
    await load();
   }
  }catch(e){
   setError(getErrorMessage(e));
  }finally{
   setBusy(current=>({...current,[invitation.id]:false}));
  }
 }

 return <div className="page-stack">
  <div>
   <span className="eyebrow blue-eyebrow">STAY IN THE LOOP</span>
   <h1>Invitations</h1>
   <p className="muted">Accept or reject invitations to join your friends' trips.</p>
  </div>
  {error&&<div className="alert error-alert">{error}</div>}
  {success&&<div className="alert success-alert">{success}</div>}
  <div className="panel" style={{padding:"22px",marginBottom:"18px"}}>
   <div className="notification-content">
    <strong>Respond to a trip invitation</strong>
    <p>Open the invitation email, copy its token, and enter the Trip ID and token below.</p>
   </div>
   <div className="invitation-actions" style={{maxWidth:"560px"}}>
    <label className="invitation-field-label" htmlFor="manual-trip-id">Trip ID</label>
    <input id="manual-trip-id" className="text-input invitation-token-input" value={manualTripId} onChange={e=>setManualTripId(e.target.value)} placeholder="Enter the trip ID" />
    <label className="invitation-field-label" htmlFor="manual-invitation-token">Invitation token</label>
    <input id="manual-invitation-token" className="text-input invitation-token-input" value={manualToken} onChange={e=>setManualToken(e.target.value)} placeholder="Paste the token from your invitation email" />
    <div className="invitation-button-row">
     <button className="btn btn-primary" disabled={manualBusy} onClick={()=>respondManually("accept")}><CheckCircle2 size={15}/>{manualBusy?"Please wait...":"Accept invitation"}</button>
     <button className="btn btn-quiet" disabled={manualBusy} onClick={()=>respondManually("reject")}><XCircle size={15}/>Reject invitation</button>
    </div>
   </div>
  </div>
  {loading?<div className="empty-card">Loading invitations...</div>:
   items.length===0?
    <div className="empty-card">
     <div className="empty-icon"><Bell/></div>
     <h3>You're all caught up</h3>
     <p>New trip invitations and updates will appear here. When you receive an invitation, its token will be in your email.</p>
    </div>:
    <div className="panel notification-list">
     {items.map(n=>{
      const isInvitation=n.type==="INVITATION_RECEIVED";
      return <div className={`notification-row ${n.read?"":"unread"}`} key={n.id}>
       <div className="notification-icon">
        {isInvitation?<MailCheck size={19}/>:n.type==="INVITATION_REJECTED"?<MailX size={19}/>:<Bell size={19}/>}
       </div>
       <div className="notification-content">
        <strong>{n.title||labels[n.type]||"Trip notification"}</strong>
        <p>{n.message}</p>
        <small><CalendarDays size={13}/>{n.createdAt?new Date(n.createdAt).toLocaleString():""}</small>
        {isInvitation&&<div className="invitation-actions">
         {!n.tripId&&<>
          <label className="invitation-field-label" htmlFor={`trip-${n.id}`}>Trip ID</label>
          <input id={`trip-${n.id}`} className="text-input invitation-token-input" value={tripIds[n.id]||""} onChange={e=>setTripIds(current=>({...current,[n.id]:e.target.value}))} placeholder="Enter trip ID"/>
         </>}
         <label className="invitation-field-label" htmlFor={`token-${n.id}`}>Invitation token</label>
         <input id={`token-${n.id}`} className="text-input invitation-token-input" value={tokens[n.id]||""} onChange={e=>setTokens(current=>({...current,[n.id]:e.target.value}))} placeholder="Paste the token from your invitation email"/>
         <div className="invitation-button-row">
          <button className="btn btn-primary" disabled={!!busy[n.id]} onClick={()=>respond(n,"accept")}><CheckCircle2 size={15}/>{busy[n.id]?"Please wait...":"Accept invitation"}</button>
          <button className="btn btn-quiet" disabled={!!busy[n.id]} onClick={()=>respond(n,"reject")}><XCircle size={15}/>Reject</button>
         </div>
        </div>}
        {n.tripId&&<Link className="text-link" to={`/trips/${n.tripId}`}>Open trip</Link>}
       </div>
       {!n.read&&<button className="btn btn-quiet mark-read" onClick={()=>mark(n.id)}><Check size={15}/> Mark read</button>}
      </div>;
     })}
    </div>
  }
  <div className="panel invitation-help">
   <div className="notification-icon"><KeyRound size={18}/></div>
   <div><strong>Where do I find the token?</strong><p>Open the invitation email sent to your registered email address and copy the invitation token. Enter the Trip ID and paste the token into the form above, then choose Accept or Reject.</p></div>
  </div>
 </div>;
}
