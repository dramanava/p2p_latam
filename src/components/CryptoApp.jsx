import { useState, useEffect, useRef } from "react";
import {
  ArrowDownLeft, ArrowUpRight, TrendingUp, Bell,
  Home, ArrowLeftRight, Clock, User,
  Shield, Zap, ChevronLeft, CheckCircle, Send, MoreHorizontal
} from "lucide-react";

const C = {
  bg:       "#0C0C10",
  surface:  "#131318",
  surface2: "#1A1A22",
  surface3: "#1F1F28",
  border:   "rgba(255,255,255,0.07)",
  border2:  "rgba(255,255,255,0.12)",
  dim:      "#ABABC4",
  muted:    "#888899",
  text:     "#F0F0F3",
  blue:     "#3B82F6",
  blueGlow: "rgba(59,130,246,0.20)",
  blueFaint:"rgba(59,130,246,0.10)",
  teal:     "#00C2A8",
  green:    "#4ADE80",
  red:      "#F87171",
  amber:    "#FBBF24",
};

/* ── Safe area top spacer ── */
const SB = () => <div style={{ height:"env(safe-area-inset-top, 8px)", flexShrink:0, minHeight:"8px" }}/>;

/* ── Home indicator ── */
const HomeIndicator = () => (
  <div style={{ flexShrink:0, display:"flex", justifyContent:"center", alignItems:"center", paddingTop:"8px", paddingBottom:"max(12px, env(safe-area-inset-bottom, 12px))", background:"transparent" }}>
    <div style={{ width:"134px", height:"5px", borderRadius:"100px", background:"rgba(255,255,255,0.18)" }}/>
  </div>
);

/* ── Shared bottom action bar — consistent across all screens ── */
const BottomAction = ({ children }) => (
  <div style={{ flexShrink:0, boxSizing:"border-box", width:"100%", background:`linear-gradient(to bottom, transparent 0%, ${C.bg} 40%)`, paddingTop:"28px" }}>
    <div style={{ padding:"0 20px 16px" }}>
      {children}
    </div>
    <HomeIndicator/>
  </div>
);
const SuccessIllustration = () => (
  <img src={`${import.meta.env.BASE_URL}assets/success.png`} style={{ width:"192px", height:"192px", objectFit:"contain", display:"block" }}/>
);

const NavIcons = {
  home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 0 1 1.414 0l8 8A1 1 0 0 1 20 11h-1v8a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4h-2v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8H4a1 1 0 0 1-.707-1.707l7-7z"/>
    </svg>
  ),
  p2p: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 3a1 1 0 0 0-1.707-.707l-4 4a1 1 0 0 0 0 1.414l4 4A1 1 0 0 0 8 11V9h3a1 1 0 0 0 0-2H8V3zM16 13v-2a1 1 0 0 0-1.707-.707l-4 4a1 1 0 0 0 0 1.414l4 4A1 1 0 0 0 16 19v-2h3a1 1 0 0 0 0-2h-3z"/>
    </svg>
  ),
  hist: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 5a1 1 0 1 0-2 0v5a1 1 0 0 0 .447.832l3.5 2.333a1 1 0 0 0 1.106-1.664L13 11.535V7z"/>
    </svg>
  ),
  prof: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm-7 17a7 7 0 0 1 14 0 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"/>
    </svg>
  ),
};

/* warning illustration for discard sheets */
const WarningIcon = () => (
  <img src={`${import.meta.env.BASE_URL}assets/warning.png`} style={{ width:"192px", height:"192px", objectFit:"contain", display:"block" }}/>
);


/* ═══════════════ DASHBOARD ═══════════════ */
function Dashboard({ onTrade, onWithdraw, onReceive, onNav }) {
  const [cur,setCur]=useState("USDT");
  const [rate,setRate]=useState(1352);
  const [pulsed,setPulsed]=useState(false);
  const [transferSheet,setTransferSheet]=useState(false);
  const BALS={ USDT:{display:"1,250.00",sym:"$",change:"+2.3%"}, ARS:{display:"1,687,500",sym:"$",change:"+0.8%"} };
  const bal=BALS[cur];
  const TXS=[
    {id:1,type:"buy",     avatar:"CM",name:"Carlos M.", detail:"Bought USDT",  amt:"+250.00 USDT",time:"2m ago", color:C.teal},
    {id:2,type:"sell",    avatar:"MV",name:"María V.",  detail:"Sold USDT",     amt:"−200.00 USDT", time:"15m ago",color:"#818CF8"},
    {id:3,type:"withdraw",avatar:"LP",name:"Ledger Pro",detail:"USDT Withdraw", amt:"−500.00 USDT",time:"1h ago", color:C.amber},
    {id:4,type:"sell",    avatar:"LS",name:"Laura S.",  detail:"Sold USDT",     amt:"−150.00 USDT",time:"2h ago", color:C.red},
  ];
  useEffect(()=>{
    const id=setInterval(()=>{ setRate(r=>r+Math.floor(Math.random()*5)-2); setPulsed(true); setTimeout(()=>setPulsed(false),600); },3500);
    return ()=>clearInterval(id);
  },[]);
  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden" }}>
      {/* fixed header */}
      <div style={{ flexShrink:0, background:C.bg }}>
        <SB/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 20px 0" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:"linear-gradient(135deg,#3B82F6,#06B6D4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontWeight:800, color:"#fff" }}>J</div>
            <div>
              <div style={{ fontSize:"11px", color:C.dim, letterSpacing:"0.04em", textTransform:"uppercase" }}>Welcome back</div>
              <div style={{ fontSize:"15px", fontWeight:700, color:C.text }}>Juan Pérez</div>
            </div>
          </div>
        </div>
      </div>

      {/* scrollable body */}
      <div style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}>
        <div style={{ padding:"24px 20px 0", textAlign:"center" }}>
          <div style={{ fontSize:"11px", color:C.dim, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"8px" }}>Total Balance</div>
          <div style={{ fontSize:"44px", fontWeight:800, letterSpacing:"-0.04em", color:C.text, lineHeight:1, marginBottom:"6px" }}>
            {bal.sym}{bal.display} <span style={{ fontSize:"18px", color:C.dim, fontWeight:500 }}>{cur}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", marginBottom:"22px" }}>
            <div style={{ background:"rgba(74,222,128,0.1)", borderRadius:"6px", padding:"3px 8px", display:"flex", alignItems:"center", gap:"3px" }}>
              <TrendingUp size={11} color={C.green}/><span style={{ fontSize:"12px", color:C.green, fontWeight:700 }}>{bal.change}</span>
            </div>
            <span style={{ fontSize:"12px", color:C.dim }}>today</span>
          </div>
          <div style={{ display:"inline-flex", background:C.surface, borderRadius:"100px", padding:"3px", gap:"2px" }}>
            {["USDT","ARS"].map(c=>(
              <button key={c} onClick={()=>setCur(c)} style={{ padding:"6px 18px", borderRadius:"100px", background:cur===c?"#fff":"transparent", color:cur===c?"#0C0C10":C.dim, fontSize:"12px", fontWeight:cur===c?700:500, cursor:"pointer", transition:"all 0.18s" }}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ margin:"20px 20px 0", background:C.surface, borderRadius:"16px", padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:"11px", color:C.muted, letterSpacing:"0.05em", textTransform:"uppercase", marginBottom:"4px" }}>Blue Dollar · USDT/ARS</div>
            <div style={{ fontSize:"17px", fontWeight:700, color:pulsed?C.blue:C.text, transition:"color 0.4s" }}>1 USDT = {rate.toLocaleString("en-US")} ARS</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
            <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:C.green, opacity:pulsed?1:0.5, transition:"opacity 0.3s" }}/>
            <span style={{ fontSize:"11px", color:C.green, fontWeight:600 }}>Live</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:"8px", padding:"16px 20px 0" }}>
          <button onClick={()=>onTrade("buy")} style={{ flex:1, padding:"15px 0", borderRadius:"16px", background:"#fff", color:"#0C0C10", fontSize:"14px", fontWeight:700, cursor:"pointer", letterSpacing:"-0.01em", fontFamily:"inherit" }}>
            Buy
          </button>
          <button onClick={()=>onTrade("sell")} style={{ flex:1, padding:"15px 0", borderRadius:"16px", background:C.surface, color:C.text, fontSize:"14px", fontWeight:700, cursor:"pointer", letterSpacing:"-0.01em", fontFamily:"inherit" }}>
            Sell
          </button>
          <button onClick={()=>setTransferSheet(true)} style={{ flex:1, padding:"15px 0", borderRadius:"16px", background:C.surface, color:C.text, fontSize:"14px", fontWeight:700, cursor:"pointer", letterSpacing:"-0.01em", fontFamily:"inherit" }}>
            Transfer
          </button>
        </div>
        <div style={{ padding:"22px 20px 16px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
            <span style={{ fontSize:"13px", fontWeight:700, color:C.text }}>P2P Activity</span>
            <span style={{ fontSize:"12px", color:C.blue, cursor:"pointer", fontWeight:500 }}>See all</span>
          </div>
          {TXS.map(tx=>(
            <div key={tx.id} style={{ display:"flex", alignItems:"center", gap:"13px", padding:"11px 0" }}>
              <div style={{ width:"38px", height:"38px", borderRadius:"50%", background:`${tx.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:800, color:tx.color, flexShrink:0 }}>{tx.avatar}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:"13px", fontWeight:600, color:C.text, marginBottom:"1px", display:"flex", alignItems:"center", gap:"4px" }}>
                  {tx.name}
                  {tx.type==="buy"&&<Shield size={10} color={C.teal}/>}
                  {tx.type==="withdraw"&&<Send size={10} color={C.amber}/>}
                </div>
                <div style={{ fontSize:"11px", color:C.dim }}>{tx.detail} · {tx.time}</div>
              </div>
              <div style={{ fontSize:"13px", fontWeight:700, color:tx.type==="buy"?C.green:C.dim }}>{tx.amt}</div>
            </div>
          ))}
        </div>
      </div>

      <HomeIndicator/>

      {/* Transfer bottom sheet */}
      {transferSheet&&(
        <div onClick={()=>setTransferSheet(false)} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.6)", display:"flex", flexDirection:"column", justifyContent:"flex-end", zIndex:50 }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:C.surface, borderRadius:"24px 24px 0 0", padding:"16px 20px 28px" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"20px" }}>
              <div style={{ width:"36px", height:"4px", borderRadius:"3px", background:C.muted }}/>
            </div>
            <div style={{ fontSize:"17px", fontWeight:700, color:C.text, marginBottom:"6px", textAlign:"center" }}>Transfer</div>
            <div style={{ fontSize:"13px", color:C.dim, textAlign:"center", marginBottom:"24px" }}>Send or receive USDT</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              <button onClick={()=>{ setTransferSheet(false); onWithdraw(); }} style={{ width:"100%", padding:"16px", borderRadius:"14px", background:C.surface2, color:C.text, fontSize:"16px", fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"14px" }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"12px", background:"rgba(59,130,246,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                </div>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontSize:"15px", fontWeight:600, color:C.text }}>Withdraw</div>
                  <div style={{ fontSize:"12px", color:C.dim, marginTop:"1px" }}>Send USDT to external wallet</div>
                </div>
              </button>
              <button onClick={()=>{ setTransferSheet(false); onReceive(); }} style={{ width:"100%", padding:"16px", borderRadius:"14px", background:C.surface2, color:C.text, fontSize:"16px", fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"14px" }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"12px", background:"rgba(74,222,128,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                </div>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontSize:"15px", fontWeight:600, color:C.text }}>Receive</div>
                  <div style={{ fontSize:"12px", color:C.dim, marginTop:"1px" }}>Show QR to receive USDT</div>
                </div>
              </button>
              <button onClick={()=>setTransferSheet(false)} style={{ width:"100%", padding:"14px", borderRadius:"14px", background:"transparent", color:C.dim, fontSize:"15px", fontWeight:500, cursor:"pointer", fontFamily:"inherit", marginTop:"2px" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════ TRADE ═══════════════ */
function Trade({ initialSide, onBack, onNav }) {
  const [side,setSide]=useState(initialSide||"buy");
  const [asset,setAsset]=useState("USDT");
  const [amount,setAmount]=useState("");
  const [pay,setPay]=useState("bank");
  const [step,setStep]=useState(1);
  const [done,setDone]=useState(false);
  const [discard,setDiscard]=useState(false);
  const inputRef=useRef(null);

  const RATE=1352;
  const isBuy=side==="buy";
  const n=parseFloat(amount)||0;
  const arsEq=asset==="USDT"?n*RATE:n;
  const hasFee=pay==="mp"; const fee=hasFee?n*0.005:0; const total=isBuy?n+fee:n-fee;
  const PAYS=[{id:"bank",label:"Bank Transfer",sub:"via Alias / CBU",icon:"🏦"},{id:"mp",label:"Mercado Pago",sub:"Instant · 0.5% fee",icon:"💳"},{id:"cash",label:"Cash (ARS)",sub:"In-person handoff",icon:"💵"}];
  useEffect(()=>{ if(step===1&&!done) setTimeout(()=>inputRef.current?.focus(),120); },[step,done]);

  if(done) return (
    <div style={{ display:"flex", flexDirection:"column", flex:1 }}>
      <SB/>
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 32px", textAlign:"center" }}>
        <div style={{ marginBottom:"24px" }}>
          <SuccessIllustration/>
        </div>
        <div style={{ fontSize:"22px", fontWeight:800, color:C.text, marginBottom:"8px" }}>Order placed</div>
        <div style={{ fontSize:"14px", color:C.dim, lineHeight:1.6, marginBottom:"32px" }}>Your {isBuy?"buy":"sell"} order for <span style={{ color:C.blue, fontWeight:700 }}>{amount} {asset}</span> is live.</div>
      </div>
      <BottomAction>
        <button onClick={onBack} style={{ width:"100%", padding:"17px", borderRadius:"16px", background:"#fff", color:"#0C0C10", fontSize:"15px", fontWeight:700, cursor:"pointer" }}>Back to dashboard</button>
      </BottomAction>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", width:"100%", boxSizing:"border-box" }}>

      {/* ── fixed header ── */}
      <SB/>
      <div style={{ display:"flex", alignItems:"center", padding:"14px 20px 12px", flexShrink:0, background:C.bg, position:"relative" }}>
        <button onClick={step===2?()=>setStep(1):onBack} style={{ display:"flex", alignItems:"center", gap:"4px", background:"none", cursor:"pointer", color:C.blue, fontSize:"15px", fontWeight:500, padding:"6px 0", flexShrink:0, zIndex:1 }}>
          <ChevronLeft size={18} color={C.blue} strokeWidth={2.2}/>Back
        </button>
        <span style={{ position:"absolute", left:0, right:0, textAlign:"center", fontSize:"17px", fontWeight:700, color:C.text, pointerEvents:"none" }}>
          {step===1?(isBuy?"Buy crypto":"Sell crypto"):"Review order"}
        </span>
      </div>

      {/* ── scrollable body ── */}
      {step===1&&(
        <div style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}>
          <div style={{ margin:"0 20px 0", display:"flex", background:C.surface, borderRadius:"14px", padding:"3px" }}>
            {["buy","sell"].map(s=>(
              <button key={s} onClick={()=>setSide(s)} style={{ flex:1, padding:"10px 0", borderRadius:"11px", background:side===s?"#fff":"transparent", color:side===s?"#0C0C10":C.dim, fontSize:"14px", fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}>
                {s==="buy"?"Buy":"Sell"}
              </button>
            ))}
          </div>
          <div style={{ margin:"16px 20px 0", display:"flex", alignItems:"center", gap:"8px" }}>
            <span style={{ fontSize:"12px", color:C.dim }}>Asset</span>
            {["USDT","ARS"].map(a=>(
              <button key={a} onClick={()=>setAsset(a)} style={{ padding:"5px 14px", borderRadius:"100px", background:asset===a?"rgba(255,255,255,0.12)":"transparent", color:asset===a?"#fff":C.dim, fontSize:"12px", fontWeight:asset===a?700:500, cursor:"pointer" }}>{a}</button>
            ))}
          </div>
          <div style={{ margin:"18px 20px 0", background:C.surface, borderRadius:"20px", padding:"22px 22px 18px" }}>
            <div style={{ fontSize:"11px", color:C.dim, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"14px" }}>Amount</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:"8px" }}>
              <input ref={inputRef} type="number" placeholder="0" value={amount} onChange={e=>setAmount(e.target.value)} style={{ flex:1, background:"transparent", outline:"none", fontSize:"52px", fontWeight:800, color:C.text, letterSpacing:"-0.04em", lineHeight:1, fontFamily:"inherit", caretColor:C.blue, minWidth:0 }}/>
              <span style={{ fontSize:"18px", color:C.dim, fontWeight:600, paddingBottom:"8px" }}>{asset}</span>
            </div>
            {n>0&&<div style={{ marginTop:"12px", paddingTop:"12px", display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:"13px", color:C.dim }}>≈ {arsEq.toLocaleString("en-US",{maximumFractionDigits:0})} ARS</span>
              <span style={{ fontSize:"11px", color:C.green, fontWeight:600 }}>Best rate</span>
            </div>}
          </div>
          <div style={{ margin:"10px 20px 0", display:"flex", alignItems:"center", gap:"6px" }}>
            <Zap size={12} color={C.blue}/>
            <span style={{ fontSize:"12px", color:C.dim }}>1 USDT = 1,352 ARS</span>
          </div>
          <div style={{ margin:"20px 20px 80px" }}>
            <div style={{ fontSize:"11px", color:C.dim, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"10px" }}>Pay with</div>
            <div style={{ background:C.surface, borderRadius:"16px", overflow:"hidden" }}>
              {PAYS.map((p,i)=>(
                <button key={p.id} onClick={()=>setPay(p.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:"14px", padding:"14px 16px", background:pay===p.id?`${C.blue}0C`:"transparent", borderBottom:i<PAYS.length-1?"1px solid rgba(255,255,255,0.04)":"none", cursor:"pointer", textAlign:"left" }}>
                  <span style={{ fontSize:"18px" }}>{p.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:"13px", fontWeight:600, color:C.text }}>{p.label}</div>
                    <div style={{ fontSize:"11px", color:C.dim }}>{p.sub}</div>
                  </div>
                  {pay===p.id
                    ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill={C.blue}/><path d="M6 11.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <div style={{ width:"22px", height:"22px", borderRadius:"50%", border:`1.5px solid ${C.muted}` }}/>
                  }
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step===2&&(
        <div style={{ flex:1, overflowY:"auto", overflowX:"hidden" }}>
          <div style={{ margin:"20px 20px 0", textAlign:"center" }}>
            <div style={{ fontSize:"11px", color:C.dim, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"10px" }}>{isBuy?"You're buying":"You're selling"}</div>
            <div style={{ fontSize:"52px", fontWeight:800, letterSpacing:"-0.04em", color:isBuy?C.blue:C.text, lineHeight:1 }}>{amount}</div>
            <div style={{ fontSize:"18px", color:C.dim, fontWeight:600, marginTop:"4px" }}>{asset}</div>
          </div>
          <div style={{ margin:"22px 20px 0", background:C.surface, borderRadius:"18px", overflow:"hidden" }}>
            {[
              ["Direction", isBuy?"Buy":"Sell", null],
              ["Asset", asset, null],
              ["Rate", "1 USDT = 1,352 ARS", null],
              ["Pay with", PAYS.find(p=>p.id===pay)?.label||"", null],
              ["Service fee", hasFee?`${fee.toFixed(2)} ${asset}`:"Free", hasFee?C.amber:C.green],
              ["You "+(isBuy?"pay":"receive"), `${total.toFixed(2)} ${asset}`, C.blue],
            ].map(([k,v,cl],i,a)=>(
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"13px 18px", borderBottom:i<a.length-1?"1px solid rgba(255,255,255,0.04)":"none" }}>
                <span style={{ fontSize:"13px", color:C.dim }}>{k}</span>
                <span style={{ fontSize:"13px", fontWeight:600, color:cl||C.text }}>{v}</span>
              </div>
            ))}
          </div>
          {/* spacer so content clears sticky buttons */}
          <div style={{ height:"100px" }}/>
        </div>
      )}

      {/* ── sticky CTA ── */}
      <BottomAction>
        {step===1&&(
          <button
            onClick={()=>n>0&&setStep(2)}
            style={{ width:"100%", padding:"17px", borderRadius:"16px", background:n>0?"#fff":C.surface, color:n>0?"#0C0C10":C.muted, fontSize:"15px", fontWeight:700, cursor:n>0?"pointer":"default", boxShadow:n>0?`0 6px 24px ${C.blueGlow}`:"none", transition:"all 0.2s", fontFamily:"inherit" }}
          >
            Proceed
          </button>
        )}
        {step===2&&(
          <button onClick={()=>setDone(true)} style={{ width:"100%", padding:"17px", borderRadius:"16px", background:"#fff", color:"#0C0C10", fontSize:"15px", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Confirm</button>
        )}
      </BottomAction>
      {/* ── Discard order sheet ── */}
      {discard&&(
        <div onClick={()=>setDiscard(false)} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.6)", display:"flex", flexDirection:"column", justifyContent:"flex-end", zIndex:60 }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:C.surface, borderRadius:"24px 24px 0 0", padding:"24px 20px 32px", borderBottom:"none" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"20px" }}>
              <div style={{ width:"36px", height:"4px", borderRadius:"3px", background:C.muted }}/>
            </div>
            {/* warning icon */}
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"20px" }}>
              <WarningIcon/>
            </div>
            <div style={{ textAlign:"center", marginBottom:"24px" }}>
              <div style={{ fontSize:"17px", fontWeight:700, color:C.text, marginBottom:"6px" }}>Discard order?</div>
              <div style={{ fontSize:"14px", color:C.dim, lineHeight:1.5 }}>Your progress will be lost.</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              <button onClick={()=>{ setDiscard(false); onBack(); }} style={{ width:"100%", padding:"16px", borderRadius:"14px", background:C.red+"22", color:C.red, fontSize:"16px", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Discard</button>
              <button onClick={()=>setDiscard(false)} style={{ width:"100%", padding:"16px", borderRadius:"14px", background:C.surface2, color:C.dim, fontSize:"15px", fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Keep editing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   WITHDRAW  —  dark theme, iOS structure
═══════════════════════════════════════ */
const RECENTS=[
  {initials:"B", bg:"#F0B90B", fg:"#000", label:"Binance Acc",  meta:"TR7NHq...Yt3U",       net:"TRC-20", addr:"TR7NHqjeKQxGTCi8q8ZY4pL45zLrvnYt3U"},
  {initials:"J", bg:"#7C4DCC", fg:"#fff", label:"Jane",         meta:"TLa2f6...YjU7"       , net:"TRC-20", addr:"TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7"},
  {initials:"LC",bg:"#1D9BF0", fg:"#fff", label:"Lemon Cash",   meta:"TLa2f6...8888",        net:"TRC-20", addr:"TLa2f6VPqDgRE67v1736s7bJ8Ray5w888888"},
  {initials:"K", bg:"#E94A40", fg:"#fff", label:"Kraken",       meta:"0xBb12...eEfF",          net:"ERC-20", addr:"0xBb1234aaCc5566dDeE7788fF9900aAbBcCdDeEfF"},
];
const NETV={"TRC-20":{prefix:"T",len:30},"ERC-20":{prefix:"0x",len:40},"BEP-20":{prefix:"0x",len:40}};
const WBAL=1250,WFEE=1,WARS=1352;


/* ═══════════════ RECEIVE ═══════════════ */
const RECEIVE_ADDRS = {
  "TRC-20": "TR7NHqjeKQxGTCi8q8ZY4pL45zLrvnYt3U",
  "ERC-20": "0xA1b2C3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0",
  "BEP-20": "0xBb1234aaCc5566dDeE7788fF9900aAbBcCdDeEfF",
};

function Withdraw({ onBack, onNav }) {
  const [net,setNet]=useState("TRC-20");
  const [addr,setAddr]=useState("");
  const [amount,setAmount]=useState("");
  const [sel,setSel]=useState(-1);
  const [review,setReview]=useState(false);
  const [done,setDone]=useState(false);
  const [withdrawDiscard,setWithdrawDiscard]=useState(false);

  const num=parseFloat(amount)||0;
  const addrOk=addr.startsWith(NETV[net].prefix)&&addr.length>=NETV[net].len;
  const canGo=addrOk&&num>WFEE&&num<=WBAL;
  const arsEq=(num*WARS).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
  const receive=Math.max(0,num-WFEE).toFixed(2);
  const mask=a=>a.length<=12?a:a.slice(0,10)+"..."+a.slice(-4);
  function pick(i){ const r=RECENTS[i]; setSel(i); setAddr(r.addr); setNet(r.net); }
  const SL=({children})=>(<div style={{ fontSize:"11px", fontWeight:600, color:C.dim, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:"8px", paddingLeft:"4px" }}>{children}</div>);

  if(done) return (
    <div style={{ display:"flex", flexDirection:"column", flex:1 }}>
      <SB/>
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 32px", textAlign:"center" }}>
        <div style={{ marginBottom:"24px" }}><SuccessIllustration/></div>
        <div style={{ fontSize:"22px", fontWeight:800, color:C.text, marginBottom:"8px" }}>Withdrawal sent</div>
        <div style={{ fontSize:"14px", color:C.dim, lineHeight:1.6, marginBottom:"32px" }}>
          Your withdrawal of <span style={{ color:C.blue, fontWeight:700 }}>{amount} USDT</span> is being processed.<br/>Funds arrive in 1–3 minutes.
        </div>
        <div style={{ width:"100%", background:C.surface, borderRadius:"16px", overflow:"hidden", marginBottom:"24px" }}>
          {[["TX ID","#WD-29384"],["Status","Broadcasting"],["Est. arrival","1–3 min"]].map(([k,v],i,a)=>(
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"14px 18px", borderBottom:i<a.length-1?"1px solid rgba(255,255,255,0.04)":"none" }}>
              <span style={{ fontSize:"13px", color:C.dim }}>{k}</span>
              <span style={{ fontSize:"13px", fontWeight:600, color:C.text }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomAction>
        <button onClick={onBack} style={{ width:"100%", padding:"17px", borderRadius:"16px", background:"#fff", color:"#0C0C10", fontSize:"15px", fontWeight:700, cursor:"pointer" }}>Back to dashboard</button>
      </BottomAction>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden" }}>
      {/* header */}
      <div style={{ flexShrink:0, background:C.bg }}>
        <SB/>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px 10px" }}>
          <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:"4px", background:"none", cursor:"pointer", color:C.blue, fontSize:"15px", fontWeight:500, padding:"6px 0" }}>
            <ChevronLeft size={18} color={C.blue} strokeWidth={2.2}/>Back
          </button>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"17px", fontWeight:700, color:C.text, letterSpacing:"-0.02em" }}>Withdraw USDT</div>
            <div style={{ fontSize:"12px", color:C.dim, marginTop:"2px" }}>Available: <span style={{ color:C.text, fontWeight:600 }}>1,250.00 USDT</span></div>
          </div>
          <button style={{ background:"none", cursor:"pointer", padding:"6px 0", color:C.blue, width:"52px", display:"flex", justifyContent:"flex-end" }}>
            <MoreHorizontal size={20} color={C.muted}/>
          </button>
        </div>
      </div>

      {/* scrollable body */}
      <div style={{ flex:1, overflowY:"auto", overflowX:"hidden", padding:"16px 16px 0" }}>
        {/* Network */}
        <div style={{ marginBottom:"20px" }}>
          <SL>Network</SL>
          <div style={{ background:C.surface, borderRadius:"16px", padding:"4px", display:"flex", gap:"3px" }}>
            {["TRC-20","ERC-20","BEP-20"].map(n=>(
              <button key={n} onClick={()=>{ setNet(n); setSel(-1); }} style={{ flex:1, padding:"9px 0", borderRadius:"12px", fontSize:"13px", fontWeight:net===n?700:500, cursor:"pointer", letterSpacing:"0.01em", transition:"all 0.18s", background:net===n?"#fff":"transparent", color:net===n?"#0C0C10":C.text }}>{n}</button>
            ))}
          </div>
        </div>
        {/* Address */}
        <div style={{ marginBottom:"20px" }}>
          <SL>Recipient address</SL>
          <div style={{ background:C.surface, borderRadius:"16px", overflow:"hidden", transition:"border-color 0.2s" }}>
            <div style={{ display:"flex", alignItems:"center", padding:"0 14px" }}>
              <input type="text" placeholder={`${NETV[net].prefix}… address`} value={addr} onChange={e=>{ setAddr(e.target.value); setSel(-1); }}
                style={{ flex:1, background:"transparent", outline:"none", fontSize:"14px", color:C.text, padding:"14px 0", fontFamily:"'SF Mono',ui-monospace,monospace", caretColor:C.blue }}/>
              <button onClick={async()=>{ try{ const t=await navigator.clipboard.readText(); setAddr(t.trim()); }catch{} }}
                style={{ background:C.blueFaint, borderRadius:"8px", padding:"5px 12px", fontSize:"13px", fontWeight:600, color:C.blue, cursor:"pointer", marginLeft:"8px", whiteSpace:"nowrap" }}>Paste</button>
            </div>
            {addr&&!addrOk&&(
              <div style={{ padding:"0 14px 10px", fontSize:"12px", color:C.red }}>{net} address must start with "{NETV[net].prefix}"</div>
            )}
          </div>
        </div>
        {/* Amount */}
        <div style={{ marginBottom:"20px" }}>
          <SL>Amount</SL>
          <div style={{ background:C.surface, borderRadius:"16px", overflow:"hidden", transition:"border-color 0.2s" }}>
            <div style={{ display:"flex", alignItems:"center", padding:"4px 16px 2px" }}>
              <input type="number" placeholder="0.00" value={amount} onChange={e=>setAmount(e.target.value)}
                style={{ flex:1, background:"transparent", outline:"none", fontSize:"40px", fontWeight:700, color:num>WBAL?C.red:C.text, padding:"12px 0", fontFamily:"inherit", caretColor:C.blue, letterSpacing:"-0.03em" }}/>
              <span style={{ fontSize:"16px", color:C.dim, fontWeight:500, marginRight:"12px" }}>USDT</span>
              <button onClick={()=>setAmount(String(WBAL))} style={{ background:C.blueFaint, borderRadius:"8px", padding:"6px 14px", fontSize:"13px", fontWeight:600, color:C.blue, cursor:"pointer" }}>Max</button>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 16px" }}>
              <span style={{ fontSize:"13px", color:C.dim }}>≈ ARS {arsEq}</span>
              <span style={{ fontSize:"12px", color:C.dim }}>Rate: $1,352 / USDT</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 16px" }}>
              <span style={{ fontSize:"13px", color:C.dim }}>Network fee</span>
              <span style={{ fontSize:"13px", color:C.amber, fontWeight:500 }}>1.00 USDT</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 16px" }}>
              <span style={{ fontSize:"13px", color:C.dim }}>You will receive</span>
              <span style={{ fontSize:"13px", fontWeight:700, color:num>WFEE?C.green:C.dim }}>{receive} USDT</span>
            </div>
          </div>
          {num>WBAL&&<div style={{ fontSize:"12px", color:C.red, marginTop:"6px", paddingLeft:"4px" }}>Insufficient balance</div>}
        </div>
        {/* Recent Addresses */}
        <div style={{ marginBottom:"16px" }}>
          <div style={{ fontSize:"15px", fontWeight:700, color:C.text, letterSpacing:"-0.01em", marginBottom:"12px" }}>Recent Addresses</div>
          <div style={{ background:C.surface, borderRadius:"16px", overflow:"hidden" }}>
            {RECENTS.map((r,i)=>(
              <button key={i} onClick={()=>pick(i)} style={{ width:"100%", display:"flex", alignItems:"center", gap:"13px", padding:"13px 16px", background:sel===i?C.blueFaint:"transparent", borderBottom:i<RECENTS.length-1?"1px solid rgba(255,255,255,0.04)":"none", cursor:"pointer", textAlign:"left", transition:"background 0.15s" }}>
                <div style={{ width:"42px", height:"42px", borderRadius:"50%", background:r.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontWeight:800, color:r.fg, flexShrink:0 }}>{r.initials}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:"14px", fontWeight:600, color:C.text, marginBottom:"2px" }}>{r.label}</div>
                  <div style={{ fontSize:"11px", color:C.dim, fontFamily:"'SF Mono',ui-monospace,monospace" }}>{r.meta}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <div style={{ fontSize:"11px", fontWeight:600, color:C.dim, background:C.surface2, borderRadius:"6px", padding:"3px 9px" }}>{r.net}</div>
                  {sel===i&&<CheckCircle size={14} color={C.blue}/>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* sticky CTA */}
      <BottomAction>
        <button onClick={()=>canGo&&setReview(true)}
          style={{ width:"100%", padding:"17px", borderRadius:"16px", fontSize:"16px", fontWeight:700, fontFamily:"inherit", letterSpacing:"-0.01em", cursor:canGo?"pointer":"default", transition:"all 0.2s", background:canGo?"#fff":C.surface, color:canGo?"#0C0C10":C.muted }}>
          Proceed
        </button>
      </BottomAction>

      {/* Review sheet — full screen */}
      {review&&(
        <div style={{ position:"absolute", inset:0, background:C.bg, display:"flex", flexDirection:"column", zIndex:50 }}>
          <div style={{ flexShrink:0 }}>
            <SB/>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 8px 14px" }}>
              <button onClick={()=>setWithdrawDiscard(true)} style={{ display:"flex", alignItems:"center", background:"none", cursor:"pointer", color:C.blue, fontSize:"15px", fontWeight:500, padding:"6px 10px" }}>
                <ChevronLeft size={18} color={C.blue} strokeWidth={2.2}/>Back
              </button>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:"17px", fontWeight:700, color:C.text }}>Review Transaction</div>
                <div style={{ fontSize:"12px", color:C.dim }}>Double-check before sending</div>
              </div>
              <div style={{ width:"70px" }}/>
            </div>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"20px 20px 0" }}>
            <div style={{ background:C.surface, borderRadius:"18px", overflow:"hidden" }}>
              {[["Withdraw",`${amount} USDT`,null],["To address",mask(addr),null],["Network",net,null],["Network fee","1.00 USDT",C.amber],["To receive",`${receive} USDT`,C.green]].map(([k,v,cl],i,a)=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"15px 18px", borderBottom:i<a.length-1?"1px solid rgba(255,255,255,0.04)":"none" }}>
                  <span style={{ fontSize:"14px", color:C.dim }}>{k}</span>
                  <span style={{ fontSize:i===1?"12px":"14px", fontWeight:600, color:cl||C.text, fontFamily:i===1?"'SF Mono',ui-monospace,monospace":"inherit" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <BottomAction>
            <button onClick={()=>{ setReview(false); setDone(true); }} style={{ width:"100%", padding:"15px", borderRadius:"14px", background:"#fff", color:"#0C0C10", fontSize:"16px", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Confirm</button>
          </BottomAction>
          {withdrawDiscard&&(
            <div onClick={()=>setWithdrawDiscard(false)} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.6)", display:"flex", flexDirection:"column", justifyContent:"flex-end", zIndex:60 }}>
              <div onClick={e=>e.stopPropagation()} style={{ background:C.surface, borderRadius:"24px 24px 0 0", padding:"24px 20px 32px", borderBottom:"none" }}>
                <div style={{ display:"flex", justifyContent:"center", marginBottom:"20px" }}>
                  <div style={{ width:"36px", height:"4px", borderRadius:"3px", background:C.muted }}/>
                </div>
                <div style={{ display:"flex", justifyContent:"center", marginBottom:"20px" }}><WarningIcon/></div>
                <div style={{ textAlign:"center", marginBottom:"24px" }}>
                  <div style={{ fontSize:"17px", fontWeight:700, color:C.text, marginBottom:"6px" }}>Discard transaction?</div>
                  <div style={{ fontSize:"14px", color:C.dim, lineHeight:1.5 }}>Your progress will be lost.</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                  <button onClick={()=>{ setWithdrawDiscard(false); setReview(false); onBack(); }} style={{ width:"100%", padding:"16px", borderRadius:"14px", background:C.red+"22", color:C.red, fontSize:"16px", fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Discard</button>
                  <button onClick={()=>setWithdrawDiscard(false)} style={{ width:"100%", padding:"16px", borderRadius:"14px", background:C.surface2, color:C.dim, fontSize:"15px", fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Keep editing</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Receive({ onBack }) {
  const [net, setNet] = useState("TRC-20");
  const [copied, setCopied] = useState(false);
  const addr = RECEIVE_ADDRS[net];

  function copyAddr() {
    navigator.clipboard?.writeText(addr).catch(()=>{});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  /* QR code rendered as SVG matrix — encodes the address string */
  function miniQR(str) {
    /* deterministic pseudo-QR visual based on char codes — decorative but readable */
    const size = 21;
    const cells = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const isCorner = (r < 7 && c < 7) || (r < 7 && c >= size-7) || (r >= size-7 && c < 7);
        const isBorder = isCorner && (r===0||r===6||r===size-7||r===size-1||c===0||c===6||c===size-7||c===size-1);
        const isInner  = (r>=2&&r<=4&&c>=2&&c<=4) || (r>=2&&r<=4&&c>=size-5&&c<=size-3) || (r>=size-5&&r<=size-3&&c>=2&&c<=4);
        const isTiming = (r === 6 || c === 6) && !isCorner;
        const seed = str.charCodeAt((r * size + c) % str.length);
        const isData = !isCorner && !isTiming && ((seed ^ (r * 3 + c * 7)) % 3 !== 0);
        const on = isBorder || isInner || (isTiming && (r+c)%2===0) || isData;
        if (on) cells.push(<rect key={`${r}-${c}`} x={c*3} y={r*3} width="3" height="3" fill="white"/>);
      }
    }
    return cells;
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden" }}>
      <div style={{ flexShrink:0, background:C.bg }}>
        <SB/>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px 10px" }}>
          <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:"4px", background:"none", cursor:"pointer", color:C.blue, fontSize:"15px", fontWeight:500, padding:"6px 0" }}>
            <ChevronLeft size={18} color={C.blue} strokeWidth={2.2}/>Back
          </button>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"17px", fontWeight:700, color:C.text, letterSpacing:"-0.02em" }}>Receive USDT</div>
          </div>
          <div style={{ width:"60px" }}/>
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px 0" }}>

        {/* Warning banner */}
        <div style={{ background:"rgba(251,191,36,0.08)", border:`1px solid rgba(251,191,36,0.25)`, borderRadius:"14px", padding:"10px 14px", marginBottom:"16px", display:"flex", gap:"10px", alignItems:"flex-start" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={C.amber} style={{ flexShrink:0, marginTop:"2px" }}>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13" stroke="#7A4800" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="#7A4800" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize:"12px", color:C.amber, lineHeight:1.5 }}>Only send <strong>USDT</strong> on the selected network. Wrong network = permanent loss.</span>
        </div>

        {/* Network selector */}
        <div style={{ marginBottom:"16px" }}>
          <div style={{ fontSize:"11px", fontWeight:600, color:C.dim, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:"8px" }}>Network</div>
          <div style={{ background:C.surface, borderRadius:"16px", padding:"4px", display:"flex", gap:"3px" }}>
            {["TRC-20","ERC-20","BEP-20"].map(n=>(
              <button key={n} onClick={()=>setNet(n)} style={{ flex:1, padding:"9px 0", borderRadius:"12px", fontSize:"13px", fontWeight:net===n?700:500, cursor:"pointer", transition:"all 0.18s", background:net===n?"#fff":"transparent", color:net===n?"#0C0C10":C.text }}>{n}</button>
            ))}
          </div>
        </div>

        {/* QR code — large, centered */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:"16px" }}>
          <div style={{ background:C.surface, borderRadius:"24px", padding:"20px", display:"inline-flex", flexDirection:"column", alignItems:"center", gap:"16px" }}>
            <div style={{ background:"#0A0A0D", borderRadius:"16px", padding:"16px" }}>
              <svg width="320" height="320" viewBox="0 0 63 63">
                {miniQR(addr)}
              </svg>
            </div>
            <div style={{ fontSize:"11px", color:C.dim, fontFamily:"'SF Mono',monospace", textAlign:"center", wordBreak:"break-all", lineHeight:1.6, maxWidth:"220px" }}>
              {addr.slice(0,12)}…{addr.slice(-10)}
            </div>
          </div>
        </div>

        {/* Full address */}
        <div style={{ background:C.surface, borderRadius:"16px", padding:"14px 16px", marginBottom:"80px" }}>
          <div style={{ fontSize:"10px", fontWeight:600, color:C.dim, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:"8px" }}>Your {net} address</div>
          <div style={{ fontSize:"12px", color:C.text, fontFamily:"'SF Mono',monospace", letterSpacing:"0.02em", wordBreak:"break-all", lineHeight:1.7 }}>{addr}</div>
        </div>
      </div>

      {/* Copy Address — pinned above home indicator */}
      <BottomAction>
        <button
          onClick={copyAddr}
          style={{ width:"100%", padding:"17px", borderRadius:"16px", fontSize:"16px", fontWeight:700, cursor:"pointer", fontFamily:"inherit", letterSpacing:"-0.01em", transition:"all 0.2s", background:copied?C.green:"#fff", color:copied?"#fff":"#0C0C10" }}
        >
          {copied ? "✓ Copied!" : "Copy Address"}
        </button>
      </BottomAction>
    </div>
  );
}

/* ═══════════════ ONBOARDING ═══════════════ */

/* Illustration 1 — spiral arcs (from 1.svg) */
const Illus1 = () => (
  <img src={`${import.meta.env.BASE_URL}assets/slide-1.png`} style={{ width:"260px", height:"260px", objectFit:"contain", display:"block" }}/>
);

/* Illustration 2 — orbital dots (from 2.svg) */
const Illus2 = () => (
  <img src={`${import.meta.env.BASE_URL}assets/slide-2.png`} style={{ width:"260px", height:"260px", objectFit:"contain", display:"block" }}/>
);

/* Illustration 3 — concentric diamond rings (from 3.svg, simplified to SVG-safe) */
const Illus3 = () => (
  <img src={`${import.meta.env.BASE_URL}assets/slide-3.png`} style={{ width:"260px", height:"260px", objectFit:"contain", display:"block" }}/>
);

const SLIDES = [
  {
    bg:    C.bg,
    badge: "🔒  Private",
    title: "Your money, your rules",
    body:  "Secure P2P trading without middlemen. Just you and your counterparty.",
    illus: <Illus1/>,
    btn:   "Next",
  },
  {
    bg:    C.bg,
    badge: "📈  Live Rate",
    title: "Dolar Blue in your pocket",
    body:  "Real-time USDT/ARS rates 24/7. Get the best market price without bank fees or commissions.",
    illus: <Illus2/>,
    btn:   "Next",
  },
  {
    bg:    C.bg,
    badge: "🛡️  Escrow Protection",
    title: "Crypto on lock",
    body:  "Assets are held securely in escrow until payment is confirmed. Trade with zero risk.",
    illus: <Illus3/>,
    btn:   "Start trading",
  },
];

function Onboarding({ onDone }) {
  const [slide, setSlide] = useState(0);
  const s = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:s.bg }}>
      <SB/>

      {/* progress bars */}
      <div style={{ display:"flex", gap:"5px", padding:"10px 20px 0", flexShrink:0 }}>
        {SLIDES.map((_,i) => (
          <div key={i} style={{ flex:1, height:"3px", borderRadius:"2px", background: i <= slide ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.3)", transition:"background 0.3s" }}/>
        ))}
      </div>

      {/* text block — left aligned, now on top */}
      <div style={{ padding:"40px 24px 0", flexShrink:0 }}>
        <div style={{ background:"rgba(255,255,255,0.18)", borderRadius:"100px", padding:"5px 14px", fontSize:"12px", fontWeight:600, color:"#fff", marginBottom:"16px", display:"inline-flex", alignItems:"center", letterSpacing:"0.01em" }}>
          {s.badge}
        </div>
        <div style={{ fontSize:"30px", fontWeight:800, color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:"12px", width:"100%" }}>
          {s.title}
        </div>
        <div style={{ fontSize:"15px", color:"rgba(255,255,255,0.75)", lineHeight:1.55 }}>
          {s.body}
        </div>
      </div>

      {/* illustration — centered in remaining space */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:"260px", height:"260px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {s.illus}
        </div>
      </div>

      {/* CTA */}
      <div style={{ flexShrink:0, padding:"12px 20px 16px" }}>
        <button
          onClick={() => isLast ? onDone() : setSlide(v => v + 1)}
          style={{ width:"100%", padding:"17px", borderRadius:"18px", background:"rgba(255,255,255,0.95)", color:"#1C1C1E", fontSize:"17px", fontWeight:700, cursor:"pointer", fontFamily:"inherit", letterSpacing:"-0.02em" }}
        >
          {s.btn}
        </button>
      </div>

      {/* home indicator — matches slide color, no dark bar */}
      <div style={{ flexShrink:0, display:"flex", justifyContent:"center", padding:"8px 0 6px" }}>
        <div style={{ width:"134px", height:"5px", borderRadius:"100px", background:"rgba(255,255,255,0.35)" }}/>
      </div>
    </div>
  );
}

/* ═══════════════ SECURITY SETUP ═══════════════ */
/* Illustration 6 — globe/meridian lines */
const Illus6 = () => (
  <img src={`${import.meta.env.BASE_URL}assets/security.png`} style={{ width:"260px", height:"260px", objectFit:"contain", display:"block" }}/>
);

function SecuritySetup({ onDone }) {
  
  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:C.bg }}>
      <SB/>

      {/* illustration — same fixed 200×200 container */}
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:"260px", height:"260px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Illus6/>
        </div>
      </div>

      {/* text */}
      <div style={{ padding:"0 24px", flexShrink:0 }}>
        <div style={{ fontSize:"30px", fontWeight:800, color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:"12px" }}>
          Lock it down
        </div>
        <div style={{ fontSize:"15px", color:"rgba(255,255,255,0.75)", lineHeight:1.55, whiteSpace:"pre-line", marginBottom:"28px" }}>
          {"Secure your space with Face ID or a custom PIN.\nIt takes only a second."}
        </div>
      </div>

      {/* action buttons */}
      <div style={{ padding:"12px 20px 16px", display:"flex", flexDirection:"column", gap:"12px", flexShrink:0 }}>
        <button
          style={{ width:"100%", padding:"17px", borderRadius:"16px", background:"#fff", color:"#0C0C10", fontSize:"17px", fontWeight:600, cursor:"default", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0C0C10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 2H5a2 2 0 0 0-2 2v4M15 2h4a2 2 0 0 1 2 2v4M9 22H5a2 2 0 0 1-2-2v-4M15 22h4a2 2 0 0 0 2-2v-4"/>
            <path d="M9 10v.01M15 10v.01M12 13a2 2 0 0 0 2 2H10a2 2 0 0 0 2-2z"/>
          </svg>
          Enable Face ID
        </button>
        <button
          style={{ width:"100%", padding:"17px", borderRadius:"16px", background:"rgba(255,255,255,0.12)", color:"#fff", fontSize:"17px", fontWeight:500, cursor:"default", fontFamily:"inherit" }}
        >
          Create PIN-code
        </button>
        <button
          onClick={onDone}
          style={{ width:"100%", padding:"14px", borderRadius:"16px", background:"transparent", color:"rgba(255,255,255,0.65)", fontSize:"16px", fontWeight:400, cursor:"pointer", fontFamily:"inherit" }}
        >
          Set up later
        </button>
      </div>

      {/* home indicator */}
      <HomeIndicator/>
    </div>
  );
}

/* ═══ ROOT ═══ */
export default function CryptoApp() {
  const [screen, setScreen] = useState("onboarding");
  const [navKey, setNavKey] = useState(0);
  const sideRef = useRef("buy");

  function goTrade(s) {
    sideRef.current = s;
    setNavKey(k => k + 1);
    setScreen("trade");
  }

  function handleNav(key) {
    if (key === "home") setScreen("dash");
    if (key === "p2p")  goTrade("buy");
  }

  return (
    <div style={{ minHeight:"100dvh", width:"100%", background:"#000", display:"flex", justifyContent:"center" }}>
      <div style={{ background:C.bg, width:"100%", maxWidth:"430px", height:"100dvh", fontFamily:"-apple-system,'SF Pro Display',BlinkMacSystemFont,sans-serif", color:C.text, display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" }}>
        <style>{`
          *{box-sizing:border-box}
          html,body,#root{margin:0;padding:0;background:#000;height:100dvh;overflow:hidden}
          input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
          input[type=number]{-moz-appearance:textfield}
          ::-webkit-scrollbar{width:0;height:0}
          button{-webkit-tap-highlight-color:transparent;touch-action:manipulation}
          button:active{opacity:0.75}
          a{-webkit-tap-highlight-color:transparent}
        `}</style>
        {screen==="onboarding" && <Onboarding onDone={()=>setScreen("security")}/>}
        {screen==="security"   && <SecuritySetup onDone={()=>setScreen("dash")}/>}
        {screen==="dash"       && <Dashboard onTrade={goTrade} onWithdraw={()=>setScreen("withdraw")} onReceive={()=>setScreen("receive")} onNav={handleNav}/>}
        {screen==="trade"      && <Trade key={navKey} initialSide={sideRef.current} onBack={()=>setScreen("dash")} onNav={handleNav}/>}
        {screen==="withdraw"   && <Withdraw onBack={()=>setScreen("dash")} onNav={handleNav}/>}
        {screen==="receive"    && <Receive onBack={()=>setScreen("dash")}/>}
      </div>
    </div>
  );
}
