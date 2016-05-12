# eruda-fps

Eruda plugin for displaying fps info, inspired by
[stats.js](https://github.com/mrdoob/stats.js/).

![Eruda-fps](http://7xn2zy.com1.z0.glb.clouddn.com/eruda_fps_screenshot.png)

## Demo

![Demo](http://7xn2zy.com1.z0.glb.clouddn.com/eruda_fps_qrcode.png)

Browse it on your phone: [http://liriliri.github.io/eruda-fps/](http://liriliri.github.io/eruda-fps/)

## Install

```bash
npm install eruda-fps --save
```

```javascript
(function () {
    var src = 'node_modules/eruda-fps/eruda-fps.min.js';
    if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
})();
```

> Make sure Eruda is loaded before this plugin, otherwise won't work.
