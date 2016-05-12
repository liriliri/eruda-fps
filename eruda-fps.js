// Modified from https://github.com/mrdoob/stats.js/

(function (eruda)
{
    if (!eruda) return;

    var WIDTH = 320,
        HEIGHT = 192,
        TEXT_X = 12,
        TEXT_Y = 8,
        GRAPH_X = 12,
        GRAPH_Y = 40,
        GRAPH_WIDTH = 296,
        GRAPH_HEIGHT = 142,
        BACK_COLOR = '#002',
        FORE_COLOR = '#0ff',
        STEP = 2,
        NAME = 'FPS';

    var util = eruda.util,
        round = Math.round;

    util.evalCss([
        '.eruda-fps {padding: 10px !important;}',
        'canvas {width: 100%;}'
    ].join('.eruda-fps '));

    eruda.add({
        name: 'fps',
        init: function ($el)
        {
            this._$el = $el;

            this._isRunning = false;
            this._beginTime = util.now();
            this._prevTime = this._beginTime;
            this._frames = 0;
            this._min = Infinity;
            this._max = 0;
            this._appendTpl();
            this._initCanvas();
        },
        show: function ()
        {
            this._start();
            this._$el.show();

            return this;
        },
        hide: function ()
        {
            this._stop();
            this._$el.hide();

            return this;
        },
        _start: function ()
        {
            if (this._isRunning) return;

            var self = this;

            this._isRunning = true;

            function loop()
            {
                if (!self._isRunning) return;

                self._update();
                requestAnimationFrame(loop);
            }

            loop();
        },
        _stop: function ()
        {
            this._isRunning = false;
            this._beginTime = util.now();
            this._prevTime = this._beginTime;
            this._frames = 0;
        },
        _appendTpl: function ()
        {
            this._$el.html('<canvas></canvas>');

            this._canvas = this._$el.find('canvas').get(0);
            this._ctx = this._canvas.getContext('2d');
        },
        _initCanvas: function ()
        {
            var canvas = this._canvas,
                ctx = this._ctx;

            canvas.width = WIDTH;
            canvas.height = HEIGHT;

            ctx.font = 'bold 18px Helvetica,Arial,sans-serif';
            ctx.textBaseline = 'top';

            ctx.fillStyle = BACK_COLOR;
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            ctx.fillStyle = FORE_COLOR;
            ctx.fillText(NAME, TEXT_X, TEXT_Y);
            ctx.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);

            ctx.fillStyle = BACK_COLOR;
            ctx.globalAlpha = 0.9;
            ctx.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
        },
        _update: function ()
        {
            this._frames++;

            var prevTime = this._prevTime,
                time = util.now();

            // Only update one time per second.
            if (time > prevTime + 1000)
            {
                this._draw((this._frames * 1000) / (time - prevTime), 100);
                this._prevTime = time;
                this._frames = 0;
            }

            this._beginTime = time;
        },
        _draw: function (val, maxVal)
        {
            this._min = Math.min(this._min, val);
            this._max = Math.max(this._max, val);

            var min = this._min,
                max = this._max,
                canvas = this._canvas,
                ctx = this._ctx;

            ctx.fillStyle = BACK_COLOR;
            ctx.globalAlpha = 1;
            ctx.fillRect(0, 0, WIDTH, GRAPH_Y);
            ctx.fillStyle = FORE_COLOR;
            ctx.fillText(round(val) + '' + NAME + ' (' + round(min) + '-' + round(max) + ')',
                         TEXT_X, TEXT_Y);

            ctx.drawImage(canvas, GRAPH_X + STEP, GRAPH_Y, GRAPH_WIDTH - STEP, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - STEP, GRAPH_HEIGHT);

            ctx.fillRect(GRAPH_X + GRAPH_WIDTH - STEP, GRAPH_Y, STEP, GRAPH_HEIGHT);

            ctx.fillStyle = BACK_COLOR;
            ctx.globalAlpha = 0.9;
            ctx.fillRect(GRAPH_X + GRAPH_WIDTH - STEP, GRAPH_Y, STEP, round((1 - (val / maxVal)) * GRAPH_HEIGHT));
        }
    });
}(eruda));