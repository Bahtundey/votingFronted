import React from "react";


function calculate(str) {
let score = 0;
if (!str) return 0;
if (str.length >= 6) score++;
if (/[A-Z]/.test(str)) score++;
if (/[0-9]/.test(str)) score++;
if (/[^A-Za-z0-9]/.test(str)) score++;
return score;
}
export default function PasswordStrength({ password }) {
const score = calculate(password);
const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
const colors = ["#ff4d4d", "#ff884d", "#ffcc00", "#66cc66", "#009933"];
return (
    <div className="mt-2">
    <div
    style={{
    width:`${(score / 4) * 100}%`,
    height: "6px",
    background: colors[score],
    transition: "0.3s",
    borderRadius: "4px",
    }}>

    </div>
    <small style={{ color: colors[score] }}>{labels[score]}</small>
    </div>

    );
    }