import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const GenderToggle = () => {
  const [gender, setGender] = useState('female');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newGender: string | null,
  ) => {
    if (newGender !== null) {
      setGender(newGender);
    }
  };

  return (
    <ToggleButtonGroup
      value={gender}
      exclusive
      onChange={handleChange}
      aria-label="gender"
    >
      <ToggleButton value="female" aria-label="female">
        Female
      </ToggleButton>
      <ToggleButton value="male" aria-label="male">
        Male
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default GenderToggle;