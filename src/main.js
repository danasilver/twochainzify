return function() {
  var args = Array.prototype.slice.call(arguments, 0)
    , opts
    , selector
    , handler
    , counter = 1
    , lastOffset;

  // If there are no args or the first arg is the options
  if (args.length === 0 || typeof(args[0]) === 'object') {
    opts = args.length === 0 ? {} : args[0];
    selector = window;
  } else if (typeof(args[0]) === 'string') {
    opts = args.length === 1 ? {} : args[1]
    selector = args[0];
  } else {
    throw 'Invalid arguments to twochainzify: ' + args;
  }

  // If 'on' is not set, set it to 'scroll' if the target
  // is the window, else 'click'
  if (!opts.hasOwnProperty('on')) { 
    if (selector === window) {
      opts.on = 'scroll';
    } else {
    opts.on = 'click';
    }
  }

  // Defaults for 'interval'
  if (!opts.hasOwnProperty('interval')) {
    if (opts.on === 'scroll') {
      // 400 px scrolled
      opts.interval = 400;
    } else {
      // 10 clicks, hovers, etc.
      opts.interval = 10;
    }
  }

  try {
    opts.interval = parseInt(opts.interval);
  } catch (e) {
    throw 'Invalid option for interval: ' + opts.interval;
  }

  handler = function() {
    if (opts.on === 'scroll') {
      var scrollOffset = Math.floor(window.scrollY / opts.interval);
      if (lastOffset !== scrollOffset) {
        playSound();
        lastOffset = scrollOffset;
      }
    } else {
      if (counter === opts.interval) {
        playSound();
        counter = 1;
      } else {
        counter += 1;
      }
    }
  }

  if (typeof(selector) === 'object') {
    selector.addEventListener(opts.on, handler, false);
  } else {
    [].forEach.call(document.querySelectorAll(selector), function(el) {
      el.addEventListener(opts.on, handler, false);
    });
  }
};

function playSound() {
  var player = getPlayer()
    , audio = getAudioFor(player)
    , rand = Math.floor(Math.random() * audio.sounds.length);

  if (player.currentTime === 0 || player.ended) {
    player.src = audio.prefix + audio.sounds[rand];
    player.play();
  }
};

function getPlayer() {
  var container = getContainer()
    , player = container.querySelector('audio');

  if (player === null) {
    player = document.createElement('audio');
    container.appendChild(player);
    return player;
  }

  return player;
};

function getAudioFor(player) {
  if (player.canPlayType('audio/mp3')) {
    return mp3;
  } else if (player.canPlayType('audio/ogg')) {
    return ogg;
  }
};

function getContainer() {
  var container = document.getElementById('2chainzify');

  if (container === null) {
    container = document.createElement('div');
    container.id = '2chainzify';
    document.getElementsByTagName('body')[0].appendChild(container);
  }

  return container;
};