import './main.less';
// import $ from './module/jquery-2.2.3'
import dialog from './module/dialog';

let app  = document.createElement('div');
const myPromise = Promise.resolve(42);
app.innerHTML = '<h1 id="text">Hello World it</h1>';
document.body.appendChild(app);
let {length : len} = "hello";
var jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
$("#text").click(function(event) {
	dialog.alert({
		content:"hello world",
		title:"标题",
		type:"confirm",
		closeBtn:true
	});
});
document.write(id, status, number);
