import { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    byLevel: {},
    streak: 0,
    lastActive: null,
    bookmarked: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const history = JSON.parse(localStorage.getItem('doubtHistory') || '[]');
    
    const byLevel = {};
    let bookmarkedCount = 0;
    
    history.forEach(item => {
      byLevel[item.level] = (byLevel[item.level] || 0) + 1;
      if (item.bookmarked) bookmarkedCount++;
    });

    // Calculate streak
    const dates = history.map(h => new Date(h.timestamp).toDateString());
    const uniqueDates = [...new Set(dates)];
    const streak = calculateStreak(uniqueDates);

    setStats({
      totalQuestions: history.length,
      byLevel,
      streak,
      lastActive: history[0]?.timestamp,
      bookmarked: bookmarkedCount
    });
  };

  const calculateStreak = (dates) => {
    if (dates.length === 0) return 0;
    
    let streak = 1;
    const today = new Date().toDateString();
    
    if (dates[0] !== today) return 0;
    
    for (let i = 1; i < dates.length; i++) {
      const diff = new Date(dates[i-1]) - new Date(dates[i]);
      const daysDiff = diff / (1000 * 60 * 60 * 24);
      
      if (daysDiff === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  return (
    <div className="dashboard-content-inline">
      <div className="stats-grid-inline">
        <div className="stat-card-inline">
          <div className="stat-value-inline">{stats.totalQuestions}</div>
          <div className="stat-label-inline">Questions Asked</div>
        </div>
        
        <div className="stat-card-inline">
          <div className="stat-value-inline">{stats.streak} 🔥</div>
          <div className="stat-label-inline">Day Streak</div>
        </div>
        
        <div className="stat-card-inline">
          <div className="stat-value-inline">{Object.keys(stats.byLevel).length}</div>
          <div className="stat-label-inline">Levels Explored</div>
        </div>

        <div className="stat-card-inline">
          <div className="stat-value-inline">{stats.bookmarked} ⭐</div>
          <div className="stat-label-inline">Bookmarked</div>
        </div>
      </div>

      {Object.keys(stats.byLevel).length > 0 && (
        <div className="level-breakdown-inline">
          <h4>Questions by Level</h4>
          {Object.entries(stats.byLevel).map(([level, count]) => (
            <div key={level} className="level-bar-inline">
              <span className="level-name-inline">{level}</span>
              <div className="bar-container-inline">
                <div 
                  className="bar-fill-inline" 
                  style={{ width: `${(count / stats.totalQuestions) * 100}%` }}
                />
              </div>
              <span className="level-count-inline">{count}</span>
            </div>
          ))}
        </div>
      )}

      {stats.lastActive && (
        <div className="last-active-inline">
          Last active: {new Date(stats.lastActive).toLocaleString()}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
