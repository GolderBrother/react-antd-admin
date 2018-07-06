import $ from 'jquery';
const urlPrefix = "http://localhost:3006";
export const post = (url,args) => {
    return $.post(urlPrefix+url,args);
};
export const get = (url,args) => {
    return $.get(urlPrefix+url,args);
};