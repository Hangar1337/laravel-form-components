!function(factory){"function"==typeof define&&define.amd?define(factory):factory()}((function(){"use strict";function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _toConsumableArray(arr){return function(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}(arr)||function(iter){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(iter))return Array.from(iter)}(arr)||function(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var findLastIndex=function(array,predicate){for(var l=array.length;l--;)if(predicate(array[l],l,array))return l;return-1},isArray=function(val){return Array.isArray(val)},isUndefined=function(val){return void 0===val},isNull=function(val){return null===val},isUndefinedOrNull=function(val){return isUndefined(val)||isNull(val)},isObject=function(obj){return null!==obj&&"object"===_typeof(obj)},isPlainObject=function(obj){return"[object Object]"===Object.prototype.toString.call(obj)},RX_ARRAY_NOTATION=/\[(\d+)]/g,identity=function(x){return x},getRaw=function(obj,path){var defaultValue=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;if(!(path=isArray(path)?path.join("."):path)||!isObject(obj))return defaultValue;if(path in obj)return obj[path];var steps=(path=String(path).replace(RX_ARRAY_NOTATION,".$1")).split(".").filter(identity);return 0===steps.length?defaultValue:steps.every((function(step){return isObject(obj)&&step in obj&&!isUndefinedOrNull(obj=obj[step])}))?obj:isNull(obj)?null:defaultValue},get=function(obj,path){var defaultValue=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,val=getRaw(obj,path);return isUndefinedOrNull(val)?defaultValue:val},normalizeOption=function(option){var fields=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},key=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(isPlainObject(option)){var value=get(option,fields.valueField||"value"),text=get(option,fields.textField||"text"),options=get(option,fields.optionField||"options");return isNull(options)?{value:isUndefined(value)?key||text:value,text:String(isUndefined(text)?key:text),disabled:Boolean(get(option,fields.disabledField||"disabled"))}:{label:String(get(option,fields.labelField||"label")||text),options:normalizeOptions(options)}}return{value:key||option,text:String(option),disabled:!1}},normalizeOptions=function(options){var fields=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return isArray(options)?flattenOptions(options.map((function(option){return normalizeOption(option,fields)}))):[]},flattenOptions=function(options){var mapped=[];return options.forEach((function(option){option.hasOwnProperty("label")?(mapped.push({label:option.label}),mapped=mapped.concat(option.options)):mapped.push(option)})),mapped};window.customSelect=function(config){return _objectSpread2(_objectSpread2({focusedOptionIndex:null,filterable:!1,data:[],disabled:!1,options:[],open:!1,search:"",wireFilter:!1,wireListeners:[],value:"",selectedOption:null,max:!1,selectId:"",valueField:"value",textField:"text",disabledField:"disabled",labelField:"label",optionsField:"options",fixedPosition:!1,positionOnTop:!1},config),{},{get buttonDisplay(){if(this.multiple){var optionDisplay=this.optionDisplay(this.value[0]);return this.value.length>1&&(optionDisplay+=' <span class="custom-select__select-count">+ '.concat(this.value.length-1,"</span>")),optionDisplay}return this.optionDisplay(this.value)},get fieldNames(){return{valueField:this.valueField,textField:this.textField,disabledField:this.disabledField,labelField:this.labelField,optionsField:this.optionsField}},close:function(){this.open=!1,this.focusedOptionIndex=null,this.search=""},clear:function(){this.value=this.multiple?[]:null,this.open&&(this.close(),this.focusButton())},focusButton:function(){var _this=this;this.$nextTick((function(){return _this.$refs.button.focus()}))},focusNextOption:function(){var _this2=this;null===this.focusedOptionIndex&&(this.focusedOptionIndex=-1);var nextIndex=this.options.findIndex((function(o,index){return index>_this2.focusedOptionIndex&&!o.disabled&&!_this2.isOptgroup(o)}));(-1===nextIndex||nextIndex+1>this.options.length)&&(nextIndex=this.options.findIndex((function(o){return!o.disabled&&!_this2.isOptgroup(o)}))),this.focusedOptionIndex=nextIndex,this.scrollToOption(this.focusedOptionIndex)},focusPreviousOption:function(){var _this3=this;null===this.focusedOptionIndex&&(this.focusedOptionIndex=this.options.length-1);var previousIndex=findLastIndex(this.options,(function(o,index){return index<_this3.focusedOptionIndex&&!o.disabled&&!_this3.isOptgroup(o)}));previousIndex<0&&(previousIndex=findLastIndex(this.options,(function(o){return!o.disabled&&!_this3.isOptgroup(o)}))),this.focusedOptionIndex=previousIndex,this.scrollToOption(this.focusedOptionIndex)},onHome:function(){var _this4=this;if(this.open){var firstIndex=this.options.findIndex((function(o){return!o.disabled&&!_this4.isOptgroup(o)}));firstIndex>-1&&(this.focusedOptionIndex=firstIndex,this.scrollToOption(this.focusedOptionIndex))}},onEnd:function(){var _this5=this;if(this.open){var lastIndex=findLastIndex(this.options,(function(o){return!o.disabled&&!_this5.isOptgroup(o)}));lastIndex>-1&&(this.focusedOptionIndex=lastIndex,this.scrollToOption(this.focusedOptionIndex))}},isOptgroup:function(option){return option.hasOwnProperty("label")},isSelected:function(value){return this.multiple?this.value.includes(value):this.value===value},init:function(){var _this6=this,$wire=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this.data=_toConsumableArray(normalizeOptions(this.data,this.fieldNames)),this.options=this.data,this.multiple&&(this.selectedOption=[]),this.multiple&&!isArray(this.value)&&(this.value=[]),this.multiple&&this.value.length>0?this.selectedOption=this.options.find((function(o){return!_this6.isOptgroup(o)&&o.value===_this6.value[0]})):!this.multiple&&this.value&&(this.selectedOption=this.options.find((function(o){return!_this6.isOptgroup(o)&&o.value===_this6.value}))),this.$watch("search",(function(value){if(!_this6.open)return _this6.options=_this6.data;if(_this6.wireFilter&&$wire)$wire[_this6.wireFilter](value).then((function(data){_this6.data=normalizeOptions(data,_this6.fieldNames),_this6.options=_this6.data}));else{if(!value)return _this6.options=_this6.data;var lowerCasedSearch=value.toLowerCase();_this6.options=_this6.data.filter((function(o){return!_this6.isOptgroup(o)&&(String(o.value).toLowerCase().includes(lowerCasedSearch)||o.text.toLowerCase().includes(lowerCasedSearch))}))}})),$wire&&this.wireListeners.forEach((function(listener){$wire.on(listener,(function(data){_this6.data=normalizeOptions(data,_this6.fieldNames),_this6.options=_this6.data}))}))},onMouseover:function(option,index){this.isOptgroup(option)||option.disabled||(this.focusedOptionIndex=index)},optionClasses:function(option,index){var classes=[];return this.isOptgroup(option)?classes.push("custom-select__opt-group"):index===this.focusedOptionIndex&&classes.push("custom-select__option--hovered"),this.isSelected(option.value)&&classes.push("custom-select__option--selected"),option.disabled&&classes.push("custom-select__option--disabled"),classes.join(" ")},openMenu:function(){var _this7=this;if(!this.disabled){var firstValue=this.multiple?this.value[0]:this.value;this.focusedOptionIndex=this.options.findIndex((function(o){return o.value===firstValue&&!_this7.isOptgroup(o)})),this.focusedOptionIndex<0&&(this.focusedOptionIndex=this.options.findIndex((function(o){return!o.disabled&&!_this7.isOptgroup(o)}))),this.open=!0,this.$nextTick((function(){_this7.filterable&&_this7.$refs.search.focus({preventScroll:!0}),_this7.positionMenu(),_this7.scrollToOption(_this7.focusedOptionIndex)}))}},optionDisplay:function(value){if(!value)return null;var option=this.options.find((function(o){return o.value===value}));return!option&&this.multiple&&this.selectedOption.length>0?option=this.selectedOption[0]:!option&&this.selectedOption&&this.selectedOption.value===value&&(option=this.selectedOption),(option||{text:null}).text},onEnter:function(){if(!this.open)return this.openMenu();var option=this.options[this.focusedOptionIndex];option&&this.selectOption(option)},selectOption:function(option){if(!option.disabled){if(this.multiple)return this.selectOptionForMultiple(option);this.value===option.value&&this.optional?(this.value=null,this.selectedOption=null):(this.value=option.value,this.selectedOption=option),this.close(),this.focusButton()}},selectOptionForMultiple:function(option){if(this.value.includes(option.value))return(this.optional||this.value.length>1)&&(this.value.splice(this.value.indexOf(option.value),1),this.selectedOption.splice(this.selectedOption.findIndex((function(o){return o.value===option.value})),1)),void(0===this.value.length&&(this.selectedOption=[],this.close(),this.focusButton()));(!this.max||Number(this.max)>this.value.length)&&(this.value.push(option.value),this.selectedOption.push(option))},hasSelection:function(){return this.multiple?this.value.length>0:Boolean(this.value)},scrollToOption:function(index){0===index&&this.options.length>1&&(index=1);try{this.$refs.listbox.children[index].scrollIntoView({block:"center"})}catch(e){}},toggle:function(){if(this.open)return this.close();this.openMenu()},positionMenu:function(){if(this.fixedPosition)return this.positionFixedMenu();this.$refs.container.style.marginTop=null,this.positionOnTop=!1;var menuHeight=this.$refs.listbox.offsetHeight,largestHeight=window.innerHeight-menuHeight-10;this.$refs.listbox.getBoundingClientRect().top>largestHeight&&(this.positionOnTop=!0,this.$refs.container.style.marginTop="-".concat(this.$refs.button.offsetHeight+menuHeight+20,"px"))},positionFixedMenu:function(){this.$refs.container.style.position="absolute",this.$refs.container.style.top=null;var _this$$refs$button$ge=this.$refs.button.getBoundingClientRect(),width=_this$$refs$button$ge.width,buttonLeft=_this$$refs$button$ge.left,buttonTop=_this$$refs$button$ge.top,menuHeight=this.$refs.listbox.offsetHeight,largestHeight=window.innerHeight-menuHeight-40,top=this.$refs.container.getBoundingClientRect().top;if(top>largestHeight){var menuTop=buttonTop-menuHeight-25-this.$refs.button.offsetHeight;this.$refs.container.style.top="".concat(menuTop,"px")}else this.$refs.container.style.top="".concat(top,"px");this.$refs.container.style.position="fixed",this.$refs.container.style.width="".concat(width,"px"),this.$refs.container.style.left="".concat(buttonLeft,"px")}})}}));
//# sourceMappingURL=form-components.js.map
