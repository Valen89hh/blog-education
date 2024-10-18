"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

// Datos de los niveles de educación, correspondientes a los años 2013-2023
const data = [
  { year: 2013, SinNivel: 5.78, Primaria: 27.29, Secundaria: 28.33, Superior: 15.0 },
  { year: 2014, SinNivel: 5.72, Primaria: 26.98, Secundaria: 28.79, Superior: 15.4 },
  { year: 2015, SinNivel: 5.40, Primaria: 26.57, Secundaria: 28.94, Superior: 15.3 },
  { year: 2016, SinNivel: 5.45, Primaria: 26.45, Secundaria: 29.33, Superior: 15.1 },
  { year: 2017, SinNivel: 5.23, Primaria: 26.02, Secundaria: 29.87, Superior: 14.8 },
  { year: 2018, SinNivel: 4.87, Primaria: 25.56, Secundaria: 30.24, Superior: 14.6 },
  { year: 2019, SinNivel: 4.78, Primaria: 24.83, Secundaria: 30.66, Superior: 14.5 },
  { year: 2020, SinNivel: 4.34, Primaria: 24.58, Secundaria: 30.95, Superior: 14.9 },
  { year: 2021, SinNivel: 4.41, Primaria: 24.75, Secundaria: 31.08, Superior: 14.8 },
  { year: 2022, SinNivel: 4.35, Primaria: 23.42, Secundaria: 31.22, Superior: 14.7 },
  { year: 2023, SinNivel: 4.15, Primaria: 23.05, Secundaria: 31.33, Superior: 14.9 },
];

const LevelEducationChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" minHeight={300} height={"100%"}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year">
          <Label value="Año" position="bottom" />
        </XAxis>
        <YAxis>
          <Label value="Porcentaje (%)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} dy={0} />
        </YAxis>
        <Tooltip/>
        <Legend verticalAlign='top' height={36}/>
        <Line type="monotone" dataKey="SinNivel" stroke="#8884d8" name="Sin Nivel/Inicial" />
        <Line type="monotone" dataKey="Primaria" stroke="#82ca9d" name="Primaria" />
        <Line type="monotone" dataKey="Secundaria" stroke="#ffc658" name="Secundaria" />
        <Line type="monotone" dataKey="Superior" stroke="#ff7300" name="Superior" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LevelEducationChart;
