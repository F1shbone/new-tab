import axios from 'axios';
import fs from 'fs';

axios
  .get('https://www.belloflostsouls.net/feed', {
    headers: {
      accept: '*/*',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
      dnt: 1,
      'sec-ch-ua':
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'none',
      cookie: [
        '__gads=ID=918e785f864df35c-225cd4fd07cd0087:T=1639516690:S=ALNI_MaAF2pZdb0SeM5mnqKR-uraFIqLNA',
        '__qca=P0-2030606105-1640435150180',
        '_lr_env_src_ats=false',
        '_ym_uid=1645988040726109333',
        '_ym_d=1645988040',
        'sharedid=7b1ae711-5ed0-42a8-995a-f2edd829270f',
        '_gid=GA1.2.1283091862.1657968002',
        'euconsent-v2=CPcQSoAPcQSoAAKAqAENCYCsAP_AAH_AAAwII6td_X__bX9j-_5_aft0eY1P9_r37uQzDhfNs-8F3L_W_LwXw2E7NF36pq4KmR4Eu1LBIQNlHMHUDUmwaokVrzHsak2cpyNKJ7JEknMZO2dYGF9Pn1lDuYKY7_5_9_bx2D-t_9_-39T378Xf3_dp_2_--vCfV599jfn9fV_789KP9__9v-_8__________3_4IagEmGpcQBdmWODJoGEUKIEYVhIVAKACCgGFogsAGBwU7KwCXUELABAKkIwIgQYgowYBAAAJAEhEAEgBYIBEARAIAAQAIAEIACJgEFgBYGAQAAgGhYgBQACBIQZEBEcpgQFQJBQS2VgCUFehphAGWeAFAojIqABEkgIJAQEhYOAYAkBLxZIGmCAAAAA.YAAAAAAAAAAA',
        'addtl_consent=1~39.4.3.9.6.9.13.6.4.15.9.5.2.7.4.1.7.1.3.2.10.3.5.4.21.4.6.9.7.10.2.9.2.18.7.6.14.5.20.6.5.1.3.1.11.29.4.14.4.5.3.10.6.2.9.6.6.4.5.4.4.29.4.5.3.1.6.2.2.17.1.17.10.9.1.8.6.2.8.3.4.142.4.8.42.15.1.14.3.1.8.10.25.3.7.25.5.18.9.7.41.2.4.18.21.3.4.2.7.6.5.2.14.18.7.3.2.2.8.20.8.8.6.3.10.4.20.2.13.4.6.4.11.1.3.22.16.2.6.8.2.4.11.6.5.33.11.8.1.10.28.12.1.3.21.2.7.6.1.9.30.17.4.9.15.8.7.3.6.6.7.2.4.1.7.12.13.22.13.2.12.2.10.5.15.2.4.9.4.5.4.7.13.5.15.4.13.4.14.8.2.15.2.5.5.1.2.2.1.2.14.7.4.8.2.9.10.18.12.13.2.18.1.1.3.1.1.9.25.4.1.19.8.4.5.3.5.4.8.4.2.2.2.14.2.13.4.2.6.9.6.3.4.3.5.2.3.6.10.11.6.3.16.3.11.3.1.2.3.9.19.11.15.3.10.7.6.4.3.4.6.3.3.3.3.1.1.1.6.11.3.1.1.11.6.1.10.5.2.6.3.2.2.4.3.2.2.7.15.7.12.2.1.3.3.4.5.4.3.2.2.4.1.3.1.1.1.2.9.1.6.9.1.5.2.1.7.2.8.11.1.3.1.1.2.1.3.2.6.1.12.5.3.1.3.1.1.2.2.7.7.1.4.1.2.6.1.2.1.1.3.1.1.4.1.1.2.1.8.1.7.4.3.2.1.3.5.3.9.6.1.15.10.28.1.2.2.12.3.4.1.6.3.4.7.1.3.1.1.3.1.5.3.1.3.2.2.1.1.4.2.1.2.1.2.2.2.4.2.1.2.2.2.4.1.1.1.2.2.1.1.1.1.2.1.1.1.2.2.1.1.2.1.2.1.7.1.2.1.1.1.2.1.1.1.1.2.1.1.3.2.1.1.8.1.1.1.5.2.1.6.5.1.1.1.1.1.2.2.3.1.1.4.1.1.2.2.1.1.4.3.1.2.2.1.2.1.2.3.1.1.2.4.1.1.1.5.1.3.6.3.1.5.2.3.4.1.2.3.1.4.2.1.2.2.2.1.1.1.1.1.1.11.1.3.1.1.2.2.5.2.3.3.5.1.1.1.4.2.1.1.2.5.1.9.4.1.1.3.1.7.1.4.5.1.7.2.1.1.1.2.1.1.1.4.2.1.12.1.1.3.1.2.2.3.1.2.1.1.1.2.1.1.2.1.1.1.1.2.1.3.1.5.1.2.4.3.8.2.2.9.7.2.3.2.1.4.6.1.1.6.1.1',
        'pbjs-unifiedid={"TDID_LOOKUP":"FALSE","TDID_CREATED_AT":"2022-07-20T20:47:42"}',
        '_lr_retry_request=true',
        '_ga=GA1.2.727199308.1639516685',
        '_pbjs_userid_consent_data=547724341751899',
        'cto_bundle=ULFdE19FS0VCSVI0ZHlrYkJGbTRJUEZvYUp3UlpJaWo0Rnh1aU50aE1YJTJCSm9GdzFKSUV1cU1aTm82UERsNiUyRnVqJTJGSDVZMGNlVEFaRlA1dG50OVlOcHJqWXJxbXl1eWNRMEs4Sm4zbU04cHljNUlFemYwN0d5UGU3eko5cmZMdFFCTHF2Mg',
        'cto_bidid=yo-EpF9IaXR2enZqMHVEeElxdzBVSHRYM0lpZUFMNE1Yd2ZDU21vS2JWZ0FESGU4alN4V04lMkZZSlR4MSUyRlRHTVhHTzJvVDFDcWlsYWxOcUZHbEJKT1lueSUyRnU1USUzRCUzRA',
        '_ga_G6J11QMB6W=GS1.1.1658439167.92.1.1658439202.25',
      ].join(';'),
    },
  })
  .then((e) => {
    fs.writeFileSync('./test.log', e);
  })
  .catch(console.warn);
