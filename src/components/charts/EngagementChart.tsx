import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../../lib/chartSetup';
import { EngagementTimeSeriesPoint } from '../../types/domain';
import { Skeleton } from '../ui/Skeleton';
import { useTheme } from '../../context/ThemeContext';

export interface EngagementChartProps {
  dataPoints: EngagementTimeSeriesPoint[];
  isLoading?: boolean;
}

export const EngagementChart: React.FC<EngagementChartProps> = ({
  dataPoints,
  isLoading = false,
}) => {
  const { effectiveTheme } = useTheme();

  if (isLoading) {
    return (
      <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4">
        <Skeleton variant="text" width={180} height={24} />
        <Skeleton variant="rectangular" height={280} className="w-full" />
      </div>
    );
  }

  const isDark = effectiveTheme === 'dark';
  const gridColor = isDark ? '#252B34' : '#E2E6EB';
  const textColor = isDark ? '#8D98A8' : '#687180';

  const labels = dataPoints.map((p) => p.date);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Likes',
        data: dataPoints.map((p) => p.likes),
        backgroundColor: '#6C63FF',
        borderRadius: 4,
      },
      {
        label: 'Comments',
        data: dataPoints.map((p) => p.comments),
        backgroundColor: '#C7F36B',
        borderRadius: 4,
      },
      {
        label: 'Shares / Retweets',
        data: dataPoints.map((p) => p.shares),
        backgroundColor: '#1DA1F2',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          color: textColor,
          font: { family: 'Space Grotesk', size: 11 },
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#181D25' : '#FFFFFF',
        titleColor: isDark ? '#F4F7FA' : '#111318',
        bodyColor: isDark ? '#8D98A8' : '#687180',
        borderColor: gridColor,
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: textColor, font: { family: 'Inter', size: 10 } },
      },
      y: {
        grid: { color: gridColor, drawBorder: false },
        ticks: { color: textColor, font: { family: 'Space Grotesk', size: 10 } },
      },
    },
  };

  return (
    <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold font-display text-[var(--text-primary)]">
            Engagement Breakdown
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Likes, comments, and shares across selected platforms
          </p>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
