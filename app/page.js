"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{minHeight:"100vh", background:"#0a1628", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"sans-serif", padding:24}}>
      <h1 style={{color:"#fff", fontSize:28, marginBottom:8}}>Environmental Compliance Tools</h1>
      <p style={{color:"#8abadd", marginBottom:40, fontSize:14}}>Free tools for air quality and environmental permitting professionals</p>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, maxWidth:600, width:"100%"}}>
        <Link href="/air-permit" style={{background:"#1a2a3a", border:"1px solid #2a4a6a", borderRadius:12, padding:24, textDecoration:"none"}}>
          <div style={{fontSize:28, marginBottom:8}}>🏭</div>
          <div style={{color:"#fff", fontWeight:700, marginBottom:4}}>Air Permit Roadmap</div>
          <div style={{color:"#8abadd", fontSize:12}}>WA · MT · NV · ID permit pathway tool</div>
        </Link>
        <div style={{background:"#111e2e", border:"1px dashed #2a4a6a", borderRadius:12, padding:24, opacity:0.6}}>
          <div style={{fontSize:28, marginBottom:8}}>⚗️</div>
          <div style={{color:"#fff", fontWeight:700, marginBottom:4}}>TAP Screener</div>
          <div style={{color:"#8abadd", fontSize:12}}>Coming soon</div>
        </div>
        <div style={{background:"#111e2e", border:"1px dashed #2a4a6a", borderRadius:12, padding:24, opacity:0.6}}>
          <div style={{fontSize:28, marginBottom:8}}>📊</div>
          <div style={{color:"#fff", fontWeight:700, marginBottom:4}}>GHG Calculator</div>
          <div style={{color:"#8abadd", fontSize:12}}>Coming soon</div>
        </div>
        <div style={{background:"#111e2e", border:"1px dashed #2a4a6a", borderRadius:12, padding:24, opacity:0.6}}>
          <div style={{fontSize:28, marginBottom:8}}>📋</div>
          <div style={{color:"#fff", fontWeight:700, marginBottom:4}}>BACT Finder</div>
          <div style={{color:"#8abadd", fontSize:12}}>Coming soon</div>
        </div>
      </div>
    </div>
  );
}