const transporter = require("./mailTransporter");

const sendEmail = async (content) => {
  const mailOptions = {
    from: "clonned-twitter.@twitter.com",
    to: "deepakjoshi0123@gmail.com",
    subject: `Error occurred - ${content.message}`,
    text: "<h1>check upcoming error mail</h1>",
    html: `
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Error Report</title>
         
        </head>
        <body>
          <h1>Error Report</h1>
          <table>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
            <tr>
            <td>method</td>
            <td>${content.method}</td>
          </tr>
          <tr>
            <td>headers</td>
            <td>${content.headers}</td>
          </tr>
          <tr>
          <td>req url</td>
          <td>${content.url}</td>
        </tr>
        <tr>
          <td>req body</td>
          <td>${content.body}</td>
        </tr>
            <tr>
              <td>error message</td>
              <td>${content.message}</td>
            </tr>
            <tr>
            <td>error stack</td>
            <td>${content.stack}</td>
          </tr>
          <tr>
          <td>timestamp</td>
          <td>${content.timestamp}</td>
        </tr>
          </table>
        </body>
      </html>
      `,
  };

  await this.transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
