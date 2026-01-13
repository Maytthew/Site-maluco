let tempoTotal = 25 * 60;
let tempoRestante = tempoTotal;
let intervalo = null;
let rodando = false;

const timerEl = document.getElementById("timer");
const statusEl = document.getElementById("status");
const minutesInput = document.getElementById("minutes");
const som = document.getElementById("som");

function formatar(seg) {
  const m = String(Math.floor(seg / 60)).padStart(2, "0");
  const s = String(seg % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function atualizar() {
  timerEl.textContent = formatar(tempoRestante);
}

function iniciar() {
  if (rodando) return;
  rodando = true;
  statusEl.textContent = "⏳ Focando...";
  intervalo = setInterval(contar, 1000);
}

function pausar() {
  clearInterval(intervalo);
  rodando = false;
  statusEl.textContent = "⏸️ Pausado";
}

function resetar() {
  clearInterval(intervalo);
  rodando = false;
  tempoTotal = minutesInput.value * 60;
  tempoRestante = tempoTotal;
  atualizar();
  statusEl.textContent = "🔄 Resetado";
}

function pular() {
  clearInterval(intervalo);
  rodando = false;
  tempoRestante = 0;
  atualizar();
  disparar();
}

function contar() {
  tempoRestante--;
  atualizar();
  if (tempoRestante <= 0) {
    clearInterval(intervalo);
    rodando = false;
    disparar();
  }
}

function disparar() {
  statusEl.textContent = "🤓 Hora!";
  som.currentTime = 0;
  som.play();
  criarEmoji();
  tempoTotal = minutesInput.value * 60;
  tempoRestante = tempoTotal;
}

function criarEmoji() {
  const e = document.createElement("div");
  e.className = "emoji";
  e.textContent = "🤓";
  e.style.left = Math.random() * (window.innerWidth - 80) + "px";
  document.body.appendChild(e);
  setTimeout(() => e.remove(), 4000);
}

document.getElementById("start").onclick = iniciar;
document.getElementById("pause").onclick = pausar;
document.getElementById("reset").onclick = resetar;
document.getElementById("skip").onclick = pular;

minutesInput.onchange = resetar;

atualizar();
