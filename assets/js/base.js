const Finapp={PWA:{enable:true,},Dark_Mode:{default:false,local_mode:{enable:false,start_time:20,end_time:7,},auto_detect:{enable:false,}},RTL:{enable:false,},Animation:{goBack:true,},Test:{enable:false,word:"testmode",alert:false,alertMessage:"Test mode activated. Look at the developer console!"}}
var pageBody=document.querySelector("body");var appSidebar=document.getElementById("sidebarPanel")
var loader=document.getElementById('loader');if(Finapp.PWA.enable){if('serviceWorker'in navigator){navigator.serviceWorker.register('__service-worker.js').then(reg=>console.log('service worker registered')).catch(err=>console.log('service worker not registered - there is an error.',err));}}
setTimeout(()=>{loader.setAttribute("style","pointer-events: none; opacity: 0; transition: 0.2s ease-in-out;");setTimeout(()=>{loader.setAttribute("style","display: none;")},1000);},450);function goBackAnimation(){pageBody.classList.add("animationGoBack")
setTimeout(()=>{window.history.go(-1);},300);}
var goBackButton=document.querySelectorAll(".goBack");goBackButton.forEach(function(el){el.addEventListener("click",function(){if(Finapp.Animation.goBack){goBackAnimation();}
else{window.history.go(-1);}})})
if(Finapp.RTL.enable){var pageHTML=document.querySelector("html")
pageHTML.dir="rtl"
document.querySelector("body").classList.add("rtl-mode")
if(appSidebar!=null){appSidebar.classList.remove("panelbox-left")
appSidebar.classList.add("panelbox-right")}
document.querySelectorAll(".carousel-full, .carousel-single, .carousel-multiple, .carousel-small, .carousel-slider").forEach(function(el){el.setAttribute('data-splide','{"direction":"rtl"}')})}
var tooltipTriggerList=[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList=tooltipTriggerList.map(function(tooltipTriggerEl){return new bootstrap.Tooltip(tooltipTriggerEl)})
var aWithHref=document.querySelectorAll('a[href*="#"]');aWithHref.forEach(function(el){el.addEventListener("click",function(e){e.preventDefault();})});var clearInput=document.querySelectorAll(".clear-input");clearInput.forEach(function(el){el.addEventListener("click",function(){var parent=this.parentElement
var input=parent.querySelector(".form-control")
input.focus();input.value="";parent.classList.remove("not-empty");})})
var formControl=document.querySelectorAll(".form-group .form-control");formControl.forEach(function(el){el.addEventListener("focus",()=>{var parent=el.parentElement
parent.classList.add("active")});el.addEventListener("blur",()=>{var parent=el.parentElement
parent.classList.remove("active")});el.addEventListener("keyup",log);function log(e){var inputCheck=this.value.length;if(inputCheck>0){this.parentElement.classList.add("not-empty")}
else{this.parentElement.classList.remove("not-empty")}}})
var searchboxToggle=document.querySelectorAll(".toggle-searchbox")
searchboxToggle.forEach(function(el){el.addEventListener("click",function(){var search=document.getElementById("search")
var a=search.classList.contains("show")
if(a){search.classList.remove("show")}
else{search.classList.add("show")
search.querySelector(".form-control").focus();}})});document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('.carousel-full').forEach(carousel=>new Splide(carousel,{perPage:1,rewind:true,type:"loop",gap:0,arrows:false,pagination:false,}).mount());document.querySelectorAll('.carousel-single').forEach(carousel=>new Splide(carousel,{perPage:3,rewind:true,type:"loop",gap:16,padding:16,arrows:false,pagination:false,breakpoints:{768:{perPage:1},991:{perPage:2}}}).mount());document.querySelectorAll('.carousel-multiple').forEach(carousel=>new Splide(carousel,{perPage:4,rewind:true,type:"loop",gap:16,padding:16,arrows:false,pagination:false,breakpoints:{768:{perPage:2},991:{perPage:3}}}).mount());document.querySelectorAll('.carousel-small').forEach(carousel=>new Splide(carousel,{perPage:9,rewind:false,type:"loop",gap:16,padding:16,arrows:false,pagination:false,breakpoints:{768:{perPage:4},991:{perPage:7}}}).mount());document.querySelectorAll('.carousel-slider').forEach(carousel=>new Splide(carousel,{perPage:1,rewind:false,type:"loop",gap:16,padding:16,arrows:false,pagination:true}).mount());document.querySelectorAll('.story-block').forEach(carousel=>new Splide(carousel,{perPage:16,rewind:false,type:"slide",gap:16,padding:16,arrows:false,pagination:false,breakpoints:{500:{perPage:4},768:{perPage:7},1200:{perPage:11}}}).mount());});var uploadComponent=document.querySelectorAll('.custom-file-upload');uploadComponent.forEach(function(el){var fileUploadParent='#'+el.id;var fileInput=document.querySelector(fileUploadParent+' input[type="file"]')
var fileLabel=document.querySelector(fileUploadParent+' label')
var fileLabelText=document.querySelector(fileUploadParent+' label span')
var filelabelDefault=fileLabelText.innerHTML;fileInput.addEventListener('change',function(event){var name=this.value.split('\\').pop()
tmppath=URL.createObjectURL(event.target.files[0]);if(name){fileLabel.classList.add('file-uploaded');fileLabel.style.backgroundImage="url("+tmppath+")";fileLabelText.innerHTML=name;}
else{fileLabel.classList.remove("file-uploaded")
fileLabelText.innerHTML=filelabelDefault;}})})
var notificationCloseButton=document.querySelectorAll(".notification-box .close-button");var notificationTaptoClose=document.querySelectorAll(".tap-to-close .notification-dialog");var notificationBox=document.querySelectorAll(".notification-box");function closeNotificationBox(){notificationBox.forEach(function(el){el.classList.remove("show")})}
function notification(target,time){var a=document.getElementById(target);closeNotificationBox()
setTimeout(()=>{a.classList.add("show")},250);if(time){time=time+250;setTimeout(()=>{closeNotificationBox()},time);}}
notificationCloseButton.forEach(function(el){el.addEventListener("click",function(e){e.preventDefault();closeNotificationBox();})});notificationTaptoClose.forEach(function(el){el.addEventListener("click",function(e){closeNotificationBox();})});var toastCloseButton=document.querySelectorAll(".toast-box .close-button");var toastTaptoClose=document.querySelectorAll(".toast-box.tap-to-close");var toastBoxes=document.querySelectorAll(".toast-box");function closeToastBox(){toastBoxes.forEach(function(el){el.classList.remove("show")})}
function toastbox(target,time){var a=document.getElementById(target);closeToastBox()
setTimeout(()=>{a.classList.add("show")},100);if(time){time=time+100;setTimeout(()=>{closeToastBox()},time);}}
toastCloseButton.forEach(function(el){el.addEventListener("click",function(e){e.preventDefault();closeToastBox();})})
toastTaptoClose.forEach(function(el){el.addEventListener("click",function(e){closeToastBox();})})
var osDetection=navigator.userAgent||navigator.vendor||window.opera;var windowsPhoneDetection=/windows phone/i.test(osDetection);var androidDetection=/android/i.test(osDetection);var iosDetection=/iPad|iPhone|iPod/.test(osDetection)&&!window.MSStream;function iosAddtoHome(){var modal=new bootstrap.Modal(document.getElementById('ios-add-to-home-screen'))
modal.toggle()}
function androidAddtoHome(){var modal=new bootstrap.Modal(document.getElementById('android-add-to-home-screen'))
modal.toggle()}
function AddtoHome(time,once){if(once){var AddHomeStatus=localStorage.getItem("FinappAddtoHome");if(AddHomeStatus==="1"||AddHomeStatus===1){}
else{localStorage.setItem("FinappAddtoHome",1)
window.addEventListener('load',()=>{if(navigator.standalone){}
else if(matchMedia('(display-mode: standalone)').matches){}
else{if(androidDetection){setTimeout(()=>{androidAddtoHome()},time);}
if(iosDetection){setTimeout(()=>{iosAddtoHome()},time);}}});}}
else{window.addEventListener('load',()=>{if(navigator.standalone){}
else if(matchMedia('(display-mode: standalone)').matches){}
else{if(androidDetection){setTimeout(()=>{androidAddtoHome()},time);}
if(iosDetection){setTimeout(()=>{iosAddtoHome()},time);}}});}}
var checkDarkModeStatus=localStorage.getItem("FinappDarkmode");var switchDarkMode=document.querySelectorAll(".dark-mode-switch");var pageBodyActive=pageBody.classList.contains("dark-mode");if(Finapp.Dark_Mode.default){pageBody.classList.add("dark-mode");}
if(Finapp.Dark_Mode.local_mode.enable){var nightStart=Finapp.Dark_Mode.local_mode.start_time;var nightEnd=Finapp.Dark_Mode.local_mode.end_time;var currentDate=new Date();var currentHour=currentDate.getHours();if(currentHour>=nightStart||currentHour<nightEnd){pageBody.classList.add("dark-mode");}}
if(Finapp.Dark_Mode.auto_detect.enable)
if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){pageBody.classList.add("dark-mode");}
function switchDarkModeCheck(value){switchDarkMode.forEach(function(el){el.checked=value})}
if(checkDarkModeStatus===1||checkDarkModeStatus==="1"||pageBody.classList.contains('dark-mode')){switchDarkModeCheck(true);if(pageBodyActive){}
else{pageBody.classList.add("dark-mode")}}
else{switchDarkModeCheck(false);}
switchDarkMode.forEach(function(el){el.addEventListener("click",function(){var darkmodeCheck=localStorage.getItem("FinappDarkmode");var bodyCheck=pageBody.classList.contains('dark-mode');if(darkmodeCheck===1||darkmodeCheck==="1"||bodyCheck){pageBody.classList.remove("dark-mode");localStorage.setItem("FinappDarkmode","0");switchDarkModeCheck(false);}
else{pageBody.classList.add("dark-mode")
switchDarkModeCheck(true);localStorage.setItem("FinappDarkmode","1");}})})
function testMode(){var colorDanger="color: #FF396F; font-weight:bold;"
var colorSuccess="color: #1DCC70; font-weight:bold;"
console.clear();console.log("%cFINAPP","font-size: 1.3em; font-weight: bold; color: #FFF; background-color: #6236FF; padding: 10px 120px; margin-bottom: 16px;")
console.log("%cđŸ€ TEST MODE ACTIVATED ..!","font-size: 1em; font-weight: bold; margin: 4px 0;");function testModeMsg(value,msg){if(value){console.log("%c|"+"%c "+msg+" : "+"%cEnabled","color: #444; font-size :1.2em; font-weight: bold;","color: inherit",colorSuccess);}
else if(value==false){console.log("%c|"+"%c "+msg+" : "+"%cDisabled","color: #444; font-size :1.2em; font-weight: bold;","color: inherit",colorDanger);}}
function testModeInfo(value,msg){console.log("%c|"+"%c "+msg+" : "+"%c"+value,"color: #444; font-size :1.2em; font-weight: bold;","color: inherit","color:#6236FF; font-weight: bold;");}
function testModeSubtitle(msg){console.log("%c # "+msg,"color: #FFF; background: #444; font-size: 1.2em; padding: 8px 16px; margin-top: 16px; border-radius: 12px 12px 0 0");}
testModeSubtitle("THEME SETTINGS")
testModeMsg(Finapp.PWA.enable,"PWA")
testModeMsg(Finapp.Dark_Mode.default,"Set dark mode as default theme")
testModeMsg(Finapp.Dark_Mode.local_mode.enable,"Local dark mode (between "+Finapp.Dark_Mode.local_mode.start_time+":00 and "+Finapp.Dark_Mode.local_mode.end_time+":00)")
testModeMsg(Finapp.Dark_Mode.auto_detect.enable,"Auto detect dark mode")
testModeMsg(Finapp.RTL.enable,"RTL")
testModeMsg(Finapp.Test.enable,"Test mode")
testModeMsg(Finapp.Test.alert,"Test mode alert")
testModeSubtitle("PREVIEW INFOS")
testModeInfo(window.screen.availWidth+" x "+window.screen.availHeight,"Resolution")
if(iosDetection){testModeInfo("iOS","Device")}
else if(androidDetection){testModeInfo("Android","Device")}
else if(windowsPhoneDetection){testModeInfo("Windows Phone","Device")}
else{testModeInfo("Not a Mobile Device","Device")}
testModeInfo(window.navigator.language,"Language")
if(pageBody.classList.contains("dark-mode")){testModeInfo("Dark Mode","Current theme")}
else{testModeInfo("Light Mode","Current theme")}
if(window.navigator.onLine){testModeInfo("Online","Internet connection")}
else{testModeInfo("Offline","Internet connection")}
testModeSubtitle("ANIMATIONS")
testModeMsg(Finapp.Animation.goBack,"Go Back")}
function themeTesting(){var word=Finapp.Test.word;var value="";window.addEventListener('keypress',function(e){value=value+String.fromCharCode(e.keyCode).toLowerCase();if(value.length>word.length){value=value.slice(1);}
if(value==word||value===word){value=""
if(Finapp.Test.alert){var content=document.getElementById("appCapsule")
content.appendChild(document.createElement("div")).className="test-alert-wrapper";var alert="<div id='alert-toast' class='toast-box toast-center tap-to-close'>"
+
"<div class='in'>"
+
"<div class='text'><h1 class='text-light mb-05'>đŸ¤–</h1><strong>"
+
Finapp.Test.alertMessage
+
"</strong></div></div></div>"
var wrapper=document.querySelector(".test-alert-wrapper")
wrapper.innerHTML=alert;toastbox('alert-toast');setTimeout(()=>{this.document.getElementById("alert-toast").classList.remove("show")},4000);}
testMode();}})}
if(Finapp.Test.enable){themeTesting();}
$('.searchbox input').on('input',function(){var query=$(this).val().toLowerCase();$('.transactions .item').each(function(){var item=$(this);if(item.text().toLowerCase().indexOf(query)>-1){item.show();}else{item.hide();}});});$('#sort-select').on('change',function(){var sortValue=$(this).val();var items=$('.transactions .item');if(sortValue==='name-asc'){items.sort(function(a,b){var aName=$(a).find('strong').text().toUpperCase();var bName=$(b).find('strong').text().toUpperCase();return aName.localeCompare(bName);});$('#sort-select option[value="default"]').hide();}else if(sortValue==='name-desc'){items.sort(function(a,b){var aName=$(a).find('strong').text().toUpperCase();var bName=$(b).find('strong').text().toUpperCase();return bName.localeCompare(aName);});$('#sort-select option[value="default"]').hide();}
$('.transactions').html(items);});