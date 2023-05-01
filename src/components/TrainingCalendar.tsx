import { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

import { Training } from "../types/training";
import { API_HOST_URL } from "../utils/const";

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface TrainingEvent {
  start: Date,
  end: Date,
  title: string,
}

function TrainingCalendar() {
  const [trainings, setTrainings] = useState<Array<Training>>([]);
  const [eventsList, setEventsList] = useState<Array<TrainingEvent>>([]);

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

  // Create calendar event of training
  const createEvent = (training: Training): TrainingEvent => {
    const customer = training?.customer ? training.customer : null;
    const customerName = customer ? `${customer.firstname} ${customer.lastname}` : "No customer found";
    const startDate = new Date(training.date);

    return {
      start: startDate,
      end: new Date(startDate.getTime() + (training.duration * 60 * 1000)),
      title: `${training.activity} / ${customerName}`,
    }
  }

  useEffect(() => {
    fetchTrainings();
  }, []);

  useEffect(() => {
    setEventsList(trainings.map(value => createEvent(value)));
  }, [trainings]);

  return (
    <>
      <Calendar
        className="calendar"
        localizer={localizer}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
}

export default TrainingCalendar;