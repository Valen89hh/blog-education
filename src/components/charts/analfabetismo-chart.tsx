"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Datos del gráfico (estos deberían corresponder a los que se muestran en el gráfico anterior)
const data = [
  {
    name: 'Castellano',
    2013: 3.58,
    2019: 3.32,
    2023: 2.93,
  },
  {
    name: 'Lengua Nativa',
    2013: 17.90,
    2019: 15.30,
    2023: 12.50,
  },
];

const AnalfabetismoChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="2013" fill="#8884d8" />
        <Bar dataKey="2019" fill="#82ca9d" />
        <Bar dataKey="2023" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AnalfabetismoChart;
