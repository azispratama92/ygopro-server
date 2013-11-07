// Generated by CoffeeScript 1.6.3
(function() {
  var request;

  request = require('request');

  this.key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";

  this.load_card_usages_from_cards = function(main, side) {
    var card_id, count, last_id, result, _i, _j, _len, _len1;
    result = [];
    last_id = null;
    for (_i = 0, _len = main.length; _i < _len; _i++) {
      card_id = main[_i];
      if (card_id === last_id) {
        count++;
      } else {
        if (last_id) {
          result.push({
            card_id: last_id,
            side: false,
            count: count
          });
        }
        last_id = card_id;
        count = 1;
      }
    }
    if (last_id) {
      result.push({
        card_id: last_id,
        side: false,
        count: count
      });
    }
    last_id = null;
    for (_j = 0, _len1 = side.length; _j < _len1; _j++) {
      card_id = side[_j];
      if (card_id === last_id) {
        count++;
      } else {
        if (last_id) {
          result.push({
            card_id: last_id,
            side: true,
            count: count
          });
        }
        last_id = card_id;
        count = 1;
      }
    }
    if (last_id) {
      result.push({
        card_id: last_id,
        side: true,
        count: count
      });
    }
    return result;
  };

  this.encode = function(card_usages) {
    var c, card_usage, i, result, _i, _j, _len;
    result = '';
    for (_i = 0, _len = card_usages.length; _i < _len; _i++) {
      card_usage = card_usages[_i];
      c = card_usage.side << 29 | card_usage.count << 27 | card_usage.card_id;
      for (i = _j = 4; _j >= 0; i = --_j) {
        result += this.key.charAt((c >> i * 6) & 0x3F);
      }
    }
    return result;
  };

  this.deck_url = function(name, card_usages, format) {
    return "https://my-card.in/decks/new" + (format ? '.' + format : '') + "?name=" + (encodeURIComponent(name)) + "&cards=" + (this.encode(card_usages));
  };

  this.deck_url_short = function(name, card_usages, callback) {
    request = require('request');
    return request(this.deck_url(name, card_usages, 'short.url'), function(error, response, body) {
      return callback(body);
    });
  };

}).call(this);

/*
//@ sourceMappingURL=mycard.map
*/