/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
const{h:t}=window.Ionic;import{f as e,c as i}from"./chunk-7f93bab0.js";import{a}from"./chunk-e901a817.js";class n{constructor(){this.didBlurAfterEdit=!1,this.autocapitalize="none",this.autocomplete="off",this.autocorrect="off",this.autofocus=!1,this.clearInput=!1,this.debounce=0,this.disabled=!1,this.readonly=!1,this.required=!1,this.spellcheck=!1,this.type="text",this.value=""}debounceChanged(){this.ionChange=e(this.ionChange,this.debounce)}disabledChanged(){this.emitStyle()}valueChanged(){const t=this.nativeInput,e=this.value;t&&t.value!==e&&(t.value=e),this.emitStyle(),this.ionChange.emit({value:e})}componentWillLoad(){void 0===this.clearOnEdit&&"password"===this.type&&(this.clearOnEdit=!0)}componentDidLoad(){this.ionStyle=i(this.ionStyle),this.debounceChanged(),this.emitStyle(),this.ionInputDidLoad.emit()}componentDidUnload(){this.nativeInput=void 0,this.ionInputDidUnload.emit()}emitStyle(){this.ionStyle.emit({input:!0,"input-disabled":this.disabled,"input-has-value":this.hasValue(),"input-has-focus":this.hasFocus()})}onInput(t){t.target&&(this.value=t.target&&t.target.value||""),this.ionInput.emit(t)}onBlur(){this.focusChanged(),this.emitStyle(),this.ionBlur.emit()}onFocus(){this.focusChanged(),this.emitStyle(),this.ionFocus.emit()}focusChanged(){this.clearOnEdit&&!this.hasFocus()&&this.hasValue()&&(this.didBlurAfterEdit=!0)}inputKeydown(){this.checkClearOnEdit()}checkClearOnEdit(){this.clearOnEdit&&(this.didBlurAfterEdit&&this.hasValue()&&this.clearTextInput(),this.didBlurAfterEdit=!1)}clearTextInput(){this.value=""}hasFocus(){return this.nativeInput===document.activeElement}hasValue(){return""!==this.value}render(){const e=a(this.mode,this.color,"native-input");return[t("input",{ref:t=>this.nativeInput=t,"aria-disabled":!!this.disabled&&"true",accept:this.accept,autoCapitalize:this.autocapitalize,autoComplete:this.autocomplete,autoCorrect:this.autocorrect,autoFocus:this.autofocus,class:e,disabled:this.disabled,inputMode:this.inputmode,min:this.min,max:this.max,minLength:this.minlength,maxLength:this.maxlength,multiple:this.multiple,name:this.name,pattern:this.pattern,placeholder:this.placeholder,results:this.results,readOnly:this.readonly,required:this.required,spellCheck:this.spellcheck,step:this.step,size:this.size,type:this.type,value:this.value,onInput:this.onInput.bind(this),onBlur:this.onBlur.bind(this),onFocus:this.onFocus.bind(this),onKeyDown:this.inputKeydown.bind(this)}),t("button",{type:"button",class:"input-clear-icon",hidden:!this.clearInput,onClick:this.clearTextInput.bind(this),onMouseDown:this.clearTextInput.bind(this)})]}static get is(){return"ion-input"}static get host(){return{theme:"input"}}static get properties(){return{accept:{type:String,attr:"accept"},autocapitalize:{type:String,attr:"autocapitalize"},autocomplete:{type:String,attr:"autocomplete"},autocorrect:{type:String,attr:"autocorrect"},autofocus:{type:Boolean,attr:"autofocus"},clearInput:{type:Boolean,attr:"clear-input"},clearOnEdit:{type:Boolean,attr:"clear-on-edit",mutable:!0},debounce:{type:Number,attr:"debounce",watchCallbacks:["debounceChanged"]},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},el:{elementRef:!0},inputmode:{type:String,attr:"inputmode"},max:{type:String,attr:"max"},maxlength:{type:Number,attr:"maxlength"},min:{type:String,attr:"min"},minlength:{type:Number,attr:"minlength"},multiple:{type:Boolean,attr:"multiple"},name:{type:String,attr:"name"},pattern:{type:String,attr:"pattern"},placeholder:{type:String,attr:"placeholder"},readonly:{type:Boolean,attr:"readonly"},required:{type:Boolean,attr:"required"},results:{type:Number,attr:"results"},size:{type:Number,attr:"size"},spellcheck:{type:Boolean,attr:"spellcheck"},step:{type:String,attr:"step"},type:{type:String,attr:"type"},value:{type:String,attr:"value",mutable:!0,watchCallbacks:["valueChanged"]}}}static get events(){return[{name:"ionInput",method:"ionInput",bubbles:!0,cancelable:!0,composed:!0},{name:"ionChange",method:"ionChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStyle",method:"ionStyle",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionInputDidLoad",method:"ionInputDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionInputDidUnload",method:"ionInputDidUnload",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".input{position:relative;display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:100%}.item-input .input{position:static}.native-input{-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none;border-radius:0;display:inline-block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;width:92%;width:calc(100% - 10px);border:0;background:0 0}.native-input:active,.native-input:focus{outline:0}.native-input[disabled]{opacity:.4}input.native-input:-webkit-autofill{background-color:transparent}.input-cover{left:0;top:0;position:absolute;width:100%;height:100%}.input[disabled] .input-cover{pointer-events:none}.item-input-has-focus .input-cover{display:none}.item-input-has-focus{pointer-events:none}.item-input-has-focus a,.item-input-has-focus button,.item-input-has-focus input{pointer-events:auto}[next-input]{padding:0;position:absolute;bottom:20px;width:1px;height:1px;border:0;background:0 0;pointer-events:none}.input-clear-icon{margin:0;padding:0;background-position:center;position:absolute;top:0;display:none;height:100%;background-repeat:no-repeat}.item-input-has-focus.item-input-has-value .input-clear-icon{display:block}.native-input-ios{margin:11px 8px 11px 0;padding:0;width:calc(100% - 8px);font-family:-apple-system,BlinkMacSystemFont,\"Helvetica Neue\",Roboto,sans-serif;font-size:inherit}.native-input-ios::-moz-placeholder{color:var(--ion-placeholder-text-ios-color,var(--ion-placeholder-text-color,#999))}.native-input-ios:-ms-input-placeholder{color:var(--ion-placeholder-text-ios-color,var(--ion-placeholder-text-color,#999))}.native-input-ios::-webkit-input-placeholder{text-indent:0;color:var(--ion-placeholder-text-ios-color,var(--ion-placeholder-text-color,#999))}.input-ios .inset-input{padding:5.5px 8px;margin:5.5px 16px 5.5px 0}.label-ios+.input .native-input,.label-ios+.input+.cloned-input{margin-left:16px}.item-ios.item-label-floating .native-input,.item-ios.item-label-stacked .native-input{margin-left:0;margin-top:8px;margin-bottom:8px;width:calc(100% - 8px)}.item-ios.item-label-floating .label-ios+.input+.cloned-input,.item-ios.item-label-stacked .label-ios+.input+.cloned-input{margin-left:0}.input-ios[clear-input]{position:relative}.input-ios[clear-input] .native-input{padding-right:46px}.input-ios .input-clear-icon{right:0;background-image:url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><path%20fill='var(--ion-text-ios-color-step-400,%20var(--ion-text-color-step-400,%20%23666666))'%20d='M403.1,108.9c-81.2-81.2-212.9-81.2-294.2,0s-81.2,212.9,0,294.2c81.2,81.2,212.9,81.2,294.2,0S484.3,190.1,403.1,108.9z%20M352,340.2L340.2,352l-84.4-84.2l-84,83.8L160,339.8l84-83.8l-84-83.8l11.8-11.8l84,83.8l84.4-84.2l11.8,11.8L267.6,256L352,340.2z'/></svg>\");width:30px;background-color:transparent;background-size:18px}"}static get styleMode(){return"ios"}}export{n as IonInput};