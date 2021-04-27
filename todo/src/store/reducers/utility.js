const updateObject = (oldObject, newState) => {
  return {
    ...oldObject,
    ...newState,
  };
};

export default updateObject;
