import React, { useState, useEffect } from 'react';

const injectCSS = () => {
  if (document.getElementById("ow-css")) return;
  const s = document.createElement("style");
  s.id = "ow-css";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
    :root {
      --bg:#F6F2EE;--bg2:#EDEAE6;--card:#FFF;--text:#2A1F17;--text2:#7A6D60;--text3:#B5A89A;
      --ink:#3B2F24;--teal:#3D7A6B;--teal-bg:#E6F2EE;--teal2:#2C5F52;
      --amber:#C4873B;--amber-bg:#FFF4E6;
      --red:#B84A4A;--red-bg:#FDEAEA;
      --green:#4A8B5C;--green-bg:#E8F5EB;
      --bdr:#E8E0D8;--bdr2:#D9CFC4;
      --fd:'Libre Baskerville',Georgia,serif;--fb:'Outfit',-apple-system,sans-serif;
      --rad:16px;--rads:12px;--radx:8px;--mw:520px;
      --sh:0 1px 12px rgba(42,31,23,0.06);
    }
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:var(--bg)}
    .ow{font-family:var(--fb);color:var(--text);max-width:var(--mw);margin:0 auto;min-height:100vh;background:var(--bg);padding-bottom:40px}
    .ow input,.ow select,.ow button,.ow textarea{font-family:var(--fb)}
    .ow-hdr{padding:20px 20px 0;display:flex;align-items:center;justify-content:space-between}
    .ow-brand{display:flex;align-items:center;gap:12px}
    .ow-logo{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,var(--teal),var(--teal2));display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:700;box-shadow:0 4px 12px rgba(61,122,107,.25)}
    .ow-title{font-family:var(--fd);font-size:18px;font-weight:700}
    .ow-badge{font-size:11px;background:var(--teal-bg);color:var(--teal);padding:3px 10px;border-radius:10px;font-weight:600}
    .ow-status{margin:16px 20px 0;padding:14px 16px;border-radius:var(--rads);display:flex;align-items:center;justify-content:space-between}
    .ow-status.op{background:var(--green-bg);border:1px solid #C5DFC9}
    .ow-status.cl{background:var(--red-bg);border:1px solid #F5CDCD}
    .ow-status-left{display:flex;align-items:center;gap:10px}
    .ow-status-dot{width:8px;height:8px;border-radius:50%}
    .ow-status.op .ow-status-dot{background:var(--green);animation:pulse 2s infinite}
    .ow-status.cl .ow-status-dot{background:var(--red)}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    .ow-status-txt{font-weight:600;font-size:13px}
    .ow-status.op .ow-status-txt{color:var(--green)}
    .ow-status.cl .ow-status-txt{color:var(--red)}
    .tog{width:48px;height:28px;border-radius:14px;background:var(--bdr2);position:relative;cursor:pointer;transition:background .3s;border:none;flex-shrink:0}
    .tog.on{background:var(--green)}
    .tog::after{content:'';position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#fff;transition:transform .3s;box-shadow:0 2px 4px rgba(0,0,0,.15)}
    .tog.on::after{transform:translateX(20px)}
    .tog-s{width:40px;height:24px;border-radius:12px}
    .tog-s::after{width:18px;height:18px;top:3px;left:3px}
    .tog-s.on::after{transform:translateX(16px)}
    .ow-nav{display:flex;gap:2px;padding:16px 20px 0;background:var(--bg)}
    .ow-tab{flex:1;padding:10px 0;border:none;background:none;font-size:13px;font-weight:600;cursor:pointer;color:var(--text3);border-bottom:2px solid transparent;transition:all .2s;text-align:center}
    .ow-tab.on{color:var(--teal);border-bottom-color:var(--teal)}
    .ow-tab:hover{color:var(--text2)}
    .stats{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:16px 20px 0}
    .stat{padding:16px;border-radius:var(--rads);background:var(--card);border:1px solid var(--bdr);text-align:center}
    .stat-n{font-size:28px;font-weight:700;font-family:var(--fd)}
    .stat-l{font-size:10px;color:var(--text3);margin-top:4px;text-transform:uppercase;letter-spacing:1.5px;font-weight:600}
    .stat.accent .stat-n{color:var(--teal)}
    .stat.green .stat-n{color:var(--green)}
    .stat.amber .stat-n{color:var(--amber)}
    .ow-dates{display:flex;gap:6px;padding:16px 20px 0;overflow-x:auto;-webkit-overflow-scrolling:touch}
    .ow-dates::-webkit-scrollbar{display:none}
    .ow-dc{display:flex;flex-direction:column;align-items:center;padding:8px 14px;border-radius:var(--rads);border:1.5px solid var(--bdr);cursor:pointer;transition:all .2s;min-width:56px;flex-shrink:0;background:var(--card)}
    .ow-dc:hover{border-color:var(--teal)}
    .ow-dc.on{background:var(--teal);border-color:var(--teal);color:#fff}
    .ow-dc .d{font-size:10px;font-weight:700;text-transform:uppercase}
    .ow-dc .n{font-size:18px;font-weight:700;margin:1px 0}
    .ow-dc .c{font-size:9px;opacity:.7}
    .ow-crd{background:var(--card);border-radius:var(--rad);padding:20px;margin:16px 20px 0;box-shadow:var(--sh);border:1px solid var(--bdr);animation:ci .3s ease both}
    @keyframes ci{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    .ow-crd-t{font-family:var(--fd);font-size:18px;font-weight:700;margin-bottom:16px}
    .ow-crd-st{font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;font-weight:700}
    .bk-item{padding:16px;border-radius:var(--rads);border:1px solid var(--bdr);margin-bottom:10px;transition:all .2s;background:var(--card)}
    .bk-item:last-child{margin-bottom:0}
    .bk-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
    .bk-name{font-weight:700;font-size:15px}
    .bk-phone{font-size:12px;color:var(--text2);margin-top:2px}
    .bk-badge{padding:3px 10px;border-radius:10px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
    .bk-badge.confirmed{background:var(--amber-bg);color:var(--amber)}
    .bk-badge.completed{background:var(--green-bg);color:var(--green)}
    .bk-badge.cancelled{background:var(--red-bg);color:var(--red)}
    .bk-svcs{display:flex;flex-wrap:wrap;gap:5px;margin:8px 0}
    .bk-tag{padding:3px 10px;background:var(--teal-bg);color:var(--teal);border-radius:10px;font-size:11px;font-weight:600}
    .bk-time{font-size:12px;color:var(--text2);display:flex;align-items:center;gap:5px}
    .bk-charged{margin-top:8px;font-weight:700;color:var(--green);font-size:14px}
    .bk-actions{display:flex;gap:8px;margin-top:12px}
    .btn{padding:10px 16px;border:none;border-radius:var(--radx);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
    .btn-full{width:100%;justify-content:center;padding:14px}
    .btn-teal{background:var(--teal);color:#fff;box-shadow:0 2px 8px rgba(61,122,107,.2)}
    .btn-teal:hover{background:var(--teal2)}
    .btn-green{background:var(--green-bg);color:var(--green)}
    .btn-red{background:var(--red-bg);color:var(--red)}
    .btn-ghost{background:transparent;color:var(--text2);border:1.5px solid var(--bdr)}
    .svc-row{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--bdr)}
    .svc-row:last-child{border-bottom:none}
    .svc-info{flex:1;min-width:0}
    .svc-name{font-weight:600;font-size:14px}
    .svc-meta{font-size:12px;color:var(--text2);margin-top:2px}
    .svc-actions{display:flex;gap:6px;align-items:center}
    .svc-inactive{opacity:.4}
    .hrs-row{display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--bdr)}
    .hrs-row:last-child{border-bottom:none}
    .hrs-day{width:38px;font-weight:600;font-size:13px;flex-shrink:0}
    .hrs-times{display:flex;gap:6px;align-items:center;flex:1}
    .hrs-inp{padding:6px 8px;border:1px solid var(--bdr);border-radius:var(--radx);font-size:13px;width:80px;text-align:center;background:var(--bg);outline:none}
    .hrs-inp:focus{border-color:var(--teal)}
    .hrs-closed{font-size:13px;color:var(--text3);font-style:italic}
    .modal-bg{position:fixed;inset:0;z-index:50;background:rgba(42,31,23,.4);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;animation:fadeIn .2s ease}
    @keyframes fadeIn{from{opacity:0}}
    .modal-box{background:var(--card);border-radius:var(--rad) var(--rad) 0 0;width:100%;max-width:var(--mw);max-height:85vh;overflow-y:auto;padding:24px 20px 32px;animation:slideUp .3s cubic-bezier(.16,1,.3,1)}
    @keyframes slideUp{from{transform:translateY(100%)}}
    .modal-bar{width:36px;height:4px;background:var(--bdr);border-radius:2px;margin:0 auto 20px}
    .modal-t{font-family:var(--fd);font-size:20px;font-weight:700;margin-bottom:20px;text-align:center}
    .igrp{margin-bottom:14px}
    .ilbl{font-size:11px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;display:block}
    .ifld{width:100%;padding:10px 12px;border:1.5px solid var(--bdr);border-radius:var(--radx);font-size:14px;color:var(--text);background:var(--bg);outline:none;transition:border-color .2s}
    .ifld:focus{border-color:var(--teal)}
    .ifld::placeholder{color:var(--text3)}
    .crow{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--bdr);font-size:13px}
    .crow:last-child{border-bottom:none}
    .crow-l{color:var(--text2)}
    .crow-v{font-weight:600}
    .empty{text-align:center;padding:40px 20px;color:var(--text3)}
    .empty-i{font-size:40px;margin-bottom:10px;opacity:.4}
    .empty-t{font-size:13px;line-height:1.5}
    .amt-wrap{display:flex;align-items:center;gap:8px}
    .amt-sym{font-size:20px;font-weight:700;color:var(--text2)}
  `;
  document.head.appendChild(s);
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({ parlour_name: '', parlour_open: false });
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [hours, setHours] = useState({});
  const [counts, setCounts] = useState({});
  
  const [tab, setTab] = useState('bookings');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [completeModal, setCompleteModal] = useState(null);
  const [editServiceModal, setEditServiceModal] = useState(null);
  
  useEffect(() => {
    injectCSS();
    fetchData();
  }, []);
  
  useEffect(() => {
    if (tab === 'bookings') {
      fetchBookings();
    }
  }, [selectedDate]);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const [setRes, svcRes, hrsRes, cntRes] = await Promise.all([
        fetch('/api/settings').then(r => r.json()),
        fetch('/api/services').then(r => r.json()),
        fetch('/api/hours').then(r => r.json()),
        fetch('/api/bookings/counts').then(r => r.json())
      ]);
      setSettings(setRes);
      setServices(svcRes);
      setHours(hrsRes);
      setCounts(cntRes);
      await fetchBookings();
    } catch (e) {
      console.error('Error fetching data:', e);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchBookings = async () => {
    try {
      const res = await fetch(`/api/bookings?date=${selectedDate}`);
      const data = await res.json();
      setBookings(data || []);
    } catch (e) {
      console.error('Error fetching bookings:', e);
    }
  };
  
  const toggleParlourstatus = async () => {
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parlour_open: !settings.parlour_open })
      });
      setSettings(s => ({ ...s, parlour_open: !s.parlour_open }));
    } catch (e) {
      console.error('Error toggling status:', e);
    }
  };
  
  const updateBooking = async (id, status, amount) => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, amount_charged: amount })
      });
      await fetchBookings();
      setCompleteModal(null);
    } catch (e) {
      console.error('Error updating booking:', e);
    }
  };
  
  const addService = async (name, duration, price, category) => {
    try {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, duration, price, category })
      });
      const res = await fetch('/api/services');
      setServices(await res.json());
      setEditServiceModal(null);
    } catch (e) {
      console.error('Error adding service:', e);
    }
  };
  
  const updateService = async (id, name, duration, price, category, active) => {
    try {
      await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, duration, price, category, active })
      });
      const res = await fetch('/api/services');
      setServices(await res.json());
      setEditServiceModal(null);
    } catch (e) {
      console.error('Error updating service:', e);
    }
  };
  
  const deleteService = async (id) => {
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const res = await fetch('/api/services');
      setServices(await res.json());
    } catch (e) {
      console.error('Error deleting service:', e);
    }
  };
  
  const updateHours = async (day, is_open, start_time, end_time) => {
    try {
      await fetch(`/api/hours/${day}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_open, start_time, end_time })
      });
      const res = await fetch('/api/hours');
      setHours(await res.json());
    } catch (e) {
      console.error('Error updating hours:', e);
    }
  };
  
  // Helpers
  const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const t2m = t => { const [h,m] = t.split(":").map(Number); return h*60+m; };
  const m2t = m => `${Math.floor(m/60).toString().padStart(2,"0")}:${(m%60).toString().padStart(2,"0")}`;
  const fmt12 = t => { const [h,m] = t.split(":").map(Number); return `${h%12||12}:${m.toString().padStart(2,"0")} ${h>=12?"PM":"AM"}`; };
  const fmtDate = d => new Date(d).toLocaleDateString("en-IN",{weekday:"short",month:"short",day:"numeric"});

  const svcName = (sid) => {
    const s = services.find(x => x.id === sid);
    return s ? s.name : sid;
  };

  const confirmed = bookings.filter(b => b.status === "confirmed").length;
  const completed = bookings.filter(b => b.status === "completed").length;
  const revenue = bookings.filter(b => b.status === "completed").reduce((s, b) => s + (Number(b.amount_charged) || 0), 0);

  const getDateChips = () => {
    const chips = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      chips.push({
        dateStr,
        day: SHORT[d.getDay()],
        num: d.getDate(),
        count: counts[dateStr] || 0
      });
    }
    return chips;
  };
  
  if (loading) {
    return <div className="ow"><div className="empty"><div className="empty-i">⏳</div><div className="empty-t">Loading...</div></div></div>;
  }
  
  const categories = [...new Set(services.map(s => s.category))];
  
  return (
    <div className="ow">
      <div className="ow-hdr">
        <div className="ow-brand">
          <div className="ow-logo">G</div>
          <div>
            <div className="ow-title">{settings.parlour_name || 'Parlour'}</div>
          </div>
        </div>
        <div className="ow-badge">Owner</div>
      </div>
      
      <div className={`ow-status ${settings.parlour_open ? 'op' : 'cl'}`}>
        <div className="ow-status-left">
          <div className="ow-status-dot"></div>
          <div className="ow-status-txt">{settings.parlour_open ? 'Parlour is Open' : 'Parlour is Closed'}</div>
        </div>
        <button className={`tog ${settings.parlour_open ? 'on' : ''}`} onClick={toggleParlourstatus}></button>
      </div>
      
      <div className="ow-nav">
        <button className={`ow-tab ${tab === 'bookings' ? 'on' : ''}`} onClick={() => setTab('bookings')}>📋 Bookings</button>
        <button className={`ow-tab ${tab === 'services' ? 'on' : ''}`} onClick={() => setTab('services')}>💇 Services</button>
        <button className={`ow-tab ${tab === 'hours' ? 'on' : ''}`} onClick={() => setTab('hours')}>🕐 Hours</button>
      </div>
      
      {tab === 'bookings' && (
        <>
          <div className="stats">
            <div className="stat accent">
              <div className="stat-n">{confirmed}</div>
              <div className="stat-l">Upcoming</div>
            </div>
            <div className="stat green">
              <div className="stat-n">{completed}</div>
              <div className="stat-l">Completed</div>
            </div>
            <div className="stat" style={{gridColumn:"1/-1"}}>
              <div className="stat-n" style={{color:"var(--amber)"}}>₹{revenue.toLocaleString("en-IN")}</div>
              <div className="stat-l">Today's Revenue</div>
            </div>
          </div>
          
          <div className="ow-dates">
            {getDateChips().map(chip => (
              <div 
                key={chip.dateStr}
                className={`ow-dc ${chip.dateStr === selectedDate ? 'on' : ''}`}
                onClick={() => setSelectedDate(chip.dateStr)}
              >
                <span className="d">{chip.day}</span>
                <span className="n">{chip.num}</span>
                {chip.count > 0 && <span className="c">{chip.count} apt</span>}
              </div>
            ))}
          </div>
          
          <div style={{padding:"0 20px",marginTop:16}}>
            {bookings.length === 0 ? (
              <div className="empty">
                <div className="empty-i">📋</div>
                <div className="empty-t">No bookings for {fmtDate(selectedDate)}</div>
              </div>
            ) : (
              bookings.map((b, i) => (
                <div key={b.id} className="bk-item" style={{animationDelay:`${i*0.05}s`}}>
                  <div className="bk-top">
                    <div>
                      <div className="bk-name">{b.client_name}</div>
                      <div className="bk-phone">📞 {b.client_phone}</div>
                    </div>
                    <span className={`bk-badge ${b.status}`}>{b.status}</span>
                  </div>
                  <div className="bk-svcs">
                    {b.services && b.services.map((sid, idx) => (
                      <span key={idx} className="bk-tag">{svcName(sid)}</span>
                    ))}
                  </div>
                  <div className="bk-time">
                    🕐 {fmt12(b.start_time)} — {fmt12(m2t(t2m(b.start_time) + b.total_duration))}
                    <span style={{color:"var(--text3)"}}>({b.total_duration} min)</span>
                  </div>
                  {b.status === "completed" && b.amount_charged != null && (
                    <div className="bk-charged">₹{Number(b.amount_charged).toLocaleString("en-IN")} charged</div>
                  )}
                  {b.status === "confirmed" && (
                    <div className="bk-actions">
                      <button className="btn btn-green" onClick={() => setCompleteModal(b)}>✓ Complete</button>
                      <button className="btn btn-red" onClick={() => updateBooking(b.id, 'cancelled')}>✕ Cancel</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
      
      {tab === 'services' && (
        <>
          <button className="btn btn-teal btn-full" style={{margin: '16px 20px 0'}} onClick={() => setEditServiceModal({ mode: 'add' })}>Add New Service</button>
          
          {categories.map(cat => (
            <div key={cat} className="ow-crd">
              <div className="ow-crd-st">{cat}</div>
              {services.filter(s => s.category === cat).map(s => (
                <div key={s.id} className={`svc-row ${!s.active ? 'svc-inactive' : ''}`}>
                  <div className="svc-info">
                    <div className="svc-name">{s.name}</div>
                    <div className="svc-meta">{s.duration} min • ₹{s.price}</div>
                  </div>
                  <div className="svc-actions">
                    <button className="btn btn-ghost" style={{padding: '6px 10px'}} onClick={() => setEditServiceModal({mode: 'edit', ...s})}>Edit</button>
                    <button className="btn btn-red" style={{padding: '6px 10px'}} onClick={() => deleteService(s.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
      
      {tab === 'hours' && (
        <>
        <div className="ow-crd">
          <div className="ow-crd-t">Parlour Status</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0"}}>
            <div>
              <div style={{fontWeight:600,fontSize:14}}>Open for Bookings</div>
              <div style={{fontSize:12,color:"var(--text2)",marginTop:2}}>When closed, clients cannot book</div>
            </div>
            <button className={`tog ${settings.parlour_open?"on":""}`} onClick={toggleParlourstatus}></button>
          </div>
        </div>
        <div className="ow-crd">
          <div className="ow-crd-t">Opening Hours</div>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => {
            const h = hours[day] || { open: true, start: '09:00', end: '18:00' };
            return (
              <div key={day} className="hrs-row">
                <div className="hrs-day">{day.slice(0, 3)}</div>
                {h.open ? (
                  <div className="hrs-times">
                    <input 
                      type="time" 
                      className="hrs-inp" 
                      defaultValue={h.start} 
                      onChange={(e) => updateHours(day, true, e.target.value, h.end)}
                    />
                    <span>to</span>
                    <input 
                      type="time" 
                      className="hrs-inp" 
                      defaultValue={h.end} 
                      onChange={(e) => updateHours(day, true, h.start, e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="hrs-closed">Closed</div>
                )}
                <button 
                  className={`tog tog-s ${h.open ? 'on' : ''}`}
                  onClick={() => updateHours(day, !h.open, h.start, h.end)}
                ></button>
              </div>
            );
          })}
        </div>
        </>
      )}
      
      {completeModal && (
        <div className="modal-bg" onClick={() => setCompleteModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-bar"></div>
            <div className="modal-t">Complete Appointment</div>
            <div style={{marginBottom:16}}>
              <div className="crow"><span className="crow-l">Client</span><span className="crow-v">{completeModal.client_name}</span></div>
              <div className="crow"><span className="crow-l">Phone</span><span className="crow-v">{completeModal.client_phone}</span></div>
              <div className="crow"><span className="crow-l">Time</span><span className="crow-v">{fmt12(completeModal.start_time)}</span></div>
              <div style={{marginTop:10}}>
                <div className="ow-crd-st">Services Done</div>
                {completeModal.services && completeModal.services.map((sid, idx) => {
                  const svc = services.find(x => x.id === sid);
                  return svc ? <div key={idx} className="crow"><span>{svc.name}</span><span className="crow-v">{svc.duration} min</span></div> : null;
                })}
              </div>
            </div>
            <CompleteForm
              booking={completeModal}
              onSubmit={(amt) => updateBooking(completeModal.id, 'completed', amt)}
              onClose={() => setCompleteModal(null)}
            />
          </div>
        </div>
      )}
      
      {editServiceModal && (
        <div className="modal-bg" onClick={() => setEditServiceModal(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-bar"></div>
            <div className="modal-t">{editServiceModal.mode === 'add' ? 'Add Service' : 'Edit Service'}</div>
            <ServiceForm 
              service={editServiceModal}
              onSubmit={(name, duration, price, category, active) => {
                if (editServiceModal.mode === 'add') {
                  addService(name, duration, price, category);
                } else {
                  updateService(editServiceModal.id, name, duration, price, category, active);
                }
              }}
              onClose={() => setEditServiceModal(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CompleteForm({ booking, onSubmit, onClose }) {
  const [amount, setAmount] = useState(booking.amount_charged || '');

  return (
    <>
      <div className="igrp">
        <label className="ilbl">Amount Charged</label>
        <div className="amt-wrap">
          <span className="amt-sym">₹</span>
          <input
            type="number"
            className="ifld"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{flex:1}}
          />
        </div>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button className="btn btn-ghost" style={{flex:1,justifyContent:"center",padding:12}} onClick={onClose}>Cancel</button>
        <button className="btn btn-teal" style={{flex:1,justifyContent:"center",padding:12}} onClick={() => onSubmit(amount)} disabled={!amount}>✓ Mark Completed</button>
      </div>
    </>
  );
}

function ServiceForm({ service, onSubmit, onClose }) {
  const [name, setName] = useState(service.name || '');
  const [duration, setDuration] = useState(service.duration || '');
  const [price, setPrice] = useState(service.price || '');
  const [category, setCategory] = useState(service.category || '');
  const [active, setActive] = useState(service.active !== false);
  
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(name, duration, price, category, active); }}>
      <div className="igrp">
        <label className="ilbl">Service Name</label>
        <input type="text" className="ifld" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="igrp">
        <label className="ilbl">Duration (minutes)</label>
        <input type="number" className="ifld" value={duration} onChange={(e) => setDuration(e.target.value)} required />
      </div>
      <div className="igrp">
        <label className="ilbl">Price (₹)</label>
        <input type="number" className="ifld" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div className="igrp">
        <label className="ilbl">Category</label>
        <input type="text" className="ifld" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      {service.mode === 'edit' && (
        <div className="igrp" style={{display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between'}}>
          <label className="ilbl" style={{marginBottom: 0}}>Active</label>
          <button type="button" className={`tog ${active ? 'on' : ''}`} onClick={() => setActive(!active)}></button>
        </div>
      )}
      <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
        <button type="button" className="btn btn-ghost btn-full" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn btn-teal btn-full">Save</button>
      </div>
    </form>
  );
}
