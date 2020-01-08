exports.formatDate = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let month = date.getMonth() + 1;
  let hari = date.getDate();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  hours = hours < 10 ? "0" + hours : hours;
  month = month < 10 ? "0" + month : month;
  hari = hari < 10 ? "0" + hari : hari;
  return (
    date.getFullYear() +
    "-" +
    month +
    "-" +
    hari +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
};
exports.formatDateEvent = date => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let month = months[date.getMonth()];
  let hari = date.getDate();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  hours = hours < 10 ? "0" + hours : hours;
  month = month < 10 ? "0" + month : month;
  hari = hari < 10 ? "0" + hari : hari;
  return hari + " " + month + " " + date.getFullYear();
};

const formatDatePayment = date => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const day = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  let month = months[date.getMonth()];
  let Day = day[date.getDay()];
  let hari = date.getDate();
  month = month < 10 ? "0" + month : month;
  hari = hari < 10 ? "0" + hari : hari;
  return Day + ". " + hari + " " + month + " " + date.getFullYear();
};

exports.formatTime = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;
  return hours + ":" + minutes;
};
const formatTime = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;
  return hours + ":" + minutes;
};

exports.formatRupiah = angka => {
  var reverse = angka
      .toString()
      .split("")
      .reverse()
      .join(""),
    ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan
    .join(".")
    .split("")
    .reverse()
    .join("");
  return "Rp." + ribuan + ",-";
};

const formatRupiah = angka => {
  var reverse = angka
      .toString()
      .split("")
      .reverse()
      .join(""),
    ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan
    .join(".")
    .split("")
    .reverse()
    .join("");
  return "Rp." + ribuan + ",-";
};

const formatDate = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let month = date.getMonth() + 1;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  hours = hours < 10 ? "0" + hours : hours;
  return (
    date.getFullYear() +
    "-" +
    month +
    "-" +
    date.getDate() +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
};

exports.Events = data => {
  const Event = data.map(item => {
    let items = {
      id: item.id,
      title: item.title,
      category: {
        id: item.category.id,
        name: item.category.name
      },
      startTime: formatDate(item.startTime),
      endTime: formatDate(item.endTime),
      price: formatRupiah(item.price),
      description: item.description,
      address: item.address,
      urlMap: item.urlMap,
      image: item.image,
      createdBy: {
        id: item.user.id,
        name: item.user.name,
        email: item.user.email,
        image: item.user.image
      }
    };
    return items;
  });
  return Event;
};

exports.newPayments = data => {
  const newPayment = data.map(item => {
    let newItem = {
      id: item.id,
      event: {
        id: item.event.id,
        title: item.event.title,
        category: {
          id: item.event.category.id,
          name: item.event.category.name
        },
        startTime: {
          date: formatDatePayment(item.event.startTime),
          time: formatTime(item.event.startTime)
        },
        endTime: {
          date: formatDatePayment(item.event.endTime),
          time: formatTime(item.event.endTime)
        },
        price: formatRupiah(item.event.price),
        description: item.event.description,
        address: item.event.address,
        urlMap: item.event.urlMap,
        image: item.event.image,
        createdBy: {
          id: item.event.user.id,
          name: item.event.user.name,
          phone: item.event.user.phone,
          email: item.event.user.email,
          image: item.event.user.image
        }
      },
      buyer: {
        id: item.buyer.id,
        name: item.buyer.name
      },
      quantity: item.quantity,
      totalPrice: formatRupiah(item.totalPrice),
      status: item.status,
      attachment: item.attachment
    };
    return newItem;
  });
  return newPayment;
};

exports.newFavorites = data => {
  const newFavorite = data.map(item => {
    let newItems = {
      id: item.event.id,
      title: item.event.title,
      category: {
        id: item.event.category.id,
        name: item.event.category.name
      },
      startTime: formatDate(item.event.startTime),
      endTime: formatDate(item.event.endTime),
      price: formatRupiah(item.event.price),
      description: item.event.description,
      address: item.event.address,
      urlMap: item.event.urlMap,
      image: item.event.image,
      createdBy: {
        id: item.event.user.id,
        name: item.event.user.name,
        email: item.event.user.email,
        phone: item.event.user.phone,
        image: item.event.user.image
      }
    };
    return newItems;
  });
  return newFavorite;
};
