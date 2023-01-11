const usedIds: Array<string> = [];

export function onNewId () {
  let newID = '';
  for (let step = 0; step < 5; step++) {
    const partOfId = String(Math.floor(Math.random() * 10));
    newID += partOfId;
  }
  usedIds.push(newID);

  console.log(newID);
  console.log(usedIds);

  return newID;
}

onNewId();
