import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Training } from "../../types/training";
import { API_HOST_URL } from "../../utils/const";
import CircularLoading from "../CircularLoading";

interface DataGroup {
  activity: string;
  duration: number;
}

function TrainingStatistics() {
  const [trainings, setTrainings] = useState<Array<Training>>([]);
  const [chartData, setChartData] = useState<Array<DataGroup>>([]);
  const [loading, setLoading] = useState(true);

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
  };

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
    setTimeout(() => {
      setLoading(false);
    }, 500)
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  useEffect(() => {
    addTrainingDuration();
  }, [trainings]);

  if (loading) return <CircularLoading />;
  else {
    return (
      <div className="bar-chart">
        <h2
          style={{
            textAlign: "center",
            fontFamily: "sans-serif, Arial, Helvetica",
          }}
        >
          Training duration in minutes
        </h2>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart width={700} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="activity" />
            <YAxis
              label={{
                value: "Duration (minutes)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Bar dataKey="duration" fill="#8884d8" isAnimationActive={true} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default TrainingStatistics;
