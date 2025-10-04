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
  TooltipProps,
} from 'recharts';

interface ChartWrapperProps {
  data: Array<{ day: string; hours: number }>;
  chartType: 'bar' | 'line';
  barColor: string;
  lineColor: string;
}

// 커스텀 툴팁 컴포넌트
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const value = payload[0].value as number;
    const totalMinutes = Math.round(value * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let timeText = '';
    if (hours === 0 && minutes === 0) {
      timeText = '0분';
    } else if (hours === 0) {
      timeText = `${minutes}분`;
    } else if (minutes === 0) {
      timeText = `${hours}시간`;
    } else {
      timeText = `${hours}시간 ${minutes}분`;
    }

    return (
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-3">
        <p className="text-sm font-medium text-gray-900">{payload[0].payload.day}</p>
        <p className="text-sm text-indigo-600 font-semibold">{timeText}</p>
      </div>
    );
  }
  return null;
};

const ChartWrapper = ({ data, chartType, barColor, lineColor }: ChartWrapperProps) => {
  return (
    <div className="w-full h-[250px] min-h-[250px] mt-7">
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
            <Tooltip content={<CustomTooltip />} />
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
            <Tooltip content={<CustomTooltip />} />
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
