
const LAUNCH = new Date('2026-08-15T00:00:00+05:30');

const elMonths  = document.getElementById('months');
const elDays    = document.getElementById('days');
const elHours   = document.getElementById('hours');
const elMinutes = document.getElementById('minutes');
const elSeconds = document.getElementById('seconds');

const cardMonths  = document.getElementById('card-months');
const cardDays    = document.getElementById('card-days');
const cardHours   = document.getElementById('card-hours');
const cardMinutes = document.getElementById('card-minutes');
const cardSeconds = document.getElementById('card-seconds');

const prev = { months: -1, days: -1, hours: -1, minutes: -1, seconds: -1 };

function pad(n) { return String(Math.max(0, Math.floor(n))).padStart(2, '0'); }

function flip(card) {
  card.classList.remove('flip');
  void card.offsetWidth;          // reflow
  card.classList.add('flip');
}

function update(key, val, el, card) {
  if (prev[key] !== val) {
    if (prev[key] !== -1) flip(card);
    el.textContent = pad(val);
    prev[key] = val;
  }
}

function tick() {
  const diff = LAUNCH - Date.now();

  if (diff <= 0) {
    // Launched — show zeros and stop
    [elMonths, elDays, elHours, elMinutes, elSeconds]
      .forEach(el => el.textContent = '00');
    clearInterval(timer);
    return;
  }

  const totalSec = diff / 1000;

  // months: approximate with 30.4375 days/month
  const months  = Math.floor(totalSec / (30.4375 * 86400));
  const remM    = totalSec - months * 30.4375 * 86400;
  const days    = Math.floor(remM / 86400);
  const remD    = remM - days * 86400;
  const hours   = Math.floor(remD / 3600);
  const remH    = remD - hours * 3600;
  const minutes = Math.floor(remH / 60);
  const seconds = Math.floor(remH - minutes * 60);

  update('months',  months,  elMonths,  cardMonths);
  update('days',    days,    elDays,    cardDays);
  update('hours',   hours,   elHours,   cardHours);
  update('minutes', minutes, elMinutes, cardMinutes);
  update('seconds', seconds, elSeconds, cardSeconds);
}

tick();                          // immediate first paint
const timer = setInterval(tick, 1000);
