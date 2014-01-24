## twochainzify

2 Chainz raps some crazy lyrics. So clearly you want them everywhere.

### What it does

twochainzify can add 2 Chainz himself rapping on any element of your webpage.  You can configure him to rap on any DOM event including scrolling, clicks, mouseovers, etc.  You can bind him to specific elements and set how often you want him to rap.  Using base64 encoded audio, twochainzify is 100% contained in a single file.

### Usage

Call twochainzify with an optional selector and optional options:

```
twochainzify([selector] [, options]);
```

Options:

 - `'on'` (string) [default: `'scroll'`]: The DOM event
 - `'interval'` (int) [default: `400` for scroll, `25` for others]: How often. For scrolling this is the number of scrolled pixels necessary to trigger 2 Chainz. For all other events this is the number of times the event is triggered.  Set to `1` to call 2 Chainz every time.

#### Examples

Make 2 Chainz rap every 400 pixels scrolled:
```
twochainzify();
```

Every 500 pixels scrolled:
```
twochainzify({'interval': 500});
```

Every time an `<a>` tag is moused over:
```
twochainzify('a', {'on': 'mouseover', 'interval': 1});
```

Every 5 times a `<div class="2chainz">` is clicked:
```
twochainzify('.2chainz', {'on': 'click', 'interval': 5});
```

### Development

Clone the repo and `npm install` to get the dev dependencies.

`grunt` builds the completed dist/twochainzify.js.

`grunt sounds` executes script/base64encode.js, which converts all the MP3 and OGG files in assets to base64 and writes them into src/sounds.js.

`grunt dist` builds all the files in dist.

Issues and pull requests are welcome.  Follow the existing syntax and run `grunt dist` when you're done.

### License

twochainzify is released under the MIT License.
Copyright (c) 2014 Dana Silver
