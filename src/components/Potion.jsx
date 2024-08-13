import React, { useState } from 'react';
import Sectionwrapper from './Sectionwrapper';
import Input from './Inputs/Input';
import MOrF from './Inputs/MOrF';

export default function Potion() {
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary'); // Default activity level

  // State for holding the macronutrient results
  const [macros, setMacros] = useState(null);

  // Define activity multipliers and descriptions
  const activityLevels = {
    sedentary: { multiplier: 1.2, description: 'Little to no exercise. Mostly sedentary lifestyle.' },
    lightly_active: { multiplier: 1.375, description: 'Light exercise/sports 1-3 days/week.' },
    moderately_active: { multiplier: 1.55, description: 'Moderate exercise/sports 3-5 days/week.' },
    very_active: { multiplier: 1.725, description: 'Hard exercise/sports 6-7 days a week.' },
    extra_active: { multiplier: 1.9, description: 'Very hard exercise/sports and physical job or 2x training.' }
  };

  function handleBrew() {
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseInt(age, 10);

    let bmr = 0;

    // Calculate BMR based on gender
    if (gender === 'Male') {
      bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * ageInYears);
    } else if (gender === 'Female') {
      bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * ageInYears);
    }

    // Adjust daily caloric needs based on activity level
    const dailyCalories = bmr * (activityLevels[activityLevel]?.multiplier || 1.2);

    // Macronutrient distribution
    const proteinRatio = 0.3; // 30% of daily calories
    const fatRatio = 0.25; // 25% of daily calories
    const carbRatio = 0.45; // 45% of daily calories

    const caloriesFromProtein = dailyCalories * proteinRatio;
    const caloriesFromFat = dailyCalories * fatRatio;
    const caloriesFromCarbs = dailyCalories * carbRatio;

    const gramsOfProtein = caloriesFromProtein / 4;
    const gramsOfFat = caloriesFromFat / 9;
    const gramsOfCarbs = caloriesFromCarbs / 4;

    // Save the calculated macros to state
    setMacros({
    calories: dailyCalories.toFixed(2),
    protein: gramsOfProtein.toFixed(2),
    fat: gramsOfFat.toFixed(2),
    carbs: gramsOfCarbs.toFixed(2)
    });
}

return (
    <Sectionwrapper header={"don't forget to"} title={["Brew", "your", "potions"]}> 
    <div className='grid grid-cols-1 sm:grid-cols-1 gap-2 '>
        <Input hint="Enter your age" type="number" setVar={setAge}/>
        <Input hint="Enter your height (cm)" type="number" setVar={setHeight}/>
        <Input hint="Enter your weight (kg)" type="number" setVar={setWeight}/>
        <MOrF gender={gender} setGender={setGender}/>

        {/* Activity Level Picker */}
        <div className='my-3'>
        <h3 className='text-lg font-semibold'>Select your activity level:</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {Object.keys(activityLevels).map(level => (
            <button
                key={level}
                onClick={() => setActivityLevel(level)}
                className={'bg-slate-950 py-2 px-4 rounded-lg border-[2px] border-solid border-blue-400 duration-200 ' +
                (activityLevel === level ? 'green-shadow border-green-400' : 'blue-shadow')}
            >
                <div className='text-sm font-semibold'>{level.replace('_', ' ').toUpperCase()}</div>
                <div className='text-xs'>{activityLevels[level].description}</div>
            </button>
            ))}
        </div>
        </div>

        <button
        type="submit"
        className='text-xl bg-slate-950 py-4 my-3 rounded-lg border-[2px] border-blue-400 border-solid duration-200 blue-shadow'
        onClick={handleBrew}
        >
        Brew
        </button>

        {/* Display the calculated macros if they exist */}
        {macros && (
        <div className='bg-slate-800 p-4 rounded-lg blue-shadow-no-hover border-[2px] border-solid border-blue-400'>
            <h3 className='text-lg font-semibold'>Your Daily Needs:</h3>
            <p>Calories: {macros.calories} kcal/day</p>
            <p>Protein: {macros.protein} g/day</p>
            <p>Fat: {macros.fat} g/day</p>
            <p>Carbs: {macros.carbs} g/day</p>
        </div>
        )}
    </div>
    </Sectionwrapper>
);
}
