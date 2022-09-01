import { AreaChart, XAxis, CartesianGrid, Tooltip, YAxis, Area, ResponsiveContainer, Legend } from 'recharts';
import '../App.css';
import '../index.css';
import React from 'react';

const Chart = ({ field, measurements }) => {
    return <>
        <section className='container'>
            <ResponsiveContainer width='100%' height="100%">
                <AreaChart width='100%' height='100%' data={measurements.feeds}
                    margin={{
                        top: 0, right: 0, bottom: 0, left: 0,
                    }}
                    padding={{
                        top: 0, right: 0, bottom: 0, left: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#20bffc" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#0c4ada" stopOpacity={0} />
                        </linearGradient>

                    </defs>
                    <XAxis dataKey='created_at'
                        tickLine={false}
                        angle={8}
                        tickFormatter={
                            (created_at) => {
                                const date = new Date(created_at);
                                return date.toTimeString().slice(0, 5);
                            }} />
                    <YAxis axisLine={false} tickLine={false} hide={true} />
                    <CartesianGrid opacity={0.2} vertical={false} tickCount={8} />
                    <Tooltip />
                    <Area type="monotone" dataKey={field} stroke="#20bffc" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </section>
    </>
}
export default Chart;