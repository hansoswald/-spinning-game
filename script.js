document.addEventListener('DOMContentLoaded', () => {
  const shareBtn = document.getElementById('share-btn');
  const spinBtn = document.getElementById('spin-btn');
  const historyBtn = document.getElementById('history-btn');
  const instructionsBtn = document.getElementById('instructions-btn');
  const instructions = document.getElementById('instructions');
  const wheel = document.getElementById('wheel');
  const ctx = wheel.getContext('2d');
  const statusElement = document.getElementById('share-status');
  const popup = document.getElementById('popup-result');
  const services = [
    { name: 'Logo Design', price: '10,000' },
    { name: 'Flyer Design', price: '10,000' },
    { name: 'Poster Design', price: '10,000' },
    { name: 'Business Card Design', price: '10,000' },
  ];

  let isGameUnlocked = false;
  let spinHistory = [];

  function drawWheel() {
    const segmentAngle = (2 * Math.PI) / services.length;
    const colors = ['#ff6f61', '#6b8e23', '#3b9f9f', '#ffc107'];

    for (let i = 0; i < services.length; i++) {
      ctx.beginPath();
      ctx.moveTo(250, 250);
      ctx.arc(250, 250, 250, i * segmentAngle, (i + 1) * segmentAngle);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
    }
  }

  shareBtn.addEventListener('click', () => {
    const message = encodeURIComponent(`🎉 Play the Spin Game and Win! https://your-game-link`);
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
    statusElement.textContent = 'Game unlocked! You can now spin the wheel!';
    spinBtn.disabled = false;
  });

  spinBtn.addEventListener('click', () => {
    if (!isGameUnlocked) return alert('Share the game first!');
    const winner = services[Math.floor(Math.random() * services.length)];
    popup.textContent = `🎉 You Won ${winner.name} for ${winner.price}! 🎉`;
    popup.classList.remove('hidden');
    setTimeout(() => popup.classList.add('hidden'), 5000);
  });

  historyBtn.addEventListener('click', () => {
    alert(spinHistory.length ? spinHistory.join('\n') : 'No spins yet.');
  });

  instructionsBtn.addEventListener('click', () => {
    instructions.classList.toggle('hidden');
  });

  drawWheel();
});
