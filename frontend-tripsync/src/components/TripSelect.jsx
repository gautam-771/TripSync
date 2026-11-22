import {useEffect,useState} from "react";
import {getMyTrips} from "../api/tripApi";
import {getErrorMessage} from "../utils/errors";
export default function TripSelect({value,onChange,trips:externalTrips}){
 const [trips,setTrips]=useState(externalTrips||[]),[error,setError]=useState("");
 useEffect(()=>{if(!externalTrips){getMyTrips().then(setTrips).catch(e=>setError(getErrorMessage(e)));}},[externalTrips]);
 return <div className="trip-select-wrap"><select className="text-input" value={value} onChange={e=>onChange(e.target.value)}><option value="">Select a trip</option>{trips.map(t=><option key={t.id} value={t.id}>{t.title} — {t.destination}</option>)}</select>{error&&<small className="inline-error">{error}</small>}</div>;
}
