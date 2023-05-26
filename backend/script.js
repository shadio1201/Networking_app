console.log(new Date());
console.log(new Intl.DateTimeFormat('en-US', { year: "numeric", month: "short" }).format(new Date('2023-01')))