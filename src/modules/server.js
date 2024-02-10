import http from "http";
import CBot from "../bots/CBot.js";
import log from "../utils/logger.js";

export default function server(app) {
  app.server = http.createServer(app);

  app.listen(app.config.port, () => {
    log(`Codyfighters running on port ${app.config.port}`, "info");

    const codyfighters = app.config.api.codyfighters;
    //console.log("codyfighters--->"+app.config.api.codyfighters[0].opponent)
    codyfighters.forEach((codyfighter, index) => {
      const bot = new CBot(
        app,
        app.config.api.url,
        codyfighter.ckey,
        codyfighter.mode,
    //    codyfighter.opponent,
        index
      );

      bot.run();
    });
  });

  process.on("SIGINT", () => {
    app.server.close((err) => {
      log("Codyfighters terminated", "warn");
      process.exit(err ? 1 : 0);
    });
  });
}
