import { PluginChartApp } from './plugin-chart-app.js';

const prevOnload = window.onload;
window.onload = () => {
  prevOnload();
  new PluginChartApp();
};