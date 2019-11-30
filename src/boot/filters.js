// import something here

// "async" is optional
export default async ({ Vue }) => {
  // something to do  Vue.filter('first4Chars', str => str.substring(0, 4))
  Vue.filter("linkType", prop => (prop.includes(":") ? "" : prop));
};
