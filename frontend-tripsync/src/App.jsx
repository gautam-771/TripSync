import {Routes,Route,Navigate} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import CreateTrip from "./pages/CreateTrip";
import TripDetails from "./pages/TripDetails";
import Itineraries from "./pages/Itineraries";
import Expenses from "./pages/Expenses";
import Documents from "./pages/Documents";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import AdminUsers from "./pages/AdminUsers";

export default function App(){
 return <Routes>
  <Route path="/" element={<Navigate to={sessionStorage.getItem("tripsync_token")?"/dashboard":"/login"} replace/>}/>
  <Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
  <Route element={<ProtectedRoute/>}><Route element={<AppLayout/>}>
   <Route path="/dashboard" element={<Dashboard/>}/>
   <Route path="/trips" element={<Trips/>}/><Route path="/trips/new" element={<CreateTrip/>}/><Route path="/trips/:tripId" element={<TripDetails/>}/>
   <Route path="/itineraries" element={<Itineraries/>}/><Route path="/trips/:tripId/itineraries" element={<Itineraries/>}/><Route path="/expenses" element={<Expenses/>}/>
   <Route path="/documents" element={<Documents/>}/><Route path="/trips/:tripId/documents" element={<Documents/>}/><Route path="/notifications" element={<Notifications/>}/>
   <Route path="/settings" element={<Settings/>}/><Route path="/admin/users" element={<AdminUsers/>}/>
  </Route></Route>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes>;
}
