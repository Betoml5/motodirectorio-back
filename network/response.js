const statusMessages = {
  200: "Done",
  201: "Created",
  400: "Invalid format",
  500: "Internal error",
};

const success = (req, res, message, status) => {
  let statusCode = status; // 200
  let statusMessage = message; // Todo bien

  if (!status) status = 200;

  if (!message) statusMessage = statusMessages[status];

  res.status(statusCode).send({
    error: "",
    body: statusMessage,
  });
};

const error = (req, res, message, status, details) => {
  console.log(message);
  res.status(status || 500).send({
    error: message,
    body: "",
    details,
  });
};

module.exports = {
  success,
  error,
};
