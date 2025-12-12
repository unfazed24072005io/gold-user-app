import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCv25cR11xgEAfCx_ymuLgBbuextK7J4v0",
  authDomain: "gold-calculator-81d63.firebaseapp.com",
  projectId: "gold-calculator-81d63",
  storageBucket: "gold-calculator-81d63.firebasestorage.app",
  messagingSenderId: "183009351952",
  appId: "1:183009351952:web:82bf4759b5fedfd5566d95",
  measurementId: "G-DWDPXPX3Z4"
};

initializeApp(firebaseConfig);
const db = getFirestore();

export default function AdminApp() {
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch current rate from Firestore
  useEffect(() => {
    async function fetchRate() {
      const ref = doc(db, "rates", "current");
      const snap = await getDoc(ref);
      if (snap.exists()) setRate(snap.data().price);
      setLoading(false);
    }
    fetchRate();
  }, []);

  // Update rate in Firestore
  const updateRate = async () => {
    if (!rate) return alert("Enter a rate");
    const ref = doc(db, "rates", "current");
    await setDoc(ref, { price: Number(rate) });
    alert("Rate updated successfully!");
  };

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", padding: 20 }}>
      <img src="/logo.png" alt="Logo" style={{ width: 100, margin: 20 }} />
      <div style={{ background: "goldenrod", color: "white", padding: 20, fontSize: 24, fontWeight: "bold" }}>
        Admin - Update Gold Rate
      </div>

      {loading ? (
        <p style={{ marginTop: 20 }}>Loading current rate...</p>
      ) : (
        <div style={{ marginTop: 20 }}>
          <input
            type="number"
            placeholder="Enter current rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            style={{ padding: 10, margin: 10, width: 200 }}
          />
          <br />
          <button
            onClick={updateRate}
            style={{
              padding: "10px 20px",
              background: "goldenrod",
              color: "white",
              border: "none",
              cursor: "pointer",
              marginTop: 10
            }}
          >
            Update Rate
          </button>
        </div>
      )}

      <p style={{ marginTop: 20, fontSize: 14, color: "gray" }}>
        Current rate is stored in Firestore document: rates/current
      </p>
    </div>
  );
}
