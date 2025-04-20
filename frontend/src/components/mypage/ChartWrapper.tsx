'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartWrapperProps {
  data: Array<{ day: string; hours: number }>;
  chartType: 'bar' | 'line';
  barColor: string;
  lineColor: string;
}

const ChartWrapper = ({ data, chartType, barColor, lineColor }: ChartWrapperProps) => {
  return (
    <div className="w-full h-[250px] min-h-[250px] mt-8">
      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        {chartType === 'bar' ? (
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" name="활동 시간" fill={barColor} />
          </BarChart>
        ) : (
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="hours"
              name="활동 시간"
              stroke={lineColor}
              strokeWidth={2}
              activeDot={{ r: 8 }}
              dot={{ r: 4 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartWrapper;
