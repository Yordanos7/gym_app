// the app would have this database models

the first users model

2nd Category

3rd Exercise

4th WorkoutExercise

5th Progress

| Model               | Purpose                                                    |
| ------------------- | ---------------------------------------------------------- |
| **User**            | Auth + profile + owns workouts, exercises, progress        |
| **Category**        | Organize exercises/workouts into logical groups            |
| **Exercise**        | Stores exercise info, YouTube video, type, notes           |
| **Workout**         | Represents a workout session containing multiple exercises |
| **WorkoutExercise** | Links Workout ↔ Exercise, tracks sets/reps/weight, order   |
| **Progress**        | Track weight, strength, body measurements over time        |
| **Optional**        | FavoriteExercises / Bookmarks, extra metrics in Progress   |
