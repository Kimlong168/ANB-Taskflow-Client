export const formatDate = (isoString) => {
  if (!isoString) {
    return "N/A";
  }
  const date = new Date(isoString);

  const options = { day: "numeric", month: "long", year: "numeric" };

  return date.toLocaleDateString("en-GB", options);
};
