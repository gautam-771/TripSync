import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import {Files,Upload,Download,Trash2,FileText} from "lucide-react";
import TripSelect from "../components/TripSelect";
import {getDocuments,uploadDocument,downloadDocument,deleteDocument} from "../api/featureApi";
import {getErrorMessage} from "../utils/errors";
function formatBytes(bytes){if(!bytes)return "—";return bytes<1024?`${bytes} B`:bytes<1048576?`${(bytes/1024).toFixed(1)} KB`:`${(bytes/1048576).toFixed(1)} MB`;}
export default function Documents(){
 const {tripId: routeTripId}=useParams();
 const [tripId,setTripId]=useState(routeTripId||""),[docs,setDocs]=useState([]),[file,setFile]=useState(null),[error,setError]=useState(""),[notice,setNotice]=useState(""),[busy,setBusy]=useState(false);
 async function load(){if(!tripId)return;try{setDocs(await getDocuments(tripId));}catch(e){setError(getErrorMessage(e));}}
 useEffect(()=>{if(routeTripId){setTripId(routeTripId);}},[routeTripId]);
 useEffect(()=>{load();},[tripId]);
 async function upload(e){e.preventDefault();if(!file)return;setBusy(true);setError("");try{await uploadDocument(tripId,file);setFile(null);e.target.reset();setNotice("Document uploaded.");load();}catch(e){setError(getErrorMessage(e));}finally{setBusy(false);}}
 async function download(doc){try{const response=await downloadDocument(tripId,doc.id);const url=URL.createObjectURL(new Blob([response.data],{type:doc.contentType||"application/octet-stream"}));const a=document.createElement("a");a.href=url;a.download=doc.originalFileName||"download";a.click();URL.revokeObjectURL(url);}catch(e){setError(getErrorMessage(e));}}
 async function remove(id){if(!confirm("Delete this document?"))return;try{await deleteDocument(tripId,id);load();}catch(e){setError(getErrorMessage(e));}}
 return <div className="page-stack"><div><span className="eyebrow blue-eyebrow">TRIP FILES</span><h1>Documents</h1><p className="muted">Keep tickets, bookings and important files together.</p></div><div className="panel"><label className="standalone-label">Choose trip</label><TripSelect value={tripId} onChange={setTripId}/></div>{error&&<div className="alert error-alert">{error}</div>}{notice&&<div className="alert success-alert">{notice}</div>}
 {!tripId?<div className="empty-card">Select a trip to manage its documents.</div>:<><div className="panel"><h2 className="panel-title">Upload a document</h2><form className="upload-row" onSubmit={upload}><input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} accept=".pdf,.jpg,.jpeg,.png,.webp,.txt,.doc,.docx" required/><button className="btn btn-primary" disabled={!file||busy}><Upload size={16}/>{busy?"Uploading...":"Upload file"}</button></form><small className="muted">Supported: PDF, JPG, PNG, WEBP, TXT, DOC, DOCX. Maximum 10 MB by default.</small></div>
 <div className="panel"><div className="section-heading"><div><h2>Trip documents</h2><p className="muted">{docs.length} file(s)</p></div><Files color="#3988ed"/></div>{docs.length===0?<div className="empty-inline">No documents uploaded yet.</div>:<div className="document-list">{docs.map(d=><div className="document-row" key={d.id}><div className="document-icon"><FileText size={19}/></div><div className="document-info"><strong>{d.originalFileName}</strong><span>{formatBytes(d.fileSize)} · {d.contentType||"File"}</span></div><button className="icon-button" title="Download" onClick={()=>download(d)}><Download size={17}/></button><button className="icon-button danger-icon" title="Delete" onClick={()=>remove(d.id)}><Trash2 size={17}/></button></div>)}</div>}</div></>}
 </div>;
}
