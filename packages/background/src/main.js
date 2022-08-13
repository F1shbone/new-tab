// import { useStorageLocal } from '../composables/useStorage';

// const storage = useStorageLocal('cnt-background-scipt', {
//   test: 'lorem ipsum',
// });

// storage.setItem({ test: 'foobar' });

// browser.runtime.onInstalled.addListener(() => {
//   // eslint-disable-next-line no-console
//   console.log('Extension installed');
// });

console.log('Hello from Worker', chrome.runtime.id);
// console.log(chrome.favicon);

// window.onload = (e) => {
//   const img = document.createElement('img');
//   const url = '_favicon/?page_url=https://www.google.com&size=64';
//   img.src = chrome.runtime.getURL(url);
//   document.body.appendChild(img);
// };

// const request = () => {
//   // works
//   // const url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
//   const url = `chrome-extension://${chrome.runtime.id}/_favicon?page_url=https://belloflostsouls.net`;
//   // faviconUrl.searchParams.append('page_url', 'http://example.com''

//   // Does not -.-
//   // const url = 'https://www.belloflostsouls.net/feed';
//   // const url = 'https://www.google.com';

//   fetch(url, {
//     // mode: 'no-cors'
//   })
//     // .then((response) => response.json())
//     .then((data) => console.log(data));
// };

// request();

// setInterval(request, 10000);
