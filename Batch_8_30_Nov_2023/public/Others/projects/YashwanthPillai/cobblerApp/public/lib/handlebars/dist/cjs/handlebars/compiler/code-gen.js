/* global define, require */
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

var SourceNode = undefined;

try {
  /* istanbul ignore next */
  if (typeof define !== 'function' || !define.amd) {
    // We don't support this in AMD environments. For these environments, we assume that
    // they are running on the browser and thus have no need for the source-map library.
    var SourceMap = require('source-map');
    SourceNode = SourceMap.SourceNode;
  }
} catch (err) {}
/* NOP */

/* istanbul ignore if: tested but not covered in istanbul due to dist build  */
if (!SourceNode) {
  SourceNode = function (line, column, srcFile, chunks) {
    this.src = '';
    if (chunks) {
      this.add(chunks);
    }
  };
  /* istanbul ignore next */
  SourceNode.prototype = {
    add: function add(chunks) {
      if (_utils.isArray(chunks)) {
        chunks = chunks.join('');
      }
      this.src += chunks;
    },
    prepend: function prepend(chunks) {
      if (_utils.isArray(chunks)) {
        chunks = chunks.join('');
      }
      this.src = chunks + this.src;
    },
    toStringWithSourceMap: function toStringWithSourceMap() {
      return { code: this.toString() };
    },
    toString: function toString() {
      return this.src;
    }
  };
}

function castChunk(chunk, codeGen, loc) {
  if (_utils.isArray(chunk)) {
    var ret = [];

    for (var i = 0, len = chunk.length; i < len; i++) {
      ret.push(codeGen.wrap(chunk[i], loc));
    }
    return ret;
  } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
    // Handle primitives that the SourceNode will throw up on
    return chunk + '';
  }
  return chunk;
}

function CodeGen(srcFile) {
  this.srcFile = srcFile;
  this.source = [];
}

CodeGen.prototype = {
  isEmpty: function isEmpty() {
    return !this.source.length;
  },
  prepend: function prepend(source, loc) {
    this.source.unshift(this.wrap(source, loc));
  },
  push: function push(source, loc) {
    this.source.push(this.wrap(source, loc));
  },

  merge: function merge() {
    var source = this.empty();
    this.each(function (line) {
      source.add(['  ', line, '\n']);
    });
    return source;
  },

  each: function each(iter) {
    for (var i = 0, len = this.source.length; i < len; i++) {
      iter(this.source[i]);
    }
  },

  empty: function empty() {
    var loc = this.currentLocation || { start: {} };
    return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
  },
  wrap: function wrap(chunk) {
    var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

    if (chunk instanceof SourceNode) {
      return chunk;
    }

    chunk = castChunk(chunk, this, loc);

    return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
  },

  functionCall: function functionCall(fn, type, params) {
    params = this.generateList(params);
    return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
  },

  quotedString: function quotedString(str) {
    return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
    .replace(/\u2029/g, '\\u2029') + '"';
  },

  objectLiteral: function objectLiteral(obj) {
    // istanbul ignore next

    var _this = this;

    var pairs = [];

    Object.keys(obj).forEach(function (key) {
      var value = castChunk(obj[key], _this);
      if (value !== 'undefined') {
        pairs.push([_this.quotedString(key), ':', value]);
      }
    });

    var ret = this.generateList(pairs);
    ret.prepend('{');
    ret.add('}');
    return ret;
  },

  generateList: function generateList(entries) {
    var ret = this.empty();

    for (var i = 0, len = entries.length; i < len; i++) {
      if (i) {
        ret.add(',');
      }

      ret.add(castChunk(entries[i], this));
    }

    return ret;
  },

  generateArray: function generateArray(entries) {
    var ret = this.generateList(entries);
    ret.prepend('[');
    ret.add(']');

    return ret;
  }
};

exports['default'] = CodeGen;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2NvbXBpbGVyL2NvZGUtZ2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUN3QixVQUFVOztBQUVsQyxJQUFJLFVBQVUsWUFBQSxDQUFDOztBQUVmLElBQUk7O0FBRUYsTUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFOzs7QUFHL0MsUUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3RDLGNBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDO0dBQ25DO0NBQ0YsQ0FBQyxPQUFPLEdBQUcsRUFBRSxFQUViOzs7O0FBQUEsQUFHRCxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2YsWUFBVSxHQUFHLFVBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQ25ELFFBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2QsUUFBSSxNQUFNLEVBQUU7QUFDVixVQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2xCO0dBQ0YsQ0FBQzs7QUFFRixZQUFVLENBQUMsU0FBUyxHQUFHO0FBQ3JCLE9BQUcsRUFBRSxhQUFTLE1BQU0sRUFBRTtBQUNwQixVQUFJLGVBQVEsTUFBTSxDQUFDLEVBQUU7QUFDbkIsY0FBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7T0FDMUI7QUFDRCxVQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQztLQUNwQjtBQUNELFdBQU8sRUFBRSxpQkFBUyxNQUFNLEVBQUU7QUFDeEIsVUFBSSxlQUFRLE1BQU0sQ0FBQyxFQUFFO0FBQ25CLGNBQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQzFCO0FBQ0QsVUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztL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QUcsQ0FBQyxDQUFDO0FBQ2pCLE9BQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWIsV0FBTyxHQUFHLENBQUM7R0FDWjtDQUNGLENBQUM7O3FCQUVhLE9BQU8iLCJmaWxlIjoiY29kZS1nZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgZGVmaW5lLCByZXF1aXJlICovXG5pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5sZXQgU291cmNlTm9kZTtcblxudHJ5IHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICdmdW5jdGlvbicgfHwgIWRlZmluZS5hbWQpIHtcbiAgICAvLyBXZSBkb24ndCBzdXBwb3J0IHRoaXMgaW4gQU1EIGVudmlyb25tZW50cy4gRm9yIHRoZXNlIGVudmlyb25tZW50cywgd2UgYXNzdW1lIHRoYXRcbiAgICAvLyB0aGV5IGFyZSBydW5uaW5nIG9uIHRoZSBicm93c2VyIGFuZCB0aHVzIGhhdmUgbm8gbmVlZCBmb3IgdGhlIHNvdXJjZS1tYXAgbGlicmFyeS5cbiAgICBsZXQgU291cmNlTWFwID0gcmVxdWlyZSgnc291cmNlLW1hcCcpO1xuICAgIFNvdXJjZU5vZGUgPSBTb3VyY2VNYXAuU291cmNlTm9kZTtcbiAgfVxufSBjYXRjaCAoZXJyKSB7XG4gIC8qIE5PUCAqL1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWY6IHRlc3RlZCBidXQgbm90IGNvdmVyZWQgaW4gaXN0YW5idWwgZHVlIHRvIGRpc3QgYnVpbGQgICovXG5pZiAoIVNvdXJjZU5vZGUpIHtcbiAgU291cmNlTm9kZSA9IGZ1bmN0aW9uKGxpbmUsIGNvbHVtbiwgc3JjRmlsZSwgY2h1bmtzKSB7XG4gICAgdGhpcy5zcmMgPSAnJztcbiAgICBpZiAoY2h1bmtzKSB7XG4gICAgICB0aGlzLmFkZChjaHVua3MpO1xuICAgIH1cbiAgfTtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgU291cmNlTm9kZS5wcm90b3R5cGUgPSB7XG4gICAgYWRkOiBmdW5jdGlvbihjaHVua3MpIHtcbiAgICAgIGlmIChpc0FycmF5KGNodW5rcykpIHtcbiAgICAgICAgY2h1bmtzID0gY2h1bmtzLmpvaW4oJycpO1xuICAgICAgfVxuICAgICAgdGhpcy5zcmMgKz0gY2h1bmtzO1xuICAgIH0sXG4gICAgcHJlcGVuZDogZnVuY3Rpb24oY2h1bmtzKSB7XG4gICAgICBpZiAoaXNBcnJheShjaHVua3MpKSB7XG4gICAgICAgIGNodW5rcyA9IGNodW5rcy5qb2luKCcnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3JjID0gY2h1bmtzICsgdGhpcy5zcmM7XG4gICAgfSxcbiAgICB0b1N0cmluZ1dpdGhTb3VyY2VNYXA6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHsgY29kZTogdGhpcy50b1N0cmluZygpIH07XG4gICAgfSxcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5zcmM7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjYXN0Q2h1bmsoY2h1bmssIGNvZGVHZW4sIGxvYykge1xuICBpZiAoaXNBcnJheShjaHVuaykpIHtcbiAgICBsZXQgcmV0ID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY2h1bmsubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHJldC5wdXNoKGNvZGVHZW4ud3JhcChjaHVua1tpXSwgbG9jKSk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGNodW5rID09PSAnYm9vbGVhbicgfHwgdHlwZW9mIGNodW5rID09PSAnbnVtYmVyJykge1xuICAgIC8vIEhhbmRsZSBwcmltaXRpdmVzIHRoYXQgdGhlIFNvdXJjZU5vZGUgd2lsbCB0aHJvdyB1cCBvblxuICAgIHJldHVybiBjaHVuayArICcnO1xuICB9XG4gIHJldHVybiBjaHVuaztcbn1cblxuZnVuY3Rpb24gQ29kZUdlbihzcmNGaWxlKSB7XG4gIHRoaXMuc3JjRmlsZSA9IHNyY0ZpbGU7XG4gIHRoaXMuc291cmNlID0gW107XG59XG5cbkNvZGVHZW4ucHJvdG90eXBlID0ge1xuICBpc0VtcHR5KCkge1xuICAgIHJldHVybiAhdGhpcy5zb3VyY2UubGVuZ3RoO1xuICB9LFxuICBwcmVwZW5kOiBmdW5jdGlvbihzb3VyY2UsIGxvYykge1xuICAgIHRoaXMuc291cmNlLnVuc2hpZnQodGhpcy53cmFwKHNvdXJjZSwgbG9jKSk7XG4gIH0sXG4gIHB1c2g6IGZ1bmN0aW9uKHNvdXJjZSwgbG9jKSB7XG4gICAgdGhpcy5zb3VyY2UucHVzaCh0aGlzLndyYXAoc291cmNlLCBsb2MpKTtcbiAgfSxcblxuICBtZXJnZTogZnVuY3Rpb24oKSB7XG4gICAgbGV0IHNvdXJjZSA9IHRoaXMuZW1wdHkoKTtcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgc291cmNlLmFkZChbJyAgJywgbGluZSwgJ1xcbiddKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc291cmNlO1xuICB9LFxuXG4gIGVhY2g6IGZ1bmN0aW9uKGl0ZXIpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5zb3VyY2UubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGl0ZXIodGhpcy5zb3VyY2VbaV0pO1xuICAgIH1cbiAgfSxcblxuICBlbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgbGV0IGxvYyA9IHRoaXMuY3VycmVudExvY2F0aW9uIHx8IHsgc3RhcnQ6IHt9IH07XG4gICAgcmV0dXJuIG5ldyBTb3VyY2VOb2RlKGxvYy5zdGFydC5saW5lLCBsb2Muc3RhcnQuY29sdW1uLCB0aGlzLnNyY0ZpbGUpO1xuICB9LFxuICB3cmFwOiBmdW5jdGlvbihjaHVuaywgbG9jID0gdGhpcy5jdXJyZW50TG9jYXRpb24gfHwgeyBzdGFydDoge30gfSkge1xuICAgIGlmIChjaHVuayBpbnN0YW5jZW9mIFNvdXJjZU5vZGUpIHtcbiAgICAgIHJldHVybiBjaHVuaztcbiAgICB9XG5cbiAgICBjaHVuayA9IGNhc3RDaHVuayhjaHVuaywgdGhpcywgbG9jKTtcblxuICAgIHJldHVybiBuZXcgU291cmNlTm9kZShcbiAgICAgIGxvYy5zdGFydC5saW5lLFxuICAgICAgbG9jLnN0YXJ0LmNvbHVtbixcbiAgICAgIHRoaXMuc3JjRmlsZSxcbiAgICAgIGNodW5rXG4gICAgKTtcbiAgfSxcblxuICBmdW5jdGlvbkNhbGw6IGZ1bmN0aW9uKGZuLCB0eXBlLCBwYXJhbXMpIHtcbiAgICBwYXJhbXMgPSB0aGlzLmdlbmVyYXRlTGlzdChwYXJhbXMpO1xuICAgIHJldHVybiB0aGlzLndyYXAoW2ZuLCB0eXBlID8gJy4nICsgdHlwZSArICcoJyA6ICcoJywgcGFyYW1zLCAnKSddKTtcbiAgfSxcblxuICBxdW90ZWRTdHJpbmc6IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiAoXG4gICAgICAnXCInICtcbiAgICAgIChzdHIgKyAnJylcbiAgICAgICAgLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJylcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKVxuICAgICAgICAucmVwbGFjZSgvXFxuL2csICdcXFxcbicpXG4gICAgICAgIC5yZXBsYWNlKC9cXHIvZywgJ1xcXFxyJylcbiAgICAgICAgLnJlcGxhY2UoL1xcdTIwMjgvZywgJ1xcXFx1MjAyOCcpIC8vIFBlciBFY21hLTI2MiA3LjMgKyA3LjguNFxuICAgICAgICAucmVwbGFjZSgvXFx1MjAyOS9nLCAnXFxcXHUyMDI5JykgK1xuICAgICAgJ1wiJ1xuICAgICk7XG4gIH0sXG5cbiAgb2JqZWN0TGl0ZXJhbDogZnVuY3Rpb24ob2JqKSB7XG4gICAgbGV0IHBhaXJzID0gW107XG5cbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IGNhc3RDaHVuayhvYmpba2V5XSwgdGhpcyk7XG4gICAgICBpZiAodmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHBhaXJzLnB1c2goW3RoaXMucXVvdGVkU3RyaW5nKGtleSksICc6JywgdmFsdWVdKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCByZXQgPSB0aGlzLmdlbmVyYXRlTGlzdChwYWlycyk7XG4gICAgcmV0LnByZXBlbmQoJ3snKTtcbiAgICByZXQuYWRkKCd9Jyk7XG4gICAgcmV0dXJuIHJldDtcbiAgfSxcblxuICBnZW5lcmF0ZUxpc3Q6IGZ1bmN0aW9uKGVudHJpZXMpIHtcbiAgICBsZXQgcmV0ID0gdGhpcy5lbXB0eSgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGVudHJpZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChpKSB7XG4gICAgICAgIHJldC5hZGQoJywnKTtcbiAgICAgIH1cblxuICAgICAgcmV0LmFkZChjYXN0Q2h1bmsoZW50cmllc1tpXSwgdGhpcykpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH0sXG5cbiAgZ2VuZXJhdGVBcnJheTogZnVuY3Rpb24oZW50cmllcykge1xuICAgIGxldCByZXQgPSB0aGlzLmdlbmVyYXRlTGlzdChlbnRyaWVzKTtcbiAgICByZXQucHJlcGVuZCgnWycpO1xuICAgIHJldC5hZGQoJ10nKTtcblxuICAgIHJldHVybiByZXQ7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvZGVHZW47XG4iXX0=
