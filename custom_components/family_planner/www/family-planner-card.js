"use strict";(()=>{var ft=Object.defineProperty;var br=Object.getOwnPropertyDescriptor;var k=(o,t)=>()=>(o&&(t=o(o=0)),t);var $r=(o,t)=>{for(var e in t)ft(o,e,{get:t[e],enumerable:!0})};var d=(o,t,e,r)=>{for(var i=r>1?void 0:r?br(t,e):t,n=o.length-1,l;n>=0;n--)(l=o[n])&&(i=(r?l(t,e,i):l(i))||i);return r&&i&&ft(t,e,i),i};var we,Ee,Fe,gt,oe,vt,T,_t,We,qe=k(()=>{we=globalThis,Ee=we.ShadowRoot&&(we.ShadyCSS===void 0||we.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Fe=Symbol(),gt=new WeakMap,oe=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Ee&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=gt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&gt.set(e,t))}return t}toString(){return this.cssText}},vt=o=>new oe(typeof o=="string"?o:o+"",void 0,Fe),T=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((r,i,n)=>r+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new oe(e,o,Fe)},_t=(o,t)=>{if(Ee)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),i=we.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,o.appendChild(r)}},We=Ee?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return vt(e)})(o):o});var xr,wr,Er,kr,Tr,Cr,ke,yt,Sr,Dr,ne,se,Te,bt,N,ae=k(()=>{qe();qe();({is:xr,defineProperty:wr,getOwnPropertyDescriptor:Er,getOwnPropertyNames:kr,getOwnPropertySymbols:Tr,getPrototypeOf:Cr}=Object),ke=globalThis,yt=ke.trustedTypes,Sr=yt?yt.emptyScript:"",Dr=ke.reactiveElementPolyfillSupport,ne=(o,t)=>o,se={toAttribute(o,t){switch(t){case Boolean:o=o?Sr:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},Te=(o,t)=>!xr(o,t),bt={attribute:!0,type:String,converter:se,reflect:!1,useDefault:!1,hasChanged:Te};Symbol.metadata??=Symbol("metadata"),ke.litPropertyMetadata??=new WeakMap;N=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=bt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&wr(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){let{get:i,set:n}=Er(this.prototype,t)??{get(){return this[e]},set(l){this[e]=l}};return{get:i,set(l){let p=i?.call(this);n?.call(this,l),this.requestUpdate(t,p,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??bt}static _$Ei(){if(this.hasOwnProperty(ne("elementProperties")))return;let t=Cr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ne("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ne("properties"))){let e=this.properties,r=[...kr(e),...Tr(e)];for(let i of r)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let i of r)e.unshift(We(i))}else t!==void 0&&e.push(We(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _t(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){let n=(r.converter?.toAttribute!==void 0?r.converter:se).toAttribute(e,r.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=r.getPropertyOptions(i),l=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:se;this._$Em=i;let p=l.fromAttribute(e,n.type);this[i]=p??this._$Ej?.get(i)??p,this._$Em=null}}requestUpdate(t,e,r,i=!1,n){if(t!==void 0){let l=this.constructor;if(i===!1&&(n=this[t]),r??=l.getPropertyOptions(t),!((r.hasChanged??Te)(n,e)||r.useDefault&&r.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(l._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:n},l){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,l??e??this[t]),n!==!0||l!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,n]of r){let{wrapped:l}=n,p=this[i];l!==!0||this._$AL.has(i)||p===void 0||this.C(i,void 0,n,p)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[ne("elementProperties")]=new Map,N[ne("finalized")]=new Map,Dr?.({ReactiveElement:N}),(ke.reactiveElementVersions??=[]).push("2.1.2")});function It(o,t){if(!Ze(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return xt!==void 0?xt.createHTML(t):t}function Z(o,t,e=o,r){if(t===B)return t;let i=r!==void 0?e._$Co?.[r]:e._$Cl,n=ce(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,e,r)),r!==void 0?(e._$Co??=[])[r]=i:e._$Cl=i),i!==void 0&&(t=Z(o,i._$AS(o,t.values),i,r)),t}var Je,$t,Ce,xt,St,F,Dt,Ar,V,de,ce,Ze,Ir,Ve,le,wt,Et,W,kt,Tt,At,Qe,s,di,ci,B,c,Ct,q,Rr,pe,Be,he,Q,je,Ye,Ke,Ge,Mr,Rt,Se=k(()=>{Je=globalThis,$t=o=>o,Ce=Je.trustedTypes,xt=Ce?Ce.createPolicy("lit-html",{createHTML:o=>o}):void 0,St="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,Dt="?"+F,Ar=`<${Dt}>`,V=document,de=()=>V.createComment(""),ce=o=>o===null||typeof o!="object"&&typeof o!="function",Ze=Array.isArray,Ir=o=>Ze(o)||typeof o?.[Symbol.iterator]=="function",Ve=`[ 	
\f\r]`,le=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wt=/-->/g,Et=/>/g,W=RegExp(`>|${Ve}(?:([^\\s"'>=/]+)(${Ve}*=${Ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),kt=/'/g,Tt=/"/g,At=/^(?:script|style|textarea|title)$/i,Qe=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),s=Qe(1),di=Qe(2),ci=Qe(3),B=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),Ct=new WeakMap,q=V.createTreeWalker(V,129);Rr=(o,t)=>{let e=o.length-1,r=[],i,n=t===2?"<svg>":t===3?"<math>":"",l=le;for(let p=0;p<e;p++){let h=o[p],_,w,g=-1,b=0;for(;b<h.length&&(l.lastIndex=b,w=l.exec(h),w!==null);)b=l.lastIndex,l===le?w[1]==="!--"?l=wt:w[1]!==void 0?l=Et:w[2]!==void 0?(At.test(w[2])&&(i=RegExp("</"+w[2],"g")),l=W):w[3]!==void 0&&(l=W):l===W?w[0]===">"?(l=i??le,g=-1):w[1]===void 0?g=-2:(g=l.lastIndex-w[2].length,_=w[1],l=w[3]===void 0?W:w[3]==='"'?Tt:kt):l===Tt||l===kt?l=W:l===wt||l===Et?l=le:(l=W,i=void 0);let m=l===W&&o[p+1].startsWith("/>")?" ":"";n+=l===le?h+Ar:g>=0?(r.push(_),h.slice(0,g)+St+h.slice(g)+F+m):h+F+(g===-2?p:m)}return[It(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},pe=class o{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let n=0,l=0,p=t.length-1,h=this.parts,[_,w]=Rr(t,e);if(this.el=o.createElement(_,r),q.currentNode=this.el.content,e===2||e===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(i=q.nextNode())!==null&&h.length<p;){if(i.nodeType===1){if(i.hasAttributes())for(let g of i.getAttributeNames())if(g.endsWith(St)){let b=w[l++],m=i.getAttribute(g).split(F),E=/([.?@])?(.*)/.exec(b);h.push({type:1,index:n,name:E[2],strings:m,ctor:E[1]==="."?je:E[1]==="?"?Ye:E[1]==="@"?Ke:Q}),i.removeAttribute(g)}else g.startsWith(F)&&(h.push({type:6,index:n}),i.removeAttribute(g));if(At.test(i.tagName)){let g=i.textContent.split(F),b=g.length-1;if(b>0){i.textContent=Ce?Ce.emptyScript:"";for(let m=0;m<b;m++)i.append(g[m],de()),q.nextNode(),h.push({type:2,index:++n});i.append(g[b],de())}}}else if(i.nodeType===8)if(i.data===Dt)h.push({type:2,index:n});else{let g=-1;for(;(g=i.data.indexOf(F,g+1))!==-1;)h.push({type:7,index:n}),g+=F.length-1}n++}}static createElement(t,e){let r=V.createElement("template");return r.innerHTML=t,r}};Be=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??V).importNode(e,!0);q.currentNode=i;let n=q.nextNode(),l=0,p=0,h=r[0];for(;h!==void 0;){if(l===h.index){let _;h.type===2?_=new he(n,n.nextSibling,this,t):h.type===1?_=new h.ctor(n,h.name,h.strings,this,t):h.type===6&&(_=new Ge(n,this,t)),this._$AV.push(_),h=r[++p]}l!==h?.index&&(n=q.nextNode(),l++)}return q.currentNode=V,i}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},he=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),ce(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==B&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ir(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&ce(this._$AH)?this._$AA.nextSibling.data=t:this.T(V.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=pe.createElement(It(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new Be(i,this),l=n.u(this.options);n.p(e),this.T(l),this._$AH=n}}_$AC(t){let e=Ct.get(t.strings);return e===void 0&&Ct.set(t.strings,e=new pe(t)),e}k(t){Ze(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,i=0;for(let n of t)i===e.length?e.push(r=new o(this.O(de()),this.O(de()),this,this.options)):r=e[i],r._$AI(n),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=$t(t).nextSibling;$t(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=c}_$AI(t,e=this,r,i){let n=this.strings,l=!1;if(n===void 0)t=Z(this,t,e,0),l=!ce(t)||t!==this._$AH&&t!==B,l&&(this._$AH=t);else{let p=t,h,_;for(t=n[0],h=0;h<n.length-1;h++)_=Z(this,p[r+h],e,h),_===B&&(_=this._$AH[h]),l||=!ce(_)||_!==this._$AH[h],_===c?t=c:t!==c&&(t+=(_??"")+n[h+1]),this._$AH[h]=_}l&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},je=class extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},Ye=class extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},Ke=class extends Q{constructor(t,e,r,i,n){super(t,e,r,i,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??c)===B)return;let r=this._$AH,i=t===c&&r!==c||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==c&&(r===c||i);i&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ge=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}},Mr=Je.litHtmlPolyfillSupport;Mr?.(pe,he),(Je.litHtmlVersions??=[]).push("3.3.3");Rt=(o,t,e)=>{let r=e?.renderBefore??t,i=r._$litPart$;if(i===void 0){let n=e?.renderBefore??null;r._$litPart$=i=new he(t.insertBefore(de(),n),n,void 0,e??{})}return i._$AI(o),i}});var Xe,$,Lr,Mt=k(()=>{ae();ae();Se();Se();Xe=globalThis,$=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};$._$litElement$=!0,$.finalized=!0,Xe.litElementHydrateSupport?.({LitElement:$});Lr=Xe.litElementPolyfillSupport;Lr?.({LitElement:$});(Xe.litElementVersions??=[]).push("4.2.2")});var Lt=k(()=>{});var C=k(()=>{ae();Se();Mt();Lt()});var D,Ht=k(()=>{D=o=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,t)}):customElements.define(o,t)}});function f(o){return(t,e)=>typeof e=="object"?Pr(o,t,e):((r,i,n)=>{let l=i.hasOwnProperty(n);return i.constructor.createProperty(n,r),l?Object.getOwnPropertyDescriptor(i,n):void 0})(o,t,e)}var Hr,Pr,et=k(()=>{ae();Hr={attribute:!0,type:String,converter:se,reflect:!1,hasChanged:Te},Pr=(o=Hr,t,e)=>{let{kind:r,metadata:i}=e,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),r==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(e.name,o),r==="accessor"){let{name:l}=e;return{set(p){let h=t.get.call(this);t.set.call(this,p),this.requestUpdate(l,h,o,!0,p)},init(p){return p!==void 0&&this.C(l,void 0,o,p),p}}}if(r==="setter"){let{name:l}=e;return function(p){let h=this[l];t.call(this,p),this.requestUpdate(l,h,o,!0,p)}}throw Error("Unsupported decorator location: "+r)}});function u(o){return f({...o,state:!0,attribute:!1})}var Pt=k(()=>{et();});var Ot=k(()=>{});var X=k(()=>{});var Nt=k(()=>{X();});var Ut=k(()=>{X();});var zt=k(()=>{X();});var Ft=k(()=>{X();});var Wt=k(()=>{X();});var U=k(()=>{Ht();et();Pt();Ot();Nt();Ut();zt();Ft();Wt()});var Le,pt=k(()=>{"use strict";Le={default_view:"week",show_filters:!0,show_search:!0,show_add_button:!0,allow_edit:!0,show_done_events:!0,show_cancelled_events:!1,show_weekends:!0,show_week_numbers:!0,start_hour:6,end_hour:22,time_step:30,time_format:"auto",max_events_per_day:3,agenda_days:14,dim_past_events:!0,color_mode:"person",compact:!1,show_now_line:!0,highlight_today:!0,read_only:!1,first_weekday:"monday"}});var _r={};$r(_r,{FamilyPlannerCardEditor:()=>G});var ei,ti,G,yr=k(()=>{"use strict";C();U();pt();ei={title:"Titel",default_view:"Standardansicht",show_filters:"Filterleiste anzeigen",show_search:"Suchfeld anzeigen",show_add_button:"Plus-Schaltfl\xE4che anzeigen",allow_edit:"Erstellen/Bearbeiten erlauben",read_only:"Nur-Lesen-Modus (Kiosk)",show_done_events:"Erledigte Termine anzeigen",show_cancelled_events:"Abgesagte Termine anzeigen",show_weekends:"Wochenenden anzeigen",show_week_numbers:"Kalenderwochen anzeigen",start_hour:"Startstunde",end_hour:"Endstunde",time_step:"Zeitschritt (Minuten)",time_format:"Zeitformat",max_events_per_day:"Max. Termine pro Tag (Monatsansicht)",agenda_days:"Agenda-Zeitraum (Tage)",dim_past_events:"Vergangene Termine abdunkeln",color_mode:"Farbmodus",compact:"Kompakter Modus",show_now_line:"\u201EJetzt\u201C-Linie anzeigen",highlight_today:"Heutiges Datum hervorheben",first_weekday:"Erster Wochentag"},ti=[{name:"title",selector:{text:{}}},{name:"default_view",selector:{select:{options:["today","day","week","month","agenda"],mode:"dropdown"}}},{type:"grid",name:"",schema:[{name:"show_filters",selector:{boolean:{}}},{name:"show_search",selector:{boolean:{}}},{name:"show_add_button",selector:{boolean:{}}},{name:"allow_edit",selector:{boolean:{}}},{name:"read_only",selector:{boolean:{}}},{name:"show_done_events",selector:{boolean:{}}},{name:"show_cancelled_events",selector:{boolean:{}}},{name:"show_weekends",selector:{boolean:{}}},{name:"show_week_numbers",selector:{boolean:{}}},{name:"dim_past_events",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}},{name:"show_now_line",selector:{boolean:{}}},{name:"highlight_today",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"start_hour",selector:{number:{min:0,max:23,mode:"box"}}},{name:"end_hour",selector:{number:{min:1,max:24,mode:"box"}}},{name:"time_step",selector:{number:{min:5,max:60,step:5,mode:"box"}}},{name:"max_events_per_day",selector:{number:{min:1,max:10,mode:"box"}}},{name:"agenda_days",selector:{number:{min:1,max:60,mode:"box"}}}]},{name:"time_format",selector:{select:{options:["auto","12","24"],mode:"dropdown"}}},{name:"color_mode",selector:{select:{options:["person","category"],mode:"dropdown"}}},{name:"first_weekday",selector:{select:{options:["monday","sunday"],mode:"dropdown"}}}],G=class extends ${constructor(){super(...arguments);this._computeLabel=e=>ei[e.name]??e.name}setConfig(e){this._config={...Le,...e,type:e.type}}_valueChanged(e){e.stopPropagation(),this._config=e.detail.value,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}render(){return!this.hass||!this._config?c:s`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ti}
        .computeLabel=${this._computeLabel}
        @value-changed=${e=>this._valueChanged(e)}
      ></ha-form>
    `}};d([f({attribute:!1})],G.prototype,"hass",2),d([u()],G.prototype,"_config",2),G=d([D("family-planner-card-editor")],G)});C();U();var ue=class extends Error{constructor(t){super(t.message),this.code=t.code,this.current=t.current}};async function A(o,t){let e=await o.callWS(t);if(e&&typeof e=="object"&&"error"in e&&e.error)throw new ue(e.error);return e}function qt(o){return A(o,{type:"family_planner/config"})}async function Vt(o,t){return(await A(o,{type:"family_planner/events/get",...t})).events}async function Bt(o,t){return(await A(o,{type:"family_planner/events/create",...t})).event}async function tt(o,t){return(await A(o,{type:"family_planner/events/update",...t})).event}async function jt(o,t,e="series",r){await A(o,{type:"family_planner/events/delete",event_id:t,mode:e,occurrence_start:r})}async function Yt(o,t,e,r){return(await A(o,{type:"family_planner/events/duplicate",event_id:t,start:e,end:r})).event}async function rt(o){return(await A(o,{type:"family_planner/people/list"})).people}async function Kt(o,t){return(await A(o,{type:"family_planner/people/create",...t})).person}async function it(o,t,e){return(await A(o,{type:"family_planner/people/update",person_id:t,...e})).person}async function Gt(o,t,e,r){await A(o,{type:"family_planner/people/delete",person_id:t,strategy:e,reassign_to:r})}async function Jt(o,t){return(await A(o,{type:"family_planner/people/reorder",ordered_ids:t})).people}async function ot(o){return(await A(o,{type:"family_planner/categories/list"})).categories}async function Zt(o,t){return(await A(o,{type:"family_planner/categories/create",...t})).category}async function nt(o,t,e){return(await A(o,{type:"family_planner/categories/update",category_id:t,...e})).category}async function Qt(o,t){await A(o,{type:"family_planner/categories/delete",category_id:t})}async function Xt(o,t){return(await A(o,{type:"family_planner/categories/reorder",ordered_ids:t})).categories}C();var er=T`
  :host {
    display: block;
  }

  ha-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  .fp-loading {
    padding: 32px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .fp-banner {
    padding: 8px 16px;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .fp-banner-error {
    background: rgba(var(--rgb-error-color, 244, 67, 54), 0.12);
    color: var(--error-color, #db4437);
  }
  .fp-banner button {
    background: none;
    border: 1px solid currentColor;
    border-radius: 4px;
    color: inherit;
    padding: 2px 10px;
  }

  .fp-header {
    padding: 12px 16px 8px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .fp-header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .fp-title {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .fp-header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .fp-fab {
    width: 44px;
    height: 44px;
    min-width: 44px;
    border-radius: 50%;
    border: none;
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  .fp-fab:focus-visible,
  button:focus-visible,
  input:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  .fp-header-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
  }

  .fp-view-switch {
    display: flex;
    background: var(--secondary-background-color, #f0f0f0);
    border-radius: 8px;
    padding: 2px;
    gap: 2px;
  }
  .fp-view-switch button {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 0.85rem;
    min-height: 32px;
  }
  .fp-view-switch button.active {
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font-weight: 600;
  }

  .fp-nav-arrows {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .fp-nav-today {
    border: 1px solid var(--divider-color, #e0e0e0);
    background: transparent;
    color: var(--primary-text-color);
    border-radius: 6px;
    padding: 6px 10px;
    min-height: 32px;
  }

  .fp-range-label {
    color: var(--secondary-text-color);
    font-size: 0.9rem;
    margin-left: auto;
  }

  .fp-search {
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    padding: 8px 12px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font-size: 0.9rem;
    min-height: 40px;
  }

  .fp-search-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .fp-search-row .fp-search {
    flex: 1;
    min-width: 160px;
  }
  .fp-filter-toggle {
    display: flex;
    align-items: center;
    gap: 4px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    border-radius: 8px;
    padding: 8px 12px;
    min-height: 40px;
    font-size: 0.85rem;
  }
  .fp-filter-toggle.active {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  .fp-filter-badge {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-radius: 999px;
    font-size: 0.65rem;
    line-height: 1;
    min-width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
  }

  .fp-filterbar {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  /* Chip background always mixes in a bit of --divider-color rather than
     relying on --secondary-background-color/--card-background-color alone,
     which can end up matching the surrounding surface (and thus be
     invisible) in some themes - see the dark-theme contrast fixes in the
     event dialog's FORM_STYLES for the same reasoning applied there. */
  .fp-person-chip,
  .fp-category-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 2px solid var(--divider-color, #767676);
    background: color-mix(in srgb, var(--card-background-color, #fff) 70%, var(--divider-color, #767676) 30%);
    color: var(--primary-text-color);
    border-radius: 16px;
    padding: 6px 12px;
    min-height: 36px;
    font-size: 0.85rem;
  }
  .fp-person-chip.active,
  .fp-category-chip.active {
    border-color: var(--fp-chip-color, var(--primary-color));
    background: color-mix(in srgb, var(--fp-chip-color, var(--primary-color)) 24%, var(--card-background-color, #fff));
    font-weight: 600;
  }
  .fp-person-chip-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }
  .fp-person-chip-all.active {
    border-color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 24%, var(--card-background-color, #fff));
    font-weight: 600;
  }

  .fp-body {
    flex: 1;
    overflow: auto;
    padding: 8px 12px 16px;
  }

  /* ---- empty state ---- */
  .fp-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 48px 16px;
    color: var(--secondary-text-color);
    text-align: center;
  }
  .fp-empty-state ha-icon {
    --mdc-icon-size: 48px;
    color: var(--disabled-text-color);
  }
  .fp-empty-title {
    font-size: 1.1rem;
    color: var(--primary-text-color);
  }

  /* ---- shared chip (month cells / all-day row) ---- */
  .fp-chip {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    border: none;
    border-radius: 6px;
    padding: 3px 6px;
    font-size: 0.78rem;
    text-align: left;
    overflow: hidden;
    min-height: 22px;
  }
  .fp-chip-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
  .fp-chip-time {
    font-weight: 600;
    opacity: 0.85;
  }
  .fp-chip-icon {
    --mdc-icon-size: 14px;
  }
  .fp-chip.fp-past {
    opacity: 0.5;
  }
  .fp-chip.fp-cancelled {
    text-decoration: line-through;
  }

  .fp-person-dots {
    display: inline-flex;
    margin-left: auto;
  }
  .fp-person-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    color: #fff;
    margin-left: -6px;
    border: 1px solid var(--card-background-color, #fff);
    text-transform: uppercase;
  }
  .fp-person-dot:first-child {
    margin-left: 0;
  }
  .fp-person-dot-more {
    background: var(--disabled-text-color, #9e9e9e);
  }

  /* ---- month view ---- */
  .fp-view-month {
    display: flex;
    flex-direction: column;
    min-width: 640px;
  }
  .fp-month-headerrow,
  .fp-month-week {
    display: grid;
  }
  .fp-month-week {
    border-top: 1px solid var(--divider-color, #e0e0e0);
  }
  .fp-month-weekday {
    padding: 6px 4px;
    text-align: center;
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }
  .fp-month-weeknum-header {
    grid-column: 1;
  }
  .fp-month-weeknum {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 6px;
    font-size: 0.65rem;
    color: var(--disabled-text-color);
  }
  .fp-month-cell {
    min-height: 84px;
    border-right: 1px solid var(--divider-color, #e0e0e0);
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
  }
  .fp-month-cell:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.02));
  }
  .fp-month-cell-date {
    font-size: 0.8rem;
    color: var(--primary-text-color);
    align-self: flex-end;
  }
  .fp-month-cell.fp-today .fp-month-cell-date {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fp-month-cell.fp-outside-month {
    opacity: 0.4;
  }
  .fp-month-cell-events {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .fp-month-more {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 0.72rem;
    text-align: left;
    padding: 2px 4px;
  }

  /* ---- time grid (day/week) ---- */
  .fp-timegrid {
    min-width: 480px;
  }
  .fp-timegrid-header,
  .fp-allday-row {
    display: flex;
  }
  .fp-time-gutter {
    width: 52px;
    flex-shrink: 0;
  }
  .fp-time-gutter-label {
    font-size: 0.65rem;
    color: var(--secondary-text-color);
    display: flex;
    align-items: center;
  }
  .fp-day-header {
    flex: 1;
    text-align: center;
    padding: 4px 2px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }
  .fp-day-header-weekday {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
  }
  .fp-day-header-date {
    font-size: 0.95rem;
    color: var(--primary-text-color);
  }
  .fp-day-header.fp-today .fp-day-header-date {
    color: var(--primary-color);
    font-weight: 700;
  }
  .fp-allday-row {
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    padding: 2px 0;
  }
  .fp-allday-cell {
    flex: 1;
    min-height: 24px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 2px;
    cursor: pointer;
  }
  .fp-timegrid-scroll {
    display: flex;
    position: relative;
  }
  .fp-time-gutter-col {
    width: 52px;
    flex-shrink: 0;
    position: relative;
  }
  .fp-hour-label {
    font-size: 0.65rem;
    color: var(--secondary-text-color);
    border-top: 1px solid var(--divider-color, #eee);
    padding-left: 4px;
    box-sizing: border-box;
  }
  .fp-day-col {
    flex: 1;
    position: relative;
    border-left: 1px solid var(--divider-color, #e0e0e0);
  }
  .fp-hour-line {
    position: absolute;
    left: 0;
    right: 0;
    border-top: 1px solid var(--divider-color, #eee);
  }
  .fp-timed-event-slot {
    position: absolute;
    padding: 0 1px;
  }
  .fp-timed-event-slot .fp-chip {
    height: 100%;
    align-items: flex-start;
    flex-direction: column;
  }
  .fp-now-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--error-color, #db4437);
    z-index: 2;
  }
  .fp-now-line::before {
    content: "";
    position: absolute;
    left: -4px;
    top: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--error-color, #db4437);
  }

  .fp-week-number {
    font-size: 0.75rem;
    color: var(--disabled-text-color);
    padding: 0 0 4px 52px;
  }

  /* ---- week view (vertically stacked day sections) ---- */
  .fp-view-week {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .fp-week-day-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .fp-week-day-header {
    display: flex;
    flex: none;
    align-items: center;
    gap: 8px;
    text-align: left;
    padding: 4px 4px;
  }
  .fp-week-day-header .fp-day-header-weekday {
    font-weight: 600;
  }
  .fp-week-day-header .fp-day-header-date {
    color: var(--secondary-text-color);
  }
  .fp-week-day-header.fp-today .fp-day-header-weekday,
  .fp-week-day-header.fp-today .fp-day-header-date {
    color: var(--primary-color);
    font-weight: 700;
  }
  .fp-week-day-add {
    margin-left: auto;
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    min-width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fp-week-day-add:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
  }
  .fp-week-day-empty {
    color: var(--disabled-text-color);
    font-size: 0.82rem;
    padding: 0 4px 6px;
  }
  .fp-week-day-items {
    padding: 0 4px;
  }

  /* ---- agenda view ---- */
  .fp-agenda-group {
    margin-bottom: 12px;
  }
  .fp-agenda-daylabel {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--secondary-text-color);
    padding: 4px 0;
    position: sticky;
    top: 0;
    background: var(--card-background-color, #fff);
  }
  .fp-agenda-daylabel.fp-today {
    color: var(--primary-color);
  }
  .fp-agenda-items {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .fp-agenda-item {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
    border-radius: 8px;
    padding: 10px 12px;
    min-height: 44px;
    text-align: left;
  }
  .fp-agenda-item.fp-cancelled .fp-agenda-item-title {
    text-decoration: line-through;
    color: var(--disabled-text-color);
  }
  .fp-agenda-item-bar {
    width: 4px;
    align-self: stretch;
    border-radius: 2px;
  }
  .fp-agenda-item-time {
    font-variant-numeric: tabular-nums;
    min-width: 52px;
    color: var(--secondary-text-color);
    font-size: 0.85rem;
  }
  .fp-agenda-item-title {
    flex: 1;
    color: var(--primary-text-color);
  }
  .fp-agenda-item-location {
    display: flex;
    align-items: center;
    gap: 2px;
    color: var(--secondary-text-color);
    font-size: 0.78rem;
  }
  .fp-agenda-item-location ha-icon {
    --mdc-icon-size: 14px;
  }
  .fp-agenda-item-status {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    padding: 1px 6px;
  }

  .fp-compact .fp-agenda-item {
    padding: 6px 10px;
    min-height: 32px;
  }

  @media (max-width: 600px) {
    .fp-header-top {
      flex-wrap: wrap;
    }
    .fp-range-label {
      margin-left: 0;
      width: 100%;
      order: 3;
    }
    .fp-month-cell {
      min-height: 64px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
    }
  }
`;var tr=[0,5,15,30,60,1440],z=["#e53935","#1e88e5","#43a047","#fb8c00","#8e24aa","#00acc1","#fdd835","#6d4c41","#3949ab","#d81b60"],j=["mdi:calendar","mdi:school","mdi:briefcase","mdi:soccer","mdi:cake-variant","mdi:medical-bag","mdi:home","mdi:airplane","mdi:music","mdi:star"],me=60;var R=o=>String(o).padStart(2,"0");function fe(o){return`${o.getFullYear()}-${R(o.getMonth()+1)}-${R(o.getDate())}`}function Or(o){let t=-o.getTimezoneOffset(),e=t>=0?"+":"-",r=R(Math.floor(Math.abs(t)/60)),i=R(Math.abs(t)%60);return`${o.getFullYear()}-${R(o.getMonth()+1)}-${R(o.getDate())}T${R(o.getHours())}:${R(o.getMinutes())}:${R(o.getSeconds())}${e}${r}:${i}`}function rr(o,t){let[e,r]=(t||"00:00").split(":").map(Number),[i,n,l]=o.split("-").map(Number);return new Date(i,(n||1)-1,l||1,e||0,r||0,0)}function at(o,t){return Or(rr(o,t))}function Ae(o){return`${R(o.getHours())}:${R(o.getMinutes())}`}function ir(o,t,e){let r=rr(o,t);return r.setMinutes(r.getMinutes()+e),{date:fe(r),time:Ae(r)}}function lt(o,t){let[e,r,i]=o.split("-").map(Number),n=new Date(e,(r||1)-1,i||1,12,0,0);return n.setDate(n.getDate()+t),fe(n)}function x(o,t){let e=new Date(o);return e.setDate(e.getDate()+t),e}function ee(o,t){let e=new Date(o);e.setHours(0,0,0,0);let r=e.getDay(),i=t==="monday"?r===0?6:r-1:r;return x(e,-i)}function Ie(o,t){let e=new Date(o.getFullYear(),o.getMonth(),1);return ee(e,t)}function S(o,t){return o.getFullYear()===t.getFullYear()&&o.getMonth()===t.getMonth()&&o.getDate()===t.getDate()}function or(o,t){if(t==="24")return!0;if(t==="12")return!1;let e=o.locale?.time_format;if(e==="24")return!0;if(e==="12")return!1;try{return!new Intl.DateTimeFormat(o.language||"en",{hour:"numeric"}).formatToParts(new Date(2e3,0,1,13)).some(i=>i.type==="dayPeriod")}catch{return!0}}function ge(o,t){if(t)return`${R(o.getHours())}:${R(o.getMinutes())}`;let e=o.getHours()%12||12,r=o.getHours()<12?"AM":"PM";return`${e}:${R(o.getMinutes())} ${r}`}function Re(o){let t=new Date(Date.UTC(o.getFullYear(),o.getMonth(),o.getDate())),e=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-e);let r=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-r.getTime())/864e5+1)/7)}function Me(o,t){if(t)return t;let e=o.locale?.first_weekday;return e==="monday"||e==="sunday"?e:"monday"}function dt(o,t){let e;return(...r)=>{e&&clearTimeout(e),e=setTimeout(()=>o(...r),t)}}function nr(o,t){let e=o;t.showDoneEvents||(e=e.filter(i=>i.status!=="done")),t.showCancelledEvents||(e=e.filter(i=>i.status!=="cancelled")),t.personIds.length>0&&(e=e.filter(i=>i.person_ids.some(n=>t.personIds.includes(n)))),t.categoryIds.length>0&&(e=e.filter(i=>i.category_id!==null&&t.categoryIds.includes(i.category_id)));let r=t.search.trim().toLowerCase();return r&&(e=e.filter(i=>[i.title,i.subtitle,i.description,i.location].filter(n=>!!n).some(n=>n.toLowerCase().includes(r)))),[...e]}var Nr={"view.today":"Heute","view.day":"Tag","view.week":"Woche","view.month":"Monat","view.agenda":"Agenda","nav.today":"Heute","nav.prev":"Zur\xFCck","nav.next":"Weiter","action.add_event":"Termin hinzuf\xFCgen","action.search":"Suchen","action.filter":"Filter","action.save":"Speichern","action.cancel":"Abbrechen","action.delete":"L\xF6schen","action.edit":"Bearbeiten","action.duplicate":"Duplizieren","action.close":"Schlie\xDFen","action.done":"Fertig","action.mark_done":"Als erledigt markieren","action.manage_people":"Personen verwalten","action.manage_categories":"Kategorien verwalten","action.export":"Als JSON exportieren","action.import":"JSON importieren","event.title":"Titel","event.subtitle":"Untertitel","event.start_date":"Startdatum","event.start_time":"Startzeit","event.end_date":"Enddatum","event.end_time":"Endzeit","event.all_day":"Ganzt\xE4gig","event.people":"Personen","event.description":"Beschreibung","event.location":"Ort","event.category":"Kategorie","event.color":"Farbe","event.icon":"Symbol","event.palette_hint":"Die Palette wird in den Integrationseinstellungen verwaltet (Einstellungen \u2192 Ger\xE4te & Dienste \u2192 Family Planner \u2192 Konfigurieren).","event.status":"Status","event.reminders":"Erinnerungen","event.repeat":"Wiederholung","event.repeat_none":"Keine Wiederholung","event.new_title":"Neuer Termin","event.edit_title":"Termin bearbeiten","event.no_people":"Keine Person zugewiesen","status.planned":"Geplant","status.confirmed":"Best\xE4tigt","status.tentative":"Optional","status.done":"Erledigt","status.cancelled":"Abgesagt","validation.title_required":"Bitte einen Titel eingeben.","validation.end_before_start":"Das Ende darf nicht vor dem Start liegen.","validation.person_required":"Bitte mindestens eine Person ausw\xE4hlen.","empty.no_events":"Keine Termine","empty.no_events_hint":"F\xFCr diesen Zeitraum sind keine Termine vorhanden. Tippe auf +, um einen Termin zu erstellen.","empty.no_events_short":"Keine Termine","empty.no_matches":"Keine passenden Termine gefunden.","month.more":"+{count} weitere","dialog.confirm_delete_title":"Termin l\xF6schen?","dialog.confirm_delete_series":"Ganze Serie l\xF6schen","dialog.confirm_delete_instance":"Nur diesen Termin l\xF6schen","dialog.unsaved_changes_title":"Ungespeicherte \xC4nderungen","dialog.unsaved_changes_message":"Es gibt ungespeicherte \xC4nderungen. Trotzdem schlie\xDFen?","dialog.discard":"Verwerfen","dialog.keep_editing":"Weiter bearbeiten","people.title":"Personen","people.add":"Person hinzuf\xFCgen","people.name":"Name","people.color":"Farbe","people.role":"Rolle","people.role.parent":"Elternteil","people.role.child":"Kind","people.role.other":"Sonstige","people.active":"Aktiv","people.delete_title":"Person l\xF6schen?","people.delete_strategy.deactivate":"Nur deaktivieren","people.delete_strategy.remove_from_events":"Aus Terminen entfernen","people.delete_strategy.reassign":"Terminen einer anderen Person zuweisen","people.delete_strategy.keep_unassigned":"Termine ohne Personenzuweisung behalten","people.reassign_to":"Neu zuweisen an","category.title":"Kategorien","category.add":"Kategorie hinzuf\xFCgen","category.name":"Name","category.color":"Farbe","category.none":"Keine Kategorie","filter.all_people":"Alle Personen","filter.search_placeholder":"Termine durchsuchen\u2026","error.connection_lost":"Verbindung zu Home Assistant verloren. Es wird versucht, erneut zu verbinden\u2026","error.forbidden":"Keine Berechtigung f\xFCr diese Aktion.","error.conflict":"Dieser Termin wurde inzwischen auf einem anderen Ger\xE4t ge\xE4ndert.","error.not_found":"Dieser Termin existiert nicht mehr.","error.invalid_data":"Ung\xFCltige Eingabe.","error.not_loaded":"Family Planner wird noch geladen\u2026","error.unknown_error":"Unbekannter Fehler.","error.reload":"Neu laden","reminder.at_start":"Zum Startzeitpunkt","reminder.5":"5 Minuten vorher","reminder.15":"15 Minuten vorher","reminder.30":"30 Minuten vorher","reminder.60":"1 Stunde vorher","reminder.1440":"1 Tag vorher","reminder.custom":"Eigener Wert (Minuten)","weekday.short.0":"So","weekday.short.1":"Mo","weekday.short.2":"Di","weekday.short.3":"Mi","weekday.short.4":"Do","weekday.short.5":"Fr","weekday.short.6":"Sa",calendar_week_short:"KW"},Ur={"view.today":"Today","view.day":"Day","view.week":"Week","view.month":"Month","view.agenda":"Agenda","nav.today":"Today","nav.prev":"Previous","nav.next":"Next","action.add_event":"Add event","action.search":"Search","action.filter":"Filter","action.save":"Save","action.cancel":"Cancel","action.delete":"Delete","action.edit":"Edit","action.duplicate":"Duplicate","action.close":"Close","action.done":"Done","action.mark_done":"Mark as done","action.manage_people":"Manage people","action.manage_categories":"Manage categories","action.export":"Export as JSON","action.import":"Import JSON","event.title":"Title","event.subtitle":"Subtitle","event.start_date":"Start date","event.start_time":"Start time","event.end_date":"End date","event.end_time":"End time","event.all_day":"All day","event.people":"People","event.description":"Description","event.location":"Location","event.category":"Category","event.color":"Color","event.icon":"Icon","event.palette_hint":"The palette is managed in the integration options (Settings \u2192 Devices & Services \u2192 Family Planner \u2192 Configure).","event.status":"Status","event.reminders":"Reminders","event.repeat":"Repeat","event.repeat_none":"Does not repeat","event.new_title":"New event","event.edit_title":"Edit event","event.no_people":"No one assigned","status.planned":"Planned","status.confirmed":"Confirmed","status.tentative":"Tentative","status.done":"Done","status.cancelled":"Cancelled","validation.title_required":"Please enter a title.","validation.end_before_start":"The end must not be before the start.","validation.person_required":"Please select at least one person.","empty.no_events":"No events","empty.no_events_hint":"There are no events in this range. Tap + to create one.","empty.no_events_short":"No events","empty.no_matches":"No matching events found.","month.more":"+{count} more","dialog.confirm_delete_title":"Delete event?","dialog.confirm_delete_series":"Delete whole series","dialog.confirm_delete_instance":"Delete only this occurrence","dialog.unsaved_changes_title":"Unsaved changes","dialog.unsaved_changes_message":"You have unsaved changes. Close anyway?","dialog.discard":"Discard","dialog.keep_editing":"Keep editing","people.title":"People","people.add":"Add person","people.name":"Name","people.color":"Color","people.role":"Role","people.role.parent":"Parent","people.role.child":"Child","people.role.other":"Other","people.active":"Active","people.delete_title":"Delete person?","people.delete_strategy.deactivate":"Deactivate only","people.delete_strategy.remove_from_events":"Remove from events","people.delete_strategy.reassign":"Reassign events to another person","people.delete_strategy.keep_unassigned":"Keep events without a person assigned","people.reassign_to":"Reassign to","category.title":"Categories","category.add":"Add category","category.name":"Name","category.color":"Color","category.none":"No category","filter.all_people":"All people","filter.search_placeholder":"Search events\u2026","error.connection_lost":"Connection to Home Assistant lost. Reconnecting\u2026","error.forbidden":"You are not allowed to do this.","error.conflict":"This event was changed on another device in the meantime.","error.not_found":"This event no longer exists.","error.invalid_data":"Invalid input.","error.not_loaded":"Family Planner is still loading\u2026","error.unknown_error":"Unknown error.","error.reload":"Reload","reminder.at_start":"At start time","reminder.5":"5 minutes before","reminder.15":"15 minutes before","reminder.30":"30 minutes before","reminder.60":"1 hour before","reminder.1440":"1 day before","reminder.custom":"Custom (minutes)","weekday.short.0":"Sun","weekday.short.1":"Mon","weekday.short.2":"Tue","weekday.short.3":"Wed","weekday.short.4":"Thu","weekday.short.5":"Fri","weekday.short.6":"Sat",calendar_week_short:"W"},ct={de:Nr,en:Ur};function a(o,t,e){let r=(o||"de").split("-")[0],n=(ct[r]||ct.de)[t]??ct.de[t]??t;if(e)for(let[l,p]of Object.entries(e))n=n.replace(`{${l}}`,String(p));return n}pt();C();function zr(o,t){let e=new Date(o.occurrence_start),r=new Date(o.occurrence_end),i=new Date(t.getFullYear(),t.getMonth(),t.getDate()),n=x(i,1);return e<n&&r>i}function te(o,t){return t.map(e=>({day:e,events:o.filter(r=>r.all_day?zr(r,e):S(new Date(r.occurrence_start),e)).sort((r,i)=>r.all_day!==i.all_day?r.all_day?-1:1:new Date(r.occurrence_start).getTime()-new Date(i.occurrence_start).getTime())}))}function sr(o){let t=new Map;for(let e of o){let r=new Date(e.occurrence_start),i=`${r.getFullYear()}-${r.getMonth()}-${r.getDate()}`;t.has(i)||t.set(i,new Date(r.getFullYear(),r.getMonth(),r.getDate()))}return[...t.values()].sort((e,r)=>e.getTime()-r.getTime())}C();function Fr(o){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o.trim());return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:null}function ar(o){let t=Fr(o);if(!t)return"#000000";let[e,r,i]=t.map(l=>{let p=l/255;return p<=.03928?p/12.92:Math.pow((p+.055)/1.055,2.4)});return .2126*e+.7152*r+.0722*i>.42?"#000000":"#ffffff"}function Y(o,t,e,r){if(o.color)return o.color;if(r==="category"&&o.category_id){let i=e.find(n=>n.id===o.category_id);if(i)return i.color}if(o.person_ids.length>0){let i=t.find(n=>n.id===o.person_ids[0]);if(i)return i.color}if(o.category_id){let i=e.find(n=>n.id===o.category_id);if(i)return i.color}return"var(--primary-color, #03a9f4)"}function He(o,t){return o.person_ids.map(e=>t.find(r=>r.id===e)).filter(e=>!!e)}function Pe(o,t=4,e){let r=o.slice(0,t),i=o.length-r.length;return s`
    <span class="fp-person-dots" role="img" aria-label=${o.map(n=>n.name).join(", ")||a(e,"event.no_people")}>
      ${r.map(n=>s`<span class="fp-person-dot" style="background:${n.color}" title=${n.name}>${n.name.slice(0,1)}</span>`)}
      ${i>0?s`<span class="fp-person-dot fp-person-dot-more">+${i}</span>`:c}
    </span>
  `}function Oe(o,t){return o.all_day?"":ge(new Date(o.occurrence_start),t)}function Wr(o,t){return new Date(o.occurrence_end).getTime()<t.getTime()}function ve(o,t,e){let r=Y(t,o.people,o.categories,o.config.color_mode??"person"),i=ar(r),n=He(t,o.people),l=(o.config.dim_past_events??!0)&&Wr(t,o.now),p=t.status==="cancelled",h=["fp-chip",l?"fp-past":"",p?"fp-cancelled":""].filter(Boolean).join(" ");return s`
    <button
      type="button"
      class=${h}
      style="background:${r};color:${i}"
      title=${t.title}
      @click=${_=>{_.stopPropagation(),o.callbacks.onEventClick(t)}}
    >
      ${t.icon?s`<ha-icon icon=${t.icon} class="fp-chip-icon"></ha-icon>`:c}
      ${!t.all_day&&!e?.compact?s`<span class="fp-chip-time">${Oe(t,o.use24h)}</span>`:c}
      <span class="fp-chip-title">${t.title}</span>
      ${n.length>1?Pe(n,3,o.hass.language):c}
    </button>
  `}function qr(o,t){return o?a(t,`status.${o}`):""}function _e(o,t){let e=Y(t,o.people,o.categories,o.config.color_mode??"person"),r=He(t,o.people);return s`
    <button
      type="button"
      class="fp-agenda-item ${t.status==="cancelled"?"fp-cancelled":""}"
      @click=${()=>o.callbacks.onEventClick(t)}
    >
      <span class="fp-agenda-item-bar" style="background:${e}"></span>
      <span class="fp-agenda-item-time"
        >${t.all_day?a(o.hass.language,"event.all_day"):Oe(t,o.use24h)}</span
      >
      <span class="fp-agenda-item-title">${t.title}</span>
      ${t.location?s`<span class="fp-agenda-item-location"><ha-icon icon="mdi:map-marker"></ha-icon>${t.location}</span>`:c}
      ${t.status?s`<span class="fp-agenda-item-status">${qr(t.status,o.hass.language)}</span>`:c}
      ${Pe(r,4,o.hass.language)}
    </button>
  `}function Vr(o,t,e){return s`
    <div class="fp-agenda-group">
      <div class="fp-agenda-daylabel ${S(t,o.now)?"fp-today":""}">
        ${a(o.hass.language,`weekday.short.${t.getDay()}`)} ${t.getDate()}.${t.getMonth()+1}.
      </div>
      <div class="fp-agenda-items">${e.map(r=>_e(o,r))}</div>
    </div>
  `}function lr(o){let t=sr(o.events),e=te(o.events,t).filter(r=>r.events.length>0);return e.length===0?s`
      <div class="fp-empty-state">
        <ha-icon icon="mdi:calendar-search-outline"></ha-icon>
        <div class="fp-empty-title">${a(o.hass.language,"empty.no_matches")}</div>
      </div>
    `:s`
    <div class="fp-view fp-view-list">${e.map(r=>Vr(o,r.day,r.events))}</div>
  `}function dr(o){let t=o.config.agenda_days??14,e=[];for(let i=0;i<t;i++)e.push(x(o.currentDate,i));let r=te(o.events,e).filter(i=>i.events.length>0);return r.length===0?s`
      <div class="fp-empty-state">
        <ha-icon icon="mdi:calendar-blank-outline"></ha-icon>
        <div class="fp-empty-title">${a(o.hass.language,"empty.no_events")}</div>
        <div class="fp-empty-hint">${a(o.hass.language,"empty.no_events_hint")}</div>
      </div>
    `:s`
    <div class="fp-view fp-view-agenda">
      ${r.map(i=>s`
          <div class="fp-agenda-group">
            <div class="fp-agenda-daylabel ${S(i.day,o.now)?"fp-today":""}">
              ${a(o.hass.language,`weekday.short.${i.day.getDay()}`)} ${i.day.getDate()}.${i.day.getMonth()+1}.
            </div>
            <div class="fp-agenda-items">${i.events.map(n=>_e(o,n))}</div>
          </div>
        `)}
    </div>
  `}C();C();function cr(o){if(o.length===0)return[];let t=[...o].sort((p,h)=>p.start!==h.start?p.start-h.start:p.end-h.end),e=[],r=[],i=-1/0,n=[],l=()=>{if(r.length===0)return;let p=Math.max(...r.map(h=>h.lane))+1;for(let h of r)e.push({item:h.item,lane:h.lane,laneCount:p});r=[],n.length=0};for(let p of t){p.start>=i&&(l(),i=-1/0);let h=n.findIndex(_=>_<=p.start);h===-1?(h=n.length,n.push(p.end)):n[h]=p.end,r.push({item:p,lane:h}),i=Math.max(i,p.end)}return l(),e}var pr={compact:32,normal:48};function Br(o){return o.getHours()*60+o.getMinutes()}function hr(o,t){let e=o.config.start_hour??6,r=o.config.end_hour??22,i=o.config.time_step??30,n=o.config.compact?pr.compact:pr.normal,l=(r-e)*60,p=l/i*n,h=[];for(let m=e;m<=r;m++)h.push(m);let _=o.events.filter(m=>m.all_day&&t.some(E=>S(E,new Date(m.occurrence_start)))),w=_.length>0,g=m=>Math.min(Math.max(Br(m)-e*60,0),l)/l*100,b=o.now;return s`
    <div class="fp-timegrid" style="--fp-row-height:${n}px">
      <div class="fp-timegrid-header">
        <div class="fp-time-gutter"></div>
        ${t.map(m=>s`
            <div class="fp-day-header ${S(m,b)?"fp-today":""}">
              <div class="fp-day-header-weekday">${a(o.hass.language,`weekday.short.${m.getDay()}`)}</div>
              <div class="fp-day-header-date">${m.getDate()}.${m.getMonth()+1}.</div>
            </div>
          `)}
      </div>
      ${w?s`
            <div class="fp-allday-row">
              <div class="fp-time-gutter fp-time-gutter-label">${a(o.hass.language,"event.all_day")}</div>
              ${t.map(m=>{let E=_.filter(H=>S(m,new Date(H.occurrence_start)));return s`
                  <div class="fp-allday-cell" @click=${()=>o.callbacks.onSlotClick(m,!0)}>
                    ${E.map(H=>ve(o,H,{compact:!0}))}
                  </div>
                `})}
            </div>
          `:c}
      <div class="fp-timegrid-scroll">
        <div class="fp-time-gutter-col" style="height:${p}px">
          ${h.map(m=>s`<div class="fp-hour-label" style="height:${n*(60/i)}px">
              ${String(m).padStart(2,"0")}:00
            </div>`)}
        </div>
        ${t.map(m=>{let E=o.events.filter(I=>!I.all_day&&S(m,new Date(I.occurrence_start))),H=cr(E.map(I=>({event:I,start:new Date(I.occurrence_start).getTime(),end:new Date(I.occurrence_end).getTime()}))),J=S(m,b)?g(b):null;return s`
            <div
              class="fp-day-col"
              style="height:${p}px"
              @click=${I=>{let Ue=I.currentTarget.getBoundingClientRect(),$e=I.clientY-Ue.top,ze=Math.round($e/p*l/i)*i+e*60,xe=new Date(m);xe.setHours(0,ze,0,0),o.callbacks.onSlotClick(xe,!1)}}
            >
              ${h.slice(0,-1).map((I,be)=>s`<div class="fp-hour-line" style="top:${be*(60/i)*n}px"></div>`)}
              ${H.map(({item:I,lane:be,laneCount:Ue})=>{let $e=g(new Date(I.event.occurrence_start)),ze=g(new Date(I.event.occurrence_end)),xe=Math.max(ze-$e,3),mt=100/Ue;return s`
                  <div
                    class="fp-timed-event-slot"
                    style="top:${$e}%;height:${xe}%;left:${be*mt}%;width:${mt}%"
                  >
                    ${ve(o,I.event)}
                  </div>
                `})}
              ${J!==null&&(o.config.show_now_line??!0)?s`<div class="fp-now-line" style="top:${J}%"></div>`:c}
            </div>
          `})}
      </div>
    </div>
  `}function ur(o){return s`<div class="fp-view fp-view-day">${hr(o,[o.currentDate])}</div>`}C();var jr=6;function mr(o){let t=o.config.show_weekends??!0,e=o.config.show_week_numbers??!0,r=o.config.max_events_per_day??3,i=Ie(o.currentDate,o.firstWeekday),n=o.currentDate.getMonth(),l=[],p=i;for(let g=0;g<jr;g++){let b=[];for(let m=0;m<7;m++){let E=p.getDay();(t||E!==0&&E!==6)&&b.push(p),p=x(p,1)}l.push(b)}let h=l[0].map(g=>a(o.hass.language,`weekday.short.${g.getDay()}`)),_=`${e?"32px ":""}repeat(${l[0].length}, 1fr)`,w=g=>o.events.filter(b=>{let m=new Date(b.occurrence_start),E=new Date(b.occurrence_end),H=new Date(g.getFullYear(),g.getMonth(),g.getDate()),ye=x(H,1);return m<ye&&E>H}).sort((b,m)=>b.all_day!==m.all_day?b.all_day?-1:1:new Date(b.occurrence_start).getTime()-new Date(m.occurrence_start).getTime());return s`
    <div class="fp-view fp-view-month">
      <div class="fp-month-headerrow" style="grid-template-columns:${_}">
        ${e?s`<div class="fp-month-weeknum-header"></div>`:c}
        ${h.map(g=>s`<div class="fp-month-weekday">${g}</div>`)}
      </div>
      ${l.map(g=>s`
          <div class="fp-month-week" style="grid-template-columns:${_}">
            ${e?s`<div class="fp-month-weeknum">${a(o.hass.language,"calendar_week_short")}${Re(g[0])}</div>`:c}
            ${g.map(b=>{let m=w(b),E=m.slice(0,r),H=m.length-E.length,ye=b.getMonth()===n;return s`
                <div
                  class="fp-month-cell ${ye?"":"fp-outside-month"} ${S(b,o.now)&&(o.config.highlight_today??!0)?"fp-today":""}"
                  @click=${()=>o.callbacks.onSlotClick(b,!0)}
                >
                  <div class="fp-month-cell-date">${b.getDate()}</div>
                  <div class="fp-month-cell-events">
                    ${E.map(J=>ve(o,J,{compact:!0}))}
                    ${H>0?s`<button
                          type="button"
                          class="fp-month-more"
                          @click=${J=>{J.stopPropagation(),o.callbacks.onMoreClick(b,m)}}
                        >
                          ${a(o.hass.language,"month.more",{count:H})}
                        </button>`:c}
                  </div>
                </div>
              `})}
          </div>
        `)}
    </div>
  `}C();function fr(o){let t=ee(o.currentDate,o.firstWeekday),e=o.config.show_weekends??!0,r=e?7:5,i=[];for(let l=0,p=0;p<r&&l<7;l++){let h=x(t,l),_=h.getDay();!e&&(_===0||_===6)||(i.push(h),p++)}let n=te(o.events,i);return s`
    <div class="fp-view fp-view-week">
      ${o.config.show_week_numbers??!0?s`<div class="fp-week-number">${a(o.hass.language,"calendar_week_short")} ${Re(t)}</div>`:c}
      ${n.map(l=>Yr(o,l))}
    </div>
  `}function Yr(o,t){let e=S(t.day,o.now);return s`
    <div class="fp-week-day-section">
      <div class="fp-day-header fp-week-day-header ${e?"fp-today":""}">
        <span class="fp-day-header-weekday">${a(o.hass.language,`weekday.short.${t.day.getDay()}`)}</span>
        <span class="fp-day-header-date">${t.day.getDate()}.${t.day.getMonth()+1}.</span>
        <button
          type="button"
          class="fp-week-day-add"
          title=${a(o.hass.language,"action.add_event")}
          aria-label=${a(o.hass.language,"action.add_event")}
          @click=${()=>o.callbacks.onSlotClick(Kr(t.day,o.now),!1)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
      ${t.events.length>0?s`<div class="fp-agenda-items fp-week-day-items">${t.events.map(r=>_e(o,r))}</div>`:s`<div class="fp-week-day-empty">${a(o.hass.language,"empty.no_events_short")}</div>`}
    </div>
  `}function Kr(o,t){let e=new Date(o);if(S(o,t)){let r=t.getMinutes()<30?30:60;e.setHours(t.getHours(),0,0,0),e.setMinutes(r)}else e.setHours(9,0,0,0);return e}C();U();C();U();var K=class extends ${constructor(){super(...arguments);this.heading="";this.wide=!1;this._previouslyFocused=null;this._onKeydown=e=>{e.key==="Escape"&&this._requestClose()}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._onKeydown),this._previouslyFocused=document.activeElement,requestAnimationFrame(()=>this._focusFirst())}disconnectedCallback(){document.removeEventListener("keydown",this._onKeydown),this._previouslyFocused?.focus?.(),super.disconnectedCallback()}_focusFirst(){this.querySelector("[autofocus], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])")?.focus()}_requestClose(){this.dispatchEvent(new CustomEvent("fp-shell-close"))}render(){return s`
      <div
        class="backdrop"
        @click=${e=>{e.target===e.currentTarget&&this._requestClose()}}
      >
        <div class="dialog ${this.wide?"wide":""}" role="dialog" aria-modal="true" aria-label=${this.heading}>
          <div class="dialog-header">
            <div class="dialog-title">${this.heading}</div>
            <button class="dialog-close" type="button" aria-label="Close" @click=${()=>this._requestClose()}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="dialog-body"><slot></slot></div>
        </div>
      </div>
    `}};K.styles=T`
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 500;
      padding: 16px;
    }
    .dialog {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: var(--ha-dialog-border-radius, 12px);
      width: 100%;
      max-width: 480px;
      max-height: calc(100vh - 32px);
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    .dialog.wide {
      max-width: 720px;
    }
    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 8px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .dialog-title {
      font-size: 1.15rem;
      font-weight: 500;
    }
    .dialog-close {
      border: none;
      background: transparent;
      color: var(--secondary-text-color);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dialog-close:focus-visible,
    .dialog-close:hover {
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    }
    .dialog-body {
      padding: 12px 16px 16px;
      overflow-y: auto;
    }
    @media (max-width: 500px) {
      .backdrop {
        padding: 0;
        align-items: flex-end;
      }
      .dialog {
        max-width: 100%;
        max-height: 92vh;
        border-radius: 12px 12px 0 0;
      }
    }
  `,d([f()],K.prototype,"heading",2),d([f({type:Boolean})],K.prototype,"wide",2),K=d([D("family-planner-dialog-shell")],K);function gr(o,t,e){return e?new Date(`${o}T00:00:00`).getTime():new Date(`${o}T${t||"00:00"}:00`).getTime()}function vr(o){let t={};if((!o.title||!o.title.trim())&&(t.title="title_required"),!o.startDate||!o.endDate)t.end="end_before_start";else{let e=gr(o.startDate,o.startTime,o.allDay),r=gr(o.endDate,o.endTime,o.allDay);o.allDay?r<e&&(t.end="end_before_start"):r<=e&&(t.end="end_before_start")}return o.requirePerson&&o.personIds.length===0&&(t.personIds="person_required"),{valid:Object.keys(t).length===0,errors:t}}C();var re=T`
  .fp-swatch-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;
  }
  .fp-swatch {
    /* Color swatches override this background inline with the actual
       color, so this only matters for icon swatches - mix in a bit of
       --divider-color rather than relying on --card-background-color
       alone, which can end up matching the dialog surface (and thus be
       invisible) in some themes. */
    border: 2px solid var(--divider-color, #767676);
    border-radius: 50%;
    width: 28px;
    height: 28px;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--card-background-color, #fff) 70%, var(--divider-color, #767676) 30%);
    color: var(--primary-text-color);
  }
  .fp-swatch.selected {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-color);
  }
  .fp-swatch-icon ha-icon {
    --mdc-icon-size: 18px;
  }
`;function ie(o,t,e){return s`
    <div class="fp-swatch-row">
      ${o.map(r=>s`
          <button
            type="button"
            class="fp-swatch fp-swatch-color ${t===r?"selected":""}"
            style="background:${r}"
            title=${r}
            aria-label=${r}
            @click=${()=>e(r)}
          ></button>
        `)}
    </div>
  `}function Ne(o,t,e){return s`
    <div class="fp-swatch-row">
      ${o.map(r=>s`
          <button
            type="button"
            class="fp-swatch fp-swatch-icon ${t===r?"selected":""}"
            title=${r}
            aria-label=${r}
            @click=${()=>e(r)}
          >
            <ha-icon icon=${r}></ha-icon>
          </button>
        `)}
    </div>
  `}var Gr=T`
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 14px;
  }
  label {
    font-size: 0.8rem;
    color: var(--secondary-text-color);
  }
  input[type="text"],
  input[type="date"],
  input[type="time"],
  input[type="number"],
  select,
  textarea {
    border: 1px solid var(--divider-color, #ccc);
    border-radius: 8px;
    padding: 10px 12px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font: inherit;
    min-height: 44px;
  }
  textarea {
    min-height: 72px;
    resize: vertical;
  }
  .row {
    display: flex;
    gap: 12px;
  }
  .row > .field {
    flex: 1;
  }
  .switch-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }
  .switch-row input {
    width: 22px;
    height: 22px;
  }
  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  /* Chip background always mixes in a bit of --divider-color rather than
     relying on --secondary-background-color/--card-background-color alone,
     which can end up matching the dialog surface (and thus be invisible) in
     some themes - the same fixed-contrast formula is used for the filter
     bar's equivalent .fp-person-chip/.fp-category-chip in styles.ts, and
     for .reminder-chip below, so every pill/chip in this dialog follows the
     same rule. */
  .person-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 2px solid var(--divider-color, #767676);
    background: color-mix(in srgb, var(--card-background-color, #fff) 70%, var(--divider-color, #767676) 30%);
    color: var(--primary-text-color);
    border-radius: 16px;
    padding: 8px 12px;
    min-height: 40px;
    font: inherit;
  }
  .person-chip .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .person-chip.selected {
    border-color: var(--fp-color, var(--primary-color));
    background: color-mix(in srgb, var(--fp-color, var(--primary-color)) 24%, var(--card-background-color, #fff));
    font-weight: 600;
  }
  .reminder-chip {
    border: 2px solid var(--divider-color, #767676);
    background: color-mix(in srgb, var(--card-background-color, #fff) 70%, var(--divider-color, #767676) 30%);
    color: var(--primary-text-color);
    border-radius: 16px;
    padding: 6px 10px;
    min-height: 36px;
  }
  .reminder-chip.selected {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
  }
  .hint {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
  }
  .error-text {
    color: var(--error-color, #db4437);
    font-size: 0.78rem;
  }
  .server-error {
    background: rgba(var(--rgb-error-color, 244, 67, 54), 0.12);
    color: var(--error-color, #db4437);
    border-radius: 8px;
    padding: 8px 12px;
    margin-bottom: 12px;
    font-size: 0.85rem;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
  }
  .btn {
    border-radius: 8px;
    padding: 10px 18px;
    min-height: 44px;
    font: inherit;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .btn-primary {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
  }
  .confirm-box {
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    padding: 12px;
    margin-top: 12px;
  }
`,v=class extends ${constructor(){super(...arguments);this.people=[];this.categories=[];this.event=null;this.prefill=null;this.serverError=null;this.requirePerson=!0;this.enableCategories=!0;this.enableStatus=!0;this.defaultReminderMinutes=me;this.defaultColors=z;this.defaultIcons=j;this._title="";this._subtitle="";this._allDay=!1;this._startDate="";this._startTime="09:00";this._endDate="";this._endTime="10:00";this._personIds=[];this._description="";this._location="";this._categoryId="";this._color="";this._icon="";this._status="";this._reminders=[];this._customReminder="";this._repeatFreq="";this._repeatUntil="";this._errors={};this._confirmingDiscard=!1;this._submitting=!1;this._dirty=!1;this._initialized=!1;this._endTouchedByUser=!1}willUpdate(e){!this._initialized&&(this.event||this.prefill)&&(this._initFromProps(),this._initialized=!0)}_initFromProps(){if(this.event){let e=this.event;if(this._title=e.title,this._subtitle=e.subtitle??"",this._allDay=e.all_day,e.all_day)this._startDate=e.start,this._endDate=lt(e.end,-1);else{let r=new Date(e.start),i=new Date(e.end);this._startDate=fe(r),this._startTime=Ae(r),this._endDate=fe(i),this._endTime=Ae(i)}if(this._endTouchedByUser=!0,this._personIds=[...e.person_ids],this._description=e.description??"",this._location=e.location??"",this._categoryId=e.category_id??"",this._color=e.color??"",this._icon=e.icon??"",this._status=e.status??"",this._reminders=[...e.reminders],e.rrule){let r=/FREQ=([A-Z]+)/.exec(e.rrule);this._repeatFreq=r?r[1]:"";let i=/UNTIL=(\d{8})/.exec(e.rrule);if(i){let n=i[1];this._repeatUntil=`${n.slice(0,4)}-${n.slice(4,6)}-${n.slice(6,8)}`}}}else this.prefill&&(this._allDay=this.prefill.allDay,this._startDate=this.prefill.date,this._startTime=this.prefill.time,this._endTouchedByUser=!1,this._recomputeEndIfNotTouched(),this._personIds=[],this._reminders=[this.defaultReminderMinutes])}_recomputeEndIfNotTouched(){if(this._endTouchedByUser)return;let{date:e,time:r}=ir(this._startDate,this._startTime,60);this._endDate=e,this._endTime=r}_markDirty(){this._dirty=!0}_togglePerson(e){this._personIds=this._personIds.includes(e)?this._personIds.filter(r=>r!==e):[...this._personIds,e],this._markDirty()}_toggleReminder(e){this._reminders=this._reminders.includes(e)?this._reminders.filter(r=>r!==e):[...this._reminders,e].sort((r,i)=>r-i),this._markDirty()}_addCustomReminder(){let e=parseInt(this._customReminder,10);!Number.isNaN(e)&&e>=0&&!this._reminders.includes(e)&&(this._reminders=[...this._reminders,e].sort((r,i)=>r-i),this._customReminder="",this._markDirty())}_buildRrule(){if(!this._repeatFreq)return null;let e=`FREQ=${this._repeatFreq}`;return this._repeatUntil&&(e+=`;UNTIL=${this._repeatUntil.replace(/-/g,"")}T000000Z`),e}_validate(){let e=vr({title:this._title,allDay:this._allDay,startDate:this._startDate,startTime:this._startTime,endDate:this._endDate,endTime:this._endTime,personIds:this._personIds,requirePerson:this.requirePerson});return this._errors=e.errors,e}_handleSave(){if(!this._validate().valid)return;let r=this._allDay?this._startDate:at(this._startDate,this._startTime),i=this._allDay?lt(this._endDate,1):at(this._endDate,this._endTime),n={title:this._title.trim(),subtitle:this._subtitle.trim()||null,start:r,end:i,all_day:this._allDay,person_ids:this._personIds,description:this._description.trim()||null,location:this._location.trim()||null,category_id:this._categoryId||null,color:this._color.trim()||null,icon:this._icon.trim()||null,status:this._status||null,reminders:this._reminders,rrule:this._buildRrule()};this._submitting=!0,this.dispatchEvent(new CustomEvent("fp-save",{detail:n}))}updated(e){e.has("serverError")&&this.serverError&&(this._submitting=!1)}_requestClose(){if(this._dirty&&!this._confirmingDiscard){this._confirmingDiscard=!0;return}this.dispatchEvent(new CustomEvent("fp-close"))}render(){let e=this.hass?.language,r=this.event?a(e,"event.edit_title"):a(e,"event.new_title");return s`
      <family-planner-dialog-shell .heading=${r} wide @fp-shell-close=${()=>this._requestClose()}>
        ${this.serverError?s`<div class="server-error">${this.serverError}</div>`:c}
        ${this._confirmingDiscard?s`
              <div class="confirm-box">
                <p>${a(e,"dialog.unsaved_changes_message")}</p>
                <div class="actions">
                  <button class="btn" type="button" @click=${()=>this._confirmingDiscard=!1}>
                    ${a(e,"dialog.keep_editing")}
                  </button>
                  <button
                    class="btn btn-primary"
                    type="button"
                    @click=${()=>this.dispatchEvent(new CustomEvent("fp-close"))}
                  >
                    ${a(e,"dialog.discard")}
                  </button>
                </div>
              </div>
            `:this._renderForm(e)}
      </family-planner-dialog-shell>
    `}_renderForm(e){let r=this.hass?.themes?.darkMode?"dark":"light";return s`
      <div class="field">
        <label for="fp-title">${a(e,"event.title")} *</label>
        <input
          id="fp-title"
          type="text"
          autofocus
          .value=${this._title}
          @input=${i=>{this._title=i.target.value,this._markDirty()}}
        />
        ${this._errors.title?s`<span class="error-text">${a(e,"validation.title_required")}</span>`:c}
      </div>

      <div class="field">
        <label for="fp-subtitle">${a(e,"event.subtitle")}</label>
        <input
          id="fp-subtitle"
          type="text"
          .value=${this._subtitle}
          @input=${i=>{this._subtitle=i.target.value,this._markDirty()}}
        />
      </div>

      <div class="switch-row">
        <input
          id="fp-allday"
          type="checkbox"
          .checked=${this._allDay}
          @change=${i=>{this._allDay=i.target.checked,this._markDirty()}}
        />
        <label for="fp-allday">${a(e,"event.all_day")}</label>
      </div>

      <div class="row">
        <div class="field">
          <label for="fp-start-date">${a(e,"event.start_date")}</label>
          <input
            id="fp-start-date"
            type="date"
            style="color-scheme:${r}"
            .value=${this._startDate}
            @input=${i=>{this._startDate=i.target.value,this._recomputeEndIfNotTouched(),this._markDirty()}}
          />
        </div>
        ${this._allDay?c:s`
              <div class="field">
                <label for="fp-start-time">${a(e,"event.start_time")}</label>
                <input
                  id="fp-start-time"
                  type="time"
                  style="color-scheme:${r}"
                  .value=${this._startTime}
                  @input=${i=>{this._startTime=i.target.value,this._recomputeEndIfNotTouched(),this._markDirty()}}
                />
              </div>
            `}
      </div>
      <div class="row">
        <div class="field">
          <label for="fp-end-date">${a(e,"event.end_date")}</label>
          <input
            id="fp-end-date"
            type="date"
            style="color-scheme:${r}"
            .value=${this._endDate}
            @input=${i=>{this._endTouchedByUser=!0,this._endDate=i.target.value,this._markDirty()}}
          />
        </div>
        ${this._allDay?c:s`
              <div class="field">
                <label for="fp-end-time">${a(e,"event.end_time")}</label>
                <input
                  id="fp-end-time"
                  type="time"
                  style="color-scheme:${r}"
                  .value=${this._endTime}
                  @input=${i=>{this._endTouchedByUser=!0,this._endTime=i.target.value,this._markDirty()}}
                />
              </div>
            `}
      </div>
      ${this._errors.end?s`<span class="error-text">${a(e,"validation.end_before_start")}</span>`:c}

      <div class="field">
        <label>${a(e,"event.people")}${this.requirePerson?" *":""}</label>
        <div class="chip-row">
          ${this.people.filter(i=>i.active).map(i=>s`
                <button
                  type="button"
                  class="person-chip ${this._personIds.includes(i.id)?"selected":""}"
                  style="--fp-color:${i.color}"
                  @click=${()=>this._togglePerson(i.id)}
                >
                  <span class="dot" style="background:${i.color}"></span>${i.name}
                </button>
              `)}
        </div>
        ${this._errors.personIds?s`<span class="error-text">${a(e,"validation.person_required")}</span>`:c}
      </div>

      <div class="field">
        <label for="fp-description">${a(e,"event.description")}</label>
        <textarea
          id="fp-description"
          .value=${this._description}
          @input=${i=>{this._description=i.target.value,this._markDirty()}}
        ></textarea>
      </div>

      <div class="field">
        <label for="fp-location">${a(e,"event.location")}</label>
        <input
          id="fp-location"
          type="text"
          .value=${this._location}
          @input=${i=>{this._location=i.target.value,this._markDirty()}}
        />
      </div>

      ${this.enableCategories?s`
            <div class="field">
              <label for="fp-category">${a(e,"event.category")}</label>
              <select
                id="fp-category"
                .value=${this._categoryId}
                @change=${i=>{this._categoryId=i.target.value,this._markDirty()}}
              >
                <option value="">${a(e,"category.none")}</option>
                ${this.categories.filter(i=>i.active).map(i=>s`<option value=${i.id} ?selected=${i.id===this._categoryId}>${i.name}</option>`)}
              </select>
            </div>
          `:c}

      <div class="row">
        <div class="field">
          <label>${a(e,"event.color")}</label>
          ${ie(this.defaultColors,this._color,i=>{this._color=this._color===i?"":i,this._markDirty()})}
          <span class="hint">${a(e,"event.palette_hint")}</span>
        </div>
        <div class="field">
          <label>${a(e,"event.icon")}</label>
          ${Ne(this.defaultIcons,this._icon,i=>{this._icon=this._icon===i?"":i,this._markDirty()})}
          <span class="hint">${a(e,"event.palette_hint")}</span>
        </div>
      </div>

      ${this.enableStatus?s`
            <div class="field">
              <label for="fp-status">${a(e,"event.status")}</label>
              <select
                id="fp-status"
                .value=${this._status}
                @change=${i=>{this._status=i.target.value,this._markDirty()}}
              >
                <option value="">-</option>
                ${["planned","confirmed","tentative","done","cancelled"].map(i=>s`<option value=${i} ?selected=${i===this._status}>${a(e,`status.${i}`)}</option>`)}
              </select>
            </div>
          `:c}

      <div class="field">
        <label>${a(e,"event.reminders")}</label>
        <div class="chip-row">
          ${tr.map(i=>s`
              <button
                type="button"
                class="reminder-chip ${this._reminders.includes(i)?"selected":""}"
                @click=${()=>this._toggleReminder(i)}
              >
                ${i===0?a(e,"reminder.at_start"):a(e,`reminder.${i}`)||`${i} min`}
              </button>
            `)}
        </div>
        <div class="row" style="margin-top:6px">
          <input
            type="number"
            min="0"
            placeholder=${a(e,"reminder.custom")}
            .value=${this._customReminder}
            @input=${i=>this._customReminder=i.target.value}
          />
          <button class="btn" type="button" @click=${()=>this._addCustomReminder()}>+</button>
        </div>
      </div>

      <div class="field">
        <label for="fp-repeat">${a(e,"event.repeat")}</label>
        <select
          id="fp-repeat"
          .value=${this._repeatFreq}
          @change=${i=>{this._repeatFreq=i.target.value,this._markDirty()}}
        >
          <option value="">${a(e,"event.repeat_none")}</option>
          <option value="DAILY" ?selected=${this._repeatFreq==="DAILY"}>Täglich / Daily</option>
          <option value="WEEKLY" ?selected=${this._repeatFreq==="WEEKLY"}>Wöchentlich / Weekly</option>
          <option value="MONTHLY" ?selected=${this._repeatFreq==="MONTHLY"}>Monatlich / Monthly</option>
          <option value="YEARLY" ?selected=${this._repeatFreq==="YEARLY"}>Jährlich / Yearly</option>
        </select>
        ${this._repeatFreq?s`
              <input
                type="date"
                .value=${this._repeatUntil}
                @input=${i=>this._repeatUntil=i.target.value}
              />
            `:c}
      </div>

      <div class="actions">
        <button class="btn" type="button" @click=${()=>this._requestClose()}>${a(e,"action.cancel")}</button>
        <button class="btn btn-primary" type="button" ?disabled=${this._submitting} @click=${()=>this._handleSave()}>
          ${a(e,"action.save")}
        </button>
      </div>
    `}};v.styles=[Gr,re],d([f({attribute:!1})],v.prototype,"hass",2),d([f({attribute:!1})],v.prototype,"config",2),d([f({attribute:!1})],v.prototype,"people",2),d([f({attribute:!1})],v.prototype,"categories",2),d([f({attribute:!1})],v.prototype,"event",2),d([f({attribute:!1})],v.prototype,"prefill",2),d([f({attribute:!1})],v.prototype,"serverError",2),d([f({type:Boolean})],v.prototype,"requirePerson",2),d([f({type:Boolean})],v.prototype,"enableCategories",2),d([f({type:Boolean})],v.prototype,"enableStatus",2),d([f({type:Number})],v.prototype,"defaultReminderMinutes",2),d([f({attribute:!1})],v.prototype,"defaultColors",2),d([f({attribute:!1})],v.prototype,"defaultIcons",2),d([u()],v.prototype,"_title",2),d([u()],v.prototype,"_subtitle",2),d([u()],v.prototype,"_allDay",2),d([u()],v.prototype,"_startDate",2),d([u()],v.prototype,"_startTime",2),d([u()],v.prototype,"_endDate",2),d([u()],v.prototype,"_endTime",2),d([u()],v.prototype,"_personIds",2),d([u()],v.prototype,"_description",2),d([u()],v.prototype,"_location",2),d([u()],v.prototype,"_categoryId",2),d([u()],v.prototype,"_color",2),d([u()],v.prototype,"_icon",2),d([u()],v.prototype,"_status",2),d([u()],v.prototype,"_reminders",2),d([u()],v.prototype,"_customReminder",2),d([u()],v.prototype,"_repeatFreq",2),d([u()],v.prototype,"_repeatUntil",2),d([u()],v.prototype,"_errors",2),d([u()],v.prototype,"_confirmingDiscard",2),d([u()],v.prototype,"_submitting",2),v=d([D("family-planner-event-dialog")],v);C();U();var Jr=T`
  .meta-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 12px;
  }
  .meta-row ha-icon {
    color: var(--secondary-text-color);
    margin-top: 2px;
  }
  .color-bar {
    width: 6px;
    border-radius: 3px;
    align-self: stretch;
    min-height: 24px;
  }
  .subtitle {
    color: var(--secondary-text-color);
  }
  .person-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .person-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 14px;
    padding: 4px 10px;
    background: var(--secondary-background-color, #eee);
  }
  .person-pill .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .status-badge {
    display: inline-block;
    border: 1px solid var(--divider-color);
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.78rem;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }
  .btn {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 8px;
    padding: 10px 16px;
    min-height: 44px;
    font: inherit;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .btn-danger {
    color: var(--error-color, #db4437);
    border-color: var(--error-color, #db4437);
  }
  .confirm-box {
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    padding: 12px;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`,P=class extends ${constructor(){super(...arguments);this.people=[];this.categories=[];this.canWrite=!0;this._confirmingDelete=!1}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}render(){let e=this.hass?.language,r=this.event,i=Y(r,this.people,this.categories,"person"),n=r.person_ids.map(h=>this.people.find(_=>_.id===h)).filter(Boolean),l=r.category_id?this.categories.find(h=>h.id===r.category_id):void 0,p=!!r.rrule||!!r.is_recurring_instance;return s`
      <family-planner-dialog-shell .heading=${r.title} @fp-shell-close=${()=>this._close()}>
        <div class="meta-row">
          <span class="color-bar" style="background:${i}"></span>
          <div>
            ${r.subtitle?s`<div class="subtitle">${r.subtitle}</div>`:c}
            <div>
              ${r.all_day?a(e,"event.all_day"):`${ge(new Date(r.occurrence_start),!0)} \u2013 ${ge(new Date(r.occurrence_end),!0)}`}
            </div>
            ${r.status?s`<span class="status-badge">${a(e,`status.${r.status}`)}</span>`:c}
          </div>
        </div>

        ${n.length>0?s`
              <div class="meta-row">
                <ha-icon icon="mdi:account-multiple"></ha-icon>
                <div class="person-list">
                  ${n.map(h=>s`<span class="person-pill"><span class="dot" style="background:${h.color}"></span>${h.name}</span>`)}
                </div>
              </div>
            `:c}

        ${r.location?s`<div class="meta-row"><ha-icon icon="mdi:map-marker"></ha-icon><div>${r.location}</div></div>`:c}
        ${l?s`<div class="meta-row"><ha-icon icon=${l.icon||"mdi:tag"}></ha-icon><div>${l.name}</div></div>`:c}
        ${r.description?s`<div class="meta-row"><ha-icon icon="mdi:text"></ha-icon><div>${r.description}</div></div>`:c}

        ${this._confirmingDelete?this._renderDeleteConfirm(e,p):this._renderActions(e)}
      </family-planner-dialog-shell>
    `}_renderActions(e){return this.canWrite?s`
      <div class="actions">
        <button class="btn" type="button" @click=${()=>this.dispatchEvent(new CustomEvent("fp-edit",{detail:this.event}))}>
          <ha-icon icon="mdi:pencil"></ha-icon>${a(e,"action.edit")}
        </button>
        <button class="btn" type="button" @click=${()=>this.dispatchEvent(new CustomEvent("fp-duplicate"))}>
          <ha-icon icon="mdi:content-copy"></ha-icon>${a(e,"action.duplicate")}
        </button>
        ${this.event.status!=="done"?s`
              <button
                class="btn"
                type="button"
                @click=${()=>this.dispatchEvent(new CustomEvent("fp-set-status",{detail:"done"}))}
              >
                <ha-icon icon="mdi:check"></ha-icon>${a(e,"action.mark_done")}
              </button>
            `:c}
        <button class="btn btn-danger" type="button" @click=${()=>this._confirmingDelete=!0}>
          <ha-icon icon="mdi:delete"></ha-icon>${a(e,"action.delete")}
        </button>
      </div>
    `:s``}_renderDeleteConfirm(e,r){return s`
      <div class="confirm-box">
        <div>${a(e,"dialog.confirm_delete_title")}</div>
        <div class="actions">
          ${r?s`
                <button
                  class="btn btn-danger"
                  type="button"
                  @click=${()=>this.dispatchEvent(new CustomEvent("fp-delete",{detail:{mode:"instance",occurrenceStart:this.event.occurrence_start}}))}
                >
                  ${a(e,"dialog.confirm_delete_instance")}
                </button>
              `:c}
          <button
            class="btn btn-danger"
            type="button"
            @click=${()=>this.dispatchEvent(new CustomEvent("fp-delete",{detail:{mode:"series"}}))}
          >
            ${r?a(e,"dialog.confirm_delete_series"):a(e,"action.delete")}
          </button>
          <button class="btn" type="button" @click=${()=>this._confirmingDelete=!1}>
            ${a(e,"action.cancel")}
          </button>
        </div>
      </div>
    `}};P.styles=Jr,d([f({attribute:!1})],P.prototype,"hass",2),d([f({attribute:!1})],P.prototype,"people",2),d([f({attribute:!1})],P.prototype,"categories",2),d([f({attribute:!1})],P.prototype,"event",2),d([f({type:Boolean})],P.prototype,"canWrite",2),d([u()],P.prototype,"_confirmingDelete",2),P=d([D("family-planner-event-detail-dialog")],P);C();U();var Zr=T`
  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    padding: 10px 12px;
    margin-bottom: 6px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    text-align: left;
    min-height: 44px;
  }
  .bar {
    width: 4px;
    align-self: stretch;
    border-radius: 2px;
  }
  .time {
    min-width: 48px;
    color: var(--secondary-text-color);
    font-size: 0.85rem;
  }
  .title {
    flex: 1;
  }
  .add-btn {
    margin-top: 8px;
    width: 100%;
    border: 1px dashed var(--divider-color, #ccc);
    border-radius: 8px;
    padding: 10px;
    background: transparent;
    color: var(--primary-text-color);
    min-height: 44px;
  }
`,O=class extends ${constructor(){super(...arguments);this.people=[];this.categories=[];this.events=[];this.canWrite=!0}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}render(){let e=this.hass?.language,r=new Intl.DateTimeFormat(e||"de",{weekday:"long",day:"numeric",month:"long"}).format(this.date);return s`
      <family-planner-dialog-shell .heading=${r} @fp-shell-close=${()=>this._close()}>
        ${this.events.map(i=>{let n=Y(i,this.people,this.categories,"person"),l=He(i,this.people);return s`
            <button
              type="button"
              class="item"
              @click=${()=>this.dispatchEvent(new CustomEvent("fp-event-click",{detail:i}))}
            >
              <span class="bar" style="background:${n}"></span>
              <span class="time">${i.all_day?a(e,"event.all_day"):Oe(i,!0)}</span>
              <span class="title">${i.title}</span>
              ${Pe(l,4,e)}
            </button>
          `})}
        ${this.canWrite?s`
              <button
                type="button"
                class="add-btn"
                @click=${()=>this.dispatchEvent(new CustomEvent("fp-add-event",{detail:{date:this.date}}))}
              >
                + ${a(e,"action.add_event")}
              </button>
            `:c}
      </family-planner-dialog-shell>
    `}};O.styles=Zr,d([f({attribute:!1})],O.prototype,"hass",2),d([f({attribute:!1})],O.prototype,"people",2),d([f({attribute:!1})],O.prototype,"categories",2),d([f({attribute:!1})],O.prototype,"date",2),d([f({attribute:!1})],O.prototype,"events",2),d([f({type:Boolean})],O.prototype,"canWrite",2),O=d([D("family-planner-day-detail-dialog")],O);C();U();var Qr=T`
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    border-bottom: 1px solid var(--divider-color, #eee);
  }
  .dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .name {
    flex: 1;
  }
  .name.inactive {
    opacity: 0.5;
  }
  .iconbtn {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .iconbtn:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
  }
  .form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
    align-items: center;
  }
  input[type="text"],
  input[type="color"],
  select {
    border: 1px solid var(--divider-color, #ccc);
    border-radius: 8px;
    padding: 8px 10px;
    min-height: 40px;
    font: inherit;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .btn {
    border-radius: 8px;
    padding: 8px 14px;
    min-height: 40px;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font: inherit;
  }
  .btn-primary {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
  }
  .confirm-box {
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    padding: 12px;
    margin: 8px 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`,ht={id:null,name:"",color:"#3f51b5",role:""},M=class extends ${constructor(){super(...arguments);this.people=[];this.defaultColors=z;this._draft={...ht};this._deletingId=null;this._deleteStrategy="deactivate";this._reassignTo="";this._error=null}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}async _save(){if(this._draft.name.trim())try{this._draft.id?await it(this.hass,this._draft.id,{name:this._draft.name.trim(),color:this._draft.color,role:this._draft.role||null}):await Kt(this.hass,{name:this._draft.name.trim(),color:this._draft.color,role:this._draft.role||null}),this._draft={...ht},this._error=null,this.dispatchEvent(new CustomEvent("fp-people-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}async _toggleActive(e){await it(this.hass,e.id,{active:!e.active}),this.dispatchEvent(new CustomEvent("fp-people-changed"))}async _move(e,r){let i=[...this.people].sort((p,h)=>p.sort_order-h.sort_order).map(p=>p.id),n=i.indexOf(e.id),l=n+r;l<0||l>=i.length||([i[n],i[l]]=[i[l],i[n]],await Jt(this.hass,i),this.dispatchEvent(new CustomEvent("fp-people-changed")))}async _confirmDelete(){if(this._deletingId)try{await Gt(this.hass,this._deletingId,this._deleteStrategy,this._reassignTo||void 0),this._deletingId=null,this._error=null,this.dispatchEvent(new CustomEvent("fp-people-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}render(){let e=this.hass?.language,r=[...this.people].sort((i,n)=>i.sort_order-n.sort_order);return s`
      <family-planner-dialog-shell .heading=${a(e,"people.title")} @fp-shell-close=${()=>this._close()}>
        ${this._error?s`<div class="confirm-box">${this._error}</div>`:c}
        ${r.map((i,n)=>s`
            <div class="row">
              <span class="dot" style="background:${i.color}"></span>
              <span class="name ${i.active?"":"inactive"}">${i.name}</span>
              <button class="iconbtn" title="↑" ?disabled=${n===0} @click=${()=>this._move(i,-1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button
                class="iconbtn"
                title="↓"
                ?disabled=${n===r.length-1}
                @click=${()=>this._move(i,1)}
              >
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button class="iconbtn" title=${a(e,"people.active")} @click=${()=>this._toggleActive(i)}>
                <ha-icon icon=${i.active?"mdi:eye":"mdi:eye-off"}></ha-icon>
              </button>
              <button
                class="iconbtn"
                title=${a(e,"action.edit")}
                @click=${()=>this._draft={id:i.id,name:i.name,color:i.color,role:i.role??""}}
              >
                <ha-icon icon="mdi:pencil"></ha-icon>
              </button>
              <button class="iconbtn" title=${a(e,"action.delete")} @click=${()=>this._deletingId=i.id}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            ${this._deletingId===i.id?this._renderDeleteConfirm(e,i):c}
          `)}

        <div class="form">
          <input
            type="text"
            placeholder=${a(e,"people.name")}
            .value=${this._draft.name}
            @input=${i=>this._draft={...this._draft,name:i.target.value}}
          />
          <input
            type="color"
            .value=${this._draft.color}
            @input=${i=>this._draft={...this._draft,color:i.target.value}}
          />
          ${ie(this.defaultColors,this._draft.color,i=>this._draft={...this._draft,color:i})}
          <select
            .value=${this._draft.role}
            @change=${i=>this._draft={...this._draft,role:i.target.value}}
          >
            <option value="">-</option>
            <option value="parent" ?selected=${this._draft.role==="parent"}>${a(e,"people.role.parent")}</option>
            <option value="child" ?selected=${this._draft.role==="child"}>${a(e,"people.role.child")}</option>
            <option value="other" ?selected=${this._draft.role==="other"}>${a(e,"people.role.other")}</option>
          </select>
          <button class="btn btn-primary" type="button" @click=${()=>void this._save()}>
            ${this._draft.id?a(e,"action.save"):a(e,"people.add")}
          </button>
          ${this._draft.id?s`<button class="btn" type="button" @click=${()=>this._draft={...ht}}>
                ${a(e,"action.cancel")}
              </button>`:c}
        </div>
      </family-planner-dialog-shell>
    `}_renderDeleteConfirm(e,r){let i=this.people.filter(n=>n.id!==r.id);return s`
      <div class="confirm-box">
        <div>${a(e,"people.delete_title")} (${r.name})</div>
        <select
          .value=${this._deleteStrategy}
          @change=${n=>this._deleteStrategy=n.target.value}
        >
          <option value="deactivate">${a(e,"people.delete_strategy.deactivate")}</option>
          <option value="remove_from_events">${a(e,"people.delete_strategy.remove_from_events")}</option>
          <option value="reassign">${a(e,"people.delete_strategy.reassign")}</option>
          <option value="keep_unassigned">${a(e,"people.delete_strategy.keep_unassigned")}</option>
        </select>
        ${this._deleteStrategy==="reassign"?s`
              <select .value=${this._reassignTo} @change=${n=>this._reassignTo=n.target.value}>
                <option value="">${a(e,"people.reassign_to")}</option>
                ${i.map(n=>s`<option value=${n.id}>${n.name}</option>`)}
              </select>
            `:c}
        <div class="form">
          <button class="btn btn-primary" type="button" @click=${()=>void this._confirmDelete()}>
            ${a(e,"action.delete")}
          </button>
          <button class="btn" type="button" @click=${()=>this._deletingId=null}>${a(e,"action.cancel")}</button>
        </div>
      </div>
    `}};M.styles=[Qr,re],d([f({attribute:!1})],M.prototype,"hass",2),d([f({attribute:!1})],M.prototype,"people",2),d([f({attribute:!1})],M.prototype,"defaultColors",2),d([u()],M.prototype,"_draft",2),d([u()],M.prototype,"_deletingId",2),d([u()],M.prototype,"_deleteStrategy",2),d([u()],M.prototype,"_reassignTo",2),d([u()],M.prototype,"_error",2),M=d([D("family-planner-people-manager-dialog")],M);C();U();var Xr=T`
  .row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    border-bottom: 1px solid var(--divider-color, #eee);
  }
  .dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .name {
    flex: 1;
  }
  .name.inactive {
    opacity: 0.5;
  }
  .iconbtn {
    border: none;
    background: transparent;
    color: var(--secondary-text-color);
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .iconbtn:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
  }
  .form {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
    align-items: center;
  }
  input[type="text"],
  input[type="color"] {
    border: 1px solid var(--divider-color, #ccc);
    border-radius: 8px;
    padding: 8px 10px;
    min-height: 40px;
    font: inherit;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .btn {
    border-radius: 8px;
    padding: 8px 14px;
    min-height: 40px;
    border: 1px solid var(--divider-color, #ccc);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font: inherit;
  }
  .btn-primary {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
  }
  .confirm-box {
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: 8px;
    padding: 12px;
    margin: 8px 0;
    display: flex;
    gap: 8px;
    align-items: center;
  }
`,ut={id:null,name:"",color:"#9e9e9e",icon:""},L=class extends ${constructor(){super(...arguments);this.categories=[];this.defaultColors=z;this.defaultIcons=j;this._draft={...ut};this._deletingId=null;this._error=null}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}async _save(){if(this._draft.name.trim())try{let e=this._draft.icon.trim()||null;this._draft.id?await nt(this.hass,this._draft.id,{name:this._draft.name.trim(),color:this._draft.color,icon:e}):await Zt(this.hass,{name:this._draft.name.trim(),color:this._draft.color,icon:e}),this._draft={...ut},this._error=null,this.dispatchEvent(new CustomEvent("fp-categories-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}async _toggleActive(e){await nt(this.hass,e.id,{active:!e.active}),this.dispatchEvent(new CustomEvent("fp-categories-changed"))}async _move(e,r){let i=[...this.categories].sort((p,h)=>p.sort_order-h.sort_order).map(p=>p.id),n=i.indexOf(e.id),l=n+r;l<0||l>=i.length||([i[n],i[l]]=[i[l],i[n]],await Xt(this.hass,i),this.dispatchEvent(new CustomEvent("fp-categories-changed")))}async _confirmDelete(){if(this._deletingId)try{await Qt(this.hass,this._deletingId),this._deletingId=null,this._error=null,this.dispatchEvent(new CustomEvent("fp-categories-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}render(){let e=this.hass?.language,r=[...this.categories].sort((i,n)=>i.sort_order-n.sort_order);return s`
      <family-planner-dialog-shell .heading=${a(e,"category.title")} @fp-shell-close=${()=>this._close()}>
        ${this._error?s`<div class="confirm-box">${this._error}</div>`:c}
        ${r.map((i,n)=>s`
            <div class="row">
              <span class="dot" style="background:${i.color}"></span>
              ${i.icon?s`<ha-icon icon=${i.icon}></ha-icon>`:c}
              <span class="name ${i.active?"":"inactive"}">${i.name}</span>
              <button class="iconbtn" title="↑" ?disabled=${n===0} @click=${()=>this._move(i,-1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button
                class="iconbtn"
                title="↓"
                ?disabled=${n===r.length-1}
                @click=${()=>this._move(i,1)}
              >
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button class="iconbtn" @click=${()=>this._toggleActive(i)}>
                <ha-icon icon=${i.active?"mdi:eye":"mdi:eye-off"}></ha-icon>
              </button>
              <button
                class="iconbtn"
                title=${a(e,"action.edit")}
                @click=${()=>this._draft={id:i.id,name:i.name,color:i.color,icon:i.icon??""}}
              >
                <ha-icon icon="mdi:pencil"></ha-icon>
              </button>
              <button class="iconbtn" title=${a(e,"action.delete")} @click=${()=>this._deletingId=i.id}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            ${this._deletingId===i.id?s`
                  <div class="confirm-box">
                    <span>${a(e,"action.delete")}: ${i.name}?</span>
                    <button class="btn btn-primary" type="button" @click=${()=>void this._confirmDelete()}>
                      ${a(e,"action.delete")}
                    </button>
                    <button class="btn" type="button" @click=${()=>this._deletingId=null}>
                      ${a(e,"action.cancel")}
                    </button>
                  </div>
                `:c}
          `)}

        <div class="form">
          <input
            type="text"
            placeholder=${a(e,"category.name")}
            .value=${this._draft.name}
            @input=${i=>this._draft={...this._draft,name:i.target.value}}
          />
          <input
            type="color"
            .value=${this._draft.color}
            @input=${i=>this._draft={...this._draft,color:i.target.value}}
          />
          ${ie(this.defaultColors,this._draft.color,i=>this._draft={...this._draft,color:i})}
          <input
            type="text"
            placeholder=${a(e,"event.icon")}
            .value=${this._draft.icon}
            @input=${i=>this._draft={...this._draft,icon:i.target.value}}
          />
          ${Ne(this.defaultIcons,this._draft.icon,i=>this._draft={...this._draft,icon:i})}
          <button class="btn btn-primary" type="button" @click=${()=>void this._save()}>
            ${this._draft.id?a(e,"action.save"):a(e,"category.add")}
          </button>
          ${this._draft.id?s`<button class="btn" type="button" @click=${()=>this._draft={...ut}}>
                ${a(e,"action.cancel")}
              </button>`:c}
        </div>
      </family-planner-dialog-shell>
    `}};L.styles=[Xr,re],d([f({attribute:!1})],L.prototype,"hass",2),d([f({attribute:!1})],L.prototype,"categories",2),d([f({attribute:!1})],L.prototype,"defaultColors",2),d([f({attribute:!1})],L.prototype,"defaultIcons",2),d([u()],L.prototype,"_draft",2),d([u()],L.prototype,"_deletingId",2),d([u()],L.prototype,"_error",2),L=d([D("family-planner-category-manager-dialog")],L);var ri=["today","day","week","month","agenda"],ii=["family_planner_event_created","family_planner_event_updated","family_planner_event_deleted"],y=class extends ${constructor(){super(...arguments);this._view="week";this._currentDate=new Date;this._events=[];this._people=[];this._categories=[];this._loading=!0;this._error=null;this._connectionLost=!1;this._search="";this._selectedPersonIds=[];this._selectedCategoryIds=[];this._filtersExpanded=!1;this._canWriteEvents=!0;this._isAdmin=!1;this._requirePerson=!0;this._enableCategories=!0;this._enableStatus=!0;this._defaultReminderMinutes=me;this._defaultColors=z;this._defaultIcons=j;this._createDraft=null;this._editingEvent=null;this._dialogError=null;this._detailEvent=null;this._dayDetail=null;this._peopleManagerOpen=!1;this._categoryManagerOpen=!1;this._bootstrapped=!1;this._unsubBus=[];this._fetchToken=0;this._debouncedSetSearch=dt(e=>{this._search=e},200)}get hass(){return this._hass}set hass(e){this._hass=e,this._bootstrapped||(this._bootstrapped=!0,this._bootstrap())}setConfig(e){if(!e)throw new Error("Ung\xFCltige Konfiguration");let r={...Le,...e,type:e.type},i=!this._config;this._config=r,i&&(this._view=r.default_view??"week",this._selectedPersonIds=r.preselected_people??[])}getCardSize(){return this._config?.compact?6:9}getGridOptions(){return{rows:this._config?.compact?6:9,columns:12,min_rows:4}}static getStubConfig(){return{type:"custom:family-planner-card",title:"Familienkalender",default_view:"week"}}static async getConfigElement(){return await Promise.resolve().then(()=>(yr(),_r)),document.createElement("family-planner-card-editor")}disconnectedCallback(){super.disconnectedCallback();for(let e of this._unsubBus)e();this._unsubBus=[]}async _bootstrap(){if(this._hass){try{let[e,r,i]=await Promise.all([qt(this._hass),rt(this._hass),ot(this._hass)]);this._isAdmin=e.is_admin,this._canWriteEvents=e.can_write_events,this._requirePerson=!!(e.options.require_person??!0),this._enableCategories=!!(e.options.enable_categories??!0),this._enableStatus=!!(e.options.enable_status??!0);let n=e.options.default_reminder_minutes;this._defaultReminderMinutes=typeof n=="number"&&Number.isFinite(n)?n:me;let l=e.options.default_colors;this._defaultColors=typeof l=="string"&&l.trim()?l.split(",").map(h=>h.trim()).filter(Boolean):z;let p=e.options.default_icons;this._defaultIcons=typeof p=="string"&&p.trim()?p.split(",").map(h=>h.trim()).filter(Boolean):j,this._people=r,this._categories=i,this._error=null}catch(e){this._error=e instanceof Error?e.message:String(e)}await this._fetchEvents(),this._subscribeRealtime()}}_subscribeRealtime(){if(!this._hass)return;let e=dt(()=>void this._fetchEvents(),250);for(let n of ii)this._hass.connection.subscribeEvents(()=>e(),n).then(l=>this._unsubBus.push(l)).catch(()=>{});let r=()=>{this._connectionLost=!1,this._fetchEvents()},i=()=>{this._connectionLost=!0};this._hass.connection.addEventListener("ready",r),this._hass.connection.addEventListener("disconnected",i),this._unsubBus.push(()=>this._hass?.connection.removeEventListener("ready",r)),this._unsubBus.push(()=>this._hass?.connection.removeEventListener("disconnected",i))}_computeRange(){let e=Me(this._hass,this._config.first_weekday);if(this._view==="today"){let i=new Date;return i.setHours(0,0,0,0),{start:i,end:x(i,1)}}if(this._view==="day"){let i=new Date(this._currentDate);return i.setHours(0,0,0,0),{start:i,end:x(i,1)}}if(this._view==="week"){let i=ee(this._currentDate,e);return{start:i,end:x(i,7)}}if(this._view==="month"){let i=Ie(this._currentDate,e);return{start:i,end:x(i,42)}}let r=new Date(this._currentDate);return r.setHours(0,0,0,0),{start:r,end:x(r,this._config.agenda_days??14)}}async _fetchEvents(){if(!this._hass)return;let e=++this._fetchToken;this._loading=!0;let{start:r,end:i}=this._computeRange();try{let n=await Vt(this._hass,{start:r.toISOString(),end:i.toISOString(),include_cancelled:!0});if(e!==this._fetchToken)return;this._events=n,this._error=null}catch(n){if(e!==this._fetchToken)return;this._error=n instanceof Error?n.message:String(n)}finally{e===this._fetchToken&&(this._loading=!1)}}get _filteredEvents(){return nr(this._events,{showDoneEvents:this._config.show_done_events??!0,showCancelledEvents:this._config.show_cancelled_events??!1,personIds:this._selectedPersonIds,categoryIds:this._selectedCategoryIds,search:this._search})}get _showFlatList(){return this._search.trim().length>0||this._selectedCategoryIds.length>0}get _visiblePeople(){let e=this._config.people,r=this._people.filter(i=>i.active);return e&&e.length>0?r.filter(i=>e.includes(i.id)):r}get _visibleCategories(){let e=this._config.visible_categories,r=this._categories.filter(i=>i.active);return e&&e.length>0?r.filter(i=>e.includes(i.id)):r}_setView(e){e!==this._view&&(this._view=e,this._fetchEvents())}_navStep(e){let r=new Date(this._currentDate);switch(this._view){case"day":r=x(r,e);break;case"week":r=x(r,7*e);break;case"month":r=new Date(r.getFullYear(),r.getMonth()+e,1);break;case"agenda":r=x(r,(this._config.agenda_days??14)*e);break;default:return}this._currentDate=r,this._fetchEvents()}_navToday(){this._currentDate=new Date,this._fetchEvents()}_onSearchInput(e){let r=e.target.value;this._debouncedSetSearch(r)}_togglePerson(e){this._selectedPersonIds=this._selectedPersonIds.includes(e)?this._selectedPersonIds.filter(r=>r!==e):[...this._selectedPersonIds,e]}_toggleCategory(e){this._selectedCategoryIds=this._selectedCategoryIds.includes(e)?this._selectedCategoryIds.filter(r=>r!==e):[...this._selectedCategoryIds,e]}_openCreate(e,r){if(this._config.read_only||!this._canWriteEvents)return;let i=n=>String(n).padStart(2,"0");this._createDraft={date:`${e.getFullYear()}-${i(e.getMonth()+1)}-${i(e.getDate())}`,time:`${i(e.getHours())}:${i(e.getMinutes())}`,allDay:r},this._editingEvent=null,this._dialogError=null}_openEdit(e){this._editingEvent=e,this._createDraft=null,this._dialogError=null,this._detailEvent=null}async _handleDialogSave(e){if(this._hass){this._dialogError=null;try{this._editingEvent?await tt(this._hass,{...e.detail,event_id:this._editingEvent.id,expected_version:this._editingEvent.version}):await Bt(this._hass,e.detail),this._editingEvent=null,this._createDraft=null,await this._fetchEvents()}catch(r){this._dialogError=r instanceof ue?a(this._hass.language,`error.${r.code}`):r instanceof Error?r.message:String(r)}}}_closeEventDialog(){this._editingEvent=null,this._createDraft=null,this._dialogError=null}async _handleDelete(e,r,i){if(this._hass)try{await jt(this._hass,e,r,i),this._detailEvent=null,await this._fetchEvents()}catch(n){this._error=n instanceof Error?n.message:String(n)}}async _handleDuplicate(e){if(this._hass)try{await Yt(this._hass,e),this._detailEvent=null,await this._fetchEvents()}catch(r){this._error=r instanceof Error?r.message:String(r)}}async _handleSetStatus(e,r){if(this._hass)try{await tt(this._hass,{event_id:e,status:r}),this._detailEvent=null,await this._fetchEvents()}catch(i){this._error=i instanceof Error?i.message:String(i)}}async _refreshPeople(){this._hass&&(this._people=await rt(this._hass))}async _refreshCategories(){this._hass&&(this._categories=await ot(this._hass))}_rangeLabel(){let e=this._hass;if(!e)return"";let r=e.language||"de";if(this._view==="today")return new Intl.DateTimeFormat(r,{weekday:"long",day:"numeric",month:"long"}).format(new Date);if(this._view==="day")return new Intl.DateTimeFormat(r,{weekday:"long",day:"numeric",month:"long"}).format(this._currentDate);if(this._view==="week"){let n=ee(this._currentDate,Me(e,this._config.first_weekday)),l=x(n,6),p=new Intl.DateTimeFormat(r,{day:"numeric",month:"short"});return`${p.format(n)} \u2013 ${p.format(l)}`}if(this._view==="month")return new Intl.DateTimeFormat(r,{month:"long",year:"numeric"}).format(this._currentDate);let i=new Intl.DateTimeFormat(r,{day:"numeric",month:"short"});return`${i.format(this._currentDate)} \u2013 ${i.format(x(this._currentDate,(this._config.agenda_days??14)-1))}`}_buildViewContext(){let e={onEventClick:r=>{this._detailEvent=r},onSlotClick:(r,i)=>this._openCreate(r,i),onMoreClick:(r,i)=>{this._dayDetail={date:r,events:i}}};return{hass:this._hass,config:this._config,events:this._filteredEvents,people:this._people,categories:this._categories,currentDate:this._view==="today"?new Date:this._currentDate,now:new Date,firstWeekday:Me(this._hass,this._config.first_weekday),use24h:or(this._hass,this._config.time_format),callbacks:e}}_renderView(){let e=this._buildViewContext();switch(this._view){case"today":case"day":return ur(e);case"week":return fr(e);case"month":return mr(e);default:return dr(e)}}_renderFilterToggle(){if(!this._config.show_filters)return c;let e=this._hass?.language,r=this._selectedPersonIds.length+this._selectedCategoryIds.length;return s`
      <button
        type="button"
        class="fp-filter-toggle ${this._filtersExpanded?"active":""}"
        title=${a(e,"action.filter")}
        aria-expanded=${this._filtersExpanded?"true":"false"}
        @click=${()=>this._filtersExpanded=!this._filtersExpanded}
      >
        <ha-icon icon="mdi:filter-variant"></ha-icon>
        <span>${a(e,"action.filter")}</span>
        ${r>0?s`<span class="fp-filter-badge">${r}</span>`:c}
        <ha-icon icon=${this._filtersExpanded?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
      </button>
    `}_renderFilterBar(){if(!this._config.show_filters||!this._filtersExpanded)return c;let e=this._hass?.language;return s`
      <div class="fp-filterbar">
        <button
          type="button"
          class="fp-person-chip fp-person-chip-all ${this._selectedPersonIds.length===0?"active":""}"
          @click=${()=>this._selectedPersonIds=[]}
        >
          ${a(e,"filter.all_people")}
        </button>
        ${this._visiblePeople.map(r=>s`
            <button
              type="button"
              class="fp-person-chip ${this._selectedPersonIds.includes(r.id)?"active":""}"
              style="--fp-chip-color:${r.color}"
              @click=${()=>this._togglePerson(r.id)}
            >
              <span class="fp-person-chip-dot" style="background:${r.color}"></span>${r.name}
            </button>
          `)}
        ${this._visibleCategories.map(r=>s`
            <button
              type="button"
              class="fp-category-chip ${this._selectedCategoryIds.includes(r.id)?"active":""}"
              style="--fp-chip-color:${r.color}"
              @click=${()=>this._toggleCategory(r.id)}
            >
              ${r.icon?s`<ha-icon icon=${r.icon}></ha-icon>`:c}${r.name}
            </button>
          `)}
      </div>
    `}_renderFlatList(){return lr(this._buildViewContext())}render(){if(!this._hass||!this._config)return s`<ha-card><div class="fp-loading">…</div></ha-card>`;let e=this._hass.language;return s`
      <ha-card>
        ${this._connectionLost?s`<div class="fp-banner fp-banner-error">${a(e,"error.connection_lost")}</div>`:c}
        ${this._error?s`<div class="fp-banner fp-banner-error">
              ${this._error}
              <button type="button" @click=${()=>void this._fetchEvents()}>${a(e,"error.reload")}</button>
            </div>`:c}
        <div class="fp-header">
          <div class="fp-header-top">
            <div class="fp-title">${this._config.title??"Familienkalender"}</div>
            <div class="fp-header-actions">
              ${this._isAdmin?s`
                    <ha-icon-button
                      title=${a(e,"action.manage_people")}
                      @click=${()=>this._peopleManagerOpen=!0}
                    >
                      <ha-icon icon="mdi:account-multiple"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      title=${a(e,"action.manage_categories")}
                      @click=${()=>this._categoryManagerOpen=!0}
                    >
                      <ha-icon icon="mdi:tag-multiple"></ha-icon>
                    </ha-icon-button>
                  `:c}
              ${(this._config.show_add_button??!0)&&!this._config.read_only&&this._canWriteEvents?s`
                    <button
                      type="button"
                      class="fp-fab"
                      title=${a(e,"action.add_event")}
                      aria-label=${a(e,"action.add_event")}
                      @click=${()=>this._openCreate(new Date,!1)}
                    >
                      <ha-icon icon="mdi:plus"></ha-icon>
                    </button>
                  `:c}
            </div>
          </div>
          <div class="fp-header-nav">
            <div class="fp-view-switch" role="tablist">
              ${ri.map(r=>s`
                  <button
                    role="tab"
                    aria-selected=${this._view===r}
                    class=${this._view===r?"active":""}
                    @click=${()=>this._setView(r)}
                  >
                    ${a(e,`view.${r}`)}
                  </button>
                `)}
            </div>
            ${this._view!=="today"?s`
                  <div class="fp-nav-arrows">
                    <ha-icon-button title=${a(e,"nav.prev")} @click=${()=>this._navStep(-1)}>
                      <ha-icon icon="mdi:chevron-left"></ha-icon>
                    </ha-icon-button>
                    <button type="button" class="fp-nav-today" @click=${()=>this._navToday()}>
                      ${a(e,"nav.today")}
                    </button>
                    <ha-icon-button title=${a(e,"nav.next")} @click=${()=>this._navStep(1)}>
                      <ha-icon icon="mdi:chevron-right"></ha-icon>
                    </ha-icon-button>
                  </div>
                `:c}
            <div class="fp-range-label">${this._rangeLabel()}</div>
          </div>
          ${this._config.show_search||this._config.show_filters?s`
                <div class="fp-search-row">
                  ${this._config.show_search?s`
                        <input
                          class="fp-search"
                          type="search"
                          placeholder=${a(e,"filter.search_placeholder")}
                          @input=${r=>this._onSearchInput(r)}
                        />
                      `:c}
                  ${this._renderFilterToggle()}
                </div>
              `:c}
          ${this._renderFilterBar()}
        </div>
        <div class="fp-body ${this._config.compact?"fp-compact":""}">
          ${this._loading?s`<div class="fp-loading">…</div>`:this._showFlatList?this._renderFlatList():this._renderView()}
        </div>
      </ha-card>

      ${this._createDraft||this._editingEvent?s`
            <family-planner-event-dialog
              .hass=${this._hass}
              .config=${this._config}
              .people=${this._people}
              .categories=${this._categories}
              .event=${this._editingEvent}
              .prefill=${this._createDraft}
              .serverError=${this._dialogError}
              .requirePerson=${this._requirePerson}
              .enableCategories=${this._enableCategories}
              .enableStatus=${this._enableStatus}
              .defaultReminderMinutes=${this._defaultReminderMinutes}
              .defaultColors=${this._defaultColors}
              .defaultIcons=${this._defaultIcons}
              @fp-save=${r=>void this._handleDialogSave(r)}
              @fp-close=${()=>this._closeEventDialog()}
            ></family-planner-event-dialog>
          `:c}
      ${this._detailEvent?s`
            <family-planner-event-detail-dialog
              .hass=${this._hass}
              .people=${this._people}
              .categories=${this._categories}
              .event=${this._detailEvent}
              .canWrite=${this._canWriteEvents&&!this._config.read_only}
              @fp-edit=${r=>this._openEdit(r.detail)}
              @fp-delete=${r=>void this._handleDelete(this._detailEvent.id,r.detail.mode,r.detail.occurrenceStart)}
              @fp-duplicate=${()=>void this._handleDuplicate(this._detailEvent.id)}
              @fp-set-status=${r=>void this._handleSetStatus(this._detailEvent.id,r.detail)}
              @fp-close=${()=>this._detailEvent=null}
            ></family-planner-event-detail-dialog>
          `:c}
      ${this._dayDetail?s`
            <family-planner-day-detail-dialog
              .hass=${this._hass}
              .people=${this._people}
              .categories=${this._categories}
              .date=${this._dayDetail.date}
              .events=${this._dayDetail.events}
              .canWrite=${this._canWriteEvents&&!this._config.read_only}
              @fp-event-click=${r=>{this._dayDetail=null,this._detailEvent=r.detail}}
              @fp-add-event=${r=>{this._dayDetail=null,this._openCreate(r.detail.date,!0)}}
              @fp-close=${()=>this._dayDetail=null}
            ></family-planner-day-detail-dialog>
          `:c}
      ${this._peopleManagerOpen?s`
            <family-planner-people-manager-dialog
              .hass=${this._hass}
              .people=${this._people}
              .defaultColors=${this._defaultColors}
              @fp-people-changed=${()=>void this._refreshPeople()}
              @fp-close=${()=>this._peopleManagerOpen=!1}
            ></family-planner-people-manager-dialog>
          `:c}
      ${this._categoryManagerOpen?s`
            <family-planner-category-manager-dialog
              .hass=${this._hass}
              .categories=${this._categories}
              .defaultColors=${this._defaultColors}
              .defaultIcons=${this._defaultIcons}
              @fp-categories-changed=${()=>void this._refreshCategories()}
              @fp-close=${()=>this._categoryManagerOpen=!1}
            ></family-planner-category-manager-dialog>
          `:c}
    `}};y.styles=er,d([u()],y.prototype,"_config",2),d([u()],y.prototype,"_view",2),d([u()],y.prototype,"_currentDate",2),d([u()],y.prototype,"_events",2),d([u()],y.prototype,"_people",2),d([u()],y.prototype,"_categories",2),d([u()],y.prototype,"_loading",2),d([u()],y.prototype,"_error",2),d([u()],y.prototype,"_connectionLost",2),d([u()],y.prototype,"_search",2),d([u()],y.prototype,"_selectedPersonIds",2),d([u()],y.prototype,"_selectedCategoryIds",2),d([u()],y.prototype,"_filtersExpanded",2),d([u()],y.prototype,"_canWriteEvents",2),d([u()],y.prototype,"_isAdmin",2),d([u()],y.prototype,"_requirePerson",2),d([u()],y.prototype,"_enableCategories",2),d([u()],y.prototype,"_enableStatus",2),d([u()],y.prototype,"_defaultReminderMinutes",2),d([u()],y.prototype,"_defaultColors",2),d([u()],y.prototype,"_defaultIcons",2),d([u()],y.prototype,"_createDraft",2),d([u()],y.prototype,"_editingEvent",2),d([u()],y.prototype,"_dialogError",2),d([u()],y.prototype,"_detailEvent",2),d([u()],y.prototype,"_dayDetail",2),d([u()],y.prototype,"_peopleManagerOpen",2),d([u()],y.prototype,"_categoryManagerOpen",2),y=d([D("family-planner-card")],y);window.customCards=window.customCards||[];window.customCards.push({type:"family-planner-card",name:"Family Planner",description:"Lokaler Familienkalender mit Personen, Kategorien und \xDCberlappungs-Ansicht.",preview:!0});})();
//# sourceMappingURL=family-planner-card.js.map
