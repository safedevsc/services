import * as uuid from "uuid";
import handler from "../libs/handler";
import dynamo from "../libs/dynamo";
import {isInvalid} from "../libs/validator";

export const get = handler(async (event, context) => {
  const params = {
    TableName: process.env.DYNAMODB_FORMS_TABLE,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };
  const result = await dynamo.get(params);
  //TODO 404
  return result.Item;
});
export const getAll = handler(async (event, context) => {
  const params = {
    TableName: process.env.DYNAMODB_FORMS_TABLE,
    KeyConditionExpression: "FORM_TYPE = :formType",
    ExpressionAttributeValues: {
      ":formType":  event.pathParameters.formType
    }
  };

  const result = await dynamo.query(params);

  // Return the matching list of items in response body
  return result.Items;
});
export const post = handler(async (event,context) => {
  const data = JSON.parse(event.body);
  if (isInvalid(data,"demoFormType")) {
  //TODO
    return false;
  }
  const params = {
    TableName: process.env.DYNAMODB_FORMS_TABLE,
    Item: {
      UUID: uuid.v1(),
      formType: event.pathParameters.formType,
      userId: event.requestContext.identity.cognitoIdentityId,
      content: data.content,
      createdAt: Date.now()
    }
  };
  await dynamo.put(params);

  return params.Item;
});
export const del = handler(async (event, context) => {
  const params = {
    TableName: process.env.DYNAMODB_FORMS_TABLE,
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      UUID: event.pathParameters.uuid
    }
  };

  await dynamo.delete(params);

  return { status: true };
});
