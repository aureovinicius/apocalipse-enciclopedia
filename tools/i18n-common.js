/* Utilitários de i18n: lista de artigos (PT), caminhos por idioma e hash do
   conteúdo traduzível do fonte PT (para detectar traduções desatualizadas). */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.join(__dirname, '..');
const LANGS = ['en', 'es', 'ja'];

function loadObj(file) {
  globalThis.window = { APOC: { _o: null, register: function (t, o) { this._o = o; } } };
  try { delete require.cache[require.resolve(file)]; } catch (e) {}
  require(file);
  return globalThis.window.APOC._o;
}

function ptIndex() {
  globalThis.window = { APOC: { register: function () {} } };
  var f = path.join(ROOT, 'data', 'search-index.js');
  delete require.cache[require.resolve(f)];
  require(f);
  return globalThis.window.APOC.index || [];
}

function ptPath(e) {
  return e.type === 'chapter'
    ? path.join(ROOT, 'data', e.book, 'chapters', 'cap-' + e.id + '.js')
    : path.join(ROOT, 'data', e.book, 'themes', e.slug + '.js');
}
function trPath(e, lang) {
  return e.type === 'chapter'
    ? path.join(ROOT, 'data', e.book, lang, 'cap-' + e.id + '.js')
    : path.join(ROOT, 'data', e.book, lang, 'themes', e.slug + '.js');
}

/* hash só do conteúdo que é traduzido (título, resumo, intro, ênfase,
   texto dos versículos e stance/text das interpretações). */
function transHash(o) {
  if (!o) return '';
  var t = {
    title: o.title || '', summary: o.summary || '', intro: o.intro || '', adv: o.adventistEmphasis || '',
    verses: (o.verses || []).map(function (v) { return v.text; }),
    interps: (o.interpretations || []).map(function (i) { return [i.stance || '', i.text || '']; })
  };
  return crypto.createHash('sha1').update(JSON.stringify(t)).digest('hex').slice(0, 12);
}

function label(e) {
  return e.book + '/' + (e.type === 'chapter' ? 'cap-' + e.id : 'themes/' + e.slug);
}

module.exports = { ROOT, fs, path, LANGS, loadObj, ptIndex, ptPath, trPath, transHash, label };
