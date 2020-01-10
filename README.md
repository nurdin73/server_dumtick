# server_dumtick
https://dumtick-app.herokuapp.com

function untuk today = <br />
const date = new Date(); <br />
let bln = date.getMonth() + 1; <br />
if (bln < 10) { <br /> 
  bln = "0" + bln; <br /> 
} else { <br />
  // eslint-disable-next-line no-self-assign <br />
  bln = bln; <br />
}  <br />
let hari = date.getDate(); <br />
if (hari < 10) { <br />
  hari = "0" + hari; <br />
} else { <br />
  // eslint-disable-next-line no-self-assign <br />
  hari = hari; <br />
} <br />
let tgl = date.getFullYear() + "-" + bln + "-" + hari; //ini tanggal mulai atau (startTgl) <br />
const dateEnd = new Date(); <br />
dateEnd.setDate(dateEnd.getDate() + 1); <br />
dateEnd.setMonth(dateEnd.getMonth()); <br />
let endBln = dateEnd.getMonth() + 1; <br />
if (endBln < 10) { <br />
  endBln = "0" + endBln; <br />
} else { <br />
  // eslint-disable-next-line no-self-assign <br />
  endBln = endBln; <br />
} <br />
let hari1 = dateEnd.getDate(); <br />
if (hari1 < 10) { <br />
  hari1 = "0" + hari1; <br />
} else { <br />
  // eslint-disable-next-line no-self-assign <br />
  hari1 = hari1; <br />
} <br />
let endTgl = dateEnd.getFullYear() + "-" + endBln + "-" + hari1; // ini tgl akhir (endTgl) <br />



function untuk ongoing = <br />
let dateOngoing = new Date();<br />
dateOngoing.setDate(dateOngoing.getDate() + 1);<br />
dateOngoing.setMonth(dateOngoing.getMonth());<br />
let blnOngoing = dateOngoing.getMonth() + 1;<br />
if (blnOngoing < 10) {<br />
  blnOngoing = "0" + blnOngoing;<br />
} else {<br />
  // eslint-disable-next-line no-self-assign<br />
  blnOngoing = blnOngoing;<br />
}<br />

let hariOngoing = dateOngoing.getDate();<br />
if (hariOngoing < 10) {<br />
  hariOngoing = "0" + hariOngoing;<br />
} else {<br />
  // eslint-disable-next-line no-self-assign<br />
  hariOngoing = hariOngoing;<br />
}<br />
let onGoing = dateOngoing.getFullYear() + "-" + blnOngoing + "-" + hariOngoing; // ini adalah ongoing <br />



link untuk get categories = https://dumtick-app.herokuapp.com/api/v1/categories <br />
link untuk get event per category = https://dumtick-app.herokuapp.com/api/v1/category/:id/events <br />
link untuk get event by ID = https://dumtick-app.herokuapp.com/api/v1/event/:id <br />
link untuk menambahkan event = https://dumtick-app.herokuapp.com/api/v1/event <br />
link untuk get event todays = https://dumtick-app.herokuapp.com/api/v1/events?start_time=starttgl&end_time=endtgl <br /> 
maksud starttgl adalah tanggal mulainya. cara membuat tanggal mulai seperti diatas (fungsi) dan maksud endtgl adalah tgl akhir event nya cara membuat seperti fungsi diatas
link untuk get event ongoing = https://dumtick-app.herokuapp.com/api/v1/ongoing?startTime=${onGoing} ongoing adalah nama fungsi untuk mendapatkan event antara besok dan lima hari kedepan .. cara membuatnya adalah seperti fungsi diatas <br />
link untuk get event by title = https://dumtick-app.herokuapp.com/api/v1/events?title=${query.get("title")} <br />
link untuk get favorite = https://dumtick-app.herokuapp.com/api/v1/user/favorites <br />
link untuk get payment yang sudah di apporoved = https://dumtick-app.herokuapp.com/api/v1/order?status=approved <br />
link untuk get payment yang masih pending = https://dumtick-app.herokuapp.com/api/v1/payment <br />
link untuk menambahkan orderan = https://dumtick-app.herokuapp.com/api/v1/event/order <br />

link untuk add favorite dan delete favorite = https://dumtick-app.herokuapp.com/api/v1/favorite <br />

link untuk register = https://dumtick-app.herokuapp.com/api/v1/register <br />
link untuk login = https://dumtick-app.herokuapp.com/api/v1/login <br />
link untuk get profile = https://dumtick-app.herokuapp.com/api/v1/user


untuk url map bisa diambil dari embed hasil gmap
