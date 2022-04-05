import { handleRequest } from './handler'
import {handleSchedule} from './schedule'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

addEventListener('scheduled', event => {
  event.waitUntil(handleSchedule(event));
});
