import dotenv from "dotenv";
dotenv.config();

interface Config {
  baseUrl: string;
  appName: string;
  port: number;
  dbName: string;
  dbUrl: string;
  tokenSecret: string;
  refreshTokenSecret: string;
  tokenHeaderKey: string;
  mailHost: string;
  saltRounds: number;
  jwtOptions: {
    expiresIn: string;
  };
  senderMail: string;
  senderMailPassword: string;
}

const config: Config = {
  baseUrl: process.env.BASE_URL || "http://localhost:3000/",
  appName: "pharmacy-mgmt",
  port: Number(process.env.PORT) || 3000,
  dbName: "pharmacy-management",
  dbUrl:
    process.env.DB_URL ||
    "mongodb+srv://masumkhan:pddrgj3q@cluster0.48jxv.mongodb.net/",
  tokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || "i-act-as-token-secret",
  refreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET || "i-act-as-refresh-token-secret",
  tokenHeaderKey: process.env.tkn_header_key || "authorization",
  mailHost: process.env.MAIL_HOST || "smtp.gmail.com",
  saltRounds: 12,
  jwtOptions: {
    expiresIn: "730h", // Token will expire after 30 days
  },
  // Removed duplicate mailHost property
  senderMail: process.env.SENDER_MAIL || "masumkhan081.3s@gmail.com",
  senderMailPassword: process.env.SENDER_MAIL_PASSWORD || "uigctmtbjzdyfxoa",
};

export default config;