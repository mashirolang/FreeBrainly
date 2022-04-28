module.exports = {
  FACEBOOK_API: `https://graph.facebook.com/v6.0/me/messages`,
  BRAINLY_GRAPHQL: `https://brainly.ph/graphql/ph`,
  BRAINLY_QUERY:
    "query SearchQuery($query: String!, $first: Int!, $after: ID) {\n  questionSearch(query: $query, first: $first, after: $after) {\n    count\n    edges {\n      node {\n        id\n        databaseId\n        author {\n          id\n          databaseId\n          isDeleted\n          nick\n          avatar {\n            thumbnailUrl\n            __typename\n          }\n          rank {\n            name\n            __typename\n          }\n          __typename\n        }\n        content\n        answers {\n          nodes {\n            thanksCount\n            ratesCount\n            rating\n            content\n            __typename\n          }\n          hasVerified\n          __typename\n        }\n        __typename\n      }\n      highlight {\n        contentFragments\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
};
