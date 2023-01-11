export const usedCarIds: Array<string> = [];
const usedCustomerIds: Array<string> = [];

export function onNewId (length) {
  let newID = '';

  if (length === 5) {
    for (let step = 0; step < 5; step++) {
      const partOfId = String(Math.floor(Math.random() * 10));
      newID += partOfId;
    }
    usedCarIds.push(newID);
    return newID;
  } else {
    for (let step = 0; step < 5; step++) {
      const partOfId = String(Math.floor(Math.random() * 10));
      newID += partOfId;
    }
    usedCustomerIds.push(newID);
    console.log(newID);
    return newID;
  }
}

onNewId(length);
