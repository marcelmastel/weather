console.log('Starting app');

setTimeout(() => {
  console.log('Inside of callback');
}, 2000);

setTimeout(() => {
  console.log('Secondo timeOut');
}, 0);

console.log('Finishing app');