"use strict";(()=>{var mt=Object.defineProperty;var vr=Object.getOwnPropertyDescriptor;var k=(o,r)=>()=>(o&&(r=o(o=0)),r);var _r=(o,r)=>{for(var e in r)mt(o,e,{get:r[e],enumerable:!0})};var c=(o,r,e,t)=>{for(var i=t>1?void 0:t?vr(r,e):r,n=o.length-1,s;n>=0;n--)(s=o[n])&&(i=(t?s(r,e,i):s(i))||i);return t&&i&&mt(r,e,i),i};var Ee,ke,ze,ft,ie,gt,C,vt,We,qe=k(()=>{Ee=globalThis,ke=Ee.ShadowRoot&&(Ee.ShadyCSS===void 0||Ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ze=Symbol(),ft=new WeakMap,ie=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o,e=this.t;if(ke&&r===void 0){let t=e!==void 0&&e.length===1;t&&(r=ft.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&ft.set(e,r))}return r}toString(){return this.cssText}},gt=o=>new ie(typeof o=="string"?o:o+"",void 0,ze),C=(o,...r)=>{let e=o.length===1?o[0]:r.reduce((t,i,n)=>t+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new ie(e,o,ze)},vt=(o,r)=>{if(ke)o.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of r){let t=document.createElement("style"),i=Ee.litNonce;i!==void 0&&t.setAttribute("nonce",i),t.textContent=e.cssText,o.appendChild(t)}},We=ke?o=>o:o=>o instanceof CSSStyleSheet?(r=>{let e="";for(let t of r.cssRules)e+=t.cssText;return gt(e)})(o):o});var yr,br,$r,xr,wr,Er,Ce,_t,kr,Cr,oe,ne,Te,yt,N,se=k(()=>{qe();qe();({is:yr,defineProperty:br,getOwnPropertyDescriptor:$r,getOwnPropertyNames:xr,getOwnPropertySymbols:wr,getPrototypeOf:Er}=Object),Ce=globalThis,_t=Ce.trustedTypes,kr=_t?_t.emptyScript:"",Cr=Ce.reactiveElementPolyfillSupport,oe=(o,r)=>o,ne={toAttribute(o,r){switch(r){case Boolean:o=o?kr:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,r){let e=o;switch(r){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},Te=(o,r)=>!yr(o,r),yt={attribute:!0,type:String,converter:ne,reflect:!1,useDefault:!1,hasChanged:Te};Symbol.metadata??=Symbol("metadata"),Ce.litPropertyMetadata??=new WeakMap;N=class extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??=[]).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=yt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){let t=Symbol(),i=this.getPropertyDescriptor(r,t,e);i!==void 0&&br(this.prototype,r,i)}}static getPropertyDescriptor(r,e,t){let{get:i,set:n}=$r(this.prototype,r)??{get(){return this[e]},set(s){this[e]=s}};return{get:i,set(s){let p=i?.call(this);n?.call(this,s),this.requestUpdate(r,p,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??yt}static _$Ei(){if(this.hasOwnProperty(oe("elementProperties")))return;let r=Er(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oe("properties"))){let e=this.properties,t=[...xr(e),...wr(e)];for(let i of t)this.createProperty(i,e[i])}let r=this[Symbol.metadata];if(r!==null){let e=litPropertyMetadata.get(r);if(e!==void 0)for(let[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let i=this._$Eu(e,t);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){let e=[];if(Array.isArray(r)){let t=new Set(r.flat(1/0).reverse());for(let i of t)e.unshift(We(i))}else r!==void 0&&e.push(We(r));return e}static _$Eu(r,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(r=>r(this))}addController(r){(this._$EO??=new Set).add(r),this.renderRoot!==void 0&&this.isConnected&&r.hostConnected?.()}removeController(r){this._$EO?.delete(r)}_$E_(){let r=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){let r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return vt(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(r=>r.hostConnected?.())}enableUpdating(r){}disconnectedCallback(){this._$EO?.forEach(r=>r.hostDisconnected?.())}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){let t=this.constructor.elementProperties.get(r),i=this.constructor._$Eu(r,t);if(i!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:ne).toAttribute(e,t.type);this._$Em=r,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(r,e){let t=this.constructor,i=t._$Eh.get(r);if(i!==void 0&&this._$Em!==i){let n=t.getPropertyOptions(i),s=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ne;this._$Em=i;let p=s.fromAttribute(e,n.type);this[i]=p??this._$Ej?.get(i)??p,this._$Em=null}}requestUpdate(r,e,t,i=!1,n){if(r!==void 0){let s=this.constructor;if(i===!1&&(n=this[r]),t??=s.getPropertyOptions(r),!((t.hasChanged??Te)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(r)&&!this.hasAttribute(s._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:i,wrapped:n},s){t&&!(this._$Ej??=new Map).has(r)&&(this._$Ej.set(r,s??e??this[r]),n!==!0||s!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),i===!0&&this._$Em!==r&&(this._$Eq??=new Set).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[i,n]of t){let{wrapped:s}=n,p=this[i];s!==!0||this._$AL.has(i)||p===void 0||this.C(i,void 0,n,p)}}let r=!1,e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw r=!1,this._$EM(),t}r&&this._$AE(e)}willUpdate(r){}_$AE(r){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(r){}firstUpdated(r){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[oe("elementProperties")]=new Map,N[oe("finalized")]=new Map,Cr?.({ReactiveElement:N}),(Ce.reactiveElementVersions??=[]).push("2.1.2")});function Dt(o,r){if(!Je(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return $t!==void 0?$t.createHTML(r):r}function Z(o,r,e=o,t){if(r===j)return r;let i=t!==void 0?e._$Co?.[t]:e._$Cl,n=ce(r)?void 0:r._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,e,t)),t!==void 0?(e._$Co??=[])[t]=i:e._$Cl=i),i!==void 0&&(r=Z(o,i._$AS(o,r.values),i,t)),r}var Ge,bt,Se,$t,Tt,W,St,Tr,F,le,ce,Je,Sr,Ve,ae,xt,wt,V,Et,kt,At,Ze,a,ii,oi,j,d,Ct,B,Ar,de,Be,pe,Q,Fe,je,Ye,Ke,Dr,It,Ae=k(()=>{Ge=globalThis,bt=o=>o,Se=Ge.trustedTypes,$t=Se?Se.createPolicy("lit-html",{createHTML:o=>o}):void 0,Tt="$lit$",W=`lit$${Math.random().toFixed(9).slice(2)}$`,St="?"+W,Tr=`<${St}>`,F=document,le=()=>F.createComment(""),ce=o=>o===null||typeof o!="object"&&typeof o!="function",Je=Array.isArray,Sr=o=>Je(o)||typeof o?.[Symbol.iterator]=="function",Ve=`[ 	
\f\r]`,ae=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xt=/-->/g,wt=/>/g,V=RegExp(`>|${Ve}(?:([^\\s"'>=/]+)(${Ve}*=${Ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Et=/'/g,kt=/"/g,At=/^(?:script|style|textarea|title)$/i,Ze=o=>(r,...e)=>({_$litType$:o,strings:r,values:e}),a=Ze(1),ii=Ze(2),oi=Ze(3),j=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Ct=new WeakMap,B=F.createTreeWalker(F,129);Ar=(o,r)=>{let e=o.length-1,t=[],i,n=r===2?"<svg>":r===3?"<math>":"",s=ae;for(let p=0;p<e;p++){let h=o[p],y,x,g=-1,b=0;for(;b<h.length&&(s.lastIndex=b,x=s.exec(h),x!==null);)b=s.lastIndex,s===ae?x[1]==="!--"?s=xt:x[1]!==void 0?s=wt:x[2]!==void 0?(At.test(x[2])&&(i=RegExp("</"+x[2],"g")),s=V):x[3]!==void 0&&(s=V):s===V?x[0]===">"?(s=i??ae,g=-1):x[1]===void 0?g=-2:(g=s.lastIndex-x[2].length,y=x[1],s=x[3]===void 0?V:x[3]==='"'?kt:Et):s===kt||s===Et?s=V:s===xt||s===wt?s=ae:(s=V,i=void 0);let m=s===V&&o[p+1].startsWith("/>")?" ":"";n+=s===ae?h+Tr:g>=0?(t.push(y),h.slice(0,g)+Tt+h.slice(g)+W+m):h+W+(g===-2?p:m)}return[Dt(o,n+(o[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]},de=class o{constructor({strings:r,_$litType$:e},t){let i;this.parts=[];let n=0,s=0,p=r.length-1,h=this.parts,[y,x]=Ar(r,e);if(this.el=o.createElement(y,t),B.currentNode=this.el.content,e===2||e===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(i=B.nextNode())!==null&&h.length<p;){if(i.nodeType===1){if(i.hasAttributes())for(let g of i.getAttributeNames())if(g.endsWith(Tt)){let b=x[s++],m=i.getAttribute(g).split(W),E=/([.?@])?(.*)/.exec(b);h.push({type:1,index:n,name:E[2],strings:m,ctor:E[1]==="."?Fe:E[1]==="?"?je:E[1]==="@"?Ye:Q}),i.removeAttribute(g)}else g.startsWith(W)&&(h.push({type:6,index:n}),i.removeAttribute(g));if(At.test(i.tagName)){let g=i.textContent.split(W),b=g.length-1;if(b>0){i.textContent=Se?Se.emptyScript:"";for(let m=0;m<b;m++)i.append(g[m],le()),B.nextNode(),h.push({type:2,index:++n});i.append(g[b],le())}}}else if(i.nodeType===8)if(i.data===St)h.push({type:2,index:n});else{let g=-1;for(;(g=i.data.indexOf(W,g+1))!==-1;)h.push({type:7,index:n}),g+=W.length-1}n++}}static createElement(r,e){let t=F.createElement("template");return t.innerHTML=r,t}};Be=class{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){let{el:{content:e},parts:t}=this._$AD,i=(r?.creationScope??F).importNode(e,!0);B.currentNode=i;let n=B.nextNode(),s=0,p=0,h=t[0];for(;h!==void 0;){if(s===h.index){let y;h.type===2?y=new pe(n,n.nextSibling,this,r):h.type===1?y=new h.ctor(n,h.name,h.strings,this,r):h.type===6&&(y=new Ke(n,this,r)),this._$AV.push(y),h=t[++p]}s!==h?.index&&(n=B.nextNode(),s++)}return B.currentNode=F,i}p(r){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}},pe=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(r,e,t,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let r=this._$AA.parentNode,e=this._$AM;return e!==void 0&&r?.nodeType===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=Z(this,r,e),ce(r)?r===d||r==null||r===""?(this._$AH!==d&&this._$AR(),this._$AH=d):r!==this._$AH&&r!==j&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):Sr(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==d&&ce(this._$AH)?this._$AA.nextSibling.data=r:this.T(F.createTextNode(r)),this._$AH=r}$(r){let{values:e,_$litType$:t}=r,i=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=de.createElement(Dt(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new Be(i,this),s=n.u(this.options);n.p(e),this.T(s),this._$AH=n}}_$AC(r){let e=Ct.get(r.strings);return e===void 0&&Ct.set(r.strings,e=new de(r)),e}k(r){Je(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,i=0;for(let n of r)i===e.length?e.push(t=new o(this.O(le()),this.O(le()),this,this.options)):t=e[i],t._$AI(n),i++;i<e.length&&(this._$AR(t&&t._$AB.nextSibling,i),e.length=i)}_$AR(r=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);r!==this._$AB;){let t=bt(r).nextSibling;bt(r).remove(),r=t}}setConnected(r){this._$AM===void 0&&(this._$Cv=r,this._$AP?.(r))}},Q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,i,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=r,this.name=e,this._$AM=i,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=d}_$AI(r,e=this,t,i){let n=this.strings,s=!1;if(n===void 0)r=Z(this,r,e,0),s=!ce(r)||r!==this._$AH&&r!==j,s&&(this._$AH=r);else{let p=r,h,y;for(r=n[0],h=0;h<n.length-1;h++)y=Z(this,p[t+h],e,h),y===j&&(y=this._$AH[h]),s||=!ce(y)||y!==this._$AH[h],y===d?r=d:r!==d&&(r+=(y??"")+n[h+1]),this._$AH[h]=y}s&&!i&&this.j(r)}j(r){r===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}},Fe=class extends Q{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===d?void 0:r}},je=class extends Q{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==d)}},Ye=class extends Q{constructor(r,e,t,i,n){super(r,e,t,i,n),this.type=5}_$AI(r,e=this){if((r=Z(this,r,e,0)??d)===j)return;let t=this._$AH,i=r===d&&t!==d||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,n=r!==d&&(t===d||i);i&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,r):this._$AH.handleEvent(r)}},Ke=class{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){Z(this,r)}},Dr=Ge.litHtmlPolyfillSupport;Dr?.(de,pe),(Ge.litHtmlVersions??=[]).push("3.3.3");It=(o,r,e)=>{let t=e?.renderBefore??r,i=t._$litPart$;if(i===void 0){let n=e?.renderBefore??null;t._$litPart$=i=new pe(r.insertBefore(le(),n),n,void 0,e??{})}return i._$AI(o),i}});var Qe,$,Ir,Rt=k(()=>{se();se();Ae();Ae();Qe=globalThis,$=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let r=super.createRenderRoot();return this.renderOptions.renderBefore??=r.firstChild,r}update(r){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=It(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};$._$litElement$=!0,$.finalized=!0,Qe.litElementHydrateSupport?.({LitElement:$});Ir=Qe.litElementPolyfillSupport;Ir?.({LitElement:$});(Qe.litElementVersions??=[]).push("4.2.2")});var Mt=k(()=>{});var T=k(()=>{se();Ae();Rt();Mt()});var S,Lt=k(()=>{S=o=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(o,r)}):customElements.define(o,r)}});function f(o){return(r,e)=>typeof e=="object"?Mr(o,r,e):((t,i,n)=>{let s=i.hasOwnProperty(n);return i.constructor.createProperty(n,t),s?Object.getOwnPropertyDescriptor(i,n):void 0})(o,r,e)}var Rr,Mr,Xe=k(()=>{se();Rr={attribute:!0,type:String,converter:ne,reflect:!1,hasChanged:Te},Mr=(o=Rr,r,e)=>{let{kind:t,metadata:i}=e,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),t==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(e.name,o),t==="accessor"){let{name:s}=e;return{set(p){let h=r.get.call(this);r.set.call(this,p),this.requestUpdate(s,h,o,!0,p)},init(p){return p!==void 0&&this.C(s,void 0,o,p),p}}}if(t==="setter"){let{name:s}=e;return function(p){let h=this[s];r.call(this,p),this.requestUpdate(s,h,o,!0,p)}}throw Error("Unsupported decorator location: "+t)}});function u(o){return f({...o,state:!0,attribute:!1})}var Ht=k(()=>{Xe();});var Pt=k(()=>{});var X=k(()=>{});var Ot=k(()=>{X();});var Nt=k(()=>{X();});var Ut=k(()=>{X();});var zt=k(()=>{X();});var Wt=k(()=>{X();});var U=k(()=>{Lt();Xe();Ht();Pt();Ot();Nt();Ut();zt();Wt()});var He,dt=k(()=>{"use strict";He={default_view:"week",show_filters:!0,show_search:!0,show_add_button:!0,allow_edit:!0,show_done_events:!0,show_cancelled_events:!1,show_weekends:!0,show_week_numbers:!0,start_hour:6,end_hour:22,time_step:30,time_format:"auto",max_events_per_day:3,agenda_days:14,dim_past_events:!0,color_mode:"person",compact:!1,show_now_line:!0,highlight_today:!0,read_only:!1,first_weekday:"monday"}});var fr={};_r(fr,{FamilyPlannerCardEditor:()=>G});var Kr,Gr,G,gr=k(()=>{"use strict";T();U();dt();Kr={title:"Titel",default_view:"Standardansicht",show_filters:"Filterleiste anzeigen",show_search:"Suchfeld anzeigen",show_add_button:"Plus-Schaltfl\xE4che anzeigen",allow_edit:"Erstellen/Bearbeiten erlauben",read_only:"Nur-Lesen-Modus (Kiosk)",show_done_events:"Erledigte Termine anzeigen",show_cancelled_events:"Abgesagte Termine anzeigen",show_weekends:"Wochenenden anzeigen",show_week_numbers:"Kalenderwochen anzeigen",start_hour:"Startstunde",end_hour:"Endstunde",time_step:"Zeitschritt (Minuten)",time_format:"Zeitformat",max_events_per_day:"Max. Termine pro Tag (Monatsansicht)",agenda_days:"Agenda-Zeitraum (Tage)",dim_past_events:"Vergangene Termine abdunkeln",color_mode:"Farbmodus",compact:"Kompakter Modus",show_now_line:"\u201EJetzt\u201C-Linie anzeigen",highlight_today:"Heutiges Datum hervorheben",first_weekday:"Erster Wochentag"},Gr=[{name:"title",selector:{text:{}}},{name:"default_view",selector:{select:{options:["today","day","week","month","agenda"],mode:"dropdown"}}},{type:"grid",name:"",schema:[{name:"show_filters",selector:{boolean:{}}},{name:"show_search",selector:{boolean:{}}},{name:"show_add_button",selector:{boolean:{}}},{name:"allow_edit",selector:{boolean:{}}},{name:"read_only",selector:{boolean:{}}},{name:"show_done_events",selector:{boolean:{}}},{name:"show_cancelled_events",selector:{boolean:{}}},{name:"show_weekends",selector:{boolean:{}}},{name:"show_week_numbers",selector:{boolean:{}}},{name:"dim_past_events",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}},{name:"show_now_line",selector:{boolean:{}}},{name:"highlight_today",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"start_hour",selector:{number:{min:0,max:23,mode:"box"}}},{name:"end_hour",selector:{number:{min:1,max:24,mode:"box"}}},{name:"time_step",selector:{number:{min:5,max:60,step:5,mode:"box"}}},{name:"max_events_per_day",selector:{number:{min:1,max:10,mode:"box"}}},{name:"agenda_days",selector:{number:{min:1,max:60,mode:"box"}}}]},{name:"time_format",selector:{select:{options:["auto","12","24"],mode:"dropdown"}}},{name:"color_mode",selector:{select:{options:["person","category"],mode:"dropdown"}}},{name:"first_weekday",selector:{select:{options:["monday","sunday"],mode:"dropdown"}}}],G=class extends ${constructor(){super(...arguments);this._computeLabel=e=>Kr[e.name]??e.name}setConfig(e){this._config={...He,...e,type:e.type}}_valueChanged(e){e.stopPropagation(),this._config=e.detail.value,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}render(){return!this.hass||!this._config?d:a`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Gr}
        .computeLabel=${this._computeLabel}
        @value-changed=${e=>this._valueChanged(e)}
      ></ha-form>
    `}};c([f({attribute:!1})],G.prototype,"hass",2),c([u()],G.prototype,"_config",2),G=c([S("family-planner-card-editor")],G)});T();U();var he=class extends Error{constructor(r){super(r.message),this.code=r.code,this.current=r.current}};async function A(o,r){let e=await o.callWS(r);if(e&&typeof e=="object"&&"error"in e&&e.error)throw new he(e.error);return e}function qt(o){return A(o,{type:"family_planner/config"})}async function Vt(o,r){return(await A(o,{type:"family_planner/events/get",...r})).events}async function Bt(o,r){return(await A(o,{type:"family_planner/events/create",...r})).event}async function et(o,r){return(await A(o,{type:"family_planner/events/update",...r})).event}async function Ft(o,r,e="series",t){await A(o,{type:"family_planner/events/delete",event_id:r,mode:e,occurrence_start:t})}async function jt(o,r,e,t){return(await A(o,{type:"family_planner/events/duplicate",event_id:r,start:e,end:t})).event}async function tt(o){return(await A(o,{type:"family_planner/people/list"})).people}async function Yt(o,r){return(await A(o,{type:"family_planner/people/create",...r})).person}async function rt(o,r,e){return(await A(o,{type:"family_planner/people/update",person_id:r,...e})).person}async function Kt(o,r,e,t){await A(o,{type:"family_planner/people/delete",person_id:r,strategy:e,reassign_to:t})}async function Gt(o,r){return(await A(o,{type:"family_planner/people/reorder",ordered_ids:r})).people}async function it(o){return(await A(o,{type:"family_planner/categories/list"})).categories}async function Jt(o,r){return(await A(o,{type:"family_planner/categories/create",...r})).category}async function ot(o,r,e){return(await A(o,{type:"family_planner/categories/update",category_id:r,...e})).category}async function Zt(o,r){await A(o,{type:"family_planner/categories/delete",category_id:r})}async function Qt(o,r){return(await A(o,{type:"family_planner/categories/reorder",ordered_ids:r})).categories}T();var Xt=C`
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

  .fp-filterbar {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .fp-person-chip,
  .fp-category-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    border-radius: 16px;
    padding: 6px 12px;
    min-height: 36px;
    font-size: 0.85rem;
  }
  .fp-person-chip.active,
  .fp-category-chip.active {
    border-color: var(--fp-chip-color, var(--primary-color));
    background: color-mix(in srgb, var(--fp-chip-color, var(--primary-color)) 18%, var(--card-background-color, #fff));
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
`;var er=[0,5,15,30,60,1440],z=["#e53935","#1e88e5","#43a047","#fb8c00","#8e24aa","#00acc1","#fdd835","#6d4c41","#3949ab","#d81b60"],Y=["mdi:calendar","mdi:school","mdi:briefcase","mdi:soccer","mdi:cake-variant","mdi:medical-bag","mdi:home","mdi:airplane","mdi:music","mdi:star"],ue=60;var I=o=>String(o).padStart(2,"0");function me(o){return`${o.getFullYear()}-${I(o.getMonth()+1)}-${I(o.getDate())}`}function Lr(o){let r=-o.getTimezoneOffset(),e=r>=0?"+":"-",t=I(Math.floor(Math.abs(r)/60)),i=I(Math.abs(r)%60);return`${o.getFullYear()}-${I(o.getMonth()+1)}-${I(o.getDate())}T${I(o.getHours())}:${I(o.getMinutes())}:${I(o.getSeconds())}${e}${t}:${i}`}function tr(o,r){let[e,t]=(r||"00:00").split(":").map(Number),[i,n,s]=o.split("-").map(Number);return new Date(i,(n||1)-1,s||1,e||0,t||0,0)}function st(o,r){return Lr(tr(o,r))}function Ie(o){return`${I(o.getHours())}:${I(o.getMinutes())}`}function rr(o,r,e){let t=tr(o,r);return t.setMinutes(t.getMinutes()+e),{date:me(t),time:Ie(t)}}function at(o,r){let[e,t,i]=o.split("-").map(Number),n=new Date(e,(t||1)-1,i||1,12,0,0);return n.setDate(n.getDate()+r),me(n)}function w(o,r){let e=new Date(o);return e.setDate(e.getDate()+r),e}function ee(o,r){let e=new Date(o);e.setHours(0,0,0,0);let t=e.getDay(),i=r==="monday"?t===0?6:t-1:t;return w(e,-i)}function Re(o,r){let e=new Date(o.getFullYear(),o.getMonth(),1);return ee(e,r)}function H(o,r){return o.getFullYear()===r.getFullYear()&&o.getMonth()===r.getMonth()&&o.getDate()===r.getDate()}function ir(o,r){if(r==="24")return!0;if(r==="12")return!1;let e=o.locale?.time_format;if(e==="24")return!0;if(e==="12")return!1;try{return!new Intl.DateTimeFormat(o.language||"en",{hour:"numeric"}).formatToParts(new Date(2e3,0,1,13)).some(i=>i.type==="dayPeriod")}catch{return!0}}function fe(o,r){if(r)return`${I(o.getHours())}:${I(o.getMinutes())}`;let e=o.getHours()%12||12,t=o.getHours()<12?"AM":"PM";return`${e}:${I(o.getMinutes())} ${t}`}function Me(o){let r=new Date(Date.UTC(o.getFullYear(),o.getMonth(),o.getDate())),e=r.getUTCDay()||7;r.setUTCDate(r.getUTCDate()+4-e);let t=new Date(Date.UTC(r.getUTCFullYear(),0,1));return Math.ceil(((r.getTime()-t.getTime())/864e5+1)/7)}function Le(o,r){if(r)return r;let e=o.locale?.first_weekday;return e==="monday"||e==="sunday"?e:"monday"}function lt(o,r){let e;return(...t)=>{e&&clearTimeout(e),e=setTimeout(()=>o(...t),r)}}function or(o,r){let e=o;r.showDoneEvents||(e=e.filter(i=>i.status!=="done")),r.showCancelledEvents||(e=e.filter(i=>i.status!=="cancelled")),r.personIds.length>0&&(e=e.filter(i=>i.person_ids.some(n=>r.personIds.includes(n)))),r.categoryIds.length>0&&(e=e.filter(i=>i.category_id!==null&&r.categoryIds.includes(i.category_id)));let t=r.search.trim().toLowerCase();return t&&(e=e.filter(i=>[i.title,i.subtitle,i.description,i.location].filter(n=>!!n).some(n=>n.toLowerCase().includes(t)))),[...e]}var Hr={"view.today":"Heute","view.day":"Tag","view.week":"Woche","view.month":"Monat","view.agenda":"Agenda","nav.today":"Heute","nav.prev":"Zur\xFCck","nav.next":"Weiter","action.add_event":"Termin hinzuf\xFCgen","action.search":"Suchen","action.filter":"Filter","action.save":"Speichern","action.cancel":"Abbrechen","action.delete":"L\xF6schen","action.edit":"Bearbeiten","action.duplicate":"Duplizieren","action.close":"Schlie\xDFen","action.done":"Fertig","action.mark_done":"Als erledigt markieren","action.manage_people":"Personen verwalten","action.manage_categories":"Kategorien verwalten","action.export":"Als JSON exportieren","action.import":"JSON importieren","event.title":"Titel","event.subtitle":"Untertitel","event.start_date":"Startdatum","event.start_time":"Startzeit","event.end_date":"Enddatum","event.end_time":"Endzeit","event.all_day":"Ganzt\xE4gig","event.people":"Personen","event.description":"Beschreibung","event.location":"Ort","event.category":"Kategorie","event.color":"Farbe","event.icon":"Symbol","event.status":"Status","event.reminders":"Erinnerungen","event.repeat":"Wiederholung","event.repeat_none":"Keine Wiederholung","event.new_title":"Neuer Termin","event.edit_title":"Termin bearbeiten","event.no_people":"Keine Person zugewiesen","status.planned":"Geplant","status.confirmed":"Best\xE4tigt","status.tentative":"Optional","status.done":"Erledigt","status.cancelled":"Abgesagt","validation.title_required":"Bitte einen Titel eingeben.","validation.end_before_start":"Das Ende darf nicht vor dem Start liegen.","validation.person_required":"Bitte mindestens eine Person ausw\xE4hlen.","empty.no_events":"Keine Termine","empty.no_events_hint":"F\xFCr diesen Zeitraum sind keine Termine vorhanden. Tippe auf +, um einen Termin zu erstellen.","month.more":"+{count} weitere","dialog.confirm_delete_title":"Termin l\xF6schen?","dialog.confirm_delete_series":"Ganze Serie l\xF6schen","dialog.confirm_delete_instance":"Nur diesen Termin l\xF6schen","dialog.unsaved_changes_title":"Ungespeicherte \xC4nderungen","dialog.unsaved_changes_message":"Es gibt ungespeicherte \xC4nderungen. Trotzdem schlie\xDFen?","dialog.discard":"Verwerfen","dialog.keep_editing":"Weiter bearbeiten","people.title":"Personen","people.add":"Person hinzuf\xFCgen","people.name":"Name","people.color":"Farbe","people.role":"Rolle","people.role.parent":"Elternteil","people.role.child":"Kind","people.role.other":"Sonstige","people.active":"Aktiv","people.delete_title":"Person l\xF6schen?","people.delete_strategy.deactivate":"Nur deaktivieren","people.delete_strategy.remove_from_events":"Aus Terminen entfernen","people.delete_strategy.reassign":"Terminen einer anderen Person zuweisen","people.delete_strategy.keep_unassigned":"Termine ohne Personenzuweisung behalten","people.reassign_to":"Neu zuweisen an","category.title":"Kategorien","category.add":"Kategorie hinzuf\xFCgen","category.name":"Name","category.color":"Farbe","category.none":"Keine Kategorie","filter.all_people":"Alle Personen","filter.search_placeholder":"Termine durchsuchen\u2026","error.connection_lost":"Verbindung zu Home Assistant verloren. Es wird versucht, erneut zu verbinden\u2026","error.forbidden":"Keine Berechtigung f\xFCr diese Aktion.","error.conflict":"Dieser Termin wurde inzwischen auf einem anderen Ger\xE4t ge\xE4ndert.","error.not_found":"Dieser Termin existiert nicht mehr.","error.invalid_data":"Ung\xFCltige Eingabe.","error.not_loaded":"Family Planner wird noch geladen\u2026","error.unknown_error":"Unbekannter Fehler.","error.reload":"Neu laden","reminder.at_start":"Zum Startzeitpunkt","reminder.5":"5 Minuten vorher","reminder.15":"15 Minuten vorher","reminder.30":"30 Minuten vorher","reminder.60":"1 Stunde vorher","reminder.1440":"1 Tag vorher","reminder.custom":"Eigener Wert (Minuten)","weekday.short.0":"So","weekday.short.1":"Mo","weekday.short.2":"Di","weekday.short.3":"Mi","weekday.short.4":"Do","weekday.short.5":"Fr","weekday.short.6":"Sa",calendar_week_short:"KW"},Pr={"view.today":"Today","view.day":"Day","view.week":"Week","view.month":"Month","view.agenda":"Agenda","nav.today":"Today","nav.prev":"Previous","nav.next":"Next","action.add_event":"Add event","action.search":"Search","action.filter":"Filter","action.save":"Save","action.cancel":"Cancel","action.delete":"Delete","action.edit":"Edit","action.duplicate":"Duplicate","action.close":"Close","action.done":"Done","action.mark_done":"Mark as done","action.manage_people":"Manage people","action.manage_categories":"Manage categories","action.export":"Export as JSON","action.import":"Import JSON","event.title":"Title","event.subtitle":"Subtitle","event.start_date":"Start date","event.start_time":"Start time","event.end_date":"End date","event.end_time":"End time","event.all_day":"All day","event.people":"People","event.description":"Description","event.location":"Location","event.category":"Category","event.color":"Color","event.icon":"Icon","event.status":"Status","event.reminders":"Reminders","event.repeat":"Repeat","event.repeat_none":"Does not repeat","event.new_title":"New event","event.edit_title":"Edit event","event.no_people":"No one assigned","status.planned":"Planned","status.confirmed":"Confirmed","status.tentative":"Tentative","status.done":"Done","status.cancelled":"Cancelled","validation.title_required":"Please enter a title.","validation.end_before_start":"The end must not be before the start.","validation.person_required":"Please select at least one person.","empty.no_events":"No events","empty.no_events_hint":"There are no events in this range. Tap + to create one.","month.more":"+{count} more","dialog.confirm_delete_title":"Delete event?","dialog.confirm_delete_series":"Delete whole series","dialog.confirm_delete_instance":"Delete only this occurrence","dialog.unsaved_changes_title":"Unsaved changes","dialog.unsaved_changes_message":"You have unsaved changes. Close anyway?","dialog.discard":"Discard","dialog.keep_editing":"Keep editing","people.title":"People","people.add":"Add person","people.name":"Name","people.color":"Color","people.role":"Role","people.role.parent":"Parent","people.role.child":"Child","people.role.other":"Other","people.active":"Active","people.delete_title":"Delete person?","people.delete_strategy.deactivate":"Deactivate only","people.delete_strategy.remove_from_events":"Remove from events","people.delete_strategy.reassign":"Reassign events to another person","people.delete_strategy.keep_unassigned":"Keep events without a person assigned","people.reassign_to":"Reassign to","category.title":"Categories","category.add":"Add category","category.name":"Name","category.color":"Color","category.none":"No category","filter.all_people":"All people","filter.search_placeholder":"Search events\u2026","error.connection_lost":"Connection to Home Assistant lost. Reconnecting\u2026","error.forbidden":"You are not allowed to do this.","error.conflict":"This event was changed on another device in the meantime.","error.not_found":"This event no longer exists.","error.invalid_data":"Invalid input.","error.not_loaded":"Family Planner is still loading\u2026","error.unknown_error":"Unknown error.","error.reload":"Reload","reminder.at_start":"At start time","reminder.5":"5 minutes before","reminder.15":"15 minutes before","reminder.30":"30 minutes before","reminder.60":"1 hour before","reminder.1440":"1 day before","reminder.custom":"Custom (minutes)","weekday.short.0":"Sun","weekday.short.1":"Mon","weekday.short.2":"Tue","weekday.short.3":"Wed","weekday.short.4":"Thu","weekday.short.5":"Fri","weekday.short.6":"Sat",calendar_week_short:"W"},ct={de:Hr,en:Pr};function l(o,r,e){let t=(o||"de").split("-")[0],n=(ct[t]||ct.de)[r]??ct.de[r]??r;if(e)for(let[s,p]of Object.entries(e))n=n.replace(`{${s}}`,String(p));return n}dt();T();T();function Or(o){let r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o.trim());return r?[parseInt(r[1],16),parseInt(r[2],16),parseInt(r[3],16)]:null}function nr(o){let r=Or(o);if(!r)return"#000000";let[e,t,i]=r.map(s=>{let p=s/255;return p<=.03928?p/12.92:Math.pow((p+.055)/1.055,2.4)});return .2126*e+.7152*t+.0722*i>.42?"#000000":"#ffffff"}function q(o,r,e,t){if(o.color)return o.color;if(t==="category"&&o.category_id){let i=e.find(n=>n.id===o.category_id);if(i)return i.color}if(o.person_ids.length>0){let i=r.find(n=>n.id===o.person_ids[0]);if(i)return i.color}if(o.category_id){let i=e.find(n=>n.id===o.category_id);if(i)return i.color}return"var(--primary-color, #03a9f4)"}function ge(o,r){return o.person_ids.map(e=>r.find(t=>t.id===e)).filter(e=>!!e)}function ve(o,r=4,e){let t=o.slice(0,r),i=o.length-t.length;return a`
    <span class="fp-person-dots" role="img" aria-label=${o.map(n=>n.name).join(", ")||l(e,"event.no_people")}>
      ${t.map(n=>a`<span class="fp-person-dot" style="background:${n.color}" title=${n.name}>${n.name.slice(0,1)}</span>`)}
      ${i>0?a`<span class="fp-person-dot fp-person-dot-more">+${i}</span>`:d}
    </span>
  `}function _e(o,r){return o.all_day?"":fe(new Date(o.occurrence_start),r)}function Nr(o,r){return new Date(o.occurrence_end).getTime()<r.getTime()}function ye(o,r,e){let t=q(r,o.people,o.categories,o.config.color_mode??"person"),i=nr(t),n=ge(r,o.people),s=(o.config.dim_past_events??!0)&&Nr(r,o.now),p=r.status==="cancelled",h=["fp-chip",s?"fp-past":"",p?"fp-cancelled":""].filter(Boolean).join(" ");return a`
    <button
      type="button"
      class=${h}
      style="background:${t};color:${i}"
      title=${r.title}
      @click=${y=>{y.stopPropagation(),o.callbacks.onEventClick(r)}}
    >
      ${r.icon?a`<ha-icon icon=${r.icon} class="fp-chip-icon"></ha-icon>`:d}
      ${!r.all_day&&!e?.compact?a`<span class="fp-chip-time">${_e(r,o.use24h)}</span>`:d}
      <span class="fp-chip-title">${r.title}</span>
      ${n.length>1?ve(n,3,o.hass.language):d}
    </button>
  `}function sr(o,r){return o?l(r,`status.${o}`):""}function ar(o){let r=o.config.agenda_days??14,e=[];for(let i=0;i<r;i++)e.push(w(o.currentDate,i));let t=e.map(i=>({day:i,events:o.events.filter(n=>H(new Date(n.occurrence_start),i)||n.all_day&&Ur(n,i)).sort((n,s)=>new Date(n.occurrence_start).getTime()-new Date(s.occurrence_start).getTime())})).filter(i=>i.events.length>0);return t.length===0?a`
      <div class="fp-empty-state">
        <ha-icon icon="mdi:calendar-blank-outline"></ha-icon>
        <div class="fp-empty-title">${l(o.hass.language,"empty.no_events")}</div>
        <div class="fp-empty-hint">${l(o.hass.language,"empty.no_events_hint")}</div>
      </div>
    `:a`
    <div class="fp-view fp-view-agenda">
      ${t.map(i=>a`
          <div class="fp-agenda-group">
            <div class="fp-agenda-daylabel ${H(i.day,o.now)?"fp-today":""}">
              ${l(o.hass.language,`weekday.short.${i.day.getDay()}`)} ${i.day.getDate()}.${i.day.getMonth()+1}.
            </div>
            <div class="fp-agenda-items">
              ${i.events.map(n=>zr(o,n))}
            </div>
          </div>
        `)}
    </div>
  `}function Ur(o,r){let e=new Date(o.occurrence_start),t=new Date(o.occurrence_end),i=new Date(r.getFullYear(),r.getMonth(),r.getDate()),n=w(i,1);return e<n&&t>i}function zr(o,r){let e=q(r,o.people,o.categories,o.config.color_mode??"person"),t=ge(r,o.people);return a`
    <button
      type="button"
      class="fp-agenda-item ${r.status==="cancelled"?"fp-cancelled":""}"
      @click=${()=>o.callbacks.onEventClick(r)}
    >
      <span class="fp-agenda-item-bar" style="background:${e}"></span>
      <span class="fp-agenda-item-time">${r.all_day?l(o.hass.language,"event.all_day"):_e(r,o.use24h)}</span>
      <span class="fp-agenda-item-title">${r.title}</span>
      ${r.location?a`<span class="fp-agenda-item-location"><ha-icon icon="mdi:map-marker"></ha-icon>${r.location}</span>`:d}
      ${r.status?a`<span class="fp-agenda-item-status">${sr(r.status,o.hass.language)}</span>`:d}
      ${ve(t,4,o.hass.language)}
    </button>
  `}T();T();function lr(o){if(o.length===0)return[];let r=[...o].sort((p,h)=>p.start!==h.start?p.start-h.start:p.end-h.end),e=[],t=[],i=-1/0,n=[],s=()=>{if(t.length===0)return;let p=Math.max(...t.map(h=>h.lane))+1;for(let h of t)e.push({item:h.item,lane:h.lane,laneCount:p});t=[],n.length=0};for(let p of r){p.start>=i&&(s(),i=-1/0);let h=n.findIndex(y=>y<=p.start);h===-1?(h=n.length,n.push(p.end)):n[h]=p.end,t.push({item:p,lane:h}),i=Math.max(i,p.end)}return s(),e}var cr={compact:32,normal:48};function Wr(o){return o.getHours()*60+o.getMinutes()}function Pe(o,r){let e=o.config.start_hour??6,t=o.config.end_hour??22,i=o.config.time_step??30,n=o.config.compact?cr.compact:cr.normal,s=(t-e)*60,p=s/i*n,h=[];for(let m=e;m<=t;m++)h.push(m);let y=o.events.filter(m=>m.all_day&&r.some(E=>H(E,new Date(m.occurrence_start)))),x=y.length>0,g=m=>Math.min(Math.max(Wr(m)-e*60,0),s)/s*100,b=o.now;return a`
    <div class="fp-timegrid" style="--fp-row-height:${n}px">
      <div class="fp-timegrid-header">
        <div class="fp-time-gutter"></div>
        ${r.map(m=>a`
            <div class="fp-day-header ${H(m,b)?"fp-today":""}">
              <div class="fp-day-header-weekday">${l(o.hass.language,`weekday.short.${m.getDay()}`)}</div>
              <div class="fp-day-header-date">${m.getDate()}.${m.getMonth()+1}.</div>
            </div>
          `)}
      </div>
      ${x?a`
            <div class="fp-allday-row">
              <div class="fp-time-gutter fp-time-gutter-label">${l(o.hass.language,"event.all_day")}</div>
              ${r.map(m=>{let E=y.filter(L=>H(m,new Date(L.occurrence_start)));return a`
                  <div class="fp-allday-cell" @click=${()=>o.callbacks.onSlotClick(m,!0)}>
                    ${E.map(L=>ye(o,L,{compact:!0}))}
                  </div>
                `})}
            </div>
          `:d}
      <div class="fp-timegrid-scroll">
        <div class="fp-time-gutter-col" style="height:${p}px">
          ${h.map(m=>a`<div class="fp-hour-label" style="height:${n*(60/i)}px">
              ${String(m).padStart(2,"0")}:00
            </div>`)}
        </div>
        ${r.map(m=>{let E=o.events.filter(D=>!D.all_day&&H(m,new Date(D.occurrence_start))),L=lr(E.map(D=>({event:D,start:new Date(D.occurrence_start).getTime(),end:new Date(D.occurrence_end).getTime()}))),J=H(m,b)?g(b):null;return a`
            <div
              class="fp-day-col"
              style="height:${p}px"
              @click=${D=>{let Ne=D.currentTarget.getBoundingClientRect(),xe=D.clientY-Ne.top,Ue=Math.round(xe/p*s/i)*i+e*60,we=new Date(m);we.setHours(0,Ue,0,0),o.callbacks.onSlotClick(we,!1)}}
            >
              ${h.slice(0,-1).map((D,$e)=>a`<div class="fp-hour-line" style="top:${$e*(60/i)*n}px"></div>`)}
              ${L.map(({item:D,lane:$e,laneCount:Ne})=>{let xe=g(new Date(D.event.occurrence_start)),Ue=g(new Date(D.event.occurrence_end)),we=Math.max(Ue-xe,3),ut=100/Ne;return a`
                  <div
                    class="fp-timed-event-slot"
                    style="top:${xe}%;height:${we}%;left:${$e*ut}%;width:${ut}%"
                  >
                    ${ye(o,D.event)}
                  </div>
                `})}
              ${J!==null&&(o.config.show_now_line??!0)?a`<div class="fp-now-line" style="top:${J}%"></div>`:d}
            </div>
          `})}
      </div>
    </div>
  `}function dr(o){return a`<div class="fp-view fp-view-day">${Pe(o,[o.currentDate])}</div>`}T();var qr=6;function pr(o){let r=o.config.show_weekends??!0,e=o.config.show_week_numbers??!0,t=o.config.max_events_per_day??3,i=Re(o.currentDate,o.firstWeekday),n=o.currentDate.getMonth(),s=[],p=i;for(let g=0;g<qr;g++){let b=[];for(let m=0;m<7;m++){let E=p.getDay();(r||E!==0&&E!==6)&&b.push(p),p=w(p,1)}s.push(b)}let h=s[0].map(g=>l(o.hass.language,`weekday.short.${g.getDay()}`)),y=`${e?"32px ":""}repeat(${s[0].length}, 1fr)`,x=g=>o.events.filter(b=>{let m=new Date(b.occurrence_start),E=new Date(b.occurrence_end),L=new Date(g.getFullYear(),g.getMonth(),g.getDate()),be=w(L,1);return m<be&&E>L}).sort((b,m)=>b.all_day!==m.all_day?b.all_day?-1:1:new Date(b.occurrence_start).getTime()-new Date(m.occurrence_start).getTime());return a`
    <div class="fp-view fp-view-month">
      <div class="fp-month-headerrow" style="grid-template-columns:${y}">
        ${e?a`<div class="fp-month-weeknum-header"></div>`:d}
        ${h.map(g=>a`<div class="fp-month-weekday">${g}</div>`)}
      </div>
      ${s.map(g=>a`
          <div class="fp-month-week" style="grid-template-columns:${y}">
            ${e?a`<div class="fp-month-weeknum">${l(o.hass.language,"calendar_week_short")}${Me(g[0])}</div>`:d}
            ${g.map(b=>{let m=x(b),E=m.slice(0,t),L=m.length-E.length,be=b.getMonth()===n;return a`
                <div
                  class="fp-month-cell ${be?"":"fp-outside-month"} ${H(b,o.now)&&(o.config.highlight_today??!0)?"fp-today":""}"
                  @click=${()=>o.callbacks.onSlotClick(b,!0)}
                >
                  <div class="fp-month-cell-date">${b.getDate()}</div>
                  <div class="fp-month-cell-events">
                    ${E.map(J=>ye(o,J,{compact:!0}))}
                    ${L>0?a`<button
                          type="button"
                          class="fp-month-more"
                          @click=${J=>{J.stopPropagation(),o.callbacks.onMoreClick(b,m)}}
                        >
                          ${l(o.hass.language,"month.more",{count:L})}
                        </button>`:d}
                  </div>
                </div>
              `})}
          </div>
        `)}
    </div>
  `}T();function hr(o){let r=ee(o.currentDate,o.firstWeekday),e=o.config.show_weekends??!0,t=e?7:5,i=[];for(let n=0,s=0;s<t&&n<7;n++){let p=w(r,n),h=p.getDay();!e&&(h===0||h===6)||(i.push(p),s++)}return a`
    <div class="fp-view fp-view-week">
      ${o.config.show_week_numbers??!0?a`<div class="fp-week-number">${l(o.hass.language,"calendar_week_short")} ${Me(r)}</div>`:d}
      ${Pe(o,i)}
    </div>
  `}T();U();T();U();var K=class extends ${constructor(){super(...arguments);this.heading="";this.wide=!1;this._previouslyFocused=null;this._onKeydown=e=>{e.key==="Escape"&&this._requestClose()}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._onKeydown),this._previouslyFocused=document.activeElement,requestAnimationFrame(()=>this._focusFirst())}disconnectedCallback(){document.removeEventListener("keydown",this._onKeydown),this._previouslyFocused?.focus?.(),super.disconnectedCallback()}_focusFirst(){this.querySelector("[autofocus], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])")?.focus()}_requestClose(){this.dispatchEvent(new CustomEvent("fp-shell-close"))}render(){return a`
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
    `}};K.styles=C`
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
  `,c([f()],K.prototype,"heading",2),c([f({type:Boolean})],K.prototype,"wide",2),K=c([S("family-planner-dialog-shell")],K);function ur(o,r,e){return e?new Date(`${o}T00:00:00`).getTime():new Date(`${o}T${r||"00:00"}:00`).getTime()}function mr(o){let r={};if((!o.title||!o.title.trim())&&(r.title="title_required"),!o.startDate||!o.endDate)r.end="end_before_start";else{let e=ur(o.startDate,o.startTime,o.allDay),t=ur(o.endDate,o.endTime,o.allDay);o.allDay?t<e&&(r.end="end_before_start"):t<=e&&(r.end="end_before_start")}return o.requirePerson&&o.personIds.length===0&&(r.personIds="person_required"),{valid:Object.keys(r).length===0,errors:r}}T();var te=C`
  .fp-swatch-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;
  }
  .fp-swatch {
    border: 2px solid var(--divider-color, #ccc);
    border-radius: 50%;
    width: 28px;
    height: 28px;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .fp-swatch.selected {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-color);
  }
  .fp-swatch-icon ha-icon {
    --mdc-icon-size: 18px;
  }
`;function re(o,r,e){return a`
    <div class="fp-swatch-row">
      ${o.map(t=>a`
          <button
            type="button"
            class="fp-swatch fp-swatch-color ${r===t?"selected":""}"
            style="background:${t}"
            title=${t}
            aria-label=${t}
            @click=${()=>e(t)}
          ></button>
        `)}
    </div>
  `}function Oe(o,r,e){return a`
    <div class="fp-swatch-row">
      ${o.map(t=>a`
          <button
            type="button"
            class="fp-swatch fp-swatch-icon ${r===t?"selected":""}"
            title=${t}
            aria-label=${t}
            @click=${()=>e(t)}
          >
            <ha-icon icon=${t}></ha-icon>
          </button>
        `)}
    </div>
  `}var Vr=C`
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
  .person-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 2px solid transparent;
    background: var(--secondary-background-color, #eee);
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
    font-weight: 600;
  }
  .reminder-chip {
    border: 1px solid var(--divider-color);
    background: var(--card-background-color, #fff);
    border-radius: 16px;
    padding: 6px 10px;
    min-height: 36px;
  }
  .reminder-chip.selected {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border-color: var(--primary-color);
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
`,v=class extends ${constructor(){super(...arguments);this.people=[];this.categories=[];this.event=null;this.prefill=null;this.serverError=null;this.requirePerson=!0;this.enableCategories=!0;this.enableStatus=!0;this.defaultReminderMinutes=ue;this.defaultColors=z;this.defaultIcons=Y;this._title="";this._subtitle="";this._allDay=!1;this._startDate="";this._startTime="09:00";this._endDate="";this._endTime="10:00";this._personIds=[];this._description="";this._location="";this._categoryId="";this._color="";this._icon="";this._status="";this._reminders=[];this._customReminder="";this._repeatFreq="";this._repeatUntil="";this._errors={};this._confirmingDiscard=!1;this._submitting=!1;this._dirty=!1;this._initialized=!1;this._endTouchedByUser=!1}willUpdate(e){!this._initialized&&(this.event||this.prefill)&&(this._initFromProps(),this._initialized=!0)}_initFromProps(){if(this.event){let e=this.event;if(this._title=e.title,this._subtitle=e.subtitle??"",this._allDay=e.all_day,e.all_day)this._startDate=e.start,this._endDate=at(e.end,-1);else{let t=new Date(e.start),i=new Date(e.end);this._startDate=me(t),this._startTime=Ie(t),this._endDate=me(i),this._endTime=Ie(i)}if(this._endTouchedByUser=!0,this._personIds=[...e.person_ids],this._description=e.description??"",this._location=e.location??"",this._categoryId=e.category_id??"",this._color=e.color??"",this._icon=e.icon??"",this._status=e.status??"",this._reminders=[...e.reminders],e.rrule){let t=/FREQ=([A-Z]+)/.exec(e.rrule);this._repeatFreq=t?t[1]:"";let i=/UNTIL=(\d{8})/.exec(e.rrule);if(i){let n=i[1];this._repeatUntil=`${n.slice(0,4)}-${n.slice(4,6)}-${n.slice(6,8)}`}}}else this.prefill&&(this._allDay=this.prefill.allDay,this._startDate=this.prefill.date,this._startTime=this.prefill.time,this._endTouchedByUser=!1,this._recomputeEndIfNotTouched(),this._personIds=[],this._reminders=[this.defaultReminderMinutes])}_recomputeEndIfNotTouched(){if(this._endTouchedByUser)return;let{date:e,time:t}=rr(this._startDate,this._startTime,60);this._endDate=e,this._endTime=t}_markDirty(){this._dirty=!0}_togglePerson(e){this._personIds=this._personIds.includes(e)?this._personIds.filter(t=>t!==e):[...this._personIds,e],this._markDirty()}_toggleReminder(e){this._reminders=this._reminders.includes(e)?this._reminders.filter(t=>t!==e):[...this._reminders,e].sort((t,i)=>t-i),this._markDirty()}_addCustomReminder(){let e=parseInt(this._customReminder,10);!Number.isNaN(e)&&e>=0&&!this._reminders.includes(e)&&(this._reminders=[...this._reminders,e].sort((t,i)=>t-i),this._customReminder="",this._markDirty())}_buildRrule(){if(!this._repeatFreq)return null;let e=`FREQ=${this._repeatFreq}`;return this._repeatUntil&&(e+=`;UNTIL=${this._repeatUntil.replace(/-/g,"")}T000000Z`),e}_validate(){let e=mr({title:this._title,allDay:this._allDay,startDate:this._startDate,startTime:this._startTime,endDate:this._endDate,endTime:this._endTime,personIds:this._personIds,requirePerson:this.requirePerson});return this._errors=e.errors,e}_handleSave(){if(!this._validate().valid)return;let t=this._allDay?this._startDate:st(this._startDate,this._startTime),i=this._allDay?at(this._endDate,1):st(this._endDate,this._endTime),n={title:this._title.trim(),subtitle:this._subtitle.trim()||null,start:t,end:i,all_day:this._allDay,person_ids:this._personIds,description:this._description.trim()||null,location:this._location.trim()||null,category_id:this._categoryId||null,color:this._color.trim()||null,icon:this._icon.trim()||null,status:this._status||null,reminders:this._reminders,rrule:this._buildRrule()};this._submitting=!0,this.dispatchEvent(new CustomEvent("fp-save",{detail:n}))}updated(e){e.has("serverError")&&this.serverError&&(this._submitting=!1)}_requestClose(){if(this._dirty&&!this._confirmingDiscard){this._confirmingDiscard=!0;return}this.dispatchEvent(new CustomEvent("fp-close"))}render(){let e=this.hass?.language,t=this.event?l(e,"event.edit_title"):l(e,"event.new_title");return a`
      <family-planner-dialog-shell .heading=${t} wide @fp-shell-close=${()=>this._requestClose()}>
        ${this.serverError?a`<div class="server-error">${this.serverError}</div>`:d}
        ${this._confirmingDiscard?a`
              <div class="confirm-box">
                <p>${l(e,"dialog.unsaved_changes_message")}</p>
                <div class="actions">
                  <button class="btn" type="button" @click=${()=>this._confirmingDiscard=!1}>
                    ${l(e,"dialog.keep_editing")}
                  </button>
                  <button
                    class="btn btn-primary"
                    type="button"
                    @click=${()=>this.dispatchEvent(new CustomEvent("fp-close"))}
                  >
                    ${l(e,"dialog.discard")}
                  </button>
                </div>
              </div>
            `:this._renderForm(e)}
      </family-planner-dialog-shell>
    `}_renderForm(e){return a`
      <div class="field">
        <label for="fp-title">${l(e,"event.title")} *</label>
        <input
          id="fp-title"
          type="text"
          autofocus
          .value=${this._title}
          @input=${t=>{this._title=t.target.value,this._markDirty()}}
        />
        ${this._errors.title?a`<span class="error-text">${l(e,"validation.title_required")}</span>`:d}
      </div>

      <div class="field">
        <label for="fp-subtitle">${l(e,"event.subtitle")}</label>
        <input
          id="fp-subtitle"
          type="text"
          .value=${this._subtitle}
          @input=${t=>{this._subtitle=t.target.value,this._markDirty()}}
        />
      </div>

      <div class="switch-row">
        <input
          id="fp-allday"
          type="checkbox"
          .checked=${this._allDay}
          @change=${t=>{this._allDay=t.target.checked,this._markDirty()}}
        />
        <label for="fp-allday">${l(e,"event.all_day")}</label>
      </div>

      <div class="row">
        <div class="field">
          <label for="fp-start-date">${l(e,"event.start_date")}</label>
          <input
            id="fp-start-date"
            type="date"
            .value=${this._startDate}
            @input=${t=>{this._startDate=t.target.value,this._recomputeEndIfNotTouched(),this._markDirty()}}
          />
        </div>
        ${this._allDay?d:a`
              <div class="field">
                <label for="fp-start-time">${l(e,"event.start_time")}</label>
                <input
                  id="fp-start-time"
                  type="time"
                  .value=${this._startTime}
                  @input=${t=>{this._startTime=t.target.value,this._recomputeEndIfNotTouched(),this._markDirty()}}
                />
              </div>
            `}
      </div>
      <div class="row">
        <div class="field">
          <label for="fp-end-date">${l(e,"event.end_date")}</label>
          <input
            id="fp-end-date"
            type="date"
            .value=${this._endDate}
            @input=${t=>{this._endTouchedByUser=!0,this._endDate=t.target.value,this._markDirty()}}
          />
        </div>
        ${this._allDay?d:a`
              <div class="field">
                <label for="fp-end-time">${l(e,"event.end_time")}</label>
                <input
                  id="fp-end-time"
                  type="time"
                  .value=${this._endTime}
                  @input=${t=>{this._endTouchedByUser=!0,this._endTime=t.target.value,this._markDirty()}}
                />
              </div>
            `}
      </div>
      ${this._errors.end?a`<span class="error-text">${l(e,"validation.end_before_start")}</span>`:d}

      <div class="field">
        <label>${l(e,"event.people")}${this.requirePerson?" *":""}</label>
        <div class="chip-row">
          ${this.people.filter(t=>t.active).map(t=>a`
                <button
                  type="button"
                  class="person-chip ${this._personIds.includes(t.id)?"selected":""}"
                  style="--fp-color:${t.color}"
                  @click=${()=>this._togglePerson(t.id)}
                >
                  <span class="dot" style="background:${t.color}"></span>${t.name}
                </button>
              `)}
        </div>
        ${this._errors.personIds?a`<span class="error-text">${l(e,"validation.person_required")}</span>`:d}
      </div>

      <div class="field">
        <label for="fp-description">${l(e,"event.description")}</label>
        <textarea
          id="fp-description"
          .value=${this._description}
          @input=${t=>{this._description=t.target.value,this._markDirty()}}
        ></textarea>
      </div>

      <div class="field">
        <label for="fp-location">${l(e,"event.location")}</label>
        <input
          id="fp-location"
          type="text"
          .value=${this._location}
          @input=${t=>{this._location=t.target.value,this._markDirty()}}
        />
      </div>

      ${this.enableCategories?a`
            <div class="field">
              <label for="fp-category">${l(e,"event.category")}</label>
              <select
                id="fp-category"
                .value=${this._categoryId}
                @change=${t=>{this._categoryId=t.target.value,this._markDirty()}}
              >
                <option value="">${l(e,"category.none")}</option>
                ${this.categories.filter(t=>t.active).map(t=>a`<option value=${t.id} ?selected=${t.id===this._categoryId}>${t.name}</option>`)}
              </select>
            </div>
          `:d}

      <div class="row">
        <div class="field">
          <label for="fp-color">${l(e,"event.color")}</label>
          <input
            id="fp-color"
            type="text"
            placeholder="#3f51b5"
            .value=${this._color}
            @input=${t=>{this._color=t.target.value,this._markDirty()}}
          />
          ${re(this.defaultColors,this._color,t=>{this._color=t,this._markDirty()})}
        </div>
        <div class="field">
          <label for="fp-icon">${l(e,"event.icon")}</label>
          <input
            id="fp-icon"
            type="text"
            placeholder="mdi:tooth"
            .value=${this._icon}
            @input=${t=>{this._icon=t.target.value,this._markDirty()}}
          />
          ${Oe(this.defaultIcons,this._icon,t=>{this._icon=t,this._markDirty()})}
        </div>
      </div>

      ${this.enableStatus?a`
            <div class="field">
              <label for="fp-status">${l(e,"event.status")}</label>
              <select
                id="fp-status"
                .value=${this._status}
                @change=${t=>{this._status=t.target.value,this._markDirty()}}
              >
                <option value="">-</option>
                ${["planned","confirmed","tentative","done","cancelled"].map(t=>a`<option value=${t} ?selected=${t===this._status}>${l(e,`status.${t}`)}</option>`)}
              </select>
            </div>
          `:d}

      <div class="field">
        <label>${l(e,"event.reminders")}</label>
        <div class="chip-row">
          ${er.map(t=>a`
              <button
                type="button"
                class="reminder-chip ${this._reminders.includes(t)?"selected":""}"
                @click=${()=>this._toggleReminder(t)}
              >
                ${t===0?l(e,"reminder.at_start"):l(e,`reminder.${t}`)||`${t} min`}
              </button>
            `)}
        </div>
        <div class="row" style="margin-top:6px">
          <input
            type="number"
            min="0"
            placeholder=${l(e,"reminder.custom")}
            .value=${this._customReminder}
            @input=${t=>this._customReminder=t.target.value}
          />
          <button class="btn" type="button" @click=${()=>this._addCustomReminder()}>+</button>
        </div>
      </div>

      <div class="field">
        <label for="fp-repeat">${l(e,"event.repeat")}</label>
        <select
          id="fp-repeat"
          .value=${this._repeatFreq}
          @change=${t=>{this._repeatFreq=t.target.value,this._markDirty()}}
        >
          <option value="">${l(e,"event.repeat_none")}</option>
          <option value="DAILY" ?selected=${this._repeatFreq==="DAILY"}>Täglich / Daily</option>
          <option value="WEEKLY" ?selected=${this._repeatFreq==="WEEKLY"}>Wöchentlich / Weekly</option>
          <option value="MONTHLY" ?selected=${this._repeatFreq==="MONTHLY"}>Monatlich / Monthly</option>
          <option value="YEARLY" ?selected=${this._repeatFreq==="YEARLY"}>Jährlich / Yearly</option>
        </select>
        ${this._repeatFreq?a`
              <input
                type="date"
                .value=${this._repeatUntil}
                @input=${t=>this._repeatUntil=t.target.value}
              />
            `:d}
      </div>

      <div class="actions">
        <button class="btn" type="button" @click=${()=>this._requestClose()}>${l(e,"action.cancel")}</button>
        <button class="btn btn-primary" type="button" ?disabled=${this._submitting} @click=${()=>this._handleSave()}>
          ${l(e,"action.save")}
        </button>
      </div>
    `}};v.styles=[Vr,te],c([f({attribute:!1})],v.prototype,"hass",2),c([f({attribute:!1})],v.prototype,"config",2),c([f({attribute:!1})],v.prototype,"people",2),c([f({attribute:!1})],v.prototype,"categories",2),c([f({attribute:!1})],v.prototype,"event",2),c([f({attribute:!1})],v.prototype,"prefill",2),c([f({attribute:!1})],v.prototype,"serverError",2),c([f({type:Boolean})],v.prototype,"requirePerson",2),c([f({type:Boolean})],v.prototype,"enableCategories",2),c([f({type:Boolean})],v.prototype,"enableStatus",2),c([f({type:Number})],v.prototype,"defaultReminderMinutes",2),c([f({attribute:!1})],v.prototype,"defaultColors",2),c([f({attribute:!1})],v.prototype,"defaultIcons",2),c([u()],v.prototype,"_title",2),c([u()],v.prototype,"_subtitle",2),c([u()],v.prototype,"_allDay",2),c([u()],v.prototype,"_startDate",2),c([u()],v.prototype,"_startTime",2),c([u()],v.prototype,"_endDate",2),c([u()],v.prototype,"_endTime",2),c([u()],v.prototype,"_personIds",2),c([u()],v.prototype,"_description",2),c([u()],v.prototype,"_location",2),c([u()],v.prototype,"_categoryId",2),c([u()],v.prototype,"_color",2),c([u()],v.prototype,"_icon",2),c([u()],v.prototype,"_status",2),c([u()],v.prototype,"_reminders",2),c([u()],v.prototype,"_customReminder",2),c([u()],v.prototype,"_repeatFreq",2),c([u()],v.prototype,"_repeatUntil",2),c([u()],v.prototype,"_errors",2),c([u()],v.prototype,"_confirmingDiscard",2),c([u()],v.prototype,"_submitting",2),v=c([S("family-planner-event-dialog")],v);T();U();var Br=C`
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
`,P=class extends ${constructor(){super(...arguments);this.people=[];this.categories=[];this.canWrite=!0;this._confirmingDelete=!1}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}render(){let e=this.hass?.language,t=this.event,i=q(t,this.people,this.categories,"person"),n=t.person_ids.map(h=>this.people.find(y=>y.id===h)).filter(Boolean),s=t.category_id?this.categories.find(h=>h.id===t.category_id):void 0,p=!!t.rrule||!!t.is_recurring_instance;return a`
      <family-planner-dialog-shell .heading=${t.title} @fp-shell-close=${()=>this._close()}>
        <div class="meta-row">
          <span class="color-bar" style="background:${i}"></span>
          <div>
            ${t.subtitle?a`<div class="subtitle">${t.subtitle}</div>`:d}
            <div>
              ${t.all_day?l(e,"event.all_day"):`${fe(new Date(t.occurrence_start),!0)} \u2013 ${fe(new Date(t.occurrence_end),!0)}`}
            </div>
            ${t.status?a`<span class="status-badge">${l(e,`status.${t.status}`)}</span>`:d}
          </div>
        </div>

        ${n.length>0?a`
              <div class="meta-row">
                <ha-icon icon="mdi:account-multiple"></ha-icon>
                <div class="person-list">
                  ${n.map(h=>a`<span class="person-pill"><span class="dot" style="background:${h.color}"></span>${h.name}</span>`)}
                </div>
              </div>
            `:d}

        ${t.location?a`<div class="meta-row"><ha-icon icon="mdi:map-marker"></ha-icon><div>${t.location}</div></div>`:d}
        ${s?a`<div class="meta-row"><ha-icon icon=${s.icon||"mdi:tag"}></ha-icon><div>${s.name}</div></div>`:d}
        ${t.description?a`<div class="meta-row"><ha-icon icon="mdi:text"></ha-icon><div>${t.description}</div></div>`:d}

        ${this._confirmingDelete?this._renderDeleteConfirm(e,p):this._renderActions(e)}
      </family-planner-dialog-shell>
    `}_renderActions(e){return this.canWrite?a`
      <div class="actions">
        <button class="btn" type="button" @click=${()=>this.dispatchEvent(new CustomEvent("fp-edit",{detail:this.event}))}>
          <ha-icon icon="mdi:pencil"></ha-icon>${l(e,"action.edit")}
        </button>
        <button class="btn" type="button" @click=${()=>this.dispatchEvent(new CustomEvent("fp-duplicate"))}>
          <ha-icon icon="mdi:content-copy"></ha-icon>${l(e,"action.duplicate")}
        </button>
        ${this.event.status!=="done"?a`
              <button
                class="btn"
                type="button"
                @click=${()=>this.dispatchEvent(new CustomEvent("fp-set-status",{detail:"done"}))}
              >
                <ha-icon icon="mdi:check"></ha-icon>${l(e,"action.mark_done")}
              </button>
            `:d}
        <button class="btn btn-danger" type="button" @click=${()=>this._confirmingDelete=!0}>
          <ha-icon icon="mdi:delete"></ha-icon>${l(e,"action.delete")}
        </button>
      </div>
    `:a``}_renderDeleteConfirm(e,t){return a`
      <div class="confirm-box">
        <div>${l(e,"dialog.confirm_delete_title")}</div>
        <div class="actions">
          ${t?a`
                <button
                  class="btn btn-danger"
                  type="button"
                  @click=${()=>this.dispatchEvent(new CustomEvent("fp-delete",{detail:{mode:"instance",occurrenceStart:this.event.occurrence_start}}))}
                >
                  ${l(e,"dialog.confirm_delete_instance")}
                </button>
              `:d}
          <button
            class="btn btn-danger"
            type="button"
            @click=${()=>this.dispatchEvent(new CustomEvent("fp-delete",{detail:{mode:"series"}}))}
          >
            ${t?l(e,"dialog.confirm_delete_series"):l(e,"action.delete")}
          </button>
          <button class="btn" type="button" @click=${()=>this._confirmingDelete=!1}>
            ${l(e,"action.cancel")}
          </button>
        </div>
      </div>
    `}};P.styles=Br,c([f({attribute:!1})],P.prototype,"hass",2),c([f({attribute:!1})],P.prototype,"people",2),c([f({attribute:!1})],P.prototype,"categories",2),c([f({attribute:!1})],P.prototype,"event",2),c([f({type:Boolean})],P.prototype,"canWrite",2),c([u()],P.prototype,"_confirmingDelete",2),P=c([S("family-planner-event-detail-dialog")],P);T();U();var Fr=C`
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
`,O=class extends ${constructor(){super(...arguments);this.people=[];this.categories=[];this.events=[];this.canWrite=!0}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}render(){let e=this.hass?.language,t=new Intl.DateTimeFormat(e||"de",{weekday:"long",day:"numeric",month:"long"}).format(this.date);return a`
      <family-planner-dialog-shell .heading=${t} @fp-shell-close=${()=>this._close()}>
        ${this.events.map(i=>{let n=q(i,this.people,this.categories,"person"),s=ge(i,this.people);return a`
            <button
              type="button"
              class="item"
              @click=${()=>this.dispatchEvent(new CustomEvent("fp-event-click",{detail:i}))}
            >
              <span class="bar" style="background:${n}"></span>
              <span class="time">${i.all_day?l(e,"event.all_day"):_e(i,!0)}</span>
              <span class="title">${i.title}</span>
              ${ve(s,4,e)}
            </button>
          `})}
        ${this.canWrite?a`
              <button
                type="button"
                class="add-btn"
                @click=${()=>this.dispatchEvent(new CustomEvent("fp-add-event",{detail:{date:this.date}}))}
              >
                + ${l(e,"action.add_event")}
              </button>
            `:d}
      </family-planner-dialog-shell>
    `}};O.styles=Fr,c([f({attribute:!1})],O.prototype,"hass",2),c([f({attribute:!1})],O.prototype,"people",2),c([f({attribute:!1})],O.prototype,"categories",2),c([f({attribute:!1})],O.prototype,"date",2),c([f({attribute:!1})],O.prototype,"events",2),c([f({type:Boolean})],O.prototype,"canWrite",2),O=c([S("family-planner-day-detail-dialog")],O);T();U();var jr=C`
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
`,pt={id:null,name:"",color:"#3f51b5",role:""},R=class extends ${constructor(){super(...arguments);this.people=[];this.defaultColors=z;this._draft={...pt};this._deletingId=null;this._deleteStrategy="deactivate";this._reassignTo="";this._error=null}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}async _save(){if(this._draft.name.trim())try{this._draft.id?await rt(this.hass,this._draft.id,{name:this._draft.name.trim(),color:this._draft.color,role:this._draft.role||null}):await Yt(this.hass,{name:this._draft.name.trim(),color:this._draft.color,role:this._draft.role||null}),this._draft={...pt},this._error=null,this.dispatchEvent(new CustomEvent("fp-people-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}async _toggleActive(e){await rt(this.hass,e.id,{active:!e.active}),this.dispatchEvent(new CustomEvent("fp-people-changed"))}async _move(e,t){let i=[...this.people].sort((p,h)=>p.sort_order-h.sort_order).map(p=>p.id),n=i.indexOf(e.id),s=n+t;s<0||s>=i.length||([i[n],i[s]]=[i[s],i[n]],await Gt(this.hass,i),this.dispatchEvent(new CustomEvent("fp-people-changed")))}async _confirmDelete(){if(this._deletingId)try{await Kt(this.hass,this._deletingId,this._deleteStrategy,this._reassignTo||void 0),this._deletingId=null,this._error=null,this.dispatchEvent(new CustomEvent("fp-people-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}render(){let e=this.hass?.language,t=[...this.people].sort((i,n)=>i.sort_order-n.sort_order);return a`
      <family-planner-dialog-shell .heading=${l(e,"people.title")} @fp-shell-close=${()=>this._close()}>
        ${this._error?a`<div class="confirm-box">${this._error}</div>`:d}
        ${t.map((i,n)=>a`
            <div class="row">
              <span class="dot" style="background:${i.color}"></span>
              <span class="name ${i.active?"":"inactive"}">${i.name}</span>
              <button class="iconbtn" title="↑" ?disabled=${n===0} @click=${()=>this._move(i,-1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button
                class="iconbtn"
                title="↓"
                ?disabled=${n===t.length-1}
                @click=${()=>this._move(i,1)}
              >
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button class="iconbtn" title=${l(e,"people.active")} @click=${()=>this._toggleActive(i)}>
                <ha-icon icon=${i.active?"mdi:eye":"mdi:eye-off"}></ha-icon>
              </button>
              <button
                class="iconbtn"
                title=${l(e,"action.edit")}
                @click=${()=>this._draft={id:i.id,name:i.name,color:i.color,role:i.role??""}}
              >
                <ha-icon icon="mdi:pencil"></ha-icon>
              </button>
              <button class="iconbtn" title=${l(e,"action.delete")} @click=${()=>this._deletingId=i.id}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            ${this._deletingId===i.id?this._renderDeleteConfirm(e,i):d}
          `)}

        <div class="form">
          <input
            type="text"
            placeholder=${l(e,"people.name")}
            .value=${this._draft.name}
            @input=${i=>this._draft={...this._draft,name:i.target.value}}
          />
          <input
            type="color"
            .value=${this._draft.color}
            @input=${i=>this._draft={...this._draft,color:i.target.value}}
          />
          ${re(this.defaultColors,this._draft.color,i=>this._draft={...this._draft,color:i})}
          <select
            .value=${this._draft.role}
            @change=${i=>this._draft={...this._draft,role:i.target.value}}
          >
            <option value="">-</option>
            <option value="parent" ?selected=${this._draft.role==="parent"}>${l(e,"people.role.parent")}</option>
            <option value="child" ?selected=${this._draft.role==="child"}>${l(e,"people.role.child")}</option>
            <option value="other" ?selected=${this._draft.role==="other"}>${l(e,"people.role.other")}</option>
          </select>
          <button class="btn btn-primary" type="button" @click=${()=>void this._save()}>
            ${this._draft.id?l(e,"action.save"):l(e,"people.add")}
          </button>
          ${this._draft.id?a`<button class="btn" type="button" @click=${()=>this._draft={...pt}}>
                ${l(e,"action.cancel")}
              </button>`:d}
        </div>
      </family-planner-dialog-shell>
    `}_renderDeleteConfirm(e,t){let i=this.people.filter(n=>n.id!==t.id);return a`
      <div class="confirm-box">
        <div>${l(e,"people.delete_title")} (${t.name})</div>
        <select
          .value=${this._deleteStrategy}
          @change=${n=>this._deleteStrategy=n.target.value}
        >
          <option value="deactivate">${l(e,"people.delete_strategy.deactivate")}</option>
          <option value="remove_from_events">${l(e,"people.delete_strategy.remove_from_events")}</option>
          <option value="reassign">${l(e,"people.delete_strategy.reassign")}</option>
          <option value="keep_unassigned">${l(e,"people.delete_strategy.keep_unassigned")}</option>
        </select>
        ${this._deleteStrategy==="reassign"?a`
              <select .value=${this._reassignTo} @change=${n=>this._reassignTo=n.target.value}>
                <option value="">${l(e,"people.reassign_to")}</option>
                ${i.map(n=>a`<option value=${n.id}>${n.name}</option>`)}
              </select>
            `:d}
        <div class="form">
          <button class="btn btn-primary" type="button" @click=${()=>void this._confirmDelete()}>
            ${l(e,"action.delete")}
          </button>
          <button class="btn" type="button" @click=${()=>this._deletingId=null}>${l(e,"action.cancel")}</button>
        </div>
      </div>
    `}};R.styles=[jr,te],c([f({attribute:!1})],R.prototype,"hass",2),c([f({attribute:!1})],R.prototype,"people",2),c([f({attribute:!1})],R.prototype,"defaultColors",2),c([u()],R.prototype,"_draft",2),c([u()],R.prototype,"_deletingId",2),c([u()],R.prototype,"_deleteStrategy",2),c([u()],R.prototype,"_reassignTo",2),c([u()],R.prototype,"_error",2),R=c([S("family-planner-people-manager-dialog")],R);T();U();var Yr=C`
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
`,ht={id:null,name:"",color:"#9e9e9e",icon:""},M=class extends ${constructor(){super(...arguments);this.categories=[];this.defaultColors=z;this.defaultIcons=Y;this._draft={...ht};this._deletingId=null;this._error=null}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}async _save(){if(this._draft.name.trim())try{let e=this._draft.icon.trim()||null;this._draft.id?await ot(this.hass,this._draft.id,{name:this._draft.name.trim(),color:this._draft.color,icon:e}):await Jt(this.hass,{name:this._draft.name.trim(),color:this._draft.color,icon:e}),this._draft={...ht},this._error=null,this.dispatchEvent(new CustomEvent("fp-categories-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}async _toggleActive(e){await ot(this.hass,e.id,{active:!e.active}),this.dispatchEvent(new CustomEvent("fp-categories-changed"))}async _move(e,t){let i=[...this.categories].sort((p,h)=>p.sort_order-h.sort_order).map(p=>p.id),n=i.indexOf(e.id),s=n+t;s<0||s>=i.length||([i[n],i[s]]=[i[s],i[n]],await Qt(this.hass,i),this.dispatchEvent(new CustomEvent("fp-categories-changed")))}async _confirmDelete(){if(this._deletingId)try{await Zt(this.hass,this._deletingId),this._deletingId=null,this._error=null,this.dispatchEvent(new CustomEvent("fp-categories-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}render(){let e=this.hass?.language,t=[...this.categories].sort((i,n)=>i.sort_order-n.sort_order);return a`
      <family-planner-dialog-shell .heading=${l(e,"category.title")} @fp-shell-close=${()=>this._close()}>
        ${this._error?a`<div class="confirm-box">${this._error}</div>`:d}
        ${t.map((i,n)=>a`
            <div class="row">
              <span class="dot" style="background:${i.color}"></span>
              ${i.icon?a`<ha-icon icon=${i.icon}></ha-icon>`:d}
              <span class="name ${i.active?"":"inactive"}">${i.name}</span>
              <button class="iconbtn" title="↑" ?disabled=${n===0} @click=${()=>this._move(i,-1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button
                class="iconbtn"
                title="↓"
                ?disabled=${n===t.length-1}
                @click=${()=>this._move(i,1)}
              >
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button class="iconbtn" @click=${()=>this._toggleActive(i)}>
                <ha-icon icon=${i.active?"mdi:eye":"mdi:eye-off"}></ha-icon>
              </button>
              <button
                class="iconbtn"
                title=${l(e,"action.edit")}
                @click=${()=>this._draft={id:i.id,name:i.name,color:i.color,icon:i.icon??""}}
              >
                <ha-icon icon="mdi:pencil"></ha-icon>
              </button>
              <button class="iconbtn" title=${l(e,"action.delete")} @click=${()=>this._deletingId=i.id}>
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            ${this._deletingId===i.id?a`
                  <div class="confirm-box">
                    <span>${l(e,"action.delete")}: ${i.name}?</span>
                    <button class="btn btn-primary" type="button" @click=${()=>void this._confirmDelete()}>
                      ${l(e,"action.delete")}
                    </button>
                    <button class="btn" type="button" @click=${()=>this._deletingId=null}>
                      ${l(e,"action.cancel")}
                    </button>
                  </div>
                `:d}
          `)}

        <div class="form">
          <input
            type="text"
            placeholder=${l(e,"category.name")}
            .value=${this._draft.name}
            @input=${i=>this._draft={...this._draft,name:i.target.value}}
          />
          <input
            type="color"
            .value=${this._draft.color}
            @input=${i=>this._draft={...this._draft,color:i.target.value}}
          />
          ${re(this.defaultColors,this._draft.color,i=>this._draft={...this._draft,color:i})}
          <input
            type="text"
            placeholder=${l(e,"event.icon")}
            .value=${this._draft.icon}
            @input=${i=>this._draft={...this._draft,icon:i.target.value}}
          />
          ${Oe(this.defaultIcons,this._draft.icon,i=>this._draft={...this._draft,icon:i})}
          <button class="btn btn-primary" type="button" @click=${()=>void this._save()}>
            ${this._draft.id?l(e,"action.save"):l(e,"category.add")}
          </button>
          ${this._draft.id?a`<button class="btn" type="button" @click=${()=>this._draft={...ht}}>
                ${l(e,"action.cancel")}
              </button>`:d}
        </div>
      </family-planner-dialog-shell>
    `}};M.styles=[Yr,te],c([f({attribute:!1})],M.prototype,"hass",2),c([f({attribute:!1})],M.prototype,"categories",2),c([f({attribute:!1})],M.prototype,"defaultColors",2),c([f({attribute:!1})],M.prototype,"defaultIcons",2),c([u()],M.prototype,"_draft",2),c([u()],M.prototype,"_deletingId",2),c([u()],M.prototype,"_error",2),M=c([S("family-planner-category-manager-dialog")],M);var Jr=["today","day","week","month","agenda"],Zr=["family_planner_event_created","family_planner_event_updated","family_planner_event_deleted"],_=class extends ${constructor(){super(...arguments);this._view="week";this._currentDate=new Date;this._events=[];this._people=[];this._categories=[];this._loading=!0;this._error=null;this._connectionLost=!1;this._search="";this._selectedPersonIds=[];this._selectedCategoryIds=[];this._canWriteEvents=!0;this._isAdmin=!1;this._requirePerson=!0;this._enableCategories=!0;this._enableStatus=!0;this._defaultReminderMinutes=ue;this._defaultColors=z;this._defaultIcons=Y;this._createDraft=null;this._editingEvent=null;this._dialogError=null;this._detailEvent=null;this._dayDetail=null;this._peopleManagerOpen=!1;this._categoryManagerOpen=!1;this._bootstrapped=!1;this._unsubBus=[];this._fetchToken=0;this._debouncedSetSearch=lt(e=>{this._search=e},200)}get hass(){return this._hass}set hass(e){this._hass=e,this._bootstrapped||(this._bootstrapped=!0,this._bootstrap())}setConfig(e){if(!e)throw new Error("Ung\xFCltige Konfiguration");let t={...He,...e,type:e.type},i=!this._config;this._config=t,i&&(this._view=t.default_view??"week",this._selectedPersonIds=t.preselected_people??[])}getCardSize(){return this._config?.compact?6:9}getGridOptions(){return{rows:this._config?.compact?6:9,columns:12,min_rows:4}}static getStubConfig(){return{type:"custom:family-planner-card",title:"Familienkalender",default_view:"week"}}static async getConfigElement(){return await Promise.resolve().then(()=>(gr(),fr)),document.createElement("family-planner-card-editor")}disconnectedCallback(){super.disconnectedCallback();for(let e of this._unsubBus)e();this._unsubBus=[]}async _bootstrap(){if(this._hass){try{let[e,t,i]=await Promise.all([qt(this._hass),tt(this._hass),it(this._hass)]);this._isAdmin=e.is_admin,this._canWriteEvents=e.can_write_events,this._requirePerson=!!(e.options.require_person??!0),this._enableCategories=!!(e.options.enable_categories??!0),this._enableStatus=!!(e.options.enable_status??!0);let n=e.options.default_reminder_minutes;this._defaultReminderMinutes=typeof n=="number"&&Number.isFinite(n)?n:ue;let s=e.options.default_colors;this._defaultColors=typeof s=="string"&&s.trim()?s.split(",").map(h=>h.trim()).filter(Boolean):z;let p=e.options.default_icons;this._defaultIcons=typeof p=="string"&&p.trim()?p.split(",").map(h=>h.trim()).filter(Boolean):Y,this._people=t,this._categories=i,this._error=null}catch(e){this._error=e instanceof Error?e.message:String(e)}await this._fetchEvents(),this._subscribeRealtime()}}_subscribeRealtime(){if(!this._hass)return;let e=lt(()=>void this._fetchEvents(),250);for(let n of Zr)this._hass.connection.subscribeEvents(()=>e(),n).then(s=>this._unsubBus.push(s)).catch(()=>{});let t=()=>{this._connectionLost=!1,this._fetchEvents()},i=()=>{this._connectionLost=!0};this._hass.connection.addEventListener("ready",t),this._hass.connection.addEventListener("disconnected",i),this._unsubBus.push(()=>this._hass?.connection.removeEventListener("ready",t)),this._unsubBus.push(()=>this._hass?.connection.removeEventListener("disconnected",i))}_computeRange(){let e=Le(this._hass,this._config.first_weekday);if(this._view==="today"){let i=new Date;return i.setHours(0,0,0,0),{start:i,end:w(i,1)}}if(this._view==="day"){let i=new Date(this._currentDate);return i.setHours(0,0,0,0),{start:i,end:w(i,1)}}if(this._view==="week"){let i=ee(this._currentDate,e);return{start:i,end:w(i,7)}}if(this._view==="month"){let i=Re(this._currentDate,e);return{start:i,end:w(i,42)}}let t=new Date(this._currentDate);return t.setHours(0,0,0,0),{start:t,end:w(t,this._config.agenda_days??14)}}async _fetchEvents(){if(!this._hass)return;let e=++this._fetchToken;this._loading=!0;let{start:t,end:i}=this._computeRange();try{let n=await Vt(this._hass,{start:t.toISOString(),end:i.toISOString(),include_cancelled:!0});if(e!==this._fetchToken)return;this._events=n,this._error=null}catch(n){if(e!==this._fetchToken)return;this._error=n instanceof Error?n.message:String(n)}finally{e===this._fetchToken&&(this._loading=!1)}}get _filteredEvents(){return or(this._events,{showDoneEvents:this._config.show_done_events??!0,showCancelledEvents:this._config.show_cancelled_events??!1,personIds:this._selectedPersonIds,categoryIds:this._selectedCategoryIds,search:this._search})}get _visiblePeople(){let e=this._config.people,t=this._people.filter(i=>i.active);return e&&e.length>0?t.filter(i=>e.includes(i.id)):t}get _visibleCategories(){let e=this._config.visible_categories,t=this._categories.filter(i=>i.active);return e&&e.length>0?t.filter(i=>e.includes(i.id)):t}_setView(e){e!==this._view&&(this._view=e,this._fetchEvents())}_navStep(e){let t=new Date(this._currentDate);switch(this._view){case"day":t=w(t,e);break;case"week":t=w(t,7*e);break;case"month":t=new Date(t.getFullYear(),t.getMonth()+e,1);break;case"agenda":t=w(t,(this._config.agenda_days??14)*e);break;default:return}this._currentDate=t,this._fetchEvents()}_navToday(){this._currentDate=new Date,this._fetchEvents()}_onSearchInput(e){let t=e.target.value;this._debouncedSetSearch(t)}_togglePerson(e){this._selectedPersonIds=this._selectedPersonIds.includes(e)?this._selectedPersonIds.filter(t=>t!==e):[...this._selectedPersonIds,e]}_toggleCategory(e){this._selectedCategoryIds=this._selectedCategoryIds.includes(e)?this._selectedCategoryIds.filter(t=>t!==e):[...this._selectedCategoryIds,e]}_openCreate(e,t){if(this._config.read_only||!this._canWriteEvents)return;let i=n=>String(n).padStart(2,"0");this._createDraft={date:`${e.getFullYear()}-${i(e.getMonth()+1)}-${i(e.getDate())}`,time:`${i(e.getHours())}:${i(e.getMinutes())}`,allDay:t},this._editingEvent=null,this._dialogError=null}_openEdit(e){this._editingEvent=e,this._createDraft=null,this._dialogError=null,this._detailEvent=null}async _handleDialogSave(e){if(this._hass){this._dialogError=null;try{this._editingEvent?await et(this._hass,{...e.detail,event_id:this._editingEvent.id,expected_version:this._editingEvent.version}):await Bt(this._hass,e.detail),this._editingEvent=null,this._createDraft=null,await this._fetchEvents()}catch(t){this._dialogError=t instanceof he?l(this._hass.language,`error.${t.code}`):t instanceof Error?t.message:String(t)}}}_closeEventDialog(){this._editingEvent=null,this._createDraft=null,this._dialogError=null}async _handleDelete(e,t,i){if(this._hass)try{await Ft(this._hass,e,t,i),this._detailEvent=null,await this._fetchEvents()}catch(n){this._error=n instanceof Error?n.message:String(n)}}async _handleDuplicate(e){if(this._hass)try{await jt(this._hass,e),this._detailEvent=null,await this._fetchEvents()}catch(t){this._error=t instanceof Error?t.message:String(t)}}async _handleSetStatus(e,t){if(this._hass)try{await et(this._hass,{event_id:e,status:t}),this._detailEvent=null,await this._fetchEvents()}catch(i){this._error=i instanceof Error?i.message:String(i)}}async _refreshPeople(){this._hass&&(this._people=await tt(this._hass))}async _refreshCategories(){this._hass&&(this._categories=await it(this._hass))}_rangeLabel(){let e=this._hass;if(!e)return"";let t=e.language||"de";if(this._view==="today")return new Intl.DateTimeFormat(t,{weekday:"long",day:"numeric",month:"long"}).format(new Date);if(this._view==="day")return new Intl.DateTimeFormat(t,{weekday:"long",day:"numeric",month:"long"}).format(this._currentDate);if(this._view==="week"){let n=ee(this._currentDate,Le(e,this._config.first_weekday)),s=w(n,6),p=new Intl.DateTimeFormat(t,{day:"numeric",month:"short"});return`${p.format(n)} \u2013 ${p.format(s)}`}if(this._view==="month")return new Intl.DateTimeFormat(t,{month:"long",year:"numeric"}).format(this._currentDate);let i=new Intl.DateTimeFormat(t,{day:"numeric",month:"short"});return`${i.format(this._currentDate)} \u2013 ${i.format(w(this._currentDate,(this._config.agenda_days??14)-1))}`}_buildViewContext(){let e={onEventClick:t=>{this._detailEvent=t},onSlotClick:(t,i)=>this._openCreate(t,i),onMoreClick:(t,i)=>{this._dayDetail={date:t,events:i}}};return{hass:this._hass,config:this._config,events:this._filteredEvents,people:this._people,categories:this._categories,currentDate:this._view==="today"?new Date:this._currentDate,now:new Date,firstWeekday:Le(this._hass,this._config.first_weekday),use24h:ir(this._hass,this._config.time_format),callbacks:e}}_renderView(){let e=this._buildViewContext();switch(this._view){case"today":case"day":return dr(e);case"week":return hr(e);case"month":return pr(e);default:return ar(e)}}_renderFilterBar(){if(!this._config.show_filters)return d;let e=this._hass?.language;return a`
      <div class="fp-filterbar">
        <button
          type="button"
          class="fp-person-chip fp-person-chip-all ${this._selectedPersonIds.length===0?"active":""}"
          @click=${()=>this._selectedPersonIds=[]}
        >
          ${l(e,"filter.all_people")}
        </button>
        ${this._visiblePeople.map(t=>a`
            <button
              type="button"
              class="fp-person-chip ${this._selectedPersonIds.includes(t.id)?"active":""}"
              style="--fp-chip-color:${t.color}"
              @click=${()=>this._togglePerson(t.id)}
            >
              <span class="fp-person-chip-dot" style="background:${t.color}"></span>${t.name}
            </button>
          `)}
        ${this._visibleCategories.map(t=>a`
            <button
              type="button"
              class="fp-category-chip ${this._selectedCategoryIds.includes(t.id)?"active":""}"
              style="--fp-chip-color:${t.color}"
              @click=${()=>this._toggleCategory(t.id)}
            >
              ${t.icon?a`<ha-icon icon=${t.icon}></ha-icon>`:d}${t.name}
            </button>
          `)}
      </div>
    `}render(){if(!this._hass||!this._config)return a`<ha-card><div class="fp-loading">…</div></ha-card>`;let e=this._hass.language;return a`
      <ha-card>
        ${this._connectionLost?a`<div class="fp-banner fp-banner-error">${l(e,"error.connection_lost")}</div>`:d}
        ${this._error?a`<div class="fp-banner fp-banner-error">
              ${this._error}
              <button type="button" @click=${()=>void this._fetchEvents()}>${l(e,"error.reload")}</button>
            </div>`:d}
        <div class="fp-header">
          <div class="fp-header-top">
            <div class="fp-title">${this._config.title??"Familienkalender"}</div>
            <div class="fp-header-actions">
              ${this._isAdmin?a`
                    <ha-icon-button
                      title=${l(e,"action.manage_people")}
                      @click=${()=>this._peopleManagerOpen=!0}
                    >
                      <ha-icon icon="mdi:account-multiple"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      title=${l(e,"action.manage_categories")}
                      @click=${()=>this._categoryManagerOpen=!0}
                    >
                      <ha-icon icon="mdi:tag-multiple"></ha-icon>
                    </ha-icon-button>
                  `:d}
              ${(this._config.show_add_button??!0)&&!this._config.read_only&&this._canWriteEvents?a`
                    <button
                      type="button"
                      class="fp-fab"
                      title=${l(e,"action.add_event")}
                      aria-label=${l(e,"action.add_event")}
                      @click=${()=>this._openCreate(new Date,!1)}
                    >
                      <ha-icon icon="mdi:plus"></ha-icon>
                    </button>
                  `:d}
            </div>
          </div>
          <div class="fp-header-nav">
            <div class="fp-view-switch" role="tablist">
              ${Jr.map(t=>a`
                  <button
                    role="tab"
                    aria-selected=${this._view===t}
                    class=${this._view===t?"active":""}
                    @click=${()=>this._setView(t)}
                  >
                    ${l(e,`view.${t}`)}
                  </button>
                `)}
            </div>
            ${this._view!=="today"?a`
                  <div class="fp-nav-arrows">
                    <ha-icon-button title=${l(e,"nav.prev")} @click=${()=>this._navStep(-1)}>
                      <ha-icon icon="mdi:chevron-left"></ha-icon>
                    </ha-icon-button>
                    <button type="button" class="fp-nav-today" @click=${()=>this._navToday()}>
                      ${l(e,"nav.today")}
                    </button>
                    <ha-icon-button title=${l(e,"nav.next")} @click=${()=>this._navStep(1)}>
                      <ha-icon icon="mdi:chevron-right"></ha-icon>
                    </ha-icon-button>
                  </div>
                `:d}
            <div class="fp-range-label">${this._rangeLabel()}</div>
          </div>
          ${this._config.show_search?a`
                <input
                  class="fp-search"
                  type="search"
                  placeholder=${l(e,"filter.search_placeholder")}
                  @input=${t=>this._onSearchInput(t)}
                />
              `:d}
          ${this._renderFilterBar()}
        </div>
        <div class="fp-body ${this._config.compact?"fp-compact":""}">
          ${this._loading?a`<div class="fp-loading">…</div>`:this._renderView()}
        </div>
      </ha-card>

      ${this._createDraft||this._editingEvent?a`
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
              @fp-save=${t=>void this._handleDialogSave(t)}
              @fp-close=${()=>this._closeEventDialog()}
            ></family-planner-event-dialog>
          `:d}
      ${this._detailEvent?a`
            <family-planner-event-detail-dialog
              .hass=${this._hass}
              .people=${this._people}
              .categories=${this._categories}
              .event=${this._detailEvent}
              .canWrite=${this._canWriteEvents&&!this._config.read_only}
              @fp-edit=${t=>this._openEdit(t.detail)}
              @fp-delete=${t=>void this._handleDelete(this._detailEvent.id,t.detail.mode,t.detail.occurrenceStart)}
              @fp-duplicate=${()=>void this._handleDuplicate(this._detailEvent.id)}
              @fp-set-status=${t=>void this._handleSetStatus(this._detailEvent.id,t.detail)}
              @fp-close=${()=>this._detailEvent=null}
            ></family-planner-event-detail-dialog>
          `:d}
      ${this._dayDetail?a`
            <family-planner-day-detail-dialog
              .hass=${this._hass}
              .people=${this._people}
              .categories=${this._categories}
              .date=${this._dayDetail.date}
              .events=${this._dayDetail.events}
              .canWrite=${this._canWriteEvents&&!this._config.read_only}
              @fp-event-click=${t=>{this._dayDetail=null,this._detailEvent=t.detail}}
              @fp-add-event=${t=>{this._dayDetail=null,this._openCreate(t.detail.date,!0)}}
              @fp-close=${()=>this._dayDetail=null}
            ></family-planner-day-detail-dialog>
          `:d}
      ${this._peopleManagerOpen?a`
            <family-planner-people-manager-dialog
              .hass=${this._hass}
              .people=${this._people}
              .defaultColors=${this._defaultColors}
              @fp-people-changed=${()=>void this._refreshPeople()}
              @fp-close=${()=>this._peopleManagerOpen=!1}
            ></family-planner-people-manager-dialog>
          `:d}
      ${this._categoryManagerOpen?a`
            <family-planner-category-manager-dialog
              .hass=${this._hass}
              .categories=${this._categories}
              .defaultColors=${this._defaultColors}
              .defaultIcons=${this._defaultIcons}
              @fp-categories-changed=${()=>void this._refreshCategories()}
              @fp-close=${()=>this._categoryManagerOpen=!1}
            ></family-planner-category-manager-dialog>
          `:d}
    `}};_.styles=Xt,c([u()],_.prototype,"_config",2),c([u()],_.prototype,"_view",2),c([u()],_.prototype,"_currentDate",2),c([u()],_.prototype,"_events",2),c([u()],_.prototype,"_people",2),c([u()],_.prototype,"_categories",2),c([u()],_.prototype,"_loading",2),c([u()],_.prototype,"_error",2),c([u()],_.prototype,"_connectionLost",2),c([u()],_.prototype,"_search",2),c([u()],_.prototype,"_selectedPersonIds",2),c([u()],_.prototype,"_selectedCategoryIds",2),c([u()],_.prototype,"_canWriteEvents",2),c([u()],_.prototype,"_isAdmin",2),c([u()],_.prototype,"_requirePerson",2),c([u()],_.prototype,"_enableCategories",2),c([u()],_.prototype,"_enableStatus",2),c([u()],_.prototype,"_defaultReminderMinutes",2),c([u()],_.prototype,"_defaultColors",2),c([u()],_.prototype,"_defaultIcons",2),c([u()],_.prototype,"_createDraft",2),c([u()],_.prototype,"_editingEvent",2),c([u()],_.prototype,"_dialogError",2),c([u()],_.prototype,"_detailEvent",2),c([u()],_.prototype,"_dayDetail",2),c([u()],_.prototype,"_peopleManagerOpen",2),c([u()],_.prototype,"_categoryManagerOpen",2),_=c([S("family-planner-card")],_);window.customCards=window.customCards||[];window.customCards.push({type:"family-planner-card",name:"Family Planner",description:"Lokaler Familienkalender mit Personen, Kategorien und \xDCberlappungs-Ansicht.",preview:!0});})();
//# sourceMappingURL=family-planner-card.js.map
