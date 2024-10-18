"use client"

import Image from "next/image";
import Card from "../cards/card";
import Container from "../containers/container";
import Link from "next/link";
import { useState } from "react";
import EducationChart from "../charts/educational-chart";
import LevelEducationChart from "../charts/level-education";

const charts = [
    {
        id: 1,
        category_name: "Equidad",
        chart: <EducationChart/>,
        title: "Tasa de Matrícula en Educación Superior (2013-2023) - Ámbito Urbano vs Rural",
        content: `
            <li>
                <strong>Crecimiento en la matrícula y acceso:</strong> El aumento en la tasa de matrícula, tanto en áreas urbanas como rurales, refleja un progreso hacia el acceso equitativo a la educación superior, un aspecto clave del ODS 4. Aunque las áreas rurales tienen un crecimiento más marcado, este incremento en ambas áreas apunta hacia la expansión de oportunidades educativas para más jóvenes peruanos.
            </li>
            <li>
                <strong>Reducción de la brecha urbano-rural:</strong> La reducción gradual de la brecha en la matrícula entre áreas urbanas y rurales está directamente alineada con la meta del ODS 4 de garantizar igualdad de oportunidades educativas. El cierre de esta brecha es esencial para reducir las desigualdades y asegurar que jóvenes en áreas rurales accedan a una educación de calidad, comparable a la de los estudiantes urbanos.
            </li>
            <li>
                <strong>Impacto de la pandemia y recuperación:</strong> La caída en las tasas de matrícula debido a la pandemia, especialmente en el ámbito urbano, muestra cómo las crisis globales pueden afectar el avance hacia la educación de calidad. Sin embargo, la recuperación en ambos ámbitos, especialmente en áreas rurales, refleja el esfuerzo del Perú por restaurar y mejorar el acceso a la educación post-pandemia, apoyando la resiliencia del sistema educativo y su alineación con el ODS 4.
            </li>
        `
    },
    {
        id: 2,
        category_name: "Desigualdad",
        chart: <LevelEducationChart/>,
        title: "Evolución del Nivel de Educación Alcanzado (2013-2023)",
        content: `
            <li>
                <strong>Desigualdad en el acceso a la educación primaria y secundaria:</strong> La reducción en el porcentaje de personas que solo alcanzan la educación primaria sugiere que más personas están completando niveles educativos más altos. Sin embargo, la estabilidad en la educación superior indica que las barreras para acceder a niveles superiores siguen siendo significativas, especialmente para las personas en situación de pobreza, quienes pueden carecer de recursos para continuar sus estudios.
            </li>
            <li>
                <strong>Educación como vía de escape de la pobreza:</strong> La mejora en los niveles de educación primaria y secundaria está directamente relacionada con la disminución de la pobreza. La educación proporciona más oportunidades de empleo y mejores salarios. El gráfico muestra una tendencia a que más personas completen la secundaria, lo cual es un paso crucial para acceder a empleos mejor remunerados y salir de la pobreza.
            </li>
            <li>
                <strong>Baja tasa de educación superior:</strong> La estabilidad en la proporción de personas que alcanzan la educación superior alrededor del 14.9% sugiere que el acceso a este nivel sigue siendo limitado, especialmente para las personas de bajos recursos. La educación superior, que es crucial para acceder a trabajos de mayor calificación y mejores ingresos, sigue siendo menos accesible para las personas más afectadas por la pobreza.
            </li>
        `
    }
]

const EducationalCategories = () => {
    const [chartSelect, setChartSelect] = useState(charts[0])

    return ( 
        <section className="my-[5rem]">
            <Container className="space-y-4">
                <h2 className="text-2xl font-medium">Evolución y Desigualdad en el Acceso a la Educación en el Perú</h2>
                <ul className="flex items-center">
                    {charts.map((ch)=>(
                        <li onClick={()=>setChartSelect(ch)} className={`cursor-pointer pr-4 border-solid border-b-2 ${chartSelect.id == ch.id ? "border-onyx-dark" : "border-slate-c"}`} key={"chart-"+ch.id}>
                            {ch.category_name}
                        </li>
                    ))}
                </ul>
                <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 h-full">
                    <Card className="col-span-1 flex-col lg:col-span-5 h-full flex gap-4">
                        <h1 className="text-center w-full font-semibold">{chartSelect.title}</h1>
                        {chartSelect.chart}
                        <Link className="font-medium text-sm hover:underline" href={"https://www.gob.pe/es/i/6061323"} target="_blank">Fuente: Instituto Nacional de Estadística e Informática</Link>
                    </Card>
                    <Card className="col-span-1 lg:col-span-3">
                        <ul className="text-sm pl-2 list-disc" dangerouslySetInnerHTML={{__html: chartSelect.content}}>
                            
                        </ul>
                    </Card>
                </div>
            </Container>
        </section>
     );
}
 
export default EducationalCategories;