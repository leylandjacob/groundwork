/*
 * 
 * @file: /cron.js
 * @desc: App cron jobs
 *
 * Format 
 * (seconds minutes hours days-of-month months day-of-week)
 * (ss mm hh dm mm dw)
 * (0-59 0-59 0-23 1-31 0-11 0-6)
 *
 */

// Required
var cronJob = require('cron').CronJob;

// Models


/*
 * 
 * Cron Minute
 *
 */

new cronJob('59 * * * * *', function(){


}, null, true, "America/Los_Angeles");


/*
 * 
 * Daily Midnight
 *
 */
new cronJob('00 00 00 * * *', function(){


}, null, true, "America/Los_Angeles");




/*
 * 
 * Monday - Friday at 8AM
 *
 */
new cronJob('00 00 08 * * 1-5', function(){


}, null, true, "America/Los_Angeles");


/*
 * 
 * Saturday at 9AM
 *
 */
new cronJob('00 00 09 * * 6', function(){


}, null, true, "America/Los_Angeles");
