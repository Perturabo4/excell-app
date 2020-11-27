console.log("module");

async function start() {
  const a = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res("work");
      }, 2000);
    });
  };
  const res = await a();
  console.log(res);
}

start();
