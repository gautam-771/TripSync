import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Map, Bell, LogOut, Plane, Menu, X, ShieldCheck, Wallet, UserRound, Search, Sun, Moon, CalendarDays, Files, Scale, ArrowLeftRight } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  {to:"/dashboard",label:"Dashboard",icon:LayoutDashboard},
  {to:"/trips",label:"My Trips",icon:Map},
  {to:"/notifications",label:"Invitations",icon:Bell},
  {to:"/expenses",label:"Expenses",icon:Wallet},
  {to:"/itineraries",label:"Itinerary",icon:CalendarDays},
  {to:"/documents",label:"Documents",icon:Files},
  {to:"/expenses#balances",label:"Balances",icon:Scale},
  {to:"/expenses#settlements",label:"Settlements",icon:ArrowLeftRight},
  {to:"/settings",label:"Profile",icon:UserRound}
];
export default function AppLayout() {
  const [open,setOpen]=useState(false); const navigate=useNavigate(); const location=useLocation();
  const [theme,setTheme]=useState(()=>localStorage.getItem("tripsync_theme")||"light");
  useEffect(()=>{document.documentElement.setAttribute("data-theme",theme);localStorage.setItem("tripsync_theme",theme);},[theme]);
  function toggleTheme(){setTheme(current=>current==="light"?"dark":"light");}
  const user=JSON.parse(sessionStorage.getItem("tripsync_user")||"null");
  function logout(){sessionStorage.removeItem("tripsync_token");sessionStorage.removeItem("tripsync_user");navigate("/login");}
  return <div className="app-shell">
    <aside className={`sidebar ${open?"sidebar-open":""}`}>
      <div className="brand"><span className="brand-mark"><Plane size={21}/></span><span>Trip<span className="brand-blue">Sync</span></span><button className="mobile-close" onClick={()=>setOpen(false)} aria-label="Close menu"><X size={19}/></button></div>
      <nav className="side-nav">{links.map(({to,label,icon:Icon})=><NavLink key={to} to={to} onClick={()=>setOpen(false)} className={({isActive})=>`nav-link ${(label==="Balances"?location.pathname==="/expenses"&&location.hash==="#balances":label==="Settlements"?location.pathname==="/expenses"&&location.hash==="#settlements":isActive)?"active":""}`}><Icon size={17}/><span>{label}</span>{label==="Invitations"&&<b className="nav-count">2</b>}</NavLink>)}</nav>
      {user?.role==="ADMIN"&&<NavLink to="/admin/users" onClick={()=>setOpen(false)} className={({isActive})=>`nav-link ${isActive?"active":""}`}><ShieldCheck size={17}/><span>Admin</span></NavLink>}
      <div className="sidebar-bottom"><button className="nav-link logout-link" onClick={logout}><LogOut size={17}/><span>Logout</span></button></div>
    </aside>
    {open&&<button className="sidebar-backdrop" onClick={()=>setOpen(false)} aria-label="Close navigation"/>}
    <main className="main-area">
      <header className="topbar"><button className="mobile-menu" onClick={()=>setOpen(true)} aria-label="Open menu"><Menu size={21}/></button><div className="global-search"><Search size={16}/><input placeholder="Search trips, users..." aria-label="Search trips and users" onKeyDown={e=>{if(e.key==="Enter")navigate(`/trips?search=${encodeURIComponent(e.currentTarget.value)}`)}}/></div><div className="topbar-right"><button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme==="light"?"dark":"light"} theme`} title={`Switch to ${theme==="light"?"dark":"light"} theme`}>{theme==="light"?<Moon size={17}/>:<Sun size={17}/>}<span>{theme==="light"?"Dark mode":"Light mode"}</span></button><button className="top-icon" onClick={()=>navigate('/notifications')} aria-label="Notifications"><Bell size={18}/></button><button className="avatar avatar-button" onClick={()=>navigate('/settings')}>{(user?.fullName||user?.email||"G")[0].toUpperCase()}</button><span className="top-caret">⌄</span></div></header>
      <section className="page-content" key={location.pathname}><Outlet/></section>
    </main>
  </div>;
}
