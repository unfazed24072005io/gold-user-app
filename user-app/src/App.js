import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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

export default function App() {
  const [carat, setCarat] = useState("");
  const [weight, setWeight] = useState("");
  const [rate, setRate] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchRate() {
      const ref = doc(db, "rates", "current");
      const snap = await getDoc(ref);
      if (snap.exists()) setRate(snap.data().price);
    }
    fetchRate();
  }, []);

  useEffect(() => {
    if (carat && weight && rate) {
      setTotal(((carat / 24) * rate * weight).toFixed(2));
    } else {
      setTotal(0);
    }
  }, [carat, weight, rate]);

  // AdMob Banner
  useEffect(() => {
    document.addEventListener("deviceready", () => {
      if (window.AdMob) {
        window.AdMob.createBanner({
          adId: "ca-app-pub-3940256099942544/6300978111", // Test ID
          position: window.AdMob.AD_POSITION.BOTTOM_CENTER,
          autoShow: true
        });
      }
    }, false);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", padding: 20 }}>
      <img src="/logo.png" alt="Logo" style={{ width: 100, margin: 20 }} />
      <div style={{ background: "goldenrod", color: "white", padding: 20, fontSize: 24, fontWeight: "bold" }}>
        Gold Price Calculator
      </div>

      <div style={{ marginTop: 20 }}>
        <input type="number" placeholder="Carat" value={carat} onChange={(e) => setCarat(e.target.value)} style={{ padding: 10, margin: 10 }} />
        <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} style={{ padding: 10, margin: 10 }} />
      </div>

      <div style={{ fontSize: 20, marginTop: 10 }}>Current Rate: {rate ? rate : "Loading..."}</div>
      <div style={{ fontSize: 22, marginTop: 10, fontWeight: "bold" }}>Total Price: {total}</div>
      <div id="admob-banner" style={{ marginTop: 50 }}></div>
    </div>
  );
}
