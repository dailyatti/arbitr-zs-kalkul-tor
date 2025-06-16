"use strict";

// Arbitrázs Kalkulátor Frontend Logika
// Minden függvény a window.arbitrageApp névtérbe kerül

/**
 * Segédfüggvény: szám formázása két tizedesre
 * @param {number} num
 * @returns {string}
 */
const formatNumber = (num) => Number(num).toFixed(2);

/**
 * Arbitrázs lista kirajzolása
 * @param {Array} arbs
 */
function renderArbs(arbs) {
    if (!Array.isArray(arbs)) {
        console.error('Hibás arbitrázs adatok!');
        return;
    }
    const tbody = document.getElementById('arb-body');
    const template = document.getElementById('row-template')?.textContent?.trim();
    if (!tbody || !template) {
        console.error('Hiányzó DOM elem!');
        return;
    }
    tbody.innerHTML = '';
    arbs.forEach(arb => {
        try {
            const row = createArbRow(arb, template);
            if (row) tbody.appendChild(row);
        } catch (e) {
            console.error('Sor renderelési hiba:', e);
        }
    });
}

/**
 * Egy arbitrázs sor létrehozása
 * @param {Object} arb
 * @param {string} template
 * @returns {HTMLElement|null}
 */
function createArbRow(arb, template) {
    let html = template
        .replace('{{eventId}}', arb.eventId || '')
        .replace('{{marketId}}', arb.marketId || '')
        .replace('{{league}}', arb.league || '')
        .replace('{{home}}', arb.home || '')
        .replace('{{away}}', arb.away || '')
        .replace('{{marketName}}', arb.marketName || '')
        .replace('{{profit}}', formatNumber(arb.profit || 0));
    const tmp = document.createElement('tbody');
    tmp.innerHTML = html;
    const row = tmp.firstElementChild;
    if (!row) return null;
    // Profit cella színezése
    const profitCell = row.querySelector('.profit');
    if (profitCell) profitCell.classList.add(arb.profit > 0 ? 'positive' : 'negative');
    // Események
    addRowEventListeners(row, arb);
    return row;
}

/**
 * Eseménykezelők hozzáadása egy sorhoz
 * @param {HTMLElement} row
 * @param {Object} arb
 */
function addRowEventListeners(row, arb) {
    const stake1Btn = row.querySelector('.stake-1');
    const stake2Btn = row.querySelector('.stake-2');
    if (stake1Btn) stake1Btn.addEventListener('click', e => { e.stopPropagation(); highlightRow(row); });
    if (stake2Btn) stake2Btn.addEventListener('click', e => { e.stopPropagation(); highlightRow(row); });
    row.addEventListener('click', e => {
        if (!e.target.closest('button')) scrollToMarket(arb.marketId);
    });
}

/**
 * Aktív sor kiemelése
 * @param {HTMLElement} targetRow
 */
function highlightRow(targetRow) {
    if (!targetRow) return;
    document.querySelectorAll('.arb-row.active').forEach(r => r.classList.remove('active'));
    targetRow.classList.add('active');
}

/**
 * Görgetés a piac mezőre
 * @param {string} marketId
 */
function scrollToMarket(marketId) {
    if (!marketId) return;
    const el = document.querySelector(`[data-market-id="${marketId}"]`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 1600);
}

// Automatikus inicializálás, ha szükséges
// Példa: document.addEventListener('DOMContentLoaded', () => { ... });

// Exportálás
window.arbitrageApp = { renderArbs, highlightRow, scrollToMarket }; 