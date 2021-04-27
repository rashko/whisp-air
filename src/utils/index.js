import moment from "moment";

export const formatDate = (date, format = "DD/MM/yyyy hh:mm") =>
  moment.unix(date).format(format);

export const occurredDate = ({ date, beforeOrAfter }) => {
  return beforeOrAfter
    ? !!date && moment.utc(date).endOf("day").format("X")
    : !!date && moment.utc(date).startOf("day").format("X");
};
