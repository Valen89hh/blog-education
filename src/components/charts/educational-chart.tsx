"use client"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

// Datos basados en la tabla proporcionada
const data = [
  { year: 2013, Urbano: 31.46, Rural: 14.08 },
  { year: 2014, Urbano: 32.00, Rural: 14.17 },
  { year: 2015, Urbano: 31.01, Rural: 15.13 },
  { year: 2016, Urbano: 32.23, Rural: 15.67 },
  { year: 2017, Urbano: 32.14, Rural: 15.71 },
  { year: 2018, Urbano: 33.57, Rural: 15.96 },
  { year: 2019, Urbano: 33.29, Rural: 17.07 },
  { year: 2020, Urbano: 24.84, Rural: 16.60 },
  { year: 2021, Urbano: 28.06, Rural: 15.31 },
  { year: 2022, Urbano: 30.95, Rural: 17.53 },
  { year: 2023, Urbano: 33.27, Rural: 20.63 },
];

const EducationChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" minHeight={300} height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 50,
        }}
      >
        <XAxis dataKey="year">
          <Label value="Años"  position="bottom" />
        </XAxis>
        <YAxis>
          <Label className='h-full text-center' value="Tasa de Matrícula (%)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} dy={0}/>
        </YAxis>
        <Tooltip />
        <Legend verticalAlign="top" />
        <Area type="monotone" dataKey="Urbano" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="Rural" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default EducationChart;
