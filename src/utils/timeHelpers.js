export const formatTimestamp = (isoString) => {
  if (!isoString) return { timeStr: 'N/A', relativeStr: '' };
  const date = new Date(isoString);
  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  
  const diffMins = Math.floor((new Date() - date) / 60000);
  let relativeStr = diffMins < 1 ? 'Just now' : diffMins < 60 ? `${diffMins}m ago` : `${Math.floor(diffMins/60)}h ago`;
  return { timeStr, relativeStr };
};
