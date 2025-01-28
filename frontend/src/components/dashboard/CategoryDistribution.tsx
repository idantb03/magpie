"use client"
import { Card, Text } from "@radix-ui/themes"
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function CategoryDistribution() {
  const data = {
    labels: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography'],
    datasets: [
      {
        data: [400, 300, 200, 150, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card size="3" variant="surface">
      <Text as="div" size="4" weight="bold" mb="4">
        Books by Category
      </Text>
      <div className="h-[300px]">
        <Pie data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </Card>
  );
} 