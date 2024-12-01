const appConfig = require("./app/share/configs/app.conf");
const app = require("./app/app");

const PORT = appConfig.Port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
