import React, { useState, useEffect } from "react";

const HabitTrackerPage = () => {
  const [habits, setHabits] = useState(false);
  useEffect(() => {
    getHabits();
  }, []);

  const getHabits = () => {
    fetch("http://localhost:3001/")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setHabits(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Habit Tracker</h1>
      {habits ? habits : "There are no habits"}
    </div>
  );
};

export default HabitTrackerPage;
