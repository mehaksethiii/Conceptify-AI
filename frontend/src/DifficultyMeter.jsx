import './DifficultyMeter.css';

function DifficultyMeter({ level }) {
  const getDifficulty = (level) => {
    const difficulties = {
      'Nursery/KG': 1,
      'Class 1-2': 1,
      'Class 3-5': 2,
      'Class 6-8': 3,
      'Class 9-10': 4,
      'Class 11-12': 5,
      'Undergraduate': 6,
      'Engineering': 7,
      'Medical': 7,
      'Postgraduate': 8,
      'JEE/NEET': 8,
      'UPSC/SSC': 8,
      'GRE/GMAT': 8,
      'Working Professional': 7,
      'Research Scholar': 9
    };
    return difficulties[level] || 5;
  };

  const difficulty = getDifficulty(level);
  const percentage = (difficulty / 9) * 100;

  const getColor = () => {
    if (difficulty <= 3) return '#4caf50';
    if (difficulty <= 6) return '#ff9800';
    return '#f44336';
  };

  const getLabel = () => {
    if (difficulty <= 3) return 'Beginner';
    if (difficulty <= 6) return 'Intermediate';
    return 'Advanced';
  };

  return (
    <div className="difficulty-meter">
      <div className="difficulty-label">
        <span>Difficulty: {getLabel()}</span>
        <span>{difficulty}/9</span>
      </div>
      <div className="difficulty-bar">
        <div 
          className="difficulty-fill" 
          style={{ 
            width: `${percentage}%`,
            background: getColor()
          }}
        />
      </div>
    </div>
  );
}

export default DifficultyMeter;
