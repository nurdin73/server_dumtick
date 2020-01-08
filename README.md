# server_dumtick
https://dumtick-app.herokuapp.com

function untuk today = 
const date = new Date();
let bln = date.getMonth() + 1;
if (bln < 10) {
  bln = "0" + bln;
} else {
  // eslint-disable-next-line no-self-assign
  bln = bln;
}
let hari = date.getDate();
if (hari < 10) {
  hari = "0" + hari;
} else {
  // eslint-disable-next-line no-self-assign
  hari = hari;
}
let tgl = date.getFullYear() + "-" + bln + "-" + hari;
const dateEnd = new Date();
dateEnd.setDate(dateEnd.getDate() + 1);
dateEnd.setMonth(dateEnd.getMonth());
let endBln = dateEnd.getMonth() + 1;
if (endBln < 10) {
  endBln = "0" + endBln;
} else {
  // eslint-disable-next-line no-self-assign
  endBln = endBln;
}
let hari1 = dateEnd.getDate();
if (hari1 < 10) {
  hari1 = "0" + hari1;
} else {
  // eslint-disable-next-line no-self-assign
  hari1 = hari1;
}
let endTgl = dateEnd.getFullYear() + "-" + endBln + "-" + hari1;



function untuk ongoing =
let dateOngoing = new Date();
dateOngoing.setDate(dateOngoing.getDate() + 1);
dateOngoing.setMonth(dateOngoing.getMonth());
let blnOngoing = dateOngoing.getMonth() + 1;
if (blnOngoing < 10) {
  blnOngoing = "0" + blnOngoing;
} else {
  // eslint-disable-next-line no-self-assign
  blnOngoing = blnOngoing;
}

let hariOngoing = dateOngoing.getDate();
if (hariOngoing < 10) {
  hariOngoing = "0" + hariOngoing;
} else {
  // eslint-disable-next-line no-self-assign
  hariOngoing = hariOngoing;
}
let onGoing = dateOngoing.getFullYear() + "-" + blnOngoing + "-" + hariOngoing;



link untuk get categories = https://dumtick-app.herokuapp.com/api/v1/categories <br />
link untuk get event per category = https://dumtick-app.herokuapp.com/api/v1/category/:id/events <br />
link untuk get event by ID = https://dumtick-app.herokuapp.com/api/v1/event/:id <br />
link untuk menambahkan event = https://dumtick-app.herokuapp.com/api/v1/event <br />
link untuk get event todays = https://dumtick-app.herokuapp.com/api/v1/events?start_time=starttgl&end_time=endtgl <br />
link untuk get event ongoing = https://dumtick-app.herokuapp.com/api/v1/ongoing?startTime=${onGoing} <br />
link untuk get event by title = https://dumtick-app.herokuapp.com/api/v1/events?title=${query.get("title")} <br />
link untuk get favorite = https://dumtick-app.herokuapp.com/api/v1/user/favorites <br />
link untuk get payment yang sudah di apporoved = https://dumtick-app.herokuapp.com/api/v1/order?status=approved <br />
link untuk get payment yang masih pending = https://dumtick-app.herokuapp.com/api/v1/payment <br />
link untuk menambahkan orderan = https://dumtick-app.herokuapp.com/api/v1/event/order <br />

link untuk add favorite dan delete favorite = https://dumtick-app.herokuapp.com/api/v1/favorite <br />

link untuk register = https://dumtick-app.herokuapp.com/api/v1/register <br />
link untuk login = https://dumtick-app.herokuapp.com/api/v1/login <br />


untuk url map bisa diambil dari embed hasil gmap
