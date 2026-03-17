import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { type, description } = req.body;

    try {
      const response = await axios.post(
        "https://eagleseyesecurity.netlify.app:55000/alerts",
        {
          agent: "maryam-portfolio",
          rule: type,
          description,
          level: 10,
        },
        {
          auth: {
            username: "wazuh-wui",
            password: "MyS3cr37P450r.*-",
          },
          httpsAgent: new (require("https").Agent)({
            rejectUnauthorized: false,
          }),
        },
      );

      res.status(200).json({ success: true, data: response.data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).end();
  }
}
