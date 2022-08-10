import axios from 'axios';

export function useRemoteFavicon(url) {
  axios.get(url).then(console.log, console.warn);
}
