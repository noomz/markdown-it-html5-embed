/*! markdown-it-html5-embed https://github.com/cmrd-senya/markdown-it-html5-embed @license MIT */!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.markdownitDiasporaMention=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// This is a plugin for markdown-it which adds support for embedding audio/video in the HTML5 way with ![](url) syntax.
// The code is originally taken from http://talk.commonmark.org/t/embedded-audio-and-video/441/16

'use strict';

function html5_embed_renderer(tokens, idx, options, env, self, defaultRender) {
  var audioRE = /^.*\.(ogg|mp3)$/gi;
  var videoRE = /^.*\.(mp4|webm)$/gi;
  var token = tokens[idx];
  var aIndex = token.attrIndex('src');
//  console.log('aindex of idx' + idx);
//  console.log(aIndex);
  var matches_audio = audioRE.exec(token.attrs[aIndex][1]);
  var matches_video = videoRE.exec(token.attrs[aIndex][1]);
//  console.log(token.attrs[aIndex][1]);
  if (matches_audio !== null) {
//    console.log('matches audio')        
    return ['<p><audio width="320" controls class="audioplayer"',
      '<source type="audio/' + matches_audio[1] + '" src=' + matches_audio[0] + '></source>',
      '</audio></p>'
    ].join('\n');
  } else if (matches_video !== null) {
//    console.log('matches video')
    return ['<p><video width="320" height="240" class="audioplayer" controls>',
  '<source type="video/' + matches_video[1] + '" src=' + matches_video[0] + '></source>',
  '</video></p>'
].join('\n');
  }else {
//    console.log('matches img')
    return defaultRender(tokens, idx, options, env, self);
  }
}


module.exports = function html5_embed_plugin(md, options) {
  var defaultRender = md.renderer.rules.image;
  md.renderer.rules.image = function(tokens, idx, opt, env, self) {
    return html5_embed_renderer(tokens, idx, opt, env, self, defaultRender);
  };
};

},{}]},{},[1])(1)
});