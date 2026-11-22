import {useEffect,useState} from "react";
import {Link,useSearchParams} from "react-router-dom";
import {Plus,CalendarDays,Users,Search,BriefcaseBusiness,ArrowRight,MoreVertical} from "lucide-react";
import {getMyTrips} from "../api/tripApi";
import {getErrorMessage} from "../utils/errors";
const images=["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=85"];
function photo(t,i){const d=(t.destination||"").toLowerCase();if(d.includes("goa")||d.includes("beach"))return images[0];if(d.includes("manali")||d.includes("mountain")||d.includes("himachal"))return images[1];if(d.includes("paris")||d.includes("france"))return images[2];return images[i%3];}
function state(t){const today=new Date().toISOString().slice(0,10);return t.endDate&&t.endDate<today?"Completed":t.startDate&&t.startDate<=today?"Ongoing":"Upcoming";}
export default function Trips(){
 const [trips,setTrips]=useState([]),[search,setSearch]=useState(""),[loading,setLoading]=useState(true),[error,setError]=useState("");const [params]=useSearchParams();
 useEffect(()=>{if(params.get("search"))setSearch(params.get("search"));},[params]);
 useEffect(()=>{getMyTrips().then(setTrips).catch(e=>setError(getErrorMessage(e))).finally(()=>setLoading(false));},[]);
 const filtered=trips.filter(t=>`${t.title} ${t.destination}`.toLowerCase().includes(search.toLowerCase()));
 return <div className="page-stack trips-page"><div className="trips-title-row"><div className="trips-heading-icon"><BriefcaseBusiness size={26}/></div><div><h1>My Trips</h1><p>Manage all your trips in one place</p></div><Link to="/trips/new" className="btn btn-primary create-trip-top"><Plus size={16}/> Create Trip</Link></div>
 <div className="search-box trips-search"><Search size={17}/><input placeholder="Search trips..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
 {error&&<div className="alert error-alert">{error}</div>}{loading?<div className="empty-card">Loading trips...</div>:filtered.length===0?<div className="empty-card"><div className="empty-icon"><BriefcaseBusiness size={24}/></div><h3>{search?"No matching trips":"No trips yet"}</h3><p>{search?"Try another destination or trip name.":"Create your first trip and start planning."}</p>{!search&&<Link to="/trips/new" className="btn btn-primary"><Plus size={16}/> Create Trip</Link>}</div>:<div className="trip-grid reference-trips-grid">{filtered.map((trip,i)=>{const s=state(trip);return <Link key={trip.id} to={`/trips/${trip.id}`} className="trip-card reference-trip-card"><div className="trip-image-wrap"><img src={photo(trip,i)} alt={`${trip.destination} destination`} loading="lazy"/><span className={`trip-status status-${s.toLowerCase()}`}>{s}</span></div><div className="trip-card-body"><div className="trip-title-line"><h3>{trip.title}</h3><MoreVertical size={17}/></div><p className="trip-card-line"><CalendarDays size={14}/>{trip.startDate||"Date TBD"}{trip.endDate?` – ${trip.endDate}`:""}</p><p className="trip-card-line"><Users size={14}/> Members</p><div className="trip-card-bottom"><span></span><b>View Details <ArrowRight size={14}/></b></div></div></Link>})}</div>}</div>;
}
