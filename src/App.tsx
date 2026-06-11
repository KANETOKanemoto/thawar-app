import { useState, useEffect, useRef } from 'react';

const F = "'M PLUS Rounded 1c', 'Noto Sans JP', sans-serif";

const LOGO_PINK = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgODAiPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iODAiIGZpbGw9Im5vbmUiLz48dGV4dCB4PSIxMCIgeT0iNjIiIGZvbnQtc2l6ZT0iNTQiIGZvbnQtZmFtaWx5PSJBcmlhbCBCbGFjayxBcmlhbCIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iI0REMjQ3NSI+VEhBV0FSPC90ZXh0Pjwvc3ZnPg==";
const ICON_THANKS_WHITE = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCA2MCI+PHBhdGggZD0iTTMwIDUyIEMzMCA1MiA4IDM2IDggMjIgQzggMTQgMTQgOCAyMiAxMCBDMjYgMTEgMjkgMTQgMzAgMTcgQzMxIDE0IDM0IDExIDM4IDEwIEM0NiA4IDUyIDE0IDUyIDIyIEM1MiAzNiAzMCA1MiAzMCA1MloiIGZpbGw9IndoaXRlIi8+PC9zdmc+";
const ICON_THANKS_PINK  = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCA2MCI+PHBhdGggZD0iTTMwIDUyIEMzMCA1MiA4IDM2IDggMjIgQzggMTQgMTQgOCAyMiAxMCBDMjYgMTEgMjkgMTQgMzAgMTcgQzMxIDE0IDM0IDExIDM4IDEwIEM0NiA4IDUyIDE0IDUyIDIyIEM1MiAzNiAzMCA1MiAzMCA1MloiIGZpbGw9IiNERDI0NzUiLz48L3N2Zz4=";
const ICON_AWARE_WHITE  = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCA2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIyNCIgcj0iMTQiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIvPjxyZWN0IHg9IjI0IiB5PSIzOCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjMiIHJ4PSIxLjUiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMjYiIHk9IjQzIiB3aWR0aD0iOCIgaGVpZ2h0PSIzIiByeD0iMS41IiBmaWxsPSJ3aGl0ZSIvPjxsaW5lIHgxPSIzMCIgeTE9IjEwIiB4Mj0iMzAiIHkyPSI2IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+";
const ICON_AWARE_GRAY   = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCA2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIyNCIgcj0iMTQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlFOUU5RSIgc3Ryb2tlLXdpZHRoPSIzIi8+PHJlY3QgeD0iMjQiIHk9IjM4IiB3aWR0aD0iMTIiIGhlaWdodD0iMyIgcng9IjEuNSIgZmlsbD0iIzlFOUU5RSIvPjxyZWN0IHg9IjI2IiB5PSI0MyIgd2lkdGg9IjgiIGhlaWdodD0iMyIgcng9IjEuNSIgZmlsbD0iIzlFOUU5RSIvPjxsaW5lIHgxPSIzMCIgeTE9IjEwIiB4Mj0iMzAiIHkyPSI2IiBzdHJva2U9IiM5RTlFOUUiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=";

const C = {
  thanks:       "#DD2475",
  thanksDeep:   "#B01A5C",
  awareness:    "#70BF4F",
  awarenessDeep:"#509A33",
  sp:           "#FFC900",
  spDeep:       "#CC9F00",
  text:         "#383838",
  sub1:         "#FCF8F5",
  sub2:         "#DFD4C8",
  sub3:         "#EB8902",
  sub3Deep:     "#C06E00",
  sub4:         "#D8C1DD",
  white:        "#FFFFFF",
  gray:         "#9E9E9E",
};

const DUMMY_USERS = [
  { id:1, nickname:"ゆうき",   email:"yuki@example.com",   password:"pass1234", icon:"🧑",     iconType:"emoji", streak:12, sp:520,  thanks:88,  awareness:44 },
  { id:2, nickname:"はな",     email:"hana@example.com",   password:"pass1234", icon:"👩",     iconType:"emoji", streak:5,  sp:210,  thanks:34,  awareness:21 },
  { id:3, nickname:"たろう",   email:"taro@example.com",   password:"pass1234", icon:"👨",     iconType:"emoji", streak:30, sp:1200, thanks:200, awareness:98 },
  { id:4, nickname:"さくら",   email:"sakura@example.com", password:"pass1234", icon:"🧕",     iconType:"emoji", streak:3,  sp:88,   thanks:15,  awareness:8  },
  { id:5, nickname:"けんじ",   email:"kenji@example.com",  password:"pass1234", icon:"🧔",     iconType:"emoji", streak:7,  sp:310,  thanks:55,  awareness:30 },
];

const AVATAR_OPTIONS = ["🧑","👩","👨","🧕","🧔","👱","🧒","👧","👦"]

const DUMMY_TERMS = "利用規約";

const mockPosts = [
  { id:1, type:"thanks",    text:"今日、同僚が忙しいのに手伝ってくれた。ありがとう。",           time:"3分前",   sympathy:8,  userId:2 },
  { id:2, type:"awareness", text:"焦っているとき、深呼吸ひとつで景色が変わることに気づいた。",   time:"11分前",  sympathy:15, userId:3 },
  { id:3, type:"thanks",    text:"電車でお年寄りに席を譲れた。小さなことだけど今日一番の誇り。", time:"28分前",  sympathy:22, userId:4 },
  { id:4, type:"awareness", text:"比較するのをやめた瞬間、自分のペースが見えてきた。",           time:"1時間前", sympathy:31, userId:1 },
  { id:5, type:"thanks",    text:"雨が上がって、空がきれいだった。自然にも感謝できた。",         time:"2時間前", sympathy:18, userId:5 },
  { id:6, type:"change_report", text:"感謝を始めて1ヶ月が経ちました。\n\n最初は正直、小さなことに感謝するなんて…と思っていました。でも続けるうちに、毎朝コーヒーを飲む時間が好きになって、同僚との会話が少し楽しくなって、帰り道に空を見上げる習慣ができました。\n\nイライラすることが減ったとは言い切れないけど、まあいいかと思えることが増えた気がします。これが変化なのかな。", time:"3日前", sympathy:47, userId:1, period:"1ヶ月" }
];


// ===== CONFETTI =====
function Confetti({ x, y, color, onDone }) {
  const shapes = ["★","●","▲","◆","✦","❤"];
  const [items] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      angle: (i / 12) * Math.PI * 2 + Math.random() * 0.4,
      dist: 55 + Math.random() * 95,
      rot: Math.random() * 720 - 360,
      size: 10 + Math.random() * 12,
      hue: [color, C.sp, C.sub3, C.sub4][Math.floor(Math.random()*4)],
    }))
  );
  const [t, setT] = useState(0);
  useEffect(() => {
    const start = performance.now(); let frame;
    const go = (now) => {
      const p = Math.min((now - start) / 850, 1);
      setT(p);
      if (p < 1) frame = requestAnimationFrame(go); else onDone();
    };
    frame = requestAnimationFrame(go);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (<>
    {items.map(item => (
        <div key={item.id} style={{
          position:"fixed",
          left: x + Math.cos(item.angle) * item.dist * (1-Math.pow(1-t,2)),
          top:  y + Math.sin(item.angle) * item.dist * (1-Math.pow(1-t,2)) - 35*(1-Math.pow(1-t,2)),
          transform: ("translate(-50%,-50%) rotate("+item.rot*t+"deg)"),
          opacity: 1-t, pointerEvents:"none", zIndex:9999,
          fontSize: item.size, color: item.hue,
          filter: ("drop-shadow(0 2px 4px "+item.hue+"88)"),
        }}>{item.shape}</div>
    ))}
  </>);
}

// ===== XP TOAST =====
function XPToast({ sp, color, onDone }) {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    setPh(1);
    const t1 = setTimeout(() => setPh(2), 1500);
    const t2 = setTimeout(onDone, 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div style={{position:"fixed",bottom:ph===1?"28%":"20%",left:"50%",transform:("translateX(-50%) scale("+(ph===1?1:0.8)+")"),background:color,color:"#fff",fontFamily:F,fontWeight:900,fontSize:"1.3rem",padding:"12px 32px",borderRadius:99,boxShadow:("0 6px 0 "+color+"99, 0 10px 24px "+color+"66"),opacity:ph===2?0:ph===1?1:0,transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",zIndex:10000,pointerEvents:"none",border:"3px solid rgba(255,255,255,0.5)"}}>+{sp} SP</div>
  );
}

// ===== NOTIFICATION SYSTEM =====
const NOTIF_TYPES = {
  post_thanks:    { emoji:"❤️", color:"#DD2475", label:"あなたの投稿から感謝が生まれました" },
  post_awareness: { emoji:"✨", color:"#70BF4F", label:"あなたの投稿から気づきが生まれました" },
  my_thanks:      { emoji:"❤️", color:"#DD2475", label:"感謝を記録しました" },
  my_awareness:   { emoji:"✨", color:"#70BF4F", label:"前向きな気づきを記録しました" },
  change_report:  { emoji:"🌱", color:"#8B5CF6", label:"変化レポートを投稿しませんか？" },
};

const LEVEL_TABLE = [
  ["しずくの章",   "はじまりのしずく",          0,     "💧"],
  ["しずくの章",   "あつまるしずく",             20,    "💧"],
  ["しずくの章",   "めぐるしずく",               50,    "💧"],
  ["波紋の章",     "ちいさな波紋",               150,   "🌊"],
  ["波紋の章",     "ひろがる波紋",               350,   "🌊"],
  ["波紋の章",     "共鳴する波紋",               600,   "🌊"],
  ["せせらぎの章", "清らかなせせらぎ",           1200,  "🏞️️"],
  ["せせらぎの章", "みずみずしきせせらぎ",       2000,  "🏞️️"],
  ["せせらぎの章", "光るせせらぎ",               3200,  "🏞️️"],
  ["恵みの雨の章", "ひとすじの恵みの雨",         5500,  "🌧️️"],
  ["恵みの雨の章", "潤いの恵みの雨",             8500,  "🌧️️"],
  ["恵みの雨の章", "祝福の恵みの雨",             12000, "🌧️️"],
  ["THAWARの章",  "虹色のシャワー",             18000, "🌈"],
  ["THAWARの章",  "奇跡のシャワー",             25000, "🌈"],
  ["THAWARの章",  "光の究極シャワー（THAWAR）", 35000, "🌈"],
];

function getLevel(sp) {
  let idx = 0;
  for (let i = 0; i < LEVEL_TABLE.length; i++) {
    if (sp >= LEVEL_TABLE[i][2]) idx = i; else break;
  }
  const cur  = LEVEL_TABLE[idx];
  const next = LEVEL_TABLE[idx + 1] || null;
  const progress = next ? Math.min(Math.round(((sp - cur[2]) / (next[2] - cur[2])) * 100), 99) : 100;
  return { chapter:cur[0], name:cur[1], emoji:cur[3], idx:idx, next:next, progress:progress, nextSP: next ? next[2] : cur[2] };
}

function NotificationBell({ notifications, onOpen }) {
  const unread = notifications.filter(n=>!n.read).length;
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (unread > 0) {
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    }
  }, [unread]);

  return (
    <button onClick={onOpen} style={{
      position:"relative", width:38, height:38, borderRadius:"50%",
      background: unread>0 ? C.thanks+"18" : C.sub1,
      border:("2px solid "+(unread>0 ? C.thanks+"66" : C.sub2)),
      display:"flex", alignItems:"center", justifyContent:"center",
      cursor:"pointer", fontSize:"1.2rem",
      boxShadow: unread>0 ? ("0 3px 0 "+C.thanksDeep+"44") : "0 2px 0 #C8BDB0",
      transform: bounce ? "scale(1.2) rotate(-15deg)" : "scale(1)",
      transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      {"🔔"}
      {unread>0 && (
        <div style={{
          position:"absolute", top:-4, right:-4,
          width:18, height:18, borderRadius:"50%",
          background:C.thanks, border:"2px solid #fff",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:F, fontWeight:900, fontSize:"0.55rem", color:"#fff",
          animation:"popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}>{unread>9?"9+":unread}</div>
      )}
    </button>
  );
}

function NotificationPanel({ notifications, onClose, onReadAll, onReadOne }) {
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:10002,
      background:"rgba(56,56,56,0.4)", backdropFilter:"blur(4px)",
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        position:"absolute", top:0, right:0,
        width:"88%", maxWidth:340, height:"100%",
        background:C.sub1,
        boxShadow:"-8px 0 40px rgba(0,0,0,0.15)",
        display:"flex", flexDirection:"column",
        animation:"slideInFromRight 0.3s cubic-bezier(0.34,1.1,0.64,1)",
      }}>
        {/* パネルヘッダー */}
        <div style={{
          padding:"56px 20px 16px",
          borderBottom:("2px solid "+C.sub2),
          display:"flex", alignItems:"center", justifyContent:"space-between",
          background:C.white,
        }}>
          <div style={{fontFamily:F, fontWeight:900, fontSize:"1rem", color:C.text}}>
            🔔 通知
          </div>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            {notifications.some(n=>!n.read) && (
              <button onClick={onReadAll} style={{
                background:"none", border:"none", cursor:"pointer",
                fontFamily:F, fontWeight:800, fontSize:"0.72rem", color:C.thanks,
              }}>すべて既読</button>
            )}
            <button onClick={onClose} style={{
              width:32, height:32, borderRadius:"50%",
              background:C.sub1, border:("2px solid "+C.sub2),
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", fontSize:"1rem",
              boxShadow:"0 2px 0 #C8BDB0",
            }}>✕</button>
          </div>
        </div>

        {/* 通知リスト */}
        <div style={{flex:1, overflowY:"auto", padding:"12px 16px"}}>
          {notifications.length===0 ? (
            <div style={{
              textAlign:"center", padding:"48px 20px",
              fontFamily:F, fontSize:"0.85rem", color:C.gray, fontWeight:600,
            }}>
              <div style={{fontSize:"2.5rem", marginBottom:12}}>🔕</div>
              まだ通知はありません
            </div>
          ) : (
            notifications.map(n => (
                <div key={n.id} onClick={()=>onReadOne(n.id)} style={{
                  display:"flex", gap:12, alignItems:"flex-start",
                  padding:"12px 14px", borderRadius:16, marginBottom:8, cursor:"pointer",
                  background:n.read?C.white:(NOTIF_TYPES[n.type]||{color:"#DD2475"}).color+"12",
                  border:("2px solid "+(n.read?C.sub2:(NOTIF_TYPES[n.type]||{color:"#DD2475"}).color+"44")),
                  transition:"all 0.2s",
                }}>
                  <div style={{width:40,height:40,borderRadius:"50%",flexShrink:0,
                    background:n.read?C.sub2:(NOTIF_TYPES[n.type]||{color:"#DD2475"}).color,
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",
                  }}>{(NOTIF_TYPES[n.type]||{emoji:"[bell]"}).emoji}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:F,fontWeight:900,fontSize:"0.8rem",
                      color:n.read?C.gray:(NOTIF_TYPES[n.type]||{color:"#DD2475"}).color,marginBottom:3,
                    }}>{(NOTIF_TYPES[n.type]||{label:"通知"}).label}</div>
                    <div style={{fontFamily:F,fontSize:"0.75rem",color:C.text,fontWeight:500,lineHeight:1.5}}>{n.message}</div>
                    <div style={{fontFamily:F,fontSize:"0.62rem",color:C.gray,fontWeight:600,marginTop:4}}>{n.time}</div>
                  </div>
                  {!n.read&&<div style={{width:8,height:8,borderRadius:"50%",
                    background:(NOTIF_TYPES[n.type]||{color:"#DD2475"}).color,flexShrink:0,marginTop:4}}/>}
                </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ===== STREAK =====
function StreakFlame({ days }) {
  const [b, setB] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => { setB(true); setTimeout(()=>setB(false),400); }, 3000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:4,
      background: C.sub3+"22", border:("2px solid "+C.sub3+"66"),
      borderRadius:99, padding:"5px 12px",
      transform: b?"scale(1.15)":"scale(1)",
      transition:"transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      <span style={{fontSize:"1.1rem"}}>🔥</span>
      <span style={{fontFamily:F,fontWeight:900,fontSize:"0.95rem",color:C.sub3}}>{days}</span>
    </div>
  );
}

// ===== LIVE COUNTER =====
function LiveCounter({ thanks, awareness }) {
  const [dT,setDT]=useState(thanks);
  const [dA,setDA]=useState(awareness);
  const [popT,setPopT]=useState(false);
  const [popA,setPopA]=useState(false);
  useEffect(()=>{
    const iv=setInterval(()=>{
      if(Math.random()<0.6){setDT(v=>v+Math.floor(Math.random()*3)+1);setPopT(true);setTimeout(()=>setPopT(false),300);}
      else{setDA(v=>v+Math.floor(Math.random()*2)+1);setPopA(true);setTimeout(()=>setPopA(false),300);}
    },1800+Math.random()*1200);
    return()=>clearInterval(iv);
  },[]);

  const Box=({value,label,color,pop,iconWhite,iconColor})=>(
    <div style={{flex:1,textAlign:"center",padding:"12px 8px",background:pop?color+"18":"transparent",borderRadius:16,transition:"background 0.3s"}}>
      <img src={pop?iconWhite:iconColor} alt={label}
        style={{width:32,height:32,objectFit:"contain",marginBottom:4,
          transform:pop?"scale(1.2)":"scale(1)",
          transition:"transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
          filter: pop ? ("drop-shadow(0 0 6px "+color+")") : "none",
        }}/>
      <div style={{fontFamily:F,fontWeight:900,fontSize:"1.5rem",color,
        transform:pop?"scale(1.12)":"scale(1)",
        transition:"transform 0.15s cubic-bezier(0.34,1.56,0.64,1)",display:"inline-block"
      }}>{value.toLocaleString()}</div>
      <div style={{fontFamily:F,fontSize:"0.65rem",color:C.gray,marginTop:2,fontWeight:700}}>{label}</div>
    </div>
  );

  return (
    <div style={{background:C.white,borderRadius:24,padding:"14px 8px",marginBottom:18,
      boxShadow:"0 4px 0 #DFD4C8, 0 2px 12px rgba(0,0,0,0.06)",border:("2px solid "+C.sub2)}}>
      <div style={{textAlign:"center",fontFamily:F,fontSize:"0.62rem",color:C.gray,fontWeight:800,
        letterSpacing:"0.12em",marginBottom:4,textTransform:"uppercase"}}>🌍 World Live</div>
      <div style={{display:"flex"}}>
        <Box value={dT} label="Thanks" color={C.thanks} pop={popT} iconWhite={ICON_THANKS_WHITE} iconColor={ICON_THANKS_PINK}/>
        <div style={{width:2,background:C.sub2,margin:"8px 0"}}/>
        <Box value={dA} label="Awareness" color={C.awareness} pop={popA} iconWhite={ICON_AWARE_WHITE} iconColor={ICON_AWARE_GRAY}/>
      </div>
    </div>
  );
}

// ===== ACTION BUTTON =====
function ActionButton({ label, iconWhite, iconColor, color, colorDeep, sp, onAction, small }) {
  const [pressed, setPressed] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const handleClick = (e) => { setWiggle(true); setTimeout(()=>setWiggle(false),500); onAction(e); };
  return (
    <button
      onMouseDown={()=>setPressed(true)} onMouseUp={()=>setPressed(false)}
      onTouchStart={()=>setPressed(true)} onTouchEnd={()=>setPressed(false)}
      onClick={handleClick}
      style={{
        flex:1, background: pressed?colorDeep:color, border:"none",
        borderRadius: small?14:22,
        padding: small?(pressed?"14px 8px 10px":"12px 8px"):(pressed?"26px 12px 18px":"22px 12px 22px"),
        cursor:"pointer", transition:"all 0.08s",
        boxShadow: pressed?("0 2px 0 "+colorDeep):("0 "+(small?4:7)+"px 0 "+colorDeep+", 0 10px 24px "+color+"44"),
        display:"flex",flexDirection:"column",alignItems:"center",gap:small?4:8,
        transform: wiggle?"rotate(-2deg) scale(1.05)":"rotate(0) scale(1)",
        marginTop: pressed?"4px":"0",
      }}
    >
      <img src={iconWhite} alt={label}
        style={{width:small?28:52,height:small?28:52,objectFit:"contain",
          filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))"}}/>
      <div style={{fontFamily:F,fontWeight:900,fontSize:small?"0.75rem":"1.1rem",color:"#fff",
        textShadow:("0 2px 0 "+colorDeep+"88")}}>{label}</div>
      <div style={{background:"rgba(255,255,255,0.25)",color:"#fff",
        fontSize:small?"0.6rem":"0.75rem",fontWeight:900,
        padding:small?"2px 8px":"5px 14px",borderRadius:99,fontFamily:F}}>
        ＋{sp} SP
      </div>
    </button>
  );
}

// ===== INPUT POPUP =====
function InputPopup({ type, onSave, onClose }) {
  const [text,setText]=useState("");
  const isAw = type==="awareness";
  const color = isAw?C.awareness:C.thanks;
  const colorDeep = isAw?C.awarenessDeep:C.thanksDeep;
  const iconColor = isAw?ICON_AWARE_GRAY:ICON_THANKS_PINK;
  const bonusSP = isAw?10:5;
  return (
    <div style={{position:"fixed",inset:0,zIndex:10001,background:"rgba(56,56,56,0.55)",
      backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-end"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",background:C.sub1,
        borderRadius:"28px 28px 0 0",padding:"24px 20px 44px",
        boxShadow:"0 -12px 40px rgba(0,0,0,0.15)",
        animation:"slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)"}}>
        <div style={{width:44,height:5,borderRadius:3,background:C.sub2,margin:"0 auto 20px"}}/>
        <div style={{background:color+"20",borderRadius:18,padding:"12px 14px",marginBottom:14,
          display:"flex",alignItems:"center",gap:12}}>
          <img src={iconColor} alt="" style={{width:36,height:36,objectFit:"contain"}}/>
          <div>
            <div style={{fontFamily:F,fontWeight:900,fontSize:"0.95rem",color:color}}>{isAw?"ふと『そうか！』と思えたことは？":"感謝を教えて！"}</div>
            <div style={{fontFamily:F,fontSize:"0.7rem",color:C.gray,fontWeight:500,marginTop:2}}>{isAw?"感謝してる時、または前向きな気づきを記録しよう":"記入すると ＋"+bonusSP+" SP ボーナス！"}</div>
          </div>
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value)}
          placeholder={isAw?"感謝してる時、または、ふと『そうか！』と思えたことはありますか？":"ありがとうと思ったことを..."}
          autoFocus
          style={{width:"100%",minHeight:100,border:("3px solid "+(text.trim()?color:C.sub2)),
            borderRadius:18,padding:"14px 16px",fontFamily:F,fontSize:"0.95rem",color:C.text,
            background:C.white,outline:"none",resize:"none",boxSizing:"border-box",
            lineHeight:1.7,fontWeight:500,transition:"border-color 0.2s"}}/>
        <div style={{display:"flex",gap:10,marginTop:14}}>
          <button onClick={onClose} style={{flex:1,padding:"14px",borderRadius:16,
            border:("3px solid "+C.sub2),background:C.white,color:C.gray,
            fontFamily:F,fontWeight:800,fontSize:"0.9rem",cursor:"pointer"}}>あとで</button>
          <button onClick={()=>text.trim()&&onSave(text,bonusSP)} style={{flex:2,padding:"14px",
            borderRadius:16,border:"none",
            background:text.trim()?color:C.sub2,color:text.trim()?"#fff":C.gray,
            fontFamily:F,fontWeight:900,fontSize:"0.95rem",cursor:text.trim()?"pointer":"default",
            boxShadow:text.trim()?("0 4px 0 "+colorDeep):"none",transition:"all 0.2s"}}>
            保存 ＋{bonusSP}SP 🎉
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== POST CARD =====
function PostCard({ post, users, onAction, onSympathy }) {
  const [sympathy,setSympathy]=useState(post.sympathy);
  const [reacted,setReacted]=useState(false);
  const [showAct,setShowAct]=useState(false);
  const author=users.find(u=>u.id===post.userId)||users[0];
  const isAw=post.type==="awareness";
  const color=isAw?C.awareness:C.thanks;
  const colorDeep=isAw?C.awarenessDeep:C.thanksDeep;
  const iconColor=isAw?ICON_AWARE_GRAY:ICON_THANKS_PINK;
  const iconWhite=isAw?ICON_AWARE_WHITE:ICON_THANKS_WHITE;

  return (
    <div style={{background:C.white,borderRadius:22,padding:"16px 16px 14px",marginBottom:12,
      boxShadow:("0 5px 0 "+color+"44, 0 2px 10px rgba(0,0,0,0.04)"),border:("2px solid "+color+"44")}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <div style={{width:40,height:40,borderRadius:"50%",
          background:("linear-gradient(135deg,"+color+","+colorDeep+")"),
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"1.4rem",boxShadow:("0 3px 0 "+colorDeep),overflow:"hidden"}}>
          {author.iconType==="url"
            ?<img src={author.icon} style={{width:40,height:40,borderRadius:"50%",objectFit:"cover"}} alt=""/>
            :author.icon}
        </div>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            <span style={{fontFamily:F,fontWeight:900,fontSize:"0.82rem",color:C.text}}>{author.nickname}</span>
            <span style={{background:color,color:"#fff",fontSize:"0.6rem",padding:"2px 8px",
              borderRadius:99,fontFamily:F,fontWeight:900,boxShadow:("0 2px 0 "+colorDeep),
              display:"flex",alignItems:"center",gap:4}}>
              <img src={iconWhite} alt="" style={{width:12,height:12,objectFit:"contain"}}/>
              {isAw?"Awareness":"Thanks"}
            </span>
          </div>
          <div style={{fontSize:"0.62rem",color:C.gray,marginTop:2,fontFamily:F,fontWeight:500}}>{post.time}</div>
        </div>
      </div>
      <p style={{margin:"0 0 14px 0",lineHeight:1.8,fontFamily:F,fontSize:"0.9rem",color:C.text,fontWeight:500}}>{post.text}</p>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
        <button onClick={()=>{if(!reacted){setReacted(true);setSympathy(s=>s+1);if(onSympathy)onSympathy(post);}}} style={{
          display:"flex",alignItems:"center",gap:6,
          background:reacted?C.thanks:C.sub2,border:"none",
          borderRadius:99,padding:"7px 14px",cursor:"pointer",
          boxShadow:reacted?("0 3px 0 "+C.thanksDeep):"0 3px 0 #C8BDB0",
          transform:reacted?"scale(1.05)":"scale(1)",transition:"all 0.15s",
        }}>
          <img src={reacted?ICON_THANKS_WHITE:ICON_THANKS_PINK} alt="共感" style={{width:16,height:16,objectFit:"contain"}}/>
          <span style={{fontFamily:F,fontWeight:800,fontSize:"0.75rem",color:reacted?"#fff":C.gray}}>共感 {sympathy}</span>
        </button>
        <button onClick={()=>setShowAct(!showAct)} style={{
          background:showAct?C.sub4:C.sub2,border:"none",borderRadius:99,
          padding:"7px 14px",cursor:"pointer",fontFamily:F,fontWeight:800,
          fontSize:"0.72rem",color:showAct?C.text:C.gray,
          boxShadow:showAct?("0 3px 0 "+C.sub4+"aa"):"0 3px 0 #C8BDB0",
          display:"flex",alignItems:"center",gap:6,transition:"all 0.2s",
        }}>
          <img src={ICON_THANKS_PINK} alt="" style={{width:14,height:14,objectFit:"contain"}}/>
          <span style={{color:C.thanks}}>Thanks</span>
          <span style={{color:C.gray}}>/</span>
          <img src={ICON_AWARE_GRAY} alt="" style={{width:14,height:14,objectFit:"contain"}}/>
          <span style={{color:C.awareness}}>Aware</span>
        </button>
      </div>
      {showAct&&(
        <div style={{display:"flex",gap:8,marginTop:10,animation:"fadeIn 0.2s ease"}}>
          <ActionButton label="Thanks" iconWhite={ICON_THANKS_WHITE} iconColor={ICON_THANKS_PINK}
            color={C.thanks} colorDeep={C.thanksDeep} sp={1} small
            onAction={(e)=>{onAction(e,"thanks");setShowAct(false);}}/>
          <ActionButton label="Awareness" iconWhite={ICON_AWARE_WHITE} iconColor={ICON_AWARE_GRAY}
            color={C.awareness} colorDeep={C.awarenessDeep} sp={3} small
            onAction={(e)=>{onAction(e,"awareness");setShowAct(false);}}/>
        </div>
      )}
    </div>
  );
}


// ===== MY PAGE =====

// ===== CHANGE REPORT MODAL =====
function ChangeReportModal({ onSave, onClose }) {
  const [text, setText] = useState("");
  const SP_REPORT = 3;
  return (
    <div style={{position:"fixed",inset:0,zIndex:10001,background:"rgba(56,56,56,0.55)",
      backdropFilter:"blur(6px)",display:"flex",alignItems:"flex-end"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",background:"#FAF7FD",
        borderRadius:"28px 28px 0 0",padding:"24px 20px 48px",
        boxShadow:"0 -12px 40px rgba(0,0,0,0.15)",
        animation:"slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)"}}>
        <div style={{width:44,height:5,borderRadius:3,background:"#DFD4C8",margin:"0 auto 20px"}}/>
        <div style={{background:"#8B5CF622",borderRadius:18,padding:"14px 16px",marginBottom:16,
          display:"flex",alignItems:"flex-start",gap:12}}>
          <div style={{fontSize:"1.8rem",lineHeight:1}}>🌱</div>
          <div>
            <div style={{fontFamily:F,fontWeight:900,fontSize:"0.95rem",color:"#8B5CF6",marginBottom:4}}>
              変化レポート
            </div>
            <div style={{fontFamily:F,fontSize:"0.72rem",color:"#9E9E9E",fontWeight:600,lineHeight:1.6}}>
              感謝・気づきを続けて、どんな変化を感じていますか？<br/>
              小さな変化でも、気づいたことを自由に書いてみてください。
            </div>
          </div>
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value)}
          placeholder={"例：\n最初は義務感で記録していたけど、最近は自然と感謝できるようになった気がします。\n朝起きた時の気持ちが少し軽くなりました…"}
          autoFocus
          style={{width:"100%",minHeight:140,border:"3px solid "+(text.trim()?"#8B5CF6":"#DFD4C8"),
            borderRadius:18,padding:"14px 16px",fontFamily:F,fontSize:"0.92rem",color:"#383838",
            background:"#fff",outline:"none",resize:"none",boxSizing:"border-box",
            lineHeight:1.8,fontWeight:500,transition:"border-color 0.2s"}}/>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          margin:"10px 0 14px",padding:"8px 14px",background:"#8B5CF611",borderRadius:12,
          border:"1.5px solid #8B5CF633"}}>
          <span style={{fontFamily:F,fontSize:"0.75rem",color:"#8B5CF6",fontWeight:700}}>
            🌱 投稿するとスレッドにも流れます
          </span>
          <span style={{fontFamily:F,fontWeight:900,fontSize:"0.82rem",color:"#8B5CF6",
            background:"#8B5CF622",padding:"3px 10px",borderRadius:99}}>
            ＋{SP_REPORT} SP
          </span>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{flex:1,padding:"14px",borderRadius:16,
            border:"3px solid #DFD4C8",background:"#fff",color:"#9E9E9E",
            fontFamily:F,fontWeight:800,fontSize:"0.9rem",cursor:"pointer"}}>あとで</button>
          <button onClick={()=>text.trim()&&onSave(text,SP_REPORT)} style={{flex:2,padding:"14px",
            borderRadius:16,border:"none",
            background:text.trim()?"#8B5CF6":"#DFD4C8",
            color:text.trim()?"#fff":"#9E9E9E",
            fontFamily:F,fontWeight:900,fontSize:"0.95rem",cursor:text.trim()?"pointer":"default",
            boxShadow:text.trim()?"0 4px 0 #6D28D9":"none",transition:"all 0.2s"}}>
            投稿する ＋{SP_REPORT}SP 🌱
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== CHANGE REPORT CARD (スレッド用) =====
function ChangeReportCard({ post, users, onAction }) {
  const [showAct, setShowAct] = useState(false);
  const [sympathy, setSympathy] = useState(post.sympathy||0);
  const [reacted, setReacted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const author = users.find(u=>u.id===post.userId)||users[0];
  const PURPLE = "#8B5CF6";
  const PURPLE_DEEP = "#6D28D9";
  const lines = post.text.split("\n").filter(Boolean);
  const preview = lines.slice(0,3).join("\n");
  const hasMore = post.text.length > preview.length + 5;

  return (
    <div style={{background:"#FAF7FD",borderRadius:22,padding:"16px 16px 14px",marginBottom:12,
      boxShadow:"0 5px 0 "+PURPLE+"44, 0 2px 10px rgba(0,0,0,0.04)",
      border:"2px solid "+PURPLE+"44"}}>
      {/* バッジ */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
        <div style={{width:40,height:40,borderRadius:"50%",
          background:"linear-gradient(135deg,"+PURPLE+","+PURPLE_DEEP+")",
          display:"flex",alignItems:"center",justifyContent:"center",
          fontSize:"1.4rem",boxShadow:"0 3px 0 "+PURPLE_DEEP,overflow:"hidden"}}>
          {author.iconType==="url"
            ?<img src={author.icon} style={{width:40,height:40,borderRadius:"50%",objectFit:"cover"}} alt=""/>
            :author.icon}
        </div>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            <span style={{fontFamily:F,fontWeight:900,fontSize:"0.82rem",color:"#383838"}}>{author.nickname}</span>
            <span style={{background:PURPLE,color:"#fff",fontSize:"0.6rem",padding:"2px 8px",
              borderRadius:99,fontFamily:F,fontWeight:900,boxShadow:"0 2px 0 "+PURPLE_DEEP,
              display:"flex",alignItems:"center",gap:3}}>
              🌱 変化レポート
            </span>
            {post.period&&<span style={{fontFamily:F,fontSize:"0.6rem",color:PURPLE,fontWeight:700,
              background:PURPLE+"15",padding:"2px 7px",borderRadius:99}}>{post.period}</span>}
          </div>
          <div style={{fontSize:"0.62rem",color:"#9E9E9E",marginTop:2,fontFamily:F,fontWeight:500}}>{post.time}</div>
        </div>
      </div>

      {/* 本文 */}
      <p style={{margin:"0 0 4px 0",lineHeight:1.9,fontFamily:F,fontSize:"0.88rem",
        color:"#383838",fontWeight:500,whiteSpace:"pre-line"}}>
        {expanded ? post.text : preview}
      </p>
      {hasMore&&(
        <button onClick={()=>setExpanded(!expanded)} style={{background:"none",border:"none",
          cursor:"pointer",fontFamily:F,fontWeight:800,fontSize:"0.72rem",color:PURPLE,
          padding:"2px 0 10px"}}>
          {expanded?"▲ 閉じる":"▼ 続きを読む"}
        </button>
      )}

      {/* アクション */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginTop:8}}>
        <button onClick={()=>{if(!reacted){setReacted(true);setSympathy(s=>s+1);}}} style={{
          display:"flex",alignItems:"center",gap:6,
          background:reacted?"#DD2475":"#DFD4C8",border:"none",
          borderRadius:99,padding:"7px 14px",cursor:"pointer",
          boxShadow:reacted?"0 3px 0 #B01A5C":"0 3px 0 #C8BDB0",
          transform:reacted?"scale(1.05)":"scale(1)",transition:"all 0.15s",
        }}>
          <img src={reacted?ICON_THANKS_WHITE:ICON_THANKS_PINK} alt="共感" style={{width:16,height:16,objectFit:"contain"}}/>
          <span style={{fontFamily:F,fontWeight:800,fontSize:"0.75rem",color:reacted?"#fff":"#9E9E9E"}}>共感 {sympathy}</span>
        </button>
        <button onClick={()=>setShowAct(!showAct)} style={{
          background:showAct?"#D8C1DD":"#DFD4C8",border:"none",borderRadius:99,
          padding:"7px 14px",cursor:"pointer",fontFamily:F,fontWeight:800,
          fontSize:"0.72rem",color:showAct?"#383838":"#9E9E9E",
          boxShadow:showAct?"0 3px 0 #D8C1DDaa":"0 3px 0 #C8BDB0",
          display:"flex",alignItems:"center",gap:6,transition:"all 0.2s",
        }}>
          <img src={ICON_THANKS_PINK} alt="" style={{width:14,height:14,objectFit:"contain"}}/>
          <span style={{color:"#DD2475"}}>Thanks</span>
          <span style={{color:"#9E9E9E"}}>/</span>
          <img src={ICON_AWARE_GRAY} alt="" style={{width:14,height:14,objectFit:"contain"}}/>
          <span style={{color:"#70BF4F"}}>Aware</span>
        </button>
      </div>
      {showAct&&(
        <div style={{display:"flex",gap:8,marginTop:10,animation:"fadeIn 0.2s ease"}}>
          <ActionButton label="Thanks" iconWhite={ICON_THANKS_WHITE} iconColor={ICON_THANKS_PINK}
            color="#DD2475" colorDeep="#B01A5C" sp={1} small
            onAction={(e)=>{onAction(e,"thanks");setShowAct(false);}}/>
          <ActionButton label="Awareness" iconWhite={ICON_AWARE_WHITE} iconColor={ICON_AWARE_GRAY}
            color="#70BF4F" colorDeep="#509A33" sp={3} small
            onAction={(e)=>{onAction(e,"awareness");setShowAct(false);}}/>
        </div>
      )}
    </div>
  );
}

// ===== OVERLAP INSIGHT (三角2色) =====
function OverlapInsight({ thanks, awareness }) {
  return (<div style={{background:"#fff",borderRadius:22,padding:"18px",marginBottom:16,boxShadow:"0 5px 0 #DFD4C8",border:"2px solid #DFD4C8"}}><div style={{fontFamily:F,fontWeight:900,fontSize:"0.88rem",color:"#383838",marginBottom:8}}>💡 感謝が気づきに変わった日</div><div style={{textAlign:"center",padding:"16px 0"}}><span style={{fontFamily:F,fontWeight:900,fontSize:"3rem",color:"#DD2475"}}>{thanks===0?0:Math.min(Math.round((awareness/thanks)*100),100)}</span><span style={{fontFamily:F,fontWeight:900,fontSize:"1.4rem",color:"#9E9E9E"}}>%</span></div><div style={{fontFamily:F,fontSize:"0.78rem",color:"#9E9E9E",textAlign:"center"}}>感謝した日のうち気づきが生まれた割合</div></div>);
}


// ===== LOG LIST (マイページ内タブ付きリスト) =====
const MOCK_LOGS = [
  {id:1,type:"thanks", text:"朝、妻がお弁当を作ってくれた。",            time:"今日 08:12", hasText:true,  editing:false},
  {id:2,type:"thanks", text:"",                                          time:"今日 10:34", hasText:false, editing:false},
  {id:3,type:"awareness",text:"急がなくても物事は進むんだと気づいた。",   time:"今日 12:05", hasText:true,  editing:false},
  {id:4,type:"thanks", text:"同僚が資料まとめを手伝ってくれた。",          time:"昨日 15:20", hasText:true,  editing:false},
  {id:5,type:"awareness",text:"",                                         time:"昨日 19:44", hasText:false, editing:false},
  {id:6,type:"thanks", text:"",                                           time:"2日前 07:55", hasText:false, editing:false},
  {id:7,type:"thanks", text:"電車で席を譲ってもらった。",                  time:"2日前 09:10", hasText:true,  editing:false},
  {id:8,type:"awareness",text:"比べるのをやめたら心が軽くなった。",        time:"3日前 21:30", hasText:true,  editing:false},
];

function LogList() {
  return (<div style={{background:"#fff",borderRadius:22,padding:"18px 16px",boxShadow:"0 5px 0 #DFD4C8",border:"2px solid #DFD4C8"}}><div style={{fontFamily:F,fontWeight:900,fontSize:"0.88rem",color:"#383838",marginBottom:14}}>📖 わたしの記録</div><div style={{fontFamily:F,fontSize:"0.8rem",color:"#9E9E9E",textAlign:"center",padding:"24px 0"}}>記録はここに表示されます</div></div>);
}


// ===== MY PAGE (設定ギアアイコン統合) =====
function LevelCard({ sp, onOpenSettings, user }) {
  const lv = getLevel(sp);
  const [barW, setBarW] = useState(0);
  useEffect(()=>{ setTimeout(()=>setBarW(lv.progress), 400); }, [lv.progress]);

  const chapterColors = {
    "しずくの章":   [C.thanks, C.sub4],
    "波紋の章":     ["#5BBCEE", "#3A8FD0"],
    "せせらぎの章": [C.awareness, "#3A8A28"],
    "恵みの雨の章": ["#9B6FC0", "#6B3FA0"],
    "THAWARの章":  [C.sp, C.sub3],
  };
  const [colA, colB] = chapterColors[lv.chapter] || [C.thanks, C.sub4];

  return (
    <div style={{background:C.white, borderRadius:24, padding:"22px 20px", textAlign:"center",
      marginBottom:16, boxShadow:"0 5px 0 #DFD4C8", border:("2px solid "+C.sub2), position:"relative"}}>
      <button onClick={onOpenSettings} style={{
        position:"absolute", top:14, right:14,
        width:36, height:36, borderRadius:"50%",
        background:C.sub1, border:("2px solid "+C.sub2),
        display:"flex", alignItems:"center", justifyContent:"center",
        cursor:"pointer", fontSize:"1.1rem",
        boxShadow:"0 2px 0 #C8BDB0",
      }}>⚙️</button>

      {/* アバター */}
      <div style={{width:76, height:76, borderRadius:"50%",
        background:("linear-gradient(135deg,"+colA+","+colB+")"),
        margin:"0 auto 12px", display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:"2.4rem", boxShadow:("0 5px 0 "+colA+"88"), overflow:"hidden",
        border:("3px solid "+C.sp)}}>
        {user.iconType==="url"
          ? <img src={user.icon} style={{width:76,height:76,objectFit:"cover"}} alt=""/>
          : user.icon}
      </div>

      <div style={{fontFamily:F, fontWeight:900, fontSize:"1.1rem", color:C.text}}>{user.nickname}</div>

      {/* 章名 */}
      <div style={{display:"inline-flex", alignItems:"center", gap:4,
        background:(colA+"18"), border:("1.5px solid "+colA+"55"),
        borderRadius:99, padding:"3px 12px", margin:"6px 0 2px"}}>
        <span style={{fontSize:"0.85rem"}}>{lv.emoji}</span>
        <span style={{fontFamily:F, fontSize:"0.65rem", color:colA, fontWeight:900}}>{lv.chapter}</span>
      </div>

      {/* レベル名 */}
      <div style={{fontFamily:F, fontSize:"0.82rem", color:C.text, fontWeight:900, marginBottom:10}}>
        {lv.name}
      </div>

      {/* XPバー */}
      <div style={{background:C.sub2, borderRadius:99, height:12, overflow:"hidden", marginBottom:4}}>
        <div style={{width:barW+"%", height:"100%",
          background:("linear-gradient(90deg,"+colA+","+colB+")"),
          borderRadius:99,
          transition:"width 1.2s cubic-bezier(0.34,1.1,0.64,1)",
          boxShadow:("0 0 8px "+colA+"66")}}/>
      </div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div style={{fontFamily:F, fontSize:"0.6rem", color:colA, fontWeight:800}}>
          {sp.toLocaleString()} SP
        </div>
        {lv.next ? (
          <div style={{fontFamily:F, fontSize:"0.6rem", color:C.gray, fontWeight:700}}>
            次: {lv.next[1]} （{lv.nextSP.toLocaleString()} SP）
          </div>
        ) : (
          <div style={{fontFamily:F, fontSize:"0.6rem", color:C.sp, fontWeight:900}}>✦ 最高位到達</div>
        )}
      </div>
      {lv.next && (
        <div style={{fontFamily:F, fontSize:"0.6rem", color:C.gray, fontWeight:700, marginTop:2}}>
          あと {(lv.nextSP - sp).toLocaleString()} SP で次のレベル ({lv.progress}%)
        </div>
      )}
    </div>
  );
}

function MyPage({ user, sp, thanks, awareness, onOpenSettings, onOpenChangeReport, hasChangeReportNotif }) {
  const weekData=[12,8,15,22,11,30,18];
  const days=["月","火","水","木","金","土","日"];
  const maxVal=Math.max(...weekData);
  const bonuses=[{days:1,sp:1},{days:3,sp:2},{days:7,sp:5},{days:10,sp:10},{days:30,sp:30}];
  return (
    <div>
      <LevelCard sp={sp} onOpenSettings={onOpenSettings} user={user}/>

      {/* 変化レポートCTA */}
      <div style={{background: hasChangeReportNotif ? "#FAF7FD" : "#FAF7FD",
        borderRadius:20, padding:"16px 18px", marginBottom:16,
        boxShadow: hasChangeReportNotif ? "0 5px 0 #8B5CF644" : "0 4px 0 #DFD4C8",
        border: hasChangeReportNotif ? "2px solid #8B5CF644" : "2px solid #DFD4C8",
        display:"flex", alignItems:"center", gap:14}}>
        <div style={{fontSize:"2.2rem", lineHeight:1, flexShrink:0}}>🌱</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:F, fontWeight:900, fontSize:"0.85rem",
            color: hasChangeReportNotif ? "#8B5CF6" : "#383838", marginBottom:3}}>
            {hasChangeReportNotif ? "変化レポートを投稿しませんか？" : "変化レポートを書く"}
          </div>
          <div style={{fontFamily:F, fontSize:"0.7rem", color:"#9E9E9E", fontWeight:600, lineHeight:1.6}}>
            感謝・気づきを続けて感じた変化を記録しよう
          </div>
        </div>
        <button onClick={onOpenChangeReport} style={{
          background:"#8B5CF6", border:"none", borderRadius:14,
          padding:"10px 16px", cursor:"pointer",
          fontFamily:F, fontWeight:900, fontSize:"0.78rem", color:"#fff",
          boxShadow:"0 4px 0 #6D28D9", flexShrink:0,
          display:"flex", flexDirection:"column", alignItems:"center", gap:2}}>
          <span>書く</span>
          <span style={{fontSize:"0.6rem", opacity:0.9}}>＋3SP</span>
        </button>
      </div>

      {/* ステータス3カード */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
        {[
          {label:"Thanks",value:thanks,color:C.thanks,deep:C.thanksDeep,icon:ICON_THANKS_WHITE},
          {label:"Awareness",value:awareness,color:C.awareness,deep:C.awarenessDeep,icon:ICON_AWARE_WHITE},
          {label:"連続",value:(user.streak+"日"),color:C.sub3,deep:C.sub3Deep,emoji:"🔥"},
        ].map(s=>(
          <div key={s.label} style={{background:s.color,borderRadius:18,padding:"14px 8px",
            textAlign:"center",boxShadow:("0 5px 0 "+s.deep)}}>
            {s.icon?<img src={s.icon} alt={s.label} style={{width:28,height:28,objectFit:"contain",marginBottom:4}}/>
              :<div style={{fontSize:"1.5rem",marginBottom:2}}>{s.emoji}</div>}
            <div style={{fontFamily:F,fontSize:"1.3rem",fontWeight:900,color:"#fff",margin:"2px 0"}}>{s.value}</div>
            <div style={{fontSize:"0.6rem",color:"rgba(255,255,255,0.9)",fontFamily:F,fontWeight:700}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* SP */}
      <div style={{background:C.sp,boxShadow:("0 5px 0 "+C.spDeep),borderRadius:22,padding:"18px 20px",
        marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontFamily:F,fontSize:"0.65rem",color:"rgba(0,0,0,0.5)",fontWeight:800,letterSpacing:"0.1em",marginBottom:4}}>総保有 Signal Point</div>
          <div style={{fontFamily:F,fontSize:"2.2rem",fontWeight:900,color:C.text}}>{sp.toLocaleString()} <span style={{fontSize:"1rem"}}>SP</span></div>
        </div>
        <div style={{fontSize:"3rem"}}>✦</div>
      </div>

      {/* 重なり可視化 */}
      <OverlapInsight thanks={thanks} awareness={awareness}/>

      {/* 週間SP */}
      <div style={{background:C.white,borderRadius:22,padding:"18px 16px",marginBottom:16,
        boxShadow:"0 5px 0 #DFD4C8",border:("2px solid "+C.sub2)}}>
        <div style={{fontFamily:F,fontWeight:900,fontSize:"0.88rem",color:C.text,marginBottom:14}}>📈 直近7日間の獲得SP</div>
        <div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>
          {weekData.map((v,i)=>(
            <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div style={{fontFamily:F,fontWeight:900,fontSize:"0.6rem",color:i===6?C.sp:C.gray}}>{v}</div>
              <div style={{width:"100%",borderRadius:"8px 8px 0 0",height:(v/maxVal*55)+"px",
                background:i===6?C.sp:C.thanks+"66",
                boxShadow:i===6?("0 3px 0 "+C.spDeep):("0 3px 0 "+C.thanksDeep+"44")}}/>
              <div style={{fontSize:"0.62rem",color:i===6?C.sp:C.gray,fontFamily:F,fontWeight:800}}>{days[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 継続ボーナス */}
      <div style={{background:C.white,borderRadius:22,padding:"18px 16px",marginBottom:16,
        boxShadow:"0 5px 0 #DFD4C8",border:("2px solid "+C.sub2)}}>
        <div style={{fontFamily:F,fontWeight:900,fontSize:"0.88rem",color:C.text,marginBottom:14}}>🔥 継続ボーナス</div>
        {bonuses.map(b => (
            <div key={b.days} style={{display:"flex",alignItems:"center",justifyContent:"space-between",
              padding:"11px 14px",borderRadius:14,marginBottom:8,
              background:(user.streak>=b.days)?C.sp+"22":C.sub1,
              border:("2px solid "+((user.streak>=b.days)?C.sp+"88":"transparent"))}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:28,height:28,borderRadius:"50%",
                  background:(user.streak>=b.days)?C.sp:C.sub2,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:"0.85rem",fontFamily:F,fontWeight:900,
                  color:(user.streak>=b.days)?C.text:"#aaa",
                  boxShadow:(user.streak>=b.days)?("0 3px 0 "+C.spDeep):"none"}}>
                  {(user.streak>=b.days)?"V":"O"}
                </div>
                <span style={{fontFamily:F,fontWeight:800,fontSize:"0.82rem",
                  color:(user.streak>=b.days)?C.text:C.gray}}>{b.days}日継続</span>
              </div>
              <span style={{fontFamily:F,fontWeight:900,fontSize:"0.88rem",
                color:(user.streak>=b.days)?C.spDeep:C.gray,
                background:(user.streak>=b.days)?C.sp+"33":"transparent",
                padding:"3px 10px",borderRadius:99}}>+{b.sp} SP</span>
            </div>
        ))}

      </div>

      {/* 記録リスト */}
      <LogList/>
    </div>
  );
}

function LandingScreen({ onStart }) {
  const btnStyle = {
    display:"block", width:"100%", padding:"18px",
    borderRadius:20, border:"none",
    background:C.thanks, color:"#fff",
    fontFamily:F, fontWeight:900, fontSize:"1.05rem",
    cursor:"pointer", boxShadow:("0 5px 0 "+C.thanksDeep),
    letterSpacing:"0.04em",
  };
  const paraStyle = {
    fontFamily:F, fontSize:"0.95rem", color:C.text,
    fontWeight:600, lineHeight:1.9, marginBottom:0,
  };
  const indentStyle = {
    fontFamily:F, fontSize:"0.88rem", color:"#8a7a6e",
    fontWeight:600, lineHeight:1.85,
    paddingLeft:16, borderLeft:("3px solid "+C.sub3),
    marginBottom:0,
  };
  return (
    <div style={{minHeight:"100vh", background:("linear-gradient(160deg,"+C.sub4+"55,"+C.sub1+")"),
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"flex-start", padding:"36px 20px 48px"}}>
      <div style={{width:"100%", maxWidth:390}}>
        {/* ロゴ */}
        <div style={{textAlign:"center", marginBottom:28}}>
          <img src={LOGO_PINK} alt="THAWAR" style={{height:64, objectFit:"contain"}}/>
          <div style={{fontFamily:F, fontSize:"0.78rem", color:C.gray, fontWeight:700,
            marginTop:10, letterSpacing:"0.08em"}}>感謝と気づきで、人生を軽く。</div>
        </div>
        {/* 上部ボタン */}
        <button onClick={onStart} style={btnStyle}>THAWARを利用する</button>
        {/* 説明文 */}
        <div style={{background:C.white, borderRadius:24, padding:"28px 22px",
          boxShadow:"0 6px 0 #DFD4C8", border:("2px solid "+C.sub2), marginTop:24,
          display:"flex", flexDirection:"column", gap:20}}>
          <p style={paraStyle}>最近イライラしていませんか？</p>
          <p style={paraStyle}>人間関係に悩んでいませんか？</p>
          <p style={paraStyle}>もっと楽に生きたいと思っていませんか？</p>
          <p style={{...paraStyle, color:C.thanks, fontWeight:800}}>
            THAWARは、そんなあなたのための小さな習慣アプリです。
          </p>
          <div style={{height:1, background:C.sub2}}/>
          <p style={paraStyle}>やることはとても簡単。</p>
          <p style={paraStyle}>
            「感謝ボタン」と「気づきボタン」を押して、日々の中で感じた感謝や気づきを記録するだけです。
          </p>
          <p style={paraStyle}>大きな出来事である必要はありません。</p>
          <div style={indentStyle}>
            美味しいコーヒーが飲めた。ありがとう。<br/>
            誰かが挨拶してくれた。ありがとう。<br/>
            今日も無事に一日を過ごせた。ありがとう。
          </div>
          <p style={paraStyle}>そんな小さな感謝で十分です。</p>
          <div style={{height:1, background:C.sub2}}/>
          <p style={paraStyle}>また、</p>
          <div style={indentStyle}>
            疲れているとイライラしやすいことに気づいた。<br/>
            笑顔で挨拶すると自分の気持ちも明るくなることに気づいた。<br/>
            朝の時間を少し大切にすると、一日が落ち着いて過ごせることに気づいた。
          </div>
          <p style={paraStyle}>そんな小さな気づきも大切な記録です。</p>
          <div style={{height:1, background:C.sub2}}/>
          <p style={paraStyle}>
            記録を続けるうちに、自分でも気づかなかった考え方の癖や、人との関わり方の変化が見えてくるかもしれません。
          </p>
          <p style={paraStyle}>THAWARは答えを教えるアプリではありません。</p>
          <p style={{...paraStyle, color:C.thanks, fontWeight:800}}>
            あなた自身の変化を映し出す鏡のようなアプリです。
          </p>
          <p style={paraStyle}>
            感謝や気づきの記録を続けることで生まれる変化を、ぜひ体験してみてください。
          </p>
        </div>
        {/* 下部ボタン */}
        <div style={{marginTop:28}}>
          <button onClick={onStart} style={btnStyle}>THAWARを利用する</button>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, onGoRegister }) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [showPass,setShowPass]=useState(false);

  const handleLogin=()=>{
    const u=DUMMY_USERS.find(u=>u.email===email&&u.password===password);
    if(u) onLogin(u);
    else setError("メールアドレスまたはパスワードが違います");
  };

  const Field=({label,value,onChange,type,ph,right})=>(
    <div style={{marginBottom:14}}>
      <div style={{fontFamily:F,fontWeight:800,fontSize:"0.78rem",color:C.text,marginBottom:6}}>{label}</div>
      <div style={{position:"relative"}}>
        <input value={value} onChange={e=>onChange(e.target.value)} type={type||"text"} placeholder={ph}
          style={{width:"100%",padding:"14px 16px",borderRadius:16,border:("2px solid "+C.sub2),
            fontFamily:F,fontSize:"0.95rem",color:C.text,background:C.white,outline:"none",boxSizing:"border-box"}}
          onFocus={e=>e.target.style.borderColor=C.thanks}
          onBlur={e=>e.target.style.borderColor=C.sub2}/>
        {right}
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:("linear-gradient(160deg,"+C.sub4+"55,"+C.sub1+")"),
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{width:"100%",maxWidth:390}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <img src={LOGO_PINK} alt="THAWAR" style={{height:52,objectFit:"contain"}}/>
          <div style={{fontFamily:F,fontSize:"0.78rem",color:C.gray,fontWeight:700,marginTop:10,letterSpacing:"0.08em"}}>感謝と気づきで、人生を軽く。</div>
        </div>
        <div style={{background:C.white,borderRadius:28,padding:"28px 24px",
          boxShadow:"0 7px 0 #DFD4C8",border:("2px solid "+C.sub2)}}>
          <div style={{fontFamily:F,fontWeight:900,fontSize:"1.2rem",color:C.text,marginBottom:20,textAlign:"center"}}>ログイン</div>
          <Field label="メールアドレス" value={email} onChange={setEmail} ph="example@email.com"/>
          <Field label="パスワード" value={password} onChange={setPassword} type={showPass?"text":"password"} ph="パスワード"
            right={<button onClick={()=>setShowPass(!showPass)} style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:"1.1rem"}}>{showPass?"●":"●️"}</button>}/>
          {error&&<div style={{background:"#FFE8E8",border:"2px solid #FFB3B3",borderRadius:12,padding:"10px 14px",
            fontFamily:F,fontSize:"0.8rem",color:"#D9534F",fontWeight:700,marginBottom:14}}>⚠️ {error}</div>}
          <button onClick={handleLogin} style={{width:"100%",padding:"16px",borderRadius:18,border:"none",
            background:C.thanks,color:"#fff",fontFamily:F,fontWeight:900,fontSize:"1rem",cursor:"pointer",
            boxShadow:("0 5px 0 "+C.thanksDeep),marginBottom:14}}>ログイン</button>
          <div style={{textAlign:"center"}}>
            <span style={{fontFamily:F,fontSize:"0.82rem",color:C.gray,fontWeight:600}}>アカウントをお持ちでない方は </span>
            <button onClick={onGoRegister} style={{background:"none",border:"none",cursor:"pointer",
              fontFamily:F,fontWeight:900,fontSize:"0.82rem",color:C.thanks,textDecoration:"underline"}}>新規登録</button>
          </div>
        </div>
        <div style={{background:C.white,borderRadius:20,padding:"16px",marginTop:14,
          boxShadow:"0 4px 0 #DFD4C8",border:("2px solid "+C.sub2)}}>
          <div style={{fontFamily:F,fontSize:"0.72rem",color:C.gray,fontWeight:800,marginBottom:6}}>📋 テスト用アカウント</div>
          <div style={{fontFamily:F,fontSize:"0.7rem",color:C.text,fontWeight:600,lineHeight:1.8}}>
            メール: yuki@example.com<br/>パスワード: pass1234
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== REGISTER =====
function RegisterScreen({ onRegister, onBack }) {
  return (<div style={{minHeight:"100vh",background:"linear-gradient(160deg,#D8C1DD55,#FCF8F5)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px"}}><div style={{width:"100%",maxWidth:390,background:"#fff",borderRadius:28,padding:"28px 24px",boxShadow:"0 7px 0 #DFD4C8",border:"2px solid #DFD4C8"}}><div style={{fontFamily:F,fontWeight:900,fontSize:"1.2rem",color:"#383838",marginBottom:20,textAlign:"center"}}>新規登録</div><button onClick={()=>onRegister({id:99,nickname:"テスト",email:"test@example.com",password:"pass",icon:"●",iconType:"emoji",streak:0,sp:0,thanks:0,awareness:0})} style={{width:"100%",padding:"16px",borderRadius:18,border:"none",background:"#DD2475",color:"#fff",fontFamily:F,fontWeight:900,fontSize:"1rem",cursor:"pointer",boxShadow:"0 5px 0 #B01A5C",marginBottom:14}}>登録してはじめる 🎉</button><div style={{textAlign:"center"}}><button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",fontFamily:F,fontWeight:800,fontSize:"0.82rem",color:"#9E9E9E"}}>← ログインに戻る</button></div></div></div>);
}

// ===== SETTINGS =====
function SettingsScreen({ user, onUpdate, onLogout }) {
  return (<div><div style={{background:"#fff",borderRadius:22,padding:"20px",boxShadow:"0 5px 0 #DFD4C8",border:"2px solid #DFD4C8",marginBottom:16}}><div style={{fontFamily:F,fontWeight:900,fontSize:"0.9rem",color:"#383838",marginBottom:16}}>👤 プロフィール設定</div><div style={{fontFamily:F,fontSize:"0.85rem",color:"#9E9E9E",marginBottom:16}}>ニックネーム: {user.nickname}</div><button onClick={()=>onUpdate(user)} style={{width:"100%",padding:"14px",borderRadius:16,border:"none",background:"#DD2475",color:"#fff",fontFamily:F,fontWeight:900,fontSize:"0.9rem",cursor:"pointer",boxShadow:"0 4px 0 #B01A5C",marginBottom:12}}>保存</button><button onClick={onLogout} style={{width:"100%",padding:"14px",borderRadius:16,border:"2px solid #DFD4C8",background:"#fff",color:"#9E9E9E",fontFamily:F,fontWeight:800,fontSize:"0.9rem",cursor:"pointer"}}>ログアウト</button></div></div>);
}


// ===== MAIN APP =====

// ===== MAIN APP =====


export default function THAWARApp() {
  const [screen,setScreen]=useState("landing");
  const [currentUser,setCurrentUser]=useState(null);
  const [appTab,setAppTab]=useState("home");
  const [showSettings,setShowSettings]=useState(false);
  const [notifications,setNotifications]=useState([
    {id:1,type:"post_thanks",    message:"「電車でお年寄りに席を譲れた…」を読んで、感謝が生まれたユーザーがいます",       time:"5分前",   read:false},
    {id:2,type:"post_awareness", message:"「焦っているとき、深呼吸ひとつで…」を読んで、気づきが生まれたユーザーがいます",   time:"28分前",  read:false},
    {id:3,type:"post_thanks",    message:"「雨が上がって、空がきれいだった…」を読んで、感謝が生まれたユーザーがいます",     time:"1時間前", read:false},
    {id:4,type:"my_thanks",      message:"感謝が記録されました ❤️ 今日も素敵な一日ですね",                                time:"2時間前", read:true},
    {id:5,type:"my_awareness",   message:"前向きな気づきが記録されました ✨ あなたの視点が変わっています",                 time:"昨日",    read:true},
    {id:6,type:"change_report",  message:"先月から1ヶ月が経ちました。変化レポートを書いてみませんか？ ＋3SP",              time:"今日",    read:false},
  ]);
  const [showNotif,setShowNotif]=useState(false);
  const [sp,setSP]=useState(284);
  const [thanks,setThanks]=useState(47);
  const [awareness,setAwareness]=useState(23);
  const [confetti,setConfetti]=useState([]);
  const [toasts,setToasts]=useState([]);
  const [popup,setPopup]=useState(null);
  const [showChangeReport,setShowChangeReport]=useState(false);
  const [threadPosts,setThreadPosts]=useState(mockPosts);
  const idRef=useRef(0);
  const nextId=()=>++idRef.current;

  const spawnConfetti=(x,y,color)=>{const id=nextId();setConfetti(c=>[...c,{id,x,y,color}]);};
  const removeConfetti=(id)=>setConfetti(c=>c.filter(x=>x.id!==id));
  const showToast=(spAmt,color)=>{const id=nextId();setToasts(t=>[...t,{id:id,sp:spAmt,color:color}]);};
  const removeToast=(id)=>setToasts(t=>t.filter(x=>x.id!==id));

  const handleLogin=(u)=>{setCurrentUser(u);setSP(u.sp);setThanks(u.thanks);setAwareness(u.awareness);setScreen("app");};
  const handleRegister=(u)=>{setCurrentUser(u);setSP(0);setThanks(0);setAwareness(0);setScreen("app");};
  const handleLogout=()=>{setCurrentUser(null);setScreen("login");setAppTab("home");setShowSettings(false);};

  const pushNotif=(type,message)=>{
    const id=nextId();
    const times=["たった今","1分前","2分前"];
    setNotifications(ns=>[{id:id,type:type,message:message,time:times[0],read:false},...ns]);
  };

  const readAll=()=>setNotifications(ns=>ns.map(n=>({...n,read:true})));

  const handleChangeReportSave=(text, spAmt)=>{
    const newId = Date.now();
    const newPost = {
      id: newId, type:"change_report",
      text, time:"たった今",
      sympathy:0,
      userId: currentUser ? currentUser.id : 1,
      period:"記録中",
    };
    setThreadPosts(ps=>[newPost,...ps]);
    setSP(s=>s+spAmt);
    pushNotif("change_report","変化レポートを投稿しました 🌱 ＋"+spAmt+"SP獲得！");
    setShowChangeReport(false);
    setAppTab("thread");
  };

  const hasChangeReportNotif = notifications.some(n=>n.type==="change_report"&&!n.read);
  const readOne=(id)=>setNotifications(ns=>ns.map(n=>n.id===id?{...n,read:true}:n));

  // 他ユーザーが自分の投稿から感謝・気づきを押したシミュレーション（30〜60秒ごとにランダム）
  const myPosts = [
    {text:"電車でお年寄りに席を譲れた。小さなことだけど今日一番の誇り。", type:"thanks"},
    {text:"比較するのをやめた瞬間、自分のペースが見えてきた。",           type:"awareness"},
    {text:"雨が上がって、空がきれいだった。自然にも感謝できた。",         type:"thanks"},
  ];
  const otherNames = ["はな","たろう","さくら","けんじ","あおい","だいすけ"];
  useEffect(()=>{
    if(screen!=="app") return;
    const iv = setInterval(()=>{
      const post = myPosts[Math.floor(Math.random()*myPosts.length)];
      const name = otherNames[Math.floor(Math.random()*otherNames.length)];
      const type = Math.random()<0.5 ? "post_thanks" : "post_awareness";
      const action = type==="post_thanks" ? "感謝" : "気づき";
      pushNotif(type, (name+"さんが「"+post.text.slice(0,18)+"…」を読んで"+action+"が生まれました"));
    }, 30000 + Math.random()*30000);
    return ()=>clearInterval(iv);
  }, [screen]);

  const doAction=(e,type)=>{
    const rect=e.currentTarget.getBoundingClientRect();
    const x=rect.left+rect.width/2, y=rect.top+rect.height/2;
    if(type==="thanks"){
      spawnConfetti(x,y,C.thanks);
      setSP(s=>s+1);setThanks(t=>t+1);showToast(1,C.thanks);
      pushNotif("my_thanks","感謝が記録されました ❤️ 今日も素敵な一日ですね");
      setTimeout(()=>setPopup("thanks"),500);
    } else {
      spawnConfetti(x,y,C.awareness);
      setSP(s=>s+3);setAwareness(a=>a+1);showToast(3,C.awareness);
      pushNotif("my_awareness","前向きな気づきが記録されました ✨ あなたの視点が変わっています");
      setTimeout(()=>setPopup("awareness"),500);
    }
  };

  const handleSave=(text,bonusSP)=>{
    setSP(s=>s+bonusSP);
    showToast(bonusSP,popup==="awareness"?C.awareness:C.thanks);
    setPopup(null);
  };

  const CSS=`
    @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    @keyframes slideUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
    @keyframes fadeIn{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
    @keyframes slideInRight{from{transform:translateX(100%);opacity:0;}to{transform:translateX(0);opacity:1;}}
    @keyframes slideInFromRight{from{transform:translateX(100%);}to{transform:translateX(0);}}
    @keyframes popIn{0%{transform:scale(0);}60%{transform:scale(1.2);}100%{transform:scale(1);}}
    ::-webkit-scrollbar{display:none;}
    button{-webkit-tap-highlight-color:transparent;}
  `;

  // 3タブのみ
  const tabs=[
    {key:"home",   label:"ホーム",   emoji:"[Home]"},
    {key:"thread", label:"スレッド", emoji:"💬"},
    {key:"mypage", label:"自分",     emoji:"👤"},
  ];

  if(screen==="landing") return (<><style>{CSS}</style><LandingScreen onStart={()=>setScreen("login")}/></>);
  if(screen==="login") return (<><style>{CSS}</style><LoginScreen onLogin={handleLogin} onGoRegister={()=>setScreen("register")}/></>);
  if(screen==="register") return (<><style>{CSS}</style><RegisterScreen onRegister={handleRegister} onBack={()=>setScreen("login")}/></>);

  return (
    <><style>{CSS}</style><div style={{minHeight:"100vh",background:C.sub2,fontFamily:F,display:"flex",justifyContent:"center",alignItems:"flex-start"}}>
      <div style={{width:"100%",maxWidth:390,minHeight:"100vh",background:C.sub1,position:"relative",overflow:"hidden",boxShadow:"0 0 60px rgba(0,0,0,0.2)"}}>

        {/* Header */}
        <div style={{background:C.sub1,padding:"52px 20px 14px",position:"sticky",top:0,zIndex:100,borderBottom:("2px solid "+C.sub2)}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <img src={LOGO_PINK} alt="THAWAR" style={{height:34,objectFit:"contain"}}/>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <NotificationBell notifications={notifications} onOpen={()=>setShowNotif(true)}/>
              <StreakFlame days={currentUser?.streak||0}/>
              <div style={{background:C.sp,borderRadius:99,padding:"6px 14px",
                display:"flex",alignItems:"center",gap:5,boxShadow:("0 3px 0 "+C.spDeep)}}>
                <span style={{fontSize:"0.85rem"}}>✦</span>
                <span style={{fontFamily:F,fontWeight:900,fontSize:"1rem",color:C.text}}>{sp.toLocaleString()}</span>
                <span style={{fontSize:"0.65rem",color:C.text+"99",fontWeight:800}}>SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{padding:"20px 20px 100px",overflowY:"auto",maxHeight:"calc(100vh - 120px)"}}>

          {appTab==="home"&&(
            <div style={{animation:"fadeIn 0.3s ease"}}>
              <LiveCounter thanks={189432} awareness={94218}/>
              <div style={{display:"flex",gap:14,marginBottom:20}}>
                <ActionButton label="Thanks" iconWhite={ICON_THANKS_WHITE} iconColor={ICON_THANKS_PINK}
                  color={C.thanks} colorDeep={C.thanksDeep} sp={1} onAction={(e)=>doAction(e,"thanks")}/>
                <ActionButton label="Awareness" iconWhite={ICON_AWARE_WHITE} iconColor={ICON_AWARE_GRAY}
                  color={C.awareness} colorDeep={C.awarenessDeep} sp={3} onAction={(e)=>doAction(e,"awareness")}/>
              </div>
              <div style={{background:C.white,borderRadius:22,padding:"18px",
                boxShadow:"0 5px 0 #DFD4C8",border:("2px solid "+C.sub2),marginBottom:16}}>
                <div style={{fontFamily:F,fontWeight:900,fontSize:"0.88rem",color:C.text,marginBottom:14}}>📅 今日の記録</div>
                <div style={{display:"flex",gap:10}}>
                  {[
                    {label:"Thanks",value:thanks,color:C.thanks,deep:C.thanksDeep,icon:ICON_THANKS_WHITE},
                    {label:"Awareness",value:awareness,color:C.awareness,deep:C.awarenessDeep,icon:ICON_AWARE_WHITE},
                  ].map(s=>(
                    <div key={s.label} style={{flex:1,background:s.color,borderRadius:16,padding:"14px",textAlign:"center",boxShadow:("0 4px 0 "+s.deep)}}>
                      <img src={s.icon} alt={s.label} style={{width:28,height:28,objectFit:"contain",marginBottom:6}}/>
                      <div style={{fontFamily:F,fontSize:"1.8rem",fontWeight:900,color:"#fff"}}>{s.value}</div>
                      <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.9)",fontFamily:F,fontWeight:700}}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{background:C.white,borderRadius:20,padding:"16px",
                border:("2px dashed "+C.sub2),display:"flex",alignItems:"center",gap:12}}>
                <div style={{fontSize:"2rem"}}>💡</div>
                <p style={{fontFamily:F,fontSize:"0.8rem",color:C.gray,lineHeight:1.7,fontWeight:500}}>
                  ボタンを押すだけでOK！<br/>
                  <span style={{color:C.thanks,fontWeight:800}}>Thanks</span> か <span style={{color:C.awareness,fontWeight:800}}>Awareness</span> で今日を記録しよう。
                </p>
              </div>
            </div>
          )}

          {appTab==="thread"&&(
            <div style={{animation:"fadeIn 0.3s ease"}}>
              <div style={{fontFamily:F,fontWeight:800,fontSize:"0.8rem",color:C.gray,marginBottom:14,letterSpacing:"0.06em"}}>💬 みんなの感謝と気づき</div>
              {threadPosts.map(post=>(
                post.type==="change_report"
                  ? <ChangeReportCard key={post.id} post={post} users={DUMMY_USERS}
                      onAction={(e,type)=>doAction(e,type)}/>
                  : <PostCard key={post.id} post={post} users={DUMMY_USERS}
                      onAction={(e,type)=>doAction(e,type)}
                      onSympathy={(p)=>pushNotif(p.type==="thanks"?"post_thanks":"post_awareness",("「"+p.text.slice(0,22)+"…」を読んで、"+p.type==="thanks"?"感謝":"気づき"+"が生まれたユーザーがいます"))}
                    />
              ))}
            </div>
          )}

          {appTab==="mypage"&&!showSettings&&(
            <div style={{animation:"fadeIn 0.3s ease"}}>
              <MyPage
                user={currentUser||DUMMY_USERS[0]}
                sp={sp} thanks={thanks} awareness={awareness}
                onOpenSettings={()=>setShowSettings(true)}
                onOpenChangeReport={()=>setShowChangeReport(true)}
                hasChangeReportNotif={hasChangeReportNotif}
              />
            </div>
          )}

          {appTab==="mypage"&&showSettings&&(
            <div style={{animation:"slideInRight 0.3s ease"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
                <button onClick={()=>setShowSettings(false)} style={{
                  width:36,height:36,borderRadius:"50%",
                  background:C.white,border:("2px solid "+C.sub2),
                  display:"flex",alignItems:"center",justifyContent:"center",
                  cursor:"pointer",fontSize:"1.1rem",
                  boxShadow:"0 2px 0 #C8BDB0",
                }}>←</button>
                <div style={{fontFamily:F,fontWeight:900,fontSize:"1rem",color:C.text}}>⚙️ 設定</div>
              </div>
              <SettingsScreen
                user={currentUser||DUMMY_USERS[0]}
                onUpdate={u=>{setCurrentUser(u);setShowSettings(false);}}
                onLogout={handleLogout}
              />
            </div>
          )}
        </div>

        {/* Tab Bar（3タブ） */}
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",
          width:"100%",maxWidth:390,background:C.white,borderTop:("2px solid "+C.sub2),
          display:"flex",padding:"10px 0 24px",zIndex:200,
          boxShadow:"0 -4px 20px rgba(0,0,0,0.06)"}}>
          {tabs.map(t => (
              <button key={t.key} onClick={()=>{setAppTab(t.key);if(t.key!=="mypage")setShowSettings(false);}} style={{
                flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,
                background:"transparent",border:"none",cursor:"pointer",padding:"4px 0",
              }}>
                <div style={{width:52,height:36,borderRadius:14,
                  background:(appTab===t.key&&!showSettings)?C.thanks+"25":"transparent",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:"1.3rem",transition:"background 0.2s"}}>{t.emoji}</div>
                <span style={{fontSize:"0.62rem",fontFamily:F,fontWeight:900,
                  color:(appTab===t.key&&!showSettings)?C.thanks:C.gray}}>{t.label}</span>
              </button>
          ))}

        </div>
      </div>

      {showNotif&&(
        <NotificationPanel
          notifications={notifications}
          onClose={()=>setShowNotif(false)}
          onReadAll={()=>{readAll();}}
          onReadOne={readOne}
        />
      )}
      {confetti.map(c=><Confetti key={c.id} {...c} onDone={()=>removeConfetti(c.id)}/>)}
      {toasts.map(t=><XPToast key={t.id} {...t} onDone={()=>removeToast(t.id)}/>)}
      {popup&&<InputPopup type={popup} onSave={handleSave} onClose={()=>setPopup(null)}/>}
      {showChangeReport&&<ChangeReportModal onSave={handleChangeReportSave} onClose={()=>setShowChangeReport(false)}/>}
    </div></>
  );
}
