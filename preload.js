const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const refreshBtn = document.createElement('div');
  refreshBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="1" y1="1" x2="23" y2="23"></line>
      <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
      <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
      <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
      <path d="M1.42 9a16 16 0 0 1 4.7-2.88"></path>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
      <line x1="12" y1="20" x2="12.01" y2="20"></line>
    </svg>
  `;
  
  Object.assign(refreshBtn.style, {
    position: 'fixed', bottom: '20px', right: '20px', width: '28px', height: '28px',
    backgroundColor: '#1e1e1e', color: 'rgba(255, 255, 255, 0.4)', borderRadius: '4px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    zIndex: '10005', border: '1px solid rgba(255, 255, 255, 0.1)', userSelect: 'none',
    transition: 'all 0.2s ease-in-out'
  });

  const tooltip = document.createElement('div');
  tooltip.innerText = 'Use this button if you experience network issues';
  Object.assign(tooltip.style, {
    position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#2a2a2a',
    color: '#ffffff', padding: '0 12px', borderRadius: '4px', fontSize: '11px',
    fontWeight: '500', zIndex: '10004', pointerEvents: 'none', opacity: '0',
    transform: 'translateX(0)', transition: 'transform 0.25s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 0.2s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)', whiteSpace: 'nowrap', boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    display: 'flex', alignItems: 'center', height: '28px'
  });

  refreshBtn.onmouseenter = () => {
    refreshBtn.style.color = '#ffffff';
    refreshBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateX(-35px)';
  };
  refreshBtn.onmouseleave = () => {
    refreshBtn.style.color = 'rgba(255, 255, 255, 0.4)';
    refreshBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateX(0)';
  };
  refreshBtn.onclick = () => { ipcRenderer.send('hard-refresh'); };

  document.body.appendChild(tooltip);
  document.body.appendChild(refreshBtn);
});