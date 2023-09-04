const setCart = (
  Count: number | string | null,
  Bill: number | string | null
): void => {
  localStorage.setItem("Count", Count as string);
  localStorage.setItem("Bill", Bill as string);
};

export default setCart;
