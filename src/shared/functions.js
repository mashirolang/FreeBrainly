require("dotenv").config();
const axios = require("axios");
const request = require("request");
const { htmlToText } = require("html-to-text");
const { BRAINLY_GRAPHQL, BRAINLY_QUERY, FACEBOOK_API } = require("./constants");

const handleMessage = async (sender_psid, received_message) => {
  try {
    if (received_message.text) {
      let response;

      const { data } = await axios.post(
        BRAINLY_GRAPHQL,
        [
          {
            operationName: "SearchQuery",
            variables: {
              query: `${received_message.text}`,
              after: null,
              first: 10,
            },
            query: BRAINLY_QUERY,
          },
        ],
        {
          headers: {},
        }
      );

      const results = data[0].data.questionSearch.edges
        .map(({ node }) => {
          return {
            question: node.content,
            answers: node.answers.nodes.map(
              (node, index) =>
                `${index + 1}. ${htmlToText(node.content).trim()} \n\n`
            ),
          };
        })
        .slice(0, 3);

      response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: `Search results that matches ${received_message.text}`,
            buttons: results.map((result) => {
              return {
                type: "postback",
                title: result.question,
                payload: result.answers.join("\n"),
              };
            }),
          },
        },
      };

      if (response.attachment.payload.buttons.length > 0) {
        callSendAPI(sender_psid, response);
      } else {
        callSendAPI(sender_psid, {
          text: `There aren't any matches for your search`,
        });
      }
    } else if (received_message.attachments) {
      callSendAPI(sender_psid, {
        text: `Sorry we dont accept any images or attachments for the moment`,
      });
    }
  } catch (err) {
    console.log(err);
    callSendAPI(sender_psid, {
      text: `Sorry, An error occur. Please try to search again later.`,
    });
  }
};

const handlePostback = (sender_psid, received_postback) => {
  let response;

  const payload = received_postback.payload;

  response = { text: payload };
  callSendAPI(sender_psid, response);
};

const callSendAPI = (sender_psid, response) => {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  console.log(response);

  request(
    {
      uri: "https://graph.facebook.com/v6.0/me/messages",
      qs: { access_token: process.env.FB_PAGE_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};

module.exports = {
  handleMessage,
  handlePostback,
};
