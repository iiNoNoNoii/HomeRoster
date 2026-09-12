"use strict";(()=>{var gt=Object.defineProperty;var $r=Object.getOwnPropertyDescriptor;var k=(n,t)=>()=>(n&&(t=n(n=0)),t);var xr=(n,t)=>{for(var e in t)gt(n,e,{get:t[e],enumerable:!0})};var l=(n,t,e,r)=>{for(var i=r>1?void 0:r?$r(t,e):t,o=n.length-1,d;o>=0;o--)(d=n[o])&&(i=(r?d(t,e,i):d(i))||i);return r&&i&&gt(t,e,i),i};var we,Ee,We,vt,ne,_t,T,yt,Ve,qe=k(()=>{we=globalThis,Ee=we.ShadowRoot&&(we.ShadyCSS===void 0||we.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,We=Symbol(),vt=new WeakMap,ne=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==We)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Ee&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=vt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&vt.set(e,t))}return t}toString(){return this.cssText}},_t=n=>new ne(typeof n=="string"?n:n+"",void 0,We),T=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((r,i,o)=>r+(d=>{if(d._$cssResult$===!0)return d.cssText;if(typeof d=="number")return d;throw Error("Value passed to 'css' function must be a 'css' function result: "+d+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new ne(e,n,We)},yt=(n,t)=>{if(Ee)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),i=we.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,n.appendChild(r)}},Ve=Ee?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return _t(e)})(n):n});var wr,Er,kr,Tr,Cr,Sr,ke,bt,Ar,Dr,oe,se,Te,$t,z,ae=k(()=>{qe();qe();({is:wr,defineProperty:Er,getOwnPropertyDescriptor:kr,getOwnPropertyNames:Tr,getOwnPropertySymbols:Cr,getPrototypeOf:Sr}=Object),ke=globalThis,bt=ke.trustedTypes,Ar=bt?bt.emptyScript:"",Dr=ke.reactiveElementPolyfillSupport,oe=(n,t)=>n,se={toAttribute(n,t){switch(t){case Boolean:n=n?Ar:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Te=(n,t)=>!wr(n,t),$t={attribute:!0,type:String,converter:se,reflect:!1,useDefault:!1,hasChanged:Te};Symbol.metadata??=Symbol("metadata"),ke.litPropertyMetadata??=new WeakMap;z=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$t){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&Er(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){let{get:i,set:o}=kr(this.prototype,t)??{get(){return this[e]},set(d){this[e]=d}};return{get:i,set(d){let h=i?.call(this);o?.call(this,d),this.requestUpdate(t,h,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$t}static _$Ei(){if(this.hasOwnProperty(oe("elementProperties")))return;let t=Sr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oe("properties"))){let e=this.properties,r=[...Tr(e),...Cr(e)];for(let i of r)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let i of r)e.unshift(Ve(i))}else t!==void 0&&e.push(Ve(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return yt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:se).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=r.getPropertyOptions(i),d=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:se;this._$Em=i;let h=d.fromAttribute(e,o.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(t,e,r,i=!1,o){if(t!==void 0){let d=this.constructor;if(i===!1&&(o=this[t]),r??=d.getPropertyOptions(t),!((r.hasChanged??Te)(o,e)||r.useDefault&&r.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(d._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:o},d){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,d??e??this[t]),o!==!0||d!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,o]of r){let{wrapped:d}=o,h=this[i];d!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,o,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[oe("elementProperties")]=new Map,z[oe("finalized")]=new Map,Dr?.({ReactiveElement:z}),(ke.reactiveElementVersions??=[]).push("2.1.2")});function It(n,t){if(!Ze(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return wt!==void 0?wt.createHTML(t):t}function Q(n,t,e=n,r){if(t===j)return t;let i=r!==void 0?e._$Co?.[r]:e._$Cl,o=ce(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,r)),r!==void 0?(e._$Co??=[])[r]=i:e._$Cl=i),i!==void 0&&(t=Q(n,i._$AS(n,t.values),i,r)),t}var Je,xt,Ce,wt,At,V,Dt,Pr,H,de,ce,Ze,Ir,Be,le,Et,kt,q,Tt,Ct,Pt,Qe,s,hi,ui,j,c,St,B,Lr,pe,He,he,X,je,Ye,Ke,Ge,Mr,Lt,Se=k(()=>{Je=globalThis,xt=n=>n,Ce=Je.trustedTypes,wt=Ce?Ce.createPolicy("lit-html",{createHTML:n=>n}):void 0,At="$lit$",V=`lit$${Math.random().toFixed(9).slice(2)}$`,Dt="?"+V,Pr=`<${Dt}>`,H=document,de=()=>H.createComment(""),ce=n=>n===null||typeof n!="object"&&typeof n!="function",Ze=Array.isArray,Ir=n=>Ze(n)||typeof n?.[Symbol.iterator]=="function",Be=`[ 	
\f\r]`,le=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Et=/-->/g,kt=/>/g,q=RegExp(`>|${Be}(?:([^\\s"'>=/]+)(${Be}*=${Be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Tt=/'/g,Ct=/"/g,Pt=/^(?:script|style|textarea|title)$/i,Qe=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),s=Qe(1),hi=Qe(2),ui=Qe(3),j=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),St=new WeakMap,B=H.createTreeWalker(H,129);Lr=(n,t)=>{let e=n.length-1,r=[],i,o=t===2?"<svg>":t===3?"<math>":"",d=le;for(let h=0;h<e;h++){let p=n[h],_,x,g=-1,b=0;for(;b<p.length&&(d.lastIndex=b,x=d.exec(p),x!==null);)b=d.lastIndex,d===le?x[1]==="!--"?d=Et:x[1]!==void 0?d=kt:x[2]!==void 0?(Pt.test(x[2])&&(i=RegExp("</"+x[2],"g")),d=q):x[3]!==void 0&&(d=q):d===q?x[0]===">"?(d=i??le,g=-1):x[1]===void 0?g=-2:(g=d.lastIndex-x[2].length,_=x[1],d=x[3]===void 0?q:x[3]==='"'?Ct:Tt):d===Ct||d===Tt?d=q:d===Et||d===kt?d=le:(d=q,i=void 0);let f=d===q&&n[h+1].startsWith("/>")?" ":"";o+=d===le?p+Pr:g>=0?(r.push(_),p.slice(0,g)+At+p.slice(g)+V+f):p+V+(g===-2?h:f)}return[It(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},pe=class n{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let o=0,d=0,h=t.length-1,p=this.parts,[_,x]=Lr(t,e);if(this.el=n.createElement(_,r),B.currentNode=this.el.content,e===2||e===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(i=B.nextNode())!==null&&p.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(let g of i.getAttributeNames())if(g.endsWith(At)){let b=x[d++],f=i.getAttribute(g).split(V),E=/([.?@])?(.*)/.exec(b);p.push({type:1,index:o,name:E[2],strings:f,ctor:E[1]==="."?je:E[1]==="?"?Ye:E[1]==="@"?Ke:X}),i.removeAttribute(g)}else g.startsWith(V)&&(p.push({type:6,index:o}),i.removeAttribute(g));if(Pt.test(i.tagName)){let g=i.textContent.split(V),b=g.length-1;if(b>0){i.textContent=Ce?Ce.emptyScript:"";for(let f=0;f<b;f++)i.append(g[f],de()),B.nextNode(),p.push({type:2,index:++o});i.append(g[b],de())}}}else if(i.nodeType===8)if(i.data===Dt)p.push({type:2,index:o});else{let g=-1;for(;(g=i.data.indexOf(V,g+1))!==-1;)p.push({type:7,index:o}),g+=V.length-1}o++}}static createElement(t,e){let r=H.createElement("template");return r.innerHTML=t,r}};He=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??H).importNode(e,!0);B.currentNode=i;let o=B.nextNode(),d=0,h=0,p=r[0];for(;p!==void 0;){if(d===p.index){let _;p.type===2?_=new he(o,o.nextSibling,this,t):p.type===1?_=new p.ctor(o,p.name,p.strings,this,t):p.type===6&&(_=new Ge(o,this,t)),this._$AV.push(_),p=r[++h]}d!==p?.index&&(o=B.nextNode(),d++)}return B.currentNode=H,i}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},he=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),ce(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==j&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ir(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&ce(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=pe.createElement(It(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new He(i,this),d=o.u(this.options);o.p(e),this.T(d),this._$AH=o}}_$AC(t){let e=St.get(t.strings);return e===void 0&&St.set(t.strings,e=new pe(t)),e}k(t){Ze(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,i=0;for(let o of t)i===e.length?e.push(r=new n(this.O(de()),this.O(de()),this,this.options)):r=e[i],r._$AI(o),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=xt(t).nextSibling;xt(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},X=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=c}_$AI(t,e=this,r,i){let o=this.strings,d=!1;if(o===void 0)t=Q(this,t,e,0),d=!ce(t)||t!==this._$AH&&t!==j,d&&(this._$AH=t);else{let h=t,p,_;for(t=o[0],p=0;p<o.length-1;p++)_=Q(this,h[r+p],e,p),_===j&&(_=this._$AH[p]),d||=!ce(_)||_!==this._$AH[p],_===c?t=c:t!==c&&(t+=(_??"")+o[p+1]),this._$AH[p]=_}d&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},je=class extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},Ye=class extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},Ke=class extends X{constructor(t,e,r,i,o){super(t,e,r,i,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??c)===j)return;let r=this._$AH,i=t===c&&r!==c||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==c&&(r===c||i);i&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ge=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}},Mr=Je.litHtmlPolyfillSupport;Mr?.(pe,he),(Je.litHtmlVersions??=[]).push("3.3.3");Lt=(n,t,e)=>{let r=e?.renderBefore??t,i=r._$litPart$;if(i===void 0){let o=e?.renderBefore??null;r._$litPart$=i=new he(t.insertBefore(de(),o),o,void 0,e??{})}return i._$AI(n),i}});var Xe,$,Fr,Mt=k(()=>{ae();ae();Se();Se();Xe=globalThis,$=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Lt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};$._$litElement$=!0,$.finalized=!0,Xe.litElementHydrateSupport?.({LitElement:$});Fr=Xe.litElementPolyfillSupport;Fr?.({LitElement:$});(Xe.litElementVersions??=[]).push("4.2.2")});var Ft=k(()=>{});var C=k(()=>{ae();Se();Mt();Ft()});var A,Ot=k(()=>{A=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)}});function m(n){return(t,e)=>typeof e=="object"?Nr(n,t,e):((r,i,o)=>{let d=i.hasOwnProperty(o);return i.constructor.createProperty(o,r),d?Object.getOwnPropertyDescriptor(i,o):void 0})(n,t,e)}var Or,Nr,et=k(()=>{ae();Or={attribute:!0,type:String,converter:se,reflect:!1,hasChanged:Te},Nr=(n=Or,t,e)=>{let{kind:r,metadata:i}=e,o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),o.set(e.name,n),r==="accessor"){let{name:d}=e;return{set(h){let p=t.get.call(this);t.set.call(this,h),this.requestUpdate(d,p,n,!0,h)},init(h){return h!==void 0&&this.C(d,void 0,n,h),h}}}if(r==="setter"){let{name:d}=e;return function(h){let p=this[d];t.call(this,h),this.requestUpdate(d,p,n,!0,h)}}throw Error("Unsupported decorator location: "+r)}});function u(n){return m({...n,state:!0,attribute:!1})}var Nt=k(()=>{et();});var Ut=k(()=>{});var ee=k(()=>{});var zt=k(()=>{ee();});var Rt=k(()=>{ee();});var Wt=k(()=>{ee();});var Vt=k(()=>{ee();});var qt=k(()=>{ee();});var R=k(()=>{Ot();et();Nt();Ut();zt();Rt();Wt();Vt();qt()});var Le,ht=k(()=>{"use strict";Le={default_view:"week",show_filters:!0,show_search:!0,show_add_button:!0,allow_edit:!0,show_done_events:!0,show_cancelled_events:!1,show_weekends:!0,show_week_numbers:!0,start_hour:6,end_hour:22,time_step:30,time_format:"auto",max_events_per_day:3,agenda_days:14,dim_past_events:!0,color_mode:"person",compact:!1,show_now_line:!0,highlight_today:!0,read_only:!1,first_weekday:"monday"}});var yr={};xr(yr,{HomeRosterCardEditor:()=>J});var ii,ni,J,br=k(()=>{"use strict";C();R();ht();ii={title:"Titel",default_view:"Standardansicht",show_filters:"Filterleiste anzeigen",show_search:"Suchfeld anzeigen",show_add_button:"Plus-Schaltfl\xE4che anzeigen",allow_edit:"Erstellen/Bearbeiten erlauben",read_only:"Nur-Lesen-Modus (Kiosk)",show_done_events:"Erledigte Termine anzeigen",show_cancelled_events:"Abgesagte Termine anzeigen",show_weekends:"Wochenenden anzeigen",show_week_numbers:"Kalenderwochen anzeigen",start_hour:"Startstunde",end_hour:"Endstunde",time_step:"Zeitschritt (Minuten)",time_format:"Zeitformat",max_events_per_day:"Max. Termine pro Tag (Monatsansicht)",agenda_days:"Agenda-Zeitraum (Tage)",dim_past_events:"Vergangene Termine abdunkeln",color_mode:"Farbmodus",compact:"Kompakter Modus",show_now_line:"\u201EJetzt\u201C-Linie anzeigen",highlight_today:"Heutiges Datum hervorheben",first_weekday:"Erster Wochentag"},ni=[{name:"title",selector:{text:{}}},{name:"default_view",selector:{select:{options:["today","day","week","month","agenda"],mode:"dropdown"}}},{type:"grid",name:"",schema:[{name:"show_filters",selector:{boolean:{}}},{name:"show_search",selector:{boolean:{}}},{name:"show_add_button",selector:{boolean:{}}},{name:"allow_edit",selector:{boolean:{}}},{name:"read_only",selector:{boolean:{}}},{name:"show_done_events",selector:{boolean:{}}},{name:"show_cancelled_events",selector:{boolean:{}}},{name:"show_weekends",selector:{boolean:{}}},{name:"show_week_numbers",selector:{boolean:{}}},{name:"dim_past_events",selector:{boolean:{}}},{name:"compact",selector:{boolean:{}}},{name:"show_now_line",selector:{boolean:{}}},{name:"highlight_today",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"start_hour",selector:{number:{min:0,max:23,mode:"box"}}},{name:"end_hour",selector:{number:{min:1,max:24,mode:"box"}}},{name:"time_step",selector:{number:{min:5,max:60,step:5,mode:"box"}}},{name:"max_events_per_day",selector:{number:{min:1,max:10,mode:"box"}}},{name:"agenda_days",selector:{number:{min:1,max:60,mode:"box"}}}]},{name:"time_format",selector:{select:{options:["auto","12","24"],mode:"dropdown"}}},{name:"color_mode",selector:{select:{options:["person","category"],mode:"dropdown"}}},{name:"first_weekday",selector:{select:{options:["monday","sunday"],mode:"dropdown"}}}],J=class extends ${constructor(){super(...arguments);this._computeLabel=e=>ii[e.name]??e.name}setConfig(e){this._config={...Le,...e,type:e.type}}_valueChanged(e){e.stopPropagation(),this._config=e.detail.value,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}render(){return!this.hass||!this._config?c:s`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ni}
        .computeLabel=${this._computeLabel}
        @value-changed=${e=>this._valueChanged(e)}
      ></ha-form>
    `}};l([m({attribute:!1})],J.prototype,"hass",2),l([u()],J.prototype,"_config",2),J=l([A("homeroster-card-editor")],J)});C();R();var ue=class extends Error{constructor(t){super(t.message),this.code=t.code,this.current=t.current}};async function D(n,t){let e=await n.callWS(t);if(e&&typeof e=="object"&&"error"in e&&e.error)throw new ue(e.error);return e}function Bt(n){return D(n,{type:"homeroster/config"})}async function Ht(n,t){return(await D(n,{type:"homeroster/events/get",...t})).events}async function jt(n,t){return(await D(n,{type:"homeroster/events/create",...t})).event}async function tt(n,t){return(await D(n,{type:"homeroster/events/update",...t})).event}async function Yt(n,t,e="series",r){await D(n,{type:"homeroster/events/delete",event_id:t,mode:e,occurrence_start:r})}async function Kt(n,t,e,r){return(await D(n,{type:"homeroster/events/duplicate",event_id:t,start:e,end:r})).event}async function rt(n){return(await D(n,{type:"homeroster/people/list"})).people}async function Gt(n,t){return(await D(n,{type:"homeroster/people/create",...t})).person}async function it(n,t,e){return(await D(n,{type:"homeroster/people/update",person_id:t,...e})).person}async function Jt(n,t,e,r){await D(n,{type:"homeroster/people/delete",person_id:t,strategy:e,reassign_to:r})}async function Zt(n,t){return(await D(n,{type:"homeroster/people/reorder",ordered_ids:t})).people}async function nt(n){return(await D(n,{type:"homeroster/categories/list"})).categories}async function Qt(n,t){return(await D(n,{type:"homeroster/categories/create",...t})).category}async function ot(n,t,e){return(await D(n,{type:"homeroster/categories/update",category_id:t,...e})).category}async function Xt(n,t){await D(n,{type:"homeroster/categories/delete",category_id:t})}async function er(n,t){return(await D(n,{type:"homeroster/categories/reorder",ordered_ids:t})).categories}C();var tr=T`
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
`;var rr=[0,5,15,30,60,1440],W=["#e53935","#1e88e5","#43a047","#fb8c00","#8e24aa","#00acc1","#fdd835","#6d4c41","#3949ab","#d81b60"],Y=["mdi:calendar","mdi:school","mdi:briefcase","mdi:soccer","mdi:cake-variant","mdi:medical-bag","mdi:home","mdi:airplane","mdi:music","mdi:star"],me=60;var I=n=>String(n).padStart(2,"0");function fe(n){return`${n.getFullYear()}-${I(n.getMonth()+1)}-${I(n.getDate())}`}function Ur(n){let t=-n.getTimezoneOffset(),e=t>=0?"+":"-",r=I(Math.floor(Math.abs(t)/60)),i=I(Math.abs(t)%60);return`${n.getFullYear()}-${I(n.getMonth()+1)}-${I(n.getDate())}T${I(n.getHours())}:${I(n.getMinutes())}:${I(n.getSeconds())}${e}${r}:${i}`}function ir(n,t){let[e,r]=(t||"00:00").split(":").map(Number),[i,o,d]=n.split("-").map(Number);return new Date(i,(o||1)-1,d||1,e||0,r||0,0)}function at(n,t){return Ur(ir(n,t))}function De(n){return`${I(n.getHours())}:${I(n.getMinutes())}`}function nr(n,t,e){let r=ir(n,t);return r.setMinutes(r.getMinutes()+e),{date:fe(r),time:De(r)}}function lt(n,t){let[e,r,i]=n.split("-").map(Number),o=new Date(e,(r||1)-1,i||1,12,0,0);return o.setDate(o.getDate()+t),fe(o)}function w(n,t){let e=new Date(n);return e.setDate(e.getDate()+t),e}function zr(n,t){let e=new Date(n);e.setHours(0,0,0,0);let r=e.getDay(),i=t==="monday"?r===0?6:r-1:r;return w(e,-i)}function Pe(n,t){let e=new Date(n.getFullYear(),n.getMonth(),1);return zr(e,t)}function S(n,t){return n.getFullYear()===t.getFullYear()&&n.getMonth()===t.getMonth()&&n.getDate()===t.getDate()}function or(n,t){if(t==="24")return!0;if(t==="12")return!1;let e=n.locale?.time_format;if(e==="24")return!0;if(e==="12")return!1;try{return!new Intl.DateTimeFormat(n.language||"en",{hour:"numeric"}).formatToParts(new Date(2e3,0,1,13)).some(i=>i.type==="dayPeriod")}catch{return!0}}function ge(n,t){if(t)return`${I(n.getHours())}:${I(n.getMinutes())}`;let e=n.getHours()%12||12,r=n.getHours()<12?"AM":"PM";return`${e}:${I(n.getMinutes())} ${r}`}function Ie(n){let t=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate())),e=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-e);let r=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-r.getTime())/864e5+1)/7)}function dt(n,t){if(t)return t;let e=n.locale?.first_weekday;return e==="monday"||e==="sunday"?e:"monday"}function ct(n,t){let e;return(...r)=>{e&&clearTimeout(e),e=setTimeout(()=>n(...r),t)}}function sr(n,t){let e=n;t.showDoneEvents||(e=e.filter(i=>i.status!=="done")),t.showCancelledEvents||(e=e.filter(i=>i.status!=="cancelled")),t.personIds.length>0&&(e=e.filter(i=>i.person_ids.some(o=>t.personIds.includes(o)))),t.categoryIds.length>0&&(e=e.filter(i=>i.category_id!==null&&t.categoryIds.includes(i.category_id)));let r=t.search.trim().toLowerCase();return r&&(e=e.filter(i=>[i.title,i.subtitle,i.description,i.location].filter(o=>!!o).some(o=>o.toLowerCase().includes(r)))),[...e]}var Rr={"view.today":"Heute","view.day":"Tag","view.week":"Woche","view.month":"Monat","view.agenda":"Agenda","nav.today":"Heute","nav.prev":"Zur\xFCck","nav.next":"Weiter","action.add_event":"Termin hinzuf\xFCgen","action.search":"Suchen","action.filter":"Filter","action.save":"Speichern","action.cancel":"Abbrechen","action.delete":"L\xF6schen","action.edit":"Bearbeiten","action.duplicate":"Duplizieren","action.close":"Schlie\xDFen","action.done":"Fertig","action.mark_done":"Als erledigt markieren","action.manage_people":"Personen verwalten","action.manage_categories":"Kategorien verwalten","action.export":"Als JSON exportieren","action.import":"JSON importieren","event.title":"Titel","event.subtitle":"Untertitel","event.start_date":"Startdatum","event.start_time":"Startzeit","event.end_date":"Enddatum","event.end_time":"Endzeit","event.all_day":"Ganzt\xE4gig","event.people":"Personen","event.description":"Beschreibung","event.location":"Ort","event.category":"Kategorie","event.color":"Farbe","event.icon":"Symbol","event.palette_hint":"Die Palette wird in den Integrationseinstellungen verwaltet (Einstellungen \u2192 Ger\xE4te & Dienste \u2192 HomeRoster \u2192 Konfigurieren).","event.status":"Status","event.reminders":"Erinnerungen","event.repeat":"Wiederholung","event.repeat_none":"Keine Wiederholung","event.new_title":"Neuer Termin","event.edit_title":"Termin bearbeiten","event.no_people":"Keine Person zugewiesen","status.planned":"Geplant","status.confirmed":"Best\xE4tigt","status.tentative":"Optional","status.done":"Erledigt","status.cancelled":"Abgesagt","validation.title_required":"Bitte einen Titel eingeben.","validation.end_before_start":"Das Ende darf nicht vor dem Start liegen.","validation.person_required":"Bitte mindestens eine Person ausw\xE4hlen.","empty.no_events":"Keine Termine","empty.no_events_hint":"F\xFCr diesen Zeitraum sind keine Termine vorhanden. Tippe auf +, um einen Termin zu erstellen.","empty.no_events_short":"Keine Termine","empty.no_matches":"Keine passenden Termine gefunden.","month.more":"+{count} weitere","dialog.confirm_delete_title":"Termin l\xF6schen?","dialog.confirm_delete_series":"Ganze Serie l\xF6schen","dialog.confirm_delete_instance":"Nur diesen Termin l\xF6schen","dialog.unsaved_changes_title":"Ungespeicherte \xC4nderungen","dialog.unsaved_changes_message":"Es gibt ungespeicherte \xC4nderungen. Trotzdem schlie\xDFen?","dialog.discard":"Verwerfen","dialog.keep_editing":"Weiter bearbeiten","people.title":"Personen","people.add":"Person hinzuf\xFCgen","people.name":"Name","people.color":"Farbe","people.role":"Rolle","people.role.parent":"Elternteil","people.role.child":"Kind","people.role.other":"Sonstige","people.active":"Aktiv","people.delete_title":"Person l\xF6schen?","people.delete_strategy.deactivate":"Nur deaktivieren","people.delete_strategy.remove_from_events":"Aus Terminen entfernen","people.delete_strategy.reassign":"Terminen einer anderen Person zuweisen","people.delete_strategy.keep_unassigned":"Termine ohne Personenzuweisung behalten","people.reassign_to":"Neu zuweisen an","category.title":"Kategorien","category.add":"Kategorie hinzuf\xFCgen","category.name":"Name","category.color":"Farbe","category.none":"Keine Kategorie","filter.all_people":"Alle Personen","filter.search_placeholder":"Termine durchsuchen\u2026","error.connection_lost":"Verbindung zu Home Assistant verloren. Es wird versucht, erneut zu verbinden\u2026","error.forbidden":"Keine Berechtigung f\xFCr diese Aktion.","error.conflict":"Dieser Termin wurde inzwischen auf einem anderen Ger\xE4t ge\xE4ndert.","error.not_found":"Dieser Termin existiert nicht mehr.","error.invalid_data":"Ung\xFCltige Eingabe.","error.not_loaded":"HomeRoster wird noch geladen\u2026","error.unknown_error":"Unbekannter Fehler.","error.reload":"Neu laden","reminder.at_start":"Zum Startzeitpunkt","reminder.5":"5 Minuten vorher","reminder.15":"15 Minuten vorher","reminder.30":"30 Minuten vorher","reminder.60":"1 Stunde vorher","reminder.1440":"1 Tag vorher","reminder.custom":"Eigener Wert (Minuten)","weekday.short.0":"So","weekday.short.1":"Mo","weekday.short.2":"Di","weekday.short.3":"Mi","weekday.short.4":"Do","weekday.short.5":"Fr","weekday.short.6":"Sa",calendar_week_short:"KW"},Wr={"view.today":"Today","view.day":"Day","view.week":"Week","view.month":"Month","view.agenda":"Agenda","nav.today":"Today","nav.prev":"Previous","nav.next":"Next","action.add_event":"Add event","action.search":"Search","action.filter":"Filter","action.save":"Save","action.cancel":"Cancel","action.delete":"Delete","action.edit":"Edit","action.duplicate":"Duplicate","action.close":"Close","action.done":"Done","action.mark_done":"Mark as done","action.manage_people":"Manage people","action.manage_categories":"Manage categories","action.export":"Export as JSON","action.import":"Import JSON","event.title":"Title","event.subtitle":"Subtitle","event.start_date":"Start date","event.start_time":"Start time","event.end_date":"End date","event.end_time":"End time","event.all_day":"All day","event.people":"People","event.description":"Description","event.location":"Location","event.category":"Category","event.color":"Color","event.icon":"Icon","event.palette_hint":"The palette is managed in the integration options (Settings \u2192 Devices & Services \u2192 HomeRoster \u2192 Configure).","event.status":"Status","event.reminders":"Reminders","event.repeat":"Repeat","event.repeat_none":"Does not repeat","event.new_title":"New event","event.edit_title":"Edit event","event.no_people":"No one assigned","status.planned":"Planned","status.confirmed":"Confirmed","status.tentative":"Tentative","status.done":"Done","status.cancelled":"Cancelled","validation.title_required":"Please enter a title.","validation.end_before_start":"The end must not be before the start.","validation.person_required":"Please select at least one person.","empty.no_events":"No events","empty.no_events_hint":"There are no events in this range. Tap + to create one.","empty.no_events_short":"No events","empty.no_matches":"No matching events found.","month.more":"+{count} more","dialog.confirm_delete_title":"Delete event?","dialog.confirm_delete_series":"Delete whole series","dialog.confirm_delete_instance":"Delete only this occurrence","dialog.unsaved_changes_title":"Unsaved changes","dialog.unsaved_changes_message":"You have unsaved changes. Close anyway?","dialog.discard":"Discard","dialog.keep_editing":"Keep editing","people.title":"People","people.add":"Add person","people.name":"Name","people.color":"Color","people.role":"Role","people.role.parent":"Parent","people.role.child":"Child","people.role.other":"Other","people.active":"Active","people.delete_title":"Delete person?","people.delete_strategy.deactivate":"Deactivate only","people.delete_strategy.remove_from_events":"Remove from events","people.delete_strategy.reassign":"Reassign events to another person","people.delete_strategy.keep_unassigned":"Keep events without a person assigned","people.reassign_to":"Reassign to","category.title":"Categories","category.add":"Add category","category.name":"Name","category.color":"Color","category.none":"No category","filter.all_people":"All people","filter.search_placeholder":"Search events\u2026","error.connection_lost":"Connection to Home Assistant lost. Reconnecting\u2026","error.forbidden":"You are not allowed to do this.","error.conflict":"This event was changed on another device in the meantime.","error.not_found":"This event no longer exists.","error.invalid_data":"Invalid input.","error.not_loaded":"HomeRoster is still loading\u2026","error.unknown_error":"Unknown error.","error.reload":"Reload","reminder.at_start":"At start time","reminder.5":"5 minutes before","reminder.15":"15 minutes before","reminder.30":"30 minutes before","reminder.60":"1 hour before","reminder.1440":"1 day before","reminder.custom":"Custom (minutes)","weekday.short.0":"Sun","weekday.short.1":"Mon","weekday.short.2":"Tue","weekday.short.3":"Wed","weekday.short.4":"Thu","weekday.short.5":"Fri","weekday.short.6":"Sat",calendar_week_short:"W"},pt={de:Rr,en:Wr};function F(n,t){return n==="auto"?t:n}function a(n,t,e){let r=(n||"de").split("-")[0],o=(pt[r]||pt.de)[t]??pt.de[t]??t;if(e)for(let[d,h]of Object.entries(e))o=o.replace(`{${d}}`,String(h));return o}ht();C();function Vr(n,t){let e=new Date(n.occurrence_start),r=new Date(n.occurrence_end),i=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=w(i,1);return e<o&&r>i}function te(n,t){return t.map(e=>({day:e,events:n.filter(r=>r.all_day?Vr(r,e):S(new Date(r.occurrence_start),e)).sort((r,i)=>r.all_day!==i.all_day?r.all_day?-1:1:new Date(r.occurrence_start).getTime()-new Date(i.occurrence_start).getTime())}))}function ar(n){let t=new Map;for(let e of n){let r=new Date(e.occurrence_start),i=`${r.getFullYear()}-${r.getMonth()}-${r.getDate()}`;t.has(i)||t.set(i,new Date(r.getFullYear(),r.getMonth(),r.getDate()))}return[...t.values()].sort((e,r)=>e.getTime()-r.getTime())}C();function qr(n){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n.trim());return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:null}function lr(n){let t=qr(n);if(!t)return"#000000";let[e,r,i]=t.map(d=>{let h=d/255;return h<=.03928?h/12.92:Math.pow((h+.055)/1.055,2.4)});return .2126*e+.7152*r+.0722*i>.42?"#000000":"#ffffff"}function K(n,t,e,r){if(n.color)return n.color;if(r==="category"&&n.category_id){let i=e.find(o=>o.id===n.category_id);if(i)return i.color}if(n.person_ids.length>0){let i=t.find(o=>o.id===n.person_ids[0]);if(i)return i.color}if(n.category_id){let i=e.find(o=>o.id===n.category_id);if(i)return i.color}return"var(--primary-color, #03a9f4)"}function Me(n,t){return n.person_ids.map(e=>t.find(r=>r.id===e)).filter(e=>!!e)}function Fe(n,t=4,e){let r=n.slice(0,t),i=n.length-r.length;return s`
    <span class="fp-person-dots" role="img" aria-label=${n.map(o=>o.name).join(", ")||a(e,"event.no_people")}>
      ${r.map(o=>s`<span class="fp-person-dot" style="background:${o.color}" title=${o.name}>${o.name.slice(0,1)}</span>`)}
      ${i>0?s`<span class="fp-person-dot fp-person-dot-more">+${i}</span>`:c}
    </span>
  `}function Oe(n,t){return n.all_day?"":ge(new Date(n.occurrence_start),t)}function Br(n,t){return new Date(n.occurrence_end).getTime()<t.getTime()}function ve(n,t,e){let r=K(t,n.people,n.categories,n.config.color_mode??"person"),i=lr(r),o=Me(t,n.people),d=(n.config.dim_past_events??!0)&&Br(t,n.now),h=t.status==="cancelled",p=["fp-chip",d?"fp-past":"",h?"fp-cancelled":""].filter(Boolean).join(" ");return s`
    <button
      type="button"
      class=${p}
      style="background:${r};color:${i}"
      title=${t.title}
      @click=${_=>{_.stopPropagation(),n.callbacks.onEventClick(t)}}
    >
      ${t.icon?s`<ha-icon icon=${t.icon} class="fp-chip-icon"></ha-icon>`:c}
      ${!t.all_day&&!e?.compact?s`<span class="fp-chip-time">${Oe(t,n.use24h)}</span>`:c}
      <span class="fp-chip-title">${t.title}</span>
      ${o.length>1?Fe(o,3,n.language):c}
    </button>
  `}function Hr(n,t){return n?a(t,`status.${n}`):""}function _e(n,t){let e=K(t,n.people,n.categories,n.config.color_mode??"person"),r=Me(t,n.people);return s`
    <button
      type="button"
      class="fp-agenda-item ${t.status==="cancelled"?"fp-cancelled":""}"
      @click=${()=>n.callbacks.onEventClick(t)}
    >
      <span class="fp-agenda-item-bar" style="background:${e}"></span>
      <span class="fp-agenda-item-time"
        >${t.all_day?a(n.language,"event.all_day"):Oe(t,n.use24h)}</span
      >
      <span class="fp-agenda-item-title">${t.title}</span>
      ${t.location?s`<span class="fp-agenda-item-location"><ha-icon icon="mdi:map-marker"></ha-icon>${t.location}</span>`:c}
      ${t.status?s`<span class="fp-agenda-item-status">${Hr(t.status,n.language)}</span>`:c}
      ${Fe(r,4,n.language)}
    </button>
  `}function jr(n,t,e){return s`
    <div class="fp-agenda-group">
      <div class="fp-agenda-daylabel ${S(t,n.now)?"fp-today":""}">
        ${a(n.language,`weekday.short.${t.getDay()}`)} ${t.getDate()}.${t.getMonth()+1}.
      </div>
      <div class="fp-agenda-items">${e.map(r=>_e(n,r))}</div>
    </div>
  `}function dr(n){let t=ar(n.events),e=te(n.events,t).filter(r=>r.events.length>0);return e.length===0?s`
      <div class="fp-empty-state">
        <ha-icon icon="mdi:calendar-search-outline"></ha-icon>
        <div class="fp-empty-title">${a(n.language,"empty.no_matches")}</div>
      </div>
    `:s`
    <div class="fp-view fp-view-list">${e.map(r=>jr(n,r.day,r.events))}</div>
  `}function cr(n){let t=n.config.agenda_days??14,e=[];for(let i=0;i<t;i++)e.push(w(n.currentDate,i));let r=te(n.events,e).filter(i=>i.events.length>0);return r.length===0?s`
      <div class="fp-empty-state">
        <ha-icon icon="mdi:calendar-blank-outline"></ha-icon>
        <div class="fp-empty-title">${a(n.language,"empty.no_events")}</div>
        <div class="fp-empty-hint">${a(n.language,"empty.no_events_hint")}</div>
      </div>
    `:s`
    <div class="fp-view fp-view-agenda">
      ${r.map(i=>s`
          <div class="fp-agenda-group">
            <div class="fp-agenda-daylabel ${S(i.day,n.now)?"fp-today":""}">
              ${a(n.language,`weekday.short.${i.day.getDay()}`)} ${i.day.getDate()}.${i.day.getMonth()+1}.
            </div>
            <div class="fp-agenda-items">${i.events.map(o=>_e(n,o))}</div>
          </div>
        `)}
    </div>
  `}C();C();function pr(n){if(n.length===0)return[];let t=[...n].sort((h,p)=>h.start!==p.start?h.start-p.start:h.end-p.end),e=[],r=[],i=-1/0,o=[],d=()=>{if(r.length===0)return;let h=Math.max(...r.map(p=>p.lane))+1;for(let p of r)e.push({item:p.item,lane:p.lane,laneCount:h});r=[],o.length=0};for(let h of t){h.start>=i&&(d(),i=-1/0);let p=o.findIndex(_=>_<=h.start);p===-1?(p=o.length,o.push(h.end)):o[p]=h.end,r.push({item:h,lane:p}),i=Math.max(i,h.end)}return d(),e}var hr={compact:32,normal:48};function Yr(n){return n.getHours()*60+n.getMinutes()}function ur(n,t){let e=n.config.start_hour??6,r=n.config.end_hour??22,i=n.config.time_step??30,o=n.config.compact?hr.compact:hr.normal,d=(r-e)*60,h=d/i*o,p=[];for(let f=e;f<=r;f++)p.push(f);let _=n.events.filter(f=>f.all_day&&t.some(E=>S(E,new Date(f.occurrence_start)))),x=_.length>0,g=f=>Math.min(Math.max(Yr(f)-e*60,0),d)/d*100,b=n.now;return s`
    <div class="fp-timegrid" style="--fp-row-height:${o}px">
      <div class="fp-timegrid-header">
        <div class="fp-time-gutter"></div>
        ${t.map(f=>s`
            <div class="fp-day-header ${S(f,b)?"fp-today":""}">
              <div class="fp-day-header-weekday">${a(n.language,`weekday.short.${f.getDay()}`)}</div>
              <div class="fp-day-header-date">${f.getDate()}.${f.getMonth()+1}.</div>
            </div>
          `)}
      </div>
      ${x?s`
            <div class="fp-allday-row">
              <div class="fp-time-gutter fp-time-gutter-label">${a(n.language,"event.all_day")}</div>
              ${t.map(f=>{let E=_.filter(U=>S(f,new Date(U.occurrence_start)));return s`
                  <div class="fp-allday-cell" @click=${()=>n.callbacks.onSlotClick(f,!0)}>
                    ${E.map(U=>ve(n,U,{compact:!0}))}
                  </div>
                `})}
            </div>
          `:c}
      <div class="fp-timegrid-scroll">
        <div class="fp-time-gutter-col" style="height:${h}px">
          ${p.map(f=>s`<div class="fp-hour-label" style="height:${o*(60/i)}px">
              ${String(f).padStart(2,"0")}:00
            </div>`)}
        </div>
        ${t.map(f=>{let E=n.events.filter(P=>!P.all_day&&S(f,new Date(P.occurrence_start))),U=pr(E.map(P=>({event:P,start:new Date(P.occurrence_start).getTime(),end:new Date(P.occurrence_end).getTime()}))),Z=S(f,b)?g(b):null;return s`
            <div
              class="fp-day-col"
              style="height:${h}px"
              @click=${P=>{let ze=P.currentTarget.getBoundingClientRect(),$e=P.clientY-ze.top,Re=Math.round($e/h*d/i)*i+e*60,xe=new Date(f);xe.setHours(0,Re,0,0),n.callbacks.onSlotClick(xe,!1)}}
            >
              ${p.slice(0,-1).map((P,be)=>s`<div class="fp-hour-line" style="top:${be*(60/i)*o}px"></div>`)}
              ${U.map(({item:P,lane:be,laneCount:ze})=>{let $e=g(new Date(P.event.occurrence_start)),Re=g(new Date(P.event.occurrence_end)),xe=Math.max(Re-$e,3),ft=100/ze;return s`
                  <div
                    class="fp-timed-event-slot"
                    style="top:${$e}%;height:${xe}%;left:${be*ft}%;width:${ft}%"
                  >
                    ${ve(n,P.event)}
                  </div>
                `})}
              ${Z!==null&&(n.config.show_now_line??!0)?s`<div class="fp-now-line" style="top:${Z}%"></div>`:c}
            </div>
          `})}
      </div>
    </div>
  `}function mr(n){return s`<div class="fp-view fp-view-day">${ur(n,[n.currentDate])}</div>`}C();var Kr=6;function fr(n){let t=n.config.show_weekends??!0,e=n.config.show_week_numbers??!0,r=n.config.max_events_per_day??3,i=Pe(n.currentDate,n.firstWeekday),o=n.currentDate.getMonth(),d=[],h=i;for(let g=0;g<Kr;g++){let b=[];for(let f=0;f<7;f++){let E=h.getDay();(t||E!==0&&E!==6)&&b.push(h),h=w(h,1)}d.push(b)}let p=d[0].map(g=>a(n.language,`weekday.short.${g.getDay()}`)),_=`${e?"32px ":""}repeat(${d[0].length}, 1fr)`,x=g=>n.events.filter(b=>{let f=new Date(b.occurrence_start),E=new Date(b.occurrence_end),U=new Date(g.getFullYear(),g.getMonth(),g.getDate()),ye=w(U,1);return f<ye&&E>U}).sort((b,f)=>b.all_day!==f.all_day?b.all_day?-1:1:new Date(b.occurrence_start).getTime()-new Date(f.occurrence_start).getTime());return s`
    <div class="fp-view fp-view-month">
      <div class="fp-month-headerrow" style="grid-template-columns:${_}">
        ${e?s`<div class="fp-month-weeknum-header"></div>`:c}
        ${p.map(g=>s`<div class="fp-month-weekday">${g}</div>`)}
      </div>
      ${d.map(g=>s`
          <div class="fp-month-week" style="grid-template-columns:${_}">
            ${e?s`<div class="fp-month-weeknum">${a(n.language,"calendar_week_short")}${Ie(g[0])}</div>`:c}
            ${g.map(b=>{let f=x(b),E=f.slice(0,r),U=f.length-E.length,ye=b.getMonth()===o;return s`
                <div
                  class="fp-month-cell ${ye?"":"fp-outside-month"} ${S(b,n.now)&&(n.config.highlight_today??!0)?"fp-today":""}"
                  @click=${()=>n.callbacks.onSlotClick(b,!0)}
                >
                  <div class="fp-month-cell-date">${b.getDate()}</div>
                  <div class="fp-month-cell-events">
                    ${E.map(Z=>ve(n,Z,{compact:!0}))}
                    ${U>0?s`<button
                          type="button"
                          class="fp-month-more"
                          @click=${Z=>{Z.stopPropagation(),n.callbacks.onMoreClick(b,f)}}
                        >
                          ${a(n.language,"month.more",{count:U})}
                        </button>`:c}
                  </div>
                </div>
              `})}
          </div>
        `)}
    </div>
  `}C();function Ne(n){let t=new Date(n);t.setHours(0,0,0,0);let e=[];for(let r=0;r<7;r++)e.push(w(t,r));return e}function gr(n){let t=Ne(n.currentDate),e=te(n.events,t);return s`
    <div class="fp-view fp-view-week">
      ${n.config.show_week_numbers??!0?Gr(n,t[0]):c}
      ${e.map(r=>Jr(n,r))}
    </div>
  `}function Gr(n,t){return s`<div class="fp-week-number">${a(n.language,"calendar_week_short")} ${Ie(t)}</div>`}function Jr(n,t){let e=S(t.day,n.now);return s`
    <div class="fp-week-day-section">
      <div class="fp-day-header fp-week-day-header ${e?"fp-today":""}">
        <span class="fp-day-header-weekday">${a(n.language,`weekday.short.${t.day.getDay()}`)}</span>
        <span class="fp-day-header-date">${t.day.getDate()}.${t.day.getMonth()+1}.</span>
        <button
          type="button"
          class="fp-week-day-add"
          title=${a(n.language,"action.add_event")}
          aria-label=${a(n.language,"action.add_event")}
          @click=${()=>n.callbacks.onSlotClick(Zr(t.day,n.now),!1)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
      ${t.events.length>0?s`<div class="fp-agenda-items fp-week-day-items">${t.events.map(r=>_e(n,r))}</div>`:s`<div class="fp-week-day-empty">${a(n.language,"empty.no_events_short")}</div>`}
    </div>
  `}function Zr(n,t){let e=new Date(n);if(S(n,t)){let r=t.getMinutes()<30?30:60;e.setHours(t.getHours(),0,0,0),e.setMinutes(r)}else e.setHours(9,0,0,0);return e}C();R();C();R();var G=class extends ${constructor(){super(...arguments);this.heading="";this.wide=!1;this._previouslyFocused=null;this._onKeydown=e=>{e.key==="Escape"&&this._requestClose()}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._onKeydown),this._previouslyFocused=document.activeElement,requestAnimationFrame(()=>this._focusFirst())}disconnectedCallback(){document.removeEventListener("keydown",this._onKeydown),this._previouslyFocused?.focus?.(),super.disconnectedCallback()}_focusFirst(){this.querySelector("[autofocus], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])")?.focus()}_requestClose(){this.dispatchEvent(new CustomEvent("fp-shell-close"))}render(){return s`
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
    `}};G.styles=T`
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
  `,l([m()],G.prototype,"heading",2),l([m({type:Boolean})],G.prototype,"wide",2),G=l([A("homeroster-dialog-shell")],G);function vr(n,t,e){return e?new Date(`${n}T00:00:00`).getTime():new Date(`${n}T${t||"00:00"}:00`).getTime()}function _r(n){let t={};if((!n.title||!n.title.trim())&&(t.title="title_required"),!n.startDate||!n.endDate)t.end="end_before_start";else{let e=vr(n.startDate,n.startTime,n.allDay),r=vr(n.endDate,n.endTime,n.allDay);n.allDay?r<e&&(t.end="end_before_start"):r<=e&&(t.end="end_before_start")}return n.requirePerson&&n.personIds.length===0&&(t.personIds="person_required"),{valid:Object.keys(t).length===0,errors:t}}C();var re=T`
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
`;function ie(n,t,e){return s`
    <div class="fp-swatch-row">
      ${n.map(r=>s`
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
  `}function Ue(n,t,e){return s`
    <div class="fp-swatch-row">
      ${n.map(r=>s`
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
  `}var Qr=T`
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
`,v=class extends ${constructor(){super(...arguments);this.language="auto";this.people=[];this.categories=[];this.event=null;this.prefill=null;this.serverError=null;this.requirePerson=!0;this.enableCategories=!0;this.enableStatus=!0;this.defaultReminderMinutes=me;this.defaultColors=W;this.defaultIcons=Y;this._title="";this._subtitle="";this._allDay=!1;this._startDate="";this._startTime="09:00";this._endDate="";this._endTime="10:00";this._personIds=[];this._description="";this._location="";this._categoryId="";this._color="";this._icon="";this._status="";this._reminders=[];this._customReminder="";this._repeatFreq="";this._repeatUntil="";this._errors={};this._confirmingDiscard=!1;this._submitting=!1;this._dirty=!1;this._initialized=!1;this._endTouchedByUser=!1}willUpdate(e){!this._initialized&&(this.event||this.prefill)&&(this._initFromProps(),this._initialized=!0)}_initFromProps(){if(this.event){let e=this.event;if(this._title=e.title,this._subtitle=e.subtitle??"",this._allDay=e.all_day,e.all_day)this._startDate=e.start,this._endDate=lt(e.end,-1);else{let r=new Date(e.start),i=new Date(e.end);this._startDate=fe(r),this._startTime=De(r),this._endDate=fe(i),this._endTime=De(i)}if(this._endTouchedByUser=!0,this._personIds=[...e.person_ids],this._description=e.description??"",this._location=e.location??"",this._categoryId=e.category_id??"",this._color=e.color??"",this._icon=e.icon??"",this._status=e.status??"",this._reminders=[...e.reminders],e.rrule){let r=/FREQ=([A-Z]+)/.exec(e.rrule);this._repeatFreq=r?r[1]:"";let i=/UNTIL=(\d{8})/.exec(e.rrule);if(i){let o=i[1];this._repeatUntil=`${o.slice(0,4)}-${o.slice(4,6)}-${o.slice(6,8)}`}}}else this.prefill&&(this._allDay=this.prefill.allDay,this._startDate=this.prefill.date,this._startTime=this.prefill.time,this._endTouchedByUser=!1,this._recomputeEndIfNotTouched(),this._personIds=[],this._reminders=[this.defaultReminderMinutes])}_recomputeEndIfNotTouched(){if(this._endTouchedByUser)return;let{date:e,time:r}=nr(this._startDate,this._startTime,60);this._endDate=e,this._endTime=r}_markDirty(){this._dirty=!0}_togglePerson(e){this._personIds=this._personIds.includes(e)?this._personIds.filter(r=>r!==e):[...this._personIds,e],this._markDirty()}_toggleReminder(e){this._reminders=this._reminders.includes(e)?this._reminders.filter(r=>r!==e):[...this._reminders,e].sort((r,i)=>r-i),this._markDirty()}_addCustomReminder(){let e=parseInt(this._customReminder,10);!Number.isNaN(e)&&e>=0&&!this._reminders.includes(e)&&(this._reminders=[...this._reminders,e].sort((r,i)=>r-i),this._customReminder="",this._markDirty())}_buildRrule(){if(!this._repeatFreq)return null;let e=`FREQ=${this._repeatFreq}`;return this._repeatUntil&&(e+=`;UNTIL=${this._repeatUntil.replace(/-/g,"")}T000000Z`),e}_validate(){let e=_r({title:this._title,allDay:this._allDay,startDate:this._startDate,startTime:this._startTime,endDate:this._endDate,endTime:this._endTime,personIds:this._personIds,requirePerson:this.requirePerson});return this._errors=e.errors,e}_handleSave(){if(!this._validate().valid)return;let r=this._allDay?this._startDate:at(this._startDate,this._startTime),i=this._allDay?lt(this._endDate,1):at(this._endDate,this._endTime),o={title:this._title.trim(),subtitle:this._subtitle.trim()||null,start:r,end:i,all_day:this._allDay,person_ids:this._personIds,description:this._description.trim()||null,location:this._location.trim()||null,category_id:this._categoryId||null,color:this._color.trim()||null,icon:this._icon.trim()||null,status:this._status||null,reminders:this._reminders,rrule:this._buildRrule()};this._submitting=!0,this.dispatchEvent(new CustomEvent("fp-save",{detail:o}))}updated(e){e.has("serverError")&&this.serverError&&(this._submitting=!1)}_requestClose(){if(this._dirty&&!this._confirmingDiscard){this._confirmingDiscard=!0;return}this.dispatchEvent(new CustomEvent("fp-close"))}render(){let e=F(this.language,this.hass?.language??"auto"),r=this.event?a(e,"event.edit_title"):a(e,"event.new_title");return s`
      <homeroster-dialog-shell .heading=${r} wide @fp-shell-close=${()=>this._requestClose()}>
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
      </homeroster-dialog-shell>
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
          ${Ue(this.defaultIcons,this._icon,i=>{this._icon=this._icon===i?"":i,this._markDirty()})}
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
          ${rr.map(i=>s`
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
    `}};v.styles=[Qr,re],l([m({attribute:!1})],v.prototype,"hass",2),l([m({type:String})],v.prototype,"language",2),l([m({attribute:!1})],v.prototype,"config",2),l([m({attribute:!1})],v.prototype,"people",2),l([m({attribute:!1})],v.prototype,"categories",2),l([m({attribute:!1})],v.prototype,"event",2),l([m({attribute:!1})],v.prototype,"prefill",2),l([m({attribute:!1})],v.prototype,"serverError",2),l([m({type:Boolean})],v.prototype,"requirePerson",2),l([m({type:Boolean})],v.prototype,"enableCategories",2),l([m({type:Boolean})],v.prototype,"enableStatus",2),l([m({type:Number})],v.prototype,"defaultReminderMinutes",2),l([m({attribute:!1})],v.prototype,"defaultColors",2),l([m({attribute:!1})],v.prototype,"defaultIcons",2),l([u()],v.prototype,"_title",2),l([u()],v.prototype,"_subtitle",2),l([u()],v.prototype,"_allDay",2),l([u()],v.prototype,"_startDate",2),l([u()],v.prototype,"_startTime",2),l([u()],v.prototype,"_endDate",2),l([u()],v.prototype,"_endTime",2),l([u()],v.prototype,"_personIds",2),l([u()],v.prototype,"_description",2),l([u()],v.prototype,"_location",2),l([u()],v.prototype,"_categoryId",2),l([u()],v.prototype,"_color",2),l([u()],v.prototype,"_icon",2),l([u()],v.prototype,"_status",2),l([u()],v.prototype,"_reminders",2),l([u()],v.prototype,"_customReminder",2),l([u()],v.prototype,"_repeatFreq",2),l([u()],v.prototype,"_repeatUntil",2),l([u()],v.prototype,"_errors",2),l([u()],v.prototype,"_confirmingDiscard",2),l([u()],v.prototype,"_submitting",2),v=l([A("homeroster-event-dialog")],v);C();R();var Xr=T`
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
`,O=class extends ${constructor(){super(...arguments);this.language="auto";this.people=[];this.categories=[];this.canWrite=!0;this._confirmingDelete=!1}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}render(){let e=F(this.language,this.hass?.language??"auto"),r=this.event,i=K(r,this.people,this.categories,"person"),o=r.person_ids.map(p=>this.people.find(_=>_.id===p)).filter(Boolean),d=r.category_id?this.categories.find(p=>p.id===r.category_id):void 0,h=!!r.rrule||!!r.is_recurring_instance;return s`
      <homeroster-dialog-shell .heading=${r.title} @fp-shell-close=${()=>this._close()}>
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

        ${o.length>0?s`
              <div class="meta-row">
                <ha-icon icon="mdi:account-multiple"></ha-icon>
                <div class="person-list">
                  ${o.map(p=>s`<span class="person-pill"><span class="dot" style="background:${p.color}"></span>${p.name}</span>`)}
                </div>
              </div>
            `:c}

        ${r.location?s`<div class="meta-row"><ha-icon icon="mdi:map-marker"></ha-icon><div>${r.location}</div></div>`:c}
        ${d?s`<div class="meta-row"><ha-icon icon=${d.icon||"mdi:tag"}></ha-icon><div>${d.name}</div></div>`:c}
        ${r.description?s`<div class="meta-row"><ha-icon icon="mdi:text"></ha-icon><div>${r.description}</div></div>`:c}

        ${this._confirmingDelete?this._renderDeleteConfirm(e,h):this._renderActions(e)}
      </homeroster-dialog-shell>
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
    `}};O.styles=Xr,l([m({attribute:!1})],O.prototype,"hass",2),l([m({type:String})],O.prototype,"language",2),l([m({attribute:!1})],O.prototype,"people",2),l([m({attribute:!1})],O.prototype,"categories",2),l([m({attribute:!1})],O.prototype,"event",2),l([m({type:Boolean})],O.prototype,"canWrite",2),l([u()],O.prototype,"_confirmingDelete",2),O=l([A("homeroster-event-detail-dialog")],O);C();R();var ei=T`
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
`,N=class extends ${constructor(){super(...arguments);this.language="auto";this.people=[];this.categories=[];this.events=[];this.canWrite=!0}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}render(){let e=F(this.language,this.hass?.language??"auto"),r=new Intl.DateTimeFormat(this.hass?.language||"de",{weekday:"long",day:"numeric",month:"long"}).format(this.date);return s`
      <homeroster-dialog-shell .heading=${r} @fp-shell-close=${()=>this._close()}>
        ${this.events.map(i=>{let o=K(i,this.people,this.categories,"person"),d=Me(i,this.people);return s`
            <button
              type="button"
              class="item"
              @click=${()=>this.dispatchEvent(new CustomEvent("fp-event-click",{detail:i}))}
            >
              <span class="bar" style="background:${o}"></span>
              <span class="time">${i.all_day?a(e,"event.all_day"):Oe(i,!0)}</span>
              <span class="title">${i.title}</span>
              ${Fe(d,4,e)}
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
      </homeroster-dialog-shell>
    `}};N.styles=ei,l([m({attribute:!1})],N.prototype,"hass",2),l([m({type:String})],N.prototype,"language",2),l([m({attribute:!1})],N.prototype,"people",2),l([m({attribute:!1})],N.prototype,"categories",2),l([m({attribute:!1})],N.prototype,"date",2),l([m({attribute:!1})],N.prototype,"events",2),l([m({type:Boolean})],N.prototype,"canWrite",2),N=l([A("homeroster-day-detail-dialog")],N);C();R();var ti=T`
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
`,ut={id:null,name:"",color:"#3f51b5",role:""},L=class extends ${constructor(){super(...arguments);this.language="auto";this.people=[];this.defaultColors=W;this._draft={...ut};this._deletingId=null;this._deleteStrategy="deactivate";this._reassignTo="";this._error=null}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}async _save(){if(this._draft.name.trim())try{this._draft.id?await it(this.hass,this._draft.id,{name:this._draft.name.trim(),color:this._draft.color,role:this._draft.role||null}):await Gt(this.hass,{name:this._draft.name.trim(),color:this._draft.color,role:this._draft.role||null}),this._draft={...ut},this._error=null,this.dispatchEvent(new CustomEvent("fp-people-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}async _toggleActive(e){await it(this.hass,e.id,{active:!e.active}),this.dispatchEvent(new CustomEvent("fp-people-changed"))}async _move(e,r){let i=[...this.people].sort((h,p)=>h.sort_order-p.sort_order).map(h=>h.id),o=i.indexOf(e.id),d=o+r;d<0||d>=i.length||([i[o],i[d]]=[i[d],i[o]],await Zt(this.hass,i),this.dispatchEvent(new CustomEvent("fp-people-changed")))}async _confirmDelete(){if(this._deletingId)try{await Jt(this.hass,this._deletingId,this._deleteStrategy,this._reassignTo||void 0),this._deletingId=null,this._error=null,this.dispatchEvent(new CustomEvent("fp-people-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}render(){let e=F(this.language,this.hass?.language??"auto"),r=[...this.people].sort((i,o)=>i.sort_order-o.sort_order);return s`
      <homeroster-dialog-shell .heading=${a(e,"people.title")} @fp-shell-close=${()=>this._close()}>
        ${this._error?s`<div class="confirm-box">${this._error}</div>`:c}
        ${r.map((i,o)=>s`
            <div class="row">
              <span class="dot" style="background:${i.color}"></span>
              <span class="name ${i.active?"":"inactive"}">${i.name}</span>
              <button class="iconbtn" title="↑" ?disabled=${o===0} @click=${()=>this._move(i,-1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button
                class="iconbtn"
                title="↓"
                ?disabled=${o===r.length-1}
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
          ${this._draft.id?s`<button class="btn" type="button" @click=${()=>this._draft={...ut}}>
                ${a(e,"action.cancel")}
              </button>`:c}
        </div>
      </homeroster-dialog-shell>
    `}_renderDeleteConfirm(e,r){let i=this.people.filter(o=>o.id!==r.id);return s`
      <div class="confirm-box">
        <div>${a(e,"people.delete_title")} (${r.name})</div>
        <select
          .value=${this._deleteStrategy}
          @change=${o=>this._deleteStrategy=o.target.value}
        >
          <option value="deactivate">${a(e,"people.delete_strategy.deactivate")}</option>
          <option value="remove_from_events">${a(e,"people.delete_strategy.remove_from_events")}</option>
          <option value="reassign">${a(e,"people.delete_strategy.reassign")}</option>
          <option value="keep_unassigned">${a(e,"people.delete_strategy.keep_unassigned")}</option>
        </select>
        ${this._deleteStrategy==="reassign"?s`
              <select .value=${this._reassignTo} @change=${o=>this._reassignTo=o.target.value}>
                <option value="">${a(e,"people.reassign_to")}</option>
                ${i.map(o=>s`<option value=${o.id}>${o.name}</option>`)}
              </select>
            `:c}
        <div class="form">
          <button class="btn btn-primary" type="button" @click=${()=>void this._confirmDelete()}>
            ${a(e,"action.delete")}
          </button>
          <button class="btn" type="button" @click=${()=>this._deletingId=null}>${a(e,"action.cancel")}</button>
        </div>
      </div>
    `}};L.styles=[ti,re],l([m({attribute:!1})],L.prototype,"hass",2),l([m({type:String})],L.prototype,"language",2),l([m({attribute:!1})],L.prototype,"people",2),l([m({attribute:!1})],L.prototype,"defaultColors",2),l([u()],L.prototype,"_draft",2),l([u()],L.prototype,"_deletingId",2),l([u()],L.prototype,"_deleteStrategy",2),l([u()],L.prototype,"_reassignTo",2),l([u()],L.prototype,"_error",2),L=l([A("homeroster-people-manager-dialog")],L);C();R();var ri=T`
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
`,mt={id:null,name:"",color:"#9e9e9e",icon:""},M=class extends ${constructor(){super(...arguments);this.language="auto";this.categories=[];this.defaultColors=W;this.defaultIcons=Y;this._draft={...mt};this._deletingId=null;this._error=null}_close(){this.dispatchEvent(new CustomEvent("fp-close"))}async _save(){if(this._draft.name.trim())try{let e=this._draft.icon.trim()||null;this._draft.id?await ot(this.hass,this._draft.id,{name:this._draft.name.trim(),color:this._draft.color,icon:e}):await Qt(this.hass,{name:this._draft.name.trim(),color:this._draft.color,icon:e}),this._draft={...mt},this._error=null,this.dispatchEvent(new CustomEvent("fp-categories-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}async _toggleActive(e){await ot(this.hass,e.id,{active:!e.active}),this.dispatchEvent(new CustomEvent("fp-categories-changed"))}async _move(e,r){let i=[...this.categories].sort((h,p)=>h.sort_order-p.sort_order).map(h=>h.id),o=i.indexOf(e.id),d=o+r;d<0||d>=i.length||([i[o],i[d]]=[i[d],i[o]],await er(this.hass,i),this.dispatchEvent(new CustomEvent("fp-categories-changed")))}async _confirmDelete(){if(this._deletingId)try{await Xt(this.hass,this._deletingId),this._deletingId=null,this._error=null,this.dispatchEvent(new CustomEvent("fp-categories-changed"))}catch(e){this._error=e instanceof Error?e.message:String(e)}}render(){let e=F(this.language,this.hass?.language??"auto"),r=[...this.categories].sort((i,o)=>i.sort_order-o.sort_order);return s`
      <homeroster-dialog-shell .heading=${a(e,"category.title")} @fp-shell-close=${()=>this._close()}>
        ${this._error?s`<div class="confirm-box">${this._error}</div>`:c}
        ${r.map((i,o)=>s`
            <div class="row">
              <span class="dot" style="background:${i.color}"></span>
              ${i.icon?s`<ha-icon icon=${i.icon}></ha-icon>`:c}
              <span class="name ${i.active?"":"inactive"}">${i.name}</span>
              <button class="iconbtn" title="↑" ?disabled=${o===0} @click=${()=>this._move(i,-1)}>
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button
                class="iconbtn"
                title="↓"
                ?disabled=${o===r.length-1}
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
          ${Ue(this.defaultIcons,this._draft.icon,i=>this._draft={...this._draft,icon:i})}
          <button class="btn btn-primary" type="button" @click=${()=>void this._save()}>
            ${this._draft.id?a(e,"action.save"):a(e,"category.add")}
          </button>
          ${this._draft.id?s`<button class="btn" type="button" @click=${()=>this._draft={...mt}}>
                ${a(e,"action.cancel")}
              </button>`:c}
        </div>
      </homeroster-dialog-shell>
    `}};M.styles=[ri,re],l([m({attribute:!1})],M.prototype,"hass",2),l([m({type:String})],M.prototype,"language",2),l([m({attribute:!1})],M.prototype,"categories",2),l([m({attribute:!1})],M.prototype,"defaultColors",2),l([m({attribute:!1})],M.prototype,"defaultIcons",2),l([u()],M.prototype,"_draft",2),l([u()],M.prototype,"_deletingId",2),l([u()],M.prototype,"_error",2),M=l([A("homeroster-category-manager-dialog")],M);var oi=["today","day","week","month","agenda"],si=["homeroster_event_created","homeroster_event_updated","homeroster_event_deleted"],y=class extends ${constructor(){super(...arguments);this._view="week";this._currentDate=new Date;this._events=[];this._people=[];this._categories=[];this._loading=!0;this._error=null;this._connectionLost=!1;this._search="";this._selectedPersonIds=[];this._selectedCategoryIds=[];this._filtersExpanded=!1;this._canWriteEvents=!0;this._isAdmin=!1;this._requirePerson=!0;this._enableCategories=!0;this._enableStatus=!0;this._language="auto";this._defaultReminderMinutes=me;this._defaultColors=W;this._defaultIcons=Y;this._createDraft=null;this._editingEvent=null;this._dialogError=null;this._detailEvent=null;this._dayDetail=null;this._peopleManagerOpen=!1;this._categoryManagerOpen=!1;this._bootstrapped=!1;this._unsubBus=[];this._fetchToken=0;this._debouncedSetSearch=ct(e=>{this._search=e},200)}get hass(){return this._hass}set hass(e){this._hass=e,this._bootstrapped||(this._bootstrapped=!0,this._bootstrap())}setConfig(e){if(!e)throw new Error("Ung\xFCltige Konfiguration");let r={...Le,...e,type:e.type},i=!this._config;this._config=r,i&&(this._view=r.default_view??"week",this._selectedPersonIds=r.preselected_people??[])}getCardSize(){return this._config?.compact?6:9}getGridOptions(){return{rows:this._config?.compact?6:9,columns:12,min_rows:4}}static getStubConfig(){return{type:"custom:homeroster-card",title:"Familienkalender",default_view:"week"}}static async getConfigElement(){return await Promise.resolve().then(()=>(br(),yr)),document.createElement("homeroster-card-editor")}disconnectedCallback(){super.disconnectedCallback();for(let e of this._unsubBus)e();this._unsubBus=[]}async _bootstrap(){if(this._hass){try{let[e,r,i]=await Promise.all([Bt(this._hass),rt(this._hass),nt(this._hass)]);this._isAdmin=e.is_admin,this._canWriteEvents=e.can_write_events,this._requirePerson=!!(e.options.require_person??!0),this._enableCategories=!!(e.options.enable_categories??!0),this._enableStatus=!!(e.options.enable_status??!0);let o=e.options.language;this._language=o==="auto"||o==="de"||o==="en"?o:"auto";let d=e.options.default_reminder_minutes;this._defaultReminderMinutes=typeof d=="number"&&Number.isFinite(d)?d:me;let h=e.options.default_colors;this._defaultColors=typeof h=="string"&&h.trim()?h.split(",").map(_=>_.trim()).filter(Boolean):W;let p=e.options.default_icons;this._defaultIcons=typeof p=="string"&&p.trim()?p.split(",").map(_=>_.trim()).filter(Boolean):Y,this._people=r,this._categories=i,this._error=null}catch(e){this._error=e instanceof Error?e.message:String(e)}await this._fetchEvents(),this._subscribeRealtime()}}_subscribeRealtime(){if(!this._hass)return;let e=ct(()=>void this._fetchEvents(),250);for(let o of si)this._hass.connection.subscribeEvents(()=>e(),o).then(d=>this._unsubBus.push(d)).catch(()=>{});let r=()=>{this._connectionLost=!1,this._fetchEvents()},i=()=>{this._connectionLost=!0};this._hass.connection.addEventListener("ready",r),this._hass.connection.addEventListener("disconnected",i),this._unsubBus.push(()=>this._hass?.connection.removeEventListener("ready",r)),this._unsubBus.push(()=>this._hass?.connection.removeEventListener("disconnected",i))}_resolvedLanguage(){return F(this._language,this._hass?.language??"de")}_computeRange(){let e=dt(this._hass,this._config.first_weekday);if(this._view==="today"){let i=new Date;return i.setHours(0,0,0,0),{start:i,end:w(i,1)}}if(this._view==="day"){let i=new Date(this._currentDate);return i.setHours(0,0,0,0),{start:i,end:w(i,1)}}if(this._view==="week"){let i=Ne(this._currentDate);return{start:i[0],end:w(i[0],7)}}if(this._view==="month"){let i=Pe(this._currentDate,e);return{start:i,end:w(i,42)}}let r=new Date(this._currentDate);return r.setHours(0,0,0,0),{start:r,end:w(r,this._config.agenda_days??14)}}async _fetchEvents(){if(!this._hass)return;let e=++this._fetchToken;this._loading=!0;let{start:r,end:i}=this._computeRange();try{let o=await Ht(this._hass,{start:r.toISOString(),end:i.toISOString(),include_cancelled:!0});if(e!==this._fetchToken)return;this._events=o,this._error=null}catch(o){if(e!==this._fetchToken)return;this._error=o instanceof Error?o.message:String(o)}finally{e===this._fetchToken&&(this._loading=!1)}}get _filteredEvents(){return sr(this._events,{showDoneEvents:this._config.show_done_events??!0,showCancelledEvents:this._config.show_cancelled_events??!1,personIds:this._selectedPersonIds,categoryIds:this._selectedCategoryIds,search:this._search})}get _showFlatList(){return this._search.trim().length>0||this._selectedCategoryIds.length>0}get _visiblePeople(){let e=this._config.people,r=this._people.filter(i=>i.active);return e&&e.length>0?r.filter(i=>e.includes(i.id)):r}get _visibleCategories(){let e=this._config.visible_categories,r=this._categories.filter(i=>i.active);return e&&e.length>0?r.filter(i=>e.includes(i.id)):r}_setView(e){e!==this._view&&(this._view=e,this._fetchEvents())}_navStep(e){let r=new Date(this._currentDate);switch(this._view){case"day":r=w(r,e);break;case"week":r=w(r,7*e);break;case"month":r=new Date(r.getFullYear(),r.getMonth()+e,1);break;case"agenda":r=w(r,(this._config.agenda_days??14)*e);break;default:return}this._currentDate=r,this._fetchEvents()}_navToday(){this._currentDate=new Date,this._fetchEvents()}_onSearchInput(e){let r=e.target.value;this._debouncedSetSearch(r)}_togglePerson(e){this._selectedPersonIds=this._selectedPersonIds.includes(e)?this._selectedPersonIds.filter(r=>r!==e):[...this._selectedPersonIds,e]}_toggleCategory(e){this._selectedCategoryIds=this._selectedCategoryIds.includes(e)?this._selectedCategoryIds.filter(r=>r!==e):[...this._selectedCategoryIds,e]}_openCreate(e,r){if(this._config.read_only||!this._canWriteEvents)return;let i=o=>String(o).padStart(2,"0");this._createDraft={date:`${e.getFullYear()}-${i(e.getMonth()+1)}-${i(e.getDate())}`,time:`${i(e.getHours())}:${i(e.getMinutes())}`,allDay:r},this._editingEvent=null,this._dialogError=null}_openEdit(e){this._editingEvent=e,this._createDraft=null,this._dialogError=null,this._detailEvent=null}async _handleDialogSave(e){if(this._hass){this._dialogError=null;try{this._editingEvent?await tt(this._hass,{...e.detail,event_id:this._editingEvent.id,expected_version:this._editingEvent.version}):await jt(this._hass,e.detail),this._editingEvent=null,this._createDraft=null,await this._fetchEvents()}catch(r){this._dialogError=r instanceof ue?a(this._resolvedLanguage(),`error.${r.code}`):r instanceof Error?r.message:String(r)}}}_closeEventDialog(){this._editingEvent=null,this._createDraft=null,this._dialogError=null}async _handleDelete(e,r,i){if(this._hass)try{await Yt(this._hass,e,r,i),this._detailEvent=null,await this._fetchEvents()}catch(o){this._error=o instanceof Error?o.message:String(o)}}async _handleDuplicate(e){if(this._hass)try{await Kt(this._hass,e),this._detailEvent=null,await this._fetchEvents()}catch(r){this._error=r instanceof Error?r.message:String(r)}}async _handleSetStatus(e,r){if(this._hass)try{await tt(this._hass,{event_id:e,status:r}),this._detailEvent=null,await this._fetchEvents()}catch(i){this._error=i instanceof Error?i.message:String(i)}}async _refreshPeople(){this._hass&&(this._people=await rt(this._hass))}async _refreshCategories(){this._hass&&(this._categories=await nt(this._hass))}_rangeLabel(){let e=this._hass;if(!e)return"";let r=e.language||"de";if(this._view==="today")return new Intl.DateTimeFormat(r,{weekday:"long",day:"numeric",month:"long"}).format(new Date);if(this._view==="day")return new Intl.DateTimeFormat(r,{weekday:"long",day:"numeric",month:"long"}).format(this._currentDate);if(this._view==="week"){let o=Ne(this._currentDate),d=new Intl.DateTimeFormat(r,{day:"numeric",month:"short"});return`${d.format(o[0])} \u2013 ${d.format(o[6])}`}if(this._view==="month")return new Intl.DateTimeFormat(r,{month:"long",year:"numeric"}).format(this._currentDate);let i=new Intl.DateTimeFormat(r,{day:"numeric",month:"short"});return`${i.format(this._currentDate)} \u2013 ${i.format(w(this._currentDate,(this._config.agenda_days??14)-1))}`}_buildViewContext(){let e={onEventClick:r=>{this._detailEvent=r},onSlotClick:(r,i)=>this._openCreate(r,i),onMoreClick:(r,i)=>{this._dayDetail={date:r,events:i}}};return{hass:this._hass,config:this._config,events:this._filteredEvents,people:this._people,categories:this._categories,currentDate:this._view==="today"?new Date:this._currentDate,now:new Date,language:this._resolvedLanguage(),firstWeekday:dt(this._hass,this._config.first_weekday),use24h:or(this._hass,this._config.time_format),callbacks:e}}_renderView(){let e=this._buildViewContext();switch(this._view){case"today":case"day":return mr(e);case"week":return gr(e);case"month":return fr(e);default:return cr(e)}}_renderFilterToggle(){if(!this._config.show_filters)return c;let e=this._resolvedLanguage(),r=this._selectedPersonIds.length+this._selectedCategoryIds.length;return s`
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
    `}_renderFilterBar(){if(!this._config.show_filters||!this._filtersExpanded)return c;let e=this._resolvedLanguage();return s`
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
    `}_renderFlatList(){return dr(this._buildViewContext())}render(){if(!this._hass||!this._config)return s`<ha-card><div class="fp-loading">…</div></ha-card>`;let e=this._resolvedLanguage();return s`
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
              ${oi.map(r=>s`
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
            <homeroster-event-dialog
              .hass=${this._hass}
              .language=${this._language}
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
            ></homeroster-event-dialog>
          `:c}
      ${this._detailEvent?s`
            <homeroster-event-detail-dialog
              .hass=${this._hass}
              .language=${this._language}
              .people=${this._people}
              .categories=${this._categories}
              .event=${this._detailEvent}
              .canWrite=${this._canWriteEvents&&!this._config.read_only}
              @fp-edit=${r=>this._openEdit(r.detail)}
              @fp-delete=${r=>void this._handleDelete(this._detailEvent.id,r.detail.mode,r.detail.occurrenceStart)}
              @fp-duplicate=${()=>void this._handleDuplicate(this._detailEvent.id)}
              @fp-set-status=${r=>void this._handleSetStatus(this._detailEvent.id,r.detail)}
              @fp-close=${()=>this._detailEvent=null}
            ></homeroster-event-detail-dialog>
          `:c}
      ${this._dayDetail?s`
            <homeroster-day-detail-dialog
              .hass=${this._hass}
              .language=${this._language}
              .people=${this._people}
              .categories=${this._categories}
              .date=${this._dayDetail.date}
              .events=${this._dayDetail.events}
              .canWrite=${this._canWriteEvents&&!this._config.read_only}
              @fp-event-click=${r=>{this._dayDetail=null,this._detailEvent=r.detail}}
              @fp-add-event=${r=>{this._dayDetail=null,this._openCreate(r.detail.date,!0)}}
              @fp-close=${()=>this._dayDetail=null}
            ></homeroster-day-detail-dialog>
          `:c}
      ${this._peopleManagerOpen?s`
            <homeroster-people-manager-dialog
              .hass=${this._hass}
              .language=${this._language}
              .people=${this._people}
              .defaultColors=${this._defaultColors}
              @fp-people-changed=${()=>void this._refreshPeople()}
              @fp-close=${()=>this._peopleManagerOpen=!1}
            ></homeroster-people-manager-dialog>
          `:c}
      ${this._categoryManagerOpen?s`
            <homeroster-category-manager-dialog
              .hass=${this._hass}
              .language=${this._language}
              .categories=${this._categories}
              .defaultColors=${this._defaultColors}
              .defaultIcons=${this._defaultIcons}
              @fp-categories-changed=${()=>void this._refreshCategories()}
              @fp-close=${()=>this._categoryManagerOpen=!1}
            ></homeroster-category-manager-dialog>
          `:c}
    `}};y.styles=tr,l([u()],y.prototype,"_config",2),l([u()],y.prototype,"_view",2),l([u()],y.prototype,"_currentDate",2),l([u()],y.prototype,"_events",2),l([u()],y.prototype,"_people",2),l([u()],y.prototype,"_categories",2),l([u()],y.prototype,"_loading",2),l([u()],y.prototype,"_error",2),l([u()],y.prototype,"_connectionLost",2),l([u()],y.prototype,"_search",2),l([u()],y.prototype,"_selectedPersonIds",2),l([u()],y.prototype,"_selectedCategoryIds",2),l([u()],y.prototype,"_filtersExpanded",2),l([u()],y.prototype,"_canWriteEvents",2),l([u()],y.prototype,"_isAdmin",2),l([u()],y.prototype,"_requirePerson",2),l([u()],y.prototype,"_enableCategories",2),l([u()],y.prototype,"_enableStatus",2),l([u()],y.prototype,"_language",2),l([u()],y.prototype,"_defaultReminderMinutes",2),l([u()],y.prototype,"_defaultColors",2),l([u()],y.prototype,"_defaultIcons",2),l([u()],y.prototype,"_createDraft",2),l([u()],y.prototype,"_editingEvent",2),l([u()],y.prototype,"_dialogError",2),l([u()],y.prototype,"_detailEvent",2),l([u()],y.prototype,"_dayDetail",2),l([u()],y.prototype,"_peopleManagerOpen",2),l([u()],y.prototype,"_categoryManagerOpen",2),y=l([A("homeroster-card")],y);window.customCards=window.customCards||[];window.customCards.push({type:"homeroster-card",name:"HomeRoster",description:"Lokaler Familienkalender mit Personen, Kategorien und \xDCberlappungs-Ansicht.",preview:!0});})();
//# sourceMappingURL=homeroster-card.js.map
