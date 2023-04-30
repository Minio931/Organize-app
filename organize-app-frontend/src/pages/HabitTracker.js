import React, { useState, useEffect } from "react";

const HabitTrackerPage = () => {
  const [habits, setHabits] = useState(false);

  return (
    <div>
      <h1>Habit Tracker</h1>
      {habits ? habits : "There are no habits"}
    </div>
  );
};

export default HabitTrackerPage;
