/*
 * @Author: holakk
 * @Date: 2021-12-15 19:23:49
 * @LastEditors: holakk
 * @LastEditTime: 2021-12-15 19:24:35
 * @Description: file content
 */
export function netSolver(e) {
  let show_error: string;
  if (e.response) {
    console.log(e.response.data);
    console.log(e.response.status);
    console.log(e.response.headers);
    show_error = "服务器错误";
  } else if (e.request) {
    console.log(e.request);
    show_error = "请求错误";
  } else {
    console.log("Error", e.message);
    show_error = e.message;
  }
  return show_error;
}
