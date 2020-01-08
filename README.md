# server_dumtick
link untuk get categories = https://dumtick-app.herokuapp.com/api/v1/categories
link untuk get event per category = http://localhost:5000/api/v1/category/${category_id}/events
link untuk get event by ID = https://dumtick-app.herokuapp.com/api/v1/event/${event_id}
link untuk menambahkan event = https://dumtick-app.herokuapp.com/api/v1/event
link untuk get event todays = https://dumtick-app.herokuapp.com/api/v1/events?start_time=${tgl awal}&end_time=${tanggal akhir}
link untuk get event ongoing = https://dumtick-app.herokuapp.com/api/v1/ongoing?startTime=${onGoing}
link untuk get event by title = https://dumtick-app.herokuapp.com/api/v1/events?title=${query.get("title")}
link untuk get favorite = https://dumtick-app.herokuapp.com/api/v1/user/favorites
link untuk get payment yang sudah di apporoved = https://dumtick-app.herokuapp.com/api/v1/order?status=approved
link untuk get payment yang masih pending = https://dumtick-app.herokuapp.com/api/v1/payment
link untuk menambahkan orderan = https://dumtick-app.herokuapp.com/api/v1/event/order

link untuk add favorite dan delete favorite = https://dumtick-app.herokuapp.com/api/v1/favorite

link untuk register = https://dumtick-app.herokuapp.com/api/v1/register
link untuk login = https://dumtick-app.herokuapp.com/api/v1/login
