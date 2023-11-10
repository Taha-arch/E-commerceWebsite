import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
const data = [
    {
      name: 'Jan',
      Expense: 6000,
      Income: 5234,
    },
    {
      name: 'Feb',
      Expense: 4889,
      Income: 3234,
    },
    {
      name: 'Mar',
      Expense: 4186,
      Income: 6572,
    },
    {
      name: 'Apr',
      Expense: 6922,
      Income: 4401,
    },
    {
      name: 'May',
      Expense: 5002,
      Income: 4025,
    },
    {
      name: 'Jun',
      Expense: 4150,
      Income: 2000,
    },
    {
      name: 'July',
      Expense: 4582,
      Income: 6940,
    },
    {
      name: 'Aug',
      Expense: 4500,
      Income: 1500,
    },
    {
      name: 'Sep',
      Expense: 9045,
      Income: 3000,
    },
    {
      name: 'Oct',
      Expense: 7710,
      Income: 4000,
    },
    {
      name: 'Nov',
      Expense: 9600,
      Income: 7852,
    },
    {
      name: 'Dec',
      Expense: 2000,
      Income: 9546,
    }
  ]
function TransactionChart() {
  return (
    <div className='h-[22rem] bg-white p-4 rounded-lg border border-gray-200 flex flex-col flex-1'>
    <strong className='text-gray-700 font-medium'>Transactions</strong>
    <div className='w-full mt-3 flex-1 text-xs'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500}
        height={300}
        data={data}
        margin={{
            top: 20,
            right: 10,
            left: -10,
            bottom: 0,
        }}>
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Income" fill="#4d84e4"  />
          <Bar dataKey="Expense" fill="#c5dbf8"  />
       

        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  )
}

export default TransactionChart
