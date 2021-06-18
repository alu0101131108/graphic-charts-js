import { PluginChartApp } from './plugin-files/plugin-chart-app.js';

const prevOnload = window.onload;
window.onload = () => {
  prevOnload();
  new PluginChartApp();
};