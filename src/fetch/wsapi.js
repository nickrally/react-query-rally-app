import axios from "axios";

const apiKey = process.env.REACT_APP_APIKEY;
const workspace = process.env.REACT_APP_RALLY_WORKSPACE;
const project = process.env.REACT_APP_RALLY_PROJECT;
const headers = {
  zsessionid: apiKey,
  "Content-Type": "application/json",
};
const wsapiUrl = process.env.REACT_APP_RALLY;
const type = process.env.REACT_APP_RALLY_WORKITEM_TYPE;
const shortType = type.split("/")[1];
const url = `${wsapiUrl}/${type}`;

export const getAllItems = async ({ queryKey }) => {
  console.log("queryKey in getAllItems", queryKey); //stories
  const params = {
    workspace: `/workspace/${workspace}`,
    query: `(Project.ObjectID = ${project})`,
    fetch: "ObjectID,Name,PlannedStartDate,PlannedEndDate",
  };

  const { data } = await axios.get(url, {
    headers: headers,
    params: params,
  });
  return data;
};

export const getItem = async ({ queryKey }) => {
  console.log("queryKey", queryKey); //story
  const [key, { objectid }] = queryKey;
  const itemUrl = `${wsapiUrl}/${type}/${objectid}`;
  const params = {
    fetch: "ObjectID,Name,PlannedStartDate,PlannedEndDate",
  };

  const { data } = await axios.get(itemUrl, {
    headers: headers,
    params: params,
  });
  return data[shortType];
};

export const updateItem = async ({ objectid, ...payload }) => {
  const itemUrl = `${wsapiUrl}/${type}/${objectid}`;
  await axios.post(
    itemUrl,
    {
      [type]: payload,
    },
    {
      method: "PUT",
      headers: headers,
    }
  );
};

export const deleteItem = async (objectid) => {
  const itemUrl = `${wsapiUrl}/${type}/${objectid}`;
  await axios.delete(itemUrl, {
    method: "DELETE",
    headers: headers,
  });
  return true;
};

export const createItem = async (payload) => {
  const createUrl = `${wsapiUrl}/${type}/create`;
  const augmentedPayload = {
    ...payload,
    Workspace: `workspace/${workspace}`,
    Project: `project/${project}`,
  };
  const response = await axios.post(
    createUrl,
    {
      type: augmentedPayload,
    },
    {
      method: "POST",
      headers: headers,
    }
  );
  return response;
};
