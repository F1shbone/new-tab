import { useAsync } from './useAsync';

export const unknown_favicon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABlVBMVEUAAACcoqiFipCCiI2ZmZmUmaCWnKKDiY2OjqqCiI6MkpiboaeTmJ6Hh4eGi5GXnaOqqqqEi46Vm6CSl56Mkpf///+IjZKqqqqAiI2aoKaVnKGaoKacoqmcoqaaoKiZn6WcoKaan6aaoKaKj5Wan6ajo62coqiZn6Sep6eYn6SWnKKPlZufr6+GhpKYnqWboaaboqaPlZuaoKaKkJWboaedsbGYoKWaoaicoaaYn6WboKaaoaabo6eFhYWaoaiaoaeboaaboaaZn6aYnaOAgICcoaiaoKacoqizs7OboKabpK2doaqeoamboaemprOboKaAgIucqqqeo6ilpbSfp6e/v7+boaeaoKaboaaLi4uaoaeaoKaaoaaaoqeZoKaboKicoaeYnaTMzMyaoKeboKahoa6eo6eboKeboaeboKecoaqfpqyboqedoKeboaaboaeapaqPlJqaoaeKkJSaoaeboKf///+bo6eboqeboaeboKeboKeboaeao6iboaagoKian6WboKqZn6aZnqSZn6OZn6aaoKakP1QPAAAAhnRSTlMAVbFeBfr9ewmF4/73Ebf+A5789uUBwwY6/v2sTXaJ13md+da6GSzyHcf88BAV8Ipw7/3X/A3Oco3NpPFAF0zF2Mn63gRv+lgK3Rw5RPkUzBYSMhEgBKr3LhadsetltIxiyAXwhBM6x1ToNihjTsF/MPD21+HlAj1ro5yRelueI8cz+OXRt8pl7JEAAAKCSURBVHjaYhgFAErrsUuSGIwC8G3bGtu2tbZt27Z37+/eUzVddZJ0Jd3zfI/xXr1gwN87HQo3N4dD073+QBA7Eo3FM5Rk4rEoGpVKt9BDSzqFRmRzeWrkc1nUFUnSIBmBWanMOsolGFwqUpSY6Oy7fmvPboqK49BqKtCVWOgaqMB2cBdFhSZt+xE6Btv74bpB2Yimh5MFVvV0jMGFM/upKHiuouSuf3gIogOsUSyhlrv/3RVIvrJWGTUi3DYzBdGPay9O0EMEir1JbtsHwelNaiSzkOW4rRuCo8eolYMkladtWFz/8VXq5VMQpWnrkfZ/kiZpCKIttHVAdIgmLeL/EKNtcAyCwzSLAa44be0QHaFZHK5ghpZEP0TPaJYJwhGgbRmSDdYRgMNPWxcka6zDD8csbQOQnPI52umpF45RWhIVaJylp1E4QrRMQOfcKr2E4AjT0gmt85RdoCUMRzMtfdC6OEfR5Su0NMsdSOaubj2f3JiH4+YMXVy53ad0EKa3O3fvoer+A1ZtPQQ6lSWEqPPoMRxPni59X1lafAkAE8omvqLW6zXUqiRomYbjDfXezqPGgHqR/DToQI0u9SoHaPDuPVQLtAXk56z1AYr+hPqcEafBRyja3Q/FFdvJJowN0haTP1W9T5BNenyqSFPvMyRDPbSl1cKi9QWiyrBUWFw5qjZbq75B1C2XNlc2SUUbvEzpiisiDXUwNSOVd0m5fgeVblaVjRFH18HQsDHiYL1g7GCso0cfstyYp+2gv31QE/N0QZM/F39lYasMdC0ntEFTsi7vw+8/f//1dU4kGo66/0dxY5vy5j7hDgeFXR76dLoQ3T5jbUi3T9sYb7dvFAAAOQZbNpdzp28AAAAASUVORK5CYII=';

export function useRemoteFavicon(url) {
  const handler = () => {
    if (chrome?.runtime?.getURL) {
      return fetch(chrome.runtime.getURL(`_favicon/?pageUrl=${url}&size=64`))
        .then((response) => {
          return response.blob();
        })
        .then((blob) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
              resolve(reader.result);
            };
          });
        });
    } else {
      return Promise.resolve(unknown_favicon);
    }
  };

  const { data, isLoading, isFinished, error, execute } = useAsync(handler);

  return {
    favicon: data,
    isLoading,
    isFinished,
    error,
    execute,
  };
}
