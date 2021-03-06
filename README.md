# markdown-it-html5-embed
This is a plugin for markdown-it which adds support for embedding audio/video in the HTML5 way

## Install

node.js, bower:

```bash
npm install markdown-it-html5-embed --save
bower install markdown-it-html5-embed --save
```

## Use

```js
var md = require('markdown-it')()
            .use(require('markdown-it-html5-embed'), {
              html5embed: {
                useImageSyntax: true, // Enables video/audio embed with ![]() syntax (default)
                useLinkSyntax: true   // Enables video/audio embed with []() syntax
            }});

md.render('![](http://example.com/file.webm)'); // => '<p><video width="320" height="240" class="audioplayer" controls>
                                                // <source type="video/webm" src=https://example.com/file.webm></source>
                                                // untitled video
                                                // </video></p>'
```

### Options

####useImageSyntax (or use_image_syntax)

Boolean. Enables video/audio embed with ```![]()``` syntax (default)

####useLinkSyntax (or use_link_syntax)

Boolean. Enables video/audio embed with ```[]()``` syntax

####attributes

Hash array. Attribute to pass to audio/video tag. Example:

```
    attributes: {
      'audio': 'width="320" controls class="audioplayer"',
      'video': 'width="320" height="240" class="audioplayer" controls'
    }
```

If not specified, the default value of ```controls preload="metadata"``` is used.

####isAllowedMimeType (or is_allowed_mime_type)

Function. If specified, allows to decided basing on the MIME type, wheter to embed element or not. If not, all audio/video content is embedded. In a web browser you can use following code to embed only supported media type:
```
      is_allowed_mime_type: function(mimetype) {
        var v = document.createElement(mimetype[1]);
        return v.canPlayType && v.canPlayType(mimetype[0]) !== '';
      }
```
This way, all unsupported media will be rendered with defualt renderer (e.g., as a link, if ```use_link_syntax``` is true).

The argument is a result of regexp match, and has a structure similar to that one:
```
[ 'audio/mpeg',
  'audio',
  index: 0,
  input: 'audio/mpeg' ]
```

####templateName

String. If the plugin is used in a Rails asset pipeline along with the handlebars_assets gem, then you can use a Handlebars template to control the output of the plugin. This option specifies the name of the template to use, which will be picked from the HandlebarsTemplates array.

## Credits

Based on [the code](http://talk.commonmark.org/t/embedded-audio-and-video/441/16) written by @v3ss0n.
