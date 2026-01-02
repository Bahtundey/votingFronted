import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function LiveChart({ poll }) {
  if (!poll) return null;

  
  const counts = (poll.votes || []).reduce((acc, v) => {
    acc[v.choiceIndex] = (acc[v.choiceIndex] || 0) + 1;
    return acc;
  }, {});

  const data = (poll.choices || []).map((choice, i) => ({
    name: choice.text,
    value: counts[i] || 0,
  }));

  return (
    <div style={{ width: 300, height: 200 }}>
      <PieChart width={300} height={200}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={60}
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
