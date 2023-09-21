import React, { useEffect, useState } from 'react'
import Button from '../../components/Button/Button'
import LeftSideBarAdmin from '../../components/LeftSideBarAdmin/LeftSideBarAdmin'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,  } from 'recharts';
import axios from 'axios';

const Report = () => {

  const [rangeTanggal, setRangeTanggal] = useState({
    awal : new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() - 1),
    akhir : new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() + 1)
  })
  const [datas, setDatas] = useState(null)
  const [data, setData] = useState(null)
  const [dataTgl, setDataTgl] = useState(null)

  console.log(data);
  const handleChange = (e) => {
    // console.log(e.target.value);
    const newTanggal = {...rangeTanggal}
    newTanggal[e.target.name] = e.target.value
    setRangeTanggal(newTanggal)
  }

  const apply = async () => {
    try {
      // console.log("test");
      const res = await axios.get(`http://localhost:3001/report/tanggal?awal=${rangeTanggal.awal}&akhir=${rangeTanggal.akhir}`)
      // console.log(res);
      setDatas(res.data.dataFix)
      const hasil = Object.entries(res.data.dataFix.kategori_paling_diminati).map(([kategori, jumlah]) => ({ name: kategori, value: jumlah }));
      setData(hasil)
      const data = Object.entries(res.data.dataFix.rata_rata_pendapatan_perDay).map(([tanggal, jumlah]) => {
        const namaBulan = tanggal.split(' ')[2]; // Mengambil nama bulan
        const namaHari = tanggal.split(' ')[1]; // Mengambil nama hari
        return { name: `${namaBulan} ${namaHari}`, value: jumlah };
      });
      setDataTgl(data)
    } catch (error) {
      console.log(error);
    }
  }
console.log(dataTgl);
  const dataa = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(()=>{
    apply()
  },[])
  if (!datas || !data) {
    return <>loading</>
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className='grid h-screen'>
    <div className='flex gap-3'>
    <LeftSideBarAdmin />
    <div className='bg-slate-300 h-full px-10'>

      <div className='grid grid-cols-4 '>
        <div className='col-span-2 grid grid-cols-2'>
            <div className='flex justify-between items-center gap-2'>
            <input name='awal' onChange={handleChange} value={rangeTanggal.awal} placeholder='select date' type="date" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                <span>To</span>
            <input name='akhir' onChange={handleChange} value={rangeTanggal.akhir} placeholder='select date' type="date" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>
            <div className='ml-10'>
                <button onClick={apply} className='rounded-xl text-white bg-customPrimary px-8 py-[8px]'>Apply</button>
            </div>
        </div>
        <div className='col-span-2 flex justify-end'>
            <button>Print Report</button>
        </div>
      </div>


      <div className='mt-10 grid md:grid-cols-4 grid-cols-2 gap-10 '>
        <div className='col-span-2 grid justify-center items-center align-middle grid-cols-1 '>
          <div className='p-5 border shadow-xl grid gap-5'>
            <div className='flex justify-between border-b-2 border-orange-400'><span className='text-lg font-semibold'>Time Frame : </span> <span className='font-mono text-base'>{rangeTanggal.awal} To {rangeTanggal.akhir}</span> </div>
            <div className='flex justify-between border-b-2 border-orange-400'><span className='text-lg font-semibold'>Total Penjualan : </span> <span className='font-mono text-base'>Rp. {(datas.total_pendapatan).toLocaleString()}</span> </div>
            <div className='flex justify-between border-b-2 border-orange-400'> <span className='text-lg font-semibold'>Total Transaksi :</span> <span className='font-mono text-base'>{datas.total_transaksi}</span> </div>
            <div className='flex justify-between border-b-2 border-orange-400'> <span className='text-lg font-semibold'>Total Produk Terjual :</span> <span className='font-mono text-base'>{datas.total_produk_terjual}</span> </div>
            <div className='flex justify-between border-b-2 border-orange-400'> <span className='text-lg font-semibold'>Rata Rata Penjualan :</span> <span className='font-mono text-base'>Rp. {(datas.rata_rata_pendapatan).toLocaleString()}</span> </div>            
          </div>

        </div>
        <div className='col-span-2 bg-cyan-300'>
            <div className='p-5'>
              <div className='flex justify-center'>
                <span className='text-lg font-bold'>kategori paling banyak diminati</span>
              </div>
              
            <PieChart width={250} height={250}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <div className='grid grid-cols-2 md:flex justify-center'>
          {data ?
            data.map((item, index) => {
              return (
                <div className='flex p-3 gap-2 justify-center align-middle items-center'>
                <div style={{backgroundColor: `${COLORS[index]}`}} className='w-4 h-4 rounded-full'></div>
                <span className='text-xs'>{item.name}</span>             
                </div>
              )
            }) : <></>
          }
        </div>
            </div>
        </div>
      </div>


      <div className='mt-10'>
        <div>
        <AreaChart
          width={800}
          height={400}
          data={dataTgl}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        </div>
      </div>

    </div>
    </div>
    </div>

  )
}

export default Report
