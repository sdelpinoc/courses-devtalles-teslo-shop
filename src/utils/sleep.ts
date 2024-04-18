export const sleep = (seconds: number = 1) => {
  // console.log({seconds})
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}