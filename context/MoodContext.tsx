import React, { createContext, useState, useContext } from 'react';

interface MoodContextType {
  selectedMood: string | null;
  setSelectedMood: (mood: string | null) => void;
}

const MoodContext = createContext<MoodContextType>({
  selectedMood: null,
  setSelectedMood: () => {},
});

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <MoodContext.Provider value={{ selectedMood, setSelectedMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => useContext(MoodContext);
