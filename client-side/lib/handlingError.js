const handlingError = (err, setNotifyError) => {
  if (typeof err === "string") {
    setNotifyError({
      show: true,
      msg: err,
    });
    return;
  }
  setNotifyError({
    show: true,
    msg: err.graphQLErrors[0]?.message || err.networkError.message,
    code: err.graphQLErrors[0]?.extensions?.code || "NETWORK_ISSUE",
  });
};

export default handlingError;
