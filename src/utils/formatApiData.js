export function formatApiData(data) {
    let count = 1;
    const gridOne = [];
    const gridTwo = [];
    const gridThree = [];
    const gridFour = [];
  
    data.forEach((d, i) => {
      if (count === 1) {
        gridOne.push(d);
        count += 1;
      } else if (count === 2) {
        gridTwo.push(d);
        count += 1;
      } else if (count === 3) {
        gridThree.push(d);
        count += 1;
      } else if (count === 4) {
        gridFour.push(d);
        count = 1;
      }
    });
  
    return [{ 0: gridOne }, { 1: gridTwo }, { 2: gridThree }, { 3: gridFour }];
  }