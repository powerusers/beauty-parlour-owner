const express = require("express");
const cors = require("cors");
const path = require("path");
const { pool, initDB } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend build
app.use(express.static(path.join(__dirname, "dist")));

// ─── API ROUTES ─────────────────────────────────────────────────────

// --- Settings ---
app.get("/api/settings", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM settings LIMIT 1");
    res.json(rows[0] || { parlour_name: "Glow & Grace", parlour_open: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/settings", async (req, res) => {
  try {
    const { parlour_name, parlour_open } = req.body;
    const { rows } = await pool.query(
      `UPDATE settings SET parlour_name = COALESCE($1, parlour_name), parlour_open = COALESCE($2, parlour_open), updated_at = NOW() RETURNING *`,
      [parlour_name, parlour_open]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Services ---
app.get("/api/services", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM services ORDER BY category, name");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/services", async (req, res) => {
  try {
    const { id, name, duration, price, category } = req.body;
    const svcId = id || "s" + Math.random().toString(36).substr(2, 8);
    const { rows } = await pool.query(
      `INSERT INTO services (id, name, duration, price, category, active) VALUES ($1,$2,$3,$4,$5,true) RETURNING *`,
      [svcId, name, duration, price, category]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/services/:id", async (req, res) => {
  try {
    const { name, duration, price, category, active } = req.body;
    const { rows } = await pool.query(
      `UPDATE services SET name=COALESCE($1,name), duration=COALESCE($2,duration), price=COALESCE($3,price), category=COALESCE($4,category), active=COALESCE($5,active), updated_at=NOW() WHERE id=$6 RETURNING *`,
      [name, duration, price, category, active, req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/services/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM services WHERE id=$1", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Hours ---
app.get("/api/hours", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM hours ORDER BY CASE day WHEN 'Sunday' THEN 0 WHEN 'Monday' THEN 1 WHEN 'Tuesday' THEN 2 WHEN 'Wednesday' THEN 3 WHEN 'Thursday' THEN 4 WHEN 'Friday' THEN 5 WHEN 'Saturday' THEN 6 END");
    const hoursObj = {};
    rows.forEach(r => { hoursObj[r.day] = { open: r.is_open, start: r.start_time, end: r.end_time }; });
    res.json(hoursObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/hours/:day", async (req, res) => {
  try {
    const { is_open, start_time, end_time } = req.body;
    const { rows } = await pool.query(
      `UPDATE hours SET is_open=COALESCE($1,is_open), start_time=COALESCE($2,start_time), end_time=COALESCE($3,end_time) WHERE day=$4 RETURNING *`,
      [is_open, start_time, end_time, req.params.day]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Bookings ---
app.get("/api/bookings", async (req, res) => {
  try {
    const { date } = req.query;
    let query = "SELECT * FROM bookings ORDER BY date, start_time";
    let params = [];
    if (date) {
      query = "SELECT * FROM bookings WHERE date = $1 ORDER BY start_time";
      params = [date];
    }
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/bookings/:id", async (req, res) => {
  try {
    const { status, amount_charged } = req.body;
    const { rows } = await pool.query(
      `UPDATE bookings SET status=COALESCE($1,status), amount_charged=COALESCE($2,amount_charged) WHERE id=$3 RETURNING *`,
      [status, amount_charged, req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Booking counts for date chips ---
app.get("/api/bookings/counts", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT date::text, COUNT(*) as count FROM bookings WHERE status != 'cancelled' GROUP BY date`
    );
    const counts = {};
    rows.forEach(r => { counts[r.date] = parseInt(r.count); });
    res.json(counts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Owner Dashboard running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
