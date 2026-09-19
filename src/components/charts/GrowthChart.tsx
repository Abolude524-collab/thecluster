import React from 'react';
import { Line } from 'react-chartjs-2';
import '../../lib/chartSetup';
import { GrowthTimeSeriesPoint, PlatformId } from '../../types/domain';
import { Skeleton } from '../ui/Skeleton';
import { useTheme } from '../../context/ThemeContext';

export interface GrowthChartProps {
  dataPoints: GrowthTimeSeriesPoint[];
  activePlatforms: PlatformId[];
  isLoading?: boolean;
}

export const GrowthChart: React.FC<GrowthChartProps> = ({
  dataPoints,
  activePlatforms,
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

  const datasets = [];

  if (activePlatforms.includes('youtube')) {
    datasets.push({
      label: 'YouTube',
      data: dataPoints.map((p) => p.youtube ?? null),
      borderColor: '#FF0000',
      backgroundColor: 'rgba(255, 0, 0, 0.08)',
      tension: 0.35,
      pointRadius: 2,
      pointHoverRadius: 5,
      fill: true,
    });
  }

  if (activePlatforms.includes('instagram')) {
    datasets.push({
      label: 'Instagram',
      data: dataPoints.map((p) => p.instagram ?? null),
      borderColor: '#E1306C',
      backgroundColor: 'rgba(225, 48, 108, 0.08)',
      tension: 0.35,
      pointRadius: 2,
      pointHoverRadius: 5,
      fill: true,
    });
  }

  if (activePlatforms.includes('x')) {
    datasets.push({
      label: 'X',
      data: dataPoints.map((p) => p.x ?? null),
      borderColor: '#1DA1F2',
      backgroundColor: 'rgba(29, 161, 242, 0.08)',
      tension: 0.35,
      pointRadius: 2,
      pointHoverRadius: 5,
      fill: true,
    });
  }

  const chartData = {
    labels,
    datasets,
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
        grid: { color: gridColor, drawBorder: false },
        ticks: { color: textColor, font: { family: 'Inter', size: 10 } },
      },
      y: {
        grid: { color: gridColor, drawBorder: false },
        ticks: { color: textColor, font: { family: 'Space Grotesk', size: 10 } },
      },
    },
  };

  const latestPoint = dataPoints[dataPoints.length - 1];

  return (
    <div className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold font-display text-[var(--text-primary)]">
            Audience Growth Trend
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Cross-platform subscriber & follower progression
          </p>
        </div>
      </div>

      {/* Accessible Screen Reader Summary */}
      <div className="sr-only">
        Audience growth trend chart showing latest total audience of{' '}
        {latestPoint ? latestPoint.total.toLocaleString() : '0'}.
      </div>

      <div className="h-[280px] w-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
