import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {MapPin,CalendarDays,Users,Plus,ArrowRight,Plane,Wallet,Scale} from "lucide-react";
import {getMyTrips} from "../api/tripApi";
import {getErrorMessage} from "../utils/errors";
const fallbackPhotos=["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=85"];
function tripPhoto(t,i){const d=(t.destination||"").toLowerCase();if(d.includes("goa")||d.includes("beach"))return fallbackPhotos[0];if(d.includes("manali")||d.includes("mountain")||d.includes("himachal"))return fallbackPhotos[1];if(d.includes("paris")||d.includes("france"))return fallbackPhotos[2];return fallbackPhotos[i%3];}
function status(t){const today=new Date().toISOString().slice(0,10);if(t.endDate&&t.endDate<today)return "Completed";if(t.startDate&&t.startDate<=today)return "Ongoing";return "Upcoming";}
function dateRange(t){return `${t.startDate||"Date TBD"}${t.endDate?` – ${t.endDate}`:""}`;}
export default function Dashboard(){
 const [trips,setTrips]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState("");
 const user=JSON.parse(sessionStorage.getItem("tripsync_user")||"null");
 const firstName=user?.fullName?.split(" ")[0]||(user?.email?user.email.split("@")[0]:"traveller");
 useEffect(()=>{getMyTrips().then(setTrips).catch(e=>setError(getErrorMessage(e,"Could not load trips."))).finally(()=>setLoading(false));},[]);
 const upcoming=trips.slice(0,3);
 const upcomingCount=trips.filter(t=>status(t)==="Upcoming").length;
 const completedCount=trips.filter(t=>status(t)==="Completed").length;
 const destinationCount=new Set(trips.map(t=>(t.destination||"").toLowerCase()).filter(Boolean)).size;
 return <div className="page-stack dashboard-page">
  <section className="dashboard-banner"><div className="dashboard-banner-copy"><span className="eyebrow">YOUR TRAVEL SPACE</span><h1>Welcome back, {firstName}! <span>👋</span></h1><p>Plan. Travel. Sync.</p><Link to="/trips/new" className="btn btn-primary"><Plus size={16}/> Create New Trip <ArrowRight size={15}/></Link></div></section>
  <div className="dashboard-stats"><Stat icon={<MapPin/>} tone="blue" label="My Trips" value={loading?"—":trips.length}/><Stat icon={<CalendarDays/>} tone="green" label="Upcoming Trips" value={loading?"—":upcomingCount}/><Stat icon={<Plane/>} tone="orange" label="Completed Trips" value={loading?"—":completedCount}/><Stat icon={<MapPin/>} tone="purple" label="Destinations" value={loading?"—":destinationCount}/></div>
  <div className="section-heading dashboard-section-heading"><div><h2>Recent Trips</h2><p className="muted">Your latest travel plans</p></div><Link to="/trips" className="text-link">View All <ArrowRight size={15}/></Link></div>
  {error&&<div className="alert error-alert">{error}</div>}
  {loading?<div className="empty-card">Loading your trips...</div>:upcoming.length===0?<div className="empty-card"><div className="empty-icon"><Plane size={25}/></div><h3>Your travel story starts here</h3><p>Create your first trip and invite your friends to plan together.</p><Link to="/trips/new" className="btn btn-primary"><Plus size={16}/> Create your first trip</Link></div>:<div className="trip-grid dashboard-trip-grid">{upcoming.map((trip,i)=><TripCard key={trip.id} trip={trip} index={i}/>)}</div>}
 </div>;
}
function Stat({icon,tone,label,value}){return <div className="stat-card dashboard-stat"><div className={`stat-icon ${tone}`} >{icon}</div><div><span>{label}</span><strong>{value}</strong></div></div>}
function TripCard({trip,index}){const state=status(trip);return <Link to={`/trips/${trip.id}`} className="trip-card reference-trip-card"><div className="trip-image-wrap"><img src={tripPhoto(trip,index)} alt={`${trip.destination} travel destination`} loading="lazy"/><span className={`trip-status status-${state.toLowerCase()}`}>{state}</span></div><div className="trip-card-body"><h3>{trip.title}</h3><p className="trip-card-line"><CalendarDays size={14}/>{dateRange(trip)}</p><div className="trip-card-bottom"><span><Users size={14}/> Members</span><b>View Details <ArrowRight size={14}/></b></div></div></Link>}
