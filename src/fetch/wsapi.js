import axios from "axios";

const apiKey = process.env.REACT_APP_APIKEY;
const workspace = process.env.REACT_APP_WORKSPACE;
const project = process.env.REACT_APP_PROJECT;
const headers = {
  zsessionid: apiKey,
  "Content-Type": "application/json",
};
const wsapiUrl = process.env.REACT_APP_RALLY;
const type = "HierarchicalRequirement";
const url = `${wsapiUrl}/${type}`;

export const getAllStories = async () => {
  const params = {
    workspace: `workspace/${workspace}`,
    query: `(Project.ObjectID = ${project})`,
    fetch: "ObjectID,Name,PlanEstimate",
  };

  const { data } = await axios.get(url, {
    headers: headers,
    params: params,
  });
  return data;
};

export const getStory = async ({ queryKey }) => {
  const [key, { objectid }] = queryKey;
  const storyUrl = `${wsapiUrl}/${type}/${objectid}`;
  const params = {
    fetch: "ObjectID,Name,PlanEstimate",
  };

  const { data } = await axios.get(storyUrl, {
    headers: headers,
    params: params,
  });
  return data["HierarchicalRequirement"];
};

export const updateStory = async ({ objectid, ...payload }) => {
  const storyUrl = `${wsapiUrl}/${type}/${objectid}`;
  await axios.post(
    storyUrl,
    {
      HierarchicalRequirement: payload,
    },
    {
      method: "PUT",
      headers: headers,
    }
  );
};

export const deleteStory = async (objectid) => {
  const storyUrl = `${wsapiUrl}/${type}/${objectid}`;
  await axios.delete(storyUrl, {
    method: "DELETE",
    headers: headers,
  });
  return true;
};

export const createStory = async (payload) => {
  const createUrl = `${wsapiUrl}/${type}/create`;
  const augmentedPayload = {
    ...payload,
    Workspace: `workspace/${workspace}`,
    Project: `project/${project}`,
  };
  const response = await axios.post(
    createUrl,
    {
      HierarchicalRequirement: augmentedPayload,
    },
    {
      method: "POST",
      headers: headers,
    }
  );
  return response;
};
