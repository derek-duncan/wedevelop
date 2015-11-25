export default function responseFormat(status, data, message) {
  return {
    status: status,
    data: data,
    message: message
  };
}
