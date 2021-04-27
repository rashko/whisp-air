import moment from "moment";

export const formatDate = (date, format = "DD/MM/yyyy hh:mm") =>
  moment.unix(date).format(format);
