import SendData from "./SendData";

function formChange(e, oldData) {
  const data = e.target.value;
  const name = e.target.name;
  return { ...oldData, [name]: data };
}
