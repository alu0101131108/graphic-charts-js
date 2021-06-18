/**
 * @desc  Script to include a PluginChartApp instance at body onload.
 * @since 18/06/2021
 * @author Sebastián Daniel Tamayo Guzmán
 */
'use strict';

import { PluginChartApp } from './plugin-files/plugin-chart-app.js';

const prevOnload = window.onload;
window.onload = () => {
  prevOnload();
  new PluginChartApp();
};