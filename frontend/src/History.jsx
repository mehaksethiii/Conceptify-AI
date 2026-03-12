import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './History.css';

const History = forwardRef(({ onSelect }, ref) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const saved = JSON.parse(localStorage.getItem('doubtHistory') || '[]');
    setHistory(saved);
  };

  useImperativeHandle(ref, () => ({
    refresh: loadHistory
  }));

  const toggleBookmark = (id) => {
    const updated = history.map(item => 
      item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
    );
    setHistory(updated);
    localStorage.setItem('doubtHistory', JSON.stringify(updated));
  };

  const deleteItem = (id) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('doubtHistory', JSON.stringify(updated));
  };

  const clearHistory = () => {
    if (confirm('Clear all history?')) {
      setHistory([]);
      localStorage.removeItem('doubtHistory');
    }
  };

  return (
    <div className="history-content">
      <div className="history-actions-bar">
        <button onClick={clearHistory} className="clear-all-btn">Clear All</button>
        <span className="history-count">{history.length} items</span>
      </div>

      <div className="history-list-inline">
        {history.length === 0 ? (
          <p className="empty-state">No history yet. Start asking questions!</p>
        ) : (
          history.map(item => (
            <div key={item.id} className="history-item-inline">
              <div className="history-content-inline" onClick={() => onSelect(item)}>
                <div className="history-doubt-inline">{item.doubt}</div>
                <div className="history-meta-inline">
                  <span className="history-level-inline">{item.level}</span>
                  <span className="history-time-inline">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="history-actions-inline">
                <button 
                  onClick={() => toggleBookmark(item.id)}
                  className={item.bookmarked ? 'bookmarked' : ''}
                  title="Bookmark"
                >
                  {item.bookmarked ? '⭐' : '☆'}
                </button>
                <button onClick={() => deleteItem(item.id)} title="Delete">🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export default History;
export { History };
