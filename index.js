require("express-group-routes");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const usersControllers = require("./controllers/users");
const categoriesControllers = require("./controllers/categories");
const eventsControllers = require("./controllers/events");
const paymentsControllers = require("./controllers/payments");
const favoritesControllers = require("./controllers/favorites");

const { authenticated } = require("./middleware");

app.group("/api/v1", router => {
  // API AUTH USER

  router.post("/register", usersControllers.register);
  router.post("/login", usersControllers.login);

  // API PROFILE
  router.get("/profile/:id", usersControllers.profile);
  router.get("/user", authenticated, usersControllers.user);
  router.patch("/profile", authenticated, usersControllers.update);
  router.get("/user/favorites", authenticated, favoritesControllers.favorites);
  router.get("/user/favorite", authenticated, favoritesControllers.favorite);
  router.post("/favorite", authenticated, favoritesControllers.addFavorite);
  router.delete(
    "/favorite",
    authenticated,
    favoritesControllers.deleteFavorite
  );

  // API CATEGORIES

  router.get("/categories", categoriesControllers.index); // get all categories
  router.get("/category/:id/events", categoriesControllers.category); // get all event by category
  router.post("/category", categoriesControllers.post); // add category
  router.patch("/category/:id", categoriesControllers.patch); // update category
  router.delete("/category/:id", categoriesControllers.delete); // delete category

  // API EVENTS
  router.get("/eventAll", eventsControllers.all);
  router.get("/events", eventsControllers.index);
  router.get("/events?title=", eventsControllers.index); // get events by keywords
  router.get("/events?start_time=&end_time=", eventsControllers.startDate); // get events by start time
  router.get("/ongoing", eventsControllers.onGoing); // get events by start time
  router.get("/ongoing?startTime=", eventsControllers.onGoing); // get events by start time
  router.get("/event/:id", eventsControllers.detail); // get event by id
  router.post("/event", authenticated, eventsControllers.post); // post event
  router.patch("/event/:id", authenticated, eventsControllers.patch); // update event
  router.delete("/event/:id", authenticated, eventsControllers.delete); // delete event

  router.post("/event/order", authenticated, paymentsControllers.post); // add payment
  router.patch("/order/:id", authenticated, paymentsControllers.confirm); // conrifm
  router.get("/payment", authenticated, paymentsControllers.pending);
  router.get("/order", authenticated, paymentsControllers.approved);
  router.get("/order?status=", authenticated, paymentsControllers.approved);
});

app.listen(port, console.log(`Listen to port ${port}`));
