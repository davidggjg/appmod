import { useState } from "react";

const ADMIN_CODE = "admin2024";

const C = {
  bg: "#f5f5f7",
  card: "#ffffff",
  border: "#e0e0e5",
  accent: "#3a3a3c",
  accentLight: "#6e6e73",
  accentBtn: "#1c1c1e",
  inputBg: "#ffffff",
  shadow: "0 2px 12px rgba(0,0,0,0.08)",
  shadowHover: "0 8px 28px rgba(0,0,0,0.13)",
  danger: "#ff3b30",
  dangerBg: "#fff0ef",
  edit: "#f2f2f7",
  editText: "#3a3a3c",
};

const initialCategories = [
  { id: 1, name: "כלים" },
  { id: 2, name: "משחקים" },
  { id: 3, name: "חינוך" },
];

const initialApps = [
  {
    id: 1, name: "מחשבון חכם",
    description: "מחשבון מתקדם עם היסטוריה ופעולות מורכבות. מושלם לשימוש יומיומי.",
    downloadUrl: "https://example.com/download/1",
    imageUrl: "https://placehold.co/400x300/e8e8ed/3a3a3c?text=מחשבון",
    categoryId: 1,
  },
  {
    id: 2, name: "משחק הדמויות",
    description: "משחק הרפתקאות מרגש עם עולם פתוח ודמויות ייחודיות.",
    downloadUrl: "https://example.com/download/2",
    imageUrl: "https://placehold.co/400x300/e8e8ed/3a3a3c?text=משחק",
    categoryId: 2,
  },
  {
    id: 3, name: "לימוד עברית",
    description: "אפליקציה ללימוד עברית בצורה מהנה ואינטראקטיבית לכל הגילאים.",
    downloadUrl: "https://example.com/download/3",
    imageUrl: "https://placehold.co/400x300/e8e8ed/3a3a3c?text=לימוד",
    categoryId: 3,
  },
  {
    id: 4, name: "שעון עצר",
    description: "שעון עצר מדויק עם ממשק נקי ושימושי.",
    downloadUrl: "https://example.com/download/4",
    imageUrl: "https://placehold.co/400x300/e8e8ed/3a3a3c?text=שעון",
    categoryId: 1,
  },
];

// ─── ConfirmDialog ────────────────────────────────────────────────────────────
function ConfirmDialog({ message, onYes, onNo }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
      backdropFilter: "blur(4px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 1000, padding: 20,
    }}>
      <div style={{
        background: C.card, borderRadius: 20, padding: "28px 24px",
        width: "100%", maxWidth: 320, direction: "rtl",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        border: `1px solid ${C.border}`,
        animation: "popIn .18s ease",
      }}>
        <style>{`@keyframes popIn{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
        <div style={{ fontSize: 36, textAlign: "center", marginBottom: 12 }}>🗑️</div>
        <p style={{ margin: "0 0 24px", fontSize: 16, color: C.accent, textAlign: "center", lineHeight: 1.6 }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onYes}
            style={{
              flex: 1, background: C.danger, color: "#fff", border: "none",
              borderRadius: 12, padding: "13px 0", cursor: "pointer",
              fontWeight: 700, fontSize: 15,
            }}
          >כן, מחק</button>
          <button
            onClick={onNo}
            style={{
              flex: 1, background: C.edit, color: C.accent, border: "none",
              borderRadius: 12, padding: "13px 0", cursor: "pointer",
              fontWeight: 700, fontSize: 15,
            }}
          >לא</button>
        </div>
      </div>
    </div>
  );
}

// ─── AppCard ──────────────────────────────────────────────────────────────────
function AppCard({ app, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(app)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.card, border: `1px solid ${C.border}`, borderRadius: 18,
        padding: 14, cursor: "pointer", transition: "transform .2s, box-shadow .2s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? C.shadowHover : C.shadow,
        display: "flex", flexDirection: "column", gap: 8,
      }}
    >
      <img
        src={app.imageUrl} alt={app.name}
        style={{ width: "100%", borderRadius: 12, objectFit: "cover", height: 110 }}
        onError={e => { e.target.src = `https://placehold.co/400x300/e8e8ed/3a3a3c?text=${encodeURIComponent(app.name)}`; }}
      />
      <div style={{ color: C.accent, fontWeight: 700, fontSize: 14, textAlign: "right" }}>{app.name}</div>
      <div style={{
        color: C.accentLight, fontSize: 12, textAlign: "right", lineHeight: 1.5,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
      }}>{app.description}</div>
    </div>
  );
}

// ─── AppPage ──────────────────────────────────────────────────────────────────
function AppPage({ app, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif", direction: "rtl" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", paddingBottom: 40 }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", color: C.accentLight,
          fontSize: 15, cursor: "pointer", padding: "18px 18px 0",
          display: "flex", alignItems: "center", gap: 6
        }}>← חזור</button>

        <img
          src={app.imageUrl} alt={app.name}
          style={{ width: "100%", maxHeight: 260, objectFit: "cover" }}
          onError={e => { e.target.src = `https://placehold.co/480x260/e8e8ed/3a3a3c?text=${encodeURIComponent(app.name)}`; }}
        />

        <div style={{ padding: "24px 20px" }}>
          <h1 style={{ margin: "0 0 10px", fontSize: 26, fontWeight: 800, color: C.accent }}>{app.name}</h1>
          <p style={{ margin: "0 0 32px", fontSize: 15, lineHeight: 1.8, color: C.accentLight }}>{app.description}</p>

          <a href={app.downloadUrl} target="_blank" rel="noreferrer"
            style={{
              display: "block", textAlign: "center",
              background: C.accentBtn, color: "#fff",
              fontSize: 17, fontWeight: 700, padding: "16px 0",
              borderRadius: 14, textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
              transition: "opacity .15s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".82"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >⬇ הורד עכשיו</a>
        </div>
      </div>
    </div>
  );
}

// ─── AdminPanel ───────────────────────────────────────────────────────────────
function AdminPanel({ apps, setApps, categories, setCategories, onBack }) {
  const [tab, setTab] = useState("apps");
  const [search, setSearch] = useState("");
  const [catSearch, setCatSearch] = useState("");
  const [editingApp, setEditingApp] = useState(null);
  const [appForm, setAppForm] = useState({ name: "", description: "", downloadUrl: "", imageUrl: "", categoryId: "" });
  const [editingCat, setEditingCat] = useState(null);
  const [catName, setCatName] = useState("");

  // custom confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState(null); // { message, onYes }

  const filtered = apps.filter(a =>
    a.name.includes(search) || categories.find(c => c.id === a.categoryId)?.name.includes(search)
  );
  const filteredCats = categories.filter(c => c.name.includes(catSearch));

  function openNewApp() {
    setEditingApp("new");
    setAppForm({ name: "", description: "", downloadUrl: "", imageUrl: "", categoryId: categories[0]?.id || "" });
  }
  function openEditApp(app) {
    setEditingApp(app.id);
    setAppForm({ name: app.name, description: app.description, downloadUrl: app.downloadUrl, imageUrl: app.imageUrl, categoryId: app.categoryId });
  }
  function saveApp() {
    if (!appForm.name || !appForm.categoryId) return;
    if (editingApp === "new") setApps(p => [...p, { ...appForm, id: Date.now(), categoryId: Number(appForm.categoryId) }]);
    else setApps(p => p.map(a => a.id === editingApp ? { ...a, ...appForm, categoryId: Number(appForm.categoryId) } : a));
    setEditingApp(null);
  }

  function askDeleteApp(id, name) {
    setConfirmDialog({
      message: `האם ברצונך למחוק את "${name}"?`,
      onYes: () => { setApps(p => p.filter(a => a.id !== id)); setConfirmDialog(null); },
    });
  }

  function saveCat() {
    if (!catName.trim()) return;
    if (editingCat === "new") setCategories(p => [...p, { id: Date.now(), name: catName.trim() }]);
    else setCategories(p => p.map(c => c.id === editingCat ? { ...c, name: catName.trim() } : c));
    setEditingCat(null); setCatName("");
  }

  function askDeleteCat(id, name) {
    if (apps.some(a => a.categoryId === id)) {
      setConfirmDialog({
        message: `לא ניתן למחוק את "${name}" כי יש בה אפליקציות.`,
        onYes: () => setConfirmDialog(null),
        onlyOk: true,
      });
      return;
    }
    setConfirmDialog({
      message: `האם ברצונך למחוק את הקטגוריה "${name}"?`,
      onYes: () => { setCategories(p => p.filter(c => c.id !== id)); setConfirmDialog(null); },
    });
  }

  const inp = {
    width: "100%", background: C.inputBg, border: `1px solid ${C.border}`,
    borderRadius: 10, padding: "11px 13px", color: C.accent, fontSize: 14,
    boxSizing: "border-box", direction: "rtl", outline: "none",
  };
  const btnPrimary = {
    background: C.accentBtn, color: "#fff", border: "none",
    borderRadius: 10, padding: "11px 20px", cursor: "pointer", fontWeight: 700, fontSize: 14,
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif", direction: "rtl" }}>
      {confirmDialog && (
        confirmDialog.onlyOk
          ? <ConfirmDialog
              message={confirmDialog.message}
              onYes={confirmDialog.onYes}
              onNo={confirmDialog.onYes}
            />
          : <ConfirmDialog
              message={confirmDialog.message}
              onYes={confirmDialog.onYes}
              onNo={() => setConfirmDialog(null)}
            />
      )}

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "16px 16px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 20, color: C.accent }}>🛠 פאנל ניהול</h2>
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.accentLight, cursor: "pointer", fontSize: 14 }}>← יציאה</button>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["apps", "cats"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px 0", borderRadius: 10,
              border: `1px solid ${C.border}`, cursor: "pointer",
              fontWeight: 700, fontSize: 14,
              background: tab === t ? C.accentBtn : C.card,
              color: tab === t ? "#fff" : C.accentLight,
            }}>
              {t === "apps" ? "📱 אפליקציות" : "📂 קטגוריות"}
            </button>
          ))}
        </div>

        {tab === "apps" && !editingApp && (<>
          <input placeholder="🔍 חפש..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inp, marginBottom: 12 }} />
          <button onClick={openNewApp} style={{ ...btnPrimary, width: "100%", marginBottom: 16 }}>+ הוסף אפליקציה</button>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map(app => (
              <div key={app.id} style={{ background: C.card, borderRadius: 12, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: C.accent }}>{app.name}</div>
                  <div style={{ fontSize: 12, color: C.accentLight }}>{categories.find(c => c.id === app.categoryId)?.name}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => openEditApp(app)} style={{ background: C.edit, color: C.editText, border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>✏️ ערוך</button>
                  <button onClick={() => askDeleteApp(app.id, app.name)} style={{ background: C.dangerBg, color: C.danger, border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        </>)}

        {tab === "apps" && editingApp && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h3 style={{ margin: 0, color: C.accent }}>{editingApp === "new" ? "אפליקציה חדשה" : "עריכת אפליקציה"}</h3>
            <input placeholder="שם האפליקציה *" value={appForm.name} onChange={e => setAppForm(f => ({ ...f, name: e.target.value }))} style={inp} />
            <textarea placeholder="תיאור" value={appForm.description} onChange={e => setAppForm(f => ({ ...f, description: e.target.value }))} style={{ ...inp, minHeight: 80, resize: "vertical" }} />
            <input placeholder="קישור הורדה" value={appForm.downloadUrl} onChange={e => setAppForm(f => ({ ...f, downloadUrl: e.target.value }))} style={inp} />
            <input placeholder="קישור תמונה" value={appForm.imageUrl} onChange={e => setAppForm(f => ({ ...f, imageUrl: e.target.value }))} style={inp} />
            <select value={appForm.categoryId} onChange={e => setAppForm(f => ({ ...f, categoryId: e.target.value }))} style={inp}>
              <option value="">בחר קטגוריה *</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={saveApp} style={{ ...btnPrimary, flex: 1 }}>💾 שמור</button>
              <button onClick={() => setEditingApp(null)} style={{ flex: 1, background: C.edit, color: C.accent, border: "none", borderRadius: 10, padding: "11px 0", cursor: "pointer", fontWeight: 700 }}>ביטול</button>
            </div>
          </div>
        )}

        {tab === "cats" && (<>
          <input placeholder="🔍 חפש קטגוריה..." value={catSearch} onChange={e => setCatSearch(e.target.value)} style={{ ...inp, marginBottom: 12 }} />
          {editingCat ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              <input placeholder="שם הקטגוריה" value={catName} onChange={e => setCatName(e.target.value)} style={inp} />
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={saveCat} style={{ ...btnPrimary, flex: 1 }}>💾 שמור</button>
                <button onClick={() => { setEditingCat(null); setCatName(""); }} style={{ flex: 1, background: C.edit, color: C.accent, border: "none", borderRadius: 10, padding: 11, cursor: "pointer", fontWeight: 700 }}>ביטול</button>
              </div>
            </div>
          ) : (
            <button onClick={() => { setEditingCat("new"); setCatName(""); }} style={{ ...btnPrimary, width: "100%", marginBottom: 16 }}>+ קטגוריה חדשה</button>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filteredCats.map(cat => (
              <div key={cat.id} style={{ background: C.card, borderRadius: 12, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${C.border}`, boxShadow: C.shadow }}>
                <span style={{ fontWeight: 700, color: C.accent }}>{cat.name}</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { setEditingCat(cat.id); setCatName(cat.name); }} style={{ background: C.edit, color: C.editText, border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>✏️</button>
                  <button onClick={() => askDeleteCat(cat.id, cat.name)} style={{ background: C.dangerBg, color: C.danger, border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        </>)}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [apps, setApps] = useState(initialApps);
  const [categories, setCategories] = useState(initialCategories);
  const [page, setPage] = useState("home");
  const [selectedApp, setSelectedApp] = useState(null);
  const [search, setSearch] = useState("");

  function handleSearchChange(val) {
    setSearch(val);
    if (val === ADMIN_CODE) {
      setSearch("");
      setPage("admin");
    }
  }

  const filtered = apps.filter(a =>
    a.name.includes(search) ||
    a.description.includes(search) ||
    categories.find(c => c.id === a.categoryId)?.name.includes(search)
  );

  if (page === "admin") return (
    <AdminPanel apps={apps} setApps={setApps} categories={categories} setCategories={setCategories} onBack={() => setPage("home")} />
  );
  if (page === "app" && selectedApp) return (
    <AppPage app={selectedApp} onBack={() => setPage("home")} />
  );

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif", direction: "rtl" }}>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px 60px" }}>
        <div style={{ padding: "24px 0 18px" }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: C.accent, letterSpacing: -0.5 }}>📱 AppStore</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: C.accentLight }}>גלה אפליקציות מומלצות</p>
        </div>

        <div style={{ position: "relative", marginBottom: 22 }}>
          <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: C.accentLight }}>🔍</span>
          <input
            placeholder="חיפוש אפליקציות..."
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            style={{
              width: "100%", background: C.inputBg, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: "13px 44px 13px 14px",
              color: C.accent, fontSize: 15,
              boxSizing: "border-box", direction: "rtl",
              outline: "none", boxShadow: C.shadow,
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", color: C.accentLight, marginTop: 60, fontSize: 16 }}>לא נמצאו אפליקציות 😔</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {filtered.map(app => (
              <AppCard key={app.id} app={app} onClick={a => { setSelectedApp(a); setPage("app"); }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
