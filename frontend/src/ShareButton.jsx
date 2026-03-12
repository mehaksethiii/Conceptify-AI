import './ShareButton.css';

function ShareButton({ doubt, response }) {
  const handleShare = async () => {
    const text = `📚 Conceptify AI Explanation\n\nQuestion: ${doubt}\n\nExplanation: ${response.explanation}\n\nAnalogy: ${response.analogy}\n\nTry it: ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Conceptify AI - ' + doubt,
          text: text
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard! Share it anywhere.');
    }
  };

  const handleDownload = () => {
    const content = `CONCEPTIFY AI - EXPLANATION\n\n` +
      `Question: ${doubt}\n\n` +
      `Explanation:\n${response.explanation}\n\n` +
      `Real-Life Analogy:\n${response.analogy}\n\n` +
      `Practice Questions:\n${response.questions.map((q, i) => `${i+1}. ${q}`).join('\n')}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conceptify-${doubt.slice(0, 30)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="share-buttons">
      <button onClick={handleShare} className="share-btn">
        🔗 Share
      </button>
      <button onClick={handleDownload} className="download-btn">
        📥 Download
      </button>
    </div>
  );
}

export default ShareButton;
