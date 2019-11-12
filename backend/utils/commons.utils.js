require('babel-register');
const moment = require('moment');

exports.success = (result) => {
  return {
    status: 'success',
    result: result,
  };
};

exports.error = (message) => {
  return {
    status: 'error',
    message: message,
  };
};

exports.isErr = (err) => {
  return err instanceof Error;
};

exports.checkAndChange = (obj) => {
  if (this.isErr(obj)) {
    return this.error(obj.message);
  } else {
    return this.success(obj);
  }
}

exports.newDate = () => {
  const newDate = new Date()
  console.log(moment().format());
  const year = newDate.getFullYear()
  const month = newDate.getMonth() < 10 ? `0${(newDate.getMonth() + 1)}` : newDate.getMonth() + 1;
  const day = newDate.getDate() < 10 ? `0${(newDate.getDate())}` : newDate.getDate();
  const hour = newDate.getHours() < 10 ? `0${(newDate.getHours())}` : newDate.getHours();
  const minute = newDate.getMinutes() < 10 ? `0${(newDate.getMinutes())}` : newDate.getMinutes();
  const seconde = newDate.getSeconds() < 10 ? `0${(newDate.getSeconds())}` : newDate.getSeconds();

  return (`${year}-${month}-${day} ${hour}:${minute}:${seconde}`);
}
