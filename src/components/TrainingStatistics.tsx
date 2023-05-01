import { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import { Training } from "../types/training";
import { API_HOST_URL } from "../utils/const";

interface DataGroup {
  activity: string,
  duration: number,
}

function TrainingStatistics() {
  const [trainings, setTrainings] = useState<Array<Training>>([]);
  const [chartData, setChartData] = useState<Array<DataGroup>>([]);

  // This holds total duration for each training
  const trainingTotalDurations = new Map<string, number>();

  const fetchTrainings = () => {
    fetch(`${API_HOST_URL}/gettrainings`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch trainings data");
        }
        return response.json();
      })
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  }

  // Adds total training duration for each training
  const addTrainingDuration = () => {
    trainings.forEach((training) => {
      const totalDuration = trainingTotalDurations.get(training.activity);
      totalDuration
        ? trainingTotalDurations.set(
            training.activity,
            totalDuration + training.duration
          )
        : trainingTotalDurations.set(training.activity, training.duration);
    });
    
    // Creates barchart data groups
    const data: Array<DataGroup> = [];
    trainingTotalDurations.forEach((value, key) => {
      data.push({
        activity: key,
        duration: value,
      } as DataGroup);
    });
    
    setChartData(data);
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  useEffect(() => {
    addTrainingDuration();
  }, [trainings]);

  return (
    <>
      <h1>Training Statistics</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <BarChart width={730} height={250} data={chartData} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis label={{ value: "Duration (minutes)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Bar dataKey="duration" fill="#8884d8" isAnimationActive={true} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default TrainingStatistics;