
export function onNewId () {
  let newID = '';
  for (let step = 0; step < 5; step++) {
    const partOfId = Math.floor(Math.random() * 10);
    newID += partOfId;
  }
  return newID;
}

onNewId();
