import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import {CalendarDays,Plus,Trash2,MapPin,Clock} from "lucide-react";
import TripSelect from "../components/TripSelect";
import {getItineraries,createItinerary,deleteItinerary,createActivity,deleteActivity} from "../api/featureApi";
import {getTripMembers} from "../api/tripApi";
import {getErrorMessage} from "../utils/errors";

export default function Itineraries(){
 const {tripId: routeTripId}=useParams();
 const [tripId,setTripId]=useState(routeTripId||""),[items,setItems]=useState([]),[error,setError]=useState(""),[notice,setNotice]=useState("");
 const [day,setDay]=useState({date:"",note:""}),[activity,setActivity]=useState({});
 async function load(){if(!tripId)return;try{setItems(await getItineraries(tripId));setError("");}catch(e){setError(getErrorMessage(e));}}
 useEffect(()=>{if(routeTripId){setTripId(routeTripId);}},[routeTripId]);
 useEffect(()=>{load();},[tripId]);
 async function addDay(e){e.preventDefault();try{await createItinerary(tripId,day);setDay({date:"",note:""});setNotice("Itinerary day created.");load();}catch(e){setError(getErrorMessage(e));}}
 async function addActivity(e,itineraryId){e.preventDefault();const f=activity[itineraryId]||{};try{await createActivity(tripId,itineraryId,{...f,estimatedCost:f.estimatedCost===""||f.estimatedCost==null?0:Number(f.estimatedCost),displayOrder:f.displayOrder===""||f.displayOrder==null?0:Number(f.displayOrder)});setActivity({...activity,[itineraryId]:{}});setNotice("Activity added.");load();}catch(e){setError(getErrorMessage(e));}}
 async function removeDay(id){if(!confirm("Delete this itinerary day and its activities?"))return;try{await deleteItinerary(tripId,id);load();}catch(e){setError(getErrorMessage(e));}}
 async function removeAct(dayId,actId){try{await deleteActivity(tripId,dayId,actId);load();}catch(e){setError(getErrorMessage(e));}}
 return <div className="page-stack"><div><span className="eyebrow blue-eyebrow">PLAN EACH DAY</span><h1>Itineraries</h1><p className="muted">Build a day-by-day plan for your group.</p></div><div className="panel"><label className="standalone-label">Choose trip</label><TripSelect value={tripId} onChange={setTripId}/></div>
 {error&&<div className="alert error-alert">{error}</div>}{notice&&<div className="alert success-alert">{notice}</div>}
 {!tripId?<div className="empty-card">Select a trip to view and manage its itinerary.</div>:<><div className="panel"><h2 className="panel-title">Add an itinerary day</h2><form className="inline-form" onSubmit={addDay}><input className="text-input" type="date" value={day.date} onChange={e=>setDay({...day,date:e.target.value})} required/><input className="text-input" placeholder="Day note (optional)" maxLength="1000" value={day.note} onChange={e=>setDay({...day,note:e.target.value})}/><button className="btn btn-primary"><Plus size={16}/> Add day</button></form></div>
 {items.length===0?<div className="empty-card"><div className="empty-icon"><CalendarDays/></div><h3>No itinerary days yet</h3><p>Add the first date to start planning activities.</p></div>:<div className="itinerary-list">{items.map((it,i)=><div className="panel itinerary-day" key={it.id}><div className="day-heading"><div className="day-date-icon"><CalendarDays size={19}/></div><div><span className="eyebrow">DAY {i+1}</span><h2>{it.date}</h2><p className="muted">{it.notes||it.note||"No note added"}</p></div><button className="icon-button danger-icon" onClick={()=>removeDay(it.id)} title="Delete day"><Trash2 size={17}/></button></div>
 {it.activities?.length>0&&<div className="activity-list">{it.activities.map(a=><div className="activity-row" key={a.id}><div className="activity-time"><Clock size={14}/>{a.startTime} – {a.endTime}</div><div className="activity-main"><strong>{a.title}</strong><span>{a.location&&<><MapPin size={13}/>{a.location}</>}</span>{a.description&&<p>{a.description}</p>}</div><div className="activity-cost">{a.estimatedCost>0?`₹${a.estimatedCost}`:""}</div><button className="icon-button danger-icon" onClick={()=>removeAct(it.id,a.id)}><Trash2 size={15}/></button></div>)}</div>}
 <details className="add-activity"><summary><Plus size={15}/> Add activity</summary><form className="activity-form" onSubmit={e=>addActivity(e,it.id)}><input className="text-input" placeholder="Activity title" required value={activity[it.id]?.title||""} onChange={e=>setActivity({...activity,[it.id]:{...activity[it.id],title:e.target.value}})}/><input className="text-input" placeholder="Location" value={activity[it.id]?.location||""} onChange={e=>setActivity({...activity,[it.id]:{...activity[it.id],location:e.target.value}})}/><input className="text-input" type="time" required value={activity[it.id]?.startTime||""} onChange={e=>setActivity({...activity,[it.id]:{...activity[it.id],startTime:e.target.value}})}/><input className="text-input" type="time" required value={activity[it.id]?.endTime||""} onChange={e=>setActivity({...activity,[it.id]:{...activity[it.id],endTime:e.target.value}})}/><input className="text-input" type="number" min="0" step="0.01" placeholder="Estimated cost" value={activity[it.id]?.estimatedCost??""} onChange={e=>setActivity({...activity,[it.id]:{...activity[it.id],estimatedCost:e.target.value}})}/><button className="btn btn-primary">Save activity</button></form></details>
 </div>)}</div>}</>}
 </div>;
}
