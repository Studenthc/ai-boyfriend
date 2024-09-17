import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const StyleToggle = () => {
  const [style, setStyle] = useState('realistic');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newStyle: string | null,
  ) => {
    if (newStyle !== null) {
      setStyle(newStyle);
    }
  };

  return (
    <ToggleButtonGroup
      value={style}
      exclusive
      onChange={handleChange}
      aria-label="image style"
    >
      <ToggleButton value="realistic" aria-label="realistic">
        Realistic
      </ToggleButton>
      <ToggleButton value="anime" aria-label="anime">
        Anime
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default StyleToggle;