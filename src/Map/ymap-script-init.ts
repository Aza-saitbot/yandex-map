import type ymaps from 'yandex-maps';

let YMAPS_ONLOAD = false;

export function createScript() {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://api-maps.yandex.ru/2.1/?apikey=2696c46f-4221-49ca-be4e-fbab0d600bf7&lang=ru_RU';
  script.id = 'map';
  script.async = true;
  return script;
}

export function loadYandex() {
  return new Promise<typeof ymaps>((resolve, reject) => {
    if (window.ymaps) {
      resolve(window.ymaps);
    }

    const script = document.getElementById('yandex-api-maps-script') ?? createScript();

    script.onload = (ym) => resolve(window.ymaps);
    script.onerror = (err) => reject(err);

    if (!YMAPS_ONLOAD) {
      document.body.appendChild(script);
      YMAPS_ONLOAD = true;
    }
  });
}
