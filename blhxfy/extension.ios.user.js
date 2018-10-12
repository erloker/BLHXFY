(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterators = {};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	var ITERATOR$1 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME = collections[i];
	  var explicit = DOMIterables[NAME];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
	    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	    _iterators[NAME] = ArrayValues;
	    if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
	  }
	}

	var punycode = createCommonjsModule(function (module, exports) {
	(function(root) {

		/** Detect free variables */
		var freeExports = exports &&
			!exports.nodeType && exports;
		var freeModule = module &&
			!module.nodeType && module;
		var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw new RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * https://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (freeExports && freeModule) {
			if (module.exports == freeExports) {
				// in Node.js, io.js, or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.punycode = punycode;
		}

	}(commonjsGlobal));
	});

	var IPv6 = createCommonjsModule(function (module) {
	/*!
	 * URI.js - Mutating URLs
	 * IPv6 Support
	 *
	 * Version: 1.19.1
	 *
	 * Author: Rodney Rehm
	 * Web: http://medialize.github.io/URI.js/
	 *
	 * Licensed under
	 *   MIT License http://www.opensource.org/licenses/mit-license
	 *
	 */

	(function (root, factory) {
	  // https://github.com/umdjs/umd/blob/master/returnExports.js
	  if (module.exports) {
	    // Node
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.IPv6 = factory(root);
	  }
	}(commonjsGlobal, function (root) {

	  /*
	  var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
	  var _out = IPv6.best(_in);
	  var _expected = "fe80::204:61ff:fe9d:f156";

	  console.log(_in, _out, _expected, _out === _expected);
	  */

	  // save current IPv6 variable, if any
	  var _IPv6 = root && root.IPv6;

	  function bestPresentation(address) {
	    // based on:
	    // Javascript to test an IPv6 address for proper format, and to
	    // present the "best text representation" according to IETF Draft RFC at
	    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
	    // 8 Feb 2010 Rich Brown, Dartware, LLC
	    // Please feel free to use this code as long as you provide a link to
	    // http://www.intermapper.com
	    // http://intermapper.com/support/tools/IPV6-Validator.aspx
	    // http://download.dartware.com/thirdparty/ipv6validator.js

	    var _address = address.toLowerCase();
	    var segments = _address.split(':');
	    var length = segments.length;
	    var total = 8;

	    // trim colons (:: or ::a:b:c… or …a:b:c::)
	    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
	      // must have been ::
	      // remove first two items
	      segments.shift();
	      segments.shift();
	    } else if (segments[0] === '' && segments[1] === '') {
	      // must have been ::xxxx
	      // remove the first item
	      segments.shift();
	    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
	      // must have been xxxx::
	      segments.pop();
	    }

	    length = segments.length;

	    // adjust total segments for IPv4 trailer
	    if (segments[length - 1].indexOf('.') !== -1) {
	      // found a "." which means IPv4
	      total = 7;
	    }

	    // fill empty segments them with "0000"
	    var pos;
	    for (pos = 0; pos < length; pos++) {
	      if (segments[pos] === '') {
	        break;
	      }
	    }

	    if (pos < total) {
	      segments.splice(pos, 1, '0000');
	      while (segments.length < total) {
	        segments.splice(pos, 0, '0000');
	      }
	    }

	    // strip leading zeros
	    var _segments;
	    for (var i = 0; i < total; i++) {
	      _segments = segments[i].split('');
	      for (var j = 0; j < 3 ; j++) {
	        if (_segments[0] === '0' && _segments.length > 1) {
	          _segments.splice(0,1);
	        } else {
	          break;
	        }
	      }

	      segments[i] = _segments.join('');
	    }

	    // find longest sequence of zeroes and coalesce them into one segment
	    var best = -1;
	    var _best = 0;
	    var _current = 0;
	    var current = -1;
	    var inzeroes = false;
	    // i; already declared

	    for (i = 0; i < total; i++) {
	      if (inzeroes) {
	        if (segments[i] === '0') {
	          _current += 1;
	        } else {
	          inzeroes = false;
	          if (_current > _best) {
	            best = current;
	            _best = _current;
	          }
	        }
	      } else {
	        if (segments[i] === '0') {
	          inzeroes = true;
	          current = i;
	          _current = 1;
	        }
	      }
	    }

	    if (_current > _best) {
	      best = current;
	      _best = _current;
	    }

	    if (_best > 1) {
	      segments.splice(best, _best, '');
	    }

	    length = segments.length;

	    // assemble remaining segments
	    var result = '';
	    if (segments[0] === '')  {
	      result = ':';
	    }

	    for (i = 0; i < length; i++) {
	      result += segments[i];
	      if (i === length - 1) {
	        break;
	      }

	      result += ':';
	    }

	    if (segments[length - 1] === '') {
	      result += ':';
	    }

	    return result;
	  }

	  function noConflict() {
	    /*jshint validthis: true */
	    if (root.IPv6 === this) {
	      root.IPv6 = _IPv6;
	    }

	    return this;
	  }

	  return {
	    best: bestPresentation,
	    noConflict: noConflict
	  };
	}));
	});

	var SecondLevelDomains = createCommonjsModule(function (module) {
	/*!
	 * URI.js - Mutating URLs
	 * Second Level Domain (SLD) Support
	 *
	 * Version: 1.19.1
	 *
	 * Author: Rodney Rehm
	 * Web: http://medialize.github.io/URI.js/
	 *
	 * Licensed under
	 *   MIT License http://www.opensource.org/licenses/mit-license
	 *
	 */

	(function (root, factory) {
	  // https://github.com/umdjs/umd/blob/master/returnExports.js
	  if (module.exports) {
	    // Node
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.SecondLevelDomains = factory(root);
	  }
	}(commonjsGlobal, function (root) {

	  // save current SecondLevelDomains variable, if any
	  var _SecondLevelDomains = root && root.SecondLevelDomains;

	  var SLD = {
	    // list of known Second Level Domains
	    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
	    // ----
	    // publicsuffix.org is more current and actually used by a couple of browsers internally.
	    // downside is it also contains domains like "dyndns.org" - which is fine for the security
	    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
	    // ----
	    list: {
	      'ac':' com gov mil net org ',
	      'ae':' ac co gov mil name net org pro sch ',
	      'af':' com edu gov net org ',
	      'al':' com edu gov mil net org ',
	      'ao':' co ed gv it og pb ',
	      'ar':' com edu gob gov int mil net org tur ',
	      'at':' ac co gv or ',
	      'au':' asn com csiro edu gov id net org ',
	      'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
	      'bb':' biz co com edu gov info net org store tv ',
	      'bh':' biz cc com edu gov info net org ',
	      'bn':' com edu gov net org ',
	      'bo':' com edu gob gov int mil net org tv ',
	      'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
	      'bs':' com edu gov net org ',
	      'bz':' du et om ov rg ',
	      'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
	      'ck':' biz co edu gen gov info net org ',
	      'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
	      'co':' com edu gov mil net nom org ',
	      'cr':' ac c co ed fi go or sa ',
	      'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
	      'do':' art com edu gob gov mil net org sld web ',
	      'dz':' art asso com edu gov net org pol ',
	      'ec':' com edu fin gov info med mil net org pro ',
	      'eg':' com edu eun gov mil name net org sci ',
	      'er':' com edu gov ind mil net org rochest w ',
	      'es':' com edu gob nom org ',
	      'et':' biz com edu gov info name net org ',
	      'fj':' ac biz com info mil name net org pro ',
	      'fk':' ac co gov net nom org ',
	      'fr':' asso com f gouv nom prd presse tm ',
	      'gg':' co net org ',
	      'gh':' com edu gov mil org ',
	      'gn':' ac com gov net org ',
	      'gr':' com edu gov mil net org ',
	      'gt':' com edu gob ind mil net org ',
	      'gu':' com edu gov net org ',
	      'hk':' com edu gov idv net org ',
	      'hu':' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
	      'id':' ac co go mil net or sch web ',
	      'il':' ac co gov idf k12 muni net org ',
	      'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
	      'iq':' com edu gov i mil net org ',
	      'ir':' ac co dnssec gov i id net org sch ',
	      'it':' edu gov ',
	      'je':' co net org ',
	      'jo':' com edu gov mil name net org sch ',
	      'jp':' ac ad co ed go gr lg ne or ',
	      'ke':' ac co go info me mobi ne or sc ',
	      'kh':' com edu gov mil net org per ',
	      'ki':' biz com de edu gov info mob net org tel ',
	      'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
	      'kn':' edu gov net org ',
	      'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
	      'kw':' com edu gov net org ',
	      'ky':' com edu gov net org ',
	      'kz':' com edu gov mil net org ',
	      'lb':' com edu gov net org ',
	      'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
	      'lr':' com edu gov net org ',
	      'lv':' asn com conf edu gov id mil net org ',
	      'ly':' com edu gov id med net org plc sch ',
	      'ma':' ac co gov m net org press ',
	      'mc':' asso tm ',
	      'me':' ac co edu gov its net org priv ',
	      'mg':' com edu gov mil nom org prd tm ',
	      'mk':' com edu gov inf name net org pro ',
	      'ml':' com edu gov net org presse ',
	      'mn':' edu gov org ',
	      'mo':' com edu gov net org ',
	      'mt':' com edu gov net org ',
	      'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
	      'mw':' ac co com coop edu gov int museum net org ',
	      'mx':' com edu gob net org ',
	      'my':' com edu gov mil name net org sch ',
	      'nf':' arts com firm info net other per rec store web ',
	      'ng':' biz com edu gov mil mobi name net org sch ',
	      'ni':' ac co com edu gob mil net nom org ',
	      'np':' com edu gov mil net org ',
	      'nr':' biz com edu gov info net org ',
	      'om':' ac biz co com edu gov med mil museum net org pro sch ',
	      'pe':' com edu gob mil net nom org sld ',
	      'ph':' com edu gov i mil net ngo org ',
	      'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
	      'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
	      'pr':' ac biz com edu est gov info isla name net org pro prof ',
	      'ps':' com edu gov net org plo sec ',
	      'pw':' belau co ed go ne or ',
	      'ro':' arts com firm info nom nt org rec store tm www ',
	      'rs':' ac co edu gov in org ',
	      'sb':' com edu gov net org ',
	      'sc':' com edu gov net org ',
	      'sh':' co com edu gov net nom org ',
	      'sl':' com edu gov net org ',
	      'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
	      'sv':' com edu gob org red ',
	      'sz':' ac co org ',
	      'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
	      'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
	      'tw':' club com ebiz edu game gov idv mil net org ',
	      'mu':' ac co com gov net or org ',
	      'mz':' ac co edu gov org ',
	      'na':' co com ',
	      'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
	      'pa':' abo ac com edu gob ing med net nom org sld ',
	      'pt':' com edu gov int net nome org publ ',
	      'py':' com edu gov mil net org ',
	      'qa':' com edu gov mil net org ',
	      're':' asso com nom ',
	      'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
	      'rw':' ac co com edu gouv gov int mil net ',
	      'sa':' com edu gov med net org pub sch ',
	      'sd':' com edu gov info med net org tv ',
	      'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
	      'sg':' com edu gov idn net org per ',
	      'sn':' art com edu gouv org perso univ ',
	      'sy':' com edu gov mil net news org ',
	      'th':' ac co go in mi net or ',
	      'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
	      'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
	      'tz':' ac co go ne or ',
	      'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
	      'ug':' ac co go ne or org sc ',
	      'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
	      'us':' dni fed isa kids nsn ',
	      'uy':' com edu gub mil net org ',
	      've':' co com edu gob info mil net org web ',
	      'vi':' co com k12 net org ',
	      'vn':' ac biz com edu gov health info int name net org pro ',
	      'ye':' co com gov ltd me net org plc ',
	      'yu':' ac co edu gov org ',
	      'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
	      'zm':' ac co com edu gov net org sch ',
	      // https://en.wikipedia.org/wiki/CentralNic#Second-level_domains
	      'com': 'ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ',
	      'net': 'gb jp se uk ',
	      'org': 'ae',
	      'de': 'com '
	    },
	    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
	    // in both performance and memory footprint. No initialization required.
	    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
	    // Following methods use lastIndexOf() rather than array.split() in order
	    // to avoid any memory allocations.
	    has: function(domain) {
	      var tldOffset = domain.lastIndexOf('.');
	      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
	        return false;
	      }
	      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
	      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
	        return false;
	      }
	      var sldList = SLD.list[domain.slice(tldOffset+1)];
	      if (!sldList) {
	        return false;
	      }
	      return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
	    },
	    is: function(domain) {
	      var tldOffset = domain.lastIndexOf('.');
	      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
	        return false;
	      }
	      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
	      if (sldOffset >= 0) {
	        return false;
	      }
	      var sldList = SLD.list[domain.slice(tldOffset+1)];
	      if (!sldList) {
	        return false;
	      }
	      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
	    },
	    get: function(domain) {
	      var tldOffset = domain.lastIndexOf('.');
	      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
	        return null;
	      }
	      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
	      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
	        return null;
	      }
	      var sldList = SLD.list[domain.slice(tldOffset+1)];
	      if (!sldList) {
	        return null;
	      }
	      if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
	        return null;
	      }
	      return domain.slice(sldOffset+1);
	    },
	    noConflict: function(){
	      if (root.SecondLevelDomains === this) {
	        root.SecondLevelDomains = _SecondLevelDomains;
	      }
	      return this;
	    }
	  };

	  return SLD;
	}));
	});

	var URI = createCommonjsModule(function (module) {
	/*!
	 * URI.js - Mutating URLs
	 *
	 * Version: 1.19.1
	 *
	 * Author: Rodney Rehm
	 * Web: http://medialize.github.io/URI.js/
	 *
	 * Licensed under
	 *   MIT License http://www.opensource.org/licenses/mit-license
	 *
	 */
	(function (root, factory) {
	  // https://github.com/umdjs/umd/blob/master/returnExports.js
	  if (module.exports) {
	    // Node
	    module.exports = factory(punycode, IPv6, SecondLevelDomains);
	  } else {
	    // Browser globals (root is window)
	    root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
	  }
	}(commonjsGlobal, function (punycode$$1, IPv6$$1, SLD, root) {
	  /*global location, escape, unescape */
	  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
	  /*jshint camelcase: false */

	  // save current URI variable, if any
	  var _URI = root && root.URI;

	  function URI(url, base) {
	    var _urlSupplied = arguments.length >= 1;
	    var _baseSupplied = arguments.length >= 2;

	    // Allow instantiation without the 'new' keyword
	    if (!(this instanceof URI)) {
	      if (_urlSupplied) {
	        if (_baseSupplied) {
	          return new URI(url, base);
	        }

	        return new URI(url);
	      }

	      return new URI();
	    }

	    if (url === undefined) {
	      if (_urlSupplied) {
	        throw new TypeError('undefined is not a valid argument for URI');
	      }

	      if (typeof location !== 'undefined') {
	        url = location.href + '';
	      } else {
	        url = '';
	      }
	    }

	    if (url === null) {
	      if (_urlSupplied) {
	        throw new TypeError('null is not a valid argument for URI');
	      }
	    }

	    this.href(url);

	    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
	    if (base !== undefined) {
	      return this.absoluteTo(base);
	    }

	    return this;
	  }

	  function isInteger(value) {
	    return /^[0-9]+$/.test(value);
	  }

	  URI.version = '1.19.1';

	  var p = URI.prototype;
	  var hasOwn = Object.prototype.hasOwnProperty;

	  function escapeRegEx(string) {
	    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
	    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	  }

	  function getType(value) {
	    // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
	    if (value === undefined) {
	      return 'Undefined';
	    }

	    return String(Object.prototype.toString.call(value)).slice(8, -1);
	  }

	  function isArray(obj) {
	    return getType(obj) === 'Array';
	  }

	  function filterArrayValues(data, value) {
	    var lookup = {};
	    var i, length;

	    if (getType(value) === 'RegExp') {
	      lookup = null;
	    } else if (isArray(value)) {
	      for (i = 0, length = value.length; i < length; i++) {
	        lookup[value[i]] = true;
	      }
	    } else {
	      lookup[value] = true;
	    }

	    for (i = 0, length = data.length; i < length; i++) {
	      /*jshint laxbreak: true */
	      var _match = lookup && lookup[data[i]] !== undefined
	        || !lookup && value.test(data[i]);
	      /*jshint laxbreak: false */
	      if (_match) {
	        data.splice(i, 1);
	        length--;
	        i--;
	      }
	    }

	    return data;
	  }

	  function arrayContains(list, value) {
	    var i, length;

	    // value may be string, number, array, regexp
	    if (isArray(value)) {
	      // Note: this can be optimized to O(n) (instead of current O(m * n))
	      for (i = 0, length = value.length; i < length; i++) {
	        if (!arrayContains(list, value[i])) {
	          return false;
	        }
	      }

	      return true;
	    }

	    var _type = getType(value);
	    for (i = 0, length = list.length; i < length; i++) {
	      if (_type === 'RegExp') {
	        if (typeof list[i] === 'string' && list[i].match(value)) {
	          return true;
	        }
	      } else if (list[i] === value) {
	        return true;
	      }
	    }

	    return false;
	  }

	  function arraysEqual(one, two) {
	    if (!isArray(one) || !isArray(two)) {
	      return false;
	    }

	    // arrays can't be equal if they have different amount of content
	    if (one.length !== two.length) {
	      return false;
	    }

	    one.sort();
	    two.sort();

	    for (var i = 0, l = one.length; i < l; i++) {
	      if (one[i] !== two[i]) {
	        return false;
	      }
	    }

	    return true;
	  }

	  function trimSlashes(text) {
	    var trim_expression = /^\/+|\/+$/g;
	    return text.replace(trim_expression, '');
	  }

	  URI._parts = function() {
	    return {
	      protocol: null,
	      username: null,
	      password: null,
	      hostname: null,
	      urn: null,
	      port: null,
	      path: null,
	      query: null,
	      fragment: null,
	      // state
	      preventInvalidHostname: URI.preventInvalidHostname,
	      duplicateQueryParameters: URI.duplicateQueryParameters,
	      escapeQuerySpace: URI.escapeQuerySpace
	    };
	  };
	  // state: throw on invalid hostname
	  // see https://github.com/medialize/URI.js/pull/345
	  // and https://github.com/medialize/URI.js/issues/354
	  URI.preventInvalidHostname = false;
	  // state: allow duplicate query parameters (a=1&a=1)
	  URI.duplicateQueryParameters = false;
	  // state: replaces + with %20 (space in query strings)
	  URI.escapeQuerySpace = true;
	  // static properties
	  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
	  URI.idn_expression = /[^a-z0-9\._-]/i;
	  URI.punycode_expression = /(xn--)/i;
	  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
	  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
	  // credits to Rich Brown
	  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
	  // specification: http://www.ietf.org/rfc/rfc4291.txt
	  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
	  // expression used is "gruber revised" (@gruber v2) determined to be the
	  // best solution in a regex-golf we did a couple of ages ago at
	  // * http://mathiasbynens.be/demo/url-regex
	  // * http://rodneyrehm.de/t/url-regex.html
	  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
	  URI.findUri = {
	    // valid "scheme://" or "www."
	    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
	    // everything up to the next whitespace
	    end: /[\s\r\n]|$/,
	    // trim trailing punctuation captured by end RegExp
	    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
	    // balanced parens inclusion (), [], {}, <>
	    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
	  };
	  // http://www.iana.org/assignments/uri-schemes.html
	  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
	  URI.defaultPorts = {
	    http: '80',
	    https: '443',
	    ftp: '21',
	    gopher: '70',
	    ws: '80',
	    wss: '443'
	  };
	  // list of protocols which always require a hostname
	  URI.hostProtocols = [
	    'http',
	    'https'
	  ];

	  // allowed hostname characters according to RFC 3986
	  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
	  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . - _
	  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/;
	  // map DOM Elements to their URI attribute
	  URI.domAttributes = {
	    'a': 'href',
	    'blockquote': 'cite',
	    'link': 'href',
	    'base': 'href',
	    'script': 'src',
	    'form': 'action',
	    'img': 'src',
	    'area': 'href',
	    'iframe': 'src',
	    'embed': 'src',
	    'source': 'src',
	    'track': 'src',
	    'input': 'src', // but only if type="image"
	    'audio': 'src',
	    'video': 'src'
	  };
	  URI.getDomAttribute = function(node) {
	    if (!node || !node.nodeName) {
	      return undefined;
	    }

	    var nodeName = node.nodeName.toLowerCase();
	    // <input> should only expose src for type="image"
	    if (nodeName === 'input' && node.type !== 'image') {
	      return undefined;
	    }

	    return URI.domAttributes[nodeName];
	  };

	  function escapeForDumbFirefox36(value) {
	    // https://github.com/medialize/URI.js/issues/91
	    return escape(value);
	  }

	  // encoding / decoding according to RFC3986
	  function strictEncodeURIComponent(string) {
	    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
	    return encodeURIComponent(string)
	      .replace(/[!'()*]/g, escapeForDumbFirefox36)
	      .replace(/\*/g, '%2A');
	  }
	  URI.encode = strictEncodeURIComponent;
	  URI.decode = decodeURIComponent;
	  URI.iso8859 = function() {
	    URI.encode = escape;
	    URI.decode = unescape;
	  };
	  URI.unicode = function() {
	    URI.encode = strictEncodeURIComponent;
	    URI.decode = decodeURIComponent;
	  };
	  URI.characters = {
	    pathname: {
	      encode: {
	        // RFC3986 2.1: For consistency, URI producers and normalizers should
	        // use uppercase hexadecimal digits for all percent-encodings.
	        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
	        map: {
	          // -._~!'()*
	          '%24': '$',
	          '%26': '&',
	          '%2B': '+',
	          '%2C': ',',
	          '%3B': ';',
	          '%3D': '=',
	          '%3A': ':',
	          '%40': '@'
	        }
	      },
	      decode: {
	        expression: /[\/\?#]/g,
	        map: {
	          '/': '%2F',
	          '?': '%3F',
	          '#': '%23'
	        }
	      }
	    },
	    reserved: {
	      encode: {
	        // RFC3986 2.1: For consistency, URI producers and normalizers should
	        // use uppercase hexadecimal digits for all percent-encodings.
	        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
	        map: {
	          // gen-delims
	          '%3A': ':',
	          '%2F': '/',
	          '%3F': '?',
	          '%23': '#',
	          '%5B': '[',
	          '%5D': ']',
	          '%40': '@',
	          // sub-delims
	          '%21': '!',
	          '%24': '$',
	          '%26': '&',
	          '%27': '\'',
	          '%28': '(',
	          '%29': ')',
	          '%2A': '*',
	          '%2B': '+',
	          '%2C': ',',
	          '%3B': ';',
	          '%3D': '='
	        }
	      }
	    },
	    urnpath: {
	      // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
	      // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
	      // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
	      // note that the colon character is not featured in the encoding map; this is because URI.js
	      // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
	      // should not appear unencoded in a segment itself.
	      // See also the note above about RFC3986 and capitalalized hex digits.
	      encode: {
	        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
	        map: {
	          '%21': '!',
	          '%24': '$',
	          '%27': '\'',
	          '%28': '(',
	          '%29': ')',
	          '%2A': '*',
	          '%2B': '+',
	          '%2C': ',',
	          '%3B': ';',
	          '%3D': '=',
	          '%40': '@'
	        }
	      },
	      // These characters are the characters called out by RFC2141 as "reserved" characters that
	      // should never appear in a URN, plus the colon character (see note above).
	      decode: {
	        expression: /[\/\?#:]/g,
	        map: {
	          '/': '%2F',
	          '?': '%3F',
	          '#': '%23',
	          ':': '%3A'
	        }
	      }
	    }
	  };
	  URI.encodeQuery = function(string, escapeQuerySpace) {
	    var escaped = URI.encode(string + '');
	    if (escapeQuerySpace === undefined) {
	      escapeQuerySpace = URI.escapeQuerySpace;
	    }

	    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
	  };
	  URI.decodeQuery = function(string, escapeQuerySpace) {
	    string += '';
	    if (escapeQuerySpace === undefined) {
	      escapeQuerySpace = URI.escapeQuerySpace;
	    }

	    try {
	      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
	    } catch(e) {
	      // we're not going to mess with weird encodings,
	      // give up and return the undecoded original string
	      // see https://github.com/medialize/URI.js/issues/87
	      // see https://github.com/medialize/URI.js/issues/92
	      return string;
	    }
	  };
	  // generate encode/decode path functions
	  var _parts = {'encode':'encode', 'decode':'decode'};
	  var _part;
	  var generateAccessor = function(_group, _part) {
	    return function(string) {
	      try {
	        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
	          return URI.characters[_group][_part].map[c];
	        });
	      } catch (e) {
	        // we're not going to mess with weird encodings,
	        // give up and return the undecoded original string
	        // see https://github.com/medialize/URI.js/issues/87
	        // see https://github.com/medialize/URI.js/issues/92
	        return string;
	      }
	    };
	  };

	  for (_part in _parts) {
	    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
	    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
	  }

	  var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
	    return function(string) {
	      // Why pass in names of functions, rather than the function objects themselves? The
	      // definitions of some functions (but in particular, URI.decode) will occasionally change due
	      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
	      // that the functions we use here are "fresh".
	      var actualCodingFunc;
	      if (!_innerCodingFuncName) {
	        actualCodingFunc = URI[_codingFuncName];
	      } else {
	        actualCodingFunc = function(string) {
	          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
	        };
	      }

	      var segments = (string + '').split(_sep);

	      for (var i = 0, length = segments.length; i < length; i++) {
	        segments[i] = actualCodingFunc(segments[i]);
	      }

	      return segments.join(_sep);
	    };
	  };

	  // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
	  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
	  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
	  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
	  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

	  URI.encodeReserved = generateAccessor('reserved', 'encode');

	  URI.parse = function(string, parts) {
	    var pos;
	    if (!parts) {
	      parts = {
	        preventInvalidHostname: URI.preventInvalidHostname
	      };
	    }
	    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

	    // extract fragment
	    pos = string.indexOf('#');
	    if (pos > -1) {
	      // escaping?
	      parts.fragment = string.substring(pos + 1) || null;
	      string = string.substring(0, pos);
	    }

	    // extract query
	    pos = string.indexOf('?');
	    if (pos > -1) {
	      // escaping?
	      parts.query = string.substring(pos + 1) || null;
	      string = string.substring(0, pos);
	    }

	    // extract protocol
	    if (string.substring(0, 2) === '//') {
	      // relative-scheme
	      parts.protocol = null;
	      string = string.substring(2);
	      // extract "user:pass@host:port"
	      string = URI.parseAuthority(string, parts);
	    } else {
	      pos = string.indexOf(':');
	      if (pos > -1) {
	        parts.protocol = string.substring(0, pos) || null;
	        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
	          // : may be within the path
	          parts.protocol = undefined;
	        } else if (string.substring(pos + 1, pos + 3) === '//') {
	          string = string.substring(pos + 3);

	          // extract "user:pass@host:port"
	          string = URI.parseAuthority(string, parts);
	        } else {
	          string = string.substring(pos + 1);
	          parts.urn = true;
	        }
	      }
	    }

	    // what's left must be the path
	    parts.path = string;

	    // and we're done
	    return parts;
	  };
	  URI.parseHost = function(string, parts) {
	    if (!string) {
	      string = '';
	    }

	    // Copy chrome, IE, opera backslash-handling behavior.
	    // Back slashes before the query string get converted to forward slashes
	    // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
	    // See: https://code.google.com/p/chromium/issues/detail?id=25916
	    // https://github.com/medialize/URI.js/pull/233
	    string = string.replace(/\\/g, '/');

	    // extract host:port
	    var pos = string.indexOf('/');
	    var bracketPos;
	    var t;

	    if (pos === -1) {
	      pos = string.length;
	    }

	    if (string.charAt(0) === '[') {
	      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
	      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
	      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
	      bracketPos = string.indexOf(']');
	      parts.hostname = string.substring(1, bracketPos) || null;
	      parts.port = string.substring(bracketPos + 2, pos) || null;
	      if (parts.port === '/') {
	        parts.port = null;
	      }
	    } else {
	      var firstColon = string.indexOf(':');
	      var firstSlash = string.indexOf('/');
	      var nextColon = string.indexOf(':', firstColon + 1);
	      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
	        // IPv6 host contains multiple colons - but no port
	        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
	        parts.hostname = string.substring(0, pos) || null;
	        parts.port = null;
	      } else {
	        t = string.substring(0, pos).split(':');
	        parts.hostname = t[0] || null;
	        parts.port = t[1] || null;
	      }
	    }

	    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
	      pos++;
	      string = '/' + string;
	    }

	    if (parts.preventInvalidHostname) {
	      URI.ensureValidHostname(parts.hostname, parts.protocol);
	    }

	    if (parts.port) {
	      URI.ensureValidPort(parts.port);
	    }

	    return string.substring(pos) || '/';
	  };
	  URI.parseAuthority = function(string, parts) {
	    string = URI.parseUserinfo(string, parts);
	    return URI.parseHost(string, parts);
	  };
	  URI.parseUserinfo = function(string, parts) {
	    // extract username:password
	    var firstSlash = string.indexOf('/');
	    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
	    var t;

	    // authority@ must come before /path
	    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
	      t = string.substring(0, pos).split(':');
	      parts.username = t[0] ? URI.decode(t[0]) : null;
	      t.shift();
	      parts.password = t[0] ? URI.decode(t.join(':')) : null;
	      string = string.substring(pos + 1);
	    } else {
	      parts.username = null;
	      parts.password = null;
	    }

	    return string;
	  };
	  URI.parseQuery = function(string, escapeQuerySpace) {
	    if (!string) {
	      return {};
	    }

	    // throw out the funky business - "?"[name"="value"&"]+
	    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

	    if (!string) {
	      return {};
	    }

	    var items = {};
	    var splits = string.split('&');
	    var length = splits.length;
	    var v, name, value;

	    for (var i = 0; i < length; i++) {
	      v = splits[i].split('=');
	      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
	      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
	      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

	      if (hasOwn.call(items, name)) {
	        if (typeof items[name] === 'string' || items[name] === null) {
	          items[name] = [items[name]];
	        }

	        items[name].push(value);
	      } else {
	        items[name] = value;
	      }
	    }

	    return items;
	  };

	  URI.build = function(parts) {
	    var t = '';

	    if (parts.protocol) {
	      t += parts.protocol + ':';
	    }

	    if (!parts.urn && (t || parts.hostname)) {
	      t += '//';
	    }

	    t += (URI.buildAuthority(parts) || '');

	    if (typeof parts.path === 'string') {
	      if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
	        t += '/';
	      }

	      t += parts.path;
	    }

	    if (typeof parts.query === 'string' && parts.query) {
	      t += '?' + parts.query;
	    }

	    if (typeof parts.fragment === 'string' && parts.fragment) {
	      t += '#' + parts.fragment;
	    }
	    return t;
	  };
	  URI.buildHost = function(parts) {
	    var t = '';

	    if (!parts.hostname) {
	      return '';
	    } else if (URI.ip6_expression.test(parts.hostname)) {
	      t += '[' + parts.hostname + ']';
	    } else {
	      t += parts.hostname;
	    }

	    if (parts.port) {
	      t += ':' + parts.port;
	    }

	    return t;
	  };
	  URI.buildAuthority = function(parts) {
	    return URI.buildUserinfo(parts) + URI.buildHost(parts);
	  };
	  URI.buildUserinfo = function(parts) {
	    var t = '';

	    if (parts.username) {
	      t += URI.encode(parts.username);
	    }

	    if (parts.password) {
	      t += ':' + URI.encode(parts.password);
	    }

	    if (t) {
	      t += '@';
	    }

	    return t;
	  };
	  URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
	    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
	    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
	    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
	    // URI.js treats the query string as being application/x-www-form-urlencoded
	    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

	    var t = '';
	    var unique, key, i, length;
	    for (key in data) {
	      if (hasOwn.call(data, key) && key) {
	        if (isArray(data[key])) {
	          unique = {};
	          for (i = 0, length = data[key].length; i < length; i++) {
	            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
	              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
	              if (duplicateQueryParameters !== true) {
	                unique[data[key][i] + ''] = true;
	              }
	            }
	          }
	        } else if (data[key] !== undefined) {
	          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
	        }
	      }
	    }

	    return t.substring(1);
	  };
	  URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
	    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
	    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
	    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
	  };

	  URI.addQuery = function(data, name, value) {
	    if (typeof name === 'object') {
	      for (var key in name) {
	        if (hasOwn.call(name, key)) {
	          URI.addQuery(data, key, name[key]);
	        }
	      }
	    } else if (typeof name === 'string') {
	      if (data[name] === undefined) {
	        data[name] = value;
	        return;
	      } else if (typeof data[name] === 'string') {
	        data[name] = [data[name]];
	      }

	      if (!isArray(value)) {
	        value = [value];
	      }

	      data[name] = (data[name] || []).concat(value);
	    } else {
	      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
	    }
	  };

	  URI.setQuery = function(data, name, value) {
	    if (typeof name === 'object') {
	      for (var key in name) {
	        if (hasOwn.call(name, key)) {
	          URI.setQuery(data, key, name[key]);
	        }
	      }
	    } else if (typeof name === 'string') {
	      data[name] = value === undefined ? null : value;
	    } else {
	      throw new TypeError('URI.setQuery() accepts an object, string as the name parameter');
	    }
	  };

	  URI.removeQuery = function(data, name, value) {
	    var i, length, key;

	    if (isArray(name)) {
	      for (i = 0, length = name.length; i < length; i++) {
	        data[name[i]] = undefined;
	      }
	    } else if (getType(name) === 'RegExp') {
	      for (key in data) {
	        if (name.test(key)) {
	          data[key] = undefined;
	        }
	      }
	    } else if (typeof name === 'object') {
	      for (key in name) {
	        if (hasOwn.call(name, key)) {
	          URI.removeQuery(data, key, name[key]);
	        }
	      }
	    } else if (typeof name === 'string') {
	      if (value !== undefined) {
	        if (getType(value) === 'RegExp') {
	          if (!isArray(data[name]) && value.test(data[name])) {
	            data[name] = undefined;
	          } else {
	            data[name] = filterArrayValues(data[name], value);
	          }
	        } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
	          data[name] = undefined;
	        } else if (isArray(data[name])) {
	          data[name] = filterArrayValues(data[name], value);
	        }
	      } else {
	        data[name] = undefined;
	      }
	    } else {
	      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
	    }
	  };
	  URI.hasQuery = function(data, name, value, withinArray) {
	    switch (getType(name)) {
	      case 'String':
	        // Nothing to do here
	        break;

	      case 'RegExp':
	        for (var key in data) {
	          if (hasOwn.call(data, key)) {
	            if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
	              return true;
	            }
	          }
	        }

	        return false;

	      case 'Object':
	        for (var _key in name) {
	          if (hasOwn.call(name, _key)) {
	            if (!URI.hasQuery(data, _key, name[_key])) {
	              return false;
	            }
	          }
	        }

	        return true;

	      default:
	        throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
	    }

	    switch (getType(value)) {
	      case 'Undefined':
	        // true if exists (but may be empty)
	        return name in data; // data[name] !== undefined;

	      case 'Boolean':
	        // true if exists and non-empty
	        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
	        return value === _booly;

	      case 'Function':
	        // allow complex comparison
	        return !!value(data[name], name, data);

	      case 'Array':
	        if (!isArray(data[name])) {
	          return false;
	        }

	        var op = withinArray ? arrayContains : arraysEqual;
	        return op(data[name], value);

	      case 'RegExp':
	        if (!isArray(data[name])) {
	          return Boolean(data[name] && data[name].match(value));
	        }

	        if (!withinArray) {
	          return false;
	        }

	        return arrayContains(data[name], value);

	      case 'Number':
	        value = String(value);
	        /* falls through */
	      case 'String':
	        if (!isArray(data[name])) {
	          return data[name] === value;
	        }

	        if (!withinArray) {
	          return false;
	        }

	        return arrayContains(data[name], value);

	      default:
	        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
	    }
	  };


	  URI.joinPaths = function() {
	    var input = [];
	    var segments = [];
	    var nonEmptySegments = 0;

	    for (var i = 0; i < arguments.length; i++) {
	      var url = new URI(arguments[i]);
	      input.push(url);
	      var _segments = url.segment();
	      for (var s = 0; s < _segments.length; s++) {
	        if (typeof _segments[s] === 'string') {
	          segments.push(_segments[s]);
	        }

	        if (_segments[s]) {
	          nonEmptySegments++;
	        }
	      }
	    }

	    if (!segments.length || !nonEmptySegments) {
	      return new URI('');
	    }

	    var uri = new URI('').segment(segments);

	    if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
	      uri.path('/' + uri.path());
	    }

	    return uri.normalize();
	  };

	  URI.commonPath = function(one, two) {
	    var length = Math.min(one.length, two.length);
	    var pos;

	    // find first non-matching character
	    for (pos = 0; pos < length; pos++) {
	      if (one.charAt(pos) !== two.charAt(pos)) {
	        pos--;
	        break;
	      }
	    }

	    if (pos < 1) {
	      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
	    }

	    // revert to last /
	    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
	      pos = one.substring(0, pos).lastIndexOf('/');
	    }

	    return one.substring(0, pos + 1);
	  };

	  URI.withinString = function(string, callback, options) {
	    options || (options = {});
	    var _start = options.start || URI.findUri.start;
	    var _end = options.end || URI.findUri.end;
	    var _trim = options.trim || URI.findUri.trim;
	    var _parens = options.parens || URI.findUri.parens;
	    var _attributeOpen = /[a-z0-9-]=["']?$/i;

	    _start.lastIndex = 0;
	    while (true) {
	      var match = _start.exec(string);
	      if (!match) {
	        break;
	      }

	      var start = match.index;
	      if (options.ignoreHtml) {
	        // attribut(e=["']?$)
	        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
	        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
	          continue;
	        }
	      }

	      var end = start + string.slice(start).search(_end);
	      var slice = string.slice(start, end);
	      // make sure we include well balanced parens
	      var parensEnd = -1;
	      while (true) {
	        var parensMatch = _parens.exec(slice);
	        if (!parensMatch) {
	          break;
	        }

	        var parensMatchEnd = parensMatch.index + parensMatch[0].length;
	        parensEnd = Math.max(parensEnd, parensMatchEnd);
	      }

	      if (parensEnd > -1) {
	        slice = slice.slice(0, parensEnd) + slice.slice(parensEnd).replace(_trim, '');
	      } else {
	        slice = slice.replace(_trim, '');
	      }

	      if (slice.length <= match[0].length) {
	        // the extract only contains the starting marker of a URI,
	        // e.g. "www" or "http://"
	        continue;
	      }

	      if (options.ignore && options.ignore.test(slice)) {
	        continue;
	      }

	      end = start + slice.length;
	      var result = callback(slice, start, end, string);
	      if (result === undefined) {
	        _start.lastIndex = end;
	        continue;
	      }

	      result = String(result);
	      string = string.slice(0, start) + result + string.slice(end);
	      _start.lastIndex = start + result.length;
	    }

	    _start.lastIndex = 0;
	    return string;
	  };

	  URI.ensureValidHostname = function(v, protocol) {
	    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
	    // they are not part of DNS and therefore ignored by URI.js

	    var hasHostname = !!v; // not null and not an empty string
	    var hasProtocol = !!protocol;
	    var rejectEmptyHostname = false;

	    if (hasProtocol) {
	      rejectEmptyHostname = arrayContains(URI.hostProtocols, protocol);
	    }

	    if (rejectEmptyHostname && !hasHostname) {
	      throw new TypeError('Hostname cannot be empty, if protocol is ' + protocol);
	    } else if (v && v.match(URI.invalid_hostname_characters)) {
	      // test punycode
	      if (!punycode$$1) {
	        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available');
	      }
	      if (punycode$$1.toASCII(v).match(URI.invalid_hostname_characters)) {
	        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_]');
	      }
	    }
	  };

	  URI.ensureValidPort = function (v) {
	    if (!v) {
	      return;
	    }

	    var port = Number(v);
	    if (isInteger(port) && (port > 0) && (port < 65536)) {
	      return;
	    }

	    throw new TypeError('Port "' + v + '" is not a valid port');
	  };

	  // noConflict
	  URI.noConflict = function(removeAll) {
	    if (removeAll) {
	      var unconflicted = {
	        URI: this.noConflict()
	      };

	      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
	        unconflicted.URITemplate = root.URITemplate.noConflict();
	      }

	      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
	        unconflicted.IPv6 = root.IPv6.noConflict();
	      }

	      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
	        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
	      }

	      return unconflicted;
	    } else if (root.URI === this) {
	      root.URI = _URI;
	    }

	    return this;
	  };

	  p.build = function(deferBuild) {
	    if (deferBuild === true) {
	      this._deferred_build = true;
	    } else if (deferBuild === undefined || this._deferred_build) {
	      this._string = URI.build(this._parts);
	      this._deferred_build = false;
	    }

	    return this;
	  };

	  p.clone = function() {
	    return new URI(this);
	  };

	  p.valueOf = p.toString = function() {
	    return this.build(false)._string;
	  };


	  function generateSimpleAccessor(_part){
	    return function(v, build) {
	      if (v === undefined) {
	        return this._parts[_part] || '';
	      } else {
	        this._parts[_part] = v || null;
	        this.build(!build);
	        return this;
	      }
	    };
	  }

	  function generatePrefixAccessor(_part, _key){
	    return function(v, build) {
	      if (v === undefined) {
	        return this._parts[_part] || '';
	      } else {
	        if (v !== null) {
	          v = v + '';
	          if (v.charAt(0) === _key) {
	            v = v.substring(1);
	          }
	        }

	        this._parts[_part] = v;
	        this.build(!build);
	        return this;
	      }
	    };
	  }

	  p.protocol = generateSimpleAccessor('protocol');
	  p.username = generateSimpleAccessor('username');
	  p.password = generateSimpleAccessor('password');
	  p.hostname = generateSimpleAccessor('hostname');
	  p.port = generateSimpleAccessor('port');
	  p.query = generatePrefixAccessor('query', '?');
	  p.fragment = generatePrefixAccessor('fragment', '#');

	  p.search = function(v, build) {
	    var t = this.query(v, build);
	    return typeof t === 'string' && t.length ? ('?' + t) : t;
	  };
	  p.hash = function(v, build) {
	    var t = this.fragment(v, build);
	    return typeof t === 'string' && t.length ? ('#' + t) : t;
	  };

	  p.pathname = function(v, build) {
	    if (v === undefined || v === true) {
	      var res = this._parts.path || (this._parts.hostname ? '/' : '');
	      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
	    } else {
	      if (this._parts.urn) {
	        this._parts.path = v ? URI.recodeUrnPath(v) : '';
	      } else {
	        this._parts.path = v ? URI.recodePath(v) : '/';
	      }
	      this.build(!build);
	      return this;
	    }
	  };
	  p.path = p.pathname;
	  p.href = function(href, build) {
	    var key;

	    if (href === undefined) {
	      return this.toString();
	    }

	    this._string = '';
	    this._parts = URI._parts();

	    var _URI = href instanceof URI;
	    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
	    if (href.nodeName) {
	      var attribute = URI.getDomAttribute(href);
	      href = href[attribute] || '';
	      _object = false;
	    }

	    // window.location is reported to be an object, but it's not the sort
	    // of object we're looking for:
	    // * location.protocol ends with a colon
	    // * location.query != object.search
	    // * location.hash != object.fragment
	    // simply serializing the unknown object should do the trick
	    // (for location, not for everything...)
	    if (!_URI && _object && href.pathname !== undefined) {
	      href = href.toString();
	    }

	    if (typeof href === 'string' || href instanceof String) {
	      this._parts = URI.parse(String(href), this._parts);
	    } else if (_URI || _object) {
	      var src = _URI ? href._parts : href;
	      for (key in src) {
	        if (key === 'query') { continue; }
	        if (hasOwn.call(this._parts, key)) {
	          this._parts[key] = src[key];
	        }
	      }
	      if (src.query) {
	        this.query(src.query, false);
	      }
	    } else {
	      throw new TypeError('invalid input');
	    }

	    this.build(!build);
	    return this;
	  };

	  // identification accessors
	  p.is = function(what) {
	    var ip = false;
	    var ip4 = false;
	    var ip6 = false;
	    var name = false;
	    var sld = false;
	    var idn = false;
	    var punycode$$1 = false;
	    var relative = !this._parts.urn;

	    if (this._parts.hostname) {
	      relative = false;
	      ip4 = URI.ip4_expression.test(this._parts.hostname);
	      ip6 = URI.ip6_expression.test(this._parts.hostname);
	      ip = ip4 || ip6;
	      name = !ip;
	      sld = name && SLD && SLD.has(this._parts.hostname);
	      idn = name && URI.idn_expression.test(this._parts.hostname);
	      punycode$$1 = name && URI.punycode_expression.test(this._parts.hostname);
	    }

	    switch (what.toLowerCase()) {
	      case 'relative':
	        return relative;

	      case 'absolute':
	        return !relative;

	      // hostname identification
	      case 'domain':
	      case 'name':
	        return name;

	      case 'sld':
	        return sld;

	      case 'ip':
	        return ip;

	      case 'ip4':
	      case 'ipv4':
	      case 'inet4':
	        return ip4;

	      case 'ip6':
	      case 'ipv6':
	      case 'inet6':
	        return ip6;

	      case 'idn':
	        return idn;

	      case 'url':
	        return !this._parts.urn;

	      case 'urn':
	        return !!this._parts.urn;

	      case 'punycode':
	        return punycode$$1;
	    }

	    return null;
	  };

	  // component specific input validation
	  var _protocol = p.protocol;
	  var _port = p.port;
	  var _hostname = p.hostname;

	  p.protocol = function(v, build) {
	    if (v) {
	      // accept trailing ://
	      v = v.replace(/:(\/\/)?$/, '');

	      if (!v.match(URI.protocol_expression)) {
	        throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
	      }
	    }

	    return _protocol.call(this, v, build);
	  };
	  p.scheme = p.protocol;
	  p.port = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v !== undefined) {
	      if (v === 0) {
	        v = null;
	      }

	      if (v) {
	        v += '';
	        if (v.charAt(0) === ':') {
	          v = v.substring(1);
	        }

	        URI.ensureValidPort(v);
	      }
	    }
	    return _port.call(this, v, build);
	  };
	  p.hostname = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v !== undefined) {
	      var x = { preventInvalidHostname: this._parts.preventInvalidHostname };
	      var res = URI.parseHost(v, x);
	      if (res !== '/') {
	        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
	      }

	      v = x.hostname;
	      if (this._parts.preventInvalidHostname) {
	        URI.ensureValidHostname(v, this._parts.protocol);
	      }
	    }

	    return _hostname.call(this, v, build);
	  };

	  // compound accessors
	  p.origin = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v === undefined) {
	      var protocol = this.protocol();
	      var authority = this.authority();
	      if (!authority) {
	        return '';
	      }

	      return (protocol ? protocol + '://' : '') + this.authority();
	    } else {
	      var origin = URI(v);
	      this
	        .protocol(origin.protocol())
	        .authority(origin.authority())
	        .build(!build);
	      return this;
	    }
	  };
	  p.host = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v === undefined) {
	      return this._parts.hostname ? URI.buildHost(this._parts) : '';
	    } else {
	      var res = URI.parseHost(v, this._parts);
	      if (res !== '/') {
	        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
	      }

	      this.build(!build);
	      return this;
	    }
	  };
	  p.authority = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v === undefined) {
	      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
	    } else {
	      var res = URI.parseAuthority(v, this._parts);
	      if (res !== '/') {
	        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
	      }

	      this.build(!build);
	      return this;
	    }
	  };
	  p.userinfo = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v === undefined) {
	      var t = URI.buildUserinfo(this._parts);
	      return t ? t.substring(0, t.length -1) : t;
	    } else {
	      if (v[v.length-1] !== '@') {
	        v += '@';
	      }

	      URI.parseUserinfo(v, this._parts);
	      this.build(!build);
	      return this;
	    }
	  };
	  p.resource = function(v, build) {
	    var parts;

	    if (v === undefined) {
	      return this.path() + this.search() + this.hash();
	    }

	    parts = URI.parse(v);
	    this._parts.path = parts.path;
	    this._parts.query = parts.query;
	    this._parts.fragment = parts.fragment;
	    this.build(!build);
	    return this;
	  };

	  // fraction accessors
	  p.subdomain = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    // convenience, return "www" from "www.example.org"
	    if (v === undefined) {
	      if (!this._parts.hostname || this.is('IP')) {
	        return '';
	      }

	      // grab domain and add another segment
	      var end = this._parts.hostname.length - this.domain().length - 1;
	      return this._parts.hostname.substring(0, end) || '';
	    } else {
	      var e = this._parts.hostname.length - this.domain().length;
	      var sub = this._parts.hostname.substring(0, e);
	      var replace = new RegExp('^' + escapeRegEx(sub));

	      if (v && v.charAt(v.length - 1) !== '.') {
	        v += '.';
	      }

	      if (v.indexOf(':') !== -1) {
	        throw new TypeError('Domains cannot contain colons');
	      }

	      if (v) {
	        URI.ensureValidHostname(v, this._parts.protocol);
	      }

	      this._parts.hostname = this._parts.hostname.replace(replace, v);
	      this.build(!build);
	      return this;
	    }
	  };
	  p.domain = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (typeof v === 'boolean') {
	      build = v;
	      v = undefined;
	    }

	    // convenience, return "example.org" from "www.example.org"
	    if (v === undefined) {
	      if (!this._parts.hostname || this.is('IP')) {
	        return '';
	      }

	      // if hostname consists of 1 or 2 segments, it must be the domain
	      var t = this._parts.hostname.match(/\./g);
	      if (t && t.length < 2) {
	        return this._parts.hostname;
	      }

	      // grab tld and add another segment
	      var end = this._parts.hostname.length - this.tld(build).length - 1;
	      end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
	      return this._parts.hostname.substring(end) || '';
	    } else {
	      if (!v) {
	        throw new TypeError('cannot set domain empty');
	      }

	      if (v.indexOf(':') !== -1) {
	        throw new TypeError('Domains cannot contain colons');
	      }

	      URI.ensureValidHostname(v, this._parts.protocol);

	      if (!this._parts.hostname || this.is('IP')) {
	        this._parts.hostname = v;
	      } else {
	        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
	        this._parts.hostname = this._parts.hostname.replace(replace, v);
	      }

	      this.build(!build);
	      return this;
	    }
	  };
	  p.tld = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (typeof v === 'boolean') {
	      build = v;
	      v = undefined;
	    }

	    // return "org" from "www.example.org"
	    if (v === undefined) {
	      if (!this._parts.hostname || this.is('IP')) {
	        return '';
	      }

	      var pos = this._parts.hostname.lastIndexOf('.');
	      var tld = this._parts.hostname.substring(pos + 1);

	      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
	        return SLD.get(this._parts.hostname) || tld;
	      }

	      return tld;
	    } else {
	      var replace;

	      if (!v) {
	        throw new TypeError('cannot set TLD empty');
	      } else if (v.match(/[^a-zA-Z0-9-]/)) {
	        if (SLD && SLD.is(v)) {
	          replace = new RegExp(escapeRegEx(this.tld()) + '$');
	          this._parts.hostname = this._parts.hostname.replace(replace, v);
	        } else {
	          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
	        }
	      } else if (!this._parts.hostname || this.is('IP')) {
	        throw new ReferenceError('cannot set TLD on non-domain host');
	      } else {
	        replace = new RegExp(escapeRegEx(this.tld()) + '$');
	        this._parts.hostname = this._parts.hostname.replace(replace, v);
	      }

	      this.build(!build);
	      return this;
	    }
	  };
	  p.directory = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v === undefined || v === true) {
	      if (!this._parts.path && !this._parts.hostname) {
	        return '';
	      }

	      if (this._parts.path === '/') {
	        return '/';
	      }

	      var end = this._parts.path.length - this.filename().length - 1;
	      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

	      return v ? URI.decodePath(res) : res;

	    } else {
	      var e = this._parts.path.length - this.filename().length;
	      var directory = this._parts.path.substring(0, e);
	      var replace = new RegExp('^' + escapeRegEx(directory));

	      // fully qualifier directories begin with a slash
	      if (!this.is('relative')) {
	        if (!v) {
	          v = '/';
	        }

	        if (v.charAt(0) !== '/') {
	          v = '/' + v;
	        }
	      }

	      // directories always end with a slash
	      if (v && v.charAt(v.length - 1) !== '/') {
	        v += '/';
	      }

	      v = URI.recodePath(v);
	      this._parts.path = this._parts.path.replace(replace, v);
	      this.build(!build);
	      return this;
	    }
	  };
	  p.filename = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (typeof v !== 'string') {
	      if (!this._parts.path || this._parts.path === '/') {
	        return '';
	      }

	      var pos = this._parts.path.lastIndexOf('/');
	      var res = this._parts.path.substring(pos+1);

	      return v ? URI.decodePathSegment(res) : res;
	    } else {
	      var mutatedDirectory = false;

	      if (v.charAt(0) === '/') {
	        v = v.substring(1);
	      }

	      if (v.match(/\.?\//)) {
	        mutatedDirectory = true;
	      }

	      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
	      v = URI.recodePath(v);
	      this._parts.path = this._parts.path.replace(replace, v);

	      if (mutatedDirectory) {
	        this.normalizePath(build);
	      } else {
	        this.build(!build);
	      }

	      return this;
	    }
	  };
	  p.suffix = function(v, build) {
	    if (this._parts.urn) {
	      return v === undefined ? '' : this;
	    }

	    if (v === undefined || v === true) {
	      if (!this._parts.path || this._parts.path === '/') {
	        return '';
	      }

	      var filename = this.filename();
	      var pos = filename.lastIndexOf('.');
	      var s, res;

	      if (pos === -1) {
	        return '';
	      }

	      // suffix may only contain alnum characters (yup, I made this up.)
	      s = filename.substring(pos+1);
	      res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
	      return v ? URI.decodePathSegment(res) : res;
	    } else {
	      if (v.charAt(0) === '.') {
	        v = v.substring(1);
	      }

	      var suffix = this.suffix();
	      var replace;

	      if (!suffix) {
	        if (!v) {
	          return this;
	        }

	        this._parts.path += '.' + URI.recodePath(v);
	      } else if (!v) {
	        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
	      } else {
	        replace = new RegExp(escapeRegEx(suffix) + '$');
	      }

	      if (replace) {
	        v = URI.recodePath(v);
	        this._parts.path = this._parts.path.replace(replace, v);
	      }

	      this.build(!build);
	      return this;
	    }
	  };
	  p.segment = function(segment, v, build) {
	    var separator = this._parts.urn ? ':' : '/';
	    var path = this.path();
	    var absolute = path.substring(0, 1) === '/';
	    var segments = path.split(separator);

	    if (segment !== undefined && typeof segment !== 'number') {
	      build = v;
	      v = segment;
	      segment = undefined;
	    }

	    if (segment !== undefined && typeof segment !== 'number') {
	      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
	    }

	    if (absolute) {
	      segments.shift();
	    }

	    if (segment < 0) {
	      // allow negative indexes to address from the end
	      segment = Math.max(segments.length + segment, 0);
	    }

	    if (v === undefined) {
	      /*jshint laxbreak: true */
	      return segment === undefined
	        ? segments
	        : segments[segment];
	      /*jshint laxbreak: false */
	    } else if (segment === null || segments[segment] === undefined) {
	      if (isArray(v)) {
	        segments = [];
	        // collapse empty elements within array
	        for (var i=0, l=v.length; i < l; i++) {
	          if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
	            continue;
	          }

	          if (segments.length && !segments[segments.length -1].length) {
	            segments.pop();
	          }

	          segments.push(trimSlashes(v[i]));
	        }
	      } else if (v || typeof v === 'string') {
	        v = trimSlashes(v);
	        if (segments[segments.length -1] === '') {
	          // empty trailing elements have to be overwritten
	          // to prevent results such as /foo//bar
	          segments[segments.length -1] = v;
	        } else {
	          segments.push(v);
	        }
	      }
	    } else {
	      if (v) {
	        segments[segment] = trimSlashes(v);
	      } else {
	        segments.splice(segment, 1);
	      }
	    }

	    if (absolute) {
	      segments.unshift('');
	    }

	    return this.path(segments.join(separator), build);
	  };
	  p.segmentCoded = function(segment, v, build) {
	    var segments, i, l;

	    if (typeof segment !== 'number') {
	      build = v;
	      v = segment;
	      segment = undefined;
	    }

	    if (v === undefined) {
	      segments = this.segment(segment, v, build);
	      if (!isArray(segments)) {
	        segments = segments !== undefined ? URI.decode(segments) : undefined;
	      } else {
	        for (i = 0, l = segments.length; i < l; i++) {
	          segments[i] = URI.decode(segments[i]);
	        }
	      }

	      return segments;
	    }

	    if (!isArray(v)) {
	      v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
	    } else {
	      for (i = 0, l = v.length; i < l; i++) {
	        v[i] = URI.encode(v[i]);
	      }
	    }

	    return this.segment(segment, v, build);
	  };

	  // mutating query string
	  var q = p.query;
	  p.query = function(v, build) {
	    if (v === true) {
	      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
	    } else if (typeof v === 'function') {
	      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
	      var result = v.call(this, data);
	      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
	      this.build(!build);
	      return this;
	    } else if (v !== undefined && typeof v !== 'string') {
	      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
	      this.build(!build);
	      return this;
	    } else {
	      return q.call(this, v, build);
	    }
	  };
	  p.setQuery = function(name, value, build) {
	    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

	    if (typeof name === 'string' || name instanceof String) {
	      data[name] = value !== undefined ? value : null;
	    } else if (typeof name === 'object') {
	      for (var key in name) {
	        if (hasOwn.call(name, key)) {
	          data[key] = name[key];
	        }
	      }
	    } else {
	      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
	    }

	    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
	    if (typeof name !== 'string') {
	      build = value;
	    }

	    this.build(!build);
	    return this;
	  };
	  p.addQuery = function(name, value, build) {
	    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
	    URI.addQuery(data, name, value === undefined ? null : value);
	    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
	    if (typeof name !== 'string') {
	      build = value;
	    }

	    this.build(!build);
	    return this;
	  };
	  p.removeQuery = function(name, value, build) {
	    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
	    URI.removeQuery(data, name, value);
	    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
	    if (typeof name !== 'string') {
	      build = value;
	    }

	    this.build(!build);
	    return this;
	  };
	  p.hasQuery = function(name, value, withinArray) {
	    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
	    return URI.hasQuery(data, name, value, withinArray);
	  };
	  p.setSearch = p.setQuery;
	  p.addSearch = p.addQuery;
	  p.removeSearch = p.removeQuery;
	  p.hasSearch = p.hasQuery;

	  // sanitizing URLs
	  p.normalize = function() {
	    if (this._parts.urn) {
	      return this
	        .normalizeProtocol(false)
	        .normalizePath(false)
	        .normalizeQuery(false)
	        .normalizeFragment(false)
	        .build();
	    }

	    return this
	      .normalizeProtocol(false)
	      .normalizeHostname(false)
	      .normalizePort(false)
	      .normalizePath(false)
	      .normalizeQuery(false)
	      .normalizeFragment(false)
	      .build();
	  };
	  p.normalizeProtocol = function(build) {
	    if (typeof this._parts.protocol === 'string') {
	      this._parts.protocol = this._parts.protocol.toLowerCase();
	      this.build(!build);
	    }

	    return this;
	  };
	  p.normalizeHostname = function(build) {
	    if (this._parts.hostname) {
	      if (this.is('IDN') && punycode$$1) {
	        this._parts.hostname = punycode$$1.toASCII(this._parts.hostname);
	      } else if (this.is('IPv6') && IPv6$$1) {
	        this._parts.hostname = IPv6$$1.best(this._parts.hostname);
	      }

	      this._parts.hostname = this._parts.hostname.toLowerCase();
	      this.build(!build);
	    }

	    return this;
	  };
	  p.normalizePort = function(build) {
	    // remove port of it's the protocol's default
	    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
	      this._parts.port = null;
	      this.build(!build);
	    }

	    return this;
	  };
	  p.normalizePath = function(build) {
	    var _path = this._parts.path;
	    if (!_path) {
	      return this;
	    }

	    if (this._parts.urn) {
	      this._parts.path = URI.recodeUrnPath(this._parts.path);
	      this.build(!build);
	      return this;
	    }

	    if (this._parts.path === '/') {
	      return this;
	    }

	    _path = URI.recodePath(_path);

	    var _was_relative;
	    var _leadingParents = '';
	    var _parent, _pos;

	    // handle relative paths
	    if (_path.charAt(0) !== '/') {
	      _was_relative = true;
	      _path = '/' + _path;
	    }

	    // handle relative files (as opposed to directories)
	    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
	      _path += '/';
	    }

	    // resolve simples
	    _path = _path
	      .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
	      .replace(/\/{2,}/g, '/');

	    // remember leading parents
	    if (_was_relative) {
	      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
	      if (_leadingParents) {
	        _leadingParents = _leadingParents[0];
	      }
	    }

	    // resolve parents
	    while (true) {
	      _parent = _path.search(/\/\.\.(\/|$)/);
	      if (_parent === -1) {
	        // no more ../ to resolve
	        break;
	      } else if (_parent === 0) {
	        // top level cannot be relative, skip it
	        _path = _path.substring(3);
	        continue;
	      }

	      _pos = _path.substring(0, _parent).lastIndexOf('/');
	      if (_pos === -1) {
	        _pos = _parent;
	      }
	      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
	    }

	    // revert to relative
	    if (_was_relative && this.is('relative')) {
	      _path = _leadingParents + _path.substring(1);
	    }

	    this._parts.path = _path;
	    this.build(!build);
	    return this;
	  };
	  p.normalizePathname = p.normalizePath;
	  p.normalizeQuery = function(build) {
	    if (typeof this._parts.query === 'string') {
	      if (!this._parts.query.length) {
	        this._parts.query = null;
	      } else {
	        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
	      }

	      this.build(!build);
	    }

	    return this;
	  };
	  p.normalizeFragment = function(build) {
	    if (!this._parts.fragment) {
	      this._parts.fragment = null;
	      this.build(!build);
	    }

	    return this;
	  };
	  p.normalizeSearch = p.normalizeQuery;
	  p.normalizeHash = p.normalizeFragment;

	  p.iso8859 = function() {
	    // expect unicode input, iso8859 output
	    var e = URI.encode;
	    var d = URI.decode;

	    URI.encode = escape;
	    URI.decode = decodeURIComponent;
	    try {
	      this.normalize();
	    } finally {
	      URI.encode = e;
	      URI.decode = d;
	    }
	    return this;
	  };

	  p.unicode = function() {
	    // expect iso8859 input, unicode output
	    var e = URI.encode;
	    var d = URI.decode;

	    URI.encode = strictEncodeURIComponent;
	    URI.decode = unescape;
	    try {
	      this.normalize();
	    } finally {
	      URI.encode = e;
	      URI.decode = d;
	    }
	    return this;
	  };

	  p.readable = function() {
	    var uri = this.clone();
	    // removing username, password, because they shouldn't be displayed according to RFC 3986
	    uri.username('').password('').normalize();
	    var t = '';
	    if (uri._parts.protocol) {
	      t += uri._parts.protocol + '://';
	    }

	    if (uri._parts.hostname) {
	      if (uri.is('punycode') && punycode$$1) {
	        t += punycode$$1.toUnicode(uri._parts.hostname);
	        if (uri._parts.port) {
	          t += ':' + uri._parts.port;
	        }
	      } else {
	        t += uri.host();
	      }
	    }

	    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
	      t += '/';
	    }

	    t += uri.path(true);
	    if (uri._parts.query) {
	      var q = '';
	      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
	        var kv = (qp[i] || '').split('=');
	        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
	          .replace(/&/g, '%26');

	        if (kv[1] !== undefined) {
	          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
	            .replace(/&/g, '%26');
	        }
	      }
	      t += '?' + q.substring(1);
	    }

	    t += URI.decodeQuery(uri.hash(), true);
	    return t;
	  };

	  // resolving relative and absolute URLs
	  p.absoluteTo = function(base) {
	    var resolved = this.clone();
	    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
	    var basedir, i, p;

	    if (this._parts.urn) {
	      throw new Error('URNs do not have any generally defined hierarchical components');
	    }

	    if (!(base instanceof URI)) {
	      base = new URI(base);
	    }

	    if (resolved._parts.protocol) {
	      // Directly returns even if this._parts.hostname is empty.
	      return resolved;
	    } else {
	      resolved._parts.protocol = base._parts.protocol;
	    }

	    if (this._parts.hostname) {
	      return resolved;
	    }

	    for (i = 0; (p = properties[i]); i++) {
	      resolved._parts[p] = base._parts[p];
	    }

	    if (!resolved._parts.path) {
	      resolved._parts.path = base._parts.path;
	      if (!resolved._parts.query) {
	        resolved._parts.query = base._parts.query;
	      }
	    } else {
	      if (resolved._parts.path.substring(-2) === '..') {
	        resolved._parts.path += '/';
	      }

	      if (resolved.path().charAt(0) !== '/') {
	        basedir = base.directory();
	        basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
	        resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
	        resolved.normalizePath();
	      }
	    }

	    resolved.build();
	    return resolved;
	  };
	  p.relativeTo = function(base) {
	    var relative = this.clone().normalize();
	    var relativeParts, baseParts, common, relativePath, basePath;

	    if (relative._parts.urn) {
	      throw new Error('URNs do not have any generally defined hierarchical components');
	    }

	    base = new URI(base).normalize();
	    relativeParts = relative._parts;
	    baseParts = base._parts;
	    relativePath = relative.path();
	    basePath = base.path();

	    if (relativePath.charAt(0) !== '/') {
	      throw new Error('URI is already relative');
	    }

	    if (basePath.charAt(0) !== '/') {
	      throw new Error('Cannot calculate a URI relative to another relative URI');
	    }

	    if (relativeParts.protocol === baseParts.protocol) {
	      relativeParts.protocol = null;
	    }

	    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
	      return relative.build();
	    }

	    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
	      return relative.build();
	    }

	    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
	      relativeParts.hostname = null;
	      relativeParts.port = null;
	    } else {
	      return relative.build();
	    }

	    if (relativePath === basePath) {
	      relativeParts.path = '';
	      return relative.build();
	    }

	    // determine common sub path
	    common = URI.commonPath(relativePath, basePath);

	    // If the paths have nothing in common, return a relative URL with the absolute path.
	    if (!common) {
	      return relative.build();
	    }

	    var parents = baseParts.path
	      .substring(common.length)
	      .replace(/[^\/]*$/, '')
	      .replace(/.*?\//g, '../');

	    relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

	    return relative.build();
	  };

	  // comparing URIs
	  p.equals = function(uri) {
	    var one = this.clone();
	    var two = new URI(uri);
	    var one_map = {};
	    var two_map = {};
	    var checked = {};
	    var one_query, two_query, key;

	    one.normalize();
	    two.normalize();

	    // exact match
	    if (one.toString() === two.toString()) {
	      return true;
	    }

	    // extract query string
	    one_query = one.query();
	    two_query = two.query();
	    one.query('');
	    two.query('');

	    // definitely not equal if not even non-query parts match
	    if (one.toString() !== two.toString()) {
	      return false;
	    }

	    // query parameters have the same length, even if they're permuted
	    if (one_query.length !== two_query.length) {
	      return false;
	    }

	    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
	    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

	    for (key in one_map) {
	      if (hasOwn.call(one_map, key)) {
	        if (!isArray(one_map[key])) {
	          if (one_map[key] !== two_map[key]) {
	            return false;
	          }
	        } else if (!arraysEqual(one_map[key], two_map[key])) {
	          return false;
	        }

	        checked[key] = true;
	      }
	    }

	    for (key in two_map) {
	      if (hasOwn.call(two_map, key)) {
	        if (!checked[key]) {
	          // two contains a parameter not present in one
	          return false;
	        }
	      }
	    }

	    return true;
	  };

	  // state
	  p.preventInvalidHostname = function(v) {
	    this._parts.preventInvalidHostname = !!v;
	    return this;
	  };

	  p.duplicateQueryParameters = function(v) {
	    this._parts.duplicateQueryParameters = !!v;
	    return this;
	  };

	  p.escapeQuerySpace = function(v) {
	    this._parts.escapeQuerySpace = !!v;
	    return this;
	  };

	  return URI;
	}));
	});

	// Copyright Joyent, Inc. and other Node contributors.

	var R = typeof Reflect === 'object' ? Reflect : null;
	var ReflectApply = R && typeof R.apply === 'function'
	  ? R.apply
	  : function ReflectApply(target, receiver, args) {
	    return Function.prototype.apply.call(target, receiver, args);
	  };

	var ReflectOwnKeys;
	if (R && typeof R.ownKeys === 'function') {
	  ReflectOwnKeys = R.ownKeys;
	} else if (Object.getOwnPropertySymbols) {
	  ReflectOwnKeys = function ReflectOwnKeys(target) {
	    return Object.getOwnPropertyNames(target)
	      .concat(Object.getOwnPropertySymbols(target));
	  };
	} else {
	  ReflectOwnKeys = function ReflectOwnKeys(target) {
	    return Object.getOwnPropertyNames(target);
	  };
	}

	function ProcessEmitWarning(warning) {
	  if (console && console.warn) console.warn(warning);
	}

	var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
	  return value !== value;
	};

	function EventEmitter() {
	  EventEmitter.init.call(this);
	}
	var events = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._eventsCount = 0;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	var defaultMaxListeners = 10;

	Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
	  enumerable: true,
	  get: function() {
	    return defaultMaxListeners;
	  },
	  set: function(arg) {
	    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
	      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
	    }
	    defaultMaxListeners = arg;
	  }
	});

	EventEmitter.init = function() {

	  if (this._events === undefined ||
	      this._events === Object.getPrototypeOf(this)._events) {
	    this._events = Object.create(null);
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
	    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
	  }
	  this._maxListeners = n;
	  return this;
	};

	function $getMaxListeners(that) {
	  if (that._maxListeners === undefined)
	    return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return $getMaxListeners(this);
	};

	EventEmitter.prototype.emit = function emit(type) {
	  var args = [];
	  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
	  var doError = (type === 'error');

	  var events = this._events;
	  if (events !== undefined)
	    doError = (doError && events.error === undefined);
	  else if (!doError)
	    return false;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    var er;
	    if (args.length > 0)
	      er = args[0];
	    if (er instanceof Error) {
	      // Note: The comments on the `throw` lines are intentional, they show
	      // up in Node's output if this results in an unhandled exception.
	      throw er; // Unhandled 'error' event
	    }
	    // At least give some kind of context to the user
	    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
	    err.context = er;
	    throw err; // Unhandled 'error' event
	  }

	  var handler = events[type];

	  if (handler === undefined)
	    return false;

	  if (typeof handler === 'function') {
	    ReflectApply(handler, this, args);
	  } else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      ReflectApply(listeners[i], this, args);
	  }

	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;

	  if (typeof listener !== 'function') {
	    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
	  }

	  events = target._events;
	  if (events === undefined) {
	    events = target._events = Object.create(null);
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener !== undefined) {
	      target.emit('newListener', type,
	                  listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object
	      events = target._events;
	    }
	    existing = events[type];
	  }

	  if (existing === undefined) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] =
	        prepend ? [listener, existing] : [existing, listener];
	      // If we've already got an array, just append.
	    } else if (prepend) {
	      existing.unshift(listener);
	    } else {
	      existing.push(listener);
	    }

	    // Check for listener leak
	    m = $getMaxListeners(target);
	    if (m > 0 && existing.length > m && !existing.warned) {
	      existing.warned = true;
	      // No error code for this since it is a Warning
	      // eslint-disable-next-line no-restricted-syntax
	      var w = new Error('Possible EventEmitter memory leak detected. ' +
	                          existing.length + ' ' + String(type) + ' listeners ' +
	                          'added. Use emitter.setMaxListeners() to ' +
	                          'increase limit');
	      w.name = 'MaxListenersExceededWarning';
	      w.emitter = target;
	      w.type = type;
	      w.count = existing.length;
	      ProcessEmitWarning(w);
	    }
	  }

	  return target;
	}

	EventEmitter.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.prependListener =
	    function prependListener(type, listener) {
	      return _addListener(this, type, listener, true);
	    };

	function onceWrapper() {
	  var args = [];
	  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
	  if (!this.fired) {
	    this.target.removeListener(this.type, this.wrapFn);
	    this.fired = true;
	    ReflectApply(this.listener, this.target, args);
	  }
	}

	function _onceWrap(target, type, listener) {
	  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
	  var wrapped = onceWrapper.bind(state);
	  wrapped.listener = listener;
	  state.wrapFn = wrapped;
	  return wrapped;
	}

	EventEmitter.prototype.once = function once(type, listener) {
	  if (typeof listener !== 'function') {
	    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
	  }
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter.prototype.prependOnceListener =
	    function prependOnceListener(type, listener) {
	      if (typeof listener !== 'function') {
	        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
	      }
	      this.prependListener(type, _onceWrap(this, type, listener));
	      return this;
	    };

	// Emits a 'removeListener' event if and only if the listener was removed.
	EventEmitter.prototype.removeListener =
	    function removeListener(type, listener) {
	      var list, events, position, i, originalListener;

	      if (typeof listener !== 'function') {
	        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
	      }

	      events = this._events;
	      if (events === undefined)
	        return this;

	      list = events[type];
	      if (list === undefined)
	        return this;

	      if (list === listener || list.listener === listener) {
	        if (--this._eventsCount === 0)
	          this._events = Object.create(null);
	        else {
	          delete events[type];
	          if (events.removeListener)
	            this.emit('removeListener', type, list.listener || listener);
	        }
	      } else if (typeof list !== 'function') {
	        position = -1;

	        for (i = list.length - 1; i >= 0; i--) {
	          if (list[i] === listener || list[i].listener === listener) {
	            originalListener = list[i].listener;
	            position = i;
	            break;
	          }
	        }

	        if (position < 0)
	          return this;

	        if (position === 0)
	          list.shift();
	        else {
	          spliceOne(list, position);
	        }

	        if (list.length === 1)
	          events[type] = list[0];

	        if (events.removeListener !== undefined)
	          this.emit('removeListener', type, originalListener || listener);
	      }

	      return this;
	    };

	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

	EventEmitter.prototype.removeAllListeners =
	    function removeAllListeners(type) {
	      var listeners, events, i;

	      events = this._events;
	      if (events === undefined)
	        return this;

	      // not listening for removeListener, no need to emit
	      if (events.removeListener === undefined) {
	        if (arguments.length === 0) {
	          this._events = Object.create(null);
	          this._eventsCount = 0;
	        } else if (events[type] !== undefined) {
	          if (--this._eventsCount === 0)
	            this._events = Object.create(null);
	          else
	            delete events[type];
	        }
	        return this;
	      }

	      // emit removeListener for all listeners on all events
	      if (arguments.length === 0) {
	        var keys = Object.keys(events);
	        var key;
	        for (i = 0; i < keys.length; ++i) {
	          key = keys[i];
	          if (key === 'removeListener') continue;
	          this.removeAllListeners(key);
	        }
	        this.removeAllListeners('removeListener');
	        this._events = Object.create(null);
	        this._eventsCount = 0;
	        return this;
	      }

	      listeners = events[type];

	      if (typeof listeners === 'function') {
	        this.removeListener(type, listeners);
	      } else if (listeners !== undefined) {
	        // LIFO order
	        for (i = listeners.length - 1; i >= 0; i--) {
	          this.removeListener(type, listeners[i]);
	        }
	      }

	      return this;
	    };

	function _listeners(target, type, unwrap) {
	  var events = target._events;

	  if (events === undefined)
	    return [];

	  var evlistener = events[type];
	  if (evlistener === undefined)
	    return [];

	  if (typeof evlistener === 'function')
	    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

	  return unwrap ?
	    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
	}

	EventEmitter.prototype.listeners = function listeners(type) {
	  return _listeners(this, type, true);
	};

	EventEmitter.prototype.rawListeners = function rawListeners(type) {
	  return _listeners(this, type, false);
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount.call(emitter, type);
	  }
	};

	EventEmitter.prototype.listenerCount = listenerCount;
	function listenerCount(type) {
	  var events = this._events;

	  if (events !== undefined) {
	    var evlistener = events[type];

	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener !== undefined) {
	      return evlistener.length;
	    }
	  }

	  return 0;
	}

	EventEmitter.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
	};

	function arrayClone(arr, n) {
	  var copy = new Array(n);
	  for (var i = 0; i < n; ++i)
	    copy[i] = arr[i];
	  return copy;
	}

	function spliceOne(list, index) {
	  for (; index + 1 < list.length; index++)
	    list[index] = list[index + 1];
	  list.pop();
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}

	const config = {
	  origin: 'https://blhx.danmu9.com',
	  apiHosts: ['game.granbluefantasy.jp', 'gbf.game.mbga.jp'],
	  hash: '',
	  userName: ''
	};

	const {
	  origin
	} = config;
	let ee = new events();
	let lecia;
	window.addEventListener('load', () => {
	  const iframe = document.createElement('iframe');
	  iframe.src = `${origin}/blhxfy/lecia.html`;
	  iframe.style.display = 'none';
	  document.body.appendChild(iframe);
	  lecia = iframe.contentWindow;
	});

	const insertCSS = hash => {
	  const link = document.createElement('link');
	  link.type = 'text/css';
	  link.rel = 'stylesheet';
	  link.href = `${origin}/blhxfy/data/static/style/BLHXFY.css?lecia=${hash}`;
	  document.head.appendChild(link);
	};

	const load = new Promise(rev => {
	  ee.once('loaded', rev);
	});

	const fetchData = async pathname => {
	  await load;
	  const url = pathname;
	  const flag = Math.random();
	  lecia.postMessage({
	    type: 'fetch',
	    url,
	    flag
	  }, origin);
	  return new Promise((rev, rej) => {
	    ee.once(`response${flag}`, function (data) {
	      if (data.error) {
	        rej(data.error);
	      } else {
	        rev(data.data);
	      }
	    });
	  });
	};

	const getHash = fetchData('/blhxfy/manifest.json').then(data => data.hash);
	getHash.then(hash => {
	  config.hash = hash;
	  insertCSS(hash);
	  return hash;
	});

	const fetchWithHash = async pathname => {
	  const hash = await getHash;
	  return fetchData(`${pathname}?lecia=${hash}`);
	};

	const receiveMessage = event => {
	  if (event.origin !== origin) return;

	  if (event.data && event.data.type) {
	    if (event.data.type === 'response') {
	      ee.emit(`response${event.data.flag}`, event.data);
	    } else if (event.data.type === 'loaded') {
	      ee.emit('loaded');
	    }
	  }
	};

	window.addEventListener("message", receiveMessage, false);

	var papaparse = createCommonjsModule(function (module, exports) {
	/*@license
		Papa Parse
		v4.6.0
		https://github.com/mholt/PapaParse
		License: MIT
	*/
	(function(root, factory)
	{
		/* globals define */
		{
			// Node. Does not work with strict CommonJS, but
			// only CommonJS-like environments that support module.exports,
			// like Node.
			module.exports = factory();
		}
	}(commonjsGlobal, function()
	{

		var global = (function() {
			// alternative method, similar to `Function('return this')()`
			// but without using `eval` (which is disabled when
			// using Content Security Policy).

			if (typeof self !== 'undefined') { return self; }
			if (typeof window !== 'undefined') { return window; }
			if (typeof global !== 'undefined') { return global; }

			// When running tests none of the above have been defined
			return {};
		})();


		var IS_WORKER = !global.document && !!global.postMessage,
			IS_PAPA_WORKER = IS_WORKER && /(\?|&)papaworker(=|&|$)/.test(global.location.search),
			LOADED_SYNC = false, AUTO_SCRIPT_PATH;
		var workers = {}, workerIdCounter = 0;

		var Papa = {};

		Papa.parse = CsvToJson;
		Papa.unparse = JsonToCsv;

		Papa.RECORD_SEP = String.fromCharCode(30);
		Papa.UNIT_SEP = String.fromCharCode(31);
		Papa.BYTE_ORDER_MARK = '\ufeff';
		Papa.BAD_DELIMITERS = ['\r', '\n', '"', Papa.BYTE_ORDER_MARK];
		Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
		Papa.SCRIPT_PATH = null;	// Must be set by your code if you use workers and this lib is loaded asynchronously
		Papa.NODE_STREAM_INPUT = 1;

		// Configurable chunk sizes for local and remote files, respectively
		Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
		Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
		Papa.DefaultDelimiter = ',';			// Used if not specified and detection fails

		// Exposed for testing and development only
		Papa.Parser = Parser;
		Papa.ParserHandle = ParserHandle;
		Papa.NetworkStreamer = NetworkStreamer;
		Papa.FileStreamer = FileStreamer;
		Papa.StringStreamer = StringStreamer;
		Papa.ReadableStreamStreamer = ReadableStreamStreamer;
		Papa.DuplexStreamStreamer = DuplexStreamStreamer;

		if (global.jQuery)
		{
			var $ = global.jQuery;
			$.fn.parse = function(options)
			{
				var config = options.config || {};
				var queue = [];

				this.each(function(idx)
				{
					var supported = $(this).prop('tagName').toUpperCase() === 'INPUT'
									&& $(this).attr('type').toLowerCase() === 'file'
									&& global.FileReader;

					if (!supported || !this.files || this.files.length === 0)
						return true;	// continue to next input element

					for (var i = 0; i < this.files.length; i++)
					{
						queue.push({
							file: this.files[i],
							inputElem: this,
							instanceConfig: $.extend({}, config)
						});
					}
				});

				parseNextFile();	// begin parsing
				return this;		// maintains chainability


				function parseNextFile()
				{
					if (queue.length === 0)
					{
						if (isFunction(options.complete))
							options.complete();
						return;
					}

					var f = queue[0];

					if (isFunction(options.before))
					{
						var returned = options.before(f.file, f.inputElem);

						if (typeof returned === 'object')
						{
							if (returned.action === 'abort')
							{
								error('AbortError', f.file, f.inputElem, returned.reason);
								return;	// Aborts all queued files immediately
							}
							else if (returned.action === 'skip')
							{
								fileComplete();	// parse the next file in the queue, if any
								return;
							}
							else if (typeof returned.config === 'object')
								f.instanceConfig = $.extend(f.instanceConfig, returned.config);
						}
						else if (returned === 'skip')
						{
							fileComplete();	// parse the next file in the queue, if any
							return;
						}
					}

					// Wrap up the user's complete callback, if any, so that ours also gets executed
					var userCompleteFunc = f.instanceConfig.complete;
					f.instanceConfig.complete = function(results)
					{
						if (isFunction(userCompleteFunc))
							userCompleteFunc(results, f.file, f.inputElem);
						fileComplete();
					};

					Papa.parse(f.file, f.instanceConfig);
				}

				function error(name, file, elem, reason)
				{
					if (isFunction(options.error))
						options.error({name: name}, file, elem, reason);
				}

				function fileComplete()
				{
					queue.splice(0, 1);
					parseNextFile();
				}
			};
		}


		if (IS_PAPA_WORKER)
		{
			global.onmessage = workerThreadReceivedMessage;
		}
		else if (Papa.WORKERS_SUPPORTED)
		{
			AUTO_SCRIPT_PATH = getScriptPath();

			// Check if the script was loaded synchronously
			if (!document.body)
			{
				// Body doesn't exist yet, must be synchronous
				LOADED_SYNC = true;
			}
			else
			{
				document.addEventListener('DOMContentLoaded', function() {
					LOADED_SYNC = true;
				}, true);
			}
		}




		function CsvToJson(_input, _config)
		{
			_config = _config || {};
			var dynamicTyping = _config.dynamicTyping || false;
			if (isFunction(dynamicTyping)) {
				_config.dynamicTypingFunction = dynamicTyping;
				// Will be filled on first row call
				dynamicTyping = {};
			}
			_config.dynamicTyping = dynamicTyping;

			_config.transform = isFunction(_config.transform) ? _config.transform : false;

			if (_config.worker && Papa.WORKERS_SUPPORTED)
			{
				var w = newWorker();

				w.userStep = _config.step;
				w.userChunk = _config.chunk;
				w.userComplete = _config.complete;
				w.userError = _config.error;

				_config.step = isFunction(_config.step);
				_config.chunk = isFunction(_config.chunk);
				_config.complete = isFunction(_config.complete);
				_config.error = isFunction(_config.error);
				delete _config.worker;	// prevent infinite loop

				w.postMessage({
					input: _input,
					config: _config,
					workerId: w.id
				});

				return;
			}

			var streamer = null;
			if (_input === Papa.NODE_STREAM_INPUT)
			{
				// create a node Duplex stream for use
				// with .pipe
				streamer = new DuplexStreamStreamer(_config);
				return streamer.getStream();
			}
			else if (typeof _input === 'string')
			{
				if (_config.download)
					streamer = new NetworkStreamer(_config);
				else
					streamer = new StringStreamer(_config);
			}
			else if (_input.readable === true && isFunction(_input.read) && isFunction(_input.on))
			{
				streamer = new ReadableStreamStreamer(_config);
			}
			else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
				streamer = new FileStreamer(_config);

			return streamer.stream(_input);
		}






		function JsonToCsv(_input, _config)
		{
			// Default configuration

			/** whether to surround every datum with quotes */
			var _quotes = false;

			/** whether to write headers */
			var _writeHeader = true;

			/** delimiting character(s) */
			var _delimiter = ',';

			/** newline character(s) */
			var _newline = '\r\n';

			/** quote character */
			var _quoteChar = '"';

			unpackConfig();

			var quoteCharRegex = new RegExp(_quoteChar, 'g');

			if (typeof _input === 'string')
				_input = JSON.parse(_input);

			if (_input instanceof Array)
			{
				if (!_input.length || _input[0] instanceof Array)
					return serialize(null, _input);
				else if (typeof _input[0] === 'object')
					return serialize(objectKeys(_input[0]), _input);
			}
			else if (typeof _input === 'object')
			{
				if (typeof _input.data === 'string')
					_input.data = JSON.parse(_input.data);

				if (_input.data instanceof Array)
				{
					if (!_input.fields)
						_input.fields =  _input.meta && _input.meta.fields;

					if (!_input.fields)
						_input.fields =  _input.data[0] instanceof Array
							? _input.fields
							: objectKeys(_input.data[0]);

					if (!(_input.data[0] instanceof Array) && typeof _input.data[0] !== 'object')
						_input.data = [_input.data];	// handles input like [1,2,3] or ['asdf']
				}

				return serialize(_input.fields || [], _input.data || []);
			}

			// Default (any valid paths should return before this)
			throw 'exception: Unable to serialize unrecognized input';


			function unpackConfig()
			{
				if (typeof _config !== 'object')
					return;

				if (typeof _config.delimiter === 'string'
	                && !Papa.BAD_DELIMITERS.filter(function(value) { return _config.delimiter.indexOf(value) !== -1; }).length)
				{
					_delimiter = _config.delimiter;
				}

				if (typeof _config.quotes === 'boolean'
					|| _config.quotes instanceof Array)
					_quotes = _config.quotes;

				if (typeof _config.newline === 'string')
					_newline = _config.newline;

				if (typeof _config.quoteChar === 'string')
					_quoteChar = _config.quoteChar;

				if (typeof _config.header === 'boolean')
					_writeHeader = _config.header;
			}


			/** Turns an object's keys into an array */
			function objectKeys(obj)
			{
				if (typeof obj !== 'object')
					return [];
				var keys = [];
				for (var key in obj)
					keys.push(key);
				return keys;
			}

			/** The double for loop that iterates the data and writes out a CSV string including header row */
			function serialize(fields, data)
			{
				var csv = '';

				if (typeof fields === 'string')
					fields = JSON.parse(fields);
				if (typeof data === 'string')
					data = JSON.parse(data);

				var hasHeader = fields instanceof Array && fields.length > 0;
				var dataKeyedByField = !(data[0] instanceof Array);

				// If there a header row, write it first
				if (hasHeader && _writeHeader)
				{
					for (var i = 0; i < fields.length; i++)
					{
						if (i > 0)
							csv += _delimiter;
						csv += safe(fields[i], i);
					}
					if (data.length > 0)
						csv += _newline;
				}

				// Then write out the data
				for (var row = 0; row < data.length; row++)
				{
					var maxCol = hasHeader ? fields.length : data[row].length;

					for (var col = 0; col < maxCol; col++)
					{
						if (col > 0)
							csv += _delimiter;
						var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
						csv += safe(data[row][colIdx], col);
					}

					if (row < data.length - 1)
						csv += _newline;
				}

				return csv;
			}

			/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
			function safe(str, col)
			{
				if (typeof str === 'undefined' || str === null)
					return '';

				if (str.constructor === Date)
					return JSON.stringify(str).slice(1, 25);

				str = str.toString().replace(quoteCharRegex, _quoteChar + _quoteChar);

				var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
								|| (_quotes instanceof Array && _quotes[col])
								|| hasAny(str, Papa.BAD_DELIMITERS)
								|| str.indexOf(_delimiter) > -1
								|| str.charAt(0) === ' '
								|| str.charAt(str.length - 1) === ' ';

				return needsQuotes ? _quoteChar + str + _quoteChar : str;
			}

			function hasAny(str, substrings)
			{
				for (var i = 0; i < substrings.length; i++)
					if (str.indexOf(substrings[i]) > -1)
						return true;
				return false;
			}
		}

		/** ChunkStreamer is the base prototype for various streamer implementations. */
		function ChunkStreamer(config)
		{
			this._handle = null;
			this._finished = false;
			this._completed = false;
			this._input = null;
			this._baseIndex = 0;
			this._partialLine = '';
			this._rowCount = 0;
			this._start = 0;
			this._nextChunk = null;
			this.isFirstChunk = true;
			this._completeResults = {
				data: [],
				errors: [],
				meta: {}
			};
			replaceConfig.call(this, config);

			this.parseChunk = function(chunk, isFakeChunk)
			{
				// First chunk pre-processing
				if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
				{
					var modifiedChunk = this._config.beforeFirstChunk(chunk);
					if (modifiedChunk !== undefined)
						chunk = modifiedChunk;
				}
				this.isFirstChunk = false;

				// Rejoin the line we likely just split in two by chunking the file
				var aggregate = this._partialLine + chunk;
				this._partialLine = '';

				var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);

				if (this._handle.paused() || this._handle.aborted())
					return;

				var lastIndex = results.meta.cursor;

				if (!this._finished)
				{
					this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
					this._baseIndex = lastIndex;
				}

				if (results && results.data)
					this._rowCount += results.data.length;

				var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

				if (IS_PAPA_WORKER)
				{
					global.postMessage({
						results: results,
						workerId: Papa.WORKER_ID,
						finished: finishedIncludingPreview
					});
				}
				else if (isFunction(this._config.chunk) && !isFakeChunk)
				{
					this._config.chunk(results, this._handle);
					if (this._handle.paused() || this._handle.aborted())
						return;
					results = undefined;
					this._completeResults = undefined;
				}

				if (!this._config.step && !this._config.chunk) {
					this._completeResults.data = this._completeResults.data.concat(results.data);
					this._completeResults.errors = this._completeResults.errors.concat(results.errors);
					this._completeResults.meta = results.meta;
				}

				if (!this._completed && finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted)) {
					this._config.complete(this._completeResults, this._input);
					this._completed = true;
				}

				if (!finishedIncludingPreview && (!results || !results.meta.paused))
					this._nextChunk();

				return results;
			};

			this._sendError = function(error)
			{
				if (isFunction(this._config.error))
					this._config.error(error);
				else if (IS_PAPA_WORKER && this._config.error)
				{
					global.postMessage({
						workerId: Papa.WORKER_ID,
						error: error,
						finished: false
					});
				}
			};

			function replaceConfig(config)
			{
				// Deep-copy the config so we can edit it
				var configCopy = copy(config);
				configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
				if (!config.step && !config.chunk)
					configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
				this._handle = new ParserHandle(configCopy);
				this._handle.streamer = this;
				this._config = configCopy;	// persist the copy to the caller
			}
		}


		function NetworkStreamer(config)
		{
			config = config || {};
			if (!config.chunkSize)
				config.chunkSize = Papa.RemoteChunkSize;
			ChunkStreamer.call(this, config);

			var xhr;

			if (IS_WORKER)
			{
				this._nextChunk = function()
				{
					this._readChunk();
					this._chunkLoaded();
				};
			}
			else
			{
				this._nextChunk = function()
				{
					this._readChunk();
				};
			}

			this.stream = function(url)
			{
				this._input = url;
				this._nextChunk();	// Starts streaming
			};

			this._readChunk = function()
			{
				if (this._finished)
				{
					this._chunkLoaded();
					return;
				}

				xhr = new XMLHttpRequest();

				if (this._config.withCredentials)
				{
					xhr.withCredentials = this._config.withCredentials;
				}

				if (!IS_WORKER)
				{
					xhr.onload = bindFunction(this._chunkLoaded, this);
					xhr.onerror = bindFunction(this._chunkError, this);
				}

				xhr.open('GET', this._input, !IS_WORKER);
				// Headers can only be set when once the request state is OPENED
				if (this._config.downloadRequestHeaders)
				{
					var headers = this._config.downloadRequestHeaders;

					for (var headerName in headers)
					{
						xhr.setRequestHeader(headerName, headers[headerName]);
					}
				}

				if (this._config.chunkSize)
				{
					var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
					xhr.setRequestHeader('Range', 'bytes=' + this._start + '-' + end);
					xhr.setRequestHeader('If-None-Match', 'webkit-no-cache'); // https://bugs.webkit.org/show_bug.cgi?id=82672
				}

				try {
					xhr.send();
				}
				catch (err) {
					this._chunkError(err.message);
				}

				if (IS_WORKER && xhr.status === 0)
					this._chunkError();
				else
					this._start += this._config.chunkSize;
			};

			this._chunkLoaded = function()
			{
				if (xhr.readyState !== 4)
					return;

				if (xhr.status < 200 || xhr.status >= 400)
				{
					this._chunkError();
					return;
				}

				this._finished = !this._config.chunkSize || this._start > getFileSize(xhr);
				this.parseChunk(xhr.responseText);
			};

			this._chunkError = function(errorMessage)
			{
				var errorText = xhr.statusText || errorMessage;
				this._sendError(new Error(errorText));
			};

			function getFileSize(xhr)
			{
				var contentRange = xhr.getResponseHeader('Content-Range');
				if (contentRange === null) { // no content range, then finish!
					return -1;
				}
				return parseInt(contentRange.substr(contentRange.lastIndexOf('/') + 1));
			}
		}
		NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
		NetworkStreamer.prototype.constructor = NetworkStreamer;


		function FileStreamer(config)
		{
			config = config || {};
			if (!config.chunkSize)
				config.chunkSize = Papa.LocalChunkSize;
			ChunkStreamer.call(this, config);

			var reader, slice;

			// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
			// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
			var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105

			this.stream = function(file)
			{
				this._input = file;
				slice = file.slice || file.webkitSlice || file.mozSlice;

				if (usingAsyncReader)
				{
					reader = new FileReader();		// Preferred method of reading files, even in workers
					reader.onload = bindFunction(this._chunkLoaded, this);
					reader.onerror = bindFunction(this._chunkError, this);
				}
				else
					reader = new FileReaderSync();	// Hack for running in a web worker in Firefox

				this._nextChunk();	// Starts streaming
			};

			this._nextChunk = function()
			{
				if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
					this._readChunk();
			};

			this._readChunk = function()
			{
				var input = this._input;
				if (this._config.chunkSize)
				{
					var end = Math.min(this._start + this._config.chunkSize, this._input.size);
					input = slice.call(input, this._start, end);
				}
				var txt = reader.readAsText(input, this._config.encoding);
				if (!usingAsyncReader)
					this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
			};

			this._chunkLoaded = function(event)
			{
				// Very important to increment start each time before handling results
				this._start += this._config.chunkSize;
				this._finished = !this._config.chunkSize || this._start >= this._input.size;
				this.parseChunk(event.target.result);
			};

			this._chunkError = function()
			{
				this._sendError(reader.error);
			};

		}
		FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
		FileStreamer.prototype.constructor = FileStreamer;


		function StringStreamer(config)
		{
			config = config || {};
			ChunkStreamer.call(this, config);

			var remaining;
			this.stream = function(s)
			{
				remaining = s;
				return this._nextChunk();
			};
			this._nextChunk = function()
			{
				if (this._finished) return;
				var size = this._config.chunkSize;
				var chunk = size ? remaining.substr(0, size) : remaining;
				remaining = size ? remaining.substr(size) : '';
				this._finished = !remaining;
				return this.parseChunk(chunk);
			};
		}
		StringStreamer.prototype = Object.create(StringStreamer.prototype);
		StringStreamer.prototype.constructor = StringStreamer;


		function ReadableStreamStreamer(config)
		{
			config = config || {};

			ChunkStreamer.call(this, config);

			var queue = [];
			var parseOnData = true;
			var streamHasEnded = false;

			this.pause = function()
			{
				ChunkStreamer.prototype.pause.apply(this, arguments);
				this._input.pause();
			};

			this.resume = function()
			{
				ChunkStreamer.prototype.resume.apply(this, arguments);
				this._input.resume();
			};

			this.stream = function(stream)
			{
				this._input = stream;

				this._input.on('data', this._streamData);
				this._input.on('end', this._streamEnd);
				this._input.on('error', this._streamError);
			};

			this._checkIsFinished = function()
			{
				if (streamHasEnded && queue.length === 1) {
					this._finished = true;
				}
			};

			this._nextChunk = function()
			{
				this._checkIsFinished();
				if (queue.length)
				{
					this.parseChunk(queue.shift());
				}
				else
				{
					parseOnData = true;
				}
			};

			this._streamData = bindFunction(function(chunk)
			{
				try
				{
					queue.push(typeof chunk === 'string' ? chunk : chunk.toString(this._config.encoding));

					if (parseOnData)
					{
						parseOnData = false;
						this._checkIsFinished();
						this.parseChunk(queue.shift());
					}
				}
				catch (error)
				{
					this._streamError(error);
				}
			}, this);

			this._streamError = bindFunction(function(error)
			{
				this._streamCleanUp();
				this._sendError(error);
			}, this);

			this._streamEnd = bindFunction(function()
			{
				this._streamCleanUp();
				streamHasEnded = true;
				this._streamData('');
			}, this);

			this._streamCleanUp = bindFunction(function()
			{
				this._input.removeListener('data', this._streamData);
				this._input.removeListener('end', this._streamEnd);
				this._input.removeListener('error', this._streamError);
			}, this);
		}
		ReadableStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
		ReadableStreamStreamer.prototype.constructor = ReadableStreamStreamer;


		function DuplexStreamStreamer(_config) {
			var Duplex = require('stream').Duplex;
			var config = copy(_config);
			var parseOnWrite = true;
			var writeStreamHasFinished = false;
			var parseCallbackQueue = [];
			var stream = null;

			this._onCsvData = function(results)
			{
				var data = results.data;
				for (var i = 0; i < data.length; i++) {
					if (!stream.push(data[i]) && !this._handle.paused()) {
						// the writeable consumer buffer has filled up
						// so we need to pause until more items
						// can be processed
						this._handle.pause();
					}
				}
			};

			this._onCsvComplete = function()
			{
				// node will finish the read stream when
				// null is pushed
				stream.push(null);
			};

			config.step = bindFunction(this._onCsvData, this);
			config.complete = bindFunction(this._onCsvComplete, this);
			ChunkStreamer.call(this, config);

			this._nextChunk = function()
			{
				if (writeStreamHasFinished && parseCallbackQueue.length === 1) {
					this._finished = true;
				}
				if (parseCallbackQueue.length) {
					parseCallbackQueue.shift()();
				} else {
					parseOnWrite = true;
				}
			};

			this._addToParseQueue = function(chunk, callback)
			{
				// add to queue so that we can indicate
				// completion via callback
				// node will automatically pause the incoming stream
				// when too many items have been added without their
				// callback being invoked
				parseCallbackQueue.push(bindFunction(function() {
					this.parseChunk(typeof chunk === 'string' ? chunk : chunk.toString(config.encoding));
					if (isFunction(callback)) {
						return callback();
					}
				}, this));
				if (parseOnWrite) {
					parseOnWrite = false;
					this._nextChunk();
				}
			};

			this._onRead = function()
			{
				if (this._handle.paused()) {
					// the writeable consumer can handle more data
					// so resume the chunk parsing
					this._handle.resume();
				}
			};

			this._onWrite = function(chunk, encoding, callback)
			{
				this._addToParseQueue(chunk, callback);
			};

			this._onWriteComplete = function()
			{
				writeStreamHasFinished = true;
				// have to write empty string
				// so parser knows its done
				this._addToParseQueue('');
			};

			this.getStream = function()
			{
				return stream;
			};
			stream = new Duplex({
				readableObjectMode: true,
				decodeStrings: false,
				read: bindFunction(this._onRead, this),
				write: bindFunction(this._onWrite, this)
			});
			stream.once('finish', bindFunction(this._onWriteComplete, this));
		}
		DuplexStreamStreamer.prototype = Object.create(ChunkStreamer.prototype);
		DuplexStreamStreamer.prototype.constructor = DuplexStreamStreamer;


		// Use one ParserHandle per entire CSV file or string
		function ParserHandle(_config)
		{
			// One goal is to minimize the use of regular expressions...
			var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
			var ISO_DATE = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;

			var self = this;
			var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
			var _rowCounter = 0;	// Number of rows that have been parsed so far
			var _input;				// The input being parsed
			var _parser;			// The core parser being used
			var _paused = false;	// Whether we are paused or not
			var _aborted = false;	// Whether the parser has aborted or not
			var _delimiterError;	// Temporary state between delimiter detection and processing results
			var _fields = [];		// Fields are from the header row of the input, if there is one
			var _results = {		// The last results returned from the parser
				data: [],
				errors: [],
				meta: {}
			};

			if (isFunction(_config.step))
			{
				var userStep = _config.step;
				_config.step = function(results)
				{
					_results = results;

					if (needsHeaderRow())
						processResults();
					else	// only call user's step function after header row
					{
						processResults();

						// It's possbile that this line was empty and there's no row here after all
						if (_results.data.length === 0)
							return;

						_stepCounter += results.data.length;
						if (_config.preview && _stepCounter > _config.preview)
							_parser.abort();
						else
							userStep(_results, self);
					}
				};
			}

			/**
			 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
			 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
			 * when an input comes in multiple chunks, like from a file.
			 */
			this.parse = function(input, baseIndex, ignoreLastRow)
			{
				var quoteChar = _config.quoteChar || '"';
				if (!_config.newline)
					_config.newline = guessLineEndings(input, quoteChar);

				_delimiterError = false;
				if (!_config.delimiter)
				{
					var delimGuess = guessDelimiter(input, _config.newline, _config.skipEmptyLines, _config.comments);
					if (delimGuess.successful)
						_config.delimiter = delimGuess.bestDelimiter;
					else
					{
						_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
						_config.delimiter = Papa.DefaultDelimiter;
					}
					_results.meta.delimiter = _config.delimiter;
				}
				else if(isFunction(_config.delimiter))
				{
					_config.delimiter = _config.delimiter(input);
					_results.meta.delimiter = _config.delimiter;
				}

				var parserConfig = copy(_config);
				if (_config.preview && _config.header)
					parserConfig.preview++;	// to compensate for header row

				_input = input;
				_parser = new Parser(parserConfig);
				_results = _parser.parse(_input, baseIndex, ignoreLastRow);
				processResults();
				return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
			};

			this.paused = function()
			{
				return _paused;
			};

			this.pause = function()
			{
				_paused = true;
				_parser.abort();
				_input = _input.substr(_parser.getCharIndex());
			};

			this.resume = function()
			{
				_paused = false;
				self.streamer.parseChunk(_input, true);
			};

			this.aborted = function()
			{
				return _aborted;
			};

			this.abort = function()
			{
				_aborted = true;
				_parser.abort();
				_results.meta.aborted = true;
				if (isFunction(_config.complete))
					_config.complete(_results);
				_input = '';
			};

			function testEmptyLine(s) {
				return _config.skipEmptyLines === 'greedy' ? s.join('').trim() === '' : s.length === 1 && s[0].length === 0;
			}

			function processResults()
			{
				if (_results && _delimiterError)
				{
					addError('Delimiter', 'UndetectableDelimiter', 'Unable to auto-detect delimiting character; defaulted to \'' + Papa.DefaultDelimiter + '\'');
					_delimiterError = false;
				}

				if (_config.skipEmptyLines)
				{
					for (var i = 0; i < _results.data.length; i++)
						if (testEmptyLine(_results.data[i]))
							_results.data.splice(i--, 1);
				}

				if (needsHeaderRow())
					fillHeaderFields();

				return applyHeaderAndDynamicTypingAndTransformation();
			}

			function needsHeaderRow()
			{
				return _config.header && _fields.length === 0;
			}

			function fillHeaderFields()
			{
				if (!_results)
					return;
				for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
					for (var j = 0; j < _results.data[i].length; j++)
					{
						var header = _results.data[i][j];

						if (_config.trimHeaders) {
							header = header.trim();
						}

						_fields.push(header);
					}
				_results.data.splice(0, 1);
			}

			function shouldApplyDynamicTyping(field) {
				// Cache function values to avoid calling it for each row
				if (_config.dynamicTypingFunction && _config.dynamicTyping[field] === undefined) {
					_config.dynamicTyping[field] = _config.dynamicTypingFunction(field);
				}
				return (_config.dynamicTyping[field] || _config.dynamicTyping) === true;
			}

			function parseDynamic(field, value)
			{
				if (shouldApplyDynamicTyping(field))
				{
					if (value === 'true' || value === 'TRUE')
						return true;
					else if (value === 'false' || value === 'FALSE')
						return false;
					else if (FLOAT.test(value))
						return parseFloat(value);
					else if (ISO_DATE.test(value))
						return new Date(value);
					else
						return (value === '' ? null : value);
				}
				return value;
			}

			function applyHeaderAndDynamicTypingAndTransformation()
			{
				if (!_results || (!_config.header && !_config.dynamicTyping && !_config.transform))
					return _results;

				for (var i = 0; i < _results.data.length; i++)
				{
					var row = _config.header ? {} : [];

					var j;
					for (j = 0; j < _results.data[i].length; j++)
					{
						var field = j;
						var value = _results.data[i][j];

						if (_config.header)
							field = j >= _fields.length ? '__parsed_extra' : _fields[j];

						if (_config.transform)
							value = _config.transform(value,field);

						value = parseDynamic(field, value);

						if (field === '__parsed_extra')
						{
							row[field] = row[field] || [];
							row[field].push(value);
						}
						else
							row[field] = value;
					}

					_results.data[i] = row;

					if (_config.header)
					{
						if (j > _fields.length)
							addError('FieldMismatch', 'TooManyFields', 'Too many fields: expected ' + _fields.length + ' fields but parsed ' + j, _rowCounter + i);
						else if (j < _fields.length)
							addError('FieldMismatch', 'TooFewFields', 'Too few fields: expected ' + _fields.length + ' fields but parsed ' + j, _rowCounter + i);
					}
				}

				if (_config.header && _results.meta)
					_results.meta.fields = _fields;

				_rowCounter += _results.data.length;
				return _results;
			}

			function guessDelimiter(input, newline, skipEmptyLines, comments)
			{
				var delimChoices = [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];
				var bestDelim, bestDelta, fieldCountPrevRow;

				for (var i = 0; i < delimChoices.length; i++)
				{
					var delim = delimChoices[i];
					var delta = 0, avgFieldCount = 0, emptyLinesCount = 0;
					fieldCountPrevRow = undefined;

					var preview = new Parser({
						comments: comments,
						delimiter: delim,
						newline: newline,
						preview: 10
					}).parse(input);

					for (var j = 0; j < preview.data.length; j++)
					{
						if (skipEmptyLines && testEmptyLine(preview.data[j]))
						{
							emptyLinesCount++;
							continue;
						}
						var fieldCount = preview.data[j].length;
						avgFieldCount += fieldCount;

						if (typeof fieldCountPrevRow === 'undefined')
						{
							fieldCountPrevRow = fieldCount;
							continue;
						}
						else if (fieldCount > 1)
						{
							delta += Math.abs(fieldCount - fieldCountPrevRow);
							fieldCountPrevRow = fieldCount;
						}
					}

					if (preview.data.length > 0)
						avgFieldCount /= (preview.data.length - emptyLinesCount);

					if ((typeof bestDelta === 'undefined' || delta < bestDelta)
						&& avgFieldCount > 1.99)
					{
						bestDelta = delta;
						bestDelim = delim;
					}
				}

				_config.delimiter = bestDelim;

				return {
					successful: !!bestDelim,
					bestDelimiter: bestDelim
				};
			}

			function guessLineEndings(input, quoteChar)
			{
				input = input.substr(0, 1024 * 1024);	// max length 1 MB
				// Replace all the text inside quotes
				var re = new RegExp(escapeRegExp(quoteChar) + '([^]*?)' + escapeRegExp(quoteChar), 'gm');
				input = input.replace(re, '');

				var r = input.split('\r');

				var n = input.split('\n');

				var nAppearsFirst = (n.length > 1 && n[0].length < r[0].length);

				if (r.length === 1 || nAppearsFirst)
					return '\n';

				var numWithN = 0;
				for (var i = 0; i < r.length; i++)
				{
					if (r[i][0] === '\n')
						numWithN++;
				}

				return numWithN >= r.length / 2 ? '\r\n' : '\r';
			}

			function addError(type, code, msg, row)
			{
				_results.errors.push({
					type: type,
					code: code,
					message: msg,
					row: row
				});
			}
		}

		/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions */
		function escapeRegExp(string)
		{
			return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
		}

		/** The core parser implements speedy and correct CSV parsing */
		function Parser(config)
		{
			// Unpack the config object
			config = config || {};
			var delim = config.delimiter;
			var newline = config.newline;
			var comments = config.comments;
			var step = config.step;
			var preview = config.preview;
			var fastMode = config.fastMode;
			var quoteChar;
			/** Allows for no quoteChar by setting quoteChar to undefined in config */
			if (config.quoteChar === undefined) {
				quoteChar = '"';
			} else {
				quoteChar = config.quoteChar;
			}
			var escapeChar = quoteChar;
			if (config.escapeChar !== undefined) {
				escapeChar = config.escapeChar;
			}

			// Delimiter must be valid
			if (typeof delim !== 'string'
				|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
				delim = ',';

			// Comment character must be valid
			if (comments === delim)
				throw 'Comment character same as delimiter';
			else if (comments === true)
				comments = '#';
			else if (typeof comments !== 'string'
				|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
				comments = false;

			// Newline must be valid: \r, \n, or \r\n
			if (newline !== '\n' && newline !== '\r' && newline !== '\r\n')
				newline = '\n';

			// We're gonna need these at the Parser scope
			var cursor = 0;
			var aborted = false;

			this.parse = function(input, baseIndex, ignoreLastRow)
			{
				// For some reason, in Chrome, this speeds things up (!?)
				if (typeof input !== 'string')
					throw 'Input must be a string';

				// We don't need to compute some of these every time parse() is called,
				// but having them in a more local scope seems to perform better
				var inputLen = input.length,
					delimLen = delim.length,
					newlineLen = newline.length,
					commentsLen = comments.length;
				var stepIsFunction = isFunction(step);

				// Establish starting state
				cursor = 0;
				var data = [], errors = [], row = [], lastCursor = 0;

				if (!input)
					return returnable();

				if (fastMode || (fastMode !== false && input.indexOf(quoteChar) === -1))
				{
					var rows = input.split(newline);
					for (var i = 0; i < rows.length; i++)
					{
						row = rows[i];
						cursor += row.length;
						if (i !== rows.length - 1)
							cursor += newline.length;
						else if (ignoreLastRow)
							return returnable();
						if (comments && row.substr(0, commentsLen) === comments)
							continue;
						if (stepIsFunction)
						{
							data = [];
							pushRow(row.split(delim));
							doStep();
							if (aborted)
								return returnable();
						}
						else
							pushRow(row.split(delim));
						if (preview && i >= preview)
						{
							data = data.slice(0, preview);
							return returnable(true);
						}
					}
					return returnable();
				}

				var nextDelim = input.indexOf(delim, cursor);
				var nextNewline = input.indexOf(newline, cursor);
				var quoteCharRegex = new RegExp(escapeChar.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&') + quoteChar, 'g');
				var quoteSearch;

				// Parser loop
				for (;;)
				{
					// Field has opening quote
					if (input[cursor] === quoteChar)
					{
						// Start our search for the closing quote where the cursor is
						quoteSearch = cursor;

						// Skip the opening quote
						cursor++;

						for (;;)
						{
							// Find closing quote
							quoteSearch = input.indexOf(quoteChar, quoteSearch + 1);

							//No other quotes are found - no other delimiters
							if (quoteSearch === -1)
							{
								if (!ignoreLastRow) {
									// No closing quote... what a pity
									errors.push({
										type: 'Quotes',
										code: 'MissingQuotes',
										message: 'Quoted field unterminated',
										row: data.length,	// row has yet to be inserted
										index: cursor
									});
								}
								return finish();
							}

							// Closing quote at EOF
							if (quoteSearch === inputLen - 1)
							{
								var value = input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar);
								return finish(value);
							}

							// If this quote is escaped, it's part of the data; skip it
							// If the quote character is the escape character, then check if the next character is the escape character
							if (quoteChar === escapeChar &&  input[quoteSearch + 1] === escapeChar)
							{
								quoteSearch++;
								continue;
							}

							// If the quote character is not the escape character, then check if the previous character was the escape character
							if (quoteChar !== escapeChar && quoteSearch !== 0 && input[quoteSearch - 1] === escapeChar)
							{
								continue;
							}

							// Check up to nextDelim or nextNewline, whichever is closest
							var checkUpTo = nextNewline === -1 ? nextDelim : Math.min(nextDelim, nextNewline);
							var spacesBetweenQuoteAndDelimiter = extraSpaces(checkUpTo);

							// Closing quote followed by delimiter or 'unnecessary spaces + delimiter'
							if (input[quoteSearch + 1 + spacesBetweenQuoteAndDelimiter] === delim)
							{
								row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
								cursor = quoteSearch + 1 + spacesBetweenQuoteAndDelimiter + delimLen;
								nextDelim = input.indexOf(delim, cursor);
								nextNewline = input.indexOf(newline, cursor);
								break;
							}

							var spacesBetweenQuoteAndNewLine = extraSpaces(nextNewline);

							// Closing quote followed by newline or 'unnecessary spaces + newLine'
							if (input.substr(quoteSearch + 1 + spacesBetweenQuoteAndNewLine, newlineLen) === newline)
							{
								row.push(input.substring(cursor, quoteSearch).replace(quoteCharRegex, quoteChar));
								saveRow(quoteSearch + 1 + spacesBetweenQuoteAndNewLine + newlineLen);
								nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field

								if (stepIsFunction)
								{
									doStep();
									if (aborted)
										return returnable();
								}

								if (preview && data.length >= preview)
									return returnable(true);

								break;
							}


							// Checks for valid closing quotes are complete (escaped quotes or quote followed by EOF/delimiter/newline) -- assume these quotes are part of an invalid text string
							errors.push({
								type: 'Quotes',
								code: 'InvalidQuotes',
								message: 'Trailing quote on quoted field is malformed',
								row: data.length,	// row has yet to be inserted
								index: cursor
							});

							quoteSearch++;
							continue;

						}

						continue;
					}

					// Comment found at start of new line
					if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments)
					{
						if (nextNewline === -1)	// Comment ends at EOF
							return returnable();
						cursor = nextNewline + newlineLen;
						nextNewline = input.indexOf(newline, cursor);
						nextDelim = input.indexOf(delim, cursor);
						continue;
					}

					// Next delimiter comes before next newline, so we've reached end of field
					if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
					{
						row.push(input.substring(cursor, nextDelim));
						cursor = nextDelim + delimLen;
						nextDelim = input.indexOf(delim, cursor);
						continue;
					}

					// End of row
					if (nextNewline !== -1)
					{
						row.push(input.substring(cursor, nextNewline));
						saveRow(nextNewline + newlineLen);

						if (stepIsFunction)
						{
							doStep();
							if (aborted)
								return returnable();
						}

						if (preview && data.length >= preview)
							return returnable(true);

						continue;
					}

					break;
				}


				return finish();


				function pushRow(row)
				{
					data.push(row);
					lastCursor = cursor;
				}

				/**
	             * checks if there are extra spaces after closing quote and given index without any text
	             * if Yes, returns the number of spaces
	             */
				function extraSpaces(index) {
					var spaceLength = 0;
					if (index !== -1) {
						var textBetweenClosingQuoteAndIndex = input.substring(quoteSearch + 1, index);
						if (textBetweenClosingQuoteAndIndex && textBetweenClosingQuoteAndIndex.trim() === '') {
							spaceLength = textBetweenClosingQuoteAndIndex.length;
						}
					}
					return spaceLength;
				}

				/**
				 * Appends the remaining input from cursor to the end into
				 * row, saves the row, calls step, and returns the results.
				 */
				function finish(value)
				{
					if (ignoreLastRow)
						return returnable();
					if (typeof value === 'undefined')
						value = input.substr(cursor);
					row.push(value);
					cursor = inputLen;	// important in case parsing is paused
					pushRow(row);
					if (stepIsFunction)
						doStep();
					return returnable();
				}

				/**
				 * Appends the current row to the results. It sets the cursor
				 * to newCursor and finds the nextNewline. The caller should
				 * take care to execute user's step function and check for
				 * preview and end parsing if necessary.
				 */
				function saveRow(newCursor)
				{
					cursor = newCursor;
					pushRow(row);
					row = [];
					nextNewline = input.indexOf(newline, cursor);
				}

				/** Returns an object with the results, errors, and meta. */
				function returnable(stopped)
				{
					return {
						data: data,
						errors: errors,
						meta: {
							delimiter: delim,
							linebreak: newline,
							aborted: aborted,
							truncated: !!stopped,
							cursor: lastCursor + (baseIndex || 0)
						}
					};
				}

				/** Executes the user's step function and resets data & errors. */
				function doStep()
				{
					step(returnable());
					data = [];
					errors = [];
				}
			};

			/** Sets the abort flag */
			this.abort = function()
			{
				aborted = true;
			};

			/** Gets the cursor position */
			this.getCharIndex = function()
			{
				return cursor;
			};
		}


		// If you need to load Papa Parse asynchronously and you also need worker threads, hard-code
		// the script path here. See: https://github.com/mholt/PapaParse/issues/87#issuecomment-57885358
		function getScriptPath()
		{
			var scripts = document.getElementsByTagName('script');
			return scripts.length ? scripts[scripts.length - 1].src : '';
		}

		function newWorker()
		{
			if (!Papa.WORKERS_SUPPORTED)
				return false;
			if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
				throw new Error(
					'Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
					'You need to set Papa.SCRIPT_PATH manually.'
				);
			var workerUrl = Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH;
			// Append 'papaworker' to the search string to tell papaparse that this is our worker.
			workerUrl += (workerUrl.indexOf('?') !== -1 ? '&' : '?') + 'papaworker';
			var w = new global.Worker(workerUrl);
			w.onmessage = mainThreadReceivedMessage;
			w.id = workerIdCounter++;
			workers[w.id] = w;
			return w;
		}

		/** Callback when main thread receives a message */
		function mainThreadReceivedMessage(e)
		{
			var msg = e.data;
			var worker = workers[msg.workerId];
			var aborted = false;

			if (msg.error)
				worker.userError(msg.error, msg.file);
			else if (msg.results && msg.results.data)
			{
				var abort = function() {
					aborted = true;
					completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
				};

				var handle = {
					abort: abort,
					pause: notImplemented,
					resume: notImplemented
				};

				if (isFunction(worker.userStep))
				{
					for (var i = 0; i < msg.results.data.length; i++)
					{
						worker.userStep({
							data: [msg.results.data[i]],
							errors: msg.results.errors,
							meta: msg.results.meta
						}, handle);
						if (aborted)
							break;
					}
					delete msg.results;	// free memory ASAP
				}
				else if (isFunction(worker.userChunk))
				{
					worker.userChunk(msg.results, handle, msg.file);
					delete msg.results;
				}
			}

			if (msg.finished && !aborted)
				completeWorker(msg.workerId, msg.results);
		}

		function completeWorker(workerId, results) {
			var worker = workers[workerId];
			if (isFunction(worker.userComplete))
				worker.userComplete(results);
			worker.terminate();
			delete workers[workerId];
		}

		function notImplemented() {
			throw 'Not implemented.';
		}

		/** Callback when worker thread receives a message */
		function workerThreadReceivedMessage(e)
		{
			var msg = e.data;

			if (typeof Papa.WORKER_ID === 'undefined' && msg)
				Papa.WORKER_ID = msg.workerId;

			if (typeof msg.input === 'string')
			{
				global.postMessage({
					workerId: Papa.WORKER_ID,
					results: Papa.parse(msg.input, msg.config),
					finished: true
				});
			}
			else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
			{
				var results = Papa.parse(msg.input, msg.config);
				if (results)
					global.postMessage({
						workerId: Papa.WORKER_ID,
						results: results,
						finished: true
					});
			}
		}

		/** Makes a deep copy of an array or object (mostly) */
		function copy(obj)
		{
			if (typeof obj !== 'object' || obj === null)
				return obj;
			var cpy = obj instanceof Array ? [] : {};
			for (var key in obj)
				cpy[key] = copy(obj[key]);
			return cpy;
		}

		function bindFunction(f, self)
		{
			return function() { f.apply(self, arguments); };
		}

		function isFunction(func)
		{
			return typeof func === 'function';
		}

		return Papa;
	}));
	});

	const parseCsv = str => {
	  try {
	    return papaparse.parse(str.replace(/^\ufeff/, ''), {
	      header: true
	    }).data;
	  } catch (err) {
	    console.error(err);
	    return {};
	  }
	};

	const sortKeywords = (list, key = 'EMPTY') => {
	  return list.sort((prev, next) => {
	    let valPrev = prev;
	    let valNext = next;

	    if (key !== 'EMPTY') {
	      valPrev = prev[key];
	      valNext = next[key];
	    }

	    if (valNext && valPrev) {
	      if (valNext.length > valPrev.length) {
	        return 1;
	      } else if (valPrev.length > valNext.length) {
	        return -1;
	      }
	    }

	    return 0;
	  });
	};

	const enNameMap = new Map();
	const jpNameMap = new Map();
	let loaded = false;

	const nameWithScenario = (list, key = 'name') => {
	  const newList = [];
	  const keys = [];
	  list.forEach(item => {
	    const existIdx = keys.indexOf(item[key]);

	    if (existIdx !== -1) {
	      const obj = newList[existIdx];

	      if (item.scenario) {
	        obj[item.scenario] = item;
	        obj.scenarios.push(item.scenario);
	      } else {
	        obj.trans = item.trans;
	        obj.noun = !!item.noun;
	      }
	    } else {
	      const obj = {
	        [key]: item[key],
	        scenarios: []
	      };

	      if (item.scenario) {
	        obj[item.scenario] = item;
	        obj.scenarios.push(item.scenario);
	      } else {
	        obj.trans = item.trans;
	        obj.noun = !!item.noun;
	      }

	      newList.push(obj);
	      keys.push(item[key]);
	    }
	  });
	  return newList;
	};

	const getNameData = async () => {
	  if (!loaded) {
	    const nameEn = await fetchWithHash('/blhxfy/data/npc-name-en.csv');
	    const nameJp = await fetchWithHash('/blhxfy/data/npc-name-jp.csv');
	    const listEn = nameWithScenario(parseCsv(nameEn));
	    const listJp = nameWithScenario(parseCsv(nameJp));
	    sortKeywords(listEn, 'name').forEach(item => {
	      enNameMap.set(item.name, item);
	    });
	    sortKeywords(listJp, 'name').forEach(item => {
	      jpNameMap.set(item.name, item);
	    });
	    loaded = true;
	  }

	  return {
	    enNameMap,
	    jpNameMap
	  };
	};

	const html = `
<style>
#blhxfy-story-tool {
  display: none;
}
#blhxfy-story-input button,
#blhxfy-story-tool button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px 6px;
  font-size: 10px;
  margin: 0;
  letter-spacing: 1px;
  line-height: 1;
  outline: none;
  position: relative;
  transition: none;
  border-radius: 3px;
  background: #539cba;
  color: #fff;
  box-shadow: 0 3px #165c85;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5)
}

#blhxfy-story-input button:hover,
#blhxfy-story-tool button:hover {
  box-shadow: 0 2px #165c85;
  top: 1px;
}
#blhxfy-story-input button:active,
#blhxfy-story-tool button:active {
  box-shadow: 0 1px #165c85;
  top: 2px;
}
.log #blhxfy-story-tool {
  display: block;
  position: absolute;
  top: 33px;
  left: 0;
  width: 100%;
  z-index: 9999;
  text-align: center;
}
#blhxfy-story-input {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  width: 320px;
  height: 100%;
  background: #fff;
  z-index: 10000;
}
.blhxfy-preview-tool {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e3e3e3;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  background: #116d82;
}
#blhxfy-story-input p {
  margin: 10px 10px 0 10px;
  color: #5b8690;
  text-align: left;
  font-size: 10px;
  position: relative;
}
#blhxfy-story-input p a {
  color: #29b82d;
  position: absolute;
  cursor: pointer;
  padding: 4px;
  right: 0;
  top: -5px;
}
#blhxfy-story-input textarea {
  width: 300px;
  height: calc(100% - 80px);
  margin: 10px;
  box-sizing: border-box;
  font-size: 8px;
  padding: 4px;
  border-radius: 2px;
  box-shadow: inset 0 0 3px #2c88d775;
  outline: none;
  resize: none;
  font-family: Consolas, "Microsoft Yahei";
}
</style>
<div id="blhxfy-story-tool">
  <button onclick="window.blhxfy.dlStoryCsv()" title="下载未翻译的剧情文本">原文</button>
  <button onclick="window.blhxfy.dlStoryCsv('fill')" title="下载用原文填充trans列的剧情文本">填充</button>
  <button onclick="window.blhxfy.dlStoryCsv('trans')" title="下载带翻译的剧情文本">译文</button>
  <button onclick="window.blhxfy.previewCsv('show')" title="填写已翻译的剧情文本来预览">预览</button>
</div>
<div id="blhxfy-story-input">
  <div class="blhxfy-preview-tool">
    <button onclick="window.blhxfy.previewCsv('hide')">取消</button>
    <button onclick="window.blhxfy.previewCsv('save')" title="保存预览文本并刷新页面">保存</button>
  </div>
  <p>请将编辑好的剧情文本粘贴到文本框<a onclick="window.blhxfy.previewCsv('clear')" title="清除预览文本">清空</a></p>
  <textarea placeholder="id,en,jp,trans\n……,……,……,……\n……,……,……,……"></textarea>
</div>
`;
	function insertToolHtml () {
	  const cont = $('.cnt-quest-scene');
	  const tool = $('#blhxfy-story-tool');
	  if (tool[0]) return;

	  if (cont[0]) {
	    cont.prepend(html);
	  }
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	var _listCacheClear = listCacheClear;

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	var eq_1 = eq;

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq_1(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	var _assocIndexOf = assocIndexOf;

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = _assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	var _listCacheDelete = listCacheDelete;

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = _assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	var _listCacheGet = listCacheGet;

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return _assocIndexOf(this.__data__, key) > -1;
	}

	var _listCacheHas = listCacheHas;

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = _assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	var _listCacheSet = listCacheSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = _listCacheClear;
	ListCache.prototype['delete'] = _listCacheDelete;
	ListCache.prototype.get = _listCacheGet;
	ListCache.prototype.has = _listCacheHas;
	ListCache.prototype.set = _listCacheSet;

	var _ListCache = ListCache;

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new _ListCache;
	  this.size = 0;
	}

	var _stackClear = stackClear;

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	var _stackDelete = stackDelete;

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	var _stackGet = stackGet;

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	var _stackHas = stackHas;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	var _freeGlobal = freeGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = _freeGlobal || freeSelf || Function('return this')();

	var _root = root;

	/** Built-in value references. */
	var Symbol = _root.Symbol;

	var _Symbol = Symbol;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty$1.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	var _getRawTag = getRawTag;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$1.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString$1.call(value);
	}

	var _objectToString = objectToString;

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag$1 && symToStringTag$1 in Object(value))
	    ? _getRawTag(value)
	    : _objectToString(value);
	}

	var _baseGetTag = baseGetTag;

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject;

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject_1(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = _baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	var isFunction_1 = isFunction;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = _root['__core-js_shared__'];

	var _coreJsData = coreJsData;

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	var _isMasked = isMasked;

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	var _toSource = toSource;

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto$1 = Function.prototype,
	    objectProto$2 = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$1 = funcProto$1.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject_1(value) || _isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(_toSource(value));
	}

	var _baseIsNative = baseIsNative;

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	var _getValue = getValue;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = _getValue(object, key);
	  return _baseIsNative(value) ? value : undefined;
	}

	var _getNative = getNative;

	/* Built-in method references that are verified to be native. */
	var Map$1 = _getNative(_root, 'Map');

	var _Map = Map$1;

	/* Built-in method references that are verified to be native. */
	var nativeCreate = _getNative(Object, 'create');

	var _nativeCreate = nativeCreate;

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
	  this.size = 0;
	}

	var _hashClear = hashClear;

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _hashDelete = hashDelete;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto$3 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (_nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
	}

	var _hashGet = hashGet;

	/** Used for built-in method references. */
	var objectProto$4 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$4.call(data, key);
	}

	var _hashHas = hashHas;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
	  return this;
	}

	var _hashSet = hashSet;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = _hashClear;
	Hash.prototype['delete'] = _hashDelete;
	Hash.prototype.get = _hashGet;
	Hash.prototype.has = _hashHas;
	Hash.prototype.set = _hashSet;

	var _Hash = Hash;

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new _Hash,
	    'map': new (_Map || _ListCache),
	    'string': new _Hash
	  };
	}

	var _mapCacheClear = mapCacheClear;

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	var _isKeyable = isKeyable;

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return _isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	var _getMapData = getMapData;

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = _getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _mapCacheDelete = mapCacheDelete;

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return _getMapData(this, key).get(key);
	}

	var _mapCacheGet = mapCacheGet;

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return _getMapData(this, key).has(key);
	}

	var _mapCacheHas = mapCacheHas;

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = _getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	var _mapCacheSet = mapCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = _mapCacheClear;
	MapCache.prototype['delete'] = _mapCacheDelete;
	MapCache.prototype.get = _mapCacheGet;
	MapCache.prototype.has = _mapCacheHas;
	MapCache.prototype.set = _mapCacheSet;

	var _MapCache = MapCache;

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof _ListCache) {
	    var pairs = data.__data__;
	    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new _MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	var _stackSet = stackSet;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new _ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = _stackClear;
	Stack.prototype['delete'] = _stackDelete;
	Stack.prototype.get = _stackGet;
	Stack.prototype.has = _stackHas;
	Stack.prototype.set = _stackSet;

	var _Stack = Stack;

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	var _arrayEach = arrayEach;

	var defineProperty = (function() {
	  try {
	    var func = _getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	var _defineProperty = defineProperty;

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && _defineProperty) {
	    _defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	var _baseAssignValue = baseAssignValue;

	/** Used for built-in method references. */
	var objectProto$5 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$5 = objectProto$5.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty$5.call(object, key) && eq_1(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    _baseAssignValue(object, key, value);
	  }
	}

	var _assignValue = assignValue;

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      _baseAssignValue(object, key, newValue);
	    } else {
	      _assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	var _copyObject = copyObject;

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	var _baseTimes = baseTimes;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
	}

	var _baseIsArguments = baseIsArguments;

	/** Used for built-in method references. */
	var objectProto$6 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$6 = objectProto$6.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
	  return isObjectLike_1(value) && hasOwnProperty$6.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	var isArguments_1 = isArguments;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	var isArray_1 = isArray;

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	var stubFalse_1 = stubFalse;

	var isBuffer_1 = createCommonjsModule(function (module, exports) {
	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? _root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse_1;

	module.exports = isBuffer;
	});

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER : length;

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	var _isIndex = isIndex;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER$1 = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
	}

	var isLength_1 = isLength;

	/** `Object#toString` result references. */
	var argsTag$1 = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag$1 = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike_1(value) &&
	    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
	}

	var _baseIsTypedArray = baseIsTypedArray;

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	var _baseUnary = baseUnary;

	var _nodeUtil = createCommonjsModule(function (module, exports) {
	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && _freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule && freeModule.require && freeModule.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;
	});

	/* Node.js helper references. */
	var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

	var isTypedArray_1 = isTypedArray;

	/** Used for built-in method references. */
	var objectProto$7 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$7 = objectProto$7.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray_1(value),
	      isArg = !isArr && isArguments_1(value),
	      isBuff = !isArr && !isArg && isBuffer_1(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? _baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty$7.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           _isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _arrayLikeKeys = arrayLikeKeys;

	/** Used for built-in method references. */
	var objectProto$8 = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

	  return value === proto;
	}

	var _isPrototype = isPrototype;

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	var _overArg = overArg;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = _overArg(Object.keys, Object);

	var _nativeKeys = nativeKeys;

	/** Used for built-in method references. */
	var objectProto$9 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!_isPrototype(object)) {
	    return _nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty$8.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _baseKeys = baseKeys;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength_1(value.length) && !isFunction_1(value);
	}

	var isArrayLike_1 = isArrayLike;

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
	}

	var keys_1 = keys;

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && _copyObject(source, keys_1(source), object);
	}

	var _baseAssign = baseAssign;

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _nativeKeysIn = nativeKeysIn;

	/** Used for built-in method references. */
	var objectProto$a = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject_1(object)) {
	    return _nativeKeysIn(object);
	  }
	  var isProto = _isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty$9.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _baseKeysIn = baseKeysIn;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn$1(object) {
	  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
	}

	var keysIn_1 = keysIn$1;

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && _copyObject(source, keysIn_1(source), object);
	}

	var _baseAssignIn = baseAssignIn;

	var _cloneBuffer = createCommonjsModule(function (module, exports) {
	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? _root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;
	});

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	var _copyArray = copyArray;

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	var _arrayFilter = arrayFilter;

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	var stubArray_1 = stubArray;

	/** Used for built-in method references. */
	var objectProto$b = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable$1.call(object, symbol);
	  });
	};

	var _getSymbols = getSymbols;

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return _copyObject(source, _getSymbols(source), object);
	}

	var _copySymbols = copySymbols;

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	var _arrayPush = arrayPush;

	/** Built-in value references. */
	var getPrototype = _overArg(Object.getPrototypeOf, Object);

	var _getPrototype = getPrototype;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
	  var result = [];
	  while (object) {
	    _arrayPush(result, _getSymbols(object));
	    object = _getPrototype(object);
	  }
	  return result;
	};

	var _getSymbolsIn = getSymbolsIn;

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return _copyObject(source, _getSymbolsIn(source), object);
	}

	var _copySymbolsIn = copySymbolsIn;

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
	}

	var _baseGetAllKeys = baseGetAllKeys;

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return _baseGetAllKeys(object, keys_1, _getSymbols);
	}

	var _getAllKeys = getAllKeys;

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
	}

	var _getAllKeysIn = getAllKeysIn;

	/* Built-in method references that are verified to be native. */
	var DataView = _getNative(_root, 'DataView');

	var _DataView = DataView;

	/* Built-in method references that are verified to be native. */
	var Promise$1 = _getNative(_root, 'Promise');

	var _Promise = Promise$1;

	/* Built-in method references that are verified to be native. */
	var Set = _getNative(_root, 'Set');

	var _Set = Set;

	/* Built-in method references that are verified to be native. */
	var WeakMap$1 = _getNative(_root, 'WeakMap');

	var _WeakMap = WeakMap$1;

	/** `Object#toString` result references. */
	var mapTag$1 = '[object Map]',
	    objectTag$1 = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag$1 = '[object Set]',
	    weakMapTag$1 = '[object WeakMap]';

	var dataViewTag$1 = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = _toSource(_DataView),
	    mapCtorString = _toSource(_Map),
	    promiseCtorString = _toSource(_Promise),
	    setCtorString = _toSource(_Set),
	    weakMapCtorString = _toSource(_WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = _baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
	    (_Map && getTag(new _Map) != mapTag$1) ||
	    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
	    (_Set && getTag(new _Set) != setTag$1) ||
	    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
	  getTag = function(value) {
	    var result = _baseGetTag(value),
	        Ctor = result == objectTag$1 ? value.constructor : undefined,
	        ctorString = Ctor ? _toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag$1;
	        case mapCtorString: return mapTag$1;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag$1;
	        case weakMapCtorString: return weakMapTag$1;
	      }
	    }
	    return result;
	  };
	}

	var _getTag = getTag;

	/** Used for built-in method references. */
	var objectProto$c = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$a = objectProto$c.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty$a.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	var _initCloneArray = initCloneArray;

	/** Built-in value references. */
	var Uint8Array = _root.Uint8Array;

	var _Uint8Array = Uint8Array;

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
	  return result;
	}

	var _cloneArrayBuffer = cloneArrayBuffer;

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	var _cloneDataView = cloneDataView;

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	var _cloneRegExp = cloneRegExp;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	var _cloneSymbol = cloneSymbol;

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	var _cloneTypedArray = cloneTypedArray;

	/** `Object#toString` result references. */
	var boolTag$1 = '[object Boolean]',
	    dateTag$1 = '[object Date]',
	    mapTag$2 = '[object Map]',
	    numberTag$1 = '[object Number]',
	    regexpTag$1 = '[object RegExp]',
	    setTag$2 = '[object Set]',
	    stringTag$1 = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag$1 = '[object ArrayBuffer]',
	    dataViewTag$2 = '[object DataView]',
	    float32Tag$1 = '[object Float32Array]',
	    float64Tag$1 = '[object Float64Array]',
	    int8Tag$1 = '[object Int8Array]',
	    int16Tag$1 = '[object Int16Array]',
	    int32Tag$1 = '[object Int32Array]',
	    uint8Tag$1 = '[object Uint8Array]',
	    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
	    uint16Tag$1 = '[object Uint16Array]',
	    uint32Tag$1 = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag$1:
	      return _cloneArrayBuffer(object);

	    case boolTag$1:
	    case dateTag$1:
	      return new Ctor(+object);

	    case dataViewTag$2:
	      return _cloneDataView(object, isDeep);

	    case float32Tag$1: case float64Tag$1:
	    case int8Tag$1: case int16Tag$1: case int32Tag$1:
	    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
	      return _cloneTypedArray(object, isDeep);

	    case mapTag$2:
	      return new Ctor;

	    case numberTag$1:
	    case stringTag$1:
	      return new Ctor(object);

	    case regexpTag$1:
	      return _cloneRegExp(object);

	    case setTag$2:
	      return new Ctor;

	    case symbolTag:
	      return _cloneSymbol(object);
	  }
	}

	var _initCloneByTag = initCloneByTag;

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject_1(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	var _baseCreate = baseCreate;

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !_isPrototype(object))
	    ? _baseCreate(_getPrototype(object))
	    : {};
	}

	var _initCloneObject = initCloneObject;

	/** `Object#toString` result references. */
	var mapTag$3 = '[object Map]';

	/**
	 * The base implementation of `_.isMap` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 */
	function baseIsMap(value) {
	  return isObjectLike_1(value) && _getTag(value) == mapTag$3;
	}

	var _baseIsMap = baseIsMap;

	/* Node.js helper references. */
	var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

	/**
	 * Checks if `value` is classified as a `Map` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 * @example
	 *
	 * _.isMap(new Map);
	 * // => true
	 *
	 * _.isMap(new WeakMap);
	 * // => false
	 */
	var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

	var isMap_1 = isMap;

	/** `Object#toString` result references. */
	var setTag$3 = '[object Set]';

	/**
	 * The base implementation of `_.isSet` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 */
	function baseIsSet(value) {
	  return isObjectLike_1(value) && _getTag(value) == setTag$3;
	}

	var _baseIsSet = baseIsSet;

	/* Node.js helper references. */
	var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

	/**
	 * Checks if `value` is classified as a `Set` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 * @example
	 *
	 * _.isSet(new Set);
	 * // => true
	 *
	 * _.isSet(new WeakSet);
	 * // => false
	 */
	var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

	var isSet_1 = isSet;

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

	/** `Object#toString` result references. */
	var argsTag$2 = '[object Arguments]',
	    arrayTag$1 = '[object Array]',
	    boolTag$2 = '[object Boolean]',
	    dateTag$2 = '[object Date]',
	    errorTag$1 = '[object Error]',
	    funcTag$2 = '[object Function]',
	    genTag$1 = '[object GeneratorFunction]',
	    mapTag$4 = '[object Map]',
	    numberTag$2 = '[object Number]',
	    objectTag$2 = '[object Object]',
	    regexpTag$2 = '[object RegExp]',
	    setTag$4 = '[object Set]',
	    stringTag$2 = '[object String]',
	    symbolTag$1 = '[object Symbol]',
	    weakMapTag$2 = '[object WeakMap]';

	var arrayBufferTag$2 = '[object ArrayBuffer]',
	    dataViewTag$3 = '[object DataView]',
	    float32Tag$2 = '[object Float32Array]',
	    float64Tag$2 = '[object Float64Array]',
	    int8Tag$2 = '[object Int8Array]',
	    int16Tag$2 = '[object Int16Array]',
	    int32Tag$2 = '[object Int32Array]',
	    uint8Tag$2 = '[object Uint8Array]',
	    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
	    uint16Tag$2 = '[object Uint16Array]',
	    uint32Tag$2 = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag$2] = cloneableTags[arrayTag$1] =
	cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] =
	cloneableTags[boolTag$2] = cloneableTags[dateTag$2] =
	cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] =
	cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] =
	cloneableTags[int32Tag$2] = cloneableTags[mapTag$4] =
	cloneableTags[numberTag$2] = cloneableTags[objectTag$2] =
	cloneableTags[regexpTag$2] = cloneableTags[setTag$4] =
	cloneableTags[stringTag$2] = cloneableTags[symbolTag$1] =
	cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
	cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
	cloneableTags[errorTag$1] = cloneableTags[funcTag$2] =
	cloneableTags[weakMapTag$2] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG;

	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject_1(value)) {
	    return value;
	  }
	  var isArr = isArray_1(value);
	  if (isArr) {
	    result = _initCloneArray(value);
	    if (!isDeep) {
	      return _copyArray(value, result);
	    }
	  } else {
	    var tag = _getTag(value),
	        isFunc = tag == funcTag$2 || tag == genTag$1;

	    if (isBuffer_1(value)) {
	      return _cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag$2 || tag == argsTag$2 || (isFunc && !object)) {
	      result = (isFlat || isFunc) ? {} : _initCloneObject(value);
	      if (!isDeep) {
	        return isFlat
	          ? _copySymbolsIn(value, _baseAssignIn(result, value))
	          : _copySymbols(value, _baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = _initCloneByTag(value, tag, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new _Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (isSet_1(value)) {
	    value.forEach(function(subValue) {
	      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
	    });

	    return result;
	  }

	  if (isMap_1(value)) {
	    value.forEach(function(subValue, key) {
	      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
	    });

	    return result;
	  }

	  var keysFunc = isFull
	    ? (isFlat ? _getAllKeysIn : _getAllKeys)
	    : (isFlat ? keysIn : keys_1);

	  var props = isArr ? undefined : keysFunc(value);
	  _arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	var _baseClone = baseClone;

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG$1 = 1,
	    CLONE_SYMBOLS_FLAG$1 = 4;

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return _baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
	}

	var cloneDeep_1 = cloneDeep;

	const trim = str => {
	  if (!str) return '';
	  return str.trim();
	};

	var tryDownload = function (content, filename) {
	  const eleLink = document.createElement('a');
	  eleLink.download = filename;
	  eleLink.style.display = 'none';
	  const blob = new Blob([content], {
	    type: 'text/csv'
	  });
	  eleLink.href = URL.createObjectURL(blob);
	  document.body.appendChild(eleLink);
	  eleLink.click();
	  document.body.removeChild(eleLink);
	};

	const replaceWords = (str, map, lang = 'en') => {
	  if (!str) return str;
	  let _str = str;

	  for (let [key, val] of map) {
	    if (!key || key.length < 2) continue;
	    const expr = key.replace(/\?/g, '\\?').replace(/\./g, '\\.').replace(/\*/g, '\\*').replace(/\+/g, '\\+');
	    const reStr = lang === 'en' ? `\\b${expr}\\b` : `${expr}`;

	    if (typeof val === 'string') {
	      _str = _str.replace(new RegExp(reStr, 'g'), val);
	    } else if (val && val.trans && !val.noun) {
	      if (val.ignoreCase) {
	        _str = _str.replace(new RegExp(reStr, 'gi'), val.trans);
	      } else {
	        _str = _str.replace(new RegExp(reStr, 'g'), val.trans);
	      }
	    }
	  }

	  return _str;
	};

	const getPreview = () => {
	  const str = sessionStorage.getItem('blhxfy:preview');
	  let data = [];

	  if (str) {
	    try {
	      data = JSON.parse(str);
	    } catch (e) {
	      console.error(e);
	    }
	  }

	  return data;
	};

	const getPreviewCsv = name => {
	  const data = getPreview();
	  let csv = '';

	  for (let item of data) {
	    if (item.name === name) {
	      csv = item.csv;
	    }
	  }

	  return csv;
	};

	const txtKeys = ['chapter_name', 'synopsis', 'detail', 'sel1_txt', 'sel2_txt', 'sel3_txt', 'sel4_txt'];

	const getScenario = async name => {
	  let csv = getPreviewCsv(name);

	  if (!csv) {
	    const scenarioData = await fetchWithHash('/blhxfy/data/scenario.json');
	    const pathname = scenarioData[name];

	    if (!pathname) {
	      return {
	        transMap: null,
	        csv: ''
	      };
	    }

	    csv = await fetchWithHash(`/blhxfy/data/scenario/${pathname}`);
	  }

	  const list = parseCsv(csv);
	  const transMap = new Map();
	  list.forEach(item => {
	    if (item.id) {
	      const idArr = item.id.split('-');
	      const id = idArr[0];
	      const type = idArr[1] || 'detail';
	      const obj = transMap.get(id) || {};
	      obj[type] = item.trans ? item.trans.replace(/姬塔/g, config.userName) : false;
	      transMap.set(id, obj);
	    }
	  });
	  return {
	    transMap,
	    csv
	  };
	};

	const getNameTrans = (name, map, scenarioName) => {
	  const item = map.get(name);

	  if (item) {
	    let existScenario = '';

	    if (item.scenarios.length) {
	      for (let sName of item.scenarios) {
	        if (scenarioName.indexOf(sName) !== -1) {
	          existScenario = sName;
	          break;
	        }
	      }
	    }

	    const result = {
	      trans: item.trans,
	      noun: item.noun
	    };

	    if (existScenario) {
	      result.trans = item[existScenario].trans;
	      result.noun = item[existScenario].noun;
	    }

	    return result.trans;
	  }

	  return null;
	};

	const collectNameHtml = str => {
	  if (!str) return str;
	  let name = str;
	  let html = '';
	  const rgs = name.match(/<[^>]+>([^<]*)<\/[^>]+>/);

	  if (rgs && rgs[1]) {
	    name = rgs[1];
	    html = str.replace(name, '$name');
	  }

	  return {
	    name,
	    html
	  };
	};

	const replaceChar = (key, item, map, scenarioName) => {
	  const nameStr = item[key] ? item[key].trim() : '';
	  const {
	    name,
	    html
	  } = collectNameHtml(nameStr);

	  if (name && name !== 'null' && name !== '???' && name !== '？？？') {
	    let trans = getNameTrans(name, map, scenarioName);
	    let _name = name;

	    if (/\s?[\?？0-9０－９]{1,2}$/.test(name)) {
	      // name with number or symbol
	      const nameRst = name.match(/(.+?)\s?([\?？0-9０－９]{1,2})$/);

	      const _trans = getNameTrans(nameRst[1], map, scenarioName);

	      _name = nameRst[1];
	      if (_trans) trans = `${_trans}${nameRst[2]}`;
	    } else if (/'s\sVoice$/.test(name)) {
	      let nmKey = name.slice(0, name.length - 8);

	      const _trans = getNameTrans(nmKey, map, scenarioName);

	      if (_trans) trans = `${_trans}的声音`;
	    } else if (/の声$/.test(name)) {
	      let nmKey = name.slice(0, name.length - 2);

	      const _trans = getNameTrans(nmKey, map, scenarioName);

	      if (_trans) trans = `${_trans}的声音`;
	    }

	    if (trans) {
	      if (html) {
	        trans = html.replace('$name', trans);
	      }

	      item[key] = trans;
	    } else if (trans !== '') {
	      return _name;
	    }
	  }
	};

	const scenarioCache = {
	  data: null,
	  name: '',
	  hasTrans: false,
	  csv: ''
	};

	const transStart = async (data, pathname) => {
	  const pathRst = pathname.match(/\/scenario.*?\/(scene[^\/]+)\/?/);
	  if (!pathRst || !pathRst[1]) return data;
	  insertToolHtml();
	  const scenarioName = pathRst[1];
	  scenarioCache.data = cloneDeep_1(data);
	  scenarioCache.name = scenarioName;
	  scenarioCache.hasTrans = false;
	  const {
	    transMap,
	    csv
	  } = await getScenario(scenarioName);
	  if (!transMap) return data;
	  scenarioCache.hasTrans = true;
	  scenarioCache.csv = csv;
	  const nameData = await getNameData();
	  const nameMap = Game.lang !== 'ja' ? nameData['enNameMap'] : nameData['jpNameMap'];
	  data.forEach(item => {
	    let name1, name2, name3;
	    name1 = replaceChar('charcter1_name', item, nameMap, scenarioName);
	    name2 = replaceChar('charcter2_name', item, nameMap, scenarioName);
	    name3 = replaceChar('charcter3_name', item, nameMap, scenarioName);
	    const obj = transMap.get(item.id);
	    if (!obj) return;
	    txtKeys.forEach(key => {
	      if (obj[key]) {
	        item[key] = obj[key];
	      }
	    });
	  });
	  return data;
	};

	async function transScenario (data, pathname) {
	  if (Array.isArray(data)) {
	    return await transStart(data, pathname);
	  } else if (Array.isArray(data.scene_list)) {
	    return Object.assign(data, {
	      scene_list: await transStart(data.scene_list, pathname)
	    });
	  } else {
	    return data;
	  }
	}

	let data = null;

	const getLocalData = async type => {
	  if (data) return data[type];
	  const hash = await getHash;

	  try {
	    const str = sessionStorage.getItem('blhxfy:data');
	    if (!str) return false;
	    data = JSON.parse(str);

	    if (data.hash !== hash) {
	      data = null;
	      sessionStorage.removeItem('blhxfy:data');
	      localStorage.removeItem('blhxfy:data');
	      return false;
	    }

	    return data[type];
	  } catch (err) {
	    console.error(err);
	  }

	  return false;
	};

	const setLocalData = (type, value) => {
	  if (!data) data = {
	    hash: config.hash
	  };
	  data[type] = value;
	  const str = JSON.stringify(data);

	  try {
	    sessionStorage.setItem('blhxfy:data', str);
	  } catch (err) {
	    console.error(err);
	  }
	};

	const langMsgMap = new Map();
	let loaded$1 = false;

	const getLangMsgData = async () => {
	  if (!loaded$1) {
	    let langMsg = await getLocalData('langMsg');

	    if (!langMsg) {
	      langMsg = await fetchWithHash('/blhxfy/data/lang-msg.csv');
	      setLocalData('langMsg', langMsg);
	    }

	    const list = parseCsv(langMsg);
	    list.forEach(item => {
	      if (item.id && item.id.trim()) {
	        item.en && langMsgMap.set(`${item.id}${item.en}`, {
	          trans: item.trans,
	          en: item.en,
	          jp: item.jp
	        });
	        item.jp && langMsgMap.set(`${item.jp}`, {
	          trans: item.trans,
	          en: item.en,
	          jp: item.jp
	        });
	      }
	    });
	    loaded$1 = true;
	  }

	  return langMsgMap;
	};

	async function transLangMsg(data, pathname) {
	  if (!data.option || !data.option.langMsg) return data;
	  const lang = Game.lang;
	  const msgs = data.option.langMsg;
	  const langMsgMap = await getLangMsgData();

	  for (let key of Object.keys(msgs)) {
	    const msg = langMsgMap.get(`${lang === 'ja' ? '' : key}${msgs[key].msg}`);

	    if (msg && msg.trans) {
	      msgs[key].msg = msg.trans;
	    }
	  }

	  return data;
	}

	const skillMap = new Map();
	const skillKeys = [['special_skill', 'special'], ['action_ability1', 'skill-1'], ['action_ability2', 'skill-2'], ['action_ability3', 'skill-3'], ['action_ability4', 'skill-4'], ['support_ability1', 'support-1'], ['support_ability2', 'support-2'], ['support_ability_of_npczenith', 'skill-lb']];
	const state = {
	  status: 'init',
	  cStatus: 'init',
	  skillMap,
	  skillKeys,
	  skillData: null,
	  commSkillMap: new Map(),
	  autoTransCache: new Map()
	};

	const getCommSkillMap = async () => {
	  if (state.cStatus === 'loaded') return;
	  const csvData = await fetchWithHash('/blhxfy/data/common-skill.csv');
	  const list = await parseCsv(csvData);
	  const sortedList = sortKeywords(list, 'comment');
	  sortedList.forEach(item => {
	    if (item.comment && item.trans && item.type) {
	      const comment = item.comment.trim();
	      const trans = item.trans.trim();
	      const type = item.type.trim() || '1';

	      if (comment && trans) {
	        state.commSkillMap.set(comment, {
	          trans,
	          type
	        });
	      }
	    }
	  });
	  state.cStatus = 'loaded';
	};

	const setSkillMap = (list, stable = true) => {
	  let npcId, active, idArr;

	  for (let row of list) {
	    if (row.id === 'npc') {
	      idArr = row.detail.split('|');
	    } else if (row.id === 'active') {
	      if (row.name !== '0') {
	        active = true;
	      }
	    }
	  }

	  if (!idArr.length || !idArr[0]) return;
	  npcId = idArr[1] || idArr[0];
	  const skillData = {};

	  for (let row of list) {
	    if (stable || active) {
	      skillData[row.id] = row;
	    }
	  }

	  state.skillMap.set(npcId, skillData);
	};

	const getSkillData = async npcId => {
	  await getCommSkillMap();

	  if (!state.skillData) {
	    state.skillData = await fetchWithHash('/blhxfy/data/skill.json');
	  }

	  const csvName = state.skillData[npcId];

	  if (csvName) {
	    const csvData = await fetchWithHash(`/blhxfy/data/skill/${csvName}`);
	    const list = parseCsv(csvData);
	    setSkillMap(list);
	  }

	  return state;
	};

	function replaceTurn (str) {
	  return str.replace('ターン', '回合').replace('turns', '回合').replace('turn', '回合').replace('Cooldown:', '使用间隔:').replace('使用間隔:', '使用间隔:');
	}

	const buffMap = {
	  buff: new Map(),
	  debuff: new Map()
	};
	let loaded$2 = false;

	const getData = async type => {
	  let csv = await getLocalData(type);

	  if (!csv) {
	    csv = await fetchWithHash(`/blhxfy/data/${type}.csv`);
	    setLocalData(type, csv);
	  }

	  const list = parseCsv(csv);
	  list.forEach(item => {
	    const detail = trim(item.detail);
	    const trans = trim(item.trans);

	    if (detail && trans) {
	      buffMap[type].set(detail, trans);
	    }
	  });
	};

	const getBuffData = async type => {
	  if (!loaded$2) {
	    await getData('buff');
	    await getData('debuff');
	    loaded$2 = true;
	  }

	  return buffMap[type];
	};

	const transBuff = async data => {
	  const keys = ['buff', 'debuff'];

	  for (let key of keys) {
	    if (data[key]) {
	      const buffMap = await getBuffData(key);

	      for (let k in data[key]) {
	        const item = data[key][k];

	        if (item.detail && buffMap.has(item.detail)) {
	          item.detail = buffMap.get(item.detail);
	        }

	        if (item.effect) item.effect = replaceTurn(item.effect);
	      }
	    }
	  }
	};

	const elemtRE = '([光闇水火風土]|light|dark|water|wind|earth|fire)';
	const elemtMap = {
	  light: '光',
	  '光': '光',
	  'dark': '暗',
	  '闇': '暗',
	  'water': '水',
	  '水': '水',
	  wind: '风',
	  '風': '风',
	  'earth': '土',
	  '土': '土',
	  'fire': '火',
	  '火': '火'
	};
	const numRE = '(\\d{1,4})';
	const percentRE = '(\\d{1,4}%)';

	const parseRegExp = str => {
	  return str.replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\$elemt/g, elemtRE).replace(/\$num/g, numRE).replace(/\$percent/g, percentRE);
	};

	const transSkill = (comment, {
	  commSkillMap,
	  autoTransCache
	}) => {
	  if (autoTransCache.has(comment)) return autoTransCache.get(comment);
	  let result = comment;

	  for (let [key, value] of commSkillMap) {
	    if (!key.trim()) continue;
	    const {
	      trans,
	      type
	    } = value;

	    if (type === '1') {
	      const re = new RegExp(parseRegExp(key), 'gi');
	      result = result.replace(re, (...arr) => {
	        let _trans = trans;

	        for (let i = 1; i < arr.length - 2; i++) {
	          let eleKey = arr[i].toLowerCase();

	          if (elemtMap[eleKey]) {
	            _trans = _trans.replace(`$${i}`, elemtMap[eleKey]);
	          } else {
	            _trans = _trans.replace(`$${i}`, arr[i]);
	          }
	        }

	        return _trans;
	      });
	    } else if (type === '2') {
	      result = result.replace(key, trans);
	    } else if (type === '3') {
	      result = result.replace(`(${key})`, `(${trans})`);
	    }
	  }

	  autoTransCache.set(comment, result);
	  return result;
	};

	const getPlusStr = str => {
	  let plusStr = '';
	  let plusStr2 = '';
	  let _str = str;

	  while (_str.endsWith('+') || _str.endsWith('＋')) {
	    plusStr += '＋';
	    plusStr2 += '+';
	    _str = _str.slice(0, _str.length - 1);
	  }

	  return [plusStr, plusStr2];
	};

	const parseBuff = async data => {
	  for (let item of skillKeys) {
	    const key = item[0];
	    let ability = data[key];

	    if (!ability) {
	      if (!data.ability) continue;
	      ability = data.ability[key];
	      if (!ability) continue;
	    }

	    if (ability.ability_detail) {
	      await transBuff(ability.ability_detail);
	    }
	  }
	};

	const parseSkill = async (data, pathname) => {
	  let npcId;

	  if (pathname.includes('/npc/npc/')) {
	    if (!data.master || !data.master.id) return data;
	    npcId = `${data.master.id}`;
	  } else if (pathname.includes('/archive/npc_detail')) {
	    if (!data.id) return data;
	    npcId = data.id;
	  }

	  await parseBuff(data);
	  const skillState = await getSkillData(npcId);
	  if (!skillState) return data;
	  const skillData = skillState.skillMap.get(npcId);
	  const translated = new Map();
	  const keys = skillState.skillKeys;

	  if (skillData) {
	    for (let item of keys) {
	      const key1 = item[0];
	      const key2 = item[1];
	      let ability = data[key1];

	      if (!ability) {
	        if (!data.ability) continue;
	        ability = data.ability[key1];
	        if (!ability) continue;
	      }

	      if (ability.recast_comment) {
	        ability.recast_comment = replaceTurn(ability.recast_comment);
	      }

	      const [plus1, plus2] = getPlusStr(ability.name);
	      let trans = skillData[`skill-${ability.name}`];

	      if (!trans) {
	        trans = skillData[`special-${ability.name}`];

	        if (!trans) {
	          trans = skillData[key2 + plus2];

	          if (!trans) {
	            trans = skillData[key2];
	            if (!trans) continue;
	          }
	        }
	      }

	      if (trans.name) {
	        ability.name = trans.name + plus1;
	      }

	      if (trans.detail) {
	        ability.comment = trans.detail;
	        translated.set(key1, true);
	      }
	    }

	    if (data.master) {
	      const trans = skillData['npc'];
	      if (trans && trans.name) data.master.name = trans.name;
	    } else if (data.name) {
	      const trans = skillData['npc'];
	      if (trans) data.name = trans.name;
	    }

	    if (data.comment) {
	      const trans = skillData['intro'];
	      if (trans) data.comment = trans.detail;
	    }
	  }

	  keys.forEach(item => {
	    if (!translated.get(item[0])) {
	      const skill = data[item[0]];

	      if (skill) {
	        skill.comment = transSkill(skill.comment, skillState);
	      }
	    }
	  });
	  return data;
	};

	const skillMap$1 = new Map();
	let loaded$3 = false;

	const getSkillData$1 = async id => {
	  if (!loaded$3) {
	    const csv = await fetchWithHash('/blhxfy/data/job-skill.csv');
	    const list = parseCsv(csv);
	    list.forEach(item => {
	      if (item && item.id) {
	        const _id = item.id.trim();

	        if (_id) skillMap$1.set(_id, {
	          name: item.name.trim(),
	          detail: item.detail.trim()
	        });
	      }
	    });
	    loaded$3 = true;
	  }

	  const trans = skillMap$1.get(id);
	  return trans;
	};

	const startTrans = async data => {
	  for (let key in data) {
	    if (data[key]) {
	      const trans = await getSkillData$1(data[key].action_id);

	      if (trans) {
	        data[key].name = trans.name;
	        data[key].comment = trans.detail;
	      }

	      if (data[key].recast_comment) {
	        data[key].recast_comment = replaceTurn(data[key].recast_comment);
	      }

	      if (data[key].turn_comment) {
	        data[key].turn_comment = replaceTurn(data[key].turn_comment);
	      }

	      if (data[key].ability_detail) {
	        await transBuff(data[key].ability_detail);
	      }
	    }
	  }

	  return data;
	};

	const replaceSkill = async data => {
	  if (data.action_ability) {
	    data.action_ability = await startTrans(data.action_ability);
	  }

	  if (data.support_ability) {
	    data.support_ability = await startTrans(data.support_ability);
	  }

	  return data;
	};

	const transSkill$1 = async (data, pathname) => {
	  if (/\/party\/job\/\d+\//.test(pathname)) {
	    if (data.job) {
	      data.job = await replaceSkill(data.job);
	    }
	  } else if (pathname.includes('/party_ability_subaction/')) {
	    if (data.list) {
	      data.list = await startTrans(data.list);
	    }
	  } else if (/\/party\/ability_list\/\d+\//.test(pathname)) {
	    data = await replaceSkill(data);
	  } else if (/\/party\/job_info\/\d+\//.test(pathname)) {
	    if (data.after_job_master) {
	      data.after_job_master = await replaceSkill(data.after_job_master);
	    }

	    if (data.before_job_info) {
	      data.before_job_info = await replaceSkill(data.before_job_info);
	    }
	  } else if (/\/zenith\/ability_list\/\d+/.test(pathname)) {
	    if (data.ability_list) {
	      data.list = await startTrans(data.ability_list);
	    }
	  }

	  return data;
	};

	const htmlMap = new Map();
	let loaded$4 = false;

	const trim$1 = str => {
	  if (!str) return '';
	  return str.trim();
	};

	const getCommHtmlData = async () => {
	  if (!loaded$4) {
	    let csv = await getLocalData('common-html');

	    if (!csv) {
	      csv = await fetchWithHash('/blhxfy/data/common-html.csv');
	      setLocalData('common-html', csv);
	    }

	    const list = parseCsv(csv);
	    const tempMap = new Map();
	    sortKeywords(list, 'text').forEach(item => {
	      const pathname = trim$1(item.path);
	      const text = trim$1(item.text);
	      const trans = trim$1(item.trans);
	      const times = item.count | 0 || 1;

	      if (pathname && text && trans) {
	        if (tempMap.has(pathname)) {
	          tempMap.get(pathname).push({
	            text,
	            trans,
	            times
	          });
	        } else {
	          tempMap.set(pathname, [{
	            text,
	            trans,
	            times
	          }]);
	        }
	      }
	    });
	    sortKeywords(Array.from(tempMap.keys())).forEach(key => {
	      htmlMap.set(key, tempMap.get(key));
	    });
	    loaded$4 = true;
	  }

	  return htmlMap;
	};

	const htmlMap$1 = new Map();
	let loaded$5 = false;

	const trim$2 = str => {
	  if (!str) return '';
	  return str.trim();
	};

	const getArchiveData = async () => {
	  if (!loaded$5) {
	    const csv = await fetchWithHash('/blhxfy/data/archive.csv');
	    const list = parseCsv(csv);
	    sortKeywords(list, 'text').forEach(item => {
	      const text = trim$2(item.text);
	      const trans = trim$2(item.trans);
	      const times = item.count | 0 || 1;

	      if (text && trans) {
	        htmlMap$1.set(text, {
	          trans,
	          times
	        });
	      }
	    });
	    loaded$5 = true;
	  }

	  return htmlMap$1;
	};

	const replaceHTML = async (html, pathname) => {
	  let _html = html;
	  const htmlMap = await getCommHtmlData();

	  for (let [key, list] of htmlMap.entries()) {
	    if (pathname.includes(key)) {
	      list.forEach(item => {
	        for (let i = 0; i < item.times; i++) {
	          let newHtml = _html.replace(item.text, item.trans);

	          if (newHtml !== _html) {
	            _html = newHtml;
	          } else {
	            break;
	          }
	        }
	      });
	    }
	  }

	  return _html;
	};

	const replaceArchive = async html => {
	  let _html = html;
	  const htmlMap = await getArchiveData();

	  for (let [text, item] of htmlMap.entries()) {
	    for (let i = 0; i < item.times; i++) {
	      let newHtml = _html.replace(text, item.trans);

	      if (newHtml !== _html) {
	        _html = newHtml;
	      } else {
	        break;
	      }
	    }
	  }

	  return _html;
	};

	async function transHTML(data, pathname) {
	  if (!data.data) return data;
	  let html;

	  try {
	    html = decodeURIComponent(data.data);
	  } catch (err) {
	    return data;
	  }

	  if (pathname.includes('/archive/content/library/')) {
	    html = await replaceArchive(html);
	  } else {
	    html = await replaceHTML(html, pathname);
	  }

	  data.data = encodeURIComponent(html);
	  return data;
	}

	const townMap = new Map();
	let loaded$6 = false;

	const trim$3 = str => {
	  if (!str) return '';
	  return str.trim();
	};

	const getTownData = async () => {
	  if (!loaded$6) {
	    const csv = await fetchWithHash('/blhxfy/data/town-info.csv');
	    const list = parseCsv(csv);
	    list.forEach(item => {
	      const id = trim$3(item.id);
	      const name = trim$3(item.name);
	      const detail = trim$3(item.detail);
	      const vyrn = trim$3(item.vyrn);

	      if (id && name) {
	        townMap.set(id, {
	          name,
	          detail,
	          vyrn
	        });
	      }
	    });
	    loaded$6 = true;
	  }

	  return townMap;
	};

	async function transTownInfo(data, pathname) {
	  let town;

	  try {
	    town = data.option.mydata_assets.mydata.town;
	  } catch (err) {
	    return data;
	  }

	  const townMap = await getTownData();

	  if (townMap.has(town.location_id)) {
	    town.town_name = townMap.get(town.location_id).name;
	  }

	  for (let key in town.spot) {
	    let item = town.spot[key];
	    let id = `${town.location_id}-${item.id}`;

	    if (townMap.has(id)) {
	      let data = townMap.get(id);
	      item.location = data.name;
	      item.description = data.detail;
	      item.bee_comment = data.vyrn;
	    }
	  }

	  return data;
	}

	const islandMap = new Map();
	let loaded$7 = false;

	const trim$4 = str => {
	  if (!str) return '';
	  return str.trim();
	};

	const getIslandData = async () => {
	  if (!loaded$7) {
	    const csv = await fetchWithHash('/blhxfy/data/island-info.csv');
	    const list = parseCsv(csv);
	    list.forEach(item => {
	      const id = trim$4(item.id);
	      const name = trim$4(item.name);
	      const detail = trim$4(item.detail);

	      if (id && name) {
	        islandMap.set(id, {
	          name,
	          detail
	        });

	        if (id === 'skydom') {
	          islandMap.set(name, detail);
	        }
	      }
	    });
	    loaded$7 = true;
	  }

	  return islandMap;
	};

	async function transIslandInfo(data, pathname) {
	  let island;

	  try {
	    island = data.island_info;
	  } catch (err) {
	    return data;
	  }

	  const islandMap = await getIslandData();

	  if (islandMap.has(island.island_name)) {
	    island.island_name = islandMap.get(island.island_name);
	  }

	  for (let key in island) {
	    let item = island[key];
	    let id = key;

	    if (islandMap.has(id)) {
	      if (id !== 'island_name') {
	        const data = islandMap.get(id);
	        item.name = data.name;
	        item.area_comment = data.detail;
	      }
	    }
	  }

	  return data;
	}

	const chatMap = new Map();
	let loaded$8 = false;

	const trim$5 = str => {
	  if (!str) return '';
	  return str.trim();
	};

	const getChatData = async () => {
	  if (!loaded$8) {
	    let csv = await getLocalData('chat-preset');

	    if (!csv) {
	      csv = await fetchWithHash('/blhxfy/data/chat-preset.csv');
	      setLocalData('chat-preset', csv);
	    }

	    const list = parseCsv(csv);
	    list.forEach(item => {
	      const id = trim$5(item.id);
	      const trans = trim$5(item.trans);

	      if (id && trans) {
	        chatMap.set(id, trans);
	      }
	    });
	    loaded$8 = true;
	  }

	  return chatMap;
	};

	async function transChat(data) {
	  if (!data.chat) return data;
	  const chatMap = await getChatData();

	  for (let key in data.chat) {
	    let item = data.chat[key];

	    for (let ck in item) {
	      let id = item[ck].chat_id;

	      if (chatMap.has(id)) {
	        item[ck].text = chatMap.get(id);
	      }
	    }
	  }

	  return data;
	}

	const voiceMap = new Map();
	let loaded$9 = false;

	const trim$6 = str => {
	  if (!str) return '';
	  return str.trim();
	};

	const getTownData$1 = async () => {
	  if (!loaded$9) {
	    const csv = await fetchWithHash('/blhxfy/data/voice-mypage.csv');
	    const list = parseCsv(csv);
	    list.forEach(item => {
	      const path = trim$6(item.path);
	      const trans = trim$6(item.trans);
	      const duration = trim$6(item.duration) || 10;

	      if (path && trans) {
	        voiceMap.set(path, {
	          trans,
	          duration
	        });
	      }
	    });
	    loaded$9 = true;
	  }

	  return voiceMap;
	};

	const voiceList = [];

	const saveList = async data => {
	  const obj = data.data;

	  for (let key in obj) {
	    let item = obj[key];

	    for (let vkey in item) {
	      let voice = item[vkey].replace(/\.[\w\d]+$/, '');

	      if (!voiceList.includes(voice)) {
	        voiceList.push(voice);
	      }
	    }
	  }
	};

	const createBox = () => {
	  const box = document.createElement('div');
	  box.id = 'box-sub-blhxfy';
	  return box;
	};

	let hideTimer = null;

	const hideBox = () => {
	  let box = document.getElementById('box-sub-blhxfy');
	  if (!box) return;
	  box.style.pointerEvents = 'none';
	  box.style.opacity = 0;
	  box.style.transition = 'opacity 1.5s';
	  clearTimeout(hideTimer);
	};

	const setSubBox = (text, duration) => {
	  const cont = document.querySelector('.cnt-mypage .prt-user-scene');
	  if (!cont) return;
	  let box = document.getElementById('box-sub-blhxfy');

	  if (!box) {
	    box = createBox();
	    cont.appendChild(box);
	  }

	  let _text = text;

	  if (config.userName && config.userName !== '姬塔') {
	    _text = _text.replace(/团长/g, config.userName);
	  }

	  box.innerText = _text.replace(/\\n/g, '\n');
	  setTimeout(() => {
	    box.style.opacity = 1;
	    box.style.pointerEvents = 'auto';
	    box.style.transition = 'opacity 0.5s';
	  }, 100);
	  clearTimeout(hideTimer);
	  hideTimer = setTimeout(hideBox, duration * 1000);
	  box.removeEventListener('click', hideBox);
	  box.addEventListener('click', hideBox);
	};

	const showSub = async src => {
	  hideBox();
	  const voice = src.replace(/\.[\w\d]+$/, '');
	  if (!voiceList.includes(voice)) return;
	  const voiceMap = await getTownData$1();
	  if (!voiceMap.has(voice)) return;
	  const data = voiceMap.get(voice);
	  setSubBox(data.trans, data.duration);
	};

	let soundInjected = false;
	async function showVoiceSub(data, pathname, type) {
	  if (!soundInjected) {
	    require(['model/sound'], function (sound) {
	      let playVoice = sound.prototype.playVoice;

	      sound.prototype.playVoice = function (src, force) {
	        if (!Game.setting.sound_flag) return;
	        showSub(src);
	        playVoice.call(this, src, force);
	      };
	    });
	  }

	  soundInjected = true;

	  if (type === 'list') {
	    await saveList(data);
	  } else {
	    await showSub(pathname);
	  }
	}

	const getUserName = data => {
	  const html = decodeURIComponent(data.data);
	  const rgs = html.match(/<span\sclass="txt-user-name">([^<]+)<\/span>/);

	  if (rgs && rgs[1]) {
	    config.userName = rgs[1];
	    localStorage.setItem('blhxfy:name', rgs[1]);
	  }
	};

	const setUserName = () => {
	  if (!config.userName && Game.userId) {
	    require(['model/content'], function (mc) {
	      let req = new mc({
	        controller: "profile",
	        action: "index",
	        param: {
	          user_id: Game.userId
	        }
	      });
	      req.fetch();
	    });

	    config.userName = '姬塔';
	    localStorage.setItem('blhxfy:name', config.userName);
	  }
	};

	const getLocalName = () => {
	  const name = localStorage.getItem('blhxfy:name');
	  if (name) config.userName = name;
	};

	getLocalName();

	const apiHosts = ['game.granbluefantasy.jp', 'gbf.game.mbga.jp'];
	async function translate(state) {
	  const uri = URI(state.url);
	  const pathname = uri.pathname();
	  const hostname = uri.hostname();
	  let data = state.result;
	  let isJSON = true;

	  try {
	    data = JSON.parse(data);
	  } catch (err) {
	    isJSON = false;
	  }

	  if (apiHosts.indexOf(hostname) !== -1) {
	    if (pathname.includes('scenario')) {
	      setUserName();
	      data = await transScenario(data, pathname);
	    } else if (pathname.includes('/content/')) {
	      if (pathname.includes('/profile/content/index/')) {
	        getUserName(data);
	      }

	      data = await transLangMsg(data, pathname);
	      data = await transHTML(data, pathname);

	      if (pathname.includes('/user/content/index')) {
	        data = await transTownInfo(data, pathname);
	      }
	    } else if (pathname.includes('/npc/npc/') || pathname.includes('/archive/npc_detail')) {
	      data = await parseSkill(data, pathname);
	    } else if (pathname.includes('/party_ability_subaction/') || pathname.includes('/party/job/') || pathname.includes('/party/ability_list/') || pathname.includes('/zenith/ability_list/') || pathname.includes('/party/job_info/')) {
	      data = await transSkill$1(data, pathname);
	    } else if (pathname.includes('/island/init')) {
	      data = await transIslandInfo(data, pathname);
	    } else if (pathname.includes('/rest/sound/mypage_voice')) {
	      await showVoiceSub(data, pathname, 'list');
	    } else if (pathname.includes('/rest/multiraid/start.json')) {
	      data = await transChat(data);
	    } else if (/\/rest\/.*?raid\/condition\/\d+\/\d\/\d\.json/.test(pathname)) {
	      await transBuff(data.condition);
	    } else {
	      return;
	    }
	  } else {
	    return;
	  }

	  state.result = isJSON ? JSON.stringify(data) : data;
	}

	const start = () => {
	  // The following code are inspired by viramate/external.js
	  // intercept xhr request and modify the response
	  const XHR = XMLHttpRequest;
	  const originOpen = XHR.prototype.open;
	  const originSend = XHR.prototype.send;
	  const originAddEventListener = XHR.prototype.addEventListener;
	  const stateMap = new WeakMap();

	  function log(data) {
	    console.error(data);
	  }

	  function getXhrState(xhr) {
	    let result = stateMap.get(xhr);

	    if (!result) {
	      result = {};
	      stateMap.set(xhr, result);
	    }

	    if (!result.readyStateListeners) {
	      result.readyStateListeners = [];
	    }

	    if (!result.loadListeners) {
	      result.loadListeners = [];
	    }

	    return result;
	  }

	  const customOnLoad = async function (evt) {
	    let state;

	    try {
	      state = getXhrState(this);
	      state.onLoadEvent = evt;
	      Object.defineProperties(this, {
	        response: {
	          get() {
	            return state.result;
	          }

	        },
	        responseText: {
	          get() {
	            return state.result;
	          }

	        }
	      });

	      try {
	        await translate(state);
	      } catch (_err) {
	        console.error(_err);
	      }

	      state.onload && state.onload.call(this, state.onLoadEvent);
	    } catch (err) {
	      log(err);
	    }
	  };

	  const customOnReadyStateChange = async function () {
	    let state;

	    try {
	      state = getXhrState(this);

	      if (this.readyState == XHR.DONE) {
	        state.onComplete.call(this, state);
	      }
	    } catch (err) {
	      log(err);
	    }

	    try {
	      for (let i = 0, l = state.readyStateListeners.length; i < l; i++) {
	        try {
	          state.readyStateListeners[i].apply(this, arguments);
	        } catch (err) {
	          log(err);
	        }
	      }
	    } catch (err) {
	      log(err);
	    }
	  };

	  function customOnComplete(state) {
	    if (state.done) return;
	    state.done = performance.now();
	    state.result = this.response || this.responseText;
	    state.response = this.response;
	    state.responseType = this.responseType;

	    if (state.responseType === "" || state.responseType === "text") {
	      state.responseText = this.responseText;
	    }

	    state.status = this.status;
	    state.statusText = this.statusText;
	    state.contentType = this.getResponseHeader('content-type');
	  }

	  XHR.prototype.open = function open(method, url, async, user, password) {
	    try {
	      const state = getXhrState(this);
	      state.method = method;
	      state.url = url;
	    } catch (err) {
	      log(err);
	    }

	    originAddEventListener.call(this, "readystatechange", customOnReadyStateChange, false);
	    const result = originOpen.apply(this, arguments);
	    return result;
	  };

	  XHR.prototype.addEventListener = function addEventListener(eventName, listener, useCapture) {
	    try {
	      const state = getXhrState(this);

	      if (eventName === "readystatechange") {
	        state.readyStateListeners.push(listener);
	        return true;
	      }
	    } catch (err) {
	      log(err);
	    }

	    const result = originAddEventListener.apply(this, arguments);
	    return result;
	  };

	  XHR.prototype.send = function send(data) {
	    let state = null;

	    try {
	      state = getXhrState(this);

	      if (state.url) {
	        state.sent = performance.now();
	        state.data = data;
	        state.onComplete = customOnComplete;
	        state.onload = this.onload;
	        this.onload = customOnLoad;
	      }
	    } catch (err) {
	      log(err);
	    }

	    originSend.call(this, data);
	  };

	  XHR.prototype.open.toString = function toString() {
	    return originOpen.toString();
	  };

	  XHR.prototype.addEventListener.toString = function toString() {
	    return originAddEventListener.toString();
	  };

	  XHR.prototype.send.toString = function toString() {
	    return originSend.toString();
	  };
	};

	const txtKeys$1 = ['chapter_name', 'synopsis', 'detail', 'sel1_txt', 'sel2_txt', 'sel3_txt', 'sel4_txt'];

	const replaceName = (content, userName) => {
	  if (userName) {
	    content.forEach(item => {
	      if (item.id === 'info') return;
	      ['en', 'jp'].forEach(key => {
	        if (!item[key]) return;
	        let _lang = key;
	        if (!/^\w+$/.test(userName)) _lang = 'unknown';
	        item[key] = replaceWords(item[key], new Map([[userName, '姬塔']]), _lang);
	      });
	    });
	  }
	};

	const dataToCsv = (data, fill) => {
	  const result = [];
	  data.forEach(item => {
	    txtKeys$1.forEach(key => {
	      let txt = item[key];

	      if (txt) {
	        txt = txt.replace(/\n/g, '');
	        result.push({
	          id: `${item.id}${key === 'detail' ? '' : '-' + key}`,
	          en: Game.lang === 'en' ? txt : '',
	          jp: Game.lang === 'ja' ? txt : '',
	          trans: fill ? txt : ''
	        });
	      }
	    });
	  });
	  const extraInfo = {
	    id: 'info',
	    en: Game.lang === 'en' ? '1' : '',
	    jp: Game.lang === 'ja' ? '1' : '',
	    trans: scenarioCache.name
	  };
	  replaceName(result, config.userName);
	  result.push(extraInfo);
	  return papaparse.unparse(result);
	};

	function dlStoryCsv (type = 'normal') {
	  if (type === 'normal') {
	    tryDownload(dataToCsv(scenarioCache.data), scenarioCache.name + '.csv');
	  } else if (type === 'trans') {
	    if (scenarioCache.hasTrans) {
	      tryDownload(scenarioCache.csv, scenarioCache.name + '.csv');
	    } else {
	      alert('这个章节还没有翻译。');
	    }
	  } else if (type === 'fill') {
	    tryDownload(dataToCsv(scenarioCache.data, true), scenarioCache.name + '.csv');
	  }
	}

	const setLocalData$1 = (name, csv) => {
	  const data = getPreview();
	  let exist = false;

	  for (let item of data) {
	    if (item.name === name) {
	      exist = true;
	      item.csv = csv;
	      break;
	    }
	  }

	  if (!exist) {
	    if (data.length >= 3) {
	      data.shift();
	    }

	    data.push({
	      name,
	      csv
	    });
	  }

	  sessionStorage.setItem('blhxfy:preview', JSON.stringify(data));
	};

	function previewCsv (type) {
	  const cont = document.getElementById('blhxfy-story-input');

	  if (type === 'hide') {
	    cont.style.display = 'none';
	  } else if (type === 'show') {
	    const csv = getPreviewCsv(scenarioCache.name);
	    cont.querySelector('textarea').value = csv;
	    cont.style.display = 'block';
	  } else if (type === 'clear') {
	    cont.querySelector('textarea').value = '';
	  } else if (type === 'save') {
	    setLocalData$1(scenarioCache.name, cont.querySelector('textarea').value);
	    location.reload();
	  }
	}

	const main = () => {
	  if (window.blhxfy) return;
	  start();
	  window.blhxfy = {
	    dlStoryCsv,
	    previewCsv
	  };
	};

	main();

}());